use super::shared::*;
use crate::{
    core::{revert_state, Action, AppCommand, Application, Instruction},
    rspc::RspcError,
};

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

/// Enable / Disable Camera
///
/// This will
///
/// add `blacklist uvcvideo` to `/etc/modprobe.d/blacklist.conf`
///
#[tauri::command(async)]
pub async fn disable_camera(
    enable: bool,
    app: tauri::AppHandle,
    state: tauri::State<'_, Application>,
) -> Result<(), rspc::Error> {
    let cmd = disable_camera_command();
    let home_dir = state.home_dir.lock().unwrap().clone();

    // enable means user has enable the switch
    // for which we need to disable camera
    if enable {
        match cmd.execute(&app, &home_dir) {
            Ok(()) => Ok(()),
            Err(e) => Err(RspcError::internal_server_error(e))?,
        }
    } else {
        match cmd.rollback(&app, &home_dir) {
            Ok(()) => Ok(()),
            Err(e) => Err(RspcError::internal_server_error(e))?,
        }
    }
}

fn disable_camera_command() -> AppCommand {
    let module = "uvcvideo";
    let add_uvcvideo_in_blacklist_file = add_module_to_blacklist(module);

    let remove_uvcvideo_in_blacklist_file = remove_module_from_blacklist(module);

    let uvcvideo_instruction = Instruction::new(
        "",
        add_uvcvideo_in_blacklist_file,
        Some(remove_uvcvideo_in_blacklist_file),
    );

    let remove_modprobe = remove_modprobe(module);
    let add_modprobe = add_modprobe(module);

    let refresh_instruction = Instruction::new("", remove_modprobe, Some(add_modprobe));

    AppCommand {
        name: "disable.camera".into(),
        description: "Disable camera".into(),
        instructions: vec![uvcvideo_instruction, refresh_instruction],
    }
}

#[tauri::command(async)]
pub async fn revert_commit(
    file: String,
    app: tauri::AppHandle,
    state: tauri::State<'_, Application>,
) -> Result<(), rspc::Error> {
    let home_dir = state.home_dir.lock().unwrap().clone();
    revert_state(&app, &home_dir, &file).map_err(|e| RspcError::internal_server_error(e))?;

    Ok(())
}
