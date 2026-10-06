import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { Hero } from "@/components/hero/Hero";
import { Navbar, NAV_LINKS } from "@/components/layout/Navbar";
import fs from "node:fs";
import path from "node:path";

describe("Adversarial Stress Suite: Hero.tsx Interactivity", () => {
  it(
    "rapidly switches across all 4 operational sectors without state desynchronization",
    () => {
      render(<Hero />);

      const sectors = [
        { name: /Legal OS/i, expectedAudience: /Multi-Partner Law Firms/i },
        { name: /Industrial ERP/i, expectedAudience: /Industrial Mid-Market/i },
        { name: /Clinical Logistics/i, expectedAudience: /Regional Diagnostic Networks/i },
        { name: /Supply Chain/i, expectedAudience: /High-Throughput Distribution/i },
      ];

      // Pre-query sector buttons once to avoid 12 redundant accessible DOM tree traversals
      const sectorButtons = sectors.map((sector) => ({
        btn: screen.getByRole("button", { name: sector.name }),
        expectedAudience: sector.expectedAudience,
      }));

      // Rapid cycle switching
      for (let cycle = 0; cycle < 3; cycle++) {
        for (const { btn, expectedAudience } of sectorButtons) {
          fireEvent.click(btn);
          expect(screen.getByText(expectedAudience)).toBeInTheDocument();
        }
      }
    },
    30000,
  );

  it(
    "maintains valid JSON payloads and updates contracts for all 16 node/sector combinations",
    () => {
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

      for (const sector of sectors) {
        fireEvent.click(screen.getByRole("button", { name: sector.name }));

        for (let i = 0; i < sector.nodeNames.length; i++) {
          const nodeName = sector.nodeNames[i]!;
          const nodeBtn = screen.getByRole("button", { name: new RegExp(nodeName, "i") });
          fireEvent.click(nodeBtn);

          // Verify Node inspection header
          expect(
            screen.getByText(new RegExp(`Node Inspection: ${nodeName}`, "i")),
          ).toBeInTheDocument();

          // Verify Node indicator in footer
          expect(screen.getByText(new RegExp(`NODE ${i + 1} OF 4`, "i"))).toBeInTheDocument();

          // Extract the code block text and verify valid JSON parse
          const codeElement = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === "code" && content.includes("{");
          });
          expect(codeElement).toBeInTheDocument();
          const jsonText = codeElement.textContent || "";
          expect(() => JSON.parse(jsonText)).not.toThrow();
        }
      }
    },
    30000,
  );

  it("resets selected node index to 0 when switching sectors", () => {
    render(<Hero />);

    // In Legal OS, select node 4 (IOLTA Trust Ledger Sync)
    const node4 = screen.getByRole("button", { name: /IOLTA Trust Ledger Sync/i });
    fireEvent.click(node4);
    expect(screen.getByText(/NODE 4 OF 4/i)).toBeInTheDocument();

    // Switch to Industrial ERP
    fireEvent.click(screen.getByRole("button", { name: /Industrial ERP/i }));

    // Should reset to node 1
    expect(screen.getByText(/NODE 1 OF 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Node Inspection: Work Order Release/i)).toBeInTheDocument();
  });

  it("correctly toggles Baseline vs OJIX Core across all sectors and propagates state to metrics and node inspection", () => {
    render(<Hero />);

    const sectors = [
      { name: /Legal OS/i, baselineLeak: /18% unbilled billable hours lost/i },
      { name: /Industrial ERP/i, baselineLeak: /7.4% scrap rate from unverified change orders/i },
      {
        name: /Clinical Logistics/i,
        baselineLeak: /12% specimen redraw rate due to unmonitored cold-chain/i,
      },
      { name: /Supply Chain/i, baselineLeak: /Overbilling from untracked detention hours/i },
    ];

    const baselineBtn = screen.getByRole("button", { name: "Baseline" });
    const ojixBtn = screen.getByRole("button", { name: "OJIX Core" });

    for (const sector of sectors) {
      fireEvent.click(screen.getByRole("button", { name: sector.name }));

      // Switch to Baseline
      fireEvent.click(baselineBtn);
      expect(screen.getByText(/FRAGILE REALITY:/i)).toBeInTheDocument();
      expect(screen.getByText("0% Tracked")).toBeInTheDocument();
      expect(screen.getByText("-$18.4K / mo")).toBeInTheDocument();
      expect(screen.getByText("+420%")).toBeInTheDocument();

      // Check node inspection shows fragile status
      expect(screen.getByText(/Status:/i)).toBeInTheDocument();

      // Switch back to OJIX Core
      fireEvent.click(ojixBtn);
      expect(screen.getByText(/DETERMINISTIC PIPELINE:/i)).toBeInTheDocument();
      expect(screen.queryByText("0% Tracked")).not.toBeInTheDocument();
      expect(screen.queryByText("-$18.4K / mo")).not.toBeInTheDocument();
    }
  });

  it("triggers callback handlers for primary and secondary CTAs", () => {
    const handleExtraction = vi.fn();
    const handleBlueprints = vi.fn();

    render(<Hero onScheduleExtraction={handleExtraction} onInspectBlueprints={handleBlueprints} />);

    const primaryCta = screen.getByRole("link", { name: /Schedule Operational Extraction/i });
    fireEvent.click(primaryCta);
    expect(handleExtraction).toHaveBeenCalledTimes(1);

    const secondaryCta = screen.getByRole("link", { name: /Inspect Blueprints/i });
    fireEvent.click(secondaryCta);
    expect(handleBlueprints).toHaveBeenCalledTimes(1);
  });

  it("handles initialDomainId prop directly on mount", () => {
    render(<Hero initialDomainId="supply-chain-nexus" />);

    expect(
      screen.getByText(/High-Throughput Distribution & Freight Brokerages/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Purchase Order Release/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/NODE 1 OF 4/i)).toBeInTheDocument();
  });

  it("handles title without ' for ' boundary gracefully", () => {
    render(<Hero title="Autonomous Cloud Operating Architecture" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Autonomous Cloud Operating Architecture" }),
    ).toBeInTheDocument();
  });

  it("demonstrates edge case: title with multiple ' for ' segments drops subsequent segments", () => {
    // Adversarial challenge: "Custom Systems for Enterprise for Logistics"
    render(<Hero title="Custom Systems for Enterprise for Logistics" />);

    // Because Hero uses title.split(" for ")[0] and title.split(" for ")[1], "for Logistics" is dropped!
    const heading = screen.getByRole("heading", { level: 1 });
    // Empirical observation of behavior:
    expect(heading.textContent).toContain("Custom Systems forEnterprise");
    expect(heading.textContent).not.toContain("Logistics");
  });
});

