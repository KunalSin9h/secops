<div align="center"> 
    <img alt="MeltCD Logo" height="200px" src="https://github.com/KunalSin9h/Secops/assets/82411321/f5480df3-a1d4-461d-bf54-4092a75dda49">
    <p align="center">
        <h1>Secops</h1>
    </p>
    <p align="center">
        <h3>Ubuntu Security Made Easy</h3>
    </p>
</div>

<p align="center">
    <a href="https://github.com/KunalSin9h/secops/actions/workflows/release.yml" target="_black" rel="noopener"><img src="https://github.com/KunalSin9h/secops/actions/workflows/release.yml/badge.svg" alt="Publish" /></a>
    <a href="https://github.com/KunalSin9h/Secops/actions/workflows/build.yml" target="_black" rel="noopener"><img src="https://github.com/KunalSin9h/Secops/actions/workflows/build.yml/badge.svg" alt="Build" /></a>
    <a href="https://github.com/KunalSin9h/Secops/actions/workflows/test.yml" target="_black" rel="noopener"><img src="https://github.com/KunalSin9h/Secops/actions/workflows/test.yml/badge.svg" alt="Test" /></a>
</p>

<p align="center">
    <a href="https://discord.com/channels/1149004267374522398" target="_black" rel="noopener"><img src="https://img.shields.io/discord/1149004267374522398" alt="GitHub Chat" /></a>
    <a href="https://github.com/KunalSin9h/Secops/releases" target="_black" rel="noopener"><img src="https://img.shields.io/github/v/release/kunalsin9h/secops" alt="Version" /></a>
</p>

<p align="center">
    <img src="https://tiddi.kunalsin9h.com/8EdXzyK" alt="Secops Dashboard Image" style="border-radius: 10%;" />
</p>

> [!IMPORTANT]
> More Security Settings need to be added, you can request one in [issues](https://github.com/KunalSin9h/Secops/issues)

## Download
```bash
# To download latest version, run 
sh <(curl https://store.singh.software/secops)
```
Alternatively download from [release page](https://github.com/KunalSin9h/Secops/releases)

## Local Setup

Clone the repository

```bash
git clone https://github.com/KunalSin9h/secops
```

### Requirements

#### Download All requirements on Ubuntu for developing the project.

```bash
cd secops # go to project directory

bash ./scripts/setup_host.sh
```

Download Dependencies

```bash
pnpm install # for frontend

cd src-tauri
cargo fetch # for backend

cd ../ # come back to home repo
```

Run the development app

```bash
pnpm tauri dev
```

Debian Package (**.deb**) will be build by GitHub Action


