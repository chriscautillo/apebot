'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    id: 0,
    run: function run(message) {
        if (message.content == 'ping') {
            message.reply('pong');
        }
    }
}, {
    id: 1,
    run: function run(message) {
        if (/imgur\.com\//.test(message.content)) {
            message.reply('nice memes bro');
        }
    }
}, {
    id: 2,
    run: function run(message) {
        if (/((a|an|\d+) .+){3}/gi.test(message.content)) {
            var family = ['Family.', 'That\'s a family', 'Do I even need to say it?', 'My family is just ten dads', 'It might not look like it, but that is a family'];
            var response = family[Math.floor(Math.random() * family.length)];
            message.reply(response);
        }
    }
}];