use secops::{
    commands::*,
    core::{__cmd__close_loading, close_loading, setup, Application},
    rspc::init_rspc,
};

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();
    let mut state = Application::default();

    // std::env::set_var("SECOPS_LOG", "info");
    // env_logger::Builder::from_env("SECOPS_LOG").init();

    match setup(&mut state) {
        Ok(()) => println!("Secops v{}", env!("CARGO_PKG_VERSION")),
        Err(e) => {
            log::error!("{}", e);
            std::process::exit(1);
        }
    }

    #[cfg(debug_assertions)]
    let devtools = devtools::init();

    let builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
    let builder = builder.plugin(devtools);

    builder
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
            disable_camera,
            usb_block,
            revert_commit,
            close_loading,
        ])
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
