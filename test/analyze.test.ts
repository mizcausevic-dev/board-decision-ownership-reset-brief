import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardDecisionOwnershipReset } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionOwnershipReset.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts reset-priority lanes", () => {
    const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.resetPriorityLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(147);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});
