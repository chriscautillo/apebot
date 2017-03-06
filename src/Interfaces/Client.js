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
                        console.log(ex)
                        console.log('Error handling ' + event)
                    })
                }
            } catch(ex) {
                console.log(ex)
                console.log('Error handling ' + event)
            }
        })
    }
}