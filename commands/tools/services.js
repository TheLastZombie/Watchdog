const commando = require('discord.js-commando')

module.exports = class ServicesCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'services',
      group: 'tools',
      memberName: 'services',
      description: 'Shows the most resource-intensive services (sorted by CPU and RAM).help',
      examples: [
        'services'
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
    const Table = require('cli-table3')

    si.services('*')
      .then(async data => {
        if (process.platform === 'win32') {
          const processes = await si.processes()
          data.forEach(x => {
            if (x.pids[0] === '0') return data.filter(y => y !== x)
            x.pcpu = processes.list.filter(y => y.pid === Number(x.pids[0]))[0].pcpu
            x.pmem = processes.list.filter(y => y.pid === Number(x.pids[0]))[0].pmem
          })
        }

        let cpuTable = new Table({
          style: { head: [], border: [] }
        })
        cpuTable.push(
          [{ colSpan: 2, content: 'Sorted by CPU usage' }],
          ...data
            .sort((x, y) => x.pcpu - y.pcpu)
            .reverse()
            .slice(0, config.limits.services)
            .map(x => [x.name, (x.pcpu).toFixed(2) + ' %'])
        )

        let memTable = new Table({
          style: { head: [], border: [] }
        })
        memTable.push(
          [{ colSpan: 2, content: 'Sorted by RAM usage' }],
          ...data
            .sort((x, y) => x.pmem - y.pmem)
            .reverse()
            .slice(0, config.limits.services)
            .map(x => [x.name, (x.pmem).toFixed(2) + ' %'])
        )

        cpuTable = cpuTable.toString().split('\n')
        memTable = memTable.toString().split('\n')

        msg.channel.send('```' + cpuTable.map((x, i) => x + ' ' + memTable[i]).join('\n') + '```').then(msg.react(config.reactions.success))
      })
      .catch(error => {
        msg.react(config.reactions.error)
        return msg.channel.send(error.toString())
      })
  }
}
