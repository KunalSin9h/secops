use std::path::Path;

#[derive(serde::Deserialize, serde::Serialize)]
pub struct StateFile {
    pub message: String,
    pub time: String,
    pub commands: Vec<Command>,
}

#[derive(serde::Deserialize, serde::Serialize)]
pub struct Command {
    pub name: String,
    pub run: String,
    pub undo: String,
}

pub const STATE_FOLDER: &str = ".secops/state";
pub const CURRENT_STATE_FILE: &str = "current.json";

pub fn get_state_file(home_dir: &Path, file_path: &str) -> Result<StateFile, std::io::Error> {
    let state_file_path = home_dir.join(STATE_FOLDER).join(file_path);

    let data = match std::fs::read_to_string(state_file_path) {
        Ok(data) => data,
        Err(e) => return Err(e),
    };

    let state_file: StateFile = serde_json::from_str(&data)?;

    Ok(state_file)
}

pub fn write_state_file(
    home_dir: &Path,
    state_file: StateFile,
    file_path: &str,
) -> Result<(), std::io::Error> {
    let state_file_path = home_dir.join(STATE_FOLDER).join(file_path);

    let new_state_file_content = serde_json::to_string_pretty(&state_file)?;

    match std::fs::write(state_file_path, new_state_file_content.as_bytes()) {
        Ok(()) => Ok(()),
        Err(e) => Err(e),
    }
}

pub fn add_command(home_dir: &Path, cmd: Command) -> Result<(), std::io::Error> {
    let mut state_file = get_state_file(home_dir, CURRENT_STATE_FILE)?;

    state_file.commands.push(cmd);

    write_state_file(home_dir, state_file, CURRENT_STATE_FILE)?;

    Ok(())
}

pub fn remove_command(home_dir: &Path, cmd_name: String) -> Result<(), std::io::Error> {
    let mut state_file = get_state_file(home_dir, CURRENT_STATE_FILE)?;

    let filter_commands: Vec<Command> = state_file
        .commands
        .into_iter()
        .filter(|cmd| cmd.name != cmd_name)
        .collect();

    state_file.commands = filter_commands;

    write_state_file(home_dir, state_file, CURRENT_STATE_FILE)?;

    Ok(())
}
