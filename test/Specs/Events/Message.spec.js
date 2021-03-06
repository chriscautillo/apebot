/**
 * Integration test of the Message Handler Chain
 */

import {messageHandler} from '../../../src/Events/Message/Message';
import {DadBotFactory, messageFactory} from '../helpers';

const expect = require('chai').expect;

describe('Message Handler', () => {
    it('should reply', (done) => {
        let DadBot = new DadBotFactory();
        let testMessage = messageFactory('ping');

        DadBot.setQueryHandler({
            rows: [
                {
                    message_rules_id: 1,
                    response_arguments_value: 'pong',
                    message_rules_match_value: 'ping',
                    message_rules_match_type_name: 'equals',
                    message_rules_message_action_name: 'reply'
                }
            ],
            fields: []
        })

        messageHandler(DadBot, testMessage).then(() => {
            expect(testMessage.reply.calledWith('pong')).to.be.true;
            done()
        }).catch((ex) => {
            console.log(ex)
            done(ex)
        })
    });
});