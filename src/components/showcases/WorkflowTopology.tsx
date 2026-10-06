import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Activity, Lock, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  DomainId,
  NodeExecutionStatus,
  NodeType,
  SimulationMode,
  TopologyNode,
} from "./domains/types";

export interface WorkflowTopologyProps {
  nodes: TopologyNode[];
  selectedNodeIndex: number;
  onSelectNode: (index: number) => void;
  simulationMode?: SimulationMode;
  activeToggles?: Record<string, boolean | string>;
  domainId?: DomainId;
  className?: string;
  domainName?: string;
}

const TYPE_LABELS: Record<NodeType, string> = {
  trigger: "TRIGGER INGEST",
  gate: "VALIDATION GATE",
  rule: "ROUTING RULE",
  ledger: "LEDGER COMMIT",
};

export function WorkflowTopology({
  nodes,
  selectedNodeIndex,
  onSelectNode,
  simulationMode = "ojix",
  activeToggles = {},
  domainId,
  className,
}: WorkflowTopologyProps) {
  const [copied, setCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isBaseline = simulationMode === "baseline";

  // Check prefers-reduced-motion client-side safely without SSR hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
    return undefined;
  }, []);

  // Compute execution status and payload for each node dynamically
  const getNodeState = (node: TopologyNode, index: number) => {
    if (isBaseline) {
      return {
        status: "idle" as NodeExecutionStatus,
        statusText: node.baselineStatus,
        isException: false,
        payload: node.payloadSnippet,
      };
    }

    let isException = false;
    let status: NodeExecutionStatus = "verified";
    let statusText = node.ojixStatus;
    let payload = node.payloadSnippet;

    if (domainId === "legal-os") {
      if (activeToggles["legal_toggle_conflict"] === true) {
        if (index === 1) {
          isException = true;
          status = "exception";
          statusText = node.exceptionStatus || "Adverse conflict detected · Escrow locked";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        } else if (index === 3) {
          isException = true;
          status = "exception";
          statusText = node.exceptionStatus || "Disbursement locked ($0.00)";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        }
      }
      if (activeToggles["legal_toggle_protocol"] === "ex_parte" && index === 2) {
        status = "active";
        statusText = "Ex Parte 24-Hr STAT window active";
        payload = JSON.stringify(
          {
            docket_id: "D-2026-8819",
            filing_type: "EX_PARTE_EMERGENCY_TRO",
            statutory_window_hours: 24,
            priority_docket_status: "ACCELERATED_CHANCERY",
            digital_service_confirmed: true,
            routing_latency_ms: 120,
          },
          null,
          2,
        );
      }
    } else if (domainId === "industrial-erp") {
      if (activeToggles["erp_toggle_tooling"] === true) {
        if (index === 1) {
          isException = true;
          status = "exception";
          statusText = node.exceptionStatus || "Wear > 0.0025mm · Spindle lockout active";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        } else if (index === 2) {
          status = "active";
          statusText = "CNC Cell 07 dynamic reroute active";
        }
      }
      if (activeToggles["erp_toggle_match_mode"] === "fast_track" && index === 3) {
        status = "active";
        statusText = "Fast-track 2% tolerance GL post (45ms)";
        payload = JSON.stringify(
          {
            gl_transaction_id: "GL-2026-99214",
            matching_algorithm: "FAST_TRACK_2_PERCENT_TOLERANCE",
            variance_approved_usd: 14.2,
            early_settlement_discount: "2% 10 NET 30",
            posted_latency_ms: 45,
            general_ledger_status: "COMMITTED",
          },
          null,
          2,
        );
      }
    } else if (domainId === "clinical-logistics") {
      if (activeToggles["clinical_toggle_excursion"] === true) {
        if (index === 1) {
          isException = true;
          status = "exception";
          statusText = node.exceptionStatus || "9.2°C thermal spike · Quarantine protocol active";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        } else if (index === 3) {
          isException = true;
          status = "exception";
          statusText =
            node.exceptionStatus || "Quarantine hold rejected · Phlebotomy redraw triggered";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        }
      }
      if (activeToggles["clinical_toggle_route_mode"] === "stat_emergency" && index === 2) {
        status = "active";
        statusText = "STAT solo priority courier dispatch";
        payload = JSON.stringify(
          {
            courier_dispatch_id: "STAT-SOLO-9912",
            transport_mode: "DEDICATED_SOLO_PRIORITY",
            sla_target_minutes: 20,
            active_eta_minutes: 18,
            chain_of_custody_verified: true,
            cold_chain_continuous_log: "4.1°C_STABLE",
          },
          null,
          2,
        );
      }
    } else if (domainId === "supply-chain-nexus") {
      if (activeToggles["supply_toggle_carrier_lapse"] === true) {
        if (index === 1) {
          isException = true;
          status = "exception";
          statusText = node.exceptionStatus || "DOT authority lapsed · Disqualified from tender";
          payload = node.exceptionPayloadSnippet || node.payloadSnippet;
        } else if (index === 2) {
          status = "active";
          statusText = "Tier-2 waterfall cascade triggered";
        }
      }
      if (activeToggles["supply_toggle_audit_protocol"] === "manual" && index === 3) {
        status = "active";
        statusText = "Manual claim detected · Geofence GPS refutes detention surcharge";
        payload = JSON.stringify(
          {
            wms_ledger_id: "WMS-INV-88412",
            allocated_wms_stock: 42,
            available_to_promise: 184,
            dwell_audit_protocol: "MANUAL_DETENTION_CLAIM_AUDIT",
            carrier_claim_dwell_hours: 3.5,
            geofence_rfid_actual_hours: 0.8,
            phantom_detention_surcharge_saved: "$175.00",
            discrepancy_resolved: true,
            inventory_commit_latency: "22ms",
            zero_phantom_inventory: true,
          },
          null,
          2,
        );
      }
    }

    return { status, statusText, isException, payload };
  };

  const safeIndex = Math.min(Math.max(0, selectedNodeIndex), Math.max(0, nodes.length - 1));
  const activeNode = nodes[safeIndex] || nodes[0];
  const activeNodeState = activeNode ? getNodeState(activeNode, safeIndex) : null;
  const displayPayload = activeNodeState?.payload || "{}";

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(displayPayload);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      onSelectNode((index + 1) % nodes.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      onSelectNode((index - 1 + nodes.length) % nodes.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectNode(index);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 4-Stage Topology Pipeline Nodes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
            Engineered Pipeline Topology:
          </span>
          <span className="font-mono text-[11px] text-[#4B5563]">
            Click node to inspect live JSON contract payload
          </span>
        </div>

        {/* Responsive Grid with Linear Desktop Connectors */}
        <div
          aria-label="Workflow Topology Stages"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 relative"
        >
          {nodes.map((node, idx) => {
            const isSelected = safeIndex === idx;
            const nodeState = getNodeState(node, idx);
            const isUpstreamException = nodeState.isException;

            return (
              <div key={node.id || node.step} className="relative flex flex-col">
                <button
                  type="button"
                  id={`topology-node-${idx}`}
                  aria-pressed={isSelected}
                  aria-controls="payload-inspector-panel"
                  onClick={() => onSelectNode(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  tabIndex={0}
                  className={cn(
                    "group relative flex flex-col flex-1 text-left rounded-lg border p-4 transition-all duration-150 press-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:ring-offset-2",
                    isSelected
                      ? "border-[#C85A17] bg-[#FDF4ED] shadow-sm ring-1 ring-[#C85A17]"
                      : nodeState.isException
                        ? "border-[#DC2626] bg-[#FEF2F2]/60 hover:border-[#DC2626]"
                        : "border-[#E5E0D8] bg-white hover:border-[#0B1320] shadow-2xs",
                  )}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span
                      className={cn(
                        "font-bold",
                        isSelected
                          ? "text-[#C85A17]"
                          : nodeState.isException
                            ? "text-[#DC2626]"
                            : "text-[#4B5563]",
                      )}
                    >
                      STAGE {node.step}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#4B5563] uppercase">
                      {TYPE_LABELS[node.type]}
                    </span>
                  </div>

                  {/* Node Name */}
                  <h4 className="mt-2 font-sans text-sm font-bold text-[#0B1320] leading-snug">
                    {node.name}
                  </h4>

                  {/* Node Status Line */}
                  <div className="mt-3 flex items-start gap-1.5 font-mono text-[11px] leading-snug">
                    {nodeState.isException ? (
                      <>
                        <AlertTriangle className="size-3.5 shrink-0 mt-0.5 text-[#DC2626]" />
                        <span className="text-[#DC2626] font-semibold">{nodeState.statusText}</span>
                      </>
                    ) : nodeState.status === "active" ? (
                      <>
                        <Activity className="size-3.5 shrink-0 mt-0.5 text-[#C85A17] animate-pulse" />
                        <span className="text-[#C85A17] font-semibold">{nodeState.statusText}</span>
                      </>
                    ) : isBaseline ? (
                      <>
                        <Lock className="size-3.5 shrink-0 mt-0.5 text-[#4B5563]" />
                        <span className="text-[#4B5563]">{nodeState.statusText}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-3.5 shrink-0 mt-0.5 text-[#059669]" />
                        <span className="text-[#059669]">{nodeState.statusText}</span>
                      </>
                    )}
                  </div>

                  {/* Latency & Protocol Telemetry */}
                  {node.telemetry && (
                    <div className="mt-3 pt-2 border-t border-[#E5E0D8]/60 flex items-center justify-between font-mono text-[10px] text-[#4B5563]">
                      <span>{node.telemetry.protocol}</span>
                      <span className="font-bold tabular-nums">
                        {isBaseline ? node.latency.baseline : node.telemetry.latency}
                      </span>
                    </div>
                  )}

                  {/* Bottom selection indicator accent */}
                  {isSelected && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#C85A17] rounded-b-lg" />
                  )}
                </button>

                {/* Mobile downward connector */}
                {idx < nodes.length - 1 && (
                  <div className="flex justify-center py-1 sm:hidden" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      className={cn(
                        "w-4 h-4",
                        isUpstreamException ? "text-[#DC2626]" : "text-[#C4BCB0]",
                      )}
                    >
                      <line
                        x1="8"
                        y1="0"
                        x2="8"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray={isUpstreamException ? "2 2" : undefined}
                      />
                      <polygon points="5,11 8,15 11,11" fill="currentColor" />
                    </svg>
                  </div>
                )}

                {/* Desktop Directed SVG Connector Bridge (lg: only) */}
                {idx < nodes.length - 1 && (
                  <div
                    className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10 w-6"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 16"
                      className="w-6 h-4 overflow-visible"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {isUpstreamException ? (
                        <>
                          {/* Dashed warning rule when upstream stage has exception status */}
                          <line
                            x1="0"
                            y1="8"
                            x2="17"
                            y2="8"
                            stroke="#DC2626"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />
                          {/* Directional Arrowhead in warning red */}
                          <polygon points="17,5 23,8 17,11" fill="#DC2626" />
                        </>
                      ) : (
                        <>
                          {/* Baseline Hairline Rule */}
                          <line x1="0" y1="8" x2="17" y2="8" stroke="#C4BCB0" strokeWidth="1.5" />
                          {/* Directional Arrowhead */}
                          <polygon points="17,5 23,8 17,11" fill="#C85A17" />
                          {/* Animated Traveling Pulse Flow Circle (honoring prefers-reduced-motion) */}
                          {!isBaseline && !reducedMotion && (
                            <circle
                              cx="0"
                              cy="8"
                              r="2.5"
                              fill="#C85A17"
                              className="animate-connector-flow motion-reduce:hidden"
                            >
                              <animate
                                attributeName="cx"
                                values="0;17"
                                dur="1.6s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.3;1;0.3"
                                dur="1.6s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                        </>
                      )}
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Payload Inspector Panel */}
      <div
        id="payload-inspector-panel"
        role="region"
        aria-labelledby={`topology-node-${safeIndex}`}
        className="rounded-lg border border-[#0B1320] bg-[#0B1320] shadow-md overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] bg-[#121824] px-4 py-2.5">
          <div className="flex items-center gap-2">
            {/* Terminal Window Dots */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#EF4444]" />
              <span className="size-2.5 rounded-full bg-[#F59E0B]" />
              <span className="size-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span className="ml-2 font-mono text-xs font-bold text-white tracking-wide">
              STAGE 0{safeIndex + 1} OF 04 //{" "}
              {activeNode ? TYPE_LABELS[activeNode.type] : "PAYLOAD"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                activeNodeState?.isException
                  ? "bg-[#DC2626]/20 text-[#EF4444] border border-[#DC2626]/40"
                  : "bg-[#059669]/20 text-[#34D399] border border-[#059669]/40",
              )}
            >
              {activeNodeState?.isException ? "INTERLOCK_ACTIVE" : "SCHEMA_VALID [RFC-8259]"}
            </span>

            <span className="hidden sm:inline font-mono text-[10px] text-white/60">
              LATENCY: {isBaseline ? activeNode?.latency.baseline : activeNode?.latency.ojix}
            </span>

            {/* Tactile Copy Button - min-h-[44px] for WCAG 2.5.5 touch target compliance */}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded px-3 py-2 font-mono text-[11px] font-bold text-white/80 bg-white/10 hover:bg-white/20 active:scale-[0.98] transition-all press-spring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C85A17]"
              aria-label="Copy JSON contract payload to clipboard"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-[#34D399]" />
                  <span className="text-[#34D399]">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>COPY JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Block with Guaranteed Responsive Overflow Safeguard */}
        <div className="overflow-x-auto max-w-full p-4 bg-[#0B1320]">
          <pre className="font-mono text-xs text-[#FAF8F5] leading-relaxed whitespace-pre selection:bg-[#C85A17] selection:text-white">
            <code>{displayPayload}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default WorkflowTopology;
