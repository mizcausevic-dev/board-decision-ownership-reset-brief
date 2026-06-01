import { describe, expect, it } from "vitest";
import { interventionPosture, ownershipLane, payload, resetLedger, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the escalation summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the ownership lane view", () => {
    expect(ownershipLane().length).toBeGreaterThan(0);
  });

  it("returns the reset ledger view", () => {
    expect(resetLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
