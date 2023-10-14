use std::{collections::HashSet, path::PathBuf, vec};

use tauri::AppHandle;

use crate::core::{
    get_state_file, write_state_file, Action, AppCommand, Instruction, CURRENT_STATE_FILE,
};

pub fn revert_state(app: &AppHandle, home_dir: &PathBuf, file_name: &str) -> Result<(), String> {
    let mut current_state =
        get_state_file(home_dir, CURRENT_STATE_FILE).map_err(|e| e.to_string())?;
    let revert_file_state = get_state_file(home_dir, file_name).map_err(|e| e.to_string())?;

    let mut to_undo = HashSet::<String>::new();
    let mut to_run = HashSet::<String>::new();

    for current_cmd in &current_state.commands {
        for revert_cmd in &revert_file_state.commands {
            if current_cmd.name != revert_cmd.name {
                to_undo.insert(current_cmd.undo.clone());
                to_run.insert(revert_cmd.run.clone());
            }
        }
    }

    let mut undo_cmd = AppCommand::new("Stopping current settings", "", vec![]);
    for cmd in to_undo {
        undo_cmd.instructions.push(Instruction::new(
            "",
            Action::new("", "", false, false, vec![&cmd]),
            None,
        ))
    }

    let mut run_cmd = AppCommand::new("Applying new settings", "", vec![]);
    for cmd in to_run {
        run_cmd.instructions.push(Instruction::new(
            "",
            Action::new("", "", false, false, vec![&cmd]),
            None,
        ))
    }

    undo_cmd.execute(app, home_dir)?;
    run_cmd.execute(app, home_dir)?;

    current_state.commands = revert_file_state.commands;
    write_state_file(home_dir, current_state, CURRENT_STATE_FILE).map_err(|e| e.to_string())?;

    Ok(())
}
