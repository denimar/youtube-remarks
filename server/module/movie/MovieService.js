import axios from 'axios'
import { parseString } from 'xml2js'

class MovieService {

  constructor(clientDb) {
    this.clientDb = clientDb
  }

  async fetchAll(req, res) {
    const movies = await this._fetchMovies('-1', res)
    res.status(200).send(movies)
  }

  async fetchMovieRemarks(req, res) {  
    const movieId = req.params.id
    this.clientDb.search({
      index: 'movie',
      type: 'remark',  
      body: {
        //sort: ['start'],
        query: {
          match: { movieId: movieId }
        }
      }
    })
    .then(response => res.status(200).send(response.hits.hits))
    .catch(err => res.status(500).send(err))
  }  

  async addMovieRemark(req, res) {  
    const response = await this.clientDb.index({
      index: 'movie',
      type: 'remark',
      body: req.body
    })
    if (response.created) {
      const addResponse = await this.clientDb.get({
        index: 'movie',
        type: 'remark',        
        id: response._id
      })
      res.status(200).send(addResponse)
    } else {
      //
    } 
  }  

  async updateMovieRemark(req, res) {  
    const response = await this.clientDb.update({
      index: 'movie',
      type: 'remark',
      id: req.body.id,
      body: {doc: req.body}
    })
    if (response.result === 'updated') {
      res.status(200).send(req.body)
    } else {
      //
    }
  }    

  async deleteMovieRemark(req, res) {
    try {
      const id = req.params.id
      const deleteResp = await this.clientDb.delete({
        index: 'movie',
        type: 'remark',
        id
      });
      res.status(200).send(deleteResp)
    } catch(error) {
      res.status(error.code).send(error.message)
    }
  }  

  async _fetchMovies(folderId = '-1', res) {
    try {
      const response = await this.clientDb.search({
        index: 'movie',
        //_source : ['folderId', 'snippet.title', 'title'],
        body: {
          //sort: ['title'],
          query: {
            match: { folderId }
          }
        },
      })
      const records = response.hits.hits
      const newRecords = records.map(async record => {
        const newRecord = {}
        const isFolder = record._type === 'folder'
        newRecord['id'] = record._id
        newRecord['text'] = record._source.title || record._source.snippet.title
        newRecord['isLeaf'] = !isFolder
        if (isFolder) {
          newRecord['children'] = await this._fetchMovies(record._id, res)
        }  
        return newRecord
      })

      const recordsToReturn = await Promise.all(newRecords)
      return recordsToReturn.sort((item1, item2) => {
        if (item1.text.toUpperCase() > item2.text.toUpperCase()) return 1
        if (item1.text < item2.text) return -1
        return 0
      })
    } catch (error) {
      res.status(error.statusCode).send('Error fetching movies: ' + error)
    }
  }

  async getMovie(req, res) {  
    try {
      const response = await this.clientDb.get({
        index: 'movie',
        type: 'movie',        
        id: req.params.movieId
      })
      res.status(200).send(response._source)
    } catch (error) {
      res.status(error.statusCode).send('Error getting movie: ' + error)
    }
  }

  async add(req, res) {
    try {
      const folderId = req.body.folderId || '-1'
      const movieId = req.body.movieId
      const _self = this
      _self._getYoutubeVideoDefaultCaption(movieId)
        .then(async defaultCaption => {
          const videoInfo = await _self._getYoutubeVideoInfo(movieId)
          _self._downloadCaption(movieId, defaultCaption)
            .then(async downloadedCaption => {
              delete videoInfo['id']
              const videoToAdd = Object.assign(videoInfo, {folderId, movieId, transcript: downloadedCaption.transcript.text})
              const addedRecord = await this.clientDb.index({
                index: 'movie',
                type: 'movie',
                body: videoToAdd
              })
              res.status(200).send(Object.assign(videoToAdd, {id: addedRecord._id}))
            })            
        })
        .catch(error => {
          res.status(error.code).send(error.message)
        })
    } catch(error) {
      res.status(500).send('Error adding new item : ' + error)
    }
  }

  async addFolder(req, res) {
    try {
      const parentFolderId = req.body.folderId || '-1'
      const folderName = req.body.folderName
      const insertedRecord = await this.clientDb.index({
        index: 'movie',
        type: 'folder',
        body: {
          folderId: parentFolderId,
          title: folderName
        }
      })
      res.status(200).send(Object.assign(insertedRecord, {id: insertedRecord._id, title: folderName}))
    } catch(error) {
      res.status(500).send('Error adding new folder : ' + error)
    }
  }  

  async delete(req, res) {
    try {
      const id = req.params.id
      const deleteResp = await this.clientDb.delete({
        index: 'movie',
        type: 'movie',
        id
      });
      res.status(200).send(deleteResp)
    } catch(error) {
      res.status(error.code).send(error.message)
    }
  }

  async deleteFolder(req, res) {
    try {
      const id = req.params.id
      const deleteResp = await this.clientDb.delete({
        index: 'movie',
        type: 'folder',
        id
      });
      res.status(200).send(deleteResp)
    } catch(error) {
      res.status(error.code).send(error.message)
    }
  }

  async _getYoutubeVideoInfo(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyCYLOZ87VDexemMk77oplhrtb7Mvyo10XU&part=snippet`
    const response = await axios.get(url)
    if (response.data.pageInfo.totalResults === 0) {
      return {}
    } else {
      return response.data.items[0]
    }
  }

  async _getYoutubeVideoDefaultCaption(videoId) {
    return new Promise(async (resolve, reject) => {
      const url = `http://video.google.com/timedtext?type=list&v=${videoId}`
      const response = await axios.get(url)
      const xmlResponseData = response.data
      parseString(xmlResponseData, function (err, result) {
        result.transcript_list.track.forEach(item => {
          const subTitle = item['$']
          if (subTitle.lang_default) {
            resolve(subTitle)
            return
          }
        })
      })
    })
  }

  _downloadCaption(movieId, captionObj) {
    return new Promise((resolve, reject) => {
      let url = `http://video.google.com/timedtext?type=track&v=${movieId}&lang=${captionObj.lang_code}`
      if (captionObj.name) {
        url += '&name=' + captionObj.name
      }
      axios.get(url)
        .then(resp => {
          parseString(resp.data, function (err, result) {
            resolve(result)
          })
        })  
        .catch(error => {
          reject(error)
        })        
      })
  }  

}

export default MovieService