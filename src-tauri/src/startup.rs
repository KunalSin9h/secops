use std::path::Path;
use std::process::Command;
use std::{fs, io};

pub async fn setup_app() {
    let user_data = Command::new("whoami")
        .output()
        .expect("failed to execute process");

    let user = String::from_utf8(user_data.stdout).expect("failed to user");
    let home_dir_string = format!("/home/{}", user.replace("\n", ""));

    let home_dir = Path::new(&home_dir_string);

    let app_path = home_dir.join(".secops");
    let icons_path = app_path.join("icons");

    if fs::metadata(&app_path).is_err() {
        fs::create_dir(&app_path).expect("failed to create $HOME/.secops");
    }

    if fs::metadata(&icons_path).is_err() {
        fs::create_dir(&icons_path).expect("failed to create $HOME/.secops/icons");
    }

    if copy_dir_all("/var/lib/AccountsService/icons", icons_path).is_err() {
        println!("Failed to copy icons to ~/.secops/icons");
    }
}

fn copy_dir_all(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir_all(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }
    Ok(())
}
