const commando = require('discord.js-commando')

module.exports = class UploadCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'upload',
      group: 'tools',
      memberName: 'upload',
      description: 'Downloads an attachment to the device this bot is running on.',
      examples: [
        'upload'
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

    const fs = require('fs')
    const path = require('path')
    const axios = require('axios')

    if (!fs.existsSync(config.folders.upload)) {
      fs.mkdirSync(config.folders.upload, {
        recursive: true
      })
    }

    const attachment = msg.attachments.array()[0]

    if (!attachment) {
      console.log('[Upload] Didn\'t download anything because no file was attached')

      msg.react(config.reactions.error)
      return msg.channel.send('Please attach a file (URLs are not supported for security reasons).')
    }

    if (msg.attachments.array().length > 1) {
      console.log('[Upload] Didn\'t download anything because message contained multiple attachments')

      msg.react(config.reactions.error)
      return msg.channel.send('Only one upload at a time is supported.')
    }

    if (fs.existsSync(path.resolve(config.folders.upload, path.basename(attachment.url)))) {
      console.log('[Upload] Didn\'t download anything because a file with the same name already exists')

      msg.react(config.reactions.error)
      return msg.channel.send('A file with the name `' + path.basename(attachment.url) + '` already exists.')
    }

    if (msg.author.id !== config.owner && attachment.filesize > 8000000) {
      console.log('[Upload] Didn\'t download anything because the file was over 8 MB in size')

      msg.react(config.reactions.error)
      return msg.channel.send('Only the owner may upload files over 8 MB in size (your attachment was ' + attachment.filesize / 1000000 + ' MB).')
    }

    console.log('[Upload] Downloading ' + attachment.url)

    axios({
      url: attachment.url,
      responseType: 'stream'
    }).then(response => {
      response.data.pipe(fs.createWriteStream(path.resolve(config.folders.upload, path.basename(attachment.url))))
      msg.react(config.reactions.success)
    })
  }
}
