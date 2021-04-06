const boxen = require('boxen')
const version = require('../package').version

let data = {
  darwin: {
    name: 'Mac OS',
    color: 'gray',
    command: 'brew install',
    requirements: [
      ['ImageSnap', 'http://iharder.sourceforge.net/current/macosx/imagesnap', 'imagesnap'],
      ['sox', 'http://sox.sourceforge.net/', 'sox']
    ]
  },
  linux: {
    name: 'GNU/Linux',
    color: 'yellow',
    command: 'apt install',
    requirements: [
      ['arecord', 'https://alsa-project.org/wiki/Main_Page', 'alsa-utils'],
      ['Festival', 'http://www.cstr.ed.ac.uk/projects/festival', 'festival festvox-kallpc16k'],
      ['FFmpeg', 'https://ffmpeg.org/', 'ffmpeg'],
      ['fswebcam', 'https://sanslogic.co.uk/fswebcam', 'fswebcam'],
      ['ImageMagick', 'https://imagemagick.org', 'imagemagick'],
      ['libnotify', 'https://gitlab.gnome.org/GNOME/libnotify', 'libnotify-bin']
    ]
  },
  win32: {
    name: 'Windows',
    color: 'cyan',
    command: 'winget install',
    requirements: [
      ['PowerShell', 'https://microsoft.com/powershell', 'powershell'],
      ['sox', 'http://sox.sourceforge.net/', 'sox']
    ]
  }
}

data = data[process.platform]

const prompt = 'Watchdog ' + version + ' · ' +
  data.name +
  ' (' +
  process.platform +
  ') system detected.\n\nRequirements:\n' +
  data.requirements.map(x => '· ' + x[0] + ' (' + x[1] + ')').join('\n') +
  '\n\nRun the following command to install them:\n' +
  data.command +
  ' ' +
  data.requirements.map(x => x[2]).join(' ')

console.log(boxen(prompt, {
  borderColor: data.color,
  padding: 1,
  margin: 1,
  align: 'center'
}))
