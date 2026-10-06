import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";
import { BlueprintCard } from "@/components/showcases/BlueprintCard";
import { WorkflowTopology } from "@/components/showcases/WorkflowTopology";
import { MetricDashboard } from "@/components/showcases/MetricDashboard";
import { SHOWCASE_DOMAINS, type DomainId, resolveDomainId } from "@/components/showcases/domains";
import { Hero } from "@/components/hero/Hero";

describe("Adversarial Stress Suite: Challenger M2_2 (State Permutations & Contract Validation)", () => {
  // SUITE 1: 2^8 = 256 State Permutation Testing Across 4 Domains
  describe("1. Permutation Matrix Testing (2^8 = 256 Toggle States)", () => {
    // Generate all 256 combinations of the 8 boolean/choice toggles
    const toggleKeys = [
      { id: "legal_toggle_conflict", values: [false, true] },
      { id: "legal_toggle_protocol", values: ["standard", "ex_parte"] },
      { id: "erp_toggle_tooling", values: [false, true] },
      { id: "erp_toggle_match_mode", values: ["strict", "fast_track"] },
      { id: "clinical_toggle_excursion", values: [false, true] },
      { id: "clinical_toggle_route_mode", values: ["routine", "stat_emergency"] },
      { id: "supply_toggle_carrier_lapse", values: [false, true] },
      { id: "supply_toggle_audit_protocol", values: ["geofence", "manual"] },
    ] as const;

    const generateAll256Combinations = () => {
      const combinations: Record<string, boolean | string>[] = [];
      for (let i = 0; i < 256; i++) {
        const combo: Record<string, boolean | string> = {};
        for (let bit = 0; bit < 8; bit++) {
          const bitVal = (i >> bit) & 1;
          const keyItem = toggleKeys[bit];
          if (keyItem) {
            const val = keyItem.values[bitVal];
            if (val !== undefined) {
              combo[keyItem.id] = val;
            }
          }
        }
        combinations.push(combo);
      }
      return combinations;
    };

    const all256Combinations = generateAll256Combinations();

    it("verifies 256 combinations are generated with exact length", () => {
      expect(all256Combinations).toHaveLength(256);
    });

    it("evaluates MetricDashboard under all 256 combinations for both 'ojix' and 'baseline' modes without NaN, undefined, or crashes", () => {
      const domainIds: DomainId[] = [
        "legal-os",
        "industrial-erp",
        "clinical-logistics",
        "supply-chain-nexus",
      ];
      const modes: Array<"ojix" | "baseline"> = ["ojix", "baseline"];

      // Check all combinations for all domains
      let evaluationsCount = 0;
      for (const domainId of domainIds) {
        const domain = SHOWCASE_DOMAINS[domainId];
        for (const mode of modes) {
          let view: ReturnType<typeof render> | null = null;
          for (const toggles of all256Combinations) {
            const element = (
              <MetricDashboard
                metrics={domain.metrics}
                simulationMode={mode}
                domainId={domainId}
                activeToggles={toggles}
              />
            );

            if (!view) {
              view = render(element);
            } else {
              view.rerender(element);
            }

            const text = view.container.textContent || "";

            // Strictly assert NO literal "undefined" or "NaN" in output text
            expect(text).not.toContain("undefined");
            expect(text).not.toContain("NaN");
            expect(text).not.toContain("null");

            evaluationsCount++;
          }
          view?.unmount();
        }
      }

      // Total evaluations: 4 domains * 2 modes * 256 combos = 2,048 renders
      expect(evaluationsCount).toBe(2048);
    }, 30000);

    it("evaluates WorkflowTopology under all 256 combinations across all 16 node positions without NaN, undefined, or unhandled exceptions", () => {
      const domainIds: DomainId[] = [
        "legal-os",
        "industrial-erp",
        "clinical-logistics",
        "supply-chain-nexus",
      ];

      let topologyEvaluations = 0;
      for (const domainId of domainIds) {
        const domain = SHOWCASE_DOMAINS[domainId];
        for (let nodeIdx = 0; nodeIdx < domain.nodes.length; nodeIdx++) {
          let view: ReturnType<typeof render> | null = null;
          for (const toggles of all256Combinations) {
            const element = (
              <WorkflowTopology
                nodes={domain.nodes}
                selectedNodeIndex={nodeIdx}
                onSelectNode={() => {}}
                simulationMode="ojix"
                activeToggles={toggles}
                domainId={domainId}
              />
            );

            if (!view) {
              view = render(element);
            } else {
              view.rerender(element);
            }

            const text = view.container.textContent || "";
            expect(text).not.toContain("undefined");
            expect(text).not.toContain("NaN");

            // Verify payload inspector rendered valid code block
            const codeEl = view.container.querySelector("code");
            expect(codeEl).not.toBeNull();
            const payloadRaw = codeEl?.textContent || "";
            expect(() => JSON.parse(payloadRaw)).not.toThrow();

            topologyEvaluations++;
          }
          view?.unmount();
        }
      }

      // 4 domains * 4 nodes * 256 combos = 4,096 evaluations
      expect(topologyEvaluations).toBe(4096);
    }, 60000);
  });

  // SUITE 2: Rapid Asynchronous Tab Switching & Clean State Reset
  describe("2. Rapid Asynchronous Tab Switching & State Cleanliness", () => {
    it("resets selectedNodeIndex to 0, clears active toggles, and resets mode to 'ojix' on domain switch", () => {
      render(<ShowcaseSection />);

      // 1. In Legal OS: select node 3 (Statutory Deadline Rule)
      const legalNode3 = screen.getByRole("button", { name: /Statutory Deadline Rule/i });
      fireEvent.click(legalNode3);
      expect(screen.getByText(/STAGE 03 OF 04/i)).toBeInTheDocument();

      // 2. Turn on Adverse Conflict switch
      const conflictToggle = screen.getByRole("switch", {
        name: /Simulate Adverse Entity Conflict/i,
      });
      fireEvent.click(conflictToggle);
      expect(screen.getByText(/ETHICAL WALL PROTOCOL/i)).toBeInTheDocument();

      // 3. Switch to Baseline mode
      const baselineBtn = screen.getByRole("radio", { name: /Fragile.*Baseline/i });
      fireEvent.click(baselineBtn);
      expect(screen.getByText(/\+420% Lag/i)).toBeInTheDocument();

      // 4. Switch domain to Industrial ERP
      const erpTab = screen.getByRole("tab", { name: /Industrial ERP/i });
      fireEvent.click(erpTab);

      // Verify node reset to Stage 01
      expect(screen.getByText(/STAGE 01 OF 04/i)).toBeInTheDocument();
      expect(screen.getByText(/Work Order Trigger/i)).toBeInTheDocument();

      // Verify mode reset to OJIX Engineered Core (not Fragile Baseline)
      expect(screen.getByText(/98% Faster/i)).toBeInTheDocument();
      expect(screen.queryByText(/\+420% Lag/i)).not.toBeInTheDocument();

      // Verify Industrial ERP toggles are in their default state (switch unchecked)
      const erpToolToggle = screen.getByRole("switch", {
        name: /Simulate Tool Wear Excursion/i,
      });
      expect(erpToolToggle).toHaveAttribute("aria-checked", "false");
    });

    it("executes high-frequency rapid asynchronous switching across all 4 domain tabs without desynchronization", async () => {
      render(<ShowcaseSection />);

      const tabSequence: DomainId[] = [
        "legal-os",
        "industrial-erp",
        "clinical-logistics",
        "supply-chain-nexus",
        "clinical-logistics",
        "legal-os",
        "supply-chain-nexus",
        "industrial-erp",
      ];

      const domainLabels: Record<DomainId, RegExp> = {
        "legal-os": /Legal OS/i,
        "industrial-erp": /Industrial ERP/i,
        "clinical-logistics": /Clinical Logistics/i,
        "supply-chain-nexus": /Supply Chain/i,
      };

      const expectedKeywords: Record<DomainId, string> = {
        "legal-os": "Court Docket Ingestion",
        "industrial-erp": "Work Order Trigger",
        "clinical-logistics": "Pickup Accession",
        "supply-chain-nexus": "EDI 850 Release",
      };

      for (let i = 0; i < 3; i++) {
        for (const domId of tabSequence) {
          const tabBtn = screen.getByRole("tab", { name: domainLabels[domId] });
          fireEvent.click(tabBtn);

          // Asynchronous microtask yield
          await act(async () => {
            await new Promise((r) => setTimeout(r, 5));
          });

          // State must be consistent with the clicked tab
          expect(screen.getByText(expectedKeywords[domId])).toBeInTheDocument();
          expect(screen.getByText(/STAGE 01 OF 04/i)).toBeInTheDocument();
        }
      }
    }, 30000);

    it("ensures no cross-domain state pollution when toggling in one domain then switching to another", () => {
      render(<ShowcaseSection />);

      // Activate toggle in Clinical Logistics
      fireEvent.click(screen.getByRole("tab", { name: /Clinical Logistics/i }));
      const excursionToggle = screen.getByRole("switch", {
        name: /Simulate Cold-Chain Thermal Excursion/i,
      });
      fireEvent.click(excursionToggle);
      expect(screen.getByText(/CAP EXCURSION PROTOCOL 14.2 ENFORCED/i)).toBeInTheDocument();

      // Immediately switch to Supply Chain
      fireEvent.click(screen.getByRole("tab", { name: /Supply Chain/i }));

      // Compliance headline must be Supply Chain default, NOT contaminated by clinical quarantine
      expect(screen.getByText("100% Carrier Verified")).toBeInTheDocument();
      expect(screen.queryByText(/CAP EXCURSION PROTOCOL/i)).not.toBeInTheDocument();

      // Switch back to Clinical Logistics - should reset to clean state
      fireEvent.click(screen.getByRole("tab", { name: /Clinical Logistics/i }));
      expect(screen.getByText("CAP / CLIA Certified")).toBeInTheDocument();
    });
  });

  // SUITE 3: Strict JSON Syntax and Schema Validation Across All 16 Nodes & Exception Payloads
  describe("3. Strict JSON Syntax & Contract Validation Across All Payloads", () => {
    it("runs strict JSON.parse on every single normal payload string across all 16 showcase nodes", () => {
      const domains = Object.values(SHOWCASE_DOMAINS);
      expect(domains).toHaveLength(4);

      let totalNormalNodes = 0;
      for (const domain of domains) {
        expect(domain.nodes).toHaveLength(4);
        for (const node of domain.nodes) {
          totalNormalNodes++;

          // Must be non-empty string
          expect(node.payloadSnippet).toBeTruthy();
          expect(typeof node.payloadSnippet).toBe("string");

          // Strict parse
          let parsed: Record<string, unknown> = {};
          expect(() => {
            parsed = JSON.parse(node.payloadSnippet) as Record<string, unknown>;
          }).not.toThrow();

          // Must be an object with at least 3 fields
          expect(typeof parsed).toBe("object");
          expect(parsed).not.toBeNull();
          expect(Object.keys(parsed).length).toBeGreaterThanOrEqual(3);

          // Must not contain NaN or undefined
          const serialized = JSON.stringify(parsed);
          expect(serialized).not.toContain("null");
          expect(serialized).not.toContain("undefined");
          expect(serialized).not.toContain("NaN");
        }
      }

      expect(totalNormalNodes).toBe(16);
    });

    it("runs strict JSON.parse on every single exception payload snippet defined in SHOWCASE_DOMAINS", () => {
      const domains = Object.values(SHOWCASE_DOMAINS);
      let exceptionCount = 0;

      for (const domain of domains) {
        for (const node of domain.nodes) {
          if (node.exceptionPayloadSnippet) {
            exceptionCount++;
            const snippet = node.exceptionPayloadSnippet;
            expect(typeof snippet).toBe("string");
            expect(snippet.trim().length).toBeGreaterThan(0);

            let parsed: Record<string, unknown> = {};
            expect(() => {
              parsed = JSON.parse(snippet) as Record<string, unknown>;
            }).not.toThrow();

            expect(typeof parsed).toBe("object");
            expect(parsed).not.toBeNull();
            expect(Object.keys(parsed).length).toBeGreaterThanOrEqual(3);
          }
        }
      }

      // Exactly 6 exception payloads are defined (legal: l2, l4; erp: e2; clinical: c2, c4; supply: s2)
      expect(exceptionCount).toBe(6);
    });

    it("verifies all 16 payload snippets in Hero.tsx also render and parse strictly as valid JSON", () => {
      render(<Hero />);
      const sectors = [
        {
          name: /Legal OS/i,
          nodeNames: [
            "Court Docket Ingestion",
            "Conflict & Party Validation",
            "Statutory Deadline Calculator",
            "IOLTA Trust Ledger Sync",
          ],
        },
        {
          name: /Industrial ERP/i,
          nodeNames: [
            "Work Order Release",
            "Raw Material & Tooling Gate",
            "CNC Cell Dynamic Routing",
            "Subcontractor PO 3-Way Match",
          ],
        },
        {
          name: /Clinical Logistics/i,
          nodeNames: [
            "Specimen Pickup Dispatch",
            "Thermal Excursion Guard",
            "Dynamic Courier Route Optimization",
            "Chain of Custody Handover",
          ],
        },
        {
          name: /Supply Chain/i,
          nodeNames: [
            "Purchase Order Release",
            "Carrier Insurance & Authority Gate",
            "Dynamic Freight Tender Engine",
            "Real-Time WMS Ledger Sync",
          ],
        },
      ];

      let totalHeroPayloads = 0;
      for (const sector of sectors) {
        fireEvent.click(screen.getByRole("button", { name: sector.name }));
        for (const nodeName of sector.nodeNames) {
          const nodeBtn = screen.getByRole("button", { name: new RegExp(nodeName, "i") });
          fireEvent.click(nodeBtn);

          const codeElement = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === "code" && content.includes("{");
          });
          expect(codeElement).toBeInTheDocument();
          const parsed = JSON.parse(codeElement.textContent || "{}");
          expect(typeof parsed).toBe("object");
          expect(Object.keys(parsed).length).toBeGreaterThanOrEqual(3);
          totalHeroPayloads++;
        }
      }
      expect(totalHeroPayloads).toBe(16);
    });

    it("verifies exception payloads contain expected interlock/quarantine markers distinct from normal payloads", () => {
      // Legal OS conflict gate
      const legalNode2 = SHOWCASE_DOMAINS["legal-os"].nodes[1]!;
      const normalLegal = JSON.parse(legalNode2.payloadSnippet);
      const excLegal = JSON.parse(legalNode2.exceptionPayloadSnippet!);
      expect(normalLegal.conflict_check).toBe("PASS");
      expect(excLegal.conflict_check).toBe("EXCEPTION_DETECTED");
      expect(excLegal.disbursement_lock).toBe(true);

      // Industrial ERP tool gate
      const erpNode2 = SHOWCASE_DOMAINS["industrial-erp"].nodes[1]!;
      const normalErp = JSON.parse(erpNode2.payloadSnippet);
      const excErp = JSON.parse(erpNode2.exceptionPayloadSnippet!);
      expect(normalErp.allocated).toBe(true);
      expect(excErp.spindle_interlock).toBe("HARDWARE_LOCKED");
      expect(excErp.scrap_prevented_units).toBe(480);

      // Clinical Logistics thermal gate
      const clinicalNode2 = SHOWCASE_DOMAINS["clinical-logistics"].nodes[1]!;
      const normalClinical = JSON.parse(clinicalNode2.payloadSnippet);
      const excClinical = JSON.parse(clinicalNode2.exceptionPayloadSnippet!);
      expect(normalClinical.current_temp).toBe("3.8°C");
      expect(excClinical.current_temp).toBe("9.2°C");
      expect(excClinical.quarantine_action).toBe("AUTO_LOCK_SPECIMEN_NOTIFY_LIMS");

      // Supply Chain carrier gate
      const supplyNode2 = SHOWCASE_DOMAINS["supply-chain-nexus"].nodes[1]!;
      const normalSupply = JSON.parse(supplyNode2.payloadSnippet);
      const excSupply = JSON.parse(supplyNode2.exceptionPayloadSnippet!);
      expect(normalSupply.status).toBe("APPROVED_FOR_TENDER");
      expect(excSupply.status).toBe("REJECTED_DISQUALIFIED");
      expect(excSupply.replacement_carrier).toBe("CARRIER-SWIFT-ALLIANCE");
    });
  });

  // SUITE 4: One-Click Copy Functionality & Tactile Feedback States
  describe("4. One-Click Copy Functionality & Tactile Feedback States", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it("copies active node payload to clipboard and updates button text to COPIED with green accent", async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(<ShowcaseSection />);

      const copyBtn = screen.getByRole("button", { name: /Copy JSON contract payload/i });
      expect(copyBtn).toHaveTextContent(/COPY JSON/i);

      // Trigger click
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      // Verify navigator.clipboard.writeText was called with the active node's payload
      expect(writeTextMock).toHaveBeenCalledTimes(1);
      const calledArg = writeTextMock.mock.calls[0]?.[0];
      expect(calledArg).toContain("2026-CV-88219");

      // Verify button feedback state changes to COPIED
      expect(copyBtn).toHaveTextContent(/COPIED/i);

      // Advance timers by 2000ms
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      // Verify revert back to COPY JSON
      expect(copyBtn).toHaveTextContent(/COPY JSON/i);
    });

    it("gracefully falls back when navigator.clipboard is unavailable without throwing unhandled exceptions", async () => {
      const origClipboard = navigator.clipboard;
      Object.defineProperty(navigator, "clipboard", {
        value: undefined,
        configurable: true,
        writable: true,
      });

      render(<ShowcaseSection />);
      const copyBtn = screen.getByRole("button", { name: /Copy JSON contract payload/i });

      // Should not throw
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(copyBtn).toHaveTextContent(/FAILED TO COPY/i);
      expect(copyBtn).not.toHaveTextContent(/COPIED/i);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(copyBtn).toHaveTextContent(/COPY JSON/i);

      // Restore
      Object.assign(navigator, { clipboard: origClipboard });
    });

    it("gracefully handles rejected writeText promise without crashing", async () => {
      const origClipboard = navigator.clipboard;
      const writeTextMock = vi.fn().mockRejectedValue(new Error("Clipboard permission denied"));
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(<ShowcaseSection />);
      const copyBtn = screen.getByRole("button", { name: /Copy JSON contract payload/i });

      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(copyBtn).toHaveTextContent(/FAILED TO COPY/i);
      expect(copyBtn).not.toHaveTextContent(/COPIED/i);

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(copyBtn).toHaveTextContent(/COPY JSON/i);

      // Restore
      Object.assign(navigator, { clipboard: origClipboard });
    });

    it("verifies tactile press-spring classes are present on the copy button", () => {
      render(<ShowcaseSection />);
      const copyBtn = screen.getByRole("button", { name: /Copy JSON contract payload/i });

      expect(copyBtn.className).toContain("press-spring");
      expect(copyBtn.className).toContain("active:scale-[0.98]");
      expect(copyBtn.className).toContain("min-h-[44px]");
    });
  });

  // SUITE 5: Hostile Boundary Testing & Edge Cases
  describe("5. Hostile Boundary Testing & Robustness", () => {
    it("handles extreme out-of-bounds selectedNodeIndex gracefully (-1, 999, NaN) without crashing", () => {
      const legalDomain = SHOWCASE_DOMAINS["legal-os"];

      // Negative index
      const { container: c1, unmount: u1 } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={-1}
          onSelectNode={() => {}}
          simulationMode="ojix"
        />,
      );
      expect(c1.textContent).toContain("STAGE 01 OF 04");
      u1();

      // High out-of-bounds index (clamped to 3)
      const { container: c2, unmount: u2 } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={999}
          onSelectNode={() => {}}
          simulationMode="ojix"
        />,
      );
      expect(c2.textContent).toContain("STAGE 04 OF 04");
      u2();

      // NaN index
      const { container: c3, unmount: u3 } = render(
        <WorkflowTopology
          nodes={legalDomain.nodes}
          selectedNodeIndex={NaN}
          onSelectNode={() => {}}
          simulationMode="ojix"
        />,
      );
      // Math.min/max with NaN returns NaN, let's verify no unhandled exception was thrown
      expect(c3).toBeInTheDocument();
      u3();
    });

    it("handles empty nodes array gracefully without throwing unhandled exception", () => {
      const { container, unmount } = render(
        <WorkflowTopology
          nodes={[]}
          selectedNodeIndex={0}
          onSelectNode={() => {}}
          simulationMode="ojix"
        />,
      );
      expect(container).toBeInTheDocument();
      expect(container.querySelector("code")?.textContent).toBe("{}");
      unmount();
    });

    it("evaluates supply chain toggle audit protocol and checks Stage 04 reactivity", () => {
      render(<ShowcaseSection />);
      fireEvent.click(screen.getByRole("tab", { name: /Supply Chain/i }));

      // By default, supply_toggle_audit_protocol is "geofence"
      expect(screen.getByText("100% Carrier Verified")).toBeInTheDocument();

      // Switch to "manual"
      const manualBtn = screen.getByRole("radio", { name: /Manual Claim/i });
      fireEvent.click(manualBtn);

      // Verify MetricDashboard reacts
      expect(screen.getByText("GEOFENCE TELEMETRY VALIDATED")).toBeInTheDocument();
    });
  });
});
