use std::path::PathBuf;
use std::process::exit;
use std::sync::Mutex;
use tauri::{Manager, Window};

#[derive(Default)]
pub struct Application {
    pub home_dir: Mutex<PathBuf>,
}

#[tauri::command]
pub async fn close_loading(window: Window) {
    // Close loading splashscreen
    match window.get_window("loading") {
        Some(frame) => {
            if let Err(e) = frame.close() {
                log::error!("{}", e);
            }
        }
        None => log::warn!("no window labeled 'loading' found, maybe the app is reloaded"),
    };

    // Show main window
    match window.get_window("main") {
        Some(frame) => {
            if let Err(e) = frame.show() {
                log::error!("{}", e);
                log::info!("Exiting...");
                exit(1);
            }
        }
        None => log::warn!("no window labeled 'main' found"),
    };
}
