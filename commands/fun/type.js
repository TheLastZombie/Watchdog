const commando = require('discord.js-commando')

module.exports = class TypeCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'type',
      aliases: ['enter', 'input', 'keyboard'],
      group: 'fun',
      memberName: 'type',
      description: 'Enters specitied text into whatever program is focused right now.',
      examples: [
        'type',
        'type Hello!'
      ],
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'message',
          label: 'Message',
          prompt: 'Please enter your message. You can also specify it directly after the type command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const robot = require('robotjs')

    robot.typeString(args.message)
    msg.react(config.reactions.success)
  }
}
