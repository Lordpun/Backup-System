use std::path::PathBuf;
use crate::{PATH_LIST, BACKUP_PATH};

#[tauri::command]
pub fn add_path(path_string: String) -> () {
	let mut path_list = PATH_LIST.lock().unwrap();
	if path_list.contains(&PathBuf::from(&path_string)) {
		return;
	}
	path_list.push(PathBuf::from(path_string));
}

#[tauri::command]
pub fn remove_path(path_string: String) -> () {
	let mut path_list = PATH_LIST.lock().unwrap();
	let target = PathBuf::from(path_string);
	path_list.retain(|p| p != &target)
}

// For frontend to display paths
#[tauri::command]
pub fn send_paths() -> Vec<String> {
	let path_list = PATH_LIST.lock().unwrap();

	path_list
	  .iter()
	  .map(|path| path.to_string_lossy().into_owned())
	  .collect()
}

// For frontend to get the backup path
#[tauri::command]
pub fn send_backup() -> String {
	BACKUP_PATH.lock().unwrap().clone()
}