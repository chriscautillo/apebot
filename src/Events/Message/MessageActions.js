import wrappers from '../../Wrappers/Math';

export default {
    reply(DadBot, message, ...args) {
        // Handle multi-option response
        if (args.length > 1) {
            let responseIndex = Math.floor(wrappers.random() * args.length);
            return message.reply(args[responseIndex]);
        } else {
            return message.reply(args[0]);
        }
    },
    kick(DadBot, message) {
        return message.member.kick();
    },
    ban(DadBot, message, days) {
        return message.member.ban(days);
    },
    setName(DadBot, message, name) {
        return message.member.setNickname(name);
    }
}