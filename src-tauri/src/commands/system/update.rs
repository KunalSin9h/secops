use crate::core::Action;

pub fn update() -> Result<(), String> {
    let act = Action::new("update dependencies", "pacman", true, true, vec!["-Sy"]);

    let result = act.exec()?;

    assert_eq!(result, None);

    Ok(())
}

pub fn upgrade() -> Result<(), String> {
    let act = Action::new(
        "upgrade dependencies",
        "apt-get",
        true,
        false,
        vec!["upgrade"],
    );

    let result = act.exec()?;

    assert_eq!(result, None);

    Ok(())
}
