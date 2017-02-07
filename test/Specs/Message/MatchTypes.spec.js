/**
 * Unit Test for Message Type Matching
 */

import MatchTypes from '../../../src/Events/Message/MatchTypes';

let expect = require('chai').expect;

describe('Message Match Types', () => {
    describe('equals', () => {
        it('should match exactly', () => {
            let value = MatchTypes.equals({
                content: 'hello'
            }, 'hello');
            expect(value).to.be.true;

        });
        it('should fail on partial', () => {
            let value = MatchTypes.equals({
                content: 'hello again'
            }, 'hello');
            expect(value).to.be.false;
        })
    });

    describe('contains', () => {
        it('should match exactly', () => {
            let value = MatchTypes.contains({
                content: 'hello'
            }, 'hello');
            expect(value).to.be.true;

        });
        it('should match on partial', () => {
            let value = MatchTypes.contains({
                content: 'hello again'
            }, 'hello');
            expect(value).to.be.true;
        })
    });

    describe('regex', () => {
        it('should cleanly fail on invalid regex', () => {
            let badRE = '/no_closing_(/';
            let value = MatchTypes.regex({
                content: 'hello'
            }, badRE);
            expect(value).to.be.false;
        });
        it('should match valid regular expressions', () => {
            let willMatchRE = '^h.*o$';
            let value = MatchTypes.regex({
                content: 'hello'
            }, willMatchRE);
            expect(value).to.be.true;
        })
    })
});