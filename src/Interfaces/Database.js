import mysql from 'mysql'

export default class Database {
    constructor(auth) {
        this.pool = mysql.createPool({
            connectionLimit: 10,
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
        return new Promise((resolve, reject) => {
            // Get connection from pool
            this.pool.getConnection((err, connection) => {
                if (err) {
                    // Check for connection error
                    console.log('Unable to create connection from pool.')
                    if (connection) {
                        connection.destroy()
                    }
                    reject(err)
                } else {
                    // Listen for other connection errors
                    connection.on('error', (err) => {
                        console.log(err)
                        console.log('Database connection error')
                    })

                    // Run the query
                    connection.query(queryOptions, (ex, rows, fields) => {
                        // Tear down connection
                        connection.destroy()

                        // Handle query result
                        if (!ex) {
                            resolve({
                                rows: rows,
                                fields: fields
                            })
                        } else {
                            reject(err)
                        }
                    })
                }
            })
        })
    }
}