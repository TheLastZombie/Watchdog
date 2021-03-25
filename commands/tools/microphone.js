const commando = require('discord.js-commando')

module.exports = class MicrophoneCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'microphone',
      aliases: ['mic', 'record'],
      group: 'tools',
      memberName: 'microphone',
      description: 'Records an audio snippet using the default microphone for the specified length.',
      examples: [
        'microphone',
        'microphone 5000'
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
          prompt: 'How long do you want the recording to be? Please specify a duration in ms (30000 maximum).',
          type: 'integer',
          validate: (x) => x < 30000 && x > 0,
          default: require('../../config').limits.audio
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const mic = require('mic')
    const fs = require('fs')
    const childProcess = require('child_process')
    const pathToFfmpeg = require('ffmpeg-static')

    console.log('[Microphone] Recording ' + args.duration + ' ms long audio snippet')

    const micInstance = mic()
    const micInputStream = micInstance.getAudioStream()
    const outputFileStream = fs.WriteStream('output/microphone.raw')

    micInputStream.pipe(outputFileStream)

    micInputStream.on('startComplete', () => {
      setTimeout(() => {
        micInstance.stop()
        micInputStream.unpipe(outputFileStream)

        childProcess.execFileSync(pathToFfmpeg, [
          '-hide_banner',
          '-loglevel', 'panic',
          '-y',
          '-i', 'output/microphone.raw',
          'output/microphone.mp3'
        ])

        msg.channel.send({
          files: ['output/microphone.mp3']
        }).then(msg.react(config.reactions.success))
      }, args.duration)
    })

    micInstance.start()
  }
}
