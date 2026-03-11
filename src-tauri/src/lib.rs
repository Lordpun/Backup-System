use std::path::PathBuf;
use std::sync::{LazyLock, Mutex};

pub static PATH_LIST: LazyLock<Mutex<Vec<PathBuf>>> = LazyLock::new(|| Mutex::new(Vec::new()));

pub static BACKUP_PATH: LazyLock<Mutex<String>> = LazyLock::new(|| Mutex::new(String::new()));

mod backup;
mod config;
mod paths;
use backup::{backup_file, backup_folder};
use config::{update_config, load_config};
use paths::{add_path, remove_path, send_backup, send_paths, set_backup};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	load_config();
	
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![
      add_path,
      remove_path,
      set_backup,
      send_paths,
      send_backup,
      backup_file,
      backup_folder,
      update_config
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
