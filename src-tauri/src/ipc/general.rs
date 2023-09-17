use crate::{
    commands::{get_status, kill},
    rspc::RspcError,
};

#[tauri::command(async)]
pub async fn ipc_version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tauri::command(async)]
pub async fn ipc_kill(pid: u32, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match kill(pid, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_get_status(service: String, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match get_status(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}
