const commando = require('discord.js-commando')

module.exports = class WebcamwebmCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'webcamwebm',
      aliases: ['camwebm', 'camerawebm', 'webm', 'wcw', 'wcwebm'],
      group: 'tools',
      memberName: 'webcamwebm',
      description: 'Records a video using the default camera for the specified length.',
      examples: [
        'webcamwebm',
        'webcamwebm 2500'
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
          validate: (x) => x < 15000 && x > 0,
          default: require('../../config').limits.video
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const { VideoCapture } = require('camera-capture')
    const getPort = require('get-port')
    const fs = require('fs')

    getPort().then(port => {
      console.log('[Webcamwebm] Capturing ' + args.duration + ' ms long video via port ' + port)

      const c = new VideoCapture({
        port: port
      })
      c.initialize().then(() => {
        c.startRecording().then(() => {
          setTimeout(() => {
            c.stopRecording().then(data => {
              fs.writeFileSync('output/webcamwebm.webm', data)
              c.stop()
              msg.channel.send({
                files: ['output/webcamwebm.webm']
              }).then(msg.react(config.reactions.success))
            })
          }, args.duration)
        })
      }).catch(error => {
        if (error.toString().startsWith('Error: Evaluation failed: DOMException: ')) msg.react(config.reactions.error)
      })
    })
  }
}
