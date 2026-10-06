import { useState } from "react";
import {
  FileSpreadsheet,
  MessageSquare,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  Check,
} from "lucide-react";

interface LeakageVector {
  id: string;
  source: string;
  category: "spreadsheet" | "whatsapp" | "email";
  headline: string;
  symptom: string;
  financialImpact: string;
  solution: string;
}

const LEAKAGE_VECTORS: LeakageVector[] = [
  {
    id: "v1",
    source: "Excel Master File (v4_FINAL_rev2.xlsx)",
    category: "spreadsheet",
    headline: "Formulas Broken by Concurrent Edits",
    symptom:
      "Multiple department heads overwrite shared network drives or cloud links, desynchronizing VLOOKUP references and inventory quantities.",
    financialImpact: "4.2% average billing error rate",
    solution:
      "ACID relational tables with strict row-level constraints and atomic transaction isolation.",
  },
  {
    id: "v2",
    source: "Operations WhatsApp Group (18 members)",
    category: "whatsapp",
    headline: "Unmonitored Change Orders & Lost Approvals",
    symptom:
      "Urgent production modifications agreed over voice notes or chat thumbs-up emojis with zero timestamped audit trails for QA inspectors.",
    financialImpact: "7.8% avoidable shop scrap rate",
    solution:
      "Deterministic gate transitions requiring authenticated signatures before work release.",
  },
  {
    id: "v3",
    source: "Dispersed Vendor PDF Invoices",
    category: "email",
    headline: "Silent Subcontractor Double-Billing",
    symptom:
      "Accounts payable manually matches 20-page subcontractor PDF timesheets against vague job codes, missing overbillings and phantom hours.",
    financialImpact: "$18,500/mo unverified supplier leakage",
    solution:
      "Automated line-item 3-way matching checking PO, physical delivery scan, and invoice.",
  },
  {
    id: "v4",
    source: "Desktop Sticky Notes & Paper Travel Sheets",
    category: "spreadsheet",
    headline: "Zero Chain-of-Custody Telemetry",
    symptom:
      "Physical batches move between clean rooms or machine bays with paper signatures that are smudged, lost, or impossible to index during ISO audits.",
    financialImpact: "3–6 days lost per regulatory audit",
    solution: "Real-time QR barcode tracking with immutable append-only event log.",
  },
];

export function BusinessXRaySection() {
  const [selectedVector, setSelectedVector] = useState<string>("v1");
  const activeVector = LEAKAGE_VECTORS.find((v) => v.id === selectedVector) ?? LEAKAGE_VECTORS[0]!;

  return (
    <section
      id="xray"
      aria-labelledby="xray-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <span>03 // FORENSIC BUSINESS X-RAY</span>
          </div>
          <h2
            id="xray-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
          >
            Your Organization Already Has a System. It is Trapped in WhatsApp and Excel.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
            When business complexity exceeds standard SaaS capabilities, operators do not stop
            working; they invent informal, shadow systems using spreadsheet formulas and messaging
            group chats. These informal workflows keep the business running today, but leak margin
            and destroy compliance.
          </p>
        </div>

        {/* Forensic Workspace: Vector List & Diagnostic Deep-Dive */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Vector Selectors */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320] block mb-2">
              Identified Operational Drift Vectors:
            </span>
            {LEAKAGE_VECTORS.map((vec) => {
              const isSelected = selectedVector === vec.id;
              const Icon = vec.category === "whatsapp" ? MessageSquare : FileSpreadsheet;
              return (
                <button
                  key={vec.id}
                  type="button"
                  onClick={() => setSelectedVector(vec.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all duration-150 active:scale-[0.99] ${
                    isSelected
                      ? "border-[#0B1320] bg-white shadow-md ring-2 ring-[#C85A17]"
                      : "border-[#E5E0D8] bg-white/70 hover:border-[#0B1320] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#C85A17]">
                      <Icon className="size-3.5" />
                      <span className="font-semibold uppercase truncate">{vec.category}</span>
                    </div>
                    {isSelected && (
                      <span className="rounded bg-[#C85A17] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-sans text-base font-bold text-[#0B1320] leading-snug">
                    {vec.headline}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#DC2626] font-semibold">
                    Cost: {vec.financialImpact}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Forensic Teardown Panel */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#0B1320] bg-white p-6 sm:p-8 shadow-xl shadow-[#0B1320]/5">
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-[#DC2626]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                    Diagnostic Case File // {activeVector.id.toUpperCase()}
                  </span>
                </div>
                <span className="rounded bg-[#FAF8F5] border border-[#E5E0D8] px-2.5 py-1 font-mono text-xs text-[#4B5563]">
                  RISK: HIGH LEAKAGE
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#4B5563] uppercase">
                    Root Channel Source:
                  </span>
                  <div className="mt-1 rounded bg-[#FAF8F5] p-3 font-mono text-xs text-[#0B1320] border border-[#E5E0D8]">
                    {activeVector.source}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs font-semibold text-[#DC2626] uppercase flex items-center gap-1.5">
                    <TrendingDown className="size-4" />
                    Operational Failure Mode:
                  </span>
                  <p className="mt-1 text-sm text-[#4B5563] leading-relaxed">
                    {activeVector.symptom}
                  </p>
                </div>

                <div className="rounded-lg border border-[#DC2626]/30 bg-[#FEF2F2] p-4 text-xs font-mono text-[#991B1B]">
                  <span className="font-bold uppercase block mb-1">Quantified Margin Drag:</span>
                  <p className="text-sm font-semibold">{activeVector.financialImpact}</p>
                </div>

                <div>
                  <span className="font-mono text-xs font-semibold text-[#059669] uppercase flex items-center gap-1.5">
                    <Check className="size-4 text-[#059669]" />
                    OJIX Engineered Alternative:
                  </span>
                  <p className="mt-1 text-sm font-medium text-[#0B1320] leading-relaxed">
                    {activeVector.solution}
                  </p>
                </div>

                <div className="border-t border-[#E5E0D8] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="font-mono text-xs text-[#4B5563]">
                    Ready to audit your active spread sheets and chat channels?
                  </span>
                  <a
                    href="#extraction"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded bg-[#C85A17] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#B34E13] active:scale-[0.98]"
                  >
                    <span>Request Diagnostic Extraction</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessXRaySection;
