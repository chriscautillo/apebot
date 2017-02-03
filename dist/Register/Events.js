'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client, bCtx) {
    // State
    client.on('ready', safeEvent(bCtx, _Status.ready));
    client.on('disconnect', safeEvent(bCtx, _Status.disconnect));
    client.on('reconnecting', safeEvent(bCtx, _Status.reconnecting));
    // Message
    client.on('message', safeEvent(bCtx, _Message.message));
};

var _Message = require('../Events/Message');

var _Status = require('../Events/Status');

function safeEvent(bCtx, handler) {
    return function (arg) {
        try {
            switch (arguments.length) {
                case 0:
                    handler.call(bCtx);
                    break;
                case 1:
                    {
                        handler.call(bCtx, arg);
                        break;
                    }
                default:
                    {
                        handler.apply(bCtx, arguments);
                    }
            }
        } catch (ex) {
            console.log(ex);
        }
    };
}