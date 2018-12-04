import MovieService from './MovieService'

class MovieController {

  constructor(app, clientDb) {
    const movieService = new MovieService(clientDb)

    app.get('/movie/', movieService.fetchAll.bind(movieService))
    app.delete('/movie/:id', movieService.delete.bind(movieService))        
    app.get('/movie/:movieId', movieService.getMovie.bind(movieService))    
    app.post('/movie/', movieService.add.bind(movieService))    
    app.post('/movie/addfolder', movieService.addFolder.bind(movieService))        
    app.delete('/movie/folder/:id', movieService.deleteFolder.bind(movieService))            

    app.get('/movie/remarks/:id', movieService.fetchMovieRemarks.bind(movieService))
    app.post('/movie/remark', movieService.addMovieRemark.bind(movieService))
    app.put('/movie/remark', movieService.updateMovieRemark.bind(movieService))        
    app.delete('/movie/remark/:id', movieService.deleteMovieRemark.bind(movieService))        
  }

}

export default MovieController