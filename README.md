# Huddle — Tiger BioSciences × Bttr

Partnership-forward presentation for the Tiger BioSciences vendor evaluation.

## Routes

- `/` — the deck (22 slides; arrow keys / dots to navigate). Append `?slide=N` to deep-link a slide, `?print=1` to hide nav chrome for capture.
- `/activity-log` — the six-month activity record (230+ emails, every documented request).

## Develop

```bash
pnpm install   # or npm install
pnpm dev       # http://localhost:3000
```

## Deploy

Hosted on Vercel. Pushes to `main` deploy automatically once the repo is linked to the Vercel project.

Built with Next.js (App Router) + Tailwind CSS.
