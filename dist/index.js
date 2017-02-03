'use strict';

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _OAuth = require('./Auth/OAuth');

var _Events = require('./Register/Events');

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get auth info
var authInfo = (0, _OAuth.readAuth)();

// Create the new discord client
var Commando = require('discord.js');
var client = new Commando.Client({
    owner: authInfo.owner
});

// Attach events
(0, _Events2.default)(client);

// Login
client.login(authInfo.token).then(function () {
    // Setup store
    _store2.default.client = client;
    _store2.default.user = client.user;
});