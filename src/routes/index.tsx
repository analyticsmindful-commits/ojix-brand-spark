import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OJIX — Describe the problem. We build the system." },
      { name: "description", content: "OJIX turns business problems into working software prototypes, custom ERP systems and AI-powered business applications." },
      { property: "og:title", content: "OJIX — Describe the problem. We build the system." },
      { property: "og:description", content: "AI software engineering: from business problem to working prototype to production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const presets: Record<string, string> = {
  CRM: "Build a CRM for my sales team with leads, follow-ups and pipeline.",
  ERP: "Build an ERP for a construction company with projects, contractors, procurement and payments.",
  Gym: "Build a gym management system with memberships, trainers, attendance and payments.",
  School: "Build a school management platform for students, teachers, attendance and fees.",
};

const worlds = [
  { name: "Legal", items: "Cases · hearings · documents · compliance · billing", bg: "bg-coral text-primary-foreground" },
  { name: "Fitness", items: "Members · plans · trainers · attendance · payments", bg: "bg-sun text-ink" },
  { name: "Education", items: "Students · teachers · attendance · fees · communication", bg: "bg-ocean text-primary-foreground" },
  { name: "Construction", items: "Projects · sites · contractors · procurement · finance", bg: "bg-mint text-ink" },
  { name: "Travel", items: "Bookings · customers · itineraries · vendors · operations", bg: "bg-plum text-primary-foreground" },
];

const steps = [
  ["01", "Describe", "Explain your business in plain language. No technical specification required.", "bg-blush"],
  ["02", "Map", "AI identifies users, workflows, data, roles, bottlenecks and automation opportunities.", "bg-sky"],
  ["03", "Prototype", "OJIX generates an interactive software experience you can explore immediately.", "bg-sun"],
  ["04", "Production", "Our engineers turn the validated prototype into secure, scalable production software.", "bg-mint"],
];

