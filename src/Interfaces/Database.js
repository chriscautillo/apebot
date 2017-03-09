import mysql from 'mysql'

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
        console.log('query') // __debugging
        return new Promise((resolve, reject) => {
            // Get connection from pool
            this.pool.getConnection((err, connection) => {
                console.log('connection obtained') // __debugging
                if (err) {
                    // Check for connection error
                    console.log('Unable to create connection from pool.')
                    if (connection) {
                        connection.release()
                    }
                    reject(err)
                } else {
                    console.log('connection success') // __debugging
                    // Run the query
                    connection.query(queryOptions, (ex, rows, fields) => {
                        console.log('query submitted') // __debugging
                        // Tear down connection
                        connection.release()

                        // Handle query result
                        if (!ex) {
                            console.log('query success') // __debugging
                            resolve({
                                rows,
                                fields,
                            })
                        } else {
                            console.log('query failed') // __debugging
                            reject(err)
                        }
                    })
                }
            })
        })
    }
}