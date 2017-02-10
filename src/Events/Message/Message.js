import lodash from 'lodash';
import MatchTypes from './MatchTypes';
import MessageActions from './MessageActions';
import {getMessageHandlers} from '../../Database/Queries';

function sortMessageResponses(_a, _b) {
    let a = _a.response_arguments_index;
    let b = _b.response_arguments_index;
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
    // Check that the messageHandler meets the expected match type and value.
    if (MatchTypes[baseHandler.message_rules_match_type_name](message, baseHandler.message_rules_match_value)) {
        // Collect all the values from the joined message_responses table, in the order of their index.
        let args = handlerGroup.sort(sortMessageResponses).map((rowData) => rowData.response_arguments_value);
        args.unshift(message);
        // Run the success action
        MessageActions[baseHandler.message_rules_message_action_name].apply(this, args).catch((ex) => {
            console.log(ex);
        });
    }
}

export function messageHandler(message) {
    return new Promise((resolve) => {
        // Do not apply messageHandler handling to messages sent from this bot.
        if (message.author.id == this.id) {
            return;
        }

        getMessageHandlers(this.connection).then((result) => {
            //Collect all of the same messageHandler handlers together
            let handlers = lodash.groupBy(result.rows, 'message_rules_id');
            Object.keys(handlers).forEach((key) => {
                let handler = handlers[key];
                // If there is a messageHandler handler run it.
                if (Array.isArray(handler) && handler.length > 0) {
                    runHandler.apply(this, [handler, message]);
                }
            });
            // Finished handling message.
            resolve();
        });
    });
}