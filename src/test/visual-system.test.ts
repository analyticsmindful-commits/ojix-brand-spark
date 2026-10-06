import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";

describe("Milestone 1 Visual System & Fluid Clamp Typography", () => {
  const cssPath = resolve(__dirname, "../styles.css");
  const cssContent = readFileSync(cssPath, "utf-8");

  it("removes all legacy neo-brutalist pastel tokens", () => {
    const legacyTokens = [
      "--color-coral",
      "--color-sun",
      "--color-mint",
      "--color-sky",
      "--color-blush",
      "--color-plum",
      "--color-ocean",
      "--coral:",
      "--sun:",
      "--mint:",
      "--sky:",
      "--blush:",
      "--plum:",
      "--ocean:",
    ];

    for (const token of legacyTokens) {
      expect(cssContent).not.toContain(token);
    }
  });

  it("defines all official OJIX editorial palette tokens", () => {
    const officialTokens = [
      "--ojix-terracotta: #c85a17",
      "--ojix-navy: #0b1320",
      "--ojix-paper: #faf8f5",
      "--ojix-white: #ffffff",
      "--ojix-border: #e5e0d8",
      "--ojix-slate: #4b5563",
      "--ojix-emerald: #059669",
    ];

    const lowerCss = cssContent.toLowerCase();
    for (const token of officialTokens) {
      expect(lowerCss).toContain(token);
    }
  });

  it("defines all 7 fluid clamp typography utilities", () => {
    const requiredUtilities = [
      "@utility text-fluid-hero",
      "@utility text-fluid-h1",
      "@utility text-fluid-h2",
      "@utility text-fluid-h3",
      "@utility text-fluid-h4",
      "@utility text-fluid-body",
      "@utility text-fluid-mono",
    ];

    for (const util of requiredUtilities) {
      expect(cssContent).toContain(util);
    }
  });

  it("defines architectural geometry and press-spring micro-interaction", () => {
    expect(cssContent).toContain("--radius: 0.5rem");
    expect(cssContent).toContain("@utility press-spring");
    expect(cssContent).toContain("cubic-bezier(0.34, 1.56, 0.64, 1)");
    expect(cssContent).toContain("transform: scale(0.97)");
  });

  it("includes comprehensive prefers-reduced-motion accessibility coverage", () => {
    expect(cssContent).toContain("@media (prefers-reduced-motion: reduce)");
    expect(cssContent).toContain("animation-duration: 0.01ms !important");
    expect(cssContent).toContain("transition-duration: 0.01ms !important");
    expect(cssContent).toContain("scroll-behavior: auto !important");
  });
});
