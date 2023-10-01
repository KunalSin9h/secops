use std::path::PathBuf;
use std::sync::Mutex;

#[derive(Default)]
pub struct Application {
    pub home_dir: Mutex<PathBuf>,
}
