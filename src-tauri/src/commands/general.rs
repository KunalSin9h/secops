use tauri::AppHandle;

use crate::{core::Action, rspc::RspcError};

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
pub async fn kill(pid: u32, app: &AppHandle) -> Result<(), String> {
    let kill_cmd = Action::new(
        format!("Killing the running process: {}", pid).as_str(),
        "kill",
        true,
        false,
        vec!["-9", &pid.to_string()],
    );

    let _ = kill_cmd.exec(Some(app))?;

    Ok(())
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
