import axios from 'axios'

class MovieService {

  static fetchAllMovies() {
    return axios.get('http://localhost:5002/movie/')
  }

  static fetchMovieRemarks(movieId) {
    return axios.get(`http://localhost:5002/movie/remarks/${movieId}`)
  }

  static addMovieRemark(remarkObj) {
    return axios.post('http://localhost:5002/movie/remark', remarkObj)
  }

  static updMovieRemark(remarkObj) {
    return axios.put('http://localhost:5002/movie/remark', remarkObj)
  }

  static delMovieRemark(id) {
    return axios.delete(`http://localhost:5002/movie/remark/${id}`)
  }  

  static getMovie(id) {
    return axios.get(`http://localhost:5002/movie/${id}`)
  }

  static addMovie(parentFolderId, movieId) {
    return axios.post('http://localhost:5002/movie/', { folderId: parentFolderId, movieId })
  }

  static deleteMovie(id) {
    return axios.delete(`http://localhost:5002/movie/${id}`)
  }

  static addFolder(parentFolderId, folderName) {
    return axios.post('http://localhost:5002/movie/addfolder', { folderId: parentFolderId, folderName })
  }

  static deleteFolder(id) {
    return axios.delete(`http://localhost:5002/movie/folder/${id}`)
  }

  // static addMovieMovie(parentFolderId) {
  //   return axios.delete(`http://localhost:5002/movie/${id}`)
  // }  

}

export default MovieService