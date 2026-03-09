use std::sync::{LazyLock, Mutex};
use std::path::PathBuf;

pub static PATH_LIST: LazyLock<Mutex<Vec<PathBuf>>> = LazyLock::new(|| {
	Mutex::new(Vec::new())
});

mod paths;
mod backup;
use paths::{add_path, remove_path, send_paths};
use backup::{backup_file, backup_folder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![
    	add_path,
    	remove_path,
    	send_paths,
    	backup_file,
    	backup_folder
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
