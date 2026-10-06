import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "Why build a custom operating system instead of buying off-the-shelf SaaS?",
    answer:
      "Commercial SaaS is designed for the lowest common denominator. When your competitive advantage stems from proprietary routing logic, non-standard manufacturing tolerances, or specific legal trust compliance rules, commercial SaaS forces you to compromise. Operators end up exporting data back into spreadsheets to get real work done. OJIX builds software directly mapped to your exact operational mechanics, eliminating workarounds entirely.",
  },
  {
    id: "f2",
    question: "How long does an extraction-to-production sprint take?",
    answer:
      "A typical OJIX engagement delivers a functional, interactive prototype on a secure staging environment within 14 to 18 days. Production deployment to dedicated cloud infrastructure with data migration takes an additional 12 to 14 days. You are running live production workloads within 30 calendar days, rather than enduring multi-year enterprise consultancy delays.",
  },
  {
    id: "f3",
    question: "Who owns the code repository, database schemas, and intellectual property?",
    answer:
      "You do. From day one, under a binding Mutual NDA and Software Services Agreement, 100% of custom application code, schema definitions, migration scripts, and architecture blueprints are transferred exclusively to your organization. There are zero per-seat licensing penalties and zero vendor lock-in.",
  },
  {
    id: "f4",
    question: "How do you extract data from our current Excel spreadsheets and WhatsApp chats?",
    answer:
      "During our Phase 01 Forensic Extraction, we analyze your active Excel workbooks, Google Sheets, CSV exports, and message logs. We build automated data ingestion parsers with strict type validation to clean, deduplicate, and normalize historical records into a relational PostgreSQL schema before production release.",
  },
  {
    id: "f5",
    question: "What happens if our business processes change after deployment?",
    answer:
      "Because our systems are built with modular TypeScript services, Drizzle ORM schemas, and deterministic state machines, extending a workflow or adding a new operational gate is clean and predictable. We provide continuous architectural support and retainer maintenance, or hand off complete documentation to your internal IT team.",
  },
  {
    id: "f6",
    question: "What are your infrastructure and security SLAs?",
    answer:
      "We target 99.98% high availability deployed on enterprise cloud runtimes (Cloudflare Workers, AWS ECS, Neon). Data is encrypted in transit via TLS 1.3 and at rest with customer-managed KMS keys. Every client environment is logically and physically isolated with zero shared multi-tenant database access.",
  },
];

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["f1"]));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320]"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <span>05 // ARCHITECTURAL TEARDOWN & FAQS</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
          >
            Direct Answers for Pragmatic Operators.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
            No sales scripts, buzzwords, or hand-waving. Here is how OJIX works with high-throughput
            organizations that need dependable, proprietary software.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-[#E5E0D8] bg-white transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[56px] w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-[#FAF8F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17]"
                >
                  <span className="font-sans text-base sm:text-lg font-bold text-[#0B1320] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded border border-[#E5E0D8] bg-[#FAF8F5] text-[#0B1320] transition-transform duration-200",
                      isOpen && "rotate-180 bg-[#C85A17] text-white border-[#C85A17]",
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E5E0D8] bg-[#FAF8F5]/50 px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base leading-relaxed text-[#4B5563]">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
