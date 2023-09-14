use std::vec;

use tauri::AppHandle;

use crate::core::{Action, AppCommand, Instruction};

fn get_action(name: String) -> Action {
    Action {
        description: "echoing name".to_string(),
        command: "echo".to_string(),
        root: false,
        output: false,
        args: vec![name],
    }
}
fn get_instruction(name: String) -> Instruction {
    Instruction {
        description: "echoing name".to_string(),
        run: get_action(name),
        undo: None,
    }
}

fn update() -> Instruction {
    Instruction::new(
        "",
        Action::new("", "apt", true, false, vec!["update"]),
        None,
    )
}

pub fn dummy_command(app: &AppHandle) -> Result<bool, String> {
    let cmd = AppCommand::new(
        "Echoing multiple names",
        vec![
            get_instruction("A".to_string()),
            get_instruction("B".to_string()),
            get_instruction("C".to_string()),
            get_instruction("D".to_string()),
            get_instruction("E".to_string()),
            update(),
        ],
    );

    return cmd.execute(app);
}
