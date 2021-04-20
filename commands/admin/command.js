const commando = require('discord.js-commando')

module.exports = class CommandCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'command',
      aliases: ['cmd', 'exec', 'run', 'shell', 'start'],
      group: 'admin',
      memberName: 'command',
      description: 'Executes a native command, not to be confused with eval.',
      examples: [
        'command echo Hello!'
      ],
      ownerOnly: true,
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES'
      ],
      args: [
        {
          key: 'command',
          label: 'Command',
          prompt: 'Please enter your command. You can also specify it directly after the cmd command.',
          type: 'string'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const execFile = require('child_process').execFile

    console.log('[Command] Executing command: ' + args.command)

    const command = args.command.split(' ')

    execFile(command.shift(), command, {
      shell: true,
      timeout: 60 * 1000
    }, (error, stdout, stderr) => {
      if (error) {
        msg.react(config.reactions.error)
        return msg.channel.send(error.toString())
      }

      stdout = stdout ? '**stdout:**```' + stdout.replace(/`/g, '﻿`') + '```' : '**stdout** was empty.'
      stderr = stderr ? '**stderr:**```' + stderr.replace(/`/g, '﻿`') + '```' : '**stderr** was empty.'

      msg.channel.send(stdout + '\n' + stderr).then(msg.react(config.reactions.success))
    })
  }
}
