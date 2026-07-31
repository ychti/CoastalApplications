# AGENTS.md

## Project overview

This repository is currently used for a static rental application portal.

- Main app: `index.html` (single-file HTML/CSS/JS)
- Optional PWA files: `manifest.json`, `sw.js`
- Domain mapping: `CNAME`

## Local run

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Keep identities (domain, email, provider account IDs) as placeholders in source control.
- Configure real production identities only inside your private environment.
