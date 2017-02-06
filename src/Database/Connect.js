import {DBConnectException} from './Errors';

const mysql = require('mysql');

export default function (authInfo) {
    let connection = mysql.createConnection({
        host: authInfo.sqlHost,
        user: authInfo.sqlUser,
        password: authInfo.sqlPassword,
        database: authInfo.sqlDatabase
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            throw new DBConnectException(err)
        } else {
            console.log('Connected to: ' + authInfo.sqlDatabase);
        }
    });

    return connection;
}