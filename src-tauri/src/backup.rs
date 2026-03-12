use crate::BACKUP_PATH;
use fs_extra::copy_items;
use fs_extra::dir::CopyOptions;
use std::fs;
use std::path::PathBuf;

// The frontend will have code to detect whether something is a file or folder
// Both backup a single path, rest done in the frontend to display progress easier

#[tauri::command]
pub fn backup_file(path_string: String) -> Result<(), String> {
  let backup_path_string = BACKUP_PATH.lock().unwrap().clone();
  let file_path = PathBuf::from(&path_string);
  let file_name = file_path.file_name().unwrap().to_str().unwrap();

  let target_path = format!("{}/{}", backup_path_string, file_name);

  fs::copy(&path_string, &target_path)
  	.map(|_| ())
  	.map_err(|e| e.to_string())
}

#[tauri::command]
pub fn backup_folder(path_string: String) -> Result<(), String> {
  let backup_path = BACKUP_PATH.lock().unwrap().clone();

  let mut options = CopyOptions::new();
  options.overwrite = true;

  let folder_items = vec![path_string];

  copy_items(&folder_items, &*backup_path, &options)
    .map(|_| ())
    .map_err(|e| e.to_string())
}
