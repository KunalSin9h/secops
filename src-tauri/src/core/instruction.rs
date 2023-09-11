use super::action::Action;

pub struct Instruction {
    pub description: String,
    pub run: Action,
    pub undo: Option<Action>,
}

impl Default for Instruction {
    fn default() -> Self {
        Instruction {
            description: "Default instruction description".to_string(),
            run: Action::default(),
            undo: Some(Action::default()),
        }
    }
}

impl Instruction {
    pub fn new(description: &str, run: Action, undo: Option<Action>) -> Self {
        Instruction {
            description: description.to_string(),
            run,
            undo,
        }
    }
}
