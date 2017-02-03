import handlers from './MessageHandlers';

export function message(message) {
    // Do not apply message handling to messages sent from this bot.
    if (message.author.id == this.id) {
        return;
    }

    handlers.forEach((handler) => {
        handler.run.call(this, message);
    })
}