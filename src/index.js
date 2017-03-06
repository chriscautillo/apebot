// Stack trace support
import { install } from 'source-map-support'
install()

import DadBot from './DadBot'
import {readAuth} from './Auth/OAuth'
import Client from './Interfaces/Client'
import Database from './Interfaces/Database'

// Get auth info
let AppAuth = readAuth()

// Create Interfaces
let AppDatabase = new Database(AppAuth)
let AppClient = new Client(require('discord.js-commando'), AppAuth)

// Create Bot
let AppBot = new DadBot(AppClient, AppDatabase, AppAuth)

// Start Bot
AppBot.start().then(
    () => {
        console.log('DadBot started')
    }
).catch(() => {
    console.log('Unable to start bot.')
})