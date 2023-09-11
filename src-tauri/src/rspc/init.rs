use crate::ipc;

pub fn init_rspc() -> rspc::Router {
    <rspc::Router>::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .query("version", |t| t(|_, _: ()| ipc::ipc_version()))
        .query("get_current_user", |t| t(|_, _: ()| ipc::ipc_get_current()))
        .mutation("update_system", |t| t(|_, _: ()| ipc::ipc_update()))
        .build()
}
