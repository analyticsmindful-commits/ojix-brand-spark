import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar, NAV_LINKS } from "@/components/layout/Navbar";
import { Footer, FOOTER_SITEMAP } from "@/components/layout/Footer";

describe("Navbar Component", () => {
  it("renders OJIX brand monogram and live status indicator", () => {
    render(<Navbar />);

    expect(screen.getByLabelText("OJIX Systems Home")).toBeInTheDocument();
    expect(screen.getByText("OJ")).toBeInTheDocument();
    expect(screen.getByText("IX")).toBeInTheDocument();
    expect(screen.getByLabelText("System status: All systems nominal")).toBeInTheDocument();
    expect(screen.getByText(/NOMINAL/)).toBeInTheDocument();
  });

  it("renders all 5 canonical anchor links", () => {
    render(<Navbar />);

    for (const link of NAV_LINKS) {
      const elements = screen.getAllByRole("link", { name: new RegExp(link.label, "i") });
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toHaveAttribute("href", link.href);
    }
  });

  it("renders primary action button with magnetic target attribute", () => {
    render(<Navbar />);

    const ctaLinks = screen.getAllByRole("link", { name: /Initialize Project/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute("data-magnetic", "true");
  });

  it("toggles mobile navigation drawer on hamburger button click", () => {
    render(<Navbar />);

    const toggleButton = screen.getByLabelText("Open navigation menu");
    expect(toggleButton).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
    ).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    const drawer = screen.getByRole("dialog", { name: "Mobile Navigation Drawer" });
    expect(drawer).toBeInTheDocument();

    // Close on click
    fireEvent.click(toggleButton);
    expect(
      screen.queryByRole("dialog", { name: "Mobile Navigation Drawer" }),
    ).not.toBeInTheDocument();
  });
});

describe("Footer Component", () => {
  it("renders legal entity name and institutional description", () => {
    render(<Footer />);

    const legalElements = screen.getAllByText("OJIX Engineering & Technology LLP");
    expect(legalElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Independent enterprise software studio/i)).toBeInTheDocument();
  });

  it("renders architectural sitemap links across categories", () => {
    render(<Footer />);

    expect(screen.getByText("System Blueprints")).toBeInTheDocument();
    expect(screen.getByText("Engineering Core")).toBeInTheDocument();
    expect(screen.getByText("Engagement & Legal")).toBeInTheDocument();

    for (const item of FOOTER_SITEMAP.blueprints) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
  });

  it("renders technical telemetry metrics and copyright bar", () => {
    render(<Footer />);

    expect(screen.getByText("Sub-50ms Edge Execution")).toBeInTheDocument();
    expect(screen.getByText("99.98% High Availability")).toBeInTheDocument();
    expect(screen.getByText("Zero-Exfiltration Isolation")).toBeInTheDocument();
    expect(
      screen.getByText(/© 2026 OJIX Engineering & Technology LLP\. All rights reserved\./),
    ).toBeInTheDocument();
  });
});
