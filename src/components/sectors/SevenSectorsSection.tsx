import { useState } from "react";
import {
  Cloud,
  CreditCard,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Truck,
  Scale,
  ArrowUpRight,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectorItem {
  id: string;
  name: string;
  badge: string;
  ojixFocus: string;
  coreDeliverables: string[];
  benchmarkMetric: string;
  metricLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const SEVEN_SECTORS: SectorItem[] = [
  {
    id: "saas",
    name: "SaaS",
    badge: "SECTOR 01",
    ojixFocus: "Scalable software products and platforms.",
    coreDeliverables: [
      "High-throughput multi-tenant cloud architecture",
      "Dynamic usage metering and subscription billing engines",
      "Fine-grained role-based access control (RBAC)",
      "Zero-downtime rolling schema migrations",
    ],
    benchmarkMetric: "99.99%",
    metricLabel: "Uptime SLA Guarantee",
    icon: Cloud,
    accentColor: "#C85A17",
  },
  {
    id: "fintech",
    name: "FinTech",
    badge: "SECTOR 02",
    ojixFocus: "Secure and reliable financial technology solutions.",
    coreDeliverables: [
      "Cryptographic double-entry accounting ledgers",
      "Sub-second automated payment clearing & reconciliation",
      "PCI-DSS compliant tokenization infrastructure",
      "Real-time fraud anomaly scoring pipelines",
    ],
    benchmarkMetric: "Zero Drift",
    metricLabel: "Ledger Reconciliation",
    icon: CreditCard,
    accentColor: "#0B1320",
  },
  {
    id: "healthtech",
    name: "HealthTech",
    badge: "SECTOR 03",
    ojixFocus: "Digital platforms and intelligent healthcare workflows.",
    coreDeliverables: [
      "HIPAA and HL7/FHIR compliant patient telemetry",
      "Automated diagnostic laboratory routing and specimen tracking",
      "Clinical workflow state machine with dual-physician signoff",
      "Air-gapped medical record storage with immutable logs",
    ],
    benchmarkMetric: "100%",
    metricLabel: "HIPAA Audit Compliance",
    icon: HeartPulse,
    accentColor: "#C85A17",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    badge: "SECTOR 04",
    ojixFocus: "Commerce platforms, automation and customer experiences.",
    coreDeliverables: [
      "Real-time multi-warehouse inventory synchronization",
      "Sub-second checkout engines with high-concurrency surge resilience",
      "Automated order-to-fulfillment routing pipelines",
      "Dynamic returns reconciliation and supplier settlement",
    ],
    benchmarkMetric: "<420ms",
    metricLabel: "Cart Checkout Velocity",
    icon: ShoppingBag,
    accentColor: "#0B1320",
  },
  {
    id: "edtech",
    name: "EdTech",
    badge: "SECTOR 05",
    ojixFocus: "Learning, assessment and education technology.",
    coreDeliverables: [
      "High-concurrency examination and digital assessment engines",
      "Multimodal AI proctoring and integrity telemetry (OJIX ProctX™)",
      "LTI 1.3 standards-compliant university LMS gateways",
      "Dynamic competency progression graphs and automated grading",
    ],
    benchmarkMetric: "50,000+",
    metricLabel: "Concurrent Test Takers",
    icon: GraduationCap,
    accentColor: "#C85A17",
  },
  {
    id: "logisticstech",
    name: "LogisticsTech",
    badge: "SECTOR 06",
    ojixFocus: "Technology for logistics, operations and workforce.",
    coreDeliverables: [
      "Dynamic multi-stop vehicle route and load optimization",
      "Yard management telemetry and cross-docking tracking",
      "Driver dispatch mobile applications with offline sync",
      "Warehouse execution systems (WES) integrated with ERP",
    ],
    benchmarkMetric: "-38%",
    metricLabel: "Fleet Turnaround Overhead",
    icon: Truck,
    accentColor: "#0B1320",
  },
  {
    id: "lawtech",
    name: "LawTech",
    badge: "SECTOR 07",
    ojixFocus: "AI-powered legal technology, case management, and compliance workflows.",
    coreDeliverables: [
      "Autonomous court docket webhook ingestion and party indexing",
      "Real-time relational conflict check across 1,400+ adverse entities",
      "Automated statutory deadline calendarization with jurisdiction rules",
      "Cryptographically auditable IOLTA escrow trust disbursement ledgers",
    ],
    benchmarkMetric: "-93%",
    metricLabel: "Litigation Docketing Delay",
    icon: Scale,
    accentColor: "#C85A17",
  },
];

export function SevenSectorsSection() {
  const [selectedSector, setSelectedSector] = useState<string>("lawtech");

  return (
    <section
      id="sectors"
      aria-labelledby="sectors-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
              <Layers className="size-3.5" />
              <span>03 // ENTERPRISE DOMAIN COVERAGE</span>
            </div>
            <h2
              id="sectors-heading"
              className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
            >
              Seven Mission-Critical Sectors.
            </h2>
            <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
              From high-compliance LawTech and FinTech infrastructure to high-throughput SaaS and
              physical LogisticsTech, OJIX engineers dedicated software platforms engineered for
              strict operational reality.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#0B1320] bg-white border border-[#E5E0D8] px-4 py-2 rounded-lg">
            <Shield className="size-4 text-[#C85A17]" />
            <span>SINGLE-TENANT ISOLATED INFRASTRUCTURE</span>
          </div>
        </div>

        {/* 7 Sectors Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SEVEN_SECTORS.map((sector) => {
            const Icon = sector.icon;
            const isSelected = selectedSector === sector.id;

            return (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={cn(
                  "group relative flex flex-col justify-between rounded-xl border p-6 text-left transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-[#C85A17] bg-white shadow-lg shadow-[#C85A17]/10"
                    : "border-[#E5E0D8] bg-white hover:border-[#0B1320] hover:shadow-md",
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-[#C85A17]">
                      {sector.badge}
                    </span>
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-lg border transition-colors",
                        isSelected
                          ? "border-[#C85A17] bg-[#FDF4ED] text-[#C85A17]"
                          : "border-[#E5E0D8] bg-[#FAF8F5] text-[#0B1320] group-hover:border-[#0B1320]",
                      )}
                    >
                      <Icon className="size-4.5" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-[#0B1320] group-hover:text-[#C85A17] transition-colors">
                    {sector.name}
                  </h3>

                  <p className="mt-2 font-sans text-sm font-medium text-[#4B5563] leading-relaxed">
                    {sector.ojixFocus}
                  </p>

                  <div className="mt-4 border-t border-[#F0EBE3] pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#6B7280]">
                      Key Deliverables
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {sector.coreDeliverables.slice(0, 2).map((deliv, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-xs text-[#374151] leading-snug"
                        >
                          <ChevronRight className="size-3 text-[#C85A17] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E5E0D8] pt-4 flex items-center justify-between">
                  <div>
                    <span className="block font-display text-base font-extrabold text-[#0B1320]">
                      {sector.benchmarkMetric}
                    </span>
                    <span className="block font-mono text-[10px] text-[#6B7280]">
                      {sector.metricLabel}
                    </span>
                  </div>

                  <a
                    href="#extraction"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#C85A17] hover:underline"
                    aria-label={`Scope software for ${sector.name}`}
                  >
                    <span>Scope</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}

          {/* 8th Slot: Custom Enterprise Ingress Card */}
          <div className="flex flex-col justify-between rounded-xl border border-dashed border-[#0B1320] bg-[#FAF8F5] p-6 text-left">
            <div>
              <span className="font-mono text-[11px] font-bold tracking-wider text-[#4B5563]">
                PROPRIETARY // DOMAIN 08+
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-[#0B1320]">
                Non-Standard Operations?
              </h3>
              <p className="mt-2 font-sans text-sm text-[#4B5563] leading-relaxed">
                If your business operates on bespoke logic that standard industry software cannot
                model, we engineer a custom domain engine directly from your spreadsheets and
                workflows.
              </p>
            </div>

            <div className="mt-6 border-t border-[#E5E0D8] pt-4">
              <a
                href="#extraction"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1320] px-4 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-[#C85A17]"
              >
                <span>Request Custom Architecture</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
