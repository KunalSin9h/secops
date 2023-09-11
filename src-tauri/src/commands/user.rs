use crate::core::Action;

pub fn get_user() -> Result<String, String> {
    let act = Action::new("", "whoami", false, true, vec![]);
    let user = act.exec()?;

    Ok(user.unwrap())
}
