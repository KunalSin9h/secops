use crate::{
    core::{Action, AppCommand, Instruction},
    rspc::RspcError,
};

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

/// Enable auto security updates
///
/// This will update APT::Periodic::Unattended-Upgrade to '1' in the /etc/apt/apt.conf.d/20auto-upgrades
#[tauri::command(async)]
pub async fn enable_auto_security_updates(
    enable: bool,
    app: tauri::AppHandle,
) -> Result<bool, rspc::Error> {
    let cmd = enable_auto_security_updates_command();

    if enable {
        match cmd.execute(&app) {
            Ok(res) => Ok(res),
            Err(e) => Err(RspcError::internal_server_error(e))?,
        }
    } else {
        match cmd.rollback(&app) {
            Ok(res) => Ok(res),
            Err(e) => Err(RspcError::internal_server_error(e))?,
        }
    }
}

fn enable_auto_security_updates_command() -> AppCommand {
    let run = Action::new(
        "enabling auto security updates",
        "sed",
        true,
        false,
        vec![
            "-i",
            "s/APT::Periodic::Unattended-Upgrade \"0\";/APT::Periodic::Unattended-Upgrade \"1\";/",
            "/etc/apt/apt.conf.d/20auto-upgrades",
        ],
    );

    let undo = Action::new(
        "enabling auto security updates",
        "sed",
        true,
        false,
        vec![
            "-i",
            "s/APT::Periodic::Unattended-Upgrade \"1\";/APT::Periodic::Unattended-Upgrade \"0\";/",
            "/etc/apt/apt.conf.d/20auto-upgrades",
        ],
    );

    let inst = Instruction::new("", run, Some(undo));

    AppCommand {
        description: "Enabling / Disabling auto security updates".into(),
        instructions: vec![inst],
    }
}
