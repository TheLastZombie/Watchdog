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
| blur      | A number indicating the blur factor of camera captures and screenshots. The higher this number is, the blurrier the image will be. Set the respective values to false to disable blurring.                                                                                                                                                                   |
| limits    | Both the maximum number of processes and services to send (if this number is too high, it may result in the generated message being longer than Discord allows it to be) and the default length of camera recordings in milliseconds (this applies to both GIFs and videos).                                                                                 |
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
| move         | ✔️       | ✔️      | ✔️         |
| neofetch     | ✔️       | ✔️      | ✔️         |
| nickname     | ✔️       | ✔️      | ✔️         |
| notify       | ✔️       | ✔️      | ✔️         |
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
| webcam       | ✔️       | ❓      | ✔️         |
| webcamgif    | ✔️       | ❓      | ✔️         |
| webcamwebm   | ✔️       | ❓      | ✔️         |

## Alternatives

- [M3IY0U/Stalkbot](https://github.com/M3IY0U/Stalkbot)
- [M3IY0U/StalkbotGUI](https://github.com/M3IY0U/StalkbotGUI)
- [Jerrynicki/Stalkbot](https://github.com/Jerrynicki/Stalkbot)
- [Jerrynicki/Stalkbot-Rewrite](https://gitlab.com/Jerrynicki/stalkbot-rewrite)
