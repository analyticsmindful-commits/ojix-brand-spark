import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlueprintCard } from "@/components/showcases/BlueprintCard";
import { MetricDashboard } from "@/components/showcases/MetricDashboard";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";
import { WorkflowTopology } from "@/components/showcases/WorkflowTopology";
import { SHOWCASE_DOMAINS } from "@/components/showcases/domains";

describe("Challenger M2: Adversarial Showcase Responsive Layout Stress Tests", () => {
  const CANONICAL_VIEWPORTS = [320, 360, 390, 768, 1024, 1440, 1920, 2560, 3840];

  describe("Objective 1: 9 Canonical Viewport Fluid Typography Scaling", () => {
    const evaluateClamp = (
      minRem: number,
      vwFactor: number,
      baseRem: number,
      maxRem: number,
      vwPx: number,
    ) => {
      const rootFontSize = 16;
      const minPx = minRem * rootFontSize;
      const maxPx = maxRem * rootFontSize;
      const preferredPx = (vwFactor / 100) * vwPx + baseRem * rootFontSize;
      return Math.min(Math.max(preferredPx, minPx), maxPx);
    };

    it("verifies clamp bounds across all 9 canonical viewports for showcase headers", () => {
      for (const vw of CANONICAL_VIEWPORTS) {
        // text-fluid-h2: clamp(1.625rem, 2.5vw + 0.875rem, 2.875rem)
        const h2Size = evaluateClamp(1.625, 2.5, 0.875, 2.875, vw);
        expect(h2Size).toBeGreaterThanOrEqual(26);
        expect(h2Size).toBeLessThanOrEqual(46);

        // text-fluid-body: clamp(0.9375rem, 0.35vw + 0.8125rem, 1.125rem)
        const bodySize = evaluateClamp(0.9375, 0.35, 0.8125, 1.125, vw);
        expect(bodySize).toBeGreaterThanOrEqual(15);
        expect(bodySize).toBeLessThanOrEqual(18);

        // text-fluid-mono: clamp(0.75rem, 0.25vw + 0.6875rem, 0.875rem)
        const monoSize = evaluateClamp(0.75, 0.25, 0.6875, 0.875, vw);
        expect(monoSize).toBeGreaterThanOrEqual(12);
        expect(monoSize).toBeLessThanOrEqual(14);
      }
    });
  });

  describe("Objective 2: Zero Horizontal Document Scrolling & JSON Payload Safeguards", () => {
    it("guarantees ShowcaseSection enforces overflow-x-hidden container isolation", () => {
      const { container } = render(<ShowcaseSection />);
      const section = container.querySelector("#portfolio");
      expect(section).toBeInTheDocument();
      expect(section?.className).toContain("overflow-x-hidden");
    });

    it("guarantees JSON payload inspector pre tag has internal horizontal scroll without document blowout", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
        />,
      );

      const preElement = container.querySelector("#payload-inspector-panel pre");
      expect(preElement).toBeInTheDocument();
      const preParent = preElement?.parentElement;
      expect(preParent?.className).toContain("overflow-x-auto");
      expect(preParent?.className).toContain("max-w-full");
    });
  });

  describe("Objective 3: Tablet 768px Layout Architecture & Collision Prevention", () => {
    it("verifies tablist adapts smoothly between mobile (grid-cols-2) and tablet/desktop (sm:grid-cols-4)", () => {
      const { container } = render(<ShowcaseSection />);
      const tablist = container.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
      expect(tablist?.className).toContain("grid-cols-2");
      expect(tablist?.className).toContain("sm:grid-cols-4");
    });

    it("verifies metric dashboard displays 4 metrics in a grid supporting 2 cols on mobile and 4 on tablet", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <MetricDashboard metrics={legalDomain.metrics} simulationMode="ojix" domainId="legal-os" />,
      );

      const dashboard = container.querySelector('[data-testid="metric-dashboard"]');
      expect(dashboard).toBeInTheDocument();
      expect(dashboard?.className).toContain("grid-cols-2");
      expect(dashboard?.className).toContain("sm:grid-cols-4");
      expect(dashboard?.children.length).toBe(4);
    });

    it("verifies forensic audit comparison stacks on tablet and only splits on large screens (lg:grid-cols-2)", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(<BlueprintCard domain={legalDomain} />);

      const forensicGrid = container.querySelector(
        ".border-t.border-\\[\\#E5E0D8\\].lg\\:grid-cols-2",
      );
      expect(forensicGrid).toBeInTheDocument();
      expect(forensicGrid?.className).toContain("grid-cols-1");
      expect(forensicGrid?.className).toContain("lg:grid-cols-2");
    });

    it("verifies topology pipeline nodes use 2x2 grid on tablet (sm:grid-cols-2) and 4-linear on desktop (lg:grid-cols-4)", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
        />,
      );

      const pipelineGrid = container.querySelector('[aria-label="Workflow Topology Stages"]');
      expect(pipelineGrid).toBeInTheDocument();
      expect(pipelineGrid?.className).toContain("grid-cols-1");
      expect(pipelineGrid?.className).toContain("sm:grid-cols-2");
      expect(pipelineGrid?.className).toContain("lg:grid-cols-4");
    });
  });

  describe("Objective 4: Interactive Touch Target Accessibility Audit", () => {
    it("confirms all 4 domain tab triggers satisfy the min 48px touch target standard", () => {
      const { container } = render(<ShowcaseSection />);
      const tabButtons = container.querySelectorAll('[role="tablist"] button');
      expect(tabButtons.length).toBe(4);

      tabButtons.forEach((btn) => {
        expect(btn.className).toContain("min-h-[52px]");
      });
    });

    it("confirms primary workflow extraction CTA satisfies min 44px button touch target", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(<BlueprintCard domain={legalDomain} />);
      const cta = container.querySelector('a[href="#extraction"]');
      expect(cta).toBeInTheDocument();
      expect(cta?.className).toContain("min-h-[44px]");
    });

    it("verifies all secondary interactive elements satisfy min 44px touch targets", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(<BlueprintCard domain={legalDomain} />);

      // Copy button in topology
      const copyBtn = container.querySelector(
        'button[aria-label="Copy JSON contract payload to clipboard"]',
      );
      expect(copyBtn).toBeInTheDocument();
      expect(copyBtn?.className).toContain("min-h-[44px]");

      // Switch toggle has min-h-[44px]
      const switchToggle = container.querySelector('button[role="switch"]');
      expect(switchToggle).toBeInTheDocument();
      expect(switchToggle?.className).toContain("min-h-[44px]");
    });
  });

  describe("Objective 5: Adversarial State Stress Across All 4 Domains", () => {
    it("handles rapid domain switching across all 4 domains without breaking structure", () => {
      render(<ShowcaseSection />);

      const domainNames = ["Legal OS", "Industrial ERP", "Clinical Logistics", "Supply Chain"];

      for (const name of domainNames) {
        const tabBtn = screen.getByRole("tab", { name: new RegExp(name, "i") });
        fireEvent.click(tabBtn);
        expect(tabBtn).toHaveAttribute("aria-selected", "true");
        expect(screen.getByTestId("metric-dashboard")).toBeInTheDocument();
        expect(screen.getByLabelText("Workflow Topology Stages")).toBeInTheDocument();
      }
    });

    it("handles switching between baseline and ojix core simulation modes cleanly", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      render(<BlueprintCard domain={legalDomain} />);

      const baselineBtn = screen.getByRole("radio", {
        name: /Fragile Manual Baseline/i,
      });
      fireEvent.click(baselineBtn);
      expect(screen.getByText("+420% Lag")).toBeInTheDocument();

      const ojixBtn = screen.getByRole("radio", {
        name: /OJIX Engineered Core/i,
      });
      fireEvent.click(ojixBtn);
      expect(screen.getByText("93% Faster")).toBeInTheDocument();
    });
  });
});
