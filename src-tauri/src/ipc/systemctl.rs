use crate::{
    commands::{disable_service, enable_service, get_status, start_service, stop_service},
    rspc::RspcError,
};

#[tauri::command(async)]
pub async fn ipc_get_status(service: String, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match get_status(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_start_service(service: String, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match start_service(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_stop_service(service: String, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match stop_service(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_enable_service(service: String, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    match enable_service(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}

#[tauri::command(async)]
pub async fn ipc_disable_service(
    service: String,
    app: tauri::AppHandle,
) -> Result<(), rspc::Error> {
    match disable_service(service, &app).await {
        Ok(()) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e.to_string()))?,
    }
}
