use crate::{commands::kill, rspc::RspcError};

#[tauri::command(async)]
pub async fn ipc_version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tauri::command(async)]
pub async fn ipc_kill(pid: u32, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match kill(pid, &app) {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}
