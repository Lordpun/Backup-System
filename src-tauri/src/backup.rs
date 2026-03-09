use std::fs;
use fs_extra::dir::{copy, CopyOptions};

// The frontend will have code to detect whether something is a file or folder
// Both backup a single path, rest done in the frontend to display progress easier

#[tauri::command]
pub fn backup_file(backup_path: String, file: String) -> std::io::Result<(), String> {
	fs::copy(file, backup_path);
	  .map(|_| ())
	  .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn backup_folder(backup_path: String, folder: String) -> Result<(), String {
	let mut options = CopyOptions::new();
  options.overwrite = true;
  
	let folder_items = vec![folder];

  copy_items(folder_items, backup_path, &options);
  	.map(|_| ())
  	.map_err(|e| e.to_string())
}