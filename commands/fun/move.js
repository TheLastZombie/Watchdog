const commando = require('discord.js-commando')

module.exports = class MoveCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'move',
      aliases: ['cursor', 'mouse'],
      group: 'fun',
      memberName: 'move',
      description: 'Moves the mouse to the specified X/Y pixel coordinates.',
      examples: [
        'move',
        'type 1920 1080'
      ],
      clientPermissions: [
        'ADD_REACTIONS'
      ],
      args: [
        {
          key: 'posX',
          label: 'Position (X)',
          prompt: 'Please enter the X coordinate. You can also specify it directly after the move command.',
          type: 'integer'
        },
        {
          key: 'posY',
          label: 'Position (Y)',
          prompt: 'Please enter the Y coordinate. You can also specify it directly after the move command.',
          type: 'integer'
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const robot = require('robotjs')

    console.log('[Move] Moving cursor to X: ' + args.posX, ', Y: ' + args.posY)

    robot.moveMouse(args.posX, args.posY)
    msg.react(config.reactions.success)
  }
}
