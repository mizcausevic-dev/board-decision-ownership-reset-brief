import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionOwnershipReset } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-ownership-reset-brief.json"),
  JSON.stringify(sampleBoardDecisionOwnershipReset, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-ownership-reset-brief-clean.json"),
  JSON.stringify(
    sampleBoardDecisionOwnershipReset.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
