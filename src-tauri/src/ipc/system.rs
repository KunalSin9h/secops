use crate::{commands::update, rspc::RspcError};

#[tauri::command(async)]
pub async fn ipc_version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tauri::command]
pub fn ipc_update() -> Result<String, rspc::Error> {
    match update() {
        Ok(()) => Ok("Done".to_string()),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}
