import { ArrowUpRight } from "lucide-react";

export const FOOTER_SITEMAP = {
  blueprints: [
    { label: "Legal OS (Litigation & Billing)", href: "#portfolio" },
    { label: "Enterprise ERP (Multi-Entity Ledger)", href: "#portfolio" },
    { label: "Clinical Logistics (Specimen SLA)", href: "#portfolio" },
    { label: "Supply Chain Nexus (Reconciliation)", href: "#portfolio" },
    { label: "Operational X-Ray (Spreadsheet Audit)", href: "#xray" },
  ],
  engineering: [
    { label: "Engineering Methodology", href: "#methodology" },
    { label: "Deterministic State Machines", href: "#engineering" },
    { label: "Event-Sourced Ledgers", href: "#engineering" },
    { label: "WhatsApp & Excel Extraction", href: "#xray" },
    { label: "System FAQ & Architecture", href: "#faq" },
  ],
  institutional: [
    { label: "OJIX Engineering & Technology LLP", href: "#top" },
    { label: "Mutual NDA & IP Protection", href: "#extraction" },
    { label: "Enterprise Security Architecture", href: "#engineering" },
    { label: "Schedule Architecture Review", href: "#extraction" },
    { label: "Founder Ingress: engineering@ojix.in", href: "mailto:engineering@ojix.in" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-t border-[#E5E0D8] bg-[#0B1320] text-white selection:bg-[#C85A17] selection:text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Institutional Branding & Overview (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-black tracking-tight text-white">
                OJ<span className="text-[#C85A17]">IX</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400 border-l border-white/20 pl-3">
                STUDIO
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C85A17]">
                OJIX Engineering & Technology LLP
              </p>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Independent enterprise software studio. We design, architect, and deploy custom
                operating systems for mid-market organizations that have outgrown spreadsheets,
                unmonitored WhatsApp dispatch, and off-the-shelf SaaS.
              </p>
            </div>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>RUNTIME STATUS: ALL SYSTEMS NOMINAL</span>
            </div>
          </div>

          {/* System Blueprints (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C85A17]">
              System Blueprints
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SITEMAP.blueprints.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex items-center text-slate-300 transition-colors hover:text-white"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Methodology (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C85A17]">
              Engineering Core
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SITEMAP.engineering.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex items-center text-slate-300 transition-colors hover:text-white"
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional & Legal (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C85A17]">
              Engagement & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SITEMAP.institutional.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex items-center text-slate-300 transition-colors hover:text-white"
                  >
                    <span>{item.label}</span>
                    {item.href.startsWith("http") || item.href.startsWith("mailto") ? (
                      <ArrowUpRight className="ml-1 size-3 text-slate-500" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Telemetry Readout Bar */}
        <div className="my-12 border-y border-white/10 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 font-mono text-xs text-slate-400">
            <div>
              <span className="block text-[10px] uppercase text-slate-500">Target Latency</span>
              <span className="font-semibold text-slate-200">Sub-50ms Edge Execution</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-500">Runtime SLA</span>
              <span className="font-semibold text-slate-200">99.98% High Availability</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-500">Security Boundary</span>
              <span className="font-semibold text-slate-200">Zero-Exfiltration Isolation</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-500">Cloud Target</span>
              <span className="font-semibold text-slate-200">Cloudflare Workers / AWS ECS</span>
            </div>
          </div>
        </div>

        {/* Legal Copyright Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 OJIX Engineering & Technology LLP. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>Enterprise Software Studio</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              BUILD: 2026.10-PROD
            </span>
            <a
              href="#top"
              className="inline-flex items-center text-slate-300 transition-colors hover:text-white"
            >
              <span>TOP</span>
              <ArrowUpRight className="ml-0.5 size-3 -rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
