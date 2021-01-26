const config = require('./config')

const Commando = require('discord.js-commando')
const path = require('path')
const sqlite = require('sqlite')
const fs = require('fs')

const client = new Commando.Client({
  commandPrefix: config.prefix,
  owner: config.owner,
  invite: 'https://discord.gg/yWMsqKFv'
})

client.registry
  .registerGroups([
    ['fun', 'Fun commands'],
    ['tools', 'Tools and utilities'],
    ['admin', 'Administrative commands'],
    ['meta', 'Discord metadata']
  ])
  .registerDefaults()
  .registerCommandsIn(path.resolve(__dirname, 'commands'))

client.setProvider(
  sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error)

if (!fs.existsSync('output')) fs.mkdirSync('output')

client.login(config.token)

client.on('message', msg => {
  if (msg.author.id !== client.user.id) return

  const db = require('better-sqlite3')(path.join(__dirname, 'settings.sqlite3'))
  db.prepare('CREATE TABLE IF NOT EXISTS messages (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, channel INTEGER, message INTEGER)').run()
  db.prepare('INSERT INTO messages (channel, message) VALUES (?, ?)').run(msg.channel.id, msg.id)
  db.close()
})
