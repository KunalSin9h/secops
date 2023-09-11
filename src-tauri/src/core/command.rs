use super::Instruction;

pub struct Command {
    pub description: String,
    pub instructions: Vec<Instruction>,
}

impl Default for Command {
    fn default() -> Self {
        Command {
            description: "Default command description".to_string(),
            instructions: vec![],
        }
    }
}

impl Command {
    pub fn new(description: &str, instructions: Vec<Instruction>) -> Self {
        Command {
            description: description.to_string(),
            instructions,
        }
    }
}
