export default class {
    constructor (client, authInfo) {
        this.client = client;
        this.id = authInfo.appID;
    }
    
    onLogin() {
        this.user = this.client.user;
    }
}