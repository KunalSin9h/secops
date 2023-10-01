use crate::core::Action;

// Remove modprobe
pub fn remove_modprobe(module: &str) -> Action {
    Action::new(
        "remove modprobe",
        "modprobe",
        true,
        false,
        vec!["-r", module],
    )
}

// add modprobe
pub fn add_modprobe(module: &str) -> Action {
    Action::new("Add modprobe", "modprobe", true, false, vec![module])
}

// add item to blacklist.conf
pub fn add_module_to_blacklist(module: &str) -> Action {
    Action::new(
        format!("Add {} in blacklist.conf", module).as_str(),
        "echo",
        true,
        false,
        vec![
            format!("blacklist {}", module).as_str(),
            "|",
            "pkexec",
            "tee",
            "-a",
            "/etc/modprobe.d/blacklist.conf",
        ],
    )
}

// remove item to blacklist.conf
pub fn remove_module_from_blacklist(module: &str) -> Action {
    Action::new(
        format!("Remove {} in blacklist.conf", module).as_str(),
        "sed",
        true,
        false,
        vec![
            "-i",
            format!("\'s/blacklist {}//g\'", module).as_str(),
            "/etc/modprobe.d/blacklist.conf",
        ],
    )
}
