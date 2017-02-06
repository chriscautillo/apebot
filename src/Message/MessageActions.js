export default {
    reply(message, response) {
        return message.reply(response);
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