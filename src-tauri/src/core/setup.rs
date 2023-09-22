use chrono::Local;
use std::{fs, path::PathBuf};

use super::Application;

pub fn setup(state: &mut Application) -> Result<(), ()> {
    // This env::home_dir() is depreciated, due to unexpected behavior
    // on windows, it will be good in linux.
    #[allow(deprecated)]
    let home_dir = match std::env::home_dir() {
        Some(path) => path,
        None => {
            log::error!("Failed to get home directory");
            return Err(());
        }
    };

    *state.home_dir.lock().unwrap() = home_dir.clone();

    log::info!("Get home directory: {}", home_dir.display());

    // Check if .secops folder is present
    let secops_app_dir = home_dir.join(".secops");
    check_folder(&secops_app_dir)?;

    // check if .secops/state folder is present
    let state_dir = secops_app_dir.join("state");
    check_folder(&state_dir)?;

    // check if current.json state is present
    let default_state_file = state_dir.join("current.json");
    match fs::metadata(&default_state_file) {
        Ok(_) => {
            log::info!(
                "Found {} file, skipping creating new",
                default_state_file.display()
            );
        }
        Err(e) => {
            log::warn!("{}", e);
            log::info!(
                "Did not found {}, creating new",
                default_state_file.display()
            );
            if fs::File::create(&default_state_file).is_err() {
                log::error!("Failed to create {}", default_state_file.display());
                return Err(());
            } else {
                log::info!("Created $HOME/.secops/state fonder");
                // copy the default state file to newly created file
                fill_default_state_file(default_state_file)?;
            }
        }
    }

    Ok(())
}

/// check_folder will check if folder exists
/// and if not, then it will create a new folder
fn check_folder(path: &PathBuf) -> Result<(), ()> {
    match fs::metadata(path) {
        Ok(_) => {
            log::info!("Found {} folder, skipping creating new", path.display());
            Ok(())
        }
        Err(e) => {
            log::warn!("{}", e);
            log::info!("Did not found {}, creating new", path.display());
            if fs::create_dir(path).is_err() {
                log::error!("Failed to create {}", path.display());
                return Err(());
            } else {
                log::info!("Created {} folder", path.display());
                Ok(())
            }
        }
    }
}

/// populate the default state file
fn fill_default_state_file(path: PathBuf) -> Result<(), ()> {
    let default_state_string = r#"{
    "message": "Default State",
    "time": "$",
    "commands": []
}"#;

    let data = default_state_string.replace("$", Local::now().to_string().as_str());

    match fs::write(&path, data.as_bytes()) {
        Ok(_) => {
            log::info!("Write default file content to {}", &path.display());
            Ok(())
        }
        Err(e) => {
            log::error!(
                "Error while writing default file content: {}",
                e.to_string()
            );
            Err(())
        }
    }
}
