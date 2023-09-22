use secops::{
    commands::*,
    core::{setup, Application},
    ipc::*,
    rspc::init_rspc,
};

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();
    let mut state = Application::default();

    env_logger::init();

    if setup(&mut state).is_err() {
        log::error!("Failed to setup app.");
        std::process::exit(1);
    } else {
        println!("Secops v{}", env!("CARGO_PKG_VERSION"))
    }

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            ipc_version,
            ipc_kill,
            ipc_get_status,
            ipc_start_service,
            ipc_stop_service,
            ipc_enable_service,
            ipc_disable_service,
            update,
            upgrade,
            dist_upgrade,
            unattended_upgrade
        ])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
