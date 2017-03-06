/**
 * Gets all users from the users table
 * @param database
 */
export function getUsers(database) {
    let queryOptions = {
        sql: 'SELECT * from users'
    };
    return database.query(queryOptions)
}

/**
 * Gets message rules and the associated arguments by guildID
 * @param database
 * @param guildID
 */
export function getMessageHandlers(database, guildID) {
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
    return database.query(queryOptions)
}