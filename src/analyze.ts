import type {
  BoardDecisionOwnershipResetExport,
  BoardDecisionOwnershipResetItem,
  BoardDecisionOwnershipResetReportItem,
  OwnershipAssessment,
  OwnershipSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): OwnershipAssessment {
  let severity: OwnershipSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): OwnershipAssessment {
  let severity: OwnershipSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionOwnershipResetItem[],
  options: { now?: string } = {}
): BoardDecisionOwnershipResetExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionOwnershipResetReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to keep ownership readable.",
      "Decision handoffs are stretching and may soon blur who is actually accountable.",
      "Decision handoffs are now too long to preserve clear ownership."
    );

    const ownerAssessment = assessDelay(
      item.unresolvedOwners,
      0,
      1,
      "Final ownership is explicit enough to keep the board packet stable.",
      "Final ownership is thinning and may soon need a forced reset.",
      "Final ownership is too ambiguous to trust the current approval chain."
    );

    const approvalConflictAssessment = assessDelay(
      item.approvalConflicts,
      0,
      1,
      "Approval conflicts are low enough to keep the owner-of-record model intact.",
      "Approval conflicts are starting to compete with the intended owner path.",
      "Approval conflicts are now overriding the owner-of-record model."
    );

    const coverageAssessment = assessStrength(
      item.ownershipCoverageScore,
      78,
      62,
      "Ownership coverage is strong enough to back the current decision chain.",
      "Ownership coverage is uneven and will soon need a cleaner owner reset.",
      "Ownership coverage is too weak to support the current approval pattern."
    );

    const clarityAssessment = assessStrength(
      item.decisionClarityScore,
      78,
      62,
      "Decision clarity remains strong enough to keep ownership legible.",
      "Decision clarity is getting patchy and will soon need a simpler owner path.",
      "Decision clarity is too weak to support the current ownership model."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the current ownership chain.",
      "Board confidence is becoming dependent on ad hoc clarification.",
      "Board confidence is too thin to trust the current ownership chain."
    );

    const compositeOwnershipRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.unresolvedOwners * 15 +
          item.approvalConflicts * 12 +
          (100 - item.ownershipCoverageScore) +
          (100 - item.decisionClarityScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      ownerAssessment,
      approvalConflictAssessment,
      coverageAssessment,
      clarityAssessment,
      confidenceAssessment,
      compositeOwnershipRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.ownerAssessment.severity === "HIGH" ||
      item.approvalConflictAssessment.severity === "HIGH" ||
      item.coverageAssessment.severity === "HIGH" ||
      item.clarityAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const resetPriorityLanes = reportItems.filter(
    (item) => item.action === "RESET_OWNER" || item.action === "CLARIFY_APPROVER"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Decision ownership remains explicit enough to keep the current board packet stable."
      : constrainedLanes <= 2
        ? "A few lanes need owner-of-record resets before the next board cycle compounds ambiguity."
        : "Ownership ambiguity is now a shared operating constraint and should be reset across multiple board-facing lanes.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      resetPriorityLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionOwnershipResetItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
