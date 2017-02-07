import {DBConnectException} from './Errors';

const mysql = require('mysql');

export default function (authInfo) {
    let connection = mysql.createConnection({
        port: authInfo.sqlPort,
        host: authInfo.sqlHost,
        user: authInfo.sqlUser,
        password: authInfo.sqlPassword,
        database: authInfo.sqlDatabase
    });

    connection.connect(function (ex) {
        if (ex) {
            console.error('error connecting: ' + ex.stack);
            throw new DBConnectException(ex)
        } else {
            console.log('Connected to: ' + authInfo.sqlDatabase);
        }
    });

    return connection;
}