import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero/Hero";

describe("Hero Component (Above-The-Fold Value Architecture)", () => {
  it("answers (1) What it is via eyebrow and headline", () => {
    render(<Hero />);

    expect(screen.getByText("BESPOKE OPERATING SYSTEMS")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Custom Operating Systems for Non-Standard Operations/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Off-the-shelf SaaS forces non-standard operations into rigid boxes/i),
    ).toBeInTheDocument();
  });

  it("answers (2) Who it is for via sector selector chips and target audience readout", () => {
    render(<Hero />);

    expect(screen.getByText("Target Operational Sectors:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Legal OS/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Industrial ERP/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clinical Logistics/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Supply Chain/i })).toBeInTheDocument();

    // Default target audience
    expect(
      screen.getByText(/Multi-Partner Law Firms & Complex Litigation Practices/i),
    ).toBeInTheDocument();
  });

  it("answers (3) Why it matters via diagnostic reality vs engineered core", () => {
    render(<Hero />);

    expect(screen.getByText("The High Cost of Operational Drift:")).toBeInTheDocument();
    expect(screen.getByText("Margin Leakage:")).toBeInTheDocument();
    expect(screen.getByText("Zero Audit Trail:")).toBeInTheDocument();
  });

  it("answers (4) What to do next via prominent primary action CTA", () => {
    render(<Hero />);

    const primaryCta = screen.getByRole("link", {
      name: /Schedule Operational Extraction/i,
    });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("data-magnetic", "true");
    expect(primaryCta).toHaveAttribute("href", "#extraction");

    const secondaryCta = screen.getByRole("link", {
      name: /Inspect Blueprints/i,
    });
    expect(secondaryCta).toBeInTheDocument();
  });

  it("switches domains and updates operational parameters", () => {
    render(<Hero />);

    const erpButton = screen.getByRole("button", { name: /Industrial ERP/i });
    fireEvent.click(erpButton);

    expect(
      screen.getByText(/Industrial Mid-Market & Multi-Facility Manufacturing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Shop-Floor Dispatch, Subcontractor Ledgers & BOM Costing/i),
    ).toBeInTheDocument();
    expect(screen.getByText("ISO 9001 Traceable")).toBeInTheDocument();
  });

  it("toggles between Baseline and OJIX Core simulation modes", () => {
    render(<Hero />);

    const baselineButton = screen.getByRole("button", { name: "Baseline" });
    const ojixButton = screen.getByRole("button", { name: "OJIX Core" });

    // Initial mode is OJIX Core
    expect(screen.getByText(/DETERMINISTIC PIPELINE:/i)).toBeInTheDocument();

    // Toggle to baseline
    fireEvent.click(baselineButton);
    expect(screen.getByText(/FRAGILE REALITY:/i)).toBeInTheDocument();
    expect(screen.getByText("0% Tracked")).toBeInTheDocument();

    // Toggle back to OJIX
    fireEvent.click(ojixButton);
    expect(screen.getByText(/DETERMINISTIC PIPELINE:/i)).toBeInTheDocument();
    expect(screen.getByText("100% Bar Compliant")).toBeInTheDocument();
  });

  it("inspects pipeline topology nodes and updates payload snippet", () => {
    render(<Hero />);

    expect(screen.getByText(/Node Inspection: Court Docket Ingestion/i)).toBeInTheDocument();
    expect(screen.getByText(/Motion for Summary Judgment/i)).toBeInTheDocument();

    // Click on node 2 (Conflict & Party Validation)
    const node2 = screen.getByRole("button", { name: /Conflict & Party Validation/i });
    fireEvent.click(node2);

    expect(screen.getByText(/Node Inspection: Conflict & Party Validation/i)).toBeInTheDocument();
    expect(screen.getByText(/entity_nodes_evaluated/i)).toBeInTheDocument();
  });
});
