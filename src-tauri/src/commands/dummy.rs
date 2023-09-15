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

fn hello() -> Instruction {
    Instruction {
        description: "".into(),
        run: Action::new("", "echo", false, false, vec!["Hello, I am dummy command!"]),
        undo: None,
    }
}

fn dir() -> Instruction {
    Instruction::new("", Action::new("", "dir", false, false, vec![]), None)
}

fn env() -> Instruction {
    Instruction::new("", Action::new("", "env", false, false, vec![]), None)
}

fn ps() -> Instruction {
    Instruction::new("", Action::new("", "ps", false, false, vec![]), None)
}

pub fn dummy_command(app: &AppHandle) -> Result<bool, String> {
    let cmd = AppCommand::new(
        "Running some dummy commands",
        vec![hello(), dir(), env(), ps(), who()],
    );

    return cmd.execute(app);
}
