// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rspc;
use secops::users::get_all_users;

#[tauri::command(async)]
async fn version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

#[tokio::main]
async fn main() -> tauri::Result<()> {
    let router = <rspc::Router>::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .query("version", |t| t(|_, _args: ()| version()))
        .query("get_all_users", |t| t(|_, _args: ()| get_all_users()))
        .build();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router.into(), || ()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
