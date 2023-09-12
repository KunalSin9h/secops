use super::Instruction;
use std::process::Command;

pub struct AppCommand {
    pub name: String,
    pub description: String,
    pub instructions: Vec<Instruction>,
}

impl Default for AppCommand {
    fn default() -> Self {
        AppCommand {
            name: "Default command".to_string(),
            description: "Default command description".to_string(),
            instructions: vec![],
        }
    }
}

impl AppCommand {
    pub fn new(name: &str, description: &str, instructions: Vec<Instruction>) -> Self {
        AppCommand {
            name: name.to_string(),
            description: description.to_string(),
            instructions,
        }
    }

    pub fn execute(&self) -> Result<(), String> {
        //  run = true
        self.exec(true)
    }

    pub fn rollback(&self) -> Result<(), String> {
        // run = false, means it will execute the undo command of all
        // instructions
        self.exec(false)
    }

    fn exec(&self, run: bool) -> Result<(), String> {
        let mut root_shell = Command::new("pkexec");

        // TODO: make the stdout, stderr go to frontend
        root_shell.stdout(std::process::Stdio::inherit());
        root_shell.stderr(std::process::Stdio::inherit());

        let mut commands: Vec<String> = vec![];

        for inst in &self.instructions {
            if run {
                commands.push(inst.run.script());
            } else {
                if let Some(action) = &inst.undo {
                    commands.push(action.script());
                }
            }
        }

        root_shell.arg("sh").arg("-c").arg(commands.join(";"));

        let status = match root_shell.status() {
            Ok(status) => status,
            Err(e) => {
                return Err(format!(
                    "Error executing command: {}, with error: {}",
                    &self.name,
                    e.to_string()
                ));
            }
        };

        if status.success() {
            Ok(())
        } else {
            Err(format!(
                "Command failed with exit code: {}",
                status.code().unwrap_or(-1)
            ))
        }
    }
}
