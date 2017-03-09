import Logger from './Logger'

export default class Client
{
    constructor(ClientLib, auth) {
        // Create the new discord client
        this.client = new ClientLib.Client({
            owner: auth.owner
        });
    }

    /**
     * Login client
     * @param token
     * @returns {Promise.<void>}
     */
    async login(token) {
        await this.client.login(token)
    }

    /**
     * Listen for a client event
     * @param cb
     * @param event
     * @param DadBot
     */
    on(DadBot, event, cb) {
        // Register the event
        this.client.on(event, (...args) => {
            // Do not crash the application if a fatal occurs
            try {
                // Run the callback
                let p = cb(DadBot, ...args)
                // If the callback returns a promise, cleanly handle exceptions
                if (p.catch) {
                    p.catch(ex => {
                        Logger.log(ex)
                        Logger.log('Error handling ' + event)
                    })
                } else {
                    Logger.log('Handler for event ' + event + ' did not return a promise.')
                }
            } catch(ex) {
                Logger.log(ex)
                Logger.log('Error handling ' + event)
            }
        })
    }
}