describe("Adversarial Stress Suite: Navbar.tsx Interactivity & Edge Cases", () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    document.body.style.overflow = "";
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    document.body.style.overflow = "";
  });

  it("toggles mobile drawer open and closed repeatedly under rapid clicks", () => {
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText("Open navigation menu");

    for (let i = 0; i < 5; i++) {
      fireEvent.click(toggleBtn);
      expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();
      expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

      fireEvent.click(toggleBtn);
      expect(
        screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
      ).not.toBeInTheDocument();
      expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("locks document.body.style.overflow to 'hidden' when open and restores '' when closed", () => {
    const { unmount } = render(<Navbar />);

    expect(document.body.style.overflow).toBe("");

    const toggleBtn = screen.getByLabelText("Open navigation menu");
    fireEvent.click(toggleBtn);
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(toggleBtn);
    expect(document.body.style.overflow).toBe("");

    // Test unmount cleanup while open
    fireEvent.click(toggleBtn);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes mobile drawer upon pressing the Escape key, ignoring other keys", () => {
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText("Open navigation menu");
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();

    // Irrelevant keys
    fireEvent.keyDown(window, { key: "Tab" });
    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: " " });
    expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();

    // Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(
      screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("automatically closes mobile drawer when window resizes across 1024px threshold", () => {
    window.innerWidth = 500;
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText("Open navigation menu");
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    // Resize within mobile/tablet range (< 1024px)
    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();

    // Resize to desktop range (>= 1024px)
    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event("resize"));
    });
    expect(
      screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("dismisses mobile drawer when clicking any navigation link or the extraction CTA", () => {
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText("Open navigation menu");

    // Test dismissing for each navigation link
    for (const link of NAV_LINKS) {
      fireEvent.click(toggleBtn);
      expect(screen.getByRole("dialog", { name: "Mobile Navigation Drawer" })).toBeInTheDocument();

      const drawerLinks = screen.getAllByRole("link", { name: new RegExp(link.label, "i") });
      // The mobile drawer link is inside the dialog
      const mobileLink = drawerLinks.find((el) => el.closest("#mobile-nav-drawer"));
      expect(mobileLink).toBeDefined();

      fireEvent.click(mobileLink!);
      expect(
        screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
      ).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe("");
    }

    // Test dismissing for the mobile drawer CTA button
    fireEvent.click(toggleBtn);
    const drawerCta = screen
      .getAllByRole("link", { name: /Initialize Project/i })
      .find((el) => el.closest("#mobile-nav-drawer"));
    expect(drawerCta).toBeDefined();
    fireEvent.click(drawerCta!);
    expect(
      screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
    ).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("empirically verifies touch target dimensions in mobile navigation drawer", () => {
    render(<Navbar />);

    const toggleBtn = screen.getByLabelText("Open navigation menu");
    // Verify toggle button sizing classes
    expect(toggleBtn.className).toContain("size-9"); // 36px x 36px

    fireEvent.click(toggleBtn);
    const drawer = screen.getByRole("dialog", { name: "Mobile Navigation Drawer" });

    // Verify all mobile link touch targets are min-h-[48px]
    const links = drawer.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.className).toContain("min-h-[48px]");
    });
  });
});

describe("Adversarial Stress Suite: Motion & Reduced Motion Accessibility", () => {
  it("verifies styles.css provides comprehensive @media (prefers-reduced-motion: reduce) overrides", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Verify reduced motion block exists
    expect(cssContent).toContain("@media (prefers-reduced-motion: reduce)");

    // Verify universal animation and transition cancellation
    expect(cssContent).toContain("animation-duration: 0.01ms !important");
    expect(cssContent).toContain("animation-iteration-count: 1 !important");
    expect(cssContent).toContain("transition-duration: 0.01ms !important");
    expect(cssContent).toContain("scroll-behavior: auto !important");

    // Verify explicit keyframe animation cancellations
    expect(cssContent).toContain(".animate-marquee,");
    expect(cssContent).toContain(".animate-rise,");
    expect(cssContent).toContain(".animate-blink,");
    expect(cssContent).toContain(".animate-radar");
    expect(cssContent).toContain("animation: none !important");

    // Verify reveal and press-spring overrides under reduced motion
    expect(cssContent).toContain(".reveal {");
    expect(cssContent).toContain("opacity: 1 !important");
    expect(cssContent).toContain("transform: none !important");
    expect(cssContent).toContain(".press-spring:active {");
    expect(cssContent).toContain("transform: none !important");
  });
});
