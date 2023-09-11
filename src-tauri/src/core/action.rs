use std::process::Command;

pub struct Action {
    pub description: String,
    pub command: String,
    pub root: bool,
    pub output: bool,
    pub args: Vec<String>,
}

impl Default for Action {
    fn default() -> Self {
        Action {
            description: "Default action description".to_string(),
            command: "".to_string(),
            root: false,
            output: false,
            args: vec![],
        }
    }
}

impl Action {
    pub fn new(
        description: &str,
        command: &str,
        root: bool,
        output: bool,
        args: Vec<String>,
    ) -> Self {
        Action {
            description: description.to_string(),
            command: command.to_string(),
            root,
            output,
            args,
        }
    }

    /// Execute as single action
    pub fn exec(&self) -> Result<Option<String>, String> {
        let mut cmd = Command::new(self.command.as_str());

        if self.output {
            let c = cmd.args(&self.args).output().map_err(|e| e.to_string())?;

            let result = String::from_utf8(c.stdout).map_err(|e| e.to_string())?;

            return Ok(Some(result));
        } else {
            let c = cmd.args(&self.args).status().map_err(|e| e.to_string())?;

            if c.success() {
                return Ok(None);
            } else {
                return Err("non zero exit status".to_string());
            }
        }
    }
}
