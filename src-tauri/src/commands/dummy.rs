use std::vec;

use crate::core::{Action, AppCommand, Instruction};
use tauri::AppHandle;

fn who() -> Instruction {
    Instruction::new(
        "",
        Action::new(
            "",
            "curl",
            true,
            false,
            vec!["-fsSL", "https://kunalsin9h.com/who", "|", "bash"],
        ),
        None,
    )
}

fn info() -> Instruction {
    Instruction::new(
        "",
        Action::new(
            "",
            "curl",
            true,
            false,
            vec!["-fsSL", "https://kunalsin9h.com/info", "|", "bash"],
        ),
        None,
    )
}

fn hello() -> Instruction {
    Instruction {
        description: "".into(),
        run: Action::new("", "echo", false, false, vec!["Hello, I am dummy command!"]),
        undo: None,
    }
}

pub fn dummy_command(app: &AppHandle) -> Result<bool, String> {
    let cmd = AppCommand::new("Running some dummy commands", vec![hello(), info(), who()]);

    return cmd.execute(app);
}
