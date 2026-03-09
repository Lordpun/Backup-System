use std::sync::{LazyLock, Mutex};
use std::path::PathBuf;

pub static PATH_LIST: LazyLock<Mutex<Vec<PathBuf>>> = LazyLock::new(|| {
	Mutex::new(Vec::new())
});

pub static BACKUP_PATH: LazyLock<Mutex<String>> = LazyLock::new(|| {
	Mutex::new(String::new())
});

mod paths;
mod backup;
mod config;
use paths::{add_path, remove_path, send_paths};
use backup::{backup_file, backup_folder};
use config::update_config;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![
    	add_path,
    	remove_path,
    	send_paths,
    	backup_file,
    	backup_folder,
    	update_config
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
