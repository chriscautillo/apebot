'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client) {
    client.on('ready', function () {
        console.log('Dadbot ready');
    });

    client.on('message', function (message) {
        if (message.content == 'ping') {
            message.reply('pong');
        }
    });
};