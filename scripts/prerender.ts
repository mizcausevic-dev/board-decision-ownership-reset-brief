import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderOwnershipLane,
  renderResetLedger,
  renderVerification
} from "../src/services/render.js";
import {
  interventionPosture,
  ownershipLane,
  payload,
  resetLedger,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/ownership-lane", ["ownership-lane/index.html", renderOwnershipLane()]],
  ["/reset-ledger", ["reset-ledger/index.html", renderResetLedger()]],
  ["/intervention-posture", ["intervention-posture/index.html", renderInterventionPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://ownership-reset.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://ownership-reset.kineticgain.com/</loc></url><url><loc>https://ownership-reset.kineticgain.com/ownership-lane/</loc></url><url><loc>https://ownership-reset.kineticgain.com/reset-ledger/</loc></url><url><loc>https://ownership-reset.kineticgain.com/intervention-posture/</loc></url><url><loc>https://ownership-reset.kineticgain.com/verification/</loc></url><url><loc>https://ownership-reset.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/ownership-lane.json": ownershipLane(),
  "api/reset-ledger.json": resetLedger(),
  "api/intervention-posture.json": interventionPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
