use std::process::Command;

use tauri::AppHandle;

use super::execution_manager;

pub struct Action {
    pub description: String,
    pub command: String,
    pub root: bool,
    pub output: bool,
    pub args: Vec<String>,
}

impl Default for Action {
    fn default() -> Self {
        Action {
            description: "Default action description".to_string(),
            command: "".to_string(),
            root: false,
            output: false,
            args: vec![],
        }
    }
}

impl Action {
    pub fn new(
        description: &str,
        command: &str,
        root: bool,
        output: bool,
        args: Vec<&str>,
    ) -> Self {
        Action {
            description: description.to_string(),
            command: command.to_string(),
            root,
            output,
            args: args.iter().map(|arg| arg.to_string()).collect(),
        }
    }

    pub fn script(&self) -> String {
        let mut tokens: Vec<String> = vec![self.command.clone()];
        tokens.append(&mut self.args.clone());

        tokens.join(" ")
    }

    /// Execute as single action
    pub fn exec(&self, app: Option<&AppHandle>) -> Result<Option<String>, String> {
        let mut cmd: Command;

        if self.root {
            cmd = Command::new("pkexec");
            cmd.arg("sh").arg("-c").arg(self.script());
        } else {
            cmd = Command::new("sh");
            cmd.arg("-c").arg(self.script());
        }

        if self.output {
            let out = match cmd.output() {
                Ok(out) => out,
                Err(e) => return Err(e.to_string()),
            };

            let output = match String::from_utf8(out.stdout) {
                Ok(output) => output,
                Err(e) => return Err(e.to_string()),
            };

            Ok(Some(output))
        } else {
            cmd.stdout(std::process::Stdio::piped());
            cmd.stderr(std::process::Stdio::piped());

            match app {
                None => Ok(None),
                Some(app) => match execution_manager(&mut cmd, app, &self.description) {
                    Ok(_) => Ok(None),
                    Err(err) => Err(err.to_string()),
                },
            }
        }
    }
}
