import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderOwnershipLane,
  renderResetLedger,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Decision Ownership Reset Brief");
  });

  it("renders the product depth and shared proof pattern", () => {
    const html = renderOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("board-decision-ownership-reset-brief");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });

  it("renders all product routes", () => {
    expect(renderOwnershipLane()).toContain("/ownership-lane");
    expect(renderResetLedger()).toContain("/reset-ledger");
    expect(renderInterventionPosture()).toContain("Intervention posture");
    expect(renderVerification()).toContain("Verification");
  });
});
