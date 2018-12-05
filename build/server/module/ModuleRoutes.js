'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MovieController = require('./movie/MovieController');

var _MovieController2 = _interopRequireDefault(_MovieController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleRoutes = function ModuleRoutes(app, clientDb) {
  _classCallCheck(this, ModuleRoutes);

  new _MovieController2.default(app, clientDb);
};

exports.default = ModuleRoutes;
//# sourceMappingURL=ModuleRoutes.js.map