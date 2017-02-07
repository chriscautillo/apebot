export function DBConnectException(ex) {
    this.name = 'DBConnectException';
    this.stack = ex ? ex.stack : null;
    this.message = 'Unable to connect to database';
}