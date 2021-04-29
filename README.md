# Watchdog

The next evolution of StalkBot3, carefully rewritten from the ground up.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

## Installation

```
git clone https://github.com/TheLastZombie/Watchdog
cd Watchdog
npm install
```

Make sure to install any displayed requirements as well.

## Configuration

To customize the bot to your liking, edit the `config.json` file and restart the bot.

| Property  | Documentation                                                                                                                                                                                                                                                                                                                                                |
| --------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner     | The Discord user ID of the person who runs this bot. This allows for execution of administrative commands.                                                                                                                                                                                                                                                   |
| prefix    | The prefix the bot will listen to. It is recommended to change this, as ! is fairly common.                                                                                                                                                                                                                                                                  |
| notify    | Whether to send a notification whenever a command is executed. This does not apply to messages sent by the owner specified via the above property.                                                                                                                                                                                                           |
| blur      | A number indicating the blur factor of camera captures and screenshots. The higher this number is, the blurrier the image will be. Set the respective values to false to disable blurring.                                                                                                                                                                   |
| limits    | Both the maximum number of processes and services to send (if this number is too high, it may result in the generated message being longer than Discord allows it to be) and the default length of video and audio recordings in milliseconds (this applies to GIFs, videos and audio files, respectively).                                                  |
| pulse     | The PulseAudio device to use for the output command. Can be an ID or name. Run `pactl list short sources` to get either of all available devices. Output devices usually have "monitor" at the end of their name.                                                                                                                                            |
| folders   | Directories used for the download and upload commands, and whether to recursively search for files when using the former. Keep in mind that these values are named after their respective commands and, depending on your viewpoint, download and upload are swapped: download sets the folder to upload files from, upload the folder to download files to. |
| reactions | The reactions to add to messages that execute a command.                                                                                                                                                                                                                                                                                                     |
| token     | The Discord bot token you can retrieve from the developer dashboard (see the link below for more details).                                                                                                                                                                                                                                                   |

Note that, due to the nature of this bot, you will need to create a bot account yourself. [Click here for a tutorial on how to do this.](https://discordpy.readthedocs.io/en/stable/discord.html)

## Starting

```
npm start
```

## Compatibility

|              | Windows | Mac OS | GNU/Linux |
| -----------: | :-----: | :----: | :-------: |
| activity     | ✔️       | ✔️      | ✔️         |
| clipboard    | ✔️       | ✔️      | ✔️         |
| command      | ✔️       | ✔️      | ✔️         |
| download     | ✔️       | ✔️      | ✔️         |
| microphone   | ✔️       | ❓      | ✔️         |
| move         | ✔️       | ✔️      | ✔️         |
| neofetch     | ✔️       | ✔️      | ✔️         |
| nickname     | ✔️       | ✔️      | ✔️         |
| notify       | ✔️       | ✔️      | ✔️         |
| output       | ❌       | ❌      | ✔️         |
| processes    | ✔️       | ❌      | ✔️         |
| requirements | ✔️       | ✔️      | ✔️         |
| screenshot   | ✔️       | ❌      | ✔️         |
| services     | ✔️       | ❌      | ✔️         |
| tts          | ✔️       | ✔️      | ✔️         |
| type         | ✔️       | ✔️      | ✔️         |
| undo         | ✔️       | ✔️      | ✔️         |
| upload       | ✔️       | ✔️      | ✔️         |
| update       | ✔️       | ✔️      | ✔️         |
| username     | ✔️       | ✔️      | ✔️         |
| webcam       | ✔️       | ✔️      | ✔️         |
| webcamgif    | ✔️       | ❓      | ✔️         |
| webcamwebm   | ✔️       | ❓      | ✔️         |

## Roadmap

- [ ] Commands
  - [ ] avatar (in meta category, administrator only, via URL or attachment)
  - [ ] config (view and edit configuration, e. g. config prefix !, via JSONPath, censor token, edit for administrator only)
  - [ ] play (via [youtube-dl](https://ytdl-org.github.io/youtube-dl/), length and volume limit)
  - [ ] restart (administrator only)
  - [ ] sql (select, update, delete, etc., administrator only)
- [ ] Miscellaneous
  - [ ] Add blacklist, delay and timeout configuration values, apply to every command
  - [ ] Add [JSON schema](https://json-schema.org/) for validation of config.json
  - [ ] Display actual CPU / RAM usage in process table
  - [ ] Display administrator's username as watching status
  - [ ] Display process uptime in process table
  - [ ] Hide additional output for webcamgif and webcamwebm commands
  - [ ] List guilds the bot has connected to on startup or as command
  - [ ] Make notification format customizable via config.json
  - [ ] Test remaining commands on Mac OS
  - [ ] Test services command on Windows (percent values may return zero)

## Alternatives

- [M3IY0U/Stalkbot](https://github.com/M3IY0U/Stalkbot)
- [M3IY0U/StalkbotGUI](https://github.com/M3IY0U/StalkbotGUI)
- [Jerrynicki/Stalkbot](https://github.com/Jerrynicki/Stalkbot)
- [Jerrynicki/Stalkbot-Rewrite](https://gitlab.com/Jerrynicki/stalkbot-rewrite)
