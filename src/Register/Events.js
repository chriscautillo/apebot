import {message} from '../Events/Message';
import {ready, disconnect, reconnecting} from '../Events/Status';

function safeEvent(bCtx, handler) {
    return function (arg) {
        try {
            switch (arguments.length) {
                case 0:
                    handler.call(bCtx);
                    break;
                case 1: {
                    handler.call(bCtx, arg);
                    break;
                }
                default: {
                    handler.apply(bCtx, arguments);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }
}

export default function (client, bCtx) {
    // State
    client.on('ready', safeEvent(bCtx, ready));
    client.on('disconnect', safeEvent(bCtx, disconnect));
    client.on('reconnecting', safeEvent(bCtx, reconnecting));
    // Message
    client.on('message', safeEvent(bCtx, message));
}