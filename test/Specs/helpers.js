const sinon = require('sinon');

export function TestContextFactory(rows) {
    this.id = 1;
    this.connection = {
        query(options, callback) {
            callback(false, rows, []);
        }
    }
}

export function messageFactory(content) {
    return {
        content: content,
        reply: sinon.stub().returns({catch(e) {}}),
        author: {
            id: 100
        },
        member: {
            kick: sinon.spy(),
            ban: sinon.spy(),
            setName: sinon.spy(),
        }
    }
}
