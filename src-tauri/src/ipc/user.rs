use crate::{commands::get_user, rspc::RspcError};

/// GET ALL USERS
///
/// // get_all_users is a Tauri command that returns a list of all users on the system.
/// possible outcome will be "user1 user2 user3"
///
/// if failed to execute the command then it will return an error message
#[tauri::command(async)]
pub async fn ipc_get_current(app: tauri::AppHandle) -> Result<String, rspc::Error> {
    match get_user(&app) {
        Ok(user) => Ok(user),
        Err(err) => Err(RspcError::internal_server_error(err))?,
    }
}
