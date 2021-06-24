# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `output` command
- `shell` alias to `command`
- deingithub/beanstalk to alternatives
- nohup.out to .gitignore

### Changed

- Update roadmap in README
- Update compatibility table
- Update dependencies

## [0.3.0] - 2021-04-05

### Added

- `microphone` command
- `webcamgif` command
- Notification on command execution (except for owner)
- Documentation for configuration and account creation
- Roadmap to README

### Changed

- Rename `webcamgif` to `webcamwebm`
- Center `processes` and `services` table headings
- Hide FFmpeg command output
- Improve command logging format
- Update compatibility table
- Update package-lock.json to version 2
- Update dependencies

### Fixed

- `webcamwebm` command only working once
- `processes` and `services` commands throwing type error
- `activity` command throwing type error

## [0.2.0] - 2021-01-27

### Added

- `activity` command
- `nickname` command
- `undo` command
- `upload` command
- `username` command
- `webcamgif` command
- Option to recurse directories with `download`
- `cursor` alias to `move`
- Log output to main thread and most commands
- Compatibility table to README
- M3IY0U/StalkbotGUI to alternatives

### Changed

- Send file name when using `download`
- Update homepage URL in package.json
- Include `output` directory in Git repository
- Update license for 2021
- Update dependencies

### Fixed

- `requirements` command on Windows
- `screenshot` command on Windows
- `services` command on Windows
- `update` command on Windows
- `webcam` command on Windows
- Typing error in `services` command description
- Typing error in `type` command description

### Removed

- Obsolete `pkg` module

## [0.1.0] - 2020-10-21

### Added

- Initial release

[Unreleased]: https://github.com/TheLastZombie/Watchdog/compare/0.3.0...HEAD
[0.3.0]: https://github.com/TheLastZombie/Watchdog/releases/tag/0.3.0
[0.2.0]: https://github.com/TheLastZombie/Watchdog/releases/tag/0.2.0
[0.1.0]: https://github.com/TheLastZombie/Watchdog/releases/tag/0.1.0
