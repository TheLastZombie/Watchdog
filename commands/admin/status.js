const commando = require('discord.js-commando')

module.exports = class StatusCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'status',
      aliases: ['activity'],
      group: 'admin',
      memberName: 'status',
      description: 'Sets the bot\'s Discord activity.',
      examples: [
        'status WATCHING my owner.'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'type',
          label: 'Type',
          prompt: 'Please specify the activity type (either PLAYING, STREAMING, LISTENING, WATCHING or COMPETING).',
          type: 'string',
          validate: (x) => ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'COMPETING'].includes(x)
        },
        {
          key: 'activity',
          label: 'Activity',
          prompt: 'Please specify the activity itself (any string).',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    this.client.user.setActivity(args.activity, {
      type: args.type
    }).then(msg.react(config.reactions.success))
  }
}
