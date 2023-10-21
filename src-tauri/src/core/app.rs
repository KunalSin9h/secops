use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{Manager, Window};

#[derive(Default)]
pub struct Application {
    pub home_dir: Mutex<PathBuf>,
}

#[tauri::command]
pub async fn close_loading(window: Window) {
  // Close loading splashscreen
  window.get_window("loading").expect("no window labeled 'loading' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}