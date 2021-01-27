const commando = require('discord.js-commando')

module.exports = class ClipboardCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'clipboard',
      aliases: ['clip', 'copy', 'paste'],
      group: 'fun',
      memberName: 'clipboard',
      description: 'Gets clipboard contents (or sets them, if a message is specified).',
      examples: [
        'clipboard',
        'clipboard Hello!'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES'
      ],
      args: [
        {
          key: 'message',
          label: 'Message',
          prompt: 'Please enter your message. You can also specify it directly after the clipboard command.',
          type: 'string',
          default: false
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const clipboardy = require('clipboardy')

    if (args.message) {
      console.log('[Clipboard] Setting clipboard to content: ' + args.message.replace(/\n.*/, '...'))

      clipboardy.writeSync(args.message)
      msg.react(config.reactions.success)
    } else {
      console.log('[Clipboard] Sending current content: ' + clipboardy.readSync().replace(/\n.*/, '...'))

      msg.channel.send('```' + clipboardy.readSync().replace(/`/g, '﻿`') + '```').then(msg.react(config.reactions.success))
    }
  }
}
