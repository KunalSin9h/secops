use rspc::Router;

use crate::ipc;

pub struct AppHandleCtx {
    pub app: tauri::AppHandle,
}

pub fn init_rspc() -> rspc::Router<AppHandleCtx> {
    Router::<AppHandleCtx>::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .query("version", |t| t(|_, _: ()| ipc::ipc_version()))
        .query("get_current_user", |t| {
            t(|ctx: AppHandleCtx, _: ()| ipc::ipc_get_current(ctx.app))
        })
        .mutation("update_system", |t| {
            t(|ctx: AppHandleCtx, _: ()| ipc::ipc_update(ctx.app))
        })
        .mutation("upgrade_system", |t| {
            t(|ctx: AppHandleCtx, _: ()| ipc::ipc_upgrade(ctx.app))
        })
        .build()
}
