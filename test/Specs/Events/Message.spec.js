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
                messages_id: 1,
                messages_match_type: 'equals',
                messages_match_value: 'ping',
                message_responses_value: 'pong',
                messages_action_name: 'reply'
            }
        ]), testMessage).then(() => {
            expect(testMessage.reply.calledWith('pong')).to.be.true;
        });

    });
});