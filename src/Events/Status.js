import Logger from '../Interfaces/Logger'

export function ready() {
    return new Promise((resolve) => {
        Logger.log('Dadbot ready');
        resolve();
    });
}

export function reconnecting() {
    return new Promise((resolve) => {
        Logger.log('Dadbot reconnecting');
        resolve();
    });
}

export function disconnect() {
    return new  Promise((resolve) => {
        Logger.log('Dadbot disconnected');
        resolve();
    });
}