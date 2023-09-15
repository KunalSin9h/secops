use tauri::AppHandle;

use crate::core::Action;

pub fn update(app: &AppHandle) -> Result<(), String> {
    let act = Action::new(
        "update dependencies",
        "apt-get",
        true,
        false,
        vec!["update"],
    );

    act.exec(app)?;

    Ok(())
}

pub fn upgrade(app: &AppHandle) -> Result<(), String> {
    let act = Action::new(
        "upgrade dependencies",
        "apt-get",
        true,
        false,
        vec!["upgrade", "-y"],
    );

    act.exec(app)?;

    Ok(())
}
