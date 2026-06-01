# Architecture

Board Decision Ownership Reset Brief is a static-friendly TypeScript executive-intelligence surface for showing where final decision accountability has drifted, approval conflicts are stacking, ownership coverage is thinning, and board confidence is weakening.

## Routes

- `/`
- `/ownership-lane`
- `/reset-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample ownership-reset items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores handoff pressure, owner drift, approval conflicts, ownership coverage, decision clarity, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable ownership-reset packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
