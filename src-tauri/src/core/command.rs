use super::Instruction;
use std::io::BufRead;
use std::io::BufReader;
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

    pub fn execute(&self) -> Result<bool, String> {
        //  run = true
        return self.exec(true);
    }

    pub fn rollback(&self) -> Result<bool, String> {
        // run = false, means it will execute the undo command of all
        // instructions
        return self.exec(false);
    }

    fn exec(&self, run: bool) -> Result<bool, String> {
        let mut root_shell = Command::new("pkexec");

        root_shell.stdout(std::process::Stdio::piped());
        root_shell.stderr(std::process::Stdio::piped());

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

        let mut child = match root_shell.spawn() {
            Ok(child) => child,
            Err(err) => return Err(err.to_string()),
        };

        if let Some(child_stdout) = child.stdout.as_mut() {
            let lines = BufReader::new(child_stdout).lines();
            for line in lines {
                println!("{}", line.unwrap());
            }
        }

        if let Some(child_stderr) = child.stderr.as_mut() {
            let lines = BufReader::new(child_stderr).lines();
            for line in lines {
                println!("{}", line.unwrap());
            }
        }

        let finish = match child.wait() {
            Ok(state) => state,
            Err(e) => return Err(e.to_string()),
        };

        if finish.success() {
            Ok(true)
        } else {
            Err(format!(
                "Command failed with exit code: {}",
                finish.code().unwrap_or(-1)
            ))
        }
    }
}
