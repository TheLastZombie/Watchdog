const commando = require('discord.js-commando')

module.exports = class UpdateCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'update',
      aliases: ['fetch', 'pull', 'upgrade'],
      group: 'admin',
      memberName: 'update',
      description: 'Updates Watchdog by fetching and merging the latest changes from GitHub.',
      examples: [
        'update'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES'
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const execFile = require('child_process').execFile

    execFile('git', ['pull'], (error, stdout, stderr) => {
      if (error) {
        msg.react(config.reactions.error)
        return msg.reply(error.toString())
      }
      msg.reply('```' + stdout + '```').then(msg.react(config.reactions.success))
    })
  }
}
