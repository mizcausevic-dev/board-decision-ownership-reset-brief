import { analyze } from "../analyze.js";
import { sampleBoardDecisionOwnershipReset } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionOwnershipReset, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Reset final AI and biotech owners first, clarify the identity approver second, collapse one revenue handoff third, and pause FinTech scope until owner-of-record discipline is restored."
  };
}

export function ownershipLane() {
  return sampleBoardDecisionOwnershipReset.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    ownershipTheme: item.ownershipTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    unresolvedOwners: item.unresolvedOwners
  }));
}

export function resetLedger() {
  return sampleBoardDecisionOwnershipReset.map((item) => ({
    lane: item.lane,
    resetHeadline: item.resetHeadline,
    ownershipSignal: item.ownershipSignal,
    ownerOfRecord: item.ownerOfRecord,
    requiredEvidence: item.requiredEvidence,
    decisionHandoffs: item.decisionHandoffs,
    approvalConflicts: item.approvalConflicts
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeOwnershipRiskScore: item.compositeOwnershipRiskScore,
    handoffs: item.handoffAssessment,
    owner: item.ownerAssessment,
    approvalConflicts: item.approvalConflictAssessment,
    coverage: item.coverageAssessment,
    clarity: item.clarityAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeOwnershipRiskScore: item.compositeOwnershipRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic ownership-reset data only - no live board packets, actual approval histories, or real owner-of-record disputes are included.",
    "Scores are modeled to show how Kinetic Gain can turn owner drift, approval conflict, and handoff sprawl into board-readable reset decisions.",
    "All routes are read-only and demonstrate ownership-reset packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    ownershipLane: ownershipLane(),
    resetLedger: resetLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionOwnershipReset
  };
}
