use crate::BACKUP_PATH;
use fs_extra::copy_items;
use fs_extra::dir::CopyOptions;
use std::fs;

// The frontend will have code to detect whether something is a file or folder
// Both backup a single path, rest done in the frontend to display progress easier

#[tauri::command]
pub fn backup_file(file: String) -> Result<(), String> {
    let backup_path = BACKUP_PATH.lock().unwrap();
    fs::copy(file, &*backup_path)
        .map(|_| ())
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn backup_folder(folder: String) -> Result<(), String> {
    let backup_path = BACKUP_PATH.lock().unwrap();

    let mut options = CopyOptions::new();
    options.overwrite = true;

    let folder_items = vec![folder];

    copy_items(&folder_items, &*backup_path, &options)
        .map(|_| ())
        .map_err(|e| e.to_string())
}
