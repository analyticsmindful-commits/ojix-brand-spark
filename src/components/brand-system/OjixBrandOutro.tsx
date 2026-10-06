import React, { useState } from "react";
import { ArrowUpRight, ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CursorTag {
  name: string;
  role: string;
  client: string;
  color: string;
  bg: string;
  initialX: number; // percentage
  initialY: number; // percentage
}

const COLLABORATOR_CURSORS: CursorTag[] = [
  {
    name: "Deepak R.",
    role: "Founder & Lead Systems Architect",
    client: "OJIX Engineering",
    color: "#FFFFFF",
    bg: "#C85A17",
    initialX: 12,
    initialY: 28,
  },
  {
    name: "Jain Anveshana",
    role: "Legal Discovery & Research Lead",
    client: "Jain Anveshana",
    color: "#FFFFFF",
    bg: "#0B1320",
    initialX: 68,
    initialY: 22,
  },
  {
    name: "BSG Karnataka",
    role: "State Portal Operations Director",
    client: "BSG Karnataka",
    color: "#0B1320",
    bg: "#FCD34D",
    initialX: 25,
    initialY: 72,
  },
  {
    name: "BNN Family Law",
    role: "Senior Litigation Partner",
    client: "BNN Law Chambers",
    color: "#FFFFFF",
    bg: "#059669",
    initialX: 78,
    initialY: 65,
  },
  {
    name: "GVS Law Chambers",
    role: "Managing Corporate Arbitration Counsel",
    client: "GVS Chambers",
    color: "#FFFFFF",
    bg: "#1E293B",
    initialX: 42,
    initialY: 18,
  },
  {
    name: "Ramees Enterprises",
    role: "Multi-Warehouse Logistics VP",
    client: "Ramees Group",
    color: "#0B1320",
    bg: "#E5E0D8",
    initialX: 84,
    initialY: 38,
  },
  {
    name: "Worexa",
    role: "Enterprise Cloud Architect",
    client: "Worexa Digital",
    color: "#FFFFFF",
    bg: "#6366F1",
    initialX: 18,
    initialY: 48,
  },
  {
    name: "Nele Architecture",
    role: "Spatial BIM Infrastructure Lead",
    client: "Nele Studio",
    color: "#FFFFFF",
    bg: "#D97706",
    initialX: 55,
    initialY: 78,
  },
];

export function OjixBrandOutro() {
  const [activeCursor, setActiveCursor] = useState<number | null>(null);
  const [isHoveringCredits, setIsHoveringCredits] = useState(false);

  return (
    <section
      id="brand-outro"
      aria-label="OJIX Systems Outro and Partner Collaboration Canvas"
      className="relative w-full border-t border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 overflow-hidden select-none"
    >
      {/* Precision Perimeter Hairline Grid Lines (Dropbox Brand Outro Style) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-6 right-6 top-6 bottom-6 border border-[#E5E0D8] hidden sm:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E5E0D8]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Charles Eames Quote Block */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#C85A17] mb-4">
            <span className="size-2 rounded-full bg-[#C85A17]" />
            THE OJIX ENGINEERING CONVICTION
          </div>

          <blockquote className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B1320] leading-tight text-balance">
            <span className="text-[#C85A17] font-serif mr-2 text-3xl sm:text-5xl">“</span>
            The details are not the details. They make the architecture.
            <span className="text-[#C85A17] font-serif ml-2 text-3xl sm:text-5xl">”</span>
          </blockquote>

          <cite className="mt-4 block font-mono text-xs sm:text-sm text-[#4B5563] not-italic">
            — Adapted from Charles Eames · The OJIX Systems Manifesto
          </cite>
        </div>

        {/* Narrative & Practical Toolkit Call */}
        <div className="mx-auto mt-10 max-w-3xl text-center text-base sm:text-lg text-[#4B5563] leading-relaxed">
          <p>
            These guidelines and operating systems are engineered to eliminate manual WhatsApp
            dispatch leaks, fragmented Excel sheets, and unverified data transfers. What we build is
            a living operational toolkit for high-stakes enterprises.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Deployed live across 8 enterprise partners in legal litigation, state logistics, and
            distributed multi-warehouse commerce.
          </p>
        </div>

        {/* Floating Collaborative Multi-User Cursors Canvas (Dropbox Brand Outro Cursors) */}
        <div
          onMouseEnter={() => setIsHoveringCredits(true)}
          onMouseLeave={() => setIsHoveringCredits(false)}
          className="relative mx-auto my-12 h-64 sm:h-72 w-full max-w-4xl rounded-xl border border-[#E5E0D8] bg-white/70 p-6 backdrop-blur-xs transition-colors hover:border-[#C85A17] overflow-hidden"
          aria-label="Active partner and engineer collaborative cursor canvas"
        >
          <div className="absolute top-3 left-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            ACTIVE ENTERPRISE SESSIONS &amp; REPOSITORIES
          </div>

          {/* Interactive Floating Cursor Tags */}
          {COLLABORATOR_CURSORS.map((cursor, idx) => {
            const isSelected = activeCursor === idx;
            // Shift on hover
            const offsetX = isHoveringCredits ? (idx % 2 === 0 ? 8 : -8) : 0;
            const offsetY = isHoveringCredits ? (idx % 3 === 0 ? -10 : 10) : 0;

            return (
              <div
                key={cursor.name}
                onMouseEnter={() => setActiveCursor(idx)}
                onMouseLeave={() => setActiveCursor(null)}
                className="absolute flex items-start gap-1.5 transition-all duration-700 ease-out cursor-pointer"
                style={{
                  left: `calc(${cursor.initialX}% + ${offsetX}px)`,
                  top: `calc(${cursor.initialY}% + ${offsetY}px)`,
                  transform: isSelected ? "scale(1.08)" : "scale(1)",
                  zIndex: isSelected ? 30 : 10,
                }}
              >
                {/* SVG Pointer Cursor */}
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 transition-transform duration-300 drop-shadow-xs"
                  style={{
                    color: cursor.bg,
                    transform: isSelected ? "rotate(-10deg) scale(1.1)" : "rotate(0deg)",
                  }}
                  fill="currentColor"
                >
                  <path d="M0 0 L14 5.5 L7.5 7.5 L5.5 14 Z" stroke="#FFFFFF" strokeWidth="1" />
                </svg>

                {/* Badge Tag */}
                <div
                  className="rounded px-2 py-0.5 font-mono text-[10px] font-bold shadow-xs whitespace-nowrap transition-shadow"
                  style={{
                    backgroundColor: cursor.bg,
                    color: cursor.color,
                  }}
                >
                  <span>{cursor.name}</span>
                  <span className="ml-1 opacity-75 hidden sm:inline">· {cursor.client}</span>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-3 right-4 font-mono text-[10px] text-slate-400">
            HOVER TO INSPECT COLLABORATIVE TOPOLOGY
          </div>
        </div>

        {/* Action Toolkit Links (Dropbox Brand Outro Links) */}
        <div className="mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-[#E5E0D8]">
          <a
            href="#extraction"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#C85A17] px-6 py-2.5 font-mono text-xs font-bold text-white transition-all hover:bg-[#B34E12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] shadow-sm"
          >
            <ShieldCheck className="size-4" />
            <span>Schedule 30-Min Architecture Audit</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          <a
            href="mailto:engineering@ojix.in"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#0B1320] bg-white px-5 py-2.5 font-mono text-xs font-bold text-[#0B1320] transition-all hover:bg-[#0B1320] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1320]"
          >
            <Mail className="size-4 text-[#C85A17]" />
            <span>Founder Ingress: engineering@ojix.in</span>
          </a>

          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-white px-4 py-2.5 font-mono text-xs font-semibold text-[#4B5563] transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
          >
            <FileText className="size-3.5" />
            <span>Mutual NDA &amp; IP Protection</span>
          </a>
        </div>
      </div>
    </section>
  );
}
