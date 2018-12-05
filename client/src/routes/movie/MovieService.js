import axios from 'axios'

class MovieService {

  static fetchAllMovies() {
    return axios.get('movie/')
  }

  static fetchMovieRemarks(movieId) {
    return axios.get(`movie/remarks/${movieId}`)
  }

  static addMovieRemark(remarkObj) {
    return axios.post('movie/remark', remarkObj)
  }

  static updMovieRemark(remarkObj) {
    return axios.put('movie/remark', remarkObj)
  }

  static delMovieRemark(id) {
    return axios.delete(`movie/remark/${id}`)
  }  

  static getMovie(id) {
    return axios.get(`movie/${id}`)
  }

  static addMovie(parentFolderId, movieId) {
    return axios.post('movie/', { folderId: parentFolderId, movieId })
  }

  static deleteMovie(id) {
    return axios.delete(`movie/${id}`)
  }

  static addFolder(parentFolderId, folderName) {
    return axios.post('movie/addfolder', { folderId: parentFolderId, folderName })
  }

  static deleteFolder(id) {
    return axios.delete(`movie/folder/${id}`)
  }

  // static addMovieMovie(parentFolderId) {
  //   return axios.delete(`movie/${id}`)
  // }  

}

export default MovieService