import botContext from './botContext';
import {readAuth} from './Auth/OAuth';
import RegisterEvents from './Register/Events';

// Get auth info
let authInfo = readAuth();

// Create the new discord client
const Commando = require('discord.js');
const client = new Commando.Client({
    owner: authInfo.owner
});

// This will be the 'this' context for events.
const bCtx = new botContext(client, authInfo);

// Attach events
RegisterEvents(client, bCtx);

// Login
client.login(authInfo.token).then(() => {
    bCtx.onLogin();
}).catch((ex) => {
    console.log(ex);
    console.log('Unable to login.');
});