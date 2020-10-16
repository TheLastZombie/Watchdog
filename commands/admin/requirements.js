const commando = require('discord.js-commando')

module.exports = class RequirementsCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'requirements',
      aliases: ['dependencies', 'deps', 'prereqs', 'prerequisities', 'reqs'],
      group: 'admin',
      memberName: 'requirements',
      description: 'Shows requirements needed for Watchdog to work. This is the same output as post-installation.',
      examples: [
        'requirements'
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

    execFile('npm', ['run', 'postinstall'], (error, stdout, stderr) => {
      if (error) {
        msg.react(config.reactions.error)
        return msg.reply(error.toString())
      }
      msg.reply('```' + stdout.split('\n').slice(3).map(x => x.trim()).join('\n') + '```').then(msg.react(config.reactions.success))
    })
  }
}
