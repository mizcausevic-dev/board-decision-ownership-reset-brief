export function formatSummary(
  summary: {
    items: number;
    constrainedLanes: number;
    resetPriorityLanes: number;
    averageBoardConfidence: number;
    valueAtStakeMillions: number;
    leadingMessage: string;
  },
  title = "Board Decision Ownership Reset Brief"
) {
  return [
    title,
    `Lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Reset-priority lanes: ${summary.resetPriorityLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
