const commando = require('discord.js-commando')

module.exports = class ScreenshotCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'screenshot',
      aliases: ['scr', 'screen', 'ss'],
      group: 'tools',
      memberName: 'screenshot',
      description: 'Takes and sends a screenshot for each available screen.',
      examples: [
        'screenshot'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'ATTACH_FILES'
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const screenshot = require('screenshot-desktop')
    const sharp = require('sharp')

    screenshot.all().then(imgs => {
      imgs.forEach(img => {
        sharp(img)
          .blur(config.blur.screenshot || 0.3)
          .toBuffer()
          .then(data => {
            msg.channel.send({
              files: [data]
            }).then(msg.react(config.reactions.success))
          })
          .catch(err => {
            msg.react(config.reactions.error)
            return msg.channel.send(err.toString())
          })
      })
    }).catch(err => {
      msg.react(config.reactions.error)
      return msg.channel.send(err.toString())
    })
  }
}
