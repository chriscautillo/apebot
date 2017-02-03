import {message} from '../Events/Message';
import {ready, disconnect, reconnecting} from '../Events/Status';

export default function (client) {
    // State
    client.on('ready', ready);
    client.on('disconnect', disconnect);
    client.on('reconnecting', reconnecting);
    // Message
    client.on('message', message);
}