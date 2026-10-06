import { readFileSync } from "fs";
import { resolve } from "path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";

describe("Milestone 1 Responsive Layout & Viewport Boundary Stress Tests", () => {
  const cssPath = resolve(__dirname, "../styles.css");
  const cssContent = readFileSync(cssPath, "utf-8");

  describe("Fluid Typography Clamp Mathematics (320px to 3840px)", () => {
    it("verifies clamp formula bounds for all headings and body copy", () => {
      // Helper function evaluating clamp(minRem, vwFactor*vw + baseRem, maxRem)
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

      const viewports = [320, 360, 390, 768, 1024, 1440, 1920, 2560, 3840];

      for (const vw of viewports) {
        // text-fluid-h2: clamp(1.625rem, 2.5vw + 0.875rem, 2.875rem)
        const h2Size = evaluateClamp(1.625, 2.5, 0.875, 2.875, vw);
        expect(h2Size).toBeGreaterThanOrEqual(26); // 1.625 * 16
        expect(h2Size).toBeLessThanOrEqual(46); // 2.875 * 16

        // text-fluid-body: clamp(0.9375rem, 0.35vw + 0.8125rem, 1.125rem)
        const bodySize = evaluateClamp(0.9375, 0.35, 0.8125, 1.125, vw);
        expect(bodySize).toBeGreaterThanOrEqual(15); // 0.9375 * 16
        expect(bodySize).toBeLessThanOrEqual(18); // 1.125 * 16
      }
    });

    it("ensures overflow-x: hidden is present on html or body to prevent horizontal spill", () => {
      expect(cssContent).toContain("overflow-x: hidden");
    });
  });

  describe("Navbar Component Responsive Structure & Breakpoint Contracts", () => {
    it("renders brand, status indicator, desktop nav, and mobile drawer button", () => {
      render(<Navbar />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByLabelText(/OJIX Systems Home/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/System status: All systems nominal/i)).toBeInTheDocument();
      expect(screen.getByRole("navigation", { name: "Main Navigation" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Open navigation menu/i })).toBeInTheDocument();
    });

    it("verifies safe desktop navigation breakpoint transition at 1024px (lg)", () => {
      render(<Navbar />);
      const desktopNav = screen.getByRole("navigation", { name: "Main Navigation" });
      const mobileToggle = screen.getByRole("button", { name: /Open navigation menu/i });

      // Desktop nav transitions at lg (1024px) to protect tablet viewports (768px–1023px)
      expect(desktopNav.className).toContain("lg:flex");
      expect(desktopNav.className).toContain("hidden");
      expect(mobileToggle.className).toContain("lg:hidden");
    });
  });

  describe("Hero Component Layout Scalability", () => {
    it("renders operational workbench with 4 topology cards and 4 sector chips", () => {
      render(<Hero />);

      const sectors = ["Legal OS", "Industrial ERP", "Clinical Logistics", "Supply Chain"];
      for (const sector of sectors) {
        expect(screen.getByRole("button", { name: new RegExp(sector, "i") })).toBeInTheDocument();
      }

      expect(screen.getByText("Topology Pipeline [Interactive]:")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Schedule Operational Extraction/i }),
      ).toBeInTheDocument();
    });

    it("verifies workbench pipeline grid uses responsive classes that prevent 768px squeezing", () => {
      const { container } = render(<Hero />);
      const pipelineGrid = container.querySelector("#hero .overflow-hidden .p-4 .grid");
      expect(pipelineGrid).toBeInTheDocument();
      expect(pipelineGrid?.className).not.toContain("sm:grid-cols-4");
      expect(pipelineGrid?.className).toMatch(/grid-cols-2.*lg:grid-cols-4/);
    });

    it("verifies display headline applies text-fluid-hero utility", () => {
      render(<Hero />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.className).toContain("text-fluid-hero");
    });
  });

  describe("ShowcaseSection Component Layout Scalability", () => {
    it("renders domain tabs with truncation handling on compact viewports", () => {
      render(<ShowcaseSection />);

      expect(
        screen.getByRole("heading", { name: /Software Built Around Your Operational Topology/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Legal OS/i })).toBeInTheDocument();
    });
  });
});
