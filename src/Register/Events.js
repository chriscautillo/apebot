import {messageHandler} from '../Events/Message/Message';
import {ready, disconnect, reconnecting} from '../Events/Status';

// This function binds the context to the called function
// and cleanly handles any errors that are thrown.
function safeEvent(bCtx, handler) {
    return function (arg) {
        let p1;
        try {
            switch (arguments.length) {
                case 0:
                    p1 = handler.call(bCtx);
                    break;
                case 1: {
                    p1 = handler.call(bCtx, arg);
                    break;
                }
                default: {
                    p1 = handler.apply(bCtx, arguments);
                }
            }
            // Global error handling for events.
            p1.catch((ex) => console.log(ex));
        } catch (ex) {
            console.log(ex);
            console.log(handler);
            console.log('Something has gone terribly wrong.');
        }
    }
}

export default function (client, bCtx) {
    // State
    client.on('ready', safeEvent(bCtx, ready));
    client.on('disconnect', safeEvent(bCtx, disconnect));
    client.on('reconnecting', safeEvent(bCtx, reconnecting));
    // Message
    client.on('message', safeEvent(bCtx, messageHandler));
}