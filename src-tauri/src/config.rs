use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use crate::{PATH_LIST, BACKUP_PATH};

#[derive(Serialize)]
struct Config {
	backup_path: String,
	paths: Vec<PathBuf>
}

fn get_path() -> PathBuf {
  if cfg!(target_os = "windows") {
    let app_data = std::env::var("APPDATA").unwrap_or_else(|_| ".".into());
    PathBuf::from(app_data).join("backup-system").join("config.toml")
  } else if cfg!(target_os = "macos") {
    let home = std::env::var("HOME").unwrap_or_else(|_| ".".into());
    PathBuf::from(home).join("Library/Application Support/backup-system/config.toml")
  } else {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".into());
    PathBuf::from(home).join(".config/backup-system/config.toml")
  }
}

fn get_config() -> Config {
	Config {
		backup_path: BACKUP_PATH.lock().unwrap().clone(),
		paths: PATH_LIST.lock().unwrap().clone()
	}
}

#[tauri::command]
pub fn update_config() -> Result<(), String> {
	let config_data = get_config();
	let content = toml::to_string(&config_data)
		.map_err(|e| e.to_string())?;

	let path = get_path();

	if let Some(parent) = path.parent() {
    fs::create_dir_all(parent).map_err(|e| e.to_string())?;
  }

	fs::write(path, content).expect("Unable to create config file");
	Ok(())
}