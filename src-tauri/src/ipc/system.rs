use crate::{commands::update, commands::upgrade, rspc::RspcError};

#[tauri::command(async)]
pub async fn ipc_version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tauri::command(async)]
pub async fn ipc_update(app: tauri::AppHandle) -> Result<String, rspc::Error> {
    match update(&app) {
        Ok(output) => Ok(output),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_upgrade(app: tauri::AppHandle) -> Result<String, rspc::Error> {
    match upgrade(&app) {
        Ok(output) => Ok(output),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}
