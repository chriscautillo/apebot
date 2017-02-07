export function ready() {
    return new Promise((resolve) => {
        console.log('Dadbot ready');
        resolve();
    });
}

export function reconnecting() {
    return new Promise((resolve) => {
        console.log('Dadbot reconnecting');
        resolve();
    });
}

export function disconnect() {
    return new  Promise((resolve) => {
        console.log('Dadbot disconnected');
        resolve();
    });
}