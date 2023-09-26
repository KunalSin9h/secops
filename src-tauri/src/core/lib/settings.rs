use std::{collections::HashMap, path::PathBuf};

#[derive(serde::Deserialize, serde::Serialize)]
pub struct StateFile {
    pub message: String,
    pub time: String,
    pub settings: HashMap<String, serde_json::Value>,
    pub commands: Vec<Command>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Command {
    pub name: String,
    pub run: String,
    pub undo: String,
}

const CURRENT_STATE_FILE_PATH: &str = ".secops/state/current.json";

fn read_state_file(home_dir: &PathBuf) -> Result<String, std::io::Error> {
    let state_file_path = home_dir.join(CURRENT_STATE_FILE_PATH);

    match std::fs::read_to_string(state_file_path) {
        Ok(data) => Ok(data),
        Err(e) => Err(e),
    }
}

fn write_state_file(home_dir: &PathBuf, content: String) -> Result<(), std::io::Error> {
    let state_file_path = home_dir.join(CURRENT_STATE_FILE_PATH);

    match std::fs::write(state_file_path, content.as_bytes()) {
        Ok(()) => Ok(()),
        Err(e) => Err(e),
    }
}

pub fn add_command(home_dir: &PathBuf, cmd: Command) -> Result<(), std::io::Error> {
    let state_file_content = read_state_file(home_dir)?;

    let mut state_file: StateFile =
        serde_json::from_str(&state_file_content).expect("Failed to convert str to json");

    state_file.commands.push(cmd);

    let new_state_file_content =
        serde_json::to_string(&state_file).expect("failed to crate string fro struct");

    write_state_file(home_dir, new_state_file_content)?;

    Ok(())
}

pub fn remove_command(home_dir: &PathBuf, cmd_name: String) -> Result<(), std::io::Error> {
    let state_file_content = read_state_file(home_dir)?;

    let mut state_file: StateFile =
        serde_json::from_str(&state_file_content).expect("Failed to convert str to json");

    let filter_commands: Vec<Command> = state_file
        .commands
        .into_iter()
        .filter(|cmd| cmd.name != cmd_name)
        .collect();

    state_file.commands = filter_commands;

    let new_state_file_content =
        serde_json::to_string(&state_file).expect("failed to crate string fro struct");

    write_state_file(home_dir, new_state_file_content)?;

    Ok(())
}
