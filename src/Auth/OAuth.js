const fs = require('fs');
const path = require('path');
const projectPath = path.resolve(__dirname, '../../');
const tokenFilePath = projectPath + '/auth.json';

export function readAuth() {
    let fileBuffer = fs.readFileSync(tokenFilePath);
    return JSON.parse(fileBuffer);
}
