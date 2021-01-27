const commando = require('discord.js-commando')

module.exports = class WebcamgifCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'webcamgif',
      aliases: ['camgif', 'cameragif', 'gif', 'wcg', 'wcgif'],
      group: 'tools',
      memberName: 'webcamgif',
      description: 'Records a video using the default camera for the specified length.',
      examples: [
        'webcamgif',
        'webcamgif 2500'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'ATTACH_FILES'
      ],
      args: [
        {
          key: 'duration',
          label: 'Duration',
          prompt: 'How long do you want the recording to be? Please specify a duration in ms (15000 maximum).',
          type: 'integer',
          validate: (x) => x < 15000,
          default: require('../../config').limits.webcamgif
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const { VideoCapture } = require('camera-capture')
    const fs = require('fs')

    console.log('[Webcamgif] Capturing ' + args.duration + ' ms long video with default device')

    const c = new VideoCapture({
      port: 2347
    })
    c.initialize().then(() => {
      c.startRecording().then(() => {
        setTimeout(() => {
          c.stopRecording().then(data => {
            fs.writeFileSync('output/webcamgif.webm', data)
            msg.channel.send({
              files: ['output/webcamgif.webm']
            }).then(msg.react(config.reactions.success))
          })
        }, args.duration)
      })
    })
  }
}
