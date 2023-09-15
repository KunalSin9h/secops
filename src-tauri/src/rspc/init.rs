use rspc::Router;

pub fn init_rspc() -> rspc::Router {
    Router::new()
        .config(rspc::Config::new().export_ts_bindings("../src/ts/bindings.d.ts"))
        .build()
}
