use crate::{BACKUP_PATH, PATH_LIST};
use std::path::PathBuf;

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

#[tauri::command]
pub fn set_backup(path_string: String) -> () {
  let mut backup_path = BACKUP_PATH.lock().unwrap();
  *backup_path = path_string;
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
