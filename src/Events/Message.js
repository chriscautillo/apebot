import lodash from 'lodash';
import MatchTypes from '../Message/MatchTypes';
import MessageActions from '../Message/MessageActions';
import {getMessageHandlers} from '../Database/Queries';

function sortMessageResponses(_a, _b) {
    let a = _a.message_responses_index;
    let b = _b.message_responses_index;
    if (a > b) {
        return 1;
    } else if (b > a) {
        return -1;
    } else {
        return 0;
    }
}

function runHandler(handlerGroup, message) {
    // Data from the messages table will be the same for all records, so use the first one.
    let baseHandler = handlerGroup[0];
    // Check that the message meets the expected match type and value.
    if (MatchTypes[baseHandler.messages_match_type](message, baseHandler.messages_match_value)) {
        // Collect all the values from the joined message_responses table, in the order of their index.
        let args = handlerGroup.sort(sortMessageResponses).map((rowData) => rowData.message_responses_value);
        args.unshift(message);
        // Run the success action
        MessageActions[baseHandler.messages_action_name].apply(this, args).catch((err) => {
            console.log(err);
        });
    }

}

export function message(message) {
    // Do not apply message handling to messages sent from this bot.
    if (message.author.id == this.id) {
        return;
    }

    getMessageHandlers(this.connection).then((result) => {
        //Collect all of the same message handlers together
        let handlers = lodash.groupBy(result.rows, 'messages_id');
        Object.keys(handlers).forEach((key) => {
            let handler = handlers[key];
            // If there is a message handler run it.
            if (Array.isArray(handler) && handler.length > 0) {
                runHandler.apply(this, [handler, message]);
            }

        });
    });
}