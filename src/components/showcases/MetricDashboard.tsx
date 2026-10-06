import React from "react";
import { cn } from "@/lib/utils";
import type { DomainId, DomainMetricsConfig, SimulationMode } from "./domains/types";

export interface MetricDashboardProps {
  metrics: DomainMetricsConfig;
  simulationMode: SimulationMode;
  domainId?: DomainId;
  activeToggles?: Record<string, boolean | string>;
  className?: string;
}

export function MetricDashboard({
  metrics,
  simulationMode,
  domainId,
  activeToggles = {},
  className,
}: MetricDashboardProps) {
  const isBaseline = simulationMode === "baseline";

  // Dynamic calculations based on simulation mode and operational toggles
  let cycleHeadline = `${metrics.cycleReductionPercent}% Faster`;
  let cycleSubtext = `${metrics.ojixTurnaround} vs ${metrics.baselineTurnaround}`;
  let cycleColor = "text-[#059669]";

  let marginHeadline = `+$${(metrics.monthlyMarginLiftBase / 1000).toFixed(1)}K / mo`;
  let marginSubtext = "Direct gross recovery";
  let marginColor = "text-[#C85A17]";

  let complianceHeadline = metrics.complianceStandard;
  let complianceSubtext = "Audit trail guaranteed";
  let complianceColor = "text-[#0B1320]";

  let archHeadline = metrics.architectureMode;
  let archSubtext = "Dedicated relational DB";

  if (isBaseline) {
    cycleHeadline = "+420% Lag";
    cycleSubtext = `${metrics.baselineTurnaround} backlog`;
    cycleColor = "text-[#DC2626]";

    marginHeadline = `-$${(metrics.baselineMonthlyLeak / 1000).toFixed(1)}K / mo`;
    marginSubtext = "Unmitigated monthly leakage";
    marginColor = "text-[#DC2626]";

    complianceHeadline = "0% Tracked";
    complianceSubtext = metrics.baselineAuditRisk;
    complianceColor = "text-[#DC2626]";

    archHeadline = metrics.baselineArchitecture;
    archSubtext = "Manual unlinked files";
  } else {
    // Check domain toggles for Legal OS
    if (domainId === "legal-os") {
      if (activeToggles["legal_toggle_conflict"] === true) {
        cycleHeadline = "18 mins (Freeze active)";
        cycleSubtext = "Adverse party freeze";
        complianceHeadline = "ETHICAL WALL PROTOCOL [Rule 1.15]";
        complianceColor = "text-[#DC2626]";
      }
      if (activeToggles["legal_toggle_protocol"] === "ex_parte") {
        cycleHeadline = "4 mins";
        cycleSubtext = "24-hr ex parte statutory window";
        marginHeadline = "+$38.9K / mo";
        complianceHeadline = "EX PARTE EMERGENCY COMPLIANT";
      }
    }

    // Check domain toggles for Industrial ERP
    if (domainId === "industrial-erp") {
      if (activeToggles["erp_toggle_tooling"] === true) {
        cycleHeadline = "14 mins (Auto-rerouted)";
        cycleSubtext = "Spindle lockout triggered";
        complianceHeadline = "ISO 9001 NON-CONFORMANCE AUTO-LOGGED";
        complianceColor = "text-[#DC2626]";
      }
      if (activeToggles["erp_toggle_match_mode"] === "fast_track") {
        cycleHeadline = "45 secs";
        cycleSubtext = "Fast-track 2% tolerance match";
        marginHeadline = "+$51.2K / mo";
        marginSubtext = "2/10 net 30 early discount captured";
        complianceHeadline = "SOX & ISO 9001 COMPLIANT";
      }
    }

    // Check domain toggles for Clinical Logistics
    if (domainId === "clinical-logistics") {
      if (activeToggles["clinical_toggle_excursion"] === true) {
        cycleHeadline = "42 mins (Quarantine)";
        cycleSubtext = "Quarantine protocol enforced";
        complianceHeadline = "CAP EXCURSION PROTOCOL 14.2 ENFORCED";
        complianceColor = "text-[#DC2626]";
      }
      if (activeToggles["clinical_toggle_route_mode"] === "stat_emergency") {
        cycleHeadline = "18 mins";
        cycleSubtext = "STAT solo emergency corridor";
        marginHeadline = "+$33.1K / mo";
        marginSubtext = "STAT premium captured";
        complianceHeadline = "CRITICAL STAT SLA VERIFIED";
      }
    }

    // Check domain toggles for Supply Chain Nexus
    if (domainId === "supply-chain-nexus") {
      if (activeToggles["supply_toggle_carrier_lapse"] === true) {
        cycleHeadline = "11 mins (Tier-2 dispatch)";
        cycleSubtext = "Waterfall backup escalation";
        complianceHeadline = "FMCSA SAFETY REVOCATION ENFORCED";
        complianceColor = "text-[#DC2626]";
      }
      if (activeToggles["supply_toggle_audit_protocol"] === "manual") {
        complianceHeadline = "GEOFENCE TELEMETRY VALIDATED";
      }
    }
  }

  return (
    <div
      data-testid="metric-dashboard"
      className={cn("grid grid-cols-2 gap-px bg-[#E5E0D8] sm:grid-cols-4", className)}
    >
      {/* Metric 1: Cycle Latency */}
      <div className="bg-white p-3 sm:p-4">
        <span className="font-mono text-[10px] uppercase text-[#4B5563]">Cycle Latency</span>
        <div
          className={cn("mt-1 font-display text-lg sm:text-xl font-black tabular-nums", cycleColor)}
        >
          {cycleHeadline}
        </div>
        <span className="mt-0.5 block font-mono text-[10px] text-[#4B5563] truncate">
          {cycleSubtext}
        </span>
      </div>

      {/* Metric 2: Margin Delta */}
      <div className="bg-white p-3 sm:p-4">
        <span className="font-mono text-[10px] uppercase text-[#4B5563]">Margin Delta</span>
        <div
          className={cn(
            "mt-1 font-display text-lg sm:text-xl font-black tabular-nums",
            marginColor,
          )}
        >
          {marginHeadline}
        </div>
        <span className="mt-0.5 block font-mono text-[10px] text-[#4B5563] truncate">
          {marginSubtext}
        </span>
      </div>

      {/* Metric 3: Compliance Standard */}
      <div className="bg-white p-3 sm:p-4">
        <span className="font-mono text-[10px] uppercase text-[#4B5563]">Compliance Standard</span>
        <div
          className={cn(
            "mt-1 font-display text-lg sm:text-xl font-black tabular-nums",
            complianceColor,
          )}
        >
          {complianceHeadline}
        </div>
        <span className="mt-0.5 block font-mono text-[10px] text-[#4B5563] truncate">
          {complianceSubtext}
        </span>
      </div>

      {/* Metric 4: Architecture Mode */}
      <div className="bg-white p-3 sm:p-4">
        <span className="font-mono text-[10px] uppercase text-[#4B5563]">Architecture Mode</span>
        <div className="mt-1 font-display text-lg sm:text-xl font-black tabular-nums text-[#0B1320]">
          {archHeadline}
        </div>
        <span className="mt-0.5 block font-mono text-[10px] text-[#4B5563] truncate">
          {archSubtext}
        </span>
      </div>
    </div>
  );
}

export default MetricDashboard;
