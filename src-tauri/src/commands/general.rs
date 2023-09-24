use crate::{core::Action, rspc::RspcError};

#[tauri::command(async)]
pub async fn version() -> String {
    env!["CARGO_PKG_VERSION"].into()
}

/// Get User will return the current logged-in user on the system
///
/// This will run
/// ```bash
/// whoami
/// ```
pub async fn get_user() -> Result<String, rspc::Error> {
    let res = match Action::new(
        "Getting current logged-in user",
        "whoami",
        false,
        true,
        vec![],
    )
    .exec(None)
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(res.unwrap())
}

/// Kill Command for killing the process given the PID (process id)
///
/// This will run
/// ```bash
/// kill -9 {pid}
/// ```
#[tauri::command]
pub async fn kill(pid: u32, app: tauri::AppHandle) -> Result<(), rspc::Error> {
    let kill_cmd = Action::new(
        format!("Killing the running process: {}", pid).as_str(),
        "kill",
        true,
        false,
        vec!["-9", &pid.to_string()],
    );

    match kill_cmd.exec(Some(&app)) {
        Ok(_) => Ok(()),
        Err(e) => Err(RspcError::internal_server_error(e))?,
    }
}

/// Get Distribution Information
///
/// This will run
/// ```bash
/// cat /etc/lsb-release
/// ```
pub async fn get_distro() -> Result<String, rspc::Error> {
    let res = match Action::new(
        "Get the linux distribution information",
        "cat",
        false,
        true,
        vec!["/etc/lsb-release"],
    )
    .exec(None)
    {
        Ok(res) => res,
        Err(e) => return Err(RspcError::internal_server_error(e))?,
    };

    Ok(res.unwrap())
}
