const commando = require('discord.js-commando')

module.exports = class NeofetchCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'neofetch',
      aliases: ['archey', 'info', 'linuxlogo', 'screenfetch', 'system'],
      group: 'admin',
      memberName: 'neofetch',
      description: 'Shows information about the host\'s system using Neofetch.',
      examples: [
        'neofetch'
      ],
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
    const execFileSync = require('child_process').execFileSync

    execFile('neofetch', ['--stdout'], (error, stdout, stderr) => {
      if (error) {
        msg.react(config.reactions.error)
        return msg.reply(error.toString())
      }
      msg.reply('```' + stdout + '```')
      msg.react(config.reactions.success)
    })
  }
}
