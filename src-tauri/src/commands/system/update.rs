use crate::core::Action;

pub fn update() -> Result<(), String> {
	let act = Action::new("update dependencies", "apt-get", true, false, vec!["update".to_string()]);

	let _ = act.exec()?;
	Ok(())
}

pub fn upgrade() -> Result<(), String> {
	let act = Action::new("upgrade dependencies", "apt-get", true, false, vec!["upgrade".to_string()]);

	let _ = act.exec()?;
	Ok(())
}