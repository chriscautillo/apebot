/**
 * Unit Test for Message Actions
 */

import {messageFactory} from '../helpers';
import wrapper from '../../../srcOld/wrappers';
import MessageActions from '../../../srcOld/Events/Message/MessageActions';

const sinon = require('sinon');
const expect = require('chai').expect;

describe('Message Actions', () => {
    describe('Reply', () => {
        it('should handle multi option outputs', () => {
            let message = messageFactory('test');
            let stub = sinon.stub(wrapper, 'random').returns(0.5);
            MessageActions.reply(message, 'a', 'b', 'c');
            expect(message.reply.calledWith('b')).to.be.true;
            stub.returns(0.1);
            MessageActions.reply(message, 'a', 'b', 'c');
            expect(message.reply.calledWith('a')).to.be.true;
            stub.restore();
        })
    })
});