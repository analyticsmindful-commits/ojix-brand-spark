import React, { useState } from "react";
import {
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Database,
  Workflow,
  FileSpreadsheet,
  Activity,
  AlertTriangle,
  Scale,
  Building2,
  Truck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DomainId = "legal-os" | "enterprise-erp" | "clinical-logistics" | "supply-chain-nexus";

export interface HeroProps {
  /** Custom title override for specialized landings or tests */
  title?: string;
  /** Initial domain selected in the blueprint workbench */
  initialDomainId?: DomainId;
  /** Primary CTA click handler */
  onScheduleExtraction?: () => void;
  /** Secondary CTA click handler */
  onInspectBlueprints?: () => void;
  /** Custom container class */
  className?: string;
}

interface DomainBlueprint {
  id: DomainId;
  name: string;
  badge: string;
  targetAudience: string;
  headline: string;
  icon: React.ComponentType<{ className?: string }>;
  fragileReality: {
    tool: string;
    leak: string;
    risk: string;
  };
  metrics: {
    cycleTime: { baseline: string; ojix: string; delta: string };
    marginDelta: string;
    auditCompliance: string;
  };
  nodes: Array<{
    id: string;
    step: string;
    name: string;
    type: "trigger" | "gate" | "rule" | "ledger";
    baselineStatus: string;
    ojixStatus: string;
    payloadSnippet: string;
  }>;
}

const DOMAIN_BLUEPRINTS: Record<DomainId, DomainBlueprint> = {
  "legal-os": {
    id: "legal-os",
    name: "Legal OS",
    badge: "LITIGATION & PRACTICE MANAGEMENT",
    targetAudience: "Multi-Partner Law Firms & Complex Litigation Practices",
    headline: "Automated Court Docketing, Trust Accounting & Matter Telemetry",
    icon: Scale,
    fragileReality: {
      tool: "14 unlinked Excel workbooks & WhatsApp partner chats",
      leak: "18% unbilled billable hours lost during partner matter handoffs",
      risk: "Zero cryptographic audit trail for IOLTA trust disbursements",
    },
    metrics: {
      cycleTime: { baseline: "4.2 days", ojix: "18 mins", delta: "-93%" },
      marginDelta: "+$32.4K / mo",
      auditCompliance: "100% Bar Compliant",
    },
    nodes: [
      {
        id: "l1",
        step: "01. INTAKE",
        name: "Court Docket Ingestion",
        type: "trigger",
        baselineStatus: "Manual clerk scanning · 6hr lag",
        ojixStatus: "Direct e-filing API · Webhook latency 14ms",
        payloadSnippet:
          '{\n  "docket_id": "2026-CV-88219",\n  "court": "Superior Court Div 4",\n  "filing_type": "Motion for Summary Judgment",\n  "status": "INGESTED_VERIFIED"\n}',
      },
      {
        id: "l2",
        step: "02. GATE",
        name: "Conflict & Party Validation",
        type: "gate",
        baselineStatus: "Memory & sticky notes · High liability",
        ojixStatus: "Relational entity graph check · 0 false-negatives",
        payloadSnippet:
          '{\n  "conflict_check": "PASS",\n  "entity_nodes_evaluated": 1420,\n  "adverse_parties_detected": 0,\n  "audit_hash": "0x8f2a...c391"\n}',
      },
      {
        id: "l3",
        step: "03. RULE",
        name: "Statutory Deadline Calculator",
        type: "rule",
        baselineStatus: "Manual desk calendar entry",
        ojixStatus: "Jurisdiction rule engine · Automated calendaring",
        payloadSnippet:
          '{\n  "rule_jurisdiction": "CAL_CIV_PRO_437c",\n  "response_due_date": "2026-11-14T17:00:00Z",\n  "attorney_calendar_synced": true\n}',
      },
      {
        id: "l4",
        step: "04. LEDGER",
        name: "IOLTA Trust Ledger Sync",
        type: "ledger",
        baselineStatus: "End-of-month manual reconciliation",
        ojixStatus: "Real-time double-entry escrow post",
        payloadSnippet:
          '{\n  "matter_id": "MAT-9041",\n  "trust_disbursement": "$4,500.00",\n  "reconciled_balance": "$48,250.00",\n  "audit_trail": "IMMUTABLE_LOGGED"\n}',
      },
    ],
  },
  "enterprise-erp": {
    id: "enterprise-erp",
    name: "Industrial ERP",
    badge: "DISCRETE MANUFACTURING & FIELD OPS",
    targetAudience: "Industrial Mid-Market & Multi-Facility Manufacturing",
    headline: "Shop-Floor Dispatch, Subcontractor Ledgers & BOM Costing",
    icon: Building2,
    fragileReality: {
      tool: "Printed job traveler sheets & personal WhatsApp supervisor groups",
      leak: "7.4% scrap rate from unverified change orders and delayed drawings",
      risk: "Silent double-billing from subcontractor PO mismatches",
    },
    metrics: {
      cycleTime: { baseline: "48 hrs", ojix: "3 mins", delta: "-98%" },
      marginDelta: "+$46.8K / mo",
      auditCompliance: "ISO 9001 Traceable",
    },
    nodes: [
      {
        id: "e1",
        step: "01. INTAKE",
        name: "Work Order Release",
        type: "trigger",
        baselineStatus: "Paper printed clipboard · Unmonitored",
        ojixStatus: "ERP job queue event · Barcode scan trigger",
        payloadSnippet:
          '{\n  "wo_id": "WO-2026-9042",\n  "facility_id": "PLANT-DETROIT-02",\n  "batch_quantity": 480,\n  "bom_rev": "REV_D_APPROVED"\n}',
      },
      {
        id: "e2",
        step: "02. GATE",
        name: "Raw Material & Tooling Gate",
        type: "gate",
        baselineStatus: "Visual check · Frequent stockout stalls",
        ojixStatus: "Automated warehouse RFID reserve check",
        payloadSnippet:
          '{\n  "alloy_spec": "TITANIUM-6AL-4V",\n  "heat_lot_verified": true,\n  "tooling_wear_tolerance": "0.0018mm (PASS)",\n  "allocated": true\n}',
      },
      {
        id: "e3",
        step: "03. RULE",
        name: "CNC Cell Dynamic Routing",
        type: "rule",
        baselineStatus: "Whiteboard schedule · Operator phone calls",
        ojixStatus: "Machine telemetry load balancer",
        payloadSnippet:
          '{\n  "target_cell": "CNC-5AXIS-04",\n  "feed_rate_profile": "OPT_CYCLE_48s",\n  "spindle_hours_remaining": 342,\n  "dispatch_state": "ACTIVE"\n}',
      },
      {
        id: "e4",
        step: "04. LEDGER",
        name: "Subcontractor PO 3-Way Match",
        type: "ledger",
        baselineStatus: "Accounts payable PDF email backlog",
        ojixStatus: "Instant ERP accounts payable ledger post",
        payloadSnippet:
          '{\n  "po_match_result": "EXACT_TOLERANCE_0_00",\n  "invoice_authorized": "$38,400.00",\n  "general_ledger_posted": true,\n  "reconciliation_time": "120ms"\n}',
      },
    ],
  },
  "clinical-logistics": {
    id: "clinical-logistics",
    name: "Clinical Logistics",
    badge: "COLD-CHAIN & SPECIMEN ROUTING",
    targetAudience: "Regional Diagnostic Networks & Pathology Laboratories",
    headline: "Chain-of-Custody Tracking, Temperature Telemetry & Courier SLA",
    icon: Activity,
    fragileReality: {
      tool: "Paper courier manifests & WhatsApp dispatcher group chats",
      leak: "12% specimen redraw rate due to unmonitored cold-chain excursions",
      risk: "Severe HIPAA chain-of-custody violations and lost accessioning tags",
    },
    metrics: {
      cycleTime: { baseline: "6.5 hrs", ojix: "42 mins", delta: "-89%" },
      marginDelta: "+$28.5K / mo",
      auditCompliance: "CAP / CLIA Compliant",
    },
    nodes: [
      {
        id: "c1",
        step: "01. INTAKE",
        name: "Specimen Pickup Dispatch",
        type: "trigger",
        baselineStatus: "Clinic phone call to courier personal mobile",
        ojixStatus: "LIMS accessioning barcode generation",
        payloadSnippet:
          '{\n  "accession_id": "SPEC-2026-X810",\n  "specimen_type": "WHOLE_BLOOD_EDTA",\n  "storage_protocol": "COLD_CHAIN_4C",\n  "clinic_id": "CLINIC-OAK-09"\n}',
      },
      {
        id: "c2",
        step: "02. GATE",
        name: "Thermal Excursion Guard",
        type: "gate",
        baselineStatus: "Passive ice pack · Untracked degradation",
        ojixStatus: "Real-time BLE temperature sensor validation",
        payloadSnippet:
          '{\n  "current_temp": "3.8°C",\n  "threshold_window": "[2.0°C - 8.0°C]",\n  "excursion_seconds": 0,\n  "tamper_seal_intact": true\n}',
      },
      {
        id: "c3",
        step: "03. RULE",
        name: "Dynamic Courier Route Optimization",
        type: "rule",
        baselineStatus: "Driver memory · Traffic delays · Lost vials",
        ojixStatus: "SLA-constrained shortest-path dispatch",
        payloadSnippet:
          '{\n  "assigned_courier": "CR-04 (Certified Courier)",\n  "eta_central_lab": "38 mins (SLA: 60 mins)",\n  "traffic_penalty": "ZERO_DELAY",\n  "priority": "HIGH_STAT"\n}',
      },
      {
        id: "c4",
        step: "04. LEDGER",
        name: "Chain of Custody Handover",
        type: "ledger",
        baselineStatus: "Illegible ballpoint signature on clipboard",
        ojixStatus: "Cryptographic digital handover & LIMS commit",
        payloadSnippet:
          '{\n  "receiver_staff_id": "MED-TECH-481",\n  "sha256_custody_hash": "0x5a18...de92",\n  "lims_status": "COMMITTED_IN_ANALYZER",\n  "audit_verifiable": true\n}',
      },
    ],
  },
  "supply-chain-nexus": {
    id: "supply-chain-nexus",
    name: "Supply Chain",
    badge: "MULTI-NODE FREIGHT & INVENTORY",
    targetAudience: "High-Throughput Distribution & Freight Brokerages",
    headline: "Automated Carrier Tender, Detention Prevention & Inventory Sync",
    icon: Truck,
    fragileReality: {
      tool: "Chaotic WhatsApp freight groups & 40MB shared master spreadsheets",
      leak: "Overbilling from untracked detention hours and phantom carrier surcharges",
      risk: "Inventory desynchronization causing backorders and customer SLA penalties",
    },
    metrics: {
      cycleTime: { baseline: "12 hrs", ojix: "8 mins", delta: "-98%" },
      marginDelta: "+$54.2K / mo",
      auditCompliance: "100% Carrier Verified",
    },
    nodes: [
      {
        id: "s1",
        step: "01. INTAKE",
        name: "Purchase Order Release",
        type: "trigger",
        baselineStatus: "Customer PDF email manually copied to Excel",
        ojixStatus: "Automated EDI 850 ingestion & line validation",
        payloadSnippet:
          '{\n  "edi_order_id": "EDI-850-9921",\n  "sku_count": 28,\n  "pallets": 42,\n  "origin_hub": "HUB-CHICAGO-NORTH",\n  "dest_hub": "HUB-DALLAS-SOUTH"\n}',
      },
      {
        id: "s2",
        step: "02. GATE",
        name: "Carrier Insurance & Authority Gate",
        type: "gate",
        baselineStatus: "Manual FMCSA website check once a month",
        ojixStatus: "Real-time FMCSA safety & insurance query",
        payloadSnippet:
          '{\n  "carrier_dot": "DOT-3891042",\n  "cargo_insurance": "$250,000 (ACTIVE)",\n  "safety_rating": "SATISFACTORY",\n  "status": "APPROVED_FOR_TENDER"\n}',
      },
      {
        id: "s3",
        step: "03. RULE",
        name: "Dynamic Freight Tender Engine",
        type: "rule",
        baselineStatus: "Manual WhatsApp group messages with 30 carriers",
        ojixStatus: "Algorithmic tiered waterfall carrier dispatch",
        payloadSnippet:
          '{\n  "contract_rate": "$2.14 / mile",\n  "spot_market_avoidance": "+$480.00 saved",\n  "tender_acceptance_seconds": 42,\n  "contract_assigned": true\n}',
      },
      {
        id: "s4",
        step: "04. LEDGER",
        name: "Real-Time WMS Ledger Sync",
        type: "ledger",
        baselineStatus: "Nightly batch CSV sync with frequent file corruption",
        ojixStatus: "Sub-second multi-warehouse inventory commit",
        payloadSnippet:
          '{\n  "allocated_wms_stock": 42,\n  "available_to_promise": 184,\n  "ledger_commit_latency": "18ms",\n  "zero_phantom_inventory": true\n}',
      },
    ],
  },
};

export function Hero({
  title = "Custom Operating Systems for Non-Standard Operations",
  initialDomainId = "legal-os",
  onScheduleExtraction,
  onInspectBlueprints,
  className,
}: HeroProps) {
  const [activeDomainId, setActiveDomainId] = useState<DomainId>(initialDomainId);
  const [simMode, setSimMode] = useState<"ojix" | "baseline">("ojix");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const activeDomain = DOMAIN_BLUEPRINTS[activeDomainId];
  const activeNode = activeDomain.nodes[selectedNodeIndex] ?? activeDomain.nodes[0]!;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(
        "relative w-full overflow-hidden border-b border-[#E5E0D8] bg-[#FAF8F5] text-[#0B1320]",
        className,
      )}
    >
      {/* Background Architectural Blueprint Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0B1320 1px, transparent 1px), linear-gradient(to bottom, #0B1320 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-[#C85A17]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24">
        {/* 12-Column Architectural Layout Grid */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ================================================================= */}
          {/* LEFT COLUMN: Above-The-Fold Value Architecture (Questions 1, 2, 3, 4) */}
          {/* ================================================================= */}
          <div className="col-span-1 flex min-w-0 flex-col justify-start md:col-span-6 lg:col-span-6 xl:col-span-6">
            {/* VALUE QUESTION 1: WHAT IT IS (Eyebrow & Monogram) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white/90 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-[#0B1320] shadow-xs backdrop-blur-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#059669] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#059669]" />
                </span>
                <span>OJIX STUDIO</span>
                <span className="text-[#C85A17]">/</span>
                <span className="text-[#4B5563]">BESPOKE OPERATING SYSTEMS</span>
              </div>
              <span className="hidden font-mono text-[11px] text-[#4B5563] sm:inline-block">
                // PROD-GRADE RELATIONAL CLOUD
              </span>
            </div>

            {/* Display H1 Headline */}
            <h1
              id="hero-title"
              className="mt-6 font-display text-fluid-hero font-black text-[#0B1320]"
            >
              {title.includes(" for ") ? (
                <>
                  <span className="block">{title.split(" for ")[0]} for</span>
                  <span className="relative block text-[#C85A17]">
                    {title.split(" for ")[1]}
                    <span
                      className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#C85A17]/25"
                      aria-hidden="true"
                    />
                  </span>
                </>
              ) : (
                <span className="block">{title}</span>
              )}
            </h1>

            {/* VALUE QUESTION 1 & 3: WHAT IT IS & WHY IT MATTERS (Lead Body Copy) */}
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#4B5563] sm:text-lg lg:text-xl">
              Off-the-shelf SaaS forces non-standard operations into rigid boxes. When manual
              WhatsApp dispatch and fragmented Excel sheets leak margin and drop audit trails, OJIX
              engineers proprietary, production-grade cloud software directly mapped to your
              operational topology.
            </p>

            {/* VALUE QUESTION 2: WHO IT IS FOR (Target Sectors Selector Bar) */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                  Target Operational Sectors:
                </span>
                <span className="font-mono text-[11px] text-[#4B5563]">
                  [Click to preview blueprint]
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                {(Object.keys(DOMAIN_BLUEPRINTS) as DomainId[]).map((dId) => {
                  const item = DOMAIN_BLUEPRINTS[dId];
                  const Icon = item.icon;
                  const isActive = activeDomainId === dId;
                  return (
                    <button
                      key={dId}
                      type="button"
                      onClick={() => {
                        setActiveDomainId(dId);
                        setSelectedNodeIndex(0);
                      }}
                      className={cn(
                        "group flex min-h-[44px] flex-col items-start justify-center rounded border p-2.5 text-left transition-all duration-150 active:scale-[0.98]",
                        isActive
                          ? "border-[#C85A17] bg-[#FDF4ED] text-[#C85A17] shadow-xs"
                          : "border-[#E5E0D8] bg-white text-[#0B1320] hover:border-[#0B1320] hover:bg-[#FAF8F5]",
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Icon
                          className={cn(
                            "size-4 transition-colors",
                            isActive
                              ? "text-[#C85A17]"
                              : "text-[#4B5563] group-hover:text-[#0B1320]",
                          )}
                        />
                        {isActive && <span className="size-1.5 rounded-full bg-[#C85A17]" />}
                      </div>
                      <span className="mt-1 font-sans text-xs font-bold leading-tight">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Target Audience Indicator */}
              <div className="mt-2.5 flex items-start gap-2 rounded bg-white/70 px-3 py-1.5 border border-[#E5E0D8] text-xs text-[#4B5563]">
                <span className="shrink-0 font-mono font-semibold text-[#0B1320]">Audience:</span>
                <span className="leading-snug text-pretty">{activeDomain.targetAudience}</span>
              </div>
            </div>

            {/* VALUE QUESTION 3: WHY IT MATTERS (Diagnostic Reality vs Engineered Core) */}
            <div className="mt-6 rounded border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                <ShieldAlert className="size-4 text-[#C85A17]" />
                <span>The High Cost of Operational Drift:</span>
              </div>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                <div className="flex items-start gap-2 rounded bg-[#FAF8F5] p-2 border border-[#E5E0D8]/60">
                  <AlertTriangle className="size-3.5 shrink-0 text-[#C85A17] mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1320]">Margin Leakage:</span>
                    <p className="text-[#4B5563] leading-snug">
                      {activeDomain.fragileReality.leak}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded bg-[#FAF8F5] p-2 border border-[#E5E0D8]/60">
                  <FileSpreadsheet className="size-3.5 shrink-0 text-[#C85A17] mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1320]">Zero Audit Trail:</span>
                    <p className="text-[#4B5563] leading-snug">
                      {activeDomain.fragileReality.risk}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VALUE QUESTION 4: WHAT TO DO NEXT (Primary & Secondary Action CTAs) */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#extraction"
                onClick={onScheduleExtraction}
                data-magnetic="true"
                className="group relative inline-flex min-h-[48px] items-center justify-center gap-3 rounded bg-[#C85A17] px-7 py-3.5 text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-[#A94810] hover:shadow-md hover:shadow-[#C85A17]/25 active:scale-[0.98]"
              >
                <span>Schedule Operational Extraction</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#portfolio"
                onClick={onInspectBlueprints}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded border border-[#E5E0D8] bg-white px-5 py-3.5 text-sm font-semibold text-[#0B1320] transition-all duration-200 hover:border-[#0B1320] hover:bg-[#FAF8F5] active:scale-[0.98]"
              >
                <Workflow className="size-4 text-[#4B5563]" />
                <span>Inspect Blueprints</span>
              </a>
            </div>

            {/* Reassurance Micro-Copy */}
            <p className="mt-3 font-mono text-[11px] text-[#4B5563]">
              Direct 45-min technical scoping · Senior Systems Architect · Zero sales deck
            </p>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: High-Density Interactive Architectural Workbench    */}
          {/* ================================================================= */}
          <div className="col-span-1 min-w-0 md:col-span-6 lg:col-span-6 xl:col-span-6">
            <div className="overflow-hidden rounded-xl border border-[#0B1320] bg-white shadow-xl shadow-[#0B1320]/5">
              {/* Terminal Chrome Bar */}
              <div className="flex items-center justify-between border-b border-[#0B1320] bg-[#0B1320] px-4 py-2.5 text-white">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="size-2.5 rounded-full bg-[#E5E0D8]/40" />
                  <span className="size-2.5 rounded-full bg-[#E5E0D8]/40" />
                  <span className="size-2.5 rounded-full bg-[#C85A17]" />
                  <span className="ml-2 font-semibold text-[#FAF8F5]">
                    ojix.engine / {activeDomain.id}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#FAF8F5]/80">
                  <Activity className="size-3 text-[#059669]" />
                  <span>LATENCY: 14ms</span>
                </div>
              </div>

              {/* Workbench Header & Interactive Simulation Toggle */}
              <div className="border-b border-[#E5E0D8] bg-[#FAF8F5] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C85A17]">
                      {activeDomain.badge}
                    </span>
                    <h2 className="font-display text-base font-bold text-[#0B1320] sm:text-lg">
                      {activeDomain.headline}
                    </h2>
                  </div>

                  {/* Chaos vs Deterministic Toggle */}
                  <div className="flex shrink-0 items-center rounded border border-[#E5E0D8] bg-white p-0.5 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setSimMode("baseline")}
                      className={cn(
                        "rounded px-2.5 py-1 transition-colors",
                        simMode === "baseline"
                          ? "bg-[#DC2626] font-bold text-white"
                          : "text-[#4B5563] hover:text-[#0B1320]",
                      )}
                    >
                      Baseline
                    </button>
                    <button
                      type="button"
                      onClick={() => setSimMode("ojix")}
                      className={cn(
                        "rounded px-2.5 py-1 transition-colors",
                        simMode === "ojix"
                          ? "bg-[#C85A17] font-bold text-white"
                          : "text-[#4B5563] hover:text-[#0B1320]",
                      )}
                    >
                      OJIX Core
                    </button>
                  </div>
                </div>

                {/* Status Callout Banner */}
                <div
                  className={cn(
                    "mt-3 flex items-center gap-2 rounded px-3 py-1.5 text-xs font-mono",
                    simMode === "baseline"
                      ? "border border-[#DC2626]/30 bg-[#FEF2F2] text-[#991B1B]"
                      : "border border-[#059669]/30 bg-[#ECFDF5] text-[#065F46]",
                  )}
                >
                  {simMode === "baseline" ? (
                    <>
                      <AlertTriangle className="size-3.5 shrink-0 text-[#DC2626]" />
                      <span>FRAGILE REALITY: {activeDomain.fragileReality.tool}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-3.5 shrink-0 text-[#059669]" />
                      <span>DETERMINISTIC PIPELINE: ACID Compliant · Cryptographic Audit</span>
                    </>
                  )}
                </div>
              </div>

              {/* Real Operational Delta Metrics Strip */}
              <div className="grid grid-cols-3 border-b border-[#E5E0D8] bg-white">
                <div className="border-r border-[#E5E0D8] p-3 text-left">
                  <span className="font-mono text-[10px] uppercase text-[#4B5563]">
                    Cycle Latency
                  </span>
                  <div className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="font-display text-base font-black text-[#0B1320] sm:text-lg">
                      {simMode === "baseline"
                        ? activeDomain.metrics.cycleTime.baseline
                        : activeDomain.metrics.cycleTime.ojix}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold",
                        simMode === "baseline" ? "text-[#DC2626]" : "text-[#059669]",
                      )}
                    >
                      {simMode === "baseline" ? "+420%" : activeDomain.metrics.cycleTime.delta}
                    </span>
                  </div>
                </div>

                <div className="border-r border-[#E5E0D8] p-3 text-left">
                  <span className="font-mono text-[10px] uppercase text-[#4B5563]">
                    Margin Delta
                  </span>
                  <div className="mt-0.5">
                    <span
                      className={cn(
                        "font-display text-base font-black sm:text-lg",
                        simMode === "baseline" ? "text-[#DC2626]" : "text-[#C85A17]",
                      )}
                    >
                      {simMode === "baseline" ? "-$18.4K / mo" : activeDomain.metrics.marginDelta}
                    </span>
                  </div>
                </div>

                <div className="p-3 text-left">
                  <span className="font-mono text-[10px] uppercase text-[#4B5563]">
                    Audit Trail
                  </span>
                  <div className="mt-0.5">
                    <span
                      className={cn(
                        "font-display text-base font-black sm:text-lg",
                        simMode === "baseline" ? "text-[#DC2626]" : "text-[#059669]",
                      )}
                    >
                      {simMode === "baseline" ? "0% Tracked" : activeDomain.metrics.auditCompliance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Node Topology Flow (4 Nodes) */}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold uppercase tracking-wider text-[#0B1320]">
                    Topology Pipeline [Interactive]:
                  </span>
                  <span className="font-mono text-[11px] text-[#4B5563]">
                    Click node to inspect contract
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                  {activeDomain.nodes.map((node, idx) => {
                    const isSelected = selectedNodeIndex === idx;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeIndex(idx)}
                        className={cn(
                          "flex flex-col justify-between rounded border p-2.5 text-left transition-all duration-150 active:scale-[0.98]",
                          isSelected
                            ? "border-[#0B1320] bg-[#FAF8F5] ring-2 ring-[#C85A17]"
                            : "border-[#E5E0D8] bg-white hover:border-[#0B1320]",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold text-[#C85A17]">
                            {node.step}
                          </span>
                          {simMode === "ojix" ? (
                            <Check className="size-3 text-[#059669]" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-[#DC2626]" />
                          )}
                        </div>
                        <span className="mt-1 font-sans text-xs font-bold leading-tight text-[#0B1320]">
                          {node.name}
                        </span>
                        <span className="mt-1 font-mono text-[10px] text-[#4B5563] truncate">
                          {simMode === "baseline" ? "Fragile Handshake" : "PostgreSQL Commit"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Teardown & Payload Preview */}
                <div className="mt-3 rounded border border-[#E5E0D8] bg-[#FAF8F5] p-3 text-left">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#0B1320]">
                      Node Inspection: {activeNode.name}
                    </span>
                    <span className="rounded bg-white px-2 py-0.5 border border-[#E5E0D8] text-[10px] text-[#4B5563]">
                      TYPE: {activeNode.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-2 text-xs">
                    <div className="flex items-start gap-1.5 text-[#4B5563]">
                      <span className="font-mono font-semibold text-[#0B1320]">Status:</span>
                      <span>
                        {simMode === "baseline" ? activeNode.baselineStatus : activeNode.ojixStatus}
                      </span>
                    </div>
                  </div>

                  {/* Real-time Code Contract Payload */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between rounded-t border-x border-t border-[#1E293B] bg-[#1E293B] px-3 py-1 text-[11px] font-mono text-white/70">
                      <span>payload_contract.json</span>
                      <span className="text-[#059669]">SCHEMA_VALID</span>
                    </div>
                    <pre className="max-h-32 overflow-x-auto rounded-b border border-[#1E293B] bg-[#111A29] p-3 font-mono text-[11px] leading-relaxed text-[#FAF8F5]">
                      <code>{activeNode.payloadSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Workbench Footer Status Bar */}
              <div className="flex items-center justify-between border-t border-[#E5E0D8] bg-[#FAF8F5] px-4 py-2 font-mono text-[11px] text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <Database className="size-3 text-[#C85A17]" />
                  <span>DEDICATED POSTGRESQL // 99.99% SLA</span>
                </div>
                <span>NODE {selectedNodeIndex + 1} OF 4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
