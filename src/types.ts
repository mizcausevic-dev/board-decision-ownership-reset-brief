export type DecisionOwnershipTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type OwnershipResetAction = "RESET_OWNER" | "COLLAPSE_HANDOFF" | "CLARIFY_APPROVER" | "PAUSE_SCOPE";

export type OwnershipSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionOwnershipResetItem {
  id: string;
  lane: string;
  track: DecisionOwnershipTrack;
  action: OwnershipResetAction;
  ownershipTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  resetHeadline: string;
  ownershipSignal: string;
  ownerOfRecord: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  unresolvedOwners: number;
  approvalConflicts: number;
  ownershipCoverageScore: number;
  decisionClarityScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface OwnershipAssessment {
  severity: OwnershipSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionOwnershipResetReportItem extends BoardDecisionOwnershipResetItem {
  handoffAssessment: OwnershipAssessment;
  ownerAssessment: OwnershipAssessment;
  approvalConflictAssessment: OwnershipAssessment;
  coverageAssessment: OwnershipAssessment;
  clarityAssessment: OwnershipAssessment;
  confidenceAssessment: OwnershipAssessment;
  compositeOwnershipRiskScore: number;
}

export interface BoardDecisionOwnershipResetSummary {
  items: number;
  constrainedLanes: number;
  resetPriorityLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionOwnershipResetExport {
  generatedAt: string;
  summary: BoardDecisionOwnershipResetSummary;
  items: BoardDecisionOwnershipResetReportItem[];
}

export interface BoardDecisionOwnershipResetPayload {
  report: BoardDecisionOwnershipResetExport;
  ownershipLane: ReturnType<typeof import("./services/verticalBriefService.js").ownershipLane>;
  resetLedger: ReturnType<typeof import("./services/verticalBriefService.js").resetLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionOwnershipResetItem[];
}
