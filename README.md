# Board Decision Ownership Reset Brief

Board-ready ownership-reset surface for restoring final decision accountability, escalation clarity, and board-visible intervention paths across the executive estate.

- Live: `https://ownership-reset.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-ownership-reset-brief`

## Why this matters

Leaders need more than status labels. They need one surface that shows where final ownership has drifted, which decision chains need a reset, and how accountability can be restored before board confidence drops further.

## What it includes

- TypeScript executive-intelligence surface for ownership resets with modeled routing lanes, final-owner drift, accountability repair, and board-safe intervention posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for escalation lanes, handoff ledgers, intervention packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/ownership-lane`
- `/reset-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-ownership-reset-brief
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-ownership-reset-brief fixtures/board-decision-ownership-reset-brief.json --format summary
npx board-decision-ownership-reset-brief fixtures/board-decision-ownership-reset-brief-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Ownership lane](screenshots/02-ownership-lane-proof.png)
![Reset ledger](screenshots/03-reset-ledger-proof.png)
![Intervention posture](screenshots/04-intervention-posture-proof.png)
