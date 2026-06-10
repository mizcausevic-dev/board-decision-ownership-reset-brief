import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the executive summary for CLI output", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 4,
      resetPriorityLanes: 3,
      averageBoardConfidence: 61.5,
      valueAtStakeMillions: 120,
      leadingMessage: "Ownership reset is needed."
    });

    expect(output).toContain("Board Decision Ownership Reset Brief");
    expect(output).toContain("Lanes: 6");
    expect(output).toContain("Value at stake: $120M");
    expect(output).toContain("Ownership reset is needed.");
  });
});
