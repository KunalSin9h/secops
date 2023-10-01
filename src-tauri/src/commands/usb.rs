use crate::{
    core::{Action, AppCommand, Application, Instruction},
    rspc::RspcError,
};

/// Block usb
///
/// This will
///
/// 1.  cd to this directory /etc/modprobe.d
/// 2.  add following line to the file blacklist.conf "blacklist uas blacklist usb-storage" (without commas)
/// 3.  after that run to take effect the changes
///
/// ```bash
/// sudo modprobe -r uas
/// sudo modprobe -r usb-storage
/// ```
#[tauri::command(async)]
pub async fn usb_block(
    enable: bool,
    app: tauri::AppHandle,
    state: tauri::State<'_, Application>,
) -> Result<(), rspc::Error> {
    let cmd = usb_block_command();
    let home_dir = state.home_dir.lock().unwrap().clone();

    // enable means user has enable the switch
    // for which we need to block usb
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

fn usb_block_command() -> AppCommand {
    let add_uas_in_blacklist_file = Action::new(
        "add uas in blacklist.conf",
        "echo",
        true,
        false,
        vec![
            "blacklist uas",
            "|",
            "pkexec",
            "tee",
            "-a",
            "/etc/modprobe.d/blacklist.conf",
        ],
    );

    let remove_uas_in_blacklist_file = Action::new(
        "remove uas from blacklist.conf",
        "sed",
        true,
        false,
        vec![
            "-i",
            "\'s/blacklist uas//g\'",
            "/etc/modprobe.d/blacklist.conf",
        ],
    );

    let uas_inst = Instruction::new(
        "",
        add_uas_in_blacklist_file,
        Some(remove_uas_in_blacklist_file),
    );

    let add_usb_storage_in_blacklist_file = Action::new(
        "add usb-storage in blacklist.conf",
        "echo",
        true,
        false,
        vec![
            "blacklist usb-storage",
            "|",
            "pkexec",
            "tee",
            "-a",
            "/etc/modprobe.d/blacklist.conf",
        ],
    );

    let remove_usb_storage_in_blacklist_file = Action::new(
        "remove usb-storage in blacklist.conf",
        "sed",
        true,
        false,
        vec![
            "-i",
            "\'s/blacklist usb-storage//g\'",
            "/etc/modprobe.d/blacklist.conf",
        ],
    );

    let usb_storage_inst = Instruction::new(
        "",
        add_usb_storage_in_blacklist_file,
        Some(remove_usb_storage_in_blacklist_file),
    );

    let remove_modprobe_uas = Action::new(
        "remove modprobe",
        "modprobe",
        true,
        false,
        vec!["-r", "uas"],
    );

    let add_modprobe_uas = Action::new("add modprobe", "modprobe", true, false, vec!["uas"]);

    let refresh_uas_inst = Instruction::new("", remove_modprobe_uas, Some(add_modprobe_uas));

    let remove_modprobe_usb_storage = Action::new(
        "remove modprobe",
        "modprobe",
        true,
        false,
        vec!["-r", "usb-storage"],
    );

    let add_modprobe_usb_storage =
        Action::new("add modprobe", "modprobe", true, false, vec!["usb-storage"]);

    let refresh_usb_inst = Instruction::new(
        "",
        remove_modprobe_usb_storage,
        Some(add_modprobe_usb_storage),
    );

    AppCommand {
        name: "usb.block".into(),
        description: "Enabling / Disabling camera".into(),
        instructions: vec![
            uas_inst,
            usb_storage_inst,
            refresh_uas_inst,
            refresh_usb_inst,
        ],
    }
}
