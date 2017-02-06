export function DBConnectException(err) {
    this.name = 'DBConnectException';
    this.stack = err ? err.stack : null;
    this.message = 'Unable to connect to database';
}