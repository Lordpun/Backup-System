use std::sync::{LazyLock, Mutex};
use std::path::PathBuf;

pub static PATH_LIST: LazyLock<Mutex<Vec<PathBuf>>> = LazyLock::new(|| {
	Mutex::new(Vec::new())
});

mod paths;
use paths::{add_path, remove_path, send_paths};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![
    	add_path,
    	remove_path,
    	send_paths
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
