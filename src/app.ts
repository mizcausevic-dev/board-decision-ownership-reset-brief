import express from "express";
import { interventionPosture, ownershipLane, payload, resetLedger, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderOwnershipLane,
  renderResetLedger,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/ownership-lane", (_req, res) => res.type("html").send(renderOwnershipLane()));
  app.get("/reset-ledger", (_req, res) => res.type("html").send(renderResetLedger()));
  app.get("/intervention-posture", (_req, res) => res.type("html").send(renderInterventionPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/ownership-lane", (_req, res) => res.json(ownershipLane()));
  app.get("/api/reset-ledger", (_req, res) => res.json(resetLedger()));
  app.get("/api/intervention-posture", (_req, res) => res.json(interventionPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, "127.0.0.1", () => {
    console.log(`board-decision-ownership-reset-brief listening on http://127.0.0.1:${port}`);
  });
}
