import { useState } from "react";
import {
  ShieldCheck,
  Building,
  GraduationCap,
  Scale,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClientProfile {
  id: string;
  name: string;
  shortName: string;
  category: string;
  sectorBadge: string;
  location: string;
  scopeSummary: string;
  impactMetric: string;
  impactMetricLabel: string;
  capabilities: string[];
  renderLogo: (className?: string) => React.ReactNode;
}

export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: "jain-anveshana",
    name: "Jain Anveshana",
    shortName: "JGI Anveshana",
    category: "Higher Education & EdTech Research",
    sectorBadge: "EDTECH",
    location: "Bengaluru, Karnataka",
    scopeSummary:
      "Enterprise digital examination architecture, multimodal assessment integrity telemetry, and automated student grading workflows across university faculties.",
    impactMetric: "50,000+",
    impactMetricLabel: "Concurrent Exam Sessions",
    capabilities: [
      "OJIX ProctX™ multimodal remote proctoring integration",
      "High-throughput exam delivery with zero edge latency",
      "Automated evaluation and anti-tamper grading ledgers",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 200 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="Jain Anveshana Logo"
      >
        {/* Sunburst / Torch Academic Crest */}
        <g transform="translate(4, 8)">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M16 6v20M8 12l16 8M8 20l16-8" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="4" fill="#C85A17" />
        </g>
        <text
          x="44"
          y="22"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.05em"
        >
          JAIN
        </text>
        <text
          x="84"
          y="22"
          fontFamily="system-ui, sans-serif"
          fontWeight="400"
          fontSize="14"
          letterSpacing="0.12em"
          fill="#C85A17"
        >
          ANVESHANA
        </text>
        <text
          x="44"
          y="35"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7.5"
          letterSpacing="0.18em"
          opacity="0.65"
        >
          RESEARCH &amp; EDTECH SYSTEMS
        </text>
      </svg>
    ),
  },
  {
    id: "bsg-karnataka",
    name: "BSG Karnataka",
    shortName: "The Bharat Scouts & Guides",
    category: "State Youth Organization & Association",
    sectorBadge: "GOVERNANCE",
    location: "Karnataka State Headquarters",
    scopeSummary:
      "Statewide member verification portal, digital badge credentialing, event logistics coordination, and administrative record automation.",
    impactMetric: "100%",
    impactMetricLabel: "Digital Credential Integrity",
    capabilities: [
      "Statewide member registration & badge issuance engine",
      "Multi-district event logistics & camp quota tracking",
      "Tamper-proof digital certificate verification registry",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 200 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="BSG Karnataka Logo"
      >
        {/* BSG Fleur-de-lis + Trefoil + Chakra Motif */}
        <g transform="translate(6, 6)">
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M18 6c-2 5-6 8-6 12 0 4 3 6 6 6s6-2 6-6c0-4-4-7-6-12z" fill="#C85A17" />
          <circle cx="18" cy="18" r="3.5" fill="#0B1320" />
          <path d="M12 28h12" stroke="currentColor" strokeWidth="2" />
        </g>
        <text
          x="48"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="13"
          letterSpacing="0.08em"
        >
          BSG KARNATAKA
        </text>
        <text
          x="48"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.14em"
          opacity="0.65"
        >
          BHARAT SCOUTS &amp; GUIDES
        </text>
      </svg>
    ),
  },
  {
    id: "bnn-family-law",
    name: "BNN Family Law Chambers",
    shortName: "BNN Chambers",
    category: "Premier Family Law & Mediation Practice",
    sectorBadge: "LAWTECH",
    location: "BNN Tower, Bengaluru",
    scopeSummary:
      "Deployment of OJIX LawX™ for complex matrimonial litigation, confidential matter intake, court docket syncing, and escrow settlement tracking.",
    impactMetric: "-90%",
    impactMetricLabel: "Docket Intake Lag",
    capabilities: [
      "OJIX LawX™ practice management & litigation tracking",
      "Client confidential privilege vault with encryption at rest",
      "Automated settlement escrow accounting & compliance",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 210 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="BNN Family Law Chambers Logo"
      >
        {/* Scales of Justice & Monogram Columns */}
        <g transform="translate(6, 8)">
          <rect x="2" y="4" width="4" height="24" fill="#C85A17" />
          <rect x="10" y="4" width="4" height="24" fill="currentColor" />
          <rect x="18" y="4" width="4" height="24" fill="#C85A17" />
          <path d="M0 4h24M0 28h24" stroke="currentColor" strokeWidth="2" />
        </g>
        <text
          x="44"
          y="21"
          fontFamily="serif, system-ui"
          fontWeight="900"
          fontSize="15"
          letterSpacing="0.06em"
        >
          BNN
        </text>
        <text
          x="84"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fontSize="12"
          letterSpacing="0.04em"
        >
          FAMILY LAW
        </text>
        <text
          x="44"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7.5"
          letterSpacing="0.18em"
          opacity="0.65"
        >
          CHAMBERS · BENGALURU
        </text>
      </svg>
    ),
  },
  {
    id: "gvs-law-chambers",
    name: "GVS Law Chambers",
    shortName: "GVS Law",
    category: "High Court & Corporate Litigation",
    sectorBadge: "LAWTECH",
    location: "Bengaluru, Karnataka",
    scopeSummary:
      "Automated case hearing calendars, adverse party conflict-of-interest detection graph, and digital court submission archiving.",
    impactMetric: "0",
    impactMetricLabel: "Conflict False-Negatives",
    capabilities: [
      "Relational conflict check evaluating thousands of adverse entities",
      "High Court hearing list automated webhook scraper & alerts",
      "Encrypted digital brief assembly and legal precedent index",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 200 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="GVS Law Chambers Logo"
      >
        {/* Classical Balance of Justice Crest */}
        <g transform="translate(6, 7)">
          <path
            d="M16 2v26M6 8h20M6 8l-4 8h8zM26 8l-4 8h8z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="16" cy="4" r="2.5" fill="#C85A17" />
        </g>
        <text
          x="44"
          y="21"
          fontFamily="serif, system-ui"
          fontWeight="800"
          fontSize="15"
          letterSpacing="0.08em"
        >
          GVS
        </text>
        <text
          x="82"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="600"
          fontSize="12"
          letterSpacing="0.05em"
        >
          LAW CHAMBERS
        </text>
        <text
          x="44"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.16em"
          opacity="0.65"
        >
          ADVOCATES &amp; CONSULTANTS
        </text>
      </svg>
    ),
  },
  {
    id: "ashwik-law",
    name: "Ashwik Law Associates",
    shortName: "Ashwik Law",
    category: "Property, Civil & Commercial Law Firm",
    sectorBadge: "LAWTECH",
    location: "Basavanagudi, Bengaluru",
    scopeSummary:
      "Automated land title deed analysis using OJIX OCR™, Khata transfer tracking, and legal notice generation pipeline.",
    impactMetric: "-85%",
    impactMetricLabel: "Deed Audit Turnaround",
    capabilities: [
      "OJIX OCR™ extraction on handwritten and historic land deeds",
      "Khata and statutory property title chain validation",
      "Client milestone tracking and automated dispute calendaring",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 215 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="Ashwik Law Associates Logo"
      >
        {/* Chevron Pillar Architectural Mark */}
        <g transform="translate(6, 7)">
          <path d="M4 26L16 4l12 22M16 12v14" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="16" cy="4" r="3" fill="#C85A17" />
        </g>
        <text
          x="44"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="13.5"
          letterSpacing="0.05em"
        >
          ASHWIK LAW
        </text>
        <text
          x="44"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7.5"
          letterSpacing="0.16em"
          opacity="0.65"
        >
          ASSOCIATES · ADVOCATES
        </text>
      </svg>
    ),
  },
  {
    id: "ramees-enterprises",
    name: "Ramees Enterprises",
    shortName: "Ramees Enterprises",
    category: "Commercial Contracting & Engineering Infrastructure",
    sectorBadge: "LOGISTICSTECH",
    location: "Bengaluru, Karnataka",
    scopeSummary:
      "Custom procurement and job-site ERP replacing manual WhatsApp field logs with structured material reconciliation and contractor ledger dispatch.",
    impactMetric: "+32%",
    impactMetricLabel: "Contractor Margin Lift",
    capabilities: [
      "Custom job-site inventory & material dispatch tracking",
      "Contractor quotation-to-approval double-entry ledger",
      "Sub-contractor invoice validation and automated payouts",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 210 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="Ramees Enterprises Logo"
      >
        {/* Industrial Hex Structural Mark */}
        <g transform="translate(6, 8)">
          <path d="M16 2l12 7v14l-12 7-12-7V9z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16 8l6 3.5v7L16 22l-6-3.5v-7z" fill="#C85A17" />
        </g>
        <text
          x="44"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="14"
          letterSpacing="0.06em"
        >
          RAMEES
        </text>
        <text
          x="110"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="400"
          fontSize="14"
          letterSpacing="0.06em"
        >
          ENTERPRISES
        </text>
        <text
          x="44"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.16em"
          opacity="0.65"
        >
          ENGINEERING &amp; CONTRACTING
        </text>
      </svg>
    ),
  },
  {
    id: "worexa",
    name: "Worexa",
    shortName: "Worexa Technologies",
    category: "Digital Growth & SaaS Marketing Technology",
    sectorBadge: "SAAS",
    location: "Banashankari, Bengaluru",
    scopeSummary:
      "High-throughput analytics data pipelines, multi-client campaign performance telemetry, and automated conversion attribution engine.",
    impactMetric: "14ms",
    impactMetricLabel: "Telemetry Ingestion Speed",
    capabilities: [
      "Real-time event streaming for multi-channel growth metrics",
      "Automated client reporting portals with role-based access",
      "High-concurrency data fabric built on OJIX DDFS™",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 190 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="Worexa Logo"
      >
        {/* Modern Geometric Tech Prism */}
        <g transform="translate(6, 8)">
          <polygon
            points="16,2 28,14 16,26 4,14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <polygon points="16,7 23,14 16,21 9,14" fill="#C85A17" />
        </g>
        <text
          x="42"
          y="22"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="0.08em"
        >
          WOREXA
        </text>
        <text
          x="42"
          y="35"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.2em"
          opacity="0.65"
        >
          TECHNOLOGIES
        </text>
      </svg>
    ),
  },
  {
    id: "nele-architecture",
    name: "Nele - Architecture and Planning",
    shortName: "Nele Studio",
    category: "Urban Architecture & Spatial Planning Studio",
    sectorBadge: "PLANNING",
    location: "Bengaluru, Karnataka",
    scopeSummary:
      "Secure project milestone ledger, CAD drawing revision vault on OJIX DDFS™, and contractor phase sign-off workflows.",
    impactMetric: "100%",
    impactMetricLabel: "Drawing Revision Audit",
    capabilities: [
      "Immutable architectural drawing versioning with WORM storage",
      "Client milestone sign-off with cryptographic digital signatures",
      "Job-site inspection photo audit trail with GPS grounding",
    ],
    renderLogo: (className) => (
      <svg
        viewBox="0 0 215 48"
        className={cn("h-8 w-auto", className)}
        fill="currentColor"
        aria-label="Nele Architecture and Planning Logo"
      >
        {/* Isometric Architectural Structure */}
        <g transform="translate(6, 8)">
          <path d="M16 2L2 10v14l14 8 14-8V10z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M16 2v20M2 10l14 12 14-12" stroke="#C85A17" strokeWidth="1.5" />
        </g>
        <text
          x="44"
          y="21"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="15"
          letterSpacing="0.12em"
        >
          NELE
        </text>
        <text
          x="44"
          y="34"
          fontFamily="monospace"
          fontWeight="600"
          fontSize="7"
          letterSpacing="0.14em"
          opacity="0.65"
        >
          ARCHITECTURE &amp; PLANNING
        </text>
      </svg>
    ),
  },
];

