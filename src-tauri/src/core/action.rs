use std::process::{Command, Stdio};

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
        args: Vec<&str>,
    ) -> Self {
        Action {
            description: description.to_string(),
            command: command.to_string(),
            root,
            output,
            args: args.iter().map(|arg| arg.to_string()).collect(),
        }
    }

    /// Execute as single action
    pub fn exec(&self) -> Result<Option<String>, String> {
        let mut cmd: Command;
        let mut args: Vec<String> = vec![];

        if self.root {
            cmd = Command::new("pkexec");
            args.push(self.command.clone());
        } else {
            cmd = Command::new(self.command.as_str());
        }

        args.append(&mut self.args.clone());

        if self.output {
            let out = cmd.args(args).output().map_err(|e| e.to_string())?;

            let result = String::from_utf8(out.stdout).map_err(|e| e.to_string())?;

            return Ok(Some(result));
        } else {
            let c = cmd
                .args(args)
                .stdout(Stdio::null())
                .status()
                .map_err(|e| e.to_string())?;

            if c.success() {
                return Ok(None);
            } else {
                return Err("get non zero exit status".to_string());
            }
        }
    }
}
