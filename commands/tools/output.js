const commando = require('discord.js-commando')

module.exports = class OutputCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'output',
      aliases: ['out'],
      group: 'tools',
      memberName: 'output',
      description: 'Records an audio snippet from the default output device for the specified length.',
      examples: [
        'output',
        'output 5000'
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

    const childProcess = require('child_process')

    console.log('[Output] Recording ' + args.duration + ' ms long audio snippet')

    childProcess.execFileSync('ffmpeg', [
      '-hide_banner',
      '-loglevel', 'panic',
      '-y',
      '-f', 'pulse',
      '-i', config.pulse,
      '-t', args.duration / 1000,
      '-ar', '48000',
      '-ac', '2',
      'output/output.mp3'
    ])

    msg.channel.send({
      files: ['output/output.mp3']
    }).then(msg.react(config.reactions.success))
  }
}
