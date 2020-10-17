const commando = require('discord.js-commando')

module.exports = class ProcessesCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'processes',
      aliases: ['proc', 'process', 'procs'],
      group: 'tools',
      memberName: 'processes',
      description: 'Shows the most resource-intensive processes (sorted by CPU and RAM).',
      examples: [
        'processes'
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

    si.processes()
      .then(data => {
        var cpuTable = new Table({
          style: { head: [], border: [] }
        })
        cpuTable.push(
          [{ colSpan: 2, content: 'Sorted by CPU usage' }],
          ...data.list
            .sort((x, y) => x.pcpu - y.pcpu)
            .reverse()
            .slice(0, config.limits.processes)
            .map(x => [x.name, (x.pcpu).toFixed(2) + ' %'])
        )

        var memTable = new Table({
          style: { head: [], border: [] }
        })
        memTable.push(
          [{ colSpan: 2, content: 'Sorted by RAM usage' }],
          ...data.list
            .sort((x, y) => x.pmem - y.pmem)
            .reverse()
            .slice(0, config.limits.processes)
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
