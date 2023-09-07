// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
        .query("get_all_users", |t| t(|_, _: ()| users::get_all()))
        .query("get_user_icon", |t| t(|_, name: String|  users::get_icon(name)))
        .build();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
