use tauri::AppHandle;

use crate::core::Action;

/// Get User will return the current logged-in user on the system
///
/// This will run
/// ```bash
/// whoami
/// ```
pub fn get_user(app: &AppHandle) -> Result<String, String> {
    let act = Action::new(
        "Getting current logged-in user",
        "whoami",
        false,
        true,
        vec![],
    );
    let user = act.exec(app)?;

    Ok(user.unwrap())
}

/// Kill Command for killing the process given the PID (process id)
///
/// This will run
/// ```bash
/// kill -9 {pid}
/// ```
pub fn kill(pid: u32, app: &AppHandle) -> Result<(), String> {
    let kill_cmd = Action::new(
        format!("Killing the running process: {}", pid).as_str(),
        "kill",
        true,
        false,
        vec!["-9", &pid.to_string()],
    );

    let _ = kill_cmd.exec(app)?;

    Ok(())
}
