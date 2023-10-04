# Secops

Ubuntu Security Made Easy

[![publish](https://github.com/KunalSin9h/secops/actions/workflows/release.yml/badge.svg)](https://github.com/KunalSin9h/secops/actions/workflows/release.yml)
[![Build](https://github.com/KunalSin9h/Secops/actions/workflows/build.yml/badge.svg)](https://github.com/KunalSin9h/Secops/actions/workflows/build.yml)
[![Test](https://github.com/KunalSin9h/Secops/actions/workflows/test.yml/badge.svg)](https://github.com/KunalSin9h/Secops/actions/workflows/test.yml)

![Dashboard Demo](https://tiddi.kunalsin9h.com/z7qvuTl)

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

#### Download All requirenments on Ubuntu for developing the project.

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

Application will be build by GitHub Action

Tauri [Docs](https://tauri.app/v1/guides/)
