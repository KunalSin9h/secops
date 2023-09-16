use rspc::Router;

use crate::commands::{get_distro, get_user};

pub fn init_rspc() -> rspc::Router {
    Router::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .query("get_user", |t| t(|_, _: ()| get_user()))
        .query("get_distro", |t| t(|_, _: ()| get_distro()))
        .build()
}
