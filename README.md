# Backup System

## About
This is a simple app to simply copy files to a folder.
  
just set a backup location, add files, and press backup.
  
### Config
If you need to edit the config file manually for whatever reason, it's stored at these paths

#### Windows
  C:\Users\user\AppData\backup-system
#### Mac
  Library/Application Support/backup-system
#### Linux
  /home/user/.config/backup-system

## Installing

Simply download one of the precompiled files

### From Source

#### Dependencies
* [Tauri](https://tauri.app/start/prerequisites/)
* [Rust](https://rust-lang.org/tools/install/)
* [Node.js](https://nodejs.org/en/download)

#### Compiling
After installing the dependencies, run:
1. `git clone https://github.com/Lordpun/Backup-System`
2. `cd Backup-System`
3. `npm install` (Or any other package manager)
4. `npm run tauri add dialog`

Next, simply run your package manager's build command for Tauri  
Example `npm run tauri build`