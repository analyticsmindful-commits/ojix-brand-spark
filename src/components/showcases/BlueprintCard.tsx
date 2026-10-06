import React, { useState } from "react";
import { ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DomainBlueprintConfig, SimulationMode } from "./domains/types";
import { MetricDashboard } from "./MetricDashboard";
import { WorkflowTopology } from "./WorkflowTopology";

export interface BlueprintCardProps {
  domain: DomainBlueprintConfig;
  selectedNodeIndex?: number;
  onSelectNode?: (index: number) => void;
  simulationMode?: SimulationMode;
  onSimulationModeChange?: (mode: SimulationMode) => void;
  activeToggles?: Record<string, boolean | string>;
  onToggleChange?: (toggleId: string, value: boolean | string) => void;
  className?: string;
}

export function BlueprintCard({
  domain,
  selectedNodeIndex: externalSelectedNodeIndex,
  onSelectNode: externalOnSelectNode,
  simulationMode: externalSimulationMode,
  onSimulationModeChange,
  activeToggles: externalActiveToggles,
  onToggleChange,
  className,
}: BlueprintCardProps) {
  // Support both controlled and uncontrolled states
  const [internalSelectedNodeIndex, setInternalSelectedNodeIndex] = useState(0);
  const [internalSimulationMode, setInternalSimulationMode] = useState<SimulationMode>("ojix");
  const [internalActiveToggles, setInternalActiveToggles] = useState<
    Record<string, boolean | string>
  >({});

  const selectedNodeIndex = externalSelectedNodeIndex ?? internalSelectedNodeIndex;
  const onSelectNode = externalOnSelectNode ?? setInternalSelectedNodeIndex;

  const simulationMode = externalSimulationMode ?? internalSimulationMode;
  const setSimulationMode = (mode: SimulationMode) => {
    if (onSimulationModeChange) {
      onSimulationModeChange(mode);
    } else {
      setInternalSimulationMode(mode);
    }
  };

  const activeToggles = externalActiveToggles ?? internalActiveToggles;
  const handleToggle = (toggleId: string, value: boolean | string) => {
    if (onToggleChange) {
      onToggleChange(toggleId, value);
    } else {
      setInternalActiveToggles((prev) => ({
        ...prev,
        [toggleId]: value,
      }));
    }
  };

  const Icon = domain.icon;

  return (
    <div
      className={cn(
        "rounded-xl border border-[#0B1320] bg-white shadow-xl shadow-[#0B1320]/5 overflow-hidden",
        className,
      )}
    >
      {/* Telemetry Header */}
      <div className="border-b border-[#E5E0D8] bg-[#FAF8F5] p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
              <Icon className="size-4 shrink-0" />
              <span>{domain.category}</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-black text-[#0B1320] sm:text-3xl">
              {domain.name}: {domain.tagline}
            </h3>
            <p className="mt-1 font-mono text-xs text-[#4B5563]">
              TARGET AUDIENCE: {domain.targetAudience}
            </p>
          </div>

          <a
            href="#extraction"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded bg-[#C85A17] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#B34E13] active:scale-[0.98] self-start lg:self-auto"
          >
            <span>Extract This Workflow</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Mode Switch & Interactive State Toggles Control Bar */}
      <div className="border-b border-[#E5E0D8] bg-[#FAF8F5]/60 p-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Segmented Mode Switch */}
          <div className="flex flex-wrap items-center gap-2 max-w-full">
            <span
              id="architecture-mode-label"
              className="font-mono text-[11px] font-bold uppercase text-[#4B5563]"
            >
              Architecture Mode:
            </span>
            <div
              role="radiogroup"
              aria-labelledby="architecture-mode-label"
              className="inline-flex flex-wrap rounded-lg border border-[#E5E0D8] bg-white p-1 shadow-2xs gap-1 sm:gap-0 max-w-full"
            >
              <button
                type="button"
                role="radio"
                aria-checked={simulationMode === "ojix"}
                onClick={() => setSimulationMode("ojix")}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center rounded-md px-3 py-2 font-mono text-xs font-bold transition-all press-spring w-full sm:w-auto",
                  simulationMode === "ojix"
                    ? "bg-[#0B1320] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#0B1320]",
                )}
              >
                ● OJIX Engineered Core
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={simulationMode === "baseline"}
                onClick={() => setSimulationMode("baseline")}
                className={cn(
                  "inline-flex min-h-[44px] items-center justify-center rounded-md px-3 py-2 font-mono text-xs font-bold transition-all press-spring w-full sm:w-auto",
                  simulationMode === "baseline"
                    ? "bg-[#DC2626] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#DC2626]",
                )}
              >
                ⚠ Fragile Manual Baseline
              </button>
            </div>
          </div>

          {/* Domain-Specific Operational Toggles */}
          <div className="flex flex-wrap items-center gap-4">
            {domain.stateToggles.map((toggle) => {
              const currentVal =
                activeToggles[toggle.id] !== undefined
                  ? activeToggles[toggle.id]
                  : toggle.defaultValue;

              if (toggle.type === "switch") {
                const isChecked = Boolean(currentVal);
                return (
                  <div
                    key={toggle.id}
                    className="flex max-w-full w-full sm:w-auto items-center gap-2.5"
                  >
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isChecked}
                      aria-label={toggle.label}
                      onClick={() => handleToggle(toggle.id, !isChecked)}
                      className={cn(
                        "group relative inline-flex h-6 min-h-[44px] min-w-[44px] items-center justify-center shrink-0 cursor-pointer py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:ring-offset-2",
                      )}
                    >
                      <span
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                          isChecked ? "bg-[#DC2626]" : "bg-[#D1D5DB]",
                        )}
                      >
                        <span
                          className={cn(
                            "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                            isChecked ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </span>
                    </button>
                    <div className="min-w-0 flex-1">
                      <span className="block font-sans text-xs font-bold text-[#0B1320] leading-none">
                        {toggle.label}
                      </span>
                      <span className="block font-mono text-[10px] text-[#4B5563] leading-tight break-words sm:truncate">
                        {toggle.impactSummary}
                      </span>
                    </div>
                  </div>
                );
              }

              if (toggle.type === "segmented" && toggle.options) {
                const labelId = `toggle-label-${toggle.id}`;
                return (
                  <div
                    key={toggle.id}
                    className="flex max-w-full w-full sm:w-auto items-center gap-2"
                  >
                    <span
                      id={labelId}
                      className="hidden sm:inline font-mono text-[11px] font-bold text-[#4B5563]"
                    >
                      {toggle.label}:
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby={labelId}
                      aria-label={toggle.label}
                      className="inline-flex flex-wrap rounded-lg border border-[#E5E0D8] bg-white p-0.5 shadow-2xs max-w-full"
                    >
                      {toggle.options.map((opt) => {
                        const isOptActive = currentVal === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            role="radio"
                            aria-checked={isOptActive}
                            onClick={() => handleToggle(toggle.id, opt.value)}
                            className={cn(
                              "inline-flex min-h-[44px] items-center justify-center rounded-md px-3 py-2 font-mono text-xs font-bold transition-all press-spring",
                              isOptActive
                                ? "bg-[#C85A17] text-white shadow-xs"
                                : "text-[#4B5563] hover:text-[#0B1320]",
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Metric Dashboard */}
      <MetricDashboard
        metrics={domain.metrics}
        simulationMode={simulationMode}
        domainId={domain.id}
        activeToggles={activeToggles}
      />

      {/* Forensic Comparison: Bottlenecks vs Engineered Solutions */}
      <div className="grid grid-cols-1 border-t border-[#E5E0D8] lg:grid-cols-2">
        {/* Fragile Reality */}
        <div className="p-6 lg:p-8 border-b border-[#E5E0D8] lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            <ShieldAlert className="size-4 shrink-0" />
            <span>Fragile Manual Baseline</span>
          </div>
          <ul className="mt-4 space-y-3">
            {domain.operationalBottlenecks.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#DC2626]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Engineered Solution */}
        <div className="p-6 lg:p-8 bg-[#FAF8F5]/50">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#059669]">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>OJIX Proprietary Operating System</span>
          </div>
          <ul className="mt-4 space-y-3">
            {domain.engineeredSolutions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0B1320]">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#059669]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual Directed Topology Graph & Payload Inspector */}
      <div className="border-t border-[#E5E0D8] bg-[#FAF8F5] p-6 lg:p-8">
        <WorkflowTopology
          nodes={domain.nodes}
          selectedNodeIndex={selectedNodeIndex}
          onSelectNode={onSelectNode}
          simulationMode={simulationMode}
          activeToggles={activeToggles}
          domainId={domain.id}
          domainName={domain.name}
        />
      </div>
    </div>
  );
}

export default BlueprintCard;
