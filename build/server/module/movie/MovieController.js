'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MovieService = require('./MovieService');

var _MovieService2 = _interopRequireDefault(_MovieService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieController = function MovieController(app, clientDb) {
  _classCallCheck(this, MovieController);

  var movieService = new _MovieService2.default(clientDb);

  app.get('/movie/', movieService.fetchAll.bind(movieService));
  app.delete('/movie/:id', movieService.delete.bind(movieService));
  app.get('/movie/:movieId', movieService.getMovie.bind(movieService));
  app.post('/movie/', movieService.add.bind(movieService));
  app.post('/movie/addfolder', movieService.addFolder.bind(movieService));
  app.delete('/movie/folder/:id', movieService.deleteFolder.bind(movieService));

  app.get('/movie/remarks/:id', movieService.fetchMovieRemarks.bind(movieService));
  app.post('/movie/remark', movieService.addMovieRemark.bind(movieService));
  app.put('/movie/remark', movieService.updateMovieRemark.bind(movieService));
  app.delete('/movie/remark/:id', movieService.deleteMovieRemark.bind(movieService));
};

exports.default = MovieController;
//# sourceMappingURL=MovieController.js.map