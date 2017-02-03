'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client) {
    // State
    client.on('ready', _Status.ready);
    client.on('disconnect', _Status.disconnect);
    client.on('reconnecting', _Status.reconnecting);
    // Message
    client.on('message', _Message.message);
};

var _Message = require('../Events/Message');

var _Status = require('../Events/Status');