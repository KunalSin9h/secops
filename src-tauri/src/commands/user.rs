use tauri::AppHandle;

use crate::core::Action;

pub fn get_user(app: &AppHandle) -> Result<String, String> {
    let act = Action::new(
        "Getting current logged-in user",
        "whoami",
        false,
        true,
        vec![],
    );
    let user = act.exec(app)?;

    Ok(user.unwrap())
}
