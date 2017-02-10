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

export function getMessageHandlers(connection, guildID) {
    // Get the messageHandler handlers from the database
    let queryOptions = {
        nestTables: '_',
        sql: 'SELECT * FROM message_rules ' +
        'LEFT JOIN response_arguments ' +
        'ON response_arguments.message_rule_id = message_rules.id ' +
        'WHERE message_rules.guild_real_id = ?' +
        'ORDER BY message_rules.id DESC',
        values: [guildID]
    };
    return asyncQuery(connection, queryOptions);
}