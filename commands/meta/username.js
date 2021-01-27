const commando = require('discord.js-commando')

module.exports = class UsernameCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'username',
      aliases: ['name'],
      group: 'meta',
      memberName: 'username',
      description: 'Sets the bot\'s Discord username.',
      examples: [
        'username Watchdog'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'name',
          label: 'Name',
          prompt: 'Please enter the wanted username. You can also specify it directly after the username command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    console.log('[Username] Changing username: ' + args.name.replace(/\n.*/, '...'))

    this.client.user.setUsername(args.name).then(msg.react(config.reactions.success))
  }
}
