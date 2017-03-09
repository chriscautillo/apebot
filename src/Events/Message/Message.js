import lodash from 'lodash';
import MatchTypes from './MatchTypes';
import Logger from '../../Interfaces/Logger'
import MessageActions from './MessageActions';
import {getMessageHandlers} from '../../Database/Queries';

/**
 * Sort arguments by index
 * @param _a
 * @param _b
 * @returns {number}
 */
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

/**
 * Run message handles
 * @param DadBot
 * @param handlerGroup
 * @param message
 */
function runHandler(DadBot, handlerGroup, message) {
    // Data from the messages table will be the same for all records, so use the first one.
    let baseHandler = handlerGroup[0];
    // Check that the messageHandler meets the expected match type and value.
    if (MatchTypes[baseHandler.message_rules_match_type_name](message, baseHandler.message_rules_match_value)) {
        // Collect all the values from the joined message_responses table, in the order of their index.
        let args = handlerGroup.sort(sortMessageResponses).map((rowData) => rowData.response_arguments_value);
        // Run the success action
        MessageActions[baseHandler.message_rules_message_action_name](DadBot, message, ...args).then(() => {
            Logger.log('Handling input from ' + message.author.id)
        }).catch((ex) => {
            Logger.log(ex);
        });
    }
}

/**
 * Get message handler
 * @param DadBot
 * @param message
 * @returns {Promise}
 */
export function messageHandler(DadBot, message) {
    // Do not apply messageHandler handling to messages sent from this bot.
    if (message.author.id == DadBot.id) {
        return;
    }

    // Only response to guild messages
    if (!message.guild || !message.guild.id) {
        return;
    }
    // Return handler promise
    return getMessageHandlers(DadBot.db, message.guild.id).then(
        (result) => {
            //Collect all of the same messageHandler handlers together
            let handlers = lodash.groupBy(result.rows, 'message_rules_id');
            Object.keys(handlers).forEach((key) => {
                let handler = handlers[key];
                // If there is a messageHandler handler run it.
                if (Array.isArray(handler) && handler.length > 0) {
                    runHandler(DadBot, handler, message);
                }
            });
        }
    )
}