const commando = require('discord.js-commando')

module.exports = class NicknameCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'nickname',
      aliases: ['nick'],
      group: 'meta',
      memberName: 'nickname',
      description: 'Sets the bot\'s Discord nickname for the current server.',
      examples: [
        'nickname [!] Watchdog'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS',
        'CHANGE_NICKNAME',
        'SEND_MESSAGES'
      ],
      args: [
        {
          key: 'name',
          label: 'Name',
          prompt: 'Please enter the wanted nickname. You can also specify it directly after the nickname command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    if (!msg.guild) {
      msg.react(config.reactions.error)
      return msg.channel.send('This command can only be used in guilds!')
    }

    msg.guild.me.setNickname(args.name).then(msg.react(config.reactions.success))
  }
}
