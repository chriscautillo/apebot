import store from './store';
import {readAuth} from './Auth/OAuth';
import RegisterEvents from './Register/Events';

// Get auth info
let authInfo = readAuth();

// Create the new discord client
const Commando = require('discord.js');
const client = new Commando.Client({
    owner: authInfo.owner
});

// Attach events
RegisterEvents(client);

// Login
client.login(authInfo.token).then(() => {
    // Setup store
    store.client = client;
    store.user = client.user;
});