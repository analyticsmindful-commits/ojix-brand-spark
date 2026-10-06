import type React from "react";

export type DomainId = "legal-os" | "industrial-erp" | "clinical-logistics" | "supply-chain-nexus";

export type DomainIdAlias = DomainId | "enterprise-erp";

/** Backward compatibility alias for DomainKey */
export type DomainKey = DomainIdAlias;

export type SimulationMode = "ojix" | "baseline";

export type NodeType = "trigger" | "gate" | "rule" | "ledger";

export type NodeExecutionStatus = "idle" | "active" | "verified" | "exception";

export interface TopologyNode {
  id: string;
  step: string; // "01", "02", "03", "04"
  name: string;
  type: NodeType;
  baselineStatus: string;
  ojixStatus: string;
  exceptionStatus?: string;
  latency: {
    baseline: string;
    ojix: string;
  };
  payloadSnippet: string; // Valid JSON string
  exceptionPayloadSnippet?: string; // Valid JSON string
  description: string;
  telemetry?: {
    latency: string;
    protocol: string;
  };
}

export interface MetricDefinition {
  label: string;
  unit: string;
  baselineValue: string;
  ojixValue: string;
  deltaText: string;
  subtext: string;
  isPositive: boolean;
}

export interface DomainMetricsConfig {
  cycleReductionPercent: number; // e.g. 93
  baselineTurnaround: string; // e.g. "4.2 days"
  ojixTurnaround: string; // e.g. "18 mins"
  monthlyMarginLiftBase: number; // e.g. 32400
  baselineMonthlyLeak: number; // e.g. 18400
  complianceStandard: string; // e.g. "100% Bar Compliant"
  baselineAuditRisk: string; // e.g. "0% Tracked (Bar Liability)"
  architectureMode: string; // e.g. "Event-Sourced ACID"
  baselineArchitecture: string; // e.g. "Ad-Hoc Spreadsheets"
}

export interface StateToggleOption {
  value: string;
  label: string;
}

export interface StateToggle {
  id: string;
  label: string;
  description: string;
  type: "switch" | "segmented";
  defaultValue: boolean | string;
  options?: StateToggleOption[];
  impactSummary: string;
  mutatedNodeId: string;
}

export interface DomainBlueprintConfig {
  id: DomainId;
  name: string;
  category: string;
  tagline: string;
  targetAudience: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: DomainMetricsConfig;
  operationalBottlenecks: string[];
  engineeredSolutions: string[];
  nodes: TopologyNode[];
  stateToggles: StateToggle[];
}
