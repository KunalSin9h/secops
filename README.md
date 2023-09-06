![Banner](https://tiddi.kunalsin9h.com/e3S1fjb)

# Secops

Ubuntu Security Made Easy

[![publish](https://github.com/KunalSin9h/secops/actions/workflows/release.yml/badge.svg)](https://github.com/KunalSin9h/secops/actions/workflows/release.yml)

## Local Setup

### Requirements

- Pnpm
- Rust
- GoLang

Clone the repository

```bash
git clone https://github.com/KunalSin9h/secops
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
