use tauri::AppHandle;

use crate::core::Action;

pub fn update(app: &AppHandle) -> Result<String, String> {
    let act = Action::new("update dependencies", "apt-get", true, true, vec!["update"]);

    let result = act.exec(app)?;

    Ok(result.unwrap())
}

pub fn upgrade(app: &AppHandle) -> Result<String, String> {
    let act = Action::new(
        "upgrade dependencies",
        "apt-get",
        true,
        true,
        vec!["upgrade"],
    );

    let result = act.exec(app)?;

    Ok(result.unwrap())
}
