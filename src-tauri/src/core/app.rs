use std::path::PathBuf;
use std::sync::Mutex;

pub struct Application {
    pub home_dir: Mutex<PathBuf>,
}

impl Default for Application {
    fn default() -> Self {
        Application {
            home_dir: Mutex::default(),
        }
    }
}
