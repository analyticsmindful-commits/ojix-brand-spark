import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Calendar, Clock, Lock } from "lucide-react";

export function FinalCtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    operationalProblem: "",
    activeTools: "Excel + WhatsApp",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="extraction"
      aria-labelledby="cta-heading"
      className="border-b border-[#E5E0D8] bg-[#0B1320] py-20 lg:py-28 text-white selection:bg-[#C85A17] selection:text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Conviction & Terms */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
              <span>INITIATE OPERATIONAL EXTRACTION</span>
            </div>

            <h2
              id="cta-heading"
              className="font-display text-fluid-h2 font-extrabold tracking-tight text-white leading-tight"
            >
              Have a Mission-Critical Workflow Worth Solving in Code?
            </h2>

            <p className="font-sans text-fluid-body text-slate-300 leading-relaxed">
              Skip junior sales reps and 4-week qualification loops. Schedule a 45-minute direct
              technical scoping session with a Senior Systems Architect. We will review your active
              spreadsheets, map your operational bottlenecks, and outline your production blueprint.
            </p>

            <div className="space-y-3 pt-2 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Calendar className="size-4 text-[#C85A17]" />
                <span>Direct calendar booking with senior engineering leadership</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="size-4 text-[#C85A17]" />
                <span>Mutual NDA executed prior to reviewing sensitive company spreadsheets</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 text-[#C85A17]" />
                <span>Working prototype delivered within 18 days of blueprint signoff</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs font-mono text-slate-400">
              <span className="text-white font-semibold block mb-1">FOUNDER INGRESS:</span>
              <span>Prefer direct correspondence? Email </span>
              <a href="mailto:engineering@ojix.in" className="text-[#C85A17] hover:underline">
                engineering@ojix.in
              </a>
              <span> with a description of your business problem.</span>
            </div>
          </div>

          {/* Right Column: Interactive Scoping Intake Card */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-white/20 bg-[#121C2D] p-6 sm:p-8 shadow-2xl text-left">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#059669]/20 text-[#059669]">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Extraction Request Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    A Senior Systems Architect has received your operational parameters. We will
                    transmit a Mutual NDA and calendar invite to <strong>{formData.email}</strong>{" "}
                    within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 font-mono text-xs text-[#C85A17] hover:underline"
                  >
                    ← Submit additional parameters
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      Technical Extraction Intake
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                      <Lock className="size-3" />
                      ENCRYPTED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="operator-name"
                        className="block font-mono text-[11px] font-semibold text-slate-300 uppercase mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="operator-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#C85A17] focus:outline-none focus:ring-1 focus:ring-[#C85A17]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="operator-email"
                        className="block font-mono text-[11px] font-semibold text-slate-300 uppercase mb-1"
                      >
                        Direct Work Email *
                      </label>
                      <input
                        id="operator-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@organization.com"
                        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#C85A17] focus:outline-none focus:ring-1 focus:ring-[#C85A17]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="operator-company"
                        className="block font-mono text-[11px] font-semibold text-slate-300 uppercase mb-1"
                      >
                        Organization / Industry
                      </label>
                      <input
                        id="operator-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Distribution / Freight"
                        className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#C85A17] focus:outline-none focus:ring-1 focus:ring-[#C85A17]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="operator-tools"
                        className="block font-mono text-[11px] font-semibold text-slate-300 uppercase mb-1"
                      >
                        Current Primary Tools
                      </label>
                      <select
                        id="operator-tools"
                        value={formData.activeTools}
                        onChange={(e) => setFormData({ ...formData, activeTools: e.target.value })}
                        className="w-full rounded border border-white/15 bg-[#0B1320] px-3 py-2 text-sm text-white focus:border-[#C85A17] focus:outline-none focus:ring-1 focus:ring-[#C85A17]"
                      >
                        <option value="Excel + WhatsApp">Excel Workbooks + WhatsApp</option>
                        <option value="Rigid Commercial SaaS">
                          Rigid Commercial SaaS (Salesforce/SAP)
                        </option>
                        <option value="Paper Travelers + Clipboards">
                          Paper Travelers + Manual Handover
                        </option>
                        <option value="Legacy On-Premise System">
                          Legacy On-Premise Custom Software
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="operator-problem"
                      className="block font-mono text-[11px] font-semibold text-slate-300 uppercase mb-1"
                    >
                      Describe The Operational Failure Mode
                    </label>
                    <textarea
                      id="operator-problem"
                      rows={3}
                      value={formData.operationalProblem}
                      onChange={(e) =>
                        setFormData({ ...formData, operationalProblem: e.target.value })
                      }
                      placeholder="e.g. 18 partner attorneys hand off litigation files over WhatsApp and spreadsheet billing reconciliations leak $30k/month in unbilled statutory deadlines..."
                      className="w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#C85A17] focus:outline-none focus:ring-1 focus:ring-[#C85A17] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-magnetic="true"
                    className="w-full flex min-h-[48px] items-center justify-center gap-2 rounded bg-[#C85A17] px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#B34E13] active:scale-[0.98] press-spring"
                  >
                    <span>Schedule 45-Min Technical Scoping</span>
                    <ArrowRight className="size-4" />
                  </button>

                  <p className="font-mono text-[10px] text-center text-slate-400">
                    Mutual Non-Disclosure Agreement dispatched prior to technical dialogue.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
