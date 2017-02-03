'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readAuth = readAuth;
var fs = require('fs');
var path = require('path');
var projectPath = path.resolve(__dirname, '../../');
var tokenFilePath = projectPath + '/auth.json';

function readAuth() {
    var fileBuffer = fs.readFileSync(tokenFilePath);
    return JSON.parse(fileBuffer);
}