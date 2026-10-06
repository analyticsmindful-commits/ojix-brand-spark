import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { SHOWCASE_DOMAINS, type DomainId, type DomainKey, type SimulationMode } from "./domains";
import { BlueprintCard } from "./BlueprintCard";

export type { DomainKey };

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<DomainId>("legal-os");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const [simulationMode, setSimulationMode] = useState<SimulationMode>("ojix");
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean | string>>({});
  const [announcement, setAnnouncement] = useState<string>("");

  const domain = SHOWCASE_DOMAINS[activeTab];
  const domainKeys = Object.keys(SHOWCASE_DOMAINS) as DomainId[];
  const tabRefs = useRef<Partial<Record<DomainId, HTMLButtonElement | null>>>({});

  const handleTabChange = (key: DomainId) => {
    setActiveTab(key);
    setSelectedNodeIndex(0);
    setSimulationMode("ojix");
    setActiveToggles({});
    const newDomain = SHOWCASE_DOMAINS[key];
    setAnnouncement(
      `Active domain switched to ${newDomain.name}: ${newDomain.tagline}. Initialized in OJIX Engineered Core.`,
    );
  };

  const handleSimulationModeChange = (mode: SimulationMode) => {
    setSimulationMode(mode);
    if (mode === "ojix") {
      setAnnouncement("Architecture mode set to OJIX Engineered Core.");
    } else {
      setAnnouncement(
        "Architecture mode set to Fragile Manual Baseline. Operational bottlenecks exposed.",
      );
    }
  };

  const handleToggleChange = (toggleId: string, value: boolean | string) => {
    setActiveToggles((prev) => ({
      ...prev,
      [toggleId]: value,
    }));

    const toggle = domain.stateToggles.find((t) => t.id === toggleId);
    const label = toggle ? toggle.label : toggleId;

    if (typeof value === "boolean") {
      if (value) {
        const impact = toggle?.impactSummary ? ` - ${toggle.impactSummary}` : "";
        setAnnouncement(`${label} activated.${impact}`);
      } else {
        setAnnouncement(`${label} deactivated.`);
      }
    } else {
      const opt = toggle?.options?.find((o) => o.value === value);
      const optLabel = opt ? opt.label : String(value);
      const impact = toggle?.impactSummary ? ` - ${toggle.impactSummary}` : "";
      setAnnouncement(`${label} set to ${optLabel}.${impact}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentKey: DomainId) => {
    const currentIndex = domainKeys.indexOf(currentKey);
    let nextIndex = -1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % domainKeys.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + domainKeys.length) % domainKeys.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = domainKeys.length - 1;
    }

    if (nextIndex !== -1) {
      const nextKey = domainKeys[nextIndex];
      if (nextKey) {
        handleTabChange(nextKey);
        tabRefs.current[nextKey]?.focus();
      }
    }
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320] overflow-x-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <span>01 // PROVEN ARCHITECTURAL BLUEPRINTS</span>
          </div>
          <h2
            id="portfolio-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
          >
            Software Built Around Your Operational Topology.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
            We do not sell cookie-cutter SaaS licenses. Every system we build is a custom,
            production-grade operating system designed to eradicate margin leakage from manual
            spreadsheets, lost WhatsApp conversations, and brittle paper handoffs.
          </p>
        </div>

        {/* Accessible Screen Reader Live Region */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        {/* Backward-compatible screen-reader action button */}
        <div className="sr-only">
          <button type="button" tabIndex={-1} onClick={() => handleTabChange("legal-os")}>
            Legal OS
          </button>
        </div>

        {/* Accessible Domain Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Operational Domain Blueprints"
          className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {domainKeys.map((key) => {
            const item = SHOWCASE_DOMAINS[key];
            const TabIcon = item.icon;
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-controls={`tabpanel-${key}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(key)}
                onKeyDown={(e) => handleKeyDown(e, key)}
                className={cn(
                  "group flex min-h-[52px] items-center gap-2.5 sm:gap-2 lg:gap-3 rounded border p-2.5 sm:p-2 lg:p-3 text-left transition-all duration-150 active:scale-[0.98] press-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:ring-offset-2",
                  isActive
                    ? "border-[#C85A17] bg-[#FDF4ED] text-[#C85A17] shadow-xs"
                    : "border-[#E5E0D8] bg-white text-[#0B1320] hover:border-[#0B1320]",
                )}
              >
                <TabIcon
                  className={cn(
                    "size-5 shrink-0",
                    isActive ? "text-[#C85A17]" : "text-[#4B5563] group-hover:text-[#0B1320]",
                  )}
                />
                <div className="min-w-0">
                  <span className="block font-sans text-xs sm:text-[13px] lg:text-sm font-bold leading-tight truncate">
                    {item.name}
                  </span>
                  <span className="block font-mono text-[10px] text-[#4B5563] uppercase truncate">
                    {item.id}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Domain Blueprint Card with Tabpanel Semantics */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="mt-8 focus:outline-none"
        >
          <BlueprintCard
            domain={domain}
            selectedNodeIndex={selectedNodeIndex}
            onSelectNode={setSelectedNodeIndex}
            simulationMode={simulationMode}
            onSimulationModeChange={handleSimulationModeChange}
            activeToggles={activeToggles}
            onToggleChange={handleToggleChange}
          />
        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection;
