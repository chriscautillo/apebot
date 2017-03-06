/**
 * Unit Test for Message Actions
 */

import {messageFactory} from '../helpers';
import wrapper from '../../../src/Wrappers/Math';
import MessageActions from '../../../src/Events/Message/MessageActions';

const sinon = require('sinon');
const expect = require('chai').expect;

describe('Message Actions', () => {
    describe('Reply', () => {
        it('should handle multi option outputs', () => {
            let message = messageFactory('test');
            let stub = sinon.stub(wrapper, 'random').returns(0.5);
            MessageActions.reply(null, message, 'a', 'b', 'c');
            expect(message.reply.calledWith('b')).to.be.true;
            stub.returns(0.1);
            MessageActions.reply(null, message, 'a', 'b', 'c');
            expect(message.reply.calledWith('a')).to.be.true;
            stub.restore();
        })
    })
});