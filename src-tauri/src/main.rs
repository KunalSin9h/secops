use secops::rspc::init_rspc;

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = init_rspc();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
