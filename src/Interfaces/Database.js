import mysql from 'mysql'
import Logger from './Logger'

export default class Database {
    constructor(auth) {
        this.pool = mysql.createPool({
            port: auth.sqlPort,
            host: auth.sqlHost,
            user: auth.sqlUser,
            password: auth.sqlPassword,
            database: auth.sqlDatabase,
        });
    }

    /**
     * submits a queryOption object to the database. Successful promise returns result object {rows: [], fields: []}
     * @param queryOptions
     * @returns {Promise}
     */
    query(queryOptions) {
        // Create promise
        Logger.log('query') // __debugging
        return new Promise((resolve, reject) => {
            // Get connection from pool
            this.pool.getConnection((err, connection) => {
                Logger.log('connection obtained') // __debugging
                if (err) {
                    // Check for connection error
                    Logger.log('Unable to create connection from pool.')
                    if (connection) {
                        connection.release()
                    }
                    reject(err)
                } else {
                    Logger.log('connection success') // __debugging
                    // Run the query
                    connection.query(queryOptions, (ex, rows, fields) => {
                        Logger.log('query submitted') // __debugging
                        // Tear down connection
                        connection.release()

                        // Handle query result
                        if (!ex) {
                            Logger.log('query success') // __debugging
                            resolve({
                                rows,
                                fields,
                            })
                        } else {
                            Logger.log('query failed') // __debugging
                            reject(err)
                        }
                    })
                }
            })
        })
    }
}