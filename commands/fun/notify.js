const commando = require('discord.js-commando')

module.exports = class NotifyCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'notify',
      aliases: ['msg', 'notification'],
      group: 'fun',
      memberName: 'notify',
      description: 'Sends a notification, similar to sending a direct message.',
      examples: [
        'notify',
        'notify Hello!'
      ],
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'message',
          label: 'Message',
          prompt: 'Please enter your message. You can also specify it directly after the notify command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const notifier = require('node-notifier')

    console.log('[Notify] Creating notification with content: ' + args.message.replace(/\n.*/, '...'))

    notifier.notify({
      title: msg.author.tag + ' via Watchdog',
      message: args.message,
      wait: true
    }, (err, response) => {
      if (err) {
        msg.react(config.reactions.error)
        return msg.channel.send(err.toString())
      }
      msg.react(config.reactions.success)
    })
  }
}
