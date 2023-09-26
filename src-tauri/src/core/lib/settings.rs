use std::path::PathBuf;

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

const CURRENT_STATE_FILE_PATH: &str = ".secops/state/current.json";

fn get_state_file(home_dir: &PathBuf) -> Result<StateFile, std::io::Error> {
    let state_file_path = home_dir.join(CURRENT_STATE_FILE_PATH);

    let data = match std::fs::read_to_string(state_file_path) {
        Ok(data) => data,
        Err(e) => return Err(e),
    };

    let state_file: StateFile = serde_json::from_str(&data)?;

    Ok(state_file)
}

fn write_state_file(home_dir: &PathBuf, state_file: StateFile) -> Result<(), std::io::Error> {
    let state_file_path = home_dir.join(CURRENT_STATE_FILE_PATH);

    let new_state_file_content = serde_json::to_string_pretty(&state_file)?;

    match std::fs::write(state_file_path, new_state_file_content.as_bytes()) {
        Ok(()) => Ok(()),
        Err(e) => Err(e),
    }
}

pub fn add_command(home_dir: &PathBuf, cmd: Command) -> Result<(), std::io::Error> {
    let mut state_file = get_state_file(home_dir)?;

    state_file.commands.push(cmd);

    write_state_file(home_dir, state_file)?;

    Ok(())
}

pub fn remove_command(home_dir: &PathBuf, cmd_name: String) -> Result<(), std::io::Error> {
    let mut state_file = get_state_file(home_dir)?;

    let filter_commands: Vec<Command> = state_file
        .commands
        .into_iter()
        .filter(|cmd| cmd.name != cmd_name)
        .collect();

    state_file.commands = filter_commands;

    write_state_file(home_dir, state_file)?;

    Ok(())
}