export function ClientTrustSection() {
  const [selectedClient, setSelectedClient] = useState<ClientProfile>(CLIENT_PROFILES[0]!);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="border-b border-[#E5E0D8] bg-white py-16 lg:py-24 text-[#0B1320]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
              <ShieldCheck className="size-3.5" />
              <span>PROVEN CLIENT ENGAGEMENTS</span>
            </div>
            <h2
              id="clients-heading"
              className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
            >
              Trusted by High-Stakes Enterprises.
            </h2>
            <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
              From university systems and state associations to premier law chambers and engineering
              contractors, our proprietary operating systems power critical operations every day.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#0B1320] bg-[#FAF8F5] border border-[#E5E0D8] px-4 py-2.5 rounded-lg">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>8 LIVE PRODUCTION DEPLOYMENTS</span>
          </div>
        </div>

        {/* 8 Client Logos Architectural Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {CLIENT_PROFILES.map((client) => {
            const isSelected = selectedClient.id === client.id;

            return (
              <button
                key={client.id}
                type="button"
                onClick={() => setSelectedClient(client)}
                className={cn(
                  "group relative flex min-h-[96px] flex-col items-center justify-center rounded-xl border p-4 text-center transition-all duration-200 cursor-pointer active:scale-[0.98]",
                  isSelected
                    ? "border-[#C85A17] bg-[#FAF8F5] shadow-md shadow-[#C85A17]/10"
                    : "border-[#E5E0D8] bg-white hover:border-[#0B1320] hover:bg-[#FAF8F5]/50",
                )}
                aria-label={`View engagement profile for ${client.name}`}
              >
                <div
                  className={cn(
                    "flex w-full items-center justify-center transition-all duration-200",
                    isSelected
                      ? "text-[#0B1320] opacity-100 scale-105"
                      : "text-[#4B5563] opacity-75 group-hover:opacity-100 group-hover:text-[#0B1320] group-hover:scale-102",
                  )}
                >
                  {client.renderLogo()}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#C85A17]">
                    {client.sectorBadge}
                  </span>
                  <span className="text-[#E5E0D8] text-xs">·</span>
                  <span className="font-sans text-[11px] text-[#6B7280] truncate max-w-[120px]">
                    {client.location.split(",")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Client Engagement Detail Spotlight Card */}
        <div className="mt-8 rounded-xl border border-[#0B1320] bg-[#FAF8F5] p-6 sm:p-8 shadow-xl shadow-[#0B1320]/5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-xl border border-[#0B1320] bg-white text-[#0B1320] shadow-xs">
                {selectedClient.renderLogo("h-6 w-auto")}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1320]">
                    {selectedClient.name}
                  </h3>
                  <span className="rounded bg-[#C85A17]/10 text-[#C85A17] px-2 py-0.5 font-mono text-[10px] font-bold">
                    {selectedClient.sectorBadge}
                  </span>
                </div>
                <p className="mt-0.5 font-sans text-xs sm:text-sm text-[#6B7280]">
                  {selectedClient.category} · {selectedClient.location}
                </p>
              </div>
            </div>

            {/* Impact Metric Callout */}
            <div className="flex items-center gap-4 bg-white border border-[#E5E0D8] px-5 py-3 rounded-lg">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#C85A17]">
                  {selectedClient.impactMetric}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#4B5563]">
                  {selectedClient.impactMetricLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            {/* Scope Summary */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                Engineering Deployment Scope:
              </span>
              <p className="mt-2 font-sans text-sm sm:text-base leading-relaxed text-[#374151]">
                {selectedClient.scopeSummary}
              </p>
            </div>

            {/* Core Capabilities Delivered */}
            <div className="lg:col-span-5 bg-white border border-[#E5E0D8] p-4 rounded-lg">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                Production Capabilities:
              </span>
              <ul className="mt-2 space-y-2">
                {selectedClient.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#4B5563]">
                    <CheckCircle2 className="size-3.5 text-[#C85A17] shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
