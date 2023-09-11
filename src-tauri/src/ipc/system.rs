use crate::{commands::system::update, rspc::RspcError};

#[tauri::command]
pub fn ipc_update() -> Result<String, rspc::Error>  {
	match update() {
		
	}
}