use crate::{commands::update, commands::upgrade, rspc::RspcError};

#[tauri::command]
pub fn ipc_version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tauri::command]
pub fn ipc_update() -> Result<String, rspc::Error> {
    match update() {
        Ok(output) => Ok(output),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}

#[tauri::command]
pub fn ipc_upgrade() -> Result<String, rspc::Error> {
    match upgrade() {
        Ok(output) => Ok(output),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}
