use secops::{
    commands::*,
    core::{setup, Application},
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
            version,
            kill,
            get_status,
            start_service,
            stop_service,
            enable_service,
            disable_service,
            update,
            upgrade,
            dist_upgrade,
            unattended_upgrade,
            auto_remove,
            enable_auto_security_updates,
        ])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
