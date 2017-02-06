export default {
    reply(message, response) {
        // Handle multi-option response
        if (arguments.length > 2) {
            let responseLength = arguments.length -1;
            let responseIndex = Math.floor(Math.random() * responseLength);
            return message.reply(arguments[responseIndex + 1]);
        } else {
            return message.reply(response);
        }
    },
    kick(message) {
        return message.member.kick();
    },
    ban(message, days) {
        return message.member.ban(days);
    },
    setName(message, name) {
        return message.setNickname(name);
    }
}