/**
 * Integration test of the Message Handler Chain
 */

import {messageHandler} from '../../../srcOld/Events/Message/Message';
import {TestContextFactory, messageFactory} from '../helpers';

const expect = require('chai').expect;

describe('Message Handler', () => {
    it('should reply', () => {
        let testMessage = messageFactory('ping');

        messageHandler.call(new TestContextFactory([
            {
                message_rules_id: 1,
                response_arguments_value: 'pong',
                message_rules_match_value: 'ping',
                message_rules_match_type_name: 'equals',
                message_rules_message_action_name: 'reply'
            }
        ]), testMessage).then(() => {
            expect(testMessage.reply.calledWith('pong')).to.be.true;
        });

    });
});