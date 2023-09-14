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

fn sleep() -> Instruction {
    Instruction::new(
        "sleep for 1 second",
        Action::new("", "sleep", false, false, vec!["3"]),
        None,
    )
}

fn update() -> Instruction {
    Instruction::new(
        "",
        Action::new("", "pacman", true, false, vec!["-Sy"]),
        None,
    )
}

pub fn dummy_command(app: &AppHandle) -> Result<bool, String> {
    let cmd = AppCommand::new(
        "Echoing multiple names",
        "",
        vec![
            get_instruction("A".to_string()),
            sleep(),
            get_instruction("B".to_string()),
            sleep(),
            get_instruction("C".to_string()),
            sleep(),
            get_instruction("D".to_string()),
            sleep(),
            get_instruction("E".to_string()),
            sleep(),
            update(),
        ],
    );

    return cmd.execute(app);
}
