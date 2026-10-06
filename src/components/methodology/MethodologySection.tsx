import { Stethoscope, Network, Terminal, CloudCheck } from "lucide-react";

interface LifecycleStage {
  step: string;
  name: string;
  subtitle: string;
  timeframe: string;
  deliverable: string;
  description: string;
  keyOutputs: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    step: "01",
    name: "Forensic Extraction",
    subtitle: "Diagnostics & Failure Mode Audit",
    timeframe: "Days 1–5",
    deliverable: "Operational Drift Report & Root Cause Matrix",
    description:
      "We interview line operators, examine active Excel workbooks, and trace chaotic WhatsApp messaging dispatch channels to identify exact points of margin leakage and audit failure.",
    keyOutputs: [
      "Catalog of all active shadow spreadsheets & macros",
      "Analysis of WhatsApp/email dispatch message volume",
      "Identification of unbilled hours, scrap loss, and invoice mismatch vectors",
    ],
    icon: Stethoscope,
  },
  {
    step: "02",
    name: "Relational Topology Mapping",
    subtitle: "Domain Modeling & State Machine Design",
    timeframe: "Days 6–10",
    deliverable: "State Machine Spec & Typed Data Schemas",
    description:
      "We translate fuzzy operational habits into strict mathematical state machines. Entities, access roles, approval gates, and compliance assertions are defined in code before any UI is built.",
    keyOutputs: [
      "ACID relational entity schema (PostgreSQL)",
      "Strict finite state machine transition rules",
      "Cryptographic audit logging and compliance checkpoints",
    ],
    icon: Network,
  },
  {
    step: "03",
    name: "Functional System Prototype",
    subtitle: "Interactive Working Software Preview",
    timeframe: "Days 11–18",
    deliverable: "Clickable Full-Stack Prototype on Staging",
    description:
      "Rather than slide decks or static Figma wireframes, we deploy a functional prototype populated with sanitized historical company data so your operators can test real workflows immediately.",
    keyOutputs: [
      "Live authenticated staging environment",
      "End-to-end ingestion and routing simulation",
      "Operator usability feedback and edge-case discovery",
    ],
    icon: Terminal,
  },
  {
    step: "04",
    name: "Cloud Production & Hardening",
    subtitle: "Zero-Downtime Deployment & SLA Handover",
    timeframe: "Days 19–30",
    deliverable: "Dedicated Infrastructure & IP Transfer",
    description:
      "We deploy your bespoke operating system to isolated, dedicated cloud infrastructure (Cloudflare Workers, AWS ECS, Neon PostgreSQL) with 99.98% uptime SLA, full automated backup, and 100% IP ownership.",
    keyOutputs: [
      "Single-tenant dedicated database isolation",
      "Continuous health monitoring & sub-50ms global latency",
      "Complete source code repository and IP handover",
    ],
    icon: CloudCheck,
  },
];

export function MethodologySection() {
  return (
    <section
      id="methodology"
      aria-labelledby="methodology-heading"
      className="border-b border-[#E5E0D8] bg-[#0B1320] py-20 lg:py-28 text-white selection:bg-[#C85A17] selection:text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <span>02 // THE ENGINEERING LIFECYCLE</span>
          </div>
          <h2
            id="methodology-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-white"
          >
            From Messy Operational Reality to Scalable Production Cloud.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-slate-300">
            Traditional enterprise software consultancies bill by the hour and produce 100-page PDF
            specs that gather dust. OJIX uses a rapid, 30-day engineering sprint to diagnose failure
            points, model relational state machines, and deliver working production code.
          </p>
        </div>

        {/* 4-Stage Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="flex flex-col justify-between rounded-xl border border-white/15 bg-[#121C2D] p-6 shadow-lg transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#C85A17]">PHASE {stage.step}</span>
                    <span className="text-slate-400">{stage.timeframe}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded bg-[#C85A17]/20 text-[#C85A17]">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {stage.name}
                    </h3>
                  </div>

                  <p className="mt-1 font-mono text-xs text-slate-400">{stage.subtitle}</p>

                  <p className="mt-4 text-xs leading-relaxed text-slate-300">{stage.description}</p>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#C85A17]">
                      Outputs:
                    </span>
                    <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-slate-300">
                      {stage.keyOutputs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-[#C85A17]">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded border border-white/10 bg-white/5 p-2.5 font-mono text-[11px] text-slate-300">
                  <span className="block text-[10px] uppercase text-slate-400">Deliverable:</span>
                  <span className="font-semibold text-white">{stage.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Banner */}
        <div className="mt-12 rounded-xl border border-[#C85A17]/40 bg-[#C85A17]/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h4 className="font-display text-lg font-bold text-white">
              Full Intellectual Property & Source Code Ownership
            </h4>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              You own 100% of the repository, data schemas, migrations, and deployed cloud
              infrastructure. No vendor lock-in, no per-seat SaaS tax, no trapped proprietary
              runtimes.
            </p>
          </div>
          <a
            href="#extraction"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded bg-[#C85A17] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#B34E13] active:scale-[0.98]"
          >
            <span>Review Scope & SLA</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MethodologySection;
