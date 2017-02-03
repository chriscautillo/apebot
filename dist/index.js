'use strict';

var _botContext = require('./botContext');

var _botContext2 = _interopRequireDefault(_botContext);

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

var bCtx = new _botContext2.default(client, authInfo);

// Attach events
(0, _Events2.default)(client, bCtx);

// Login
client.login(authInfo.token).then(function () {
    bCtx.onLogin();
});