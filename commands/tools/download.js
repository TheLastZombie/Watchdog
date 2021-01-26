const commando = require('discord.js-commando')

module.exports = class DownloadCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'download',
      aliases: ['f', 'folder', 'meme'],
      group: 'tools',
      memberName: 'download',
      description: 'Uploads a file to Discord with optional filtering. Formerly known as folder/meme.',
      examples: [
        'download',
        'download file',
        'download file.txt'
      ],
      clientPermissions: [
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'ATTACH_FILES'
      ],
      args: [
        {
          key: 'search',
          label: 'Search',
          prompt: 'Please enter your search string. You can also specify it directly after the download command.',
          type: 'string',
          default: ''
        }
      ]
    })
  }

  async run (msg, args) {
    const config = require('../../config')
    msg.react(config.reactions.progress)

    const fs = require('fs')
    const read = require('fs-readdir-recursive')
    const path = require('path')

    if (!fs.existsSync(config.folders.download)) {
      msg.react(config.reactions.error)
      return msg.channel.send('Directory `' + config.folders.download + '` does not exist!')
    }

    let files
    if (config.folders.recursive) {
      files = read(config.folders.download)
    } else {
      files = fs.readdirSync(config.folders.download, {
        withFileTypes: true
      }).filter(x => x.isFile()).map(x => x.name)
    }

    if (!files.length) {
      msg.react(config.reactions.error)
      return msg.channel.send('Error: Directory `' + config.folders.download + '` did not contain any files!')
    }

    if (args.search) files = files.filter(x => x.toLowerCase().includes(args.search.toLowerCase()))
    if (!files.length) {
      msg.react(config.reactions.error)
      return msg.channel.send('Error: Your search for `' + args.search.replace(/`/g, '﻿`') + '` did not yield any results!')
    }

    files = path.resolve(config.folders.download, files[Math.floor(Math.random() * files.length)])
    if (fs.statSync(files).size > 8000000) {
      msg.react(config.reactions.error)
      return msg.channel.send('Error: Chosen file `' + path.basename(files) + '` with ' + fs.statSync(files).size / 1000000 + ' MB was over Discord limit (8 MB)!')
    }

    msg.channel.send(path.basename(files), {
      files: [files]
    }).then(msg.react(config.reactions.success))
  }
}
