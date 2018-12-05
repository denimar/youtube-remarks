'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieService = function () {
  function MovieService(clientDb) {
    _classCallCheck(this, MovieService);

    this.clientDb = clientDb;
  }

  _createClass(MovieService, [{
    key: 'fetchAll',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var movies;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._fetchMovies('-1', res);

              case 2:
                movies = _context.sent;

                res.status(200).send(movies);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchAll(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return fetchAll;
    }()
  }, {
    key: 'fetchMovieRemarks',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var movieId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                movieId = req.params.id;

                this.clientDb.search({
                  index: 'movie',
                  type: 'remark',
                  body: {
                    //sort: ['start'],
                    query: {
                      match: { movieId: movieId }
                    }
                  }
                }).then(function (response) {
                  return res.status(200).send(response.hits.hits);
                }).catch(function (err) {
                  return res.status(500).send(err);
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchMovieRemarks(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return fetchMovieRemarks;
    }()
  }, {
    key: 'addMovieRemark',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var response, addResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.clientDb.index({
                  index: 'movie',
                  type: 'remark',
                  body: req.body
                });

              case 2:
                response = _context3.sent;

                if (!response.created) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 6;
                return this.clientDb.get({
                  index: 'movie',
                  type: 'remark',
                  id: response._id
                });

              case 6:
                addResponse = _context3.sent;

                res.status(200).send(addResponse);
                _context3.next = 10;
                break;

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addMovieRemark(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return addMovieRemark;
    }()
  }, {
    key: 'updateMovieRemark',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.clientDb.update({
                  index: 'movie',
                  type: 'remark',
                  id: req.body.id,
                  body: { doc: req.body }
                });

              case 2:
                response = _context4.sent;

                if (response.result === 'updated') {
                  res.status(200).send(req.body);
                } else {
                  //
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateMovieRemark(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return updateMovieRemark;
    }()
  }, {
    key: 'deleteMovieRemark',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, deleteResp;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                _context5.next = 4;
                return this.clientDb.delete({
                  index: 'movie',
                  type: 'remark',
                  id: id
                });

              case 4:
                deleteResp = _context5.sent;

                res.status(200).send(deleteResp);
                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5['catch'](0);

                res.status(_context5.t0.code).send(_context5.t0.message);

              case 11:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function deleteMovieRemark(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return deleteMovieRemark;
    }()
  }, {
    key: '_fetchMovies',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _this = this;

        var folderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '-1';
        var res = arguments[1];
        var response, records, newRecords, recordsToReturn;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return this.clientDb.search({
                  index: 'movie',
                  //_source : ['folderId', 'snippet.title', 'title'],
                  body: {
                    //sort: ['title'],
                    query: {
                      match: { folderId: folderId }
                    }
                  }
                });

              case 3:
                response = _context7.sent;
                records = response.hits.hits;
                newRecords = records.map(function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(record) {
                    var newRecord, isFolder;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            newRecord = {};
                            isFolder = record._type === 'folder';

                            newRecord['id'] = record._id;
                            newRecord['text'] = record._source.title || record._source.snippet.title;
                            newRecord['isLeaf'] = !isFolder;

                            if (!isFolder) {
                              _context6.next = 9;
                              break;
                            }

                            _context6.next = 8;
                            return _this._fetchMovies(record._id, res);

                          case 8:
                            newRecord['children'] = _context6.sent;

                          case 9:
                            return _context6.abrupt('return', newRecord);

                          case 10:
                          case 'end':
                            return _context6.stop();
                        }
                      }
                    }, _callee6, _this);
                  }));

                  return function (_x12) {
                    return _ref7.apply(this, arguments);
                  };
                }());
                _context7.next = 8;
                return Promise.all(newRecords);

              case 8:
                recordsToReturn = _context7.sent;
                return _context7.abrupt('return', recordsToReturn.sort(function (item1, item2) {
                  if (item1.text.toUpperCase() > item2.text.toUpperCase()) return 1;
                  if (item1.text < item2.text) return -1;
                  return 0;
                }));

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7['catch'](0);

                res.status(_context7.t0.statusCode).send('Error fetching movies: ' + _context7.t0);

              case 15:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 12]]);
      }));

      function _fetchMovies() {
        return _ref6.apply(this, arguments);
      }

      return _fetchMovies;
    }()
  }, {
    key: 'getMovie',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var response;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return this.clientDb.get({
                  index: 'movie',
                  type: 'movie',
                  id: req.params.movieId
                });

              case 3:
                response = _context8.sent;

                res.status(200).send(response._source);
                _context8.next = 10;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8['catch'](0);

                res.status(_context8.t0.statusCode).send('Error getting movie: ' + _context8.t0);

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 7]]);
      }));

      function getMovie(_x13, _x14) {
        return _ref8.apply(this, arguments);
      }

      return getMovie;
    }()
  }, {
    key: 'add',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var _this2 = this;

        var folderId, movieId, _self;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                try {
                  folderId = req.body.folderId || '-1';
                  movieId = req.body.movieId;
                  _self = this;

                  _self._getYoutubeVideoDefaultCaption(movieId).then(function () {
                    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(defaultCaption) {
                      var videoInfo;
                      return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              _context10.next = 2;
                              return _self._getYoutubeVideoInfo(movieId);

                            case 2:
                              videoInfo = _context10.sent;

                              _self._downloadCaption(movieId, defaultCaption).then(function () {
                                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(downloadedCaption) {
                                  var videoToAdd, addedRecord;
                                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                      switch (_context9.prev = _context9.next) {
                                        case 0:
                                          delete videoInfo['id'];
                                          videoToAdd = Object.assign(videoInfo, { folderId: folderId, movieId: movieId, transcript: downloadedCaption.transcript.text });
                                          _context9.next = 4;
                                          return _this2.clientDb.index({
                                            index: 'movie',
                                            type: 'movie',
                                            body: videoToAdd
                                          });

                                        case 4:
                                          addedRecord = _context9.sent;

                                          res.status(200).send(Object.assign(videoToAdd, { id: addedRecord._id }));

                                        case 6:
                                        case 'end':
                                          return _context9.stop();
                                      }
                                    }
                                  }, _callee9, _this2);
                                }));

                                return function (_x18) {
                                  return _ref11.apply(this, arguments);
                                };
                              }());

                            case 4:
                            case 'end':
                              return _context10.stop();
                          }
                        }
                      }, _callee10, _this2);
                    }));

                    return function (_x17) {
                      return _ref10.apply(this, arguments);
                    };
                  }()).catch(function (error) {
                    res.status(error.code).send(error.message);
                  });
                } catch (error) {
                  res.status(500).send('Error adding new item : ' + error);
                }

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function add(_x15, _x16) {
        return _ref9.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: 'addFolder',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var parentFolderId, folderName, insertedRecord;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                parentFolderId = req.body.folderId || '-1';
                folderName = req.body.folderName;
                _context12.next = 5;
                return this.clientDb.index({
                  index: 'movie',
                  type: 'folder',
                  body: {
                    folderId: parentFolderId,
                    title: folderName
                  }
                });

              case 5:
                insertedRecord = _context12.sent;

                res.status(200).send(Object.assign(insertedRecord, { id: insertedRecord._id, title: folderName }));
                _context12.next = 12;
                break;

              case 9:
                _context12.prev = 9;
                _context12.t0 = _context12['catch'](0);

                res.status(500).send('Error adding new folder : ' + _context12.t0);

              case 12:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 9]]);
      }));

      function addFolder(_x19, _x20) {
        return _ref12.apply(this, arguments);
      }

      return addFolder;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var id, deleteResp;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                id = req.params.id;
                _context13.next = 4;
                return this.clientDb.delete({
                  index: 'movie',
                  type: 'movie',
                  id: id
                });

              case 4:
                deleteResp = _context13.sent;

                res.status(200).send(deleteResp);
                _context13.next = 11;
                break;

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13['catch'](0);

                res.status(_context13.t0.code).send(_context13.t0.message);

              case 11:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 8]]);
      }));

      function _delete(_x21, _x22) {
        return _ref13.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'deleteFolder',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
        var id, deleteResp;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                id = req.params.id;
                _context14.next = 4;
                return this.clientDb.delete({
                  index: 'movie',
                  type: 'folder',
                  id: id
                });

              case 4:
                deleteResp = _context14.sent;

                res.status(200).send(deleteResp);
                _context14.next = 11;
                break;

              case 8:
                _context14.prev = 8;
                _context14.t0 = _context14['catch'](0);

                res.status(_context14.t0.code).send(_context14.t0.message);

              case 11:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 8]]);
      }));

      function deleteFolder(_x23, _x24) {
        return _ref14.apply(this, arguments);
      }

      return deleteFolder;
    }()
  }, {
    key: '_getYoutubeVideoInfo',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(videoId) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                url = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&key=AIzaSyCYLOZ87VDexemMk77oplhrtb7Mvyo10XU&part=snippet';
                _context15.next = 3;
                return _axios2.default.get(url);

              case 3:
                response = _context15.sent;

                if (!(response.data.pageInfo.totalResults === 0)) {
                  _context15.next = 8;
                  break;
                }

                return _context15.abrupt('return', {});

              case 8:
                return _context15.abrupt('return', response.data.items[0]);

              case 9:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _getYoutubeVideoInfo(_x25) {
        return _ref15.apply(this, arguments);
      }

      return _getYoutubeVideoInfo;
    }()
  }, {
    key: '_getYoutubeVideoDefaultCaption',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(videoId) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                return _context17.abrupt('return', new Promise(function () {
                  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(resolve, reject) {
                    var url, response, xmlResponseData;
                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            url = 'http://video.google.com/timedtext?type=list&v=' + videoId;
                            _context16.next = 3;
                            return _axios2.default.get(url);

                          case 3:
                            response = _context16.sent;
                            xmlResponseData = response.data;

                            (0, _xml2js.parseString)(xmlResponseData, function (err, result) {
                              result.transcript_list.track.forEach(function (item) {
                                var subTitle = item['$'];
                                if (subTitle.lang_default) {
                                  resolve(subTitle);
                                  return;
                                }
                              });
                            });

                          case 6:
                          case 'end':
                            return _context16.stop();
                        }
                      }
                    }, _callee16, _this3);
                  }));

                  return function (_x27, _x28) {
                    return _ref17.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _getYoutubeVideoDefaultCaption(_x26) {
        return _ref16.apply(this, arguments);
      }

      return _getYoutubeVideoDefaultCaption;
    }()
  }, {
    key: '_downloadCaption',
    value: function _downloadCaption(movieId, captionObj) {
      return new Promise(function (resolve, reject) {
        var url = 'http://video.google.com/timedtext?type=track&v=' + movieId + '&lang=' + captionObj.lang_code;
        if (captionObj.name) {
          url += '&name=' + captionObj.name;
        }
        _axios2.default.get(url).then(function (resp) {
          (0, _xml2js.parseString)(resp.data, function (err, result) {
            resolve(result);
          });
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return MovieService;
}();

exports.default = MovieService;
//# sourceMappingURL=MovieService.js.map