use secops::{ipc::*, rspc::init_rspc};

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            ipc_dummy,
            ipc_get_current,
            ipc_update,
            ipc_upgrade,
            ipc_version
        ])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
