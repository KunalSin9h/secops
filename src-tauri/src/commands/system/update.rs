use crate::core::Action;

pub fn update() -> Result<String, String> {
    let act = Action::new("update dependencies", "pacman", true, true, vec!["-Sy"]);

    let result = act.exec()?;

    Ok(result.unwrap())
}

pub fn upgrade() -> Result<String, String> {
    let act = Action::new(
        "upgrade dependencies",
        "apt-get",
        true,
        true,
        vec!["upgrade"],
    );

    let result = act.exec()?;

    Ok(result.unwrap())
}
