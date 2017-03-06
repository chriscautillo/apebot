const fs = require('fs')
const path = require('path')
const projectPath = path.resolve(__dirname, '../')
const tokenFilePath = projectPath + '/auth.json'

/**
 * Reads the auth.json file in the project root
 */
export function readAuth() {
    let fileBuffer = fs.readFileSync(tokenFilePath)
    return JSON.parse(fileBuffer)
}
