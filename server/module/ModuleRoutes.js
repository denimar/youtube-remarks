import MovieController from './movie/MovieController'

class ModuleRoutes {

  constructor(app, clientDb) {
    new MovieController(app, clientDb)
  }

}

export default ModuleRoutes