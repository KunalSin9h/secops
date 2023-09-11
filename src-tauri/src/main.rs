use secops::users;

#[tauri::command(async)]
async fn version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = <rspc::Router>::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .query("version", |t| t(|_, _: ()| version()))
        .query("get_current_user", |t| t(|_, _: ()| users::get_current()))
        .build();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
