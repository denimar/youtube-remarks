'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _ModuleRoutes = require('./module/ModuleRoutes');

var _ModuleRoutes2 = _interopRequireDefault(_ModuleRoutes);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use((0, _cors2.default)('*'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(_express2.default.static(_path2.default.join(__dirname, '../client')));

  // Handle React routing, return all requests to React app
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../client', 'index.html'));
  // });
}

var server = app.listen(port, function () {
  console.log('Listening on port ' + port);

  var clientDb = new _elasticsearch2.default.Client({
    host: 'http://35.211.226.16:9200' //Kibana at: http://104.196.193.93:5601 //reference: https://www.elastic.co/assets/blt395810ab50bd150b/6.3_es_commands.txt
    //log: 'trace'
  });
  clientDb.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 10000
  }, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (error) {
                console.trace('elasticsearch cluster is down!');
              } else {
                console.log('Elasticsearch is running...');
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  new _ModuleRoutes2.default(app, clientDb);
});
server.setTimeout(50000000);
//# sourceMappingURL=index.js.map
