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

    screenshot.listDisplays().then(displays => {
      screenshot.all().then(imgs => {
        imgs = imgs.map((x, i) => {
          return {
            input: x,
            top: displays[i].offsetY || displays[i].top || 0,
            left: displays[i].offsetX || displays[i].left || 0
          }
        })

        sharp({
          create: {
            width: Math.max(...displays.map(x => x.width + (x.offsetX || x.left || 0))),
            height: Math.max(...displays.map(x => x.height + (x.offsetY || x.top || 0))),
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          }
        })
          .composite(imgs)
          .jpeg()
          .toBuffer()
          .then(data => {
            sharp(data)
              .blur(config.blur.screenshot || 0.3)
              .toBuffer()
              .then(data => {
                msg.channel.send({
                  files: [data]
                }).then(msg.react(config.reactions.success))
              })
          })
      }).catch(err => {
        msg.react(config.reactions.error)
        return msg.channel.send(err.toString())
      })
    })
  }
}
