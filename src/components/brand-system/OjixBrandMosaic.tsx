import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface OjixBrandMosaicProps {
  className?: string;
  onTileClick?: (tileId: string) => void;
}

export function OjixBrandMosaic({ className, onTileClick }: OjixBrandMosaicProps) {
  // Tile 5 (Lock / Security) state
  const [isLocked, setIsLocked] = useState(true);

  // Tile 6 (Color) copy feedback
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Tile 7 (Imagery / Solar) day/night state
  const [isNightMode, setIsNightMode] = useState(false);

  const handleCopyColor = (e: React.MouseEvent, colorCode: string) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(colorCode);
      setCopiedColor(colorCode);
      setTimeout(() => setCopiedColor(null), 1800);
    }
  };

  return (
    <section
      id="brand-matrix"
      aria-label="OJIX Brand Guidelines and System Architecture Matrix"
      className={cn(
        "relative w-full border-b border-[#E5E0D8] bg-[#FAF8F5] text-[#0B1320] transition-colors py-12 md:py-20",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Anchor / Header */}
        <div className="mb-10 lg:mb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#E5E0D8]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#C85A17] mb-3">
                <span className="inline-block size-2 rounded-full bg-[#C85A17]" />
                OJIX BRAND &amp; OPERATING SYSTEM MATRIX
              </div>
              <h2 className="text-fluid-h2 font-black tracking-tight text-[#0B1320]">
                Built with identity, governed by code.
              </h2>
              <p className="mt-3 text-base md:text-lg text-[#4B5563] leading-relaxed">
                At OJIX, our design system and system architecture are unified. From kinetic
                topologies to deterministic color tokens, every module infuses high-stakes enterprise
                infrastructure with uncompromising clarity.
              </p>
            </div>

            {/* Quick-Jump Section Navigation */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#4B5563]">
              <span className="text-[11px] font-semibold text-[#0B1320] uppercase tracking-wider mr-1">
                INDEX:
              </span>
              <a
                href="#portfolio"
                className="rounded border border-[#E5E0D8] bg-white px-2.5 py-1 text-slate-700 transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                01 Framework
              </a>
              <a
                href="#manifesto"
                className="rounded border border-[#E5E0D8] bg-white px-2.5 py-1 text-slate-700 transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                02 Conviction
              </a>
              <a
                href="#products"
                className="rounded border border-[#E5E0D8] bg-white px-2.5 py-1 text-slate-700 transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                03 Identity
              </a>
              <a
                href="#sectors"
                className="rounded border border-[#E5E0D8] bg-white px-2.5 py-1 text-slate-700 transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                07 Sectors
              </a>
              <a
                href="#engineering"
                className="rounded border border-[#E5E0D8] bg-white px-2.5 py-1 text-slate-700 transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
              >
                08 Motion
              </a>
            </div>
          </div>
        </div>

        {/* The 8-Tile Architectural Grid (Dropbox Brand Inspired Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* TILE 1: FRAMEWORK & TOPOLOGY */}
          <a
            href="#portfolio"
            onClick={() => onTileClick?.("framework")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Framework & Topology: View interactive workflow architecture"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                01 / FRAMEWORK
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                DAG TOPOLOGY
              </span>
            </div>

            {/* Interactive Bezier Topology Illustration */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <svg
                viewBox="0 0 200 100"
                className="h-full w-full stroke-current"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Background Grid Accent Lines */}
                <line
                  x1="0"
                  y1="50"
                  x2="200"
                  y2="50"
                  strokeWidth="0.5"
                  className="stroke-slate-200 group-hover:stroke-white/10"
                  strokeDasharray="2 2"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="100"
                  strokeWidth="0.5"
                  className="stroke-slate-200 group-hover:stroke-white/10"
                  strokeDasharray="2 2"
                />

                {/* Primary Bezier Curve */}
                <path
                  d="M 15 75 Q 60 15, 100 50 T 185 25"
                  className="stroke-[#C85A17] group-hover:stroke-white transition-all duration-500"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Secondary Ghost Curve on Hover */}
                <path
                  d="M 15 75 Q 85 85, 100 50 T 185 25"
                  className="stroke-[#C85A17]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />

                {/* Draggable/Interactive Control Points */}
                <circle
                  cx="15"
                  cy="75"
                  r="5"
                  className="fill-[#C85A17] group-hover:fill-white transition-transform duration-300 group-hover:scale-125"
                />
                <circle
                  cx="100"
                  cy="50"
                  r="6"
                  className="fill-white stroke-[#C85A17] group-hover:stroke-white group-hover:fill-[#C85A17] stroke-2 transition-transform duration-300 group-hover:scale-125"
                />
                <circle
                  cx="185"
                  cy="25"
                  r="5"
                  className="fill-[#C85A17] group-hover:fill-white transition-transform duration-300 group-hover:scale-125"
                />

                {/* Traveling Pulse Node */}
                <circle
                  cx="100"
                  cy="50"
                  r="2"
                  className="fill-[#C85A17] group-hover:fill-white animate-ping opacity-75"
                />
              </svg>
            </div>

            {/* Tile Description & Link */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                Event-Sourced Topology
              </h3>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Deterministic DAG nodes replace fragile cascading spreadsheet scripts.
              </p>
              <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold text-[#C85A17] group-hover:text-[#FAF8F5]">
                <span>Inspect Blueprints</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* TILE 2: VOICE & TONE / CONVICTION */}
          <a
            href="#manifesto"
            onClick={() => onTileClick?.("manifesto")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Voice and Tone: Founder Operating Conviction"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                02 / VOICE &amp; TONE
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                ANTI-AI MANIFESTO
              </span>
            </div>

            {/* Interactive Translating Quotation Marks */}
            <div className="relative my-6 flex h-36 w-full items-center justify-between px-4">
              <span
                className="font-serif text-6xl font-black text-[#C85A17] transition-all duration-500 ease-out group-hover:-translate-x-3 group-hover:scale-110 group-hover:text-white select-none"
                aria-hidden="true"
              >
                “
              </span>
              <div className="text-center px-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#4B5563] group-hover:text-slate-300">
                  Zero Fluff
                </span>
                <div className="my-1 h-px w-12 mx-auto bg-[#C85A17] group-hover:bg-white/40" />
                <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-400">
                  Pure Code &amp; SLA
                </span>
              </div>
              <span
                className="font-serif text-6xl font-black text-[#C85A17] transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:scale-110 group-hover:text-white select-none"
                aria-hidden="true"
              >
                ”
              </span>
            </div>

            {/* Tile Description & Link */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                Deterministic Conviction
              </h3>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Human-crafted software principles free from generic AI cliches.
              </p>
              <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold text-[#C85A17] group-hover:text-[#FAF8F5]">
                <span>Read Operating Manifesto</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* TILE 3: LOGO & IDENTITY */}
          <a
            href="#top"
            onClick={() => onTileClick?.("logo")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Logo and Identity: The OJIX Architectural Brandmark"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                03 / IDENTITY
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                MONOGRAM SYSTEM
              </span>
            </div>

            {/* Kinetic Vector Monogram Illustration */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <svg viewBox="0 0 100 100" className="size-24 transition-transform duration-500 group-hover:scale-110">
                {/* Outer Architectural Diamond Grid */}
                <rect
                  x="20"
                  y="20"
                  width="60"
                  height="60"
                  rx="6"
                  className="fill-none stroke-[#E5E0D8] group-hover:stroke-white/20 transition-colors"
                  strokeWidth="1.5"
                />

                {/* Precision Monogram Geometry */}
                <path
                  d="M 30 50 L 50 30 L 70 50 L 50 70 Z"
                  className="fill-none stroke-[#C85A17] group-hover:stroke-white transition-all duration-300"
                  strokeWidth="2.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="6"
                  className="fill-[#C85A17] group-hover:fill-white transition-colors duration-300"
                />

                {/* Corner Crosshairs */}
                <path
                  d="M 20 25 L 20 20 L 25 20 M 75 20 L 80 20 L 80 25 M 80 75 L 80 80 L 75 80 M 25 80 L 20 80 L 20 75"
                  className="stroke-[#C85A17] group-hover:stroke-white/60 transition-colors"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Tile Description & Link */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                Kinetic Brand Geometry
              </h3>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Mathematical precision grid engineered for cross-device visibility.
              </p>
              <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold text-[#C85A17] group-hover:text-[#FAF8F5]">
                <span>Brand Standards</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* TILE 4: TYPOGRAPHY */}
          <a
            href="#methodology"
            onClick={() => onTileClick?.("typography")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Typography: Fluid Clamp Hierarchy and Data Scales"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                04 / TYPOGRAPHY
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                FLUID SCALES
              </span>
            </div>

            {/* Morphing Typography Display */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <div className="flex items-baseline gap-2 select-none">
                <span className="font-display text-5xl font-black text-[#C85A17] group-hover:text-white transition-all duration-500 group-hover:tracking-wider">
                  O
                </span>
                <span className="font-display text-4xl font-light text-[#0B1320] group-hover:text-slate-300 transition-all duration-500 group-hover:font-extrabold">
                  J
                </span>
                <span className="font-mono text-3xl font-normal text-[#4B5563] group-hover:text-white transition-all duration-500">
                  I
                </span>
                <span className="font-display text-6xl font-bold text-[#C85A17] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  X
                </span>
              </div>
            </div>

            {/* Tile Description & Link */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                Deterministic Type Scales
              </h3>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Strict fluid clamp typography guaranteed zero horizontal scroll breaking.
              </p>
              <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold text-[#C85A17] group-hover:text-[#FAF8F5]">
                <span>Type Architecture</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>

          {/* TILE 5: ICONOGRAPHY & ZERO-TRUST SECURITY */}
          <div
            onClick={() => setIsLocked(!isLocked)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsLocked(!isLocked);
              }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px] cursor-pointer"
            aria-label={`Security: Zero-trust cryptographic vault is currently ${isLocked ? "locked" : "unlocked"}. Click to toggle.`}
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                05 / SECURITY
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                ZERO-EXFILTRATION
              </span>
            </div>

            {/* Interactive Padlock Shackle Vector */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <svg viewBox="0 0 100 120" className="size-20">
                {/* Lock Shackle */}
                <path
                  d={
                    isLocked
                      ? "M 32 45 V 26 C 32 15 68 15 68 26 V 45"
                      : "M 32 30 V 12 C 32 2 68 2 68 12 V 22"
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-300 ease-out",
                    isLocked
                      ? "text-[#C85A17] group-hover:text-white"
                      : "text-emerald-500 group-hover:text-emerald-400",
                  )}
                />

                {/* Lock Body */}
                <rect
                  x="20"
                  y="45"
                  width="60"
                  height="50"
                  rx="6"
                  className="fill-[#0B1320] group-hover:fill-white/10 stroke-[#C85A17] group-hover:stroke-white stroke-2 transition-colors"
                />

                {/* Keyhole */}
                <circle cx="50" cy="65" r="4" className="fill-white group-hover:fill-[#C85A17]" />
                <path
                  d="M 48 67 L 46 80 L 54 80 L 52 67 Z"
                  className="fill-white group-hover:fill-[#C85A17]"
                />
              </svg>
            </div>

            {/* Tile Description & State */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                  Zero-Trust Vault
                </h3>
                <span
                  className={cn(
                    "font-mono text-[10px] font-bold px-2 py-0.5 rounded",
                    isLocked
                      ? "bg-amber-100 text-amber-900 group-hover:bg-amber-900/40 group-hover:text-amber-200"
                      : "bg-emerald-100 text-emerald-900 group-hover:bg-emerald-900/40 group-hover:text-emerald-200",
                  )}
                >
                  {isLocked ? "SEALED · AES-256" : "DECRYPTED (EDGE)"}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Click lock to simulate isolated cryptographic boundary verification.
              </p>
            </div>
          </div>

          {/* TILE 6: CHROMATICS & COLOR MATRIX */}
          <div
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Color Matrix: Burnt Terracotta, Deep Obsidian and Warm Paper"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                06 / CHROMATICS
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                PALETTE TOKENS
              </span>
            </div>

            {/* Sliding Dual Color Block Mechanism (Dropbox Brand Style) */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <div className="flex w-full max-w-[200px] h-20 overflow-hidden rounded border border-slate-200 group-hover:border-white/20">
                {/* Block 1: Burnt Terracotta */}
                <div
                  onClick={(e) => handleCopyColor(e, "#C85A17")}
                  className="relative flex-1 bg-[#C85A17] flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 cursor-pointer"
                  title="Click to copy #C85A17"
                >
                  <div className="size-7 rounded-full bg-[#FAF8F5] shadow-xs flex items-center justify-center transition-transform duration-500 group-hover:scale-125">
                    <span className="size-2 rounded-full bg-[#C85A17]" />
                  </div>
                </div>

                {/* Block 2: Deep Obsidian */}
                <div
                  onClick={(e) => handleCopyColor(e, "#0B1320")}
                  className="relative flex-1 bg-[#0B1320] flex items-center justify-center transition-all duration-500 group-hover:-translate-x-1 cursor-pointer"
                  title="Click to copy #0B1320"
                >
                  <div className="size-7 rounded-full bg-[#C85A17] shadow-xs flex items-center justify-center transition-transform duration-500 group-hover:scale-125">
                    <span className="size-2 rounded-full bg-[#FAF8F5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tile Description & Copy Feedback */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                  OJIX Color Matrix
                </h3>
                {copiedColor && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 group-hover:text-emerald-400">
                    <Check className="size-2.5" />
                    COPIED
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Terracotta (#C85A17) · Obsidian (#0B1320) · Warm Paper (#FAF8F5)
              </p>
              <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span>WCAG AAA 7.8:1 CONTRAST</span>
              </div>
            </div>
          </div>

          {/* TILE 7: 24/7 EDGE SYSTEMS & SOLAR CYCLE */}
          <div
            onClick={() => setIsNightMode(!isNightMode)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsNightMode(!isNightMode);
              }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px] cursor-pointer"
            aria-label={`Systems: Currently in ${isNightMode ? "Night / Self-Healing Mode" : "Day / High-Availability Mode"}. Click to toggle celestial cycle.`}
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                07 / SYSTEMS
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                24/7 EDGE RUNTIME
              </span>
            </div>

            {/* Rotating Celestial Sun/Moon Cycle (Dropbox Brand Hills & Dial) */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 120" className="h-full w-full">
                {/* Curved Horizon Ridge */}
                <path
                  d="M 0 100 Q 50 60, 100 80 T 200 65 L 200 120 L 0 120 Z"
                  className="fill-[#FAF8F5] group-hover:fill-white/10 stroke-[#E5E0D8] group-hover:stroke-white/30 transition-colors"
                  strokeWidth="1.5"
                />

                {/* Rotating Celestial Body Container */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: isNightMode
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transformOrigin: "100px 50px",
                  }}
                >
                  {/* Sun (Day) */}
                  <circle
                    cx="100"
                    cy="25"
                    r="12"
                    className="fill-[#C85A17] group-hover:fill-[#F97316] transition-colors"
                  />
                  {/* Sun Rays */}
                  <line x1="100" y1="8" x2="100" y2="2" stroke="#C85A17" strokeWidth="2" strokeLinecap="round" />
                  <line x1="100" y1="42" x2="100" y2="48" stroke="#C85A17" strokeWidth="2" strokeLinecap="round" />
                  <line x1="83" y1="25" x2="77" y2="25" stroke="#C85A17" strokeWidth="2" strokeLinecap="round" />
                  <line x1="117" y1="25" x2="123" y2="25" stroke="#C85A17" strokeWidth="2" strokeLinecap="round" />

                  {/* Moon (Night) */}
                  <path
                    d="M 94 85 A 10 10 0 0 0 106 75 A 12 12 0 1 1 94 85 Z"
                    className="fill-slate-400 group-hover:fill-white transition-colors"
                  />
                </g>
              </svg>
            </div>

            {/* Tile Description & State */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                  24/7 High Availability
                </h3>
                <span className="font-mono text-[10px] text-emerald-600 group-hover:text-emerald-400 font-bold">
                  {isNightMode ? "NIGHT · HEALING" : "DAY · ACTIVE SLA"}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                Sub-50ms edge routing across global nodes with zero downtime failover.
              </p>
            </div>
          </div>

          {/* TILE 8: MOTION & PHYSICS ENGINE */}
          <a
            href="#engineering"
            onClick={() => onTileClick?.("motion")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E0D8] bg-white p-6 transition-all duration-300 hover:border-[#C85A17] hover:bg-[#0B1320] hover:text-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] min-h-[320px]"
            aria-label="Motion and Physics: Tactile Press-Spring Curves"
          >
            {/* Tile Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 transition-colors group-hover:border-white/20">
              <span className="font-mono text-xs font-bold tracking-widest text-[#C85A17] group-hover:text-[#FAF8F5]">
                08 / MOTION
              </span>
              <span className="font-mono text-[10px] text-[#4B5563] group-hover:text-slate-300 uppercase">
                SPRING PHYSICS
              </span>
            </div>

            {/* Cubic Bezier Motion Graph with Dynamic Tangents */}
            <div className="relative my-6 flex h-36 w-full items-center justify-center">
              <svg viewBox="0 0 150 100" className="h-full w-full">
                {/* Tangent Arms */}
                <line
                  x1="15"
                  y1="85"
                  x2="55"
                  y2="85"
                  className="stroke-[#C85A17] group-hover:stroke-white transition-all duration-500 group-hover:x2-[75]"
                  strokeWidth="1.5"
                />
                <line
                  x1="135"
                  y1="15"
                  x2="95"
                  y2="15"
                  className="stroke-[#C85A17] group-hover:stroke-white transition-all duration-500 group-hover:x2-[75]"
                  strokeWidth="1.5"
                />

                {/* Primary Motion Timing Curve */}
                <path
                  d="M 15 85 C 45 85, 105 15, 135 15"
                  fill="none"
                  className="stroke-[#0B1320] group-hover:stroke-white stroke-2 transition-all duration-500 group-hover:d-[M 15 85 C 75 85, 75 15, 135 15]"
                />

                {/* Bezier Handles */}
                <circle cx="15" cy="85" r="4" className="fill-[#C85A17] group-hover:fill-white" />
                <circle cx="55" cy="85" r="3" className="fill-[#0B1320] group-hover:fill-white" />
                <circle cx="95" cy="15" r="3" className="fill-[#0B1320] group-hover:fill-white" />
                <circle cx="135" cy="15" r="4" className="fill-[#C85A17] group-hover:fill-white" />
              </svg>
            </div>

            {/* Tile Description & Link */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-[#0B1320] group-hover:text-white">
                Tactile Feedback Curves
              </h3>
              <p className="mt-1 text-xs text-[#4B5563] group-hover:text-slate-300 leading-normal">
                `cubic-bezier(0.34, 1.56, 0.64, 1)` spring physics with reduced-motion fallbacks.
              </p>
              <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-bold text-[#C85A17] group-hover:text-[#FAF8F5]">
                <span>Motion Specifications</span>
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
