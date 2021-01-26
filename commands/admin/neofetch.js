const commando = require('discord.js-commando')

module.exports = class NeofetchCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'neofetch',
      aliases: ['archey', 'info', 'linuxlogo', 'screenfetch', 'system'],
      group: 'admin',
      memberName: 'neofetch',
      description: 'Shows information about the host\'s system in a Neofetch-like format.',
      examples: [
        'neofetch'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES'
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const si = require('systeminformation')

    si.get({
      users: 'user',
      osInfo: 'hostname, distro, release, arch, kernel',
      system: 'model, version',
      time: 'uptime',
      graphics: 'displays, controllers',
      cpu: 'manufacturer, brand, cores, speedMax',
      mem: 'total, used'
    })
      .then(data => {
        const header = data.users[0].user + '@' + data.osInfo.hostname
        const upHr = Math.floor(data.time.uptime / 3600)
        const upMin = Math.floor(data.time.uptime / 60 - upHr * 60)

        const output = header + '\n' +
          '-'.repeat(header.length) + '\n' +
          'OS: ' + data.osInfo.distro + ' ' + data.osInfo.release + ' ' + data.osInfo.arch + '\n' +
          'Host: ' + data.system.model + ' ' + data.system.version + '\n' +
          'Kernel: ' + data.osInfo.kernel + '\n' +
          'Uptime: ' + upHr + ' hour(s), ' + upMin + ' min(s)' + '\n' +
          'Resolution: ' + data.graphics.displays.map(x => x.resolutionX + 'x' + x.resolutionY).join(', ') + '\n' +
          'CPU: ' + data.cpu.manufacturer + ' ' + data.cpu.brand + ' (' + data.cpu.cores + ') @ ' + data.cpu.speedMax + 'GHz' + '\n' +
          'GPU: ' + data.graphics.controllers.map(x => x.vendor + ' ' + x.model).join(', ') + '\n' +
          'Memory: ' + Math.floor(data.mem.used / 1024 / 1024) + 'MiB / ' + Math.floor(data.mem.total / 1024 / 1024) + 'MiB'

        msg.channel.send('```' + output + '```').then(msg.react(config.reactions.success))
      })
      .catch(error => {
        msg.react(config.reactions.error)
        return msg.channel.send(error.toString())
      })
  }
}
