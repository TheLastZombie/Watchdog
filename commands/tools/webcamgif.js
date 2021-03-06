const commando = require('discord.js-commando')

module.exports = class WebcamgifCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'webcamgif',
      aliases: ['camgif', 'cameragif', 'gif', 'wcg', 'wcgif'],
      group: 'tools',
      memberName: 'webcamgif',
      description: 'Records a GIF using the default camera for the specified length.',
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
    const childProcess = require('child_process')
    const pathToFfmpeg = require('ffmpeg-static')

    getPort().then(port => {
      console.log('[Webcamgif] Capturing ' + args.duration + ' ms long GIF via port ' + port)

      const c = new VideoCapture({
        port: port
      })
      c.initialize().then(() => {
        c.startRecording().then(() => {
          setTimeout(() => {
            c.stopRecording().then(data => {
              fs.writeFileSync('output/webcamgif.webm', data)
              c.stop()
              childProcess.execFileSync(pathToFfmpeg, [
                '-hide_banner',
                '-loglevel', 'panic',
                '-y',
                '-i', 'output/webcamgif.webm',
                'output/webcamgif.gif'
              ])
              msg.channel.send({
                files: ['output/webcamgif.gif']
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
