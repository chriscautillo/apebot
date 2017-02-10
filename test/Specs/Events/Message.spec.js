/**
 * Integration test of the Message Handler Chain
 */

import {messageHandler} from '../../../src/Events/Message/Message';
import {TestContextFactory, messageFactory} from '../helpers';

const expect = require('chai').expect;

describe('Message Handler', () => {
    it('should reply', () => {
        let testMessage = messageFactory('ping');

        messageHandler.call(new TestContextFactory([
            {
                expected_messages_id: 1,
                response_arguments_value: 'pong',
                expected_messages_match_value: 'ping',
                expected_messages_match_type_name: 'equals',
                expected_messages_message_action_name: 'reply'
            }
        ]), testMessage).then(() => {
            expect(testMessage.reply.calledWith('pong')).to.be.true;
        });

    });
});