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
    pid: u32,
}

impl AppCommand {
    pub fn new(description: &str, instructions: Vec<Instruction>) -> Self {
        AppCommand {
            description: description.to_string(),
            instructions,
        }
    }

    pub fn run_script(&self) -> String {
        let scripts: Vec<String> = self
            .instructions
            .iter()
            .map(|inst| inst.run.script())
            .collect();

        scripts.join(" && ")
    }

    pub fn undo_script(&self) -> String {
        let scripts: Vec<String> = self
            .instructions
            .iter()
            .map(|inst| match &inst.undo {
                None => "".to_string(),
                Some(action) => action.script(),
            })
            .filter(|script| script != "")
            .collect();

        scripts.join(" && ")
    }

    pub fn execute(&self, app: &AppHandle) -> Result<(), String> {
        //  run = true
        self.exec(true, app)
    }

    pub fn rollback(&self, app: &AppHandle) -> Result<(), String> {
        // run = false, means it will execute the undo command of all
        // instructions
        self.exec(false, app)
    }

    fn exec(&self, run: bool, app: &AppHandle) -> Result<(), String> {
        let mut root_shell = Command::new("pkexec");

        root_shell.stdout(std::process::Stdio::piped());
        root_shell.stderr(std::process::Stdio::piped());

        let commands = if run {
            self.run_script()
        } else {
            self.undo_script()
        };

        root_shell.arg("sh").arg("-c").arg(commands);

        execution_manager(&mut root_shell, app, &self.description)
    }
}

pub fn execution_manager(cmd: &mut Command, app: &AppHandle, desc: &String) -> Result<(), String> {
    let mut child = match cmd.spawn() {
        Ok(child) => child,
        Err(err) => return Err(err.to_string()),
    };

    let pid = child.id();

    if let Some(child_stdout) = child.stdout.as_mut() {
        let lines = BufReader::new(child_stdout).lines();
        for line in lines {
            send_execution_state(app, desc, line.unwrap(), "passing", pid)?;
        }
    }

    if let Some(child_stderr) = child.stderr.as_mut() {
        let lines = BufReader::new(child_stderr).lines();
        for line in lines {
            send_execution_state(app, desc, line.unwrap(), "failing", pid)?;
        }
    }

    let finish = match child.wait() {
        Ok(state) => state,
        Err(e) => return Err(e.to_string()),
    };

    if finish.success() {
        send_execution_state(app, desc, "Done".into(), "pass", pid)?;
        Ok(())
    } else {
        send_execution_state(app, desc, "Failed".into(), "fail", pid)?;
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
    pid: u32,
) -> Result<(), String> {
    let _ = app
        .emit_all(
            "execution_state",
            ExecutionState {
                title: title.clone(),
                message: format!("{} >  {}", pid, message),
                state: state.to_owned(),
                pid,
            },
        )
        .map_err(|e| e.to_string())?;

    Ok(())
}
