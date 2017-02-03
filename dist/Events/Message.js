'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.message = message;

var _MessageHandlers = require('./MessageHandlers');

var _MessageHandlers2 = _interopRequireDefault(_MessageHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function message(message) {
    var _this = this;

    // Do not apply message handling to messages sent from this bot.
    if (message.author.id == this.id) {
        return;
    }

    _MessageHandlers2.default.forEach(function (handler) {
        handler.run.call(_this, message);
    });
}