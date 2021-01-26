const commando = require('discord.js-commando')

module.exports = class UndoCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'undo',
      aliases: ['delete', 'remove'],
      group: 'admin',
      memberName: 'undo',
      description: 'Deletes the last message sent by the bot to the current channel. Can be used multiple times.',
      examples: [
        'undo'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS'
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const path = require('path')
    const db = require('better-sqlite3')(path.join(__dirname, '..', '..', 'settings.sqlite3'))

    db.defaultSafeIntegers(true)
    const row = db.prepare('SELECT * FROM messages WHERE channel = ? ORDER BY id DESC LIMIT 1').get(msg.channel.id)
    db.prepare('DELETE FROM messages WHERE channel = ? ORDER BY id DESC LIMIT 1').run(msg.channel.id)
    db.close()

    msg.channel.fetchMessage(row.message)
      .then(message => message.delete()
        .then(msg.react(config.reactions.success)))
  }
}
