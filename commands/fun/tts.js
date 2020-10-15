const commando = require('discord.js-commando')

module.exports = class TtsCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'tts',
      aliases: ['say', 'speak'],
      group: 'fun',
      memberName: 'tts',
      description: 'Reads a message out loud using the default TTS engine.',
      examples: [
        'tts',
        'tts Hello!'
      ],
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'message',
          label: 'Message',
          prompt: 'Please enter your message. You can also specify it directly after the tts command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const say = require('say')

    say.speak(args.message, undefined, undefined, err => {
      if (err) {
        msg.react(config.reactions.error)
        return msg.reply(err.toString())
      }
      msg.react(config.reactions.success)
    })
  }
}