const pipes = [
  ["Lead → Customer", "Automate"],
  ["Quotation → Approval", "Digitize"],
  ["Order → Operations", "Connect"],
  ["Inventory → Procurement", "Predict"],
  ["Invoice → Payment", "Track"],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Builder() {
  const [text, setText] = useState(
    "I run a law firm with 12 advocates. I need to manage cases, hearings, documents, tasks and client billing.",
  );
  const [pct, setPct] = useState(-1);
  const timer = useRef<number | null>(null);
  const labels = ["Understanding your business problem…", "Mapping users & workflows…", "Designing data model…", "Generating interface…", "Prototype ready"];
  const run = () => {
    if (timer.current) clearInterval(timer.current);
    setPct(0);
    timer.current = window.setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(timer.current!); return 100; }
        return p + 4;
      });
    }, 60);
  };
  const appName = text.match(/law|legal/i) ? "Legal OS" : text.match(/gym/i) ? "Fitness OS" : text.match(/school/i) ? "Campus OS" : text.match(/construction|ERP/i) ? "Build OS" : text.match(/CRM|sales/i) ? "Sales OS" : "Business OS";

  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink bg-card text-left shadow-[8px_8px_0_0_var(--ink)]">
      <div className="flex items-center gap-2 border-b-2 border-ink px-4 py-3 font-mono text-xs">
        <span className="size-3 rounded-full bg-coral" /><span className="size-3 rounded-full bg-sun" /><span className="size-3 rounded-full bg-mint" />
        <span className="ml-2 text-muted-foreground">ojix.in / build</span>
      </div>
      <div className="p-5 md:p-7">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3}
          className="w-full resize-none bg-transparent text-xl leading-snug outline-none md:text-2xl" />
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {Object.entries(presets).map(([k, v]) => (
              <button key={k} onClick={() => setText(v)}
                className="rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-sun">{k}</button>
            ))}
          </div>
          <button onClick={run} className="group rounded-full bg-ink px-6 py-3 font-bold text-paper transition hover:bg-coral">
            Generate prototype <span className="inline-block transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
      {pct >= 0 && (
        <div className="border-t-2 border-ink">
          <div className="flex justify-between px-5 py-3 font-mono text-xs">
            <span>{labels[Math.min(4, Math.floor(pct / 25))]}</span><b>{pct}%</b>
          </div>
          <div className="h-2 bg-muted"><div className="h-full bg-coral transition-all" style={{ width: `${pct}%` }} /></div>
          {pct === 100 && (
            <div className="grid animate-fade-in bg-ink text-paper md:grid-cols-[180px_1fr]">
              <aside className="hidden space-y-2 border-r border-paper/15 p-5 text-sm md:block">
                <b className="block pb-2 text-sun">{appName}</b>
                {["Command Center", "Customers", "Operations", "Documents", "Tasks", "Reports"].map((s, i) => (
                  <div key={s} className={i === 0 ? "rounded-md bg-paper/10 px-2 py-1" : "px-2 py-1 opacity-60"}>{s}</div>
                ))}
              </aside>
              <div className="p-5">
                <div className="mb-4 flex justify-between font-mono text-xs"><span>{appName}</span><span className="text-mint">● LIVE PROTOTYPE</span></div>
                <div className="grid grid-cols-3 gap-3">
                  {[["Active work", "128"], ["This month", "₹18.4L"], ["Actions due", "14"]].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-paper/10 p-3"><small className="text-[10px] uppercase opacity-60">{l}</small><b className="block text-xl md:text-2xl">{v}</b></div>
                  ))}
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  {[["New customer onboarding", "On track", "text-mint"], ["Pending approvals", "Review", "text-sun"], ["Documents / tasks", "12 ready", "text-mint"]].map(([a, b, c]) => (
                    <div key={a} className="flex justify-between border-b border-paper/10 py-2"><span>{a}</span><span className={c}>{b}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#" className="text-2xl font-black tracking-tighter">OJ<span className="text-coral">IX</span></a>
          <nav className="hidden gap-8 text-sm font-semibold md:flex">
            {[["Products", "#products"], ["How it works", "#how"], ["Business X-Ray", "#xray"], ["Engineering", "#engineering"]].map(([l, h]) => (
              <a key={h} href={h} className="story-link">{l}</a>
            ))}
          </nav>
          <a href="#build" className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:bg-coral">Build with OJIX</a>
        </div>
      </header>

      {/* Hero */}
      <section id="build" className="mx-auto max-w-7xl px-5 pb-20 pt-14 md:pt-24">
        <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em]"><span className="mr-2 inline-block size-2 rounded-full bg-coral" />AI Software Engineering</p>
        <h1 className="font-display text-[15vw] font-black leading-[0.85] tracking-[-0.06em] md:text-[9.5rem]">
          {["Describe the", "problem."].map((l, i) => (
            <span key={l} className="block overflow-hidden"><span className="block animate-rise" style={{ animationDelay: `${i * 0.1}s` }}>{l}</span></span>
          ))}
          <span className="block overflow-hidden"><span className="block animate-rise text-coral" style={{ animationDelay: "0.2s" }}>We build<span className="animate-blink">_</span></span></span>
          <span className="block overflow-hidden"><span className="block animate-rise text-coral" style={{ animationDelay: "0.3s" }}>the system.</span></span>
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
          <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
            Tell OJIX how your business works. Our AI turns the problem into a working software prototype — then our engineering team takes it to production.
          </p>
          <Builder />
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-ink bg-sun py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-3xl font-black uppercase tracking-tight md:text-5xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Custom ERP", "✦", "AI Automation", "✦", "Prototypes", "✦", "Cloud Engineering", "✦", "Business X-Ray", "✦"].map((w, i) => <span key={`${k}-${i}`}>{w}</span>),
          )}
        </div>
      </div>

      {/* Worlds — expanding tiles */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-24">
        <div className="reveal mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">Software that understands your industry.</h2>
          <p className="max-w-md text-lg text-muted-foreground">One intelligence layer. Five worlds. Start from a proven product — or describe exactly what your organization needs.</p>
        </div>
        <div className="reveal flex h-[560px] flex-col gap-2 md:h-[440px] md:flex-row">
          {worlds.map((w, i) => (
            <button key={w.name} onMouseEnter={() => setOpen(i)} onClick={() => setOpen(i)}
              className={`${w.bg} relative flex overflow-hidden rounded-xl p-6 text-left transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${open === i ? "flex-[5]" : "flex-1"}`}>
              <span className="absolute right-5 top-5 font-mono text-xs">0{i + 1}</span>
              <div className="mt-auto">
                <h3 className={`font-black tracking-tight transition-all duration-700 ${open === i ? "text-4xl md:text-6xl" : "text-xl md:[writing-mode:vertical-rl] md:rotate-180"}`}>{w.name}</h3>
                <p className={`mt-3 max-w-xs text-base transition-opacity duration-500 ${open === i ? "opacity-100 delay-300" : "hidden opacity-0"}`}>{w.items}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="border-t-2 border-ink bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-5">
          <p className="reveal mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sun">The OJIX method</p>
          <h2 className="reveal mb-14 max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">From messy problem to working software.</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map(([n, t, d, bg], i) => (
              <div key={n} className={`reveal ${bg} group rounded-xl p-6 text-ink transition duration-300 hover:-translate-y-2 hover:rotate-[-1deg]`} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="font-mono text-xs">{n}</span>
                <h3 className="mb-16 mt-2 text-3xl font-black tracking-tight">{t}</h3>
                <p className="text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* X-Ray */}
      <section id="xray" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center">
        <div className="reveal">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-coral">Business X-Ray</p>
          <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">Your business already has a system. It's hiding in Excel, WhatsApp and email.</h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Upload a spreadsheet, describe your workflow, or show us how work happens today. OJIX maps the process and finds what can become a unified operating system.</p>
          <a href="#build" className="mt-8 inline-block rounded-full bg-coral px-6 py-3 font-bold text-primary-foreground transition hover:bg-ink">Run a Business X-Ray →</a>
        </div>
        <div className="reveal rounded-xl border-2 border-ink bg-sky p-6 shadow-[8px_8px_0_0_var(--ink)] md:p-8">
          <div className="mb-4 flex justify-between font-mono text-xs"><span>OJIX BUSINESS X-RAY</span><span>ANALYSIS COMPLETE</span></div>
          <h3 className="mb-6 text-3xl font-black tracking-tight">17 workflow opportunities found.</h3>
          <div className="space-y-2">
            {pipes.map(([a, b]) => (
              <div key={a} className="group flex items-center justify-between rounded-lg border-2 border-ink bg-card px-4 py-3 transition hover:translate-x-2 hover:bg-sun">
                <b>{a}</b><span className="rounded-full bg-ink px-3 py-1 font-mono text-xs text-paper">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering */}
      <section id="engineering" className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="reveal mb-14 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl">When the prototype proves the idea, we engineer the real thing.</h2>
        <div className="grid border-2 border-ink md:grid-cols-3">
          {[["Custom ERP", "Purpose-built operating systems for workflows off-the-shelf software can't model properly.", "hover:bg-coral hover:text-primary-foreground"],
            ["AI Automation", "AI agents, document intelligence, extraction, decision support and workflow automation.", "hover:bg-sun"],
            ["Cloud Engineering", "Secure, scalable applications on modern cloud infrastructure, APIs, data and observability.", "hover:bg-mint"]].map(([t, d, h], i) => (
            <div key={t} className={`reveal border-ink p-8 transition-colors duration-300 ${h} ${i < 2 ? "border-b-2 md:border-b-0 md:border-r-2" : ""}`}>
              <span className="font-mono text-xs">0{i + 1}</span>
              <h3 className="mb-20 mt-2 text-3xl font-black tracking-tight">{t}</h3>
              <p className="leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-10">
        <div className="reveal mx-auto max-w-7xl rounded-xl bg-coral p-10 text-primary-foreground md:p-16">
          <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-8xl">Have a business problem worth solving?</h2>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg">Start with the problem. Explore the prototype. If it makes sense, OJIX takes it from concept to production.</p>
            <a href="#build" className="rounded-full bg-ink px-8 py-4 text-center font-bold text-paper transition hover:scale-105">Describe your problem →</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-10 font-mono text-xs text-muted-foreground md:flex-row">
        <span>© 2026 OJIX Engineering & Technology LLP</span><span>AI · ERP · Software Engineering</span>
      </footer>
    </div>
  );
}
