use std::{collections::HashSet, process::Command};

use crate::rspc::RspcError;

/*
    GET ALL USERS

    get_all_users is a Tauri command that returns a list of all users on the system.
    possible outcome will be "user1 user2 user3"

    if failed to execute the command then it will return an error message
*/
#[tauri::command]
pub fn get_all_users() -> Result<Vec<String>, rspc::Error> {
    let output = match Command::new("users").output() {
        Ok(output) => output,
        Err(err) => return Err(RspcError::internal_server_error(err.to_string()))?,
    };

    let users = match String::from_utf8(output.stdout) {
        Ok(users) => users.replace("\n", ""),
        Err(err) => return Err(RspcError::internal_server_error(err.to_string()))?,
    };

    let all_user: HashSet<&str> = HashSet::from_iter(users.split(" ").into_iter());
    let logged_in_users: Vec<String> = all_user.into_iter().map(|user| user.to_string()).collect();

    Ok(logged_in_users)
}
