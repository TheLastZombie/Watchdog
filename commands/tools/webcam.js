const commando = require('discord.js-commando')

module.exports = class WebcamCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'webcam',
      aliases: ['cam', 'camera', 'wc'],
      group: 'tools',
      memberName: 'webcam',
      description: 'Sends a snapshot of a video input source, usually a camera.',
      examples: [
        'webcam',
        'webcam 1',
        'webcam /dev/video0',
        'webcam list'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'ATTACH_FILES'
      ],
      args: [
        {
          key: 'camera',
          label: 'Camera',
          prompt: 'Which camera do you want to use? Reply list to get a list of all cameras currently connected.',
          type: 'integer|string',
          default: 1
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const NodeWebcam = require('node-webcam')
    const Jimp = require('jimp')
    const sharp = require('sharp')

    NodeWebcam.list(list => {
      if (args.camera === 'list') {
        console.log('[Webcam] Responding with list of available input sources')

        return msg.channel.send(list
          .map((x, i) => '**' + (i + 1) + '.** ' + x + '\n')
          .join('')
        ).then(msg.react(config.reactions.success))
      }

      const cName = list.indexOf(args.camera)
      const cId = --args.camera

      console.log('[Webcam] Capturing image with device ' + (cName === -1 ? cId : cName))

      NodeWebcam.capture('output/webcam', {
        device: cName === -1 ? cId : cName,
        callbackReturn: 'buffer'
      }, async (err, data) => {
        if (err) {
          msg.react(config.reactions.error)
          return msg.channel.send(err.toString())
        }

        if (process.platform === 'win32') {
          data = await Jimp.read(data)
          data = await data.getBufferAsync(Jimp.MIME_JPEG)
        }

        sharp(data)
          .blur(config.blur.webcam || 0.3)
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
    })
  }
}
