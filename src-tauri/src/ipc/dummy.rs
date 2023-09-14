use crate::{commands::dummy_command, rspc::RspcError};

#[tauri::command(async)]
pub async fn ipc_dummy(app: tauri::AppHandle) -> Result<bool, rspc::Error> {
    match dummy_command(&app) {
        Ok(res) => Ok(res),
        Err(err) => Err(RspcError::internal_server_error(err.to_string()))?,
    }
}
