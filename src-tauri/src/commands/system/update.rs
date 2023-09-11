use crate::core::Action;

pub fn update() -> Result<String, String> {
    let act = Action::new("update dependencies", "apt-get", true, true, vec!["update"]);

    let out = act.exec()?;
    Ok(out.unwrap())
}

pub fn upgrade() -> Result<(), String> {
    let act = Action::new(
        "upgrade dependencies",
        "apt-get",
        true,
        false,
        vec!["upgrade"],
    );

    let _ = act.exec()?;
    Ok(())
}
