import mysql from 'mysql'
import Logger from './Logger'

export default class Database {
    constructor(auth) {
      // Since we are getting protocol connection lost errors even with pooling
      // and releasing /destroying connections, we will use CloudyMarble's advice
      // from the reference url and just keep attempt to reconnection.
      // REFERENCE URL:
      // http://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
      this.connect = () => {
        this.connection = mysql.createConnection({
          port: auth.sqlPort,
          host: auth.sqlHost,
          user: auth.sqlUser,
          password: auth.sqlPassword,
          database: auth.sqlDatabase,
        })

        this.connection.connect((err) => {
          if (err) {
            Logger.log(err)
            setTimeout(this.connect, 5000)
          }
        })

        this.connection.on('error', (err) => {
          Logger.log(err)
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            Logger.log('Connection Lost - Attempting to reconnect...')
            this.connect()
          } else {
            throw err;
          }
        })
      }

      // Create connection
      this.connect()
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
          this.connection.query(queryOptions, (ex, rows, fields) => {
            Logger.log('query submitted') // __debugging
            // Handle query result
            if (!ex) {
              Logger.log('query success') // __debugging
              resolve({
                rows,
                fields,
              })
            } else {
              Logger.log('query failed') // __debugging
              reject(ex)
            }
          })
      })
    }
}