echo "This script is for Debian Based OS, like Ubuntu, for other systems "
echo "checkout: https://tauri.app/v1/guides/getting-started/prerequisites"
echo ""
echo ""
echo "Setting up host for Secops develpment"
echo ""
echo "Secops required"
echo "1. Rust"
echo "2. Prerequisites for Tauri App"
echo 
echo "Updating System..."

sudo apt-get update -y

echo "Downloading dependencies"

sudo apt-get install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev -y

echo "Downloading npm"
sudo apt-get install npm -y

echo "Downloading n from npm"
sudo npm i -g n 

echo "Downloading nodejs latest"
sudo n latest

echo "Downloaing latest rust tool chain"
echo "Checking if rust is already install then just updatin"

if [ -x "$(command -v cargo)" ]; then
    echo "Rust tool chain is already install"
    echo "Updating..."
    rustup update
else
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source "$HOME/.cargo/env"
fi

echo "Install Tauri CLI"
cargo install tauri-cli

echo "Downloading pnpm"
if ! [ -x "$(command -v pnpm)" ]; then
    curl -fsSL https://get.pnpm.io/install.sh | sh -
else 
    echo "pnpm is already installed"
    echo "updating pnpm..."
    pnpm update
fi

echo "Installing frontend Dependencies"
pnpm install