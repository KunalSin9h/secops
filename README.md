<div align="center"> 
    <img alt="Secops Logo" height="200px" src="https://github.com/KunalSin9h/Secops/assets/82411321/f5480df3-a1d4-461d-bf54-4092a75dda49">
    <p align="center">
        <h1>Secops</h1>
    </p>
    <p align="center">
        <h3>Ubuntu Desktop Security Made Easy</h3>
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
    <img src="https://github.com/KunalSin9h/secops/assets/82411321/d3bea124-b7e9-42b1-af4b-b4a20f725dd6" alt="Secops Dashboard Image" style="border-radius: 10%;" />
</p>

> [!IMPORTANT]
> More Security Settings need to be added, you can request one in [issues](https://github.com/KunalSin9h/Secops/issues)

Secops, short for *Secure Operations* is a friendly GUI application for ubuntu operating system.

## Stack

- [Tauri](https://tauri.app/)
- React + Vite
- TailwindCSS
- Cmake (required)

## Download

Download from [release page](https://github.com/KunalSin9h/Secops/releases)

## Local Setup

Clone the repository

```bash
git clone https://github.com/KunalSin9h/secops
```

### Requirements

#### Download All requirements on OS for developing the project.

```bash
cd secops # go to project directory

cmake .
cd build
make run_script
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

---