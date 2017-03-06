const sinon = require('sinon');

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function DadBotFactory(id = 1) {
    this.id = id;
    this.db = new DBFactory()

    this.setQueryHandler = (handler) => {
        this.db.queryHandler = handler
    }
}

export function DBFactory() {
    this.queryHandler = null

    this.query = (options) => {
        return new Promise((resolve, reject) => {
            if (!this.queryHandler) {
                reject('No query handler set')
            } else if (isFunction(this.queryHandler)) {
                resolve(this.queryHandler(options))
            } else {
                resolve(this.queryHandler)
            }
        })
    }
}

export function messageFactory(content, id = 100, guildID = 100) {
    return {
        content: content,
        reply: sinon.stub().returns(new Promise((resolve) => { resolve() })),
        author: {
            id
        },
        guild: {
            id: guildID
        },
        member: {
            kick: sinon.spy(),
            ban: sinon.spy(),
            setName: sinon.spy(),
        }
    }
}
