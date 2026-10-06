import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";
import { WorkflowTopology } from "@/components/showcases/WorkflowTopology";
import { SHOWCASE_DOMAINS, type DomainId } from "@/components/showcases/domains";

describe("Challenger M2 Iteration 2: SVG Exception Interlocks, Reduced Motion & Contract Integrity", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // TEST SUITE 1: SVG Exception Interlocks (Crimson Dashed Line & Pulse Halt)
  describe("1. SVG Exception Interlocks & Flow Interruption", () => {
    it("renders baseline hairline rule with terracotta arrowhead and traveling pulse when no exception exists", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="ojix"
          activeToggles={{}}
          domainId="legal-os"
        />
      );

      // Inspect connectors on desktop (hidden lg:flex containers)
      const connectorSvgs = container.querySelectorAll(".hidden.lg\\:flex svg");
      expect(connectorSvgs.length).toBe(3); // 3 connectors between 4 nodes

      // Connector 0 (Stage 01 -> 02)
      const connector0 = connectorSvgs[0]!;
      const line0 = connector0.querySelector("line");
      const arrow0 = connector0.querySelector("polygon");
      const pulse0 = connector0.querySelector("circle");

      expect(line0).toHaveAttribute("stroke", "#C4BCB0");
      expect(line0).not.toHaveAttribute("stroke-dasharray");
      expect(arrow0).toHaveAttribute("fill", "#C85A17");
      expect(pulse0).not.toBeNull();
      expect(pulse0).toHaveAttribute("fill", "#C85A17");
      expect(pulse0?.querySelector("animate[attributeName='cx']")).toHaveAttribute("values", "0;17");
    });

    it("dynamically converts downstream connector to crimson dashed rule and halts traveling pulse when upstream stage has an exception", () => {
      const domainsWithExceptions: Array<{
        domainId: DomainId;
        toggleKey: string;
        toggleName: RegExp;
      }> = [
        {
          domainId: "legal-os",
          toggleKey: "legal_toggle_conflict",
          toggleName: /Simulate Adverse Entity Conflict/i,
        },
        {
          domainId: "industrial-erp",
          toggleKey: "erp_toggle_tooling",
          toggleName: /Simulate Tool Wear Excursion/i,
        },
        {
          domainId: "clinical-logistics",
          toggleKey: "clinical_toggle_excursion",
          toggleName: /Simulate Cold-Chain Thermal Excursion/i,
        },
        {
          domainId: "supply-chain-nexus",
          toggleKey: "supply_toggle_carrier_lapse",
          toggleName: /Simulate FMCSA Carrier Insurance Revocation/i,
        },
      ];

      for (const item of domainsWithExceptions) {
        const domain = SHOWCASE_DOMAINS[item.domainId];
        const { container, unmount } = render(
          <WorkflowTopology
            nodes={domain.nodes}
            selectedNodeIndex={0}
            onSelectNode={() => {}}
            simulationMode="ojix"
            activeToggles={{ [item.toggleKey]: true }}
            domainId={item.domainId}
          />
        );

        const connectorSvgs = container.querySelectorAll(".hidden.lg\\:flex svg");
        expect(connectorSvgs.length).toBe(3);

        // Connector 0 (Stage 01 -> 02) should remain normal (upstream Stage 01 is not in exception)
        const conn0Line = connectorSvgs[0]!.querySelector("line");
        const conn0Pulse = connectorSvgs[0]!.querySelector("circle");
        expect(conn0Line).toHaveAttribute("stroke", "#C4BCB0");
        expect(conn0Pulse).not.toBeNull();

        // Connector 1 (Stage 02 -> 03) must be INTERLOCKED (upstream Stage 02 is in exception)
        const conn1 = connectorSvgs[1]!;
        const conn1Line = conn1.querySelector("line");
        const conn1Arrow = conn1.querySelector("polygon");
        const conn1Pulse = conn1.querySelector("circle");

        // 1. Turned into crimson dashed rule
        expect(conn1Line).toHaveAttribute("stroke", "#DC2626");
        expect(conn1Line).toHaveAttribute("stroke-dasharray", "3 3");
        expect(conn1Arrow).toHaveAttribute("fill", "#DC2626");

        // 2. Halts the traveling pulse animation (circle removed from DOM)
        expect(conn1Pulse).toBeNull();

        unmount();
      }
    });

    it("verifies mobile downward connector also transitions to crimson dashed style under exception", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="ojix"
          activeToggles={{ legal_toggle_conflict: true }}
          domainId="legal-os"
        />
      );

      // Mobile downward connectors: div.sm\\:hidden svg
      const mobileConnectors = container.querySelectorAll(".sm\\:hidden svg");
      expect(mobileConnectors.length).toBe(3);

      // Mobile connector 1 (Stage 02 -> 03)
      const mobileConn1 = mobileConnectors[1]!;
      const mobileLine = mobileConn1.querySelector("line");
      expect(mobileLine).toHaveAttribute("stroke-dasharray", "2 2");
      expect(mobileConn1.getAttribute("class")).toContain("text-[#DC2626]");
    });
  });

  // TEST SUITE 2: Accessibility: prefers-reduced-motion Cleanly Freezes Animations
  describe("2. prefers-reduced-motion Compliance & Pulse Freezing", () => {
    it("freezes traveling pulse animations in WorkflowTopology when prefers-reduced-motion is active", () => {
      // Mock matchMedia to simulate prefers-reduced-motion: reduce
      const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
      window.matchMedia = matchMediaMock;

      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="ojix"
          activeToggles={{}}
          domainId="legal-os"
        />
      );

      const connectorSvgs = container.querySelectorAll(".hidden.lg\\:flex svg");
      // For all connectors, pulse circle must NOT be rendered when reduced motion is preferred
      for (const svg of connectorSvgs) {
        const pulse = svg.querySelector("circle");
        expect(pulse).toBeNull();
      }

      // Ensure structural hairline lines and arrowheads remain cleanly visible
      for (const svg of connectorSvgs) {
        expect(svg.querySelector("line")).not.toBeNull();
        expect(svg.querySelector("polygon")).not.toBeNull();
      }
    });

    it("removes pulse circles when simulationMode is baseline", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];
      const { container } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="baseline"
          activeToggles={{}}
          domainId="legal-os"
        />
      );

      const connectorSvgs = container.querySelectorAll(".hidden.lg\\:flex svg");
      for (const svg of connectorSvgs) {
        expect(svg.querySelector("circle")).toBeNull();
      }
    });
  });

  // TEST SUITE 3: Stage 04 Reactive Reflection for supply_toggle_audit_protocol === 'manual'
  describe("3. Stage 04 Reactive Reflection for Supply Chain Manual Audit", () => {
    it("reacts dynamically on Stage 04 when supply_toggle_audit_protocol is set to 'manual'", () => {
      render(<ShowcaseSection />);

      // Switch to Supply Chain domain tab
      const supplyTab = screen.getByRole("tab", { name: /Supply Chain/i });
      fireEvent.click(supplyTab);

      // Verify Stage 04 is present
      const stage04Btn = screen.getByRole("button", { name: /WMS Inventory Ledger/i });
      expect(stage04Btn).toBeInTheDocument();

      // By default (geofence), verify default verified status
      expect(screen.getByText(/Sub-second multi-warehouse inventory commit/i)).toBeInTheDocument();

      // Switch audit protocol toggle to "manual"
      const manualRadio = screen.getByRole("radio", { name: /Manual Claim/i });
      fireEvent.click(manualRadio);

      // Verify Stage 04 status text changes reactively
      expect(
        screen.getByText(/Manual claim detected · Geofence GPS refutes detention surcharge/i)
      ).toBeInTheDocument();

      // Click Stage 04 button to inspect payload
      fireEvent.click(stage04Btn);

      // Verify Stage 04 payload reflects manual detention audit fields
      const codeBlock = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === "code" && content.includes("WMS-INV-88412");
      });
      expect(codeBlock).toBeInTheDocument();

      const parsedPayload = JSON.parse(codeBlock.textContent || "{}");
      expect(parsedPayload.dwell_audit_protocol).toBe("MANUAL_DETENTION_CLAIM_AUDIT");
      expect(parsedPayload.carrier_claim_dwell_hours).toBe(3.5);
      expect(parsedPayload.geofence_rfid_actual_hours).toBe(0.8);
      expect(parsedPayload.phantom_detention_surcharge_saved).toBe("$175.00");
      expect(parsedPayload.discrepancy_resolved).toBe(true);

      // Verify MetricDashboard reflects geofence telemetry validation
      expect(screen.getByText("GEOFENCE TELEMETRY VALIDATED")).toBeInTheDocument();
    });
  });

  // TEST SUITE 4: Strict JSON Payload Contracts Across All Domains
  describe("4. JSON Payload Contract Verification", () => {
    it("validates all 16 normal node payloads and all exception payloads strictly parse with zero NaN or undefined values", () => {
      const domains = Object.values(SHOWCASE_DOMAINS);
      expect(domains.length).toBe(4);

      let normalCount = 0;
      let exceptionCount = 0;

      for (const domain of domains) {
        expect(domain.nodes.length).toBe(4);

        for (const node of domain.nodes) {
          normalCount++;
          // Normal payload
          expect(() => JSON.parse(node.payloadSnippet)).not.toThrow();
          const parsedNormal = JSON.parse(node.payloadSnippet);
          expect(typeof parsedNormal).toBe("object");
          expect(parsedNormal).not.toBeNull();
          expect(Object.keys(parsedNormal).length).toBeGreaterThanOrEqual(3);

          const normalStr = JSON.stringify(parsedNormal);
          expect(normalStr).not.toContain("NaN");
          expect(normalStr).not.toContain("undefined");

          // Exception payload if present
          if (node.exceptionPayloadSnippet) {
            exceptionCount++;
            expect(() => JSON.parse(node.exceptionPayloadSnippet!)).not.toThrow();
            const parsedException = JSON.parse(node.exceptionPayloadSnippet!);
            expect(typeof parsedException).toBe("object");
            expect(parsedException).not.toBeNull();
            expect(Object.keys(parsedException).length).toBeGreaterThanOrEqual(3);

            const excStr = JSON.stringify(parsedException);
            expect(excStr).not.toContain("NaN");
            expect(excStr).not.toContain("undefined");
          }
        }
      }

      expect(normalCount).toBe(16);
      expect(exceptionCount).toBe(6);
    });
  });
});
