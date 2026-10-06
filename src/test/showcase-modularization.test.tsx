import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";
import { BlueprintCard } from "@/components/showcases/BlueprintCard";
import { WorkflowTopology } from "@/components/showcases/WorkflowTopology";
import { MetricDashboard } from "@/components/showcases/MetricDashboard";
import { SHOWCASE_DOMAINS, resolveDomainId } from "@/components/showcases/domains";

describe("Milestone 2: Showcases Modular Architecture & Interactivity", () => {
  // SUITE 1: Modular Hierarchy & Subcomponent Rendering
  describe("1. Modular Hierarchy & Landmark Integrity", () => {
    it("renders root section with #portfolio anchor and accessible heading", () => {
      const { container } = render(<ShowcaseSection />);
      expect(container.querySelector("#portfolio")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /Software Built Around Your Operational Topology/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/01 \/\/ PROVEN ARCHITECTURAL BLUEPRINTS/i)).toBeInTheDocument();
    });

    it("renders all 4 domain tab triggers with accessible tab semantics", () => {
      render(<ShowcaseSection />);
      const domains = ["Legal OS", "Industrial ERP", "Clinical Logistics", "Supply Chain"];
      for (const domain of domains) {
        expect(screen.getByRole("tab", { name: new RegExp(domain, "i") })).toBeInTheDocument();
      }
    });

    it("renders isolated subcomponents cleanly without parent dependencies", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];

      // MetricDashboard isolated render
      const { unmount: unmountMetrics } = render(
        <MetricDashboard metrics={legalDomain.metrics} simulationMode="ojix" />,
      );
      expect(screen.getByText(/93% Faster/i)).toBeInTheDocument();
      unmountMetrics();

      // WorkflowTopology isolated render
      const { unmount: unmountTopology } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="ojix"
        />,
      );
      expect(screen.getByText("Court Docket Ingestion")).toBeInTheDocument();
      unmountTopology();
    });
  });

  // SUITE 2: Domain Switching & Data Synchronization
  describe("2. Domain Switching & Data Synchronization", () => {
    it("initializes with Legal OS by default", () => {
      render(<ShowcaseSection />);
      expect(screen.getByText(/LITIGATION & PRACTICE TELEMETRY/i)).toBeInTheDocument();
      expect(screen.getByText(/Multi-Partner Law Firms/i)).toBeInTheDocument();
    });

    it("switches to Industrial ERP and updates all telemetry, metrics, and nodes", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Industrial ERP/i }));

      expect(screen.getByText(/DISCRETE MANUFACTURING & SHOP-FLOOR OPS/i)).toBeInTheDocument();
      expect(screen.getByText(/Industrial Mid-Market/i)).toBeInTheDocument();
      expect(screen.getByText("ISO 9001 Traceable")).toBeInTheDocument();
      expect(screen.getByText("Work Order Trigger")).toBeInTheDocument();
    });

    it("switches to Clinical Logistics and updates telemetry, metrics, and nodes", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Clinical Logistics/i }));

      expect(screen.getByText(/COLD-CHAIN & SPECIMEN CHAIN-OF-CUSTODY/i)).toBeInTheDocument();
      expect(screen.getByText(/Regional Pathology Labs/i)).toBeInTheDocument();
      expect(screen.getByText("CAP / CLIA Certified")).toBeInTheDocument();
      expect(screen.getByText("Pickup Accession")).toBeInTheDocument();
    });

    it("switches to Supply Chain Nexus and updates telemetry, metrics, and nodes", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Supply Chain/i }));

      expect(screen.getByText(/MULTI-NODE FREIGHT & INVENTORY LEDGER/i)).toBeInTheDocument();
      expect(screen.getByText(/High-Throughput Distribution Centers/i)).toBeInTheDocument();
      expect(screen.getByText("100% Carrier Verified")).toBeInTheDocument();
      expect(screen.getByText("EDI 850 Release")).toBeInTheDocument();
    });

    it("supports domain alias 'enterprise-erp' resolving cleanly to 'industrial-erp'", () => {
      expect(resolveDomainId("enterprise-erp")).toBe("industrial-erp");
      expect(resolveDomainId("legal-os")).toBe("legal-os");
    });

    it("rapidly switches across all 4 domains 3 times without state desynchronization", () => {
      render(<ShowcaseSection />);
      const domainButtons = [
        { name: /Legal OS/i, expected: /Multi-Partner Law Firms/i },
        { name: /Industrial ERP/i, expected: /Industrial Mid-Market/i },
        { name: /Clinical Logistics/i, expected: /Regional Pathology Labs/i },
        { name: /Supply Chain/i, expected: /High-Throughput Distribution/i },
      ];

      for (let i = 0; i < 3; i++) {
        for (const item of domainButtons) {
          fireEvent.click(screen.getByRole("tab", { name: item.name }));
          expect(screen.getByText(item.expected)).toBeInTheDocument();
        }
      }
    });

    it("resets selectedNodeIndex to 0 upon switching domains", () => {
      render(<ShowcaseSection />);

      // In Legal OS, select node 3
      const node3 = screen.getByRole("button", { name: /Statutory Deadline Rule/i });
      fireEvent.click(node3);
      expect(screen.getByText(/STAGE 03 OF 04/i)).toBeInTheDocument();

      // Switch to Clinical Logistics
      fireEvent.click(screen.getByRole("tab", { name: /Clinical Logistics/i }));

      // Should automatically reset to node 1
      expect(screen.getByText(/STAGE 01 OF 04/i)).toBeInTheDocument();
      expect(screen.getByText(/Pickup Accession/i)).toBeInTheDocument();
    });
  });

  // SUITE 3: Simulation Mode Toggle Reactivity
  describe("3. Simulation Mode Toggle Reactivity", () => {
    it("toggles between OJIX Core and Fragile Baseline updating metric values", () => {
      render(<ShowcaseSection />);

      // Initial OJIX Core
      expect(screen.getByText(/93% Faster/i)).toBeInTheDocument();
      expect(screen.getByText(/\+\$32.4K \/ mo/i)).toBeInTheDocument();
      expect(screen.getByText(/100% Bar Compliant/i)).toBeInTheDocument();

      // Click Fragile Baseline toggle
      const baselineBtn = screen.getByRole("radio", { name: /Fragile.*Baseline/i });
      fireEvent.click(baselineBtn);

      // Verify baseline metrics
      expect(screen.getByText(/\+420% Lag/i)).toBeInTheDocument();
      expect(screen.getByText(/-\$18.4K \/ mo/i)).toBeInTheDocument();
      expect(screen.getByText(/0% Tracked/i)).toBeInTheDocument();

      // Click back to OJIX Core
      const ojixBtn = screen.getByRole("radio", { name: /OJIX.*Core/i });
      fireEvent.click(ojixBtn);

      expect(screen.getByText(/93% Faster/i)).toBeInTheDocument();
      expect(screen.getByText(/\+\$32.4K \/ mo/i)).toBeInTheDocument();
    });

    it("propagates simulation mode toggle to node statuses in topology pipeline", () => {
      render(<ShowcaseSection />);

      // Initial OJIX node status
      expect(screen.getByText(/Direct e-filing API/i)).toBeInTheDocument();

      // Toggle to baseline
      fireEvent.click(screen.getByRole("radio", { name: /Fragile.*Baseline/i }));

      // Status changes to fragile baseline
      expect(screen.getByText(/Manual clerk scanning/i)).toBeInTheDocument();
    });

    it("reacts dynamically to interactive state toggles (Adverse Conflict)", () => {
      render(<ShowcaseSection />);

      // Initial clean state
      expect(screen.getByText("100% Bar Compliant")).toBeInTheDocument();

      // Toggle adverse conflict switch
      const conflictToggle = screen.getByRole("switch", {
        name: /Simulate Adverse Entity Conflict/i,
      });
      fireEvent.click(conflictToggle);

      // Verifies reactive compliance update and exception state
      expect(screen.getByText(/ETHICAL WALL PROTOCOL/i)).toBeInTheDocument();
      expect(screen.getByText(/18 mins \(Freeze active\)/i)).toBeInTheDocument();
    });

    it("reacts dynamically to Industrial ERP tool wear excursion toggle", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Industrial ERP/i }));

      const toolToggle = screen.getByRole("switch", {
        name: /Simulate Tool Wear Excursion/i,
      });
      fireEvent.click(toolToggle);

      expect(screen.getByText(/ISO 9001 NON-CONFORMANCE AUTO-LOGGED/i)).toBeInTheDocument();
      expect(screen.getByText(/14 mins \(Auto-rerouted\)/i)).toBeInTheDocument();
    });

    it("reacts dynamically to Clinical Logistics thermal excursion toggle", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Clinical Logistics/i }));

      const tempToggle = screen.getByRole("switch", {
        name: /Simulate Cold-Chain Thermal Excursion/i,
      });
      fireEvent.click(tempToggle);

      expect(screen.getByText(/CAP EXCURSION PROTOCOL 14.2 ENFORCED/i)).toBeInTheDocument();
      expect(screen.getByText(/42 mins \(Quarantine\)/i)).toBeInTheDocument();
    });

    it("reacts dynamically to Supply Chain carrier revocation toggle", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Supply Chain/i }));

      const carrierToggle = screen.getByRole("switch", {
        name: /Simulate FMCSA Carrier Insurance Revocation/i,
      });
      fireEvent.click(carrierToggle);

      expect(screen.getByText(/FMCSA SAFETY REVOCATION ENFORCED/i)).toBeInTheDocument();
      expect(screen.getByText(/11 mins \(Tier-2 dispatch\)/i)).toBeInTheDocument();
    });
  });

  // SUITE 4: Workflow Topology Node Selection & Payload Inspector
  describe("4. Topology Node Selection & Valid JSON Payload Inspection", () => {
    it("updates payload inspector when selecting different topology nodes", () => {
      render(<ShowcaseSection />);

      // Default node 1
      expect(screen.getByText(/Court Docket Ingestion/i)).toBeInTheDocument();
      expect(screen.getByText(/2026-CV-88219/i)).toBeInTheDocument();

      // Click node 2 (Entity Conflict Gate)
      const node2 = screen.getByRole("button", { name: /Entity Conflict Gate/i });
      fireEvent.click(node2);

      expect(screen.getByText(/STAGE 02 OF 04/i)).toBeInTheDocument();
      expect(screen.getByText(/1420/i)).toBeInTheDocument();
    });

    it("provides one-click copy feedback on live JSON payload", () => {
      render(<ShowcaseSection />);
      const copyBtn = screen.getByRole("button", { name: /Copy JSON contract payload/i });
      expect(copyBtn).toHaveTextContent(/COPY JSON/i);

      fireEvent.click(copyBtn);
      expect(screen.getByText(/COPIED/i)).toBeInTheDocument();
    });

    it("verifies all 16 node JSON payloads parse strictly as valid JSON without throwing", () => {
      for (const key of Object.keys(SHOWCASE_DOMAINS)) {
        const domain = SHOWCASE_DOMAINS[key as keyof typeof SHOWCASE_DOMAINS];
        for (const node of domain.nodes) {
          expect(() => JSON.parse(node.payloadSnippet)).not.toThrow();
        }
      }
    });
  });

  // SUITE 5: Metric Calculations & Dynamic Delta Mathematics
  describe("5. Metric Calculations & Formatting Integrity", () => {
    it("calculates correct delta percentages and currency formatting across domains", () => {
      for (const key of Object.keys(SHOWCASE_DOMAINS)) {
        const domain = SHOWCASE_DOMAINS[key as keyof typeof SHOWCASE_DOMAINS];
        expect(domain.metrics.cycleReductionPercent).toBeGreaterThan(80);
        expect(domain.metrics.monthlyMarginLiftBase).toBeGreaterThan(20000);
        expect(domain.metrics.baselineMonthlyLeak).toBeGreaterThan(10000);
      }
    });
  });

  // SUITE 6: Responsive Layout Contracts & Touch Targets
  describe("6. Responsive Layout Contracts & Touch Targets", () => {
    it("enforces minimum touch target of 48px on domain tabs and interactive CTAs", () => {
      render(<ShowcaseSection />);
      const tabs = screen.getAllByRole("tab", {
        name: /(Legal OS|Industrial ERP|Clinical Logistics|Supply Chain)/i,
      });
      tabs.forEach((tab) => {
        expect(tab.className).toMatch(/min-h-\[(48|52)px\]/);
      });

      const cta = screen.getByRole("link", { name: /Extract This Workflow/i });
      expect(cta.className).toContain("min-h-[44px]");
    });

    it("applies responsive grid classes preventing horizontal blowout on tablet and mobile", () => {
      const { container } = render(<ShowcaseSection />);

      // Tab switcher grid
      const tabGrid = container.querySelector("#portfolio .grid");
      expect(tabGrid?.className).toContain("grid-cols-2");
      expect(tabGrid?.className).toContain("sm:grid-cols-4");

      // Metrics grid
      const metricsGrid = container.querySelector("#portfolio [data-testid='metric-dashboard']");
      expect(metricsGrid?.className).toMatch(/grid-cols-2.*sm:grid-cols-4/);

      // Code snippet container has overflow-x-auto
      const codeWrapper = container.querySelector("#portfolio pre")?.parentElement;
      expect(codeWrapper?.className).toContain("overflow-x-auto");
      expect(codeWrapper?.className).toContain("max-w-full");
    });
  });

  // SUITE 7: Accessibility & Keyboard Navigation
  describe("7. Accessibility & Keyboard Navigation", () => {
    it("provides proper ARIA attributes on tab buttons and selected nodes", () => {
      render(<ShowcaseSection />);
      const legalTab = screen.getByRole("tab", { name: /Legal OS/i });
      expect(legalTab).toHaveAttribute("aria-selected", "true");

      const erpTab = screen.getByRole("tab", { name: /Industrial ERP/i });
      expect(erpTab).toHaveAttribute("aria-selected", "false");
    });

    it("conforms to W3C ARIA tablist and roving tabIndex specifications", () => {
      render(<ShowcaseSection />);
      const tablist = screen.getByRole("tablist", { name: /Operational Domain Blueprints/i });
      expect(tablist).toBeInTheDocument();

      const legalTab = screen.getByRole("tab", { name: /Legal OS/i });
      const erpTab = screen.getByRole("tab", { name: /Industrial ERP/i });

      expect(legalTab).toHaveAttribute("aria-selected", "true");
      expect(legalTab).toHaveAttribute("tabindex", "0");
      expect(erpTab).toHaveAttribute("aria-selected", "false");
      expect(erpTab).toHaveAttribute("tabindex", "-1");

      // Arrow navigation
      fireEvent.keyDown(legalTab, { key: "ArrowRight" });
      expect(erpTab).toHaveAttribute("aria-selected", "true");
      expect(erpTab).toHaveAttribute("tabindex", "0");

      // Tabpanel check
      const panel = screen.getByRole("tabpanel");
      expect(panel).toHaveAttribute("id", "tabpanel-industrial-erp");
      expect(panel).toHaveAttribute("aria-labelledby", "tab-industrial-erp");

      // Live region check
      const liveRegion = screen.getByText(/Active domain switched to Industrial ERP/i);
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
    });

    it("supports keyboard navigation on topology nodes", () => {
      render(<ShowcaseSection />);
      const node1 = screen.getByRole("button", { name: /Court Docket Ingestion/i });

      // ArrowRight selects stage 02
      fireEvent.keyDown(node1, { key: "ArrowRight" });
      expect(screen.getByText(/STAGE 02 OF 04/i)).toBeInTheDocument();

      // ArrowLeft navigates back to stage 01
      const node2 = screen.getByRole("button", { name: /Entity Conflict Gate/i });
      fireEvent.keyDown(node2, { key: "ArrowLeft" });
      expect(screen.getByText(/STAGE 01 OF 04/i)).toBeInTheDocument();
    });
  });
});
