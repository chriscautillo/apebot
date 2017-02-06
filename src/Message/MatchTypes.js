export default {
    equal(message, expected) {
        return message.content === expected;
    },
    contains(message, expected) {
        return message.content.includes(expected);
    },
    regex(message, expected) {
        try {
            let re = new RegExp(expected, 'gi');
            return re.test(message);
        } catch(ex) {
            return false;
        }
    }
}