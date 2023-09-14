use tauri::AppHandle;
use tauri::Manager;

use super::Instruction;
use std::io::BufRead;
use std::io::BufReader;
use std::process::Command;
pub struct AppCommand {
    pub description: String,
    pub instructions: Vec<Instruction>,
}

impl Default for AppCommand {
    fn default() -> Self {
        AppCommand {
            description: "Default command description".to_string(),
            instructions: vec![],
        }
    }
}

#[derive(Clone, serde::Serialize)]
struct ExecutionState {
    title: String,
    state: String,
    message: String,
}

impl AppCommand {
    pub fn new(description: &str, instructions: Vec<Instruction>) -> Self {
        AppCommand {
            description: description.to_string(),
            instructions,
        }
    }

    pub fn execute(&self, app: &AppHandle) -> Result<bool, String> {
        //  run = true
        return self.exec(true, app);
    }

    pub fn rollback(&self, app: &AppHandle) -> Result<bool, String> {
        // run = false, means it will execute the undo command of all
        // instructions
        return self.exec(false, app);
    }

    fn exec(&self, run: bool, app: &AppHandle) -> Result<bool, String> {
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

        execution_manager(&mut root_shell, app, &self.description)
    }
}

pub fn execution_manager(
    cmd: &mut Command,
    app: &AppHandle,
    desc: &String,
) -> Result<bool, String> {
    let mut child = match cmd.spawn() {
        Ok(child) => child,
        Err(err) => return Err(err.to_string()),
    };

    if let Some(child_stdout) = child.stdout.as_mut() {
        let lines = BufReader::new(child_stdout).lines();
        for line in lines {
            send_execution_state(app, desc, line.unwrap(), "passing")?;
        }
    }

    if let Some(child_stderr) = child.stderr.as_mut() {
        let lines = BufReader::new(child_stderr).lines();
        for line in lines {
            send_execution_state(app, desc, line.unwrap(), "failing")?;
        }
    }

    let finish = match child.wait() {
        Ok(state) => state,
        Err(e) => return Err(e.to_string()),
    };

    if finish.success() {
        send_execution_state(app, desc, "Done".into(), "pass")?;
        Ok(true)
    } else {
        send_execution_state(app, desc, "Failed".into(), "fail")?;
        Err(format!(
            "Command failed with exit code: {}",
            finish.code().unwrap_or(-1)
        ))
    }
}

fn send_execution_state(
    app: &AppHandle,
    title: &String,
    message: String,
    state: &str,
) -> Result<(), String> {
    let _ = app
        .emit_all(
            "execution_state",
            ExecutionState {
                title: title.clone(),
                message,
                state: state.to_owned(),
            },
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}
