use secops::{ipc::*, rspc::init_rspc};

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            ipc_version,
            ipc_kill,
            ipc_get_status,
            ipc_start_service,
            ipc_stop_service,
            ipc_enable_service,
            ipc_disable_service
        ])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
