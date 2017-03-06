import * as Status from './Events/Status'
import * as Message from './Events/Message/Message'

export default class DadBot {
    constructor(client, db, auth) {
        this.db = db
        this.auth = auth
        this._init = false
        this.client = client
    }

    /**
     * Registers events for DadBot to handle
     */
    init() {
        if (!this._init) {
            // State
            this.client.on(this, 'ready', Status.ready)
            this.client.on(this, 'disconnect', Status.disconnect)
            this.client.on(this, 'reconnecting', Status.reconnecting)
            // Message
            this.client.on(this, 'message', Message.messageHandler)
            // Set Flag
            this._init = true
        }
    }

    /**
     * Login and register events
     * @returns {Promise.<void>}
     */
    async start() {
        // Attempt to setup the client
        try {
            // Login
            await this.client.login(this.auth.token)
            // Register events
            this.init()
            // Alias user information
            this.user = this.client.user
        } catch(ex) {
            console.log(ex)
        }
    }
}