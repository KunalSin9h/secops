use super::shared::*;
use crate::{
    core::{AppCommand, Application, Instruction},
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
    let module_uas = "uas";
    let module_usb = "usb-storage";

    let add_uas_in_blacklist_file = add_module_to_blacklist(module_uas);
    let remove_uas_from_blacklist_file = remove_module_from_blacklist(module_uas);

    let uas_inst = Instruction::new(
        "",
        add_uas_in_blacklist_file,
        Some(remove_uas_from_blacklist_file),
    );

    let add_usb_storage_in_blacklist_file = add_module_to_blacklist(module_usb);
    let remove_usb_storage_from_blacklist_file = remove_module_from_blacklist(module_usb);

    let usb_storage_inst = Instruction::new(
        "",
        add_usb_storage_in_blacklist_file,
        Some(remove_usb_storage_from_blacklist_file),
    );

    let remove_modprobe_uas = remove_modprobe(module_uas);
    let add_modprobe_uas = add_modprobe(module_uas);

    let refresh_uas_inst = Instruction::new("", remove_modprobe_uas, Some(add_modprobe_uas));

    let remove_modprobe_usb_storage = remove_modprobe(module_usb);
    let add_modprobe_usb_storage = add_modprobe(module_uas);

    let refresh_usb_inst = Instruction::new(
        "",
        remove_modprobe_usb_storage,
        Some(add_modprobe_usb_storage),
    );

    AppCommand {
        name: "usb.block".into(),
        description: "Block USB Device".into(),
        instructions: vec![
            uas_inst,
            usb_storage_inst,
            refresh_uas_inst,
            refresh_usb_inst,
        ],
    }
}
