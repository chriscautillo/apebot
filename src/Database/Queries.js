function asyncResolution(resolve, reject) {
    return function queryHandler(ex, rows, fields) {
        if (!ex) {
            resolve({
                rows: rows,
                fields: fields
            });
        } else {
            console.log('query error');
            reject();
        }
    }
}

function asyncQuery(connection, queryOptions) {
    return new Promise((resolve, reject) => {
        connection.query(queryOptions, asyncResolution(resolve, reject))
    });
}

export function getUsers(connection) {
    let queryOptions = {
        sql: 'SELECT * from users'
    };
    return asyncQuery(connection, queryOptions);
}

export function getMessageHandlers(connection) {
    // Get the messageHandler handlers from the database
    let queryOptions = {
        nestTables: '_',
        sql: 'SELECT * FROM messages INNER JOIN message_responses ON message_responses.message_id = messages.id ORDER BY messages.id DESC'
    };
    return asyncQuery(connection, queryOptions);
}