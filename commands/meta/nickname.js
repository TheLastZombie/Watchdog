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
      guildOnly: true,
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

    console.log('[Nickname] Changing nickname: ' + args.name.replace(/\n.*/, '...'))

    msg.guild.me.setNickname(args.name).then(msg.react(config.reactions.success))
  }
}
