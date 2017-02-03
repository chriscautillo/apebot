'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ready = ready;
exports.reconnecting = reconnecting;
exports.disconnect = disconnect;
function ready() {
    console.log('Dadbot ready');
}

function reconnecting() {
    console.log('Dadbot reconnecting');
}

function disconnect() {
    console.log('Dadbot disconnected');
}