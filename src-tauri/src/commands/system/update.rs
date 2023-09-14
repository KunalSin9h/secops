use tauri::AppHandle;

use crate::core::Action;

pub fn update(app: &AppHandle) -> Result<(), String> {
    let act = Action::new("update dependencies", "apt", true, false, vec!["update"]);

    act.exec(app)?;

    Ok(())
}

pub fn upgrade(app: &AppHandle) -> Result<(), String> {
    let act = Action::new("upgrade dependencies", "apt", true, false, vec!["upgrade"]);

    act.exec(app)?;

    Ok(())
}
