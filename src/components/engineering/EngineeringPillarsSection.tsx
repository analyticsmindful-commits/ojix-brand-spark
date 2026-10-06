import { Database, Cpu, ShieldCheck, Check } from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  techStack: string;
  description: string;
  specifications: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Deterministic State Machines",
    subtitle: "ACID Consistency & Zero Silent Mutation",
    techStack: "PostgreSQL · Relational Schemas · Drizzle ORM",
    description:
      "Operational chaos occurs when systems permit impossible state transitions. We model business processes as strict, formal state machines. An invoice cannot be paid before it is approved; a CNC batch cannot start before raw material heat-lots are verified.",
    specifications: [
      "Rigid constraint validation before transaction commit",
      "Append-only event ledgers for audit immutability",
      "Sub-second relational queries with indexed partition keys",
      "Full cryptographic hash chaining across financial ledger posts",
    ],
    icon: Database,
  },
  {
    number: "02",
    title: "Autonomous Event Pipelines",
    subtitle: "Real-Time Ingestion & Asynchronous Orchestration",
    techStack: "Redis Streams · Webhooks · TypeScript Workers",
    description:
      "When work orders, clinical specimens, or court filings arrive, our event engine processes the payload immediately without manual clerk intervention. Asynchronous background workers handle heavy calculations and third-party integrations with automatic retry backoff.",
    specifications: [
      "Sub-15ms webhook ingestion latency at edge nodes",
      "Dead-letter queues with automated alerting on integration exceptions",
      "Dynamic payload validation against strict JSON schemas",
      "Idempotency guarantees preventing duplicate order releases",
    ],
    icon: Cpu,
  },
  {
    number: "03",
    title: "Isolated Dedicated Cloud",
    subtitle: "Zero-Exfiltration Security & High Availability",
    techStack: "Cloudflare Workers · AWS ECS · Single-Tenant Isolation",
    description:
      "We do not host your business on shared multi-tenant SaaS databases where your sensitive client and financial data shares tables with other companies. Every deployment is physically and logically partitioned with dedicated compute and storage.",
    specifications: [
      "99.98% high-availability SLA with multi-region redundancy",
      "Zero-exfiltration security architecture with KMS encryption at rest",
      "Automated daily snapshot backups with point-in-time recovery",
      "Direct IP and repository ownership with zero runtime lock-in",
    ],
    icon: ShieldCheck,
  },
];

export function EngineeringPillarsSection() {
  return (
    <section
      id="engineering"
      aria-labelledby="engineering-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <span>04 // SYSTEM ARCHITECTURE</span>
          </div>
          <h2
            id="engineering-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
          >
            Engineering Foundation Built for Operational Rigor.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
            Bespoke enterprise operating systems require more than polished UI screens. We build
            with institutional-grade database integrity, sub-50ms execution speed, and rigorous
            single-tenant security boundaries.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="flex flex-col justify-between rounded-xl border border-[#0B1320] bg-white p-6 sm:p-8 shadow-xl shadow-[#0B1320]/5 transition-transform duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#C85A17]">
                      PILLAR // {pillar.number}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded bg-[#FDF4ED] text-[#C85A17]">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-black text-[#0B1320]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#4B5563]">{pillar.subtitle}</p>

                  <div className="mt-3 rounded bg-[#FAF8F5] px-2.5 py-1.5 font-mono text-[11px] text-[#0B1320] border border-[#E5E0D8]">
                    STACK: {pillar.techStack}
                  </div>

                  <p className="mt-4 text-sm text-[#4B5563] leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-6 border-t border-[#E5E0D8] pt-4">
                    <span className="font-mono text-[11px] uppercase font-bold text-[#0B1320] block mb-2">
                      Architectural Guarantees:
                    </span>
                    <ul className="space-y-2 font-mono text-xs text-[#4B5563]">
                      {pillar.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-tight">
                          <Check className="size-3.5 shrink-0 text-[#059669] mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#E5E0D8] pt-4 flex items-center justify-between font-mono text-[11px] text-[#4B5563]">
                  <span>ENTERPRISE READY</span>
                  <span className="text-[#059669] font-semibold">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EngineeringPillarsSection;
