use tauri::AppHandle;

use crate::{core::Action, rspc::RspcError};

/// Get All services present on the device
/// This will contain both running and stopped services
///
/// This will d
/// ```bash
/// service --status-all
/// ```
pub async fn get_services() -> Result<String, rspc::Error> {
    let res = match Action::new(
        "Get All services present on the device",
        "cat",
        false,
        true,
        vec!["~/dummy.file"],
    )
    .exec(None)
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(res.unwrap())
}

/// Get systemctl services status
///
/// This will do
/// ```bash
/// systemctl status {service}
/// ```
pub async fn get_status(service: String, app: &AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        format!("Getting systemctl service status for {}", &service).as_str(),
        "systemctl",
        false,
        false,
        vec!["status", service.as_str()],
    )
    .exec(Some(app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Start systemctl services status
///
/// This will do
/// ```bash
/// sudo systemctl start {service}
/// ```
pub async fn start_service(service: String, app: &AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        format!("Starting {} systemctl service", &service).as_str(),
        "systemctl",
        true,
        false,
        vec!["start", service.as_str()],
    )
    .exec(Some(app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Stop systemctl services status
///
/// This will do
/// ```bash
/// sudo systemctl stop {service}
/// ```
pub async fn stop_service(service: String, app: &AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        format!("Stopping {} systemctl service", &service).as_str(),
        "systemctl",
        true,
        false,
        vec!["stop", service.as_str()],
    )
    .exec(Some(app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Enable systemctl services status
///
/// This will do
/// ```bash
/// sudo systemctl enable {service}
/// ```
pub async fn enable_service(service: String, app: &AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        format!("Enabling {} systemctl service", &service).as_str(),
        "systemctl",
        true,
        false,
        vec!["enable", service.as_str()],
    )
    .exec(Some(app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Disable systemctl services status
///
/// This will do
/// ```bash
/// sudo systemctl disable {service}
/// ```
pub async fn disable_service(service: String, app: &AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        format!("Disabling {} systemctl service", &service).as_str(),
        "systemctl",
        true,
        false,
        vec!["disable", service.as_str()],
    )
    .exec(Some(app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}
