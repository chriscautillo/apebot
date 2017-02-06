import Database from './Database/Connect';

export default class {
    constructor (client, authInfo) {
        this.client = client;
        this.id = authInfo.appID;
        // Attempt to create a connection to the MySQL database.
        this.connection = Database(authInfo);
    }
    
    onLogin() {
        this.user = this.client.user;
    }
}