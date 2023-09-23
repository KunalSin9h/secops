use crate::{core::Action, rspc::RspcError};

/// Update
///
/// This command will do
/// ```bash
/// sudo apt-get update
/// ```
#[tauri::command(async)]
pub async fn update(app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        "Refreshing package repository information",
        "apt-get",
        true,
        false,
        vec!["update"],
    )
    .exec(Some(&app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Upgrade
///
/// This command will do
/// ```bash
/// sudo apt-get upgrade -y
/// ```
#[tauri::command(async)]
pub async fn upgrade(app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        "Upgrading the installed packages",
        "apt-get",
        true,
        false,
        vec!["upgrade", "-y"],
    )
    .exec(Some(&app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Distribution Upgrade
///
/// This command will do
/// ```bash
/// sudo apt-get dist-upgrade -y
/// ```
#[tauri::command(async)]
pub async fn dist_upgrade(app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        "Hard upgrading packages (Distribution Upgrade)",
        "apt-get",
        true,
        false,
        vec!["dist-upgrade", "-y"],
    )
    .exec(Some(&app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Auto remove
///
/// This command will do
/// ```bash
/// sudo auto-remove -y
/// ```
#[tauri::command(async)]
pub async fn auto_remove(app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        "Removing unused and orphans packages",
        "apt-get",
        true,
        false,
        vec!["auto-remove", "-y"],
    )
    .exec(Some(&app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}

/// Unattended Upgrade (Security only upgrade)
///
/// This command will do
/// ```bash
/// sudo unattended-upgrade -d
/// ```
#[tauri::command(async)]
pub async fn unattended_upgrade(app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let _ = match Action::new(
        "Installing Security specific upgrades",
        "unattended-upgrade",
        true,
        false,
        vec!["-d"],
    )
    .exec(Some(&app))
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(())
}
