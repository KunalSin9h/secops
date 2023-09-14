use secops::ipc::{__cmd__ipc_dummy, ipc_dummy};
use secops::rspc::init_rspc;

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![ipc_dummy])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
