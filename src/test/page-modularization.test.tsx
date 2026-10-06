import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IndexPage from "@/routes/index";

describe("Page Modularization & Architecture (`src/routes/index.tsx`)", () => {
  it("mounts all modular components and renders critical landmarks", () => {
    const { container } = render(<IndexPage />);

    // Header landmark
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Main landmark
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Footer landmark
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    // Verify canonical section headings exist
    expect(
      screen.getByRole("heading", {
        name: /Custom Operating Systems for Non-Standard Operations/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Software Built Around Your Operational Topology/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /From Messy Operational Reality to Scalable Production Cloud/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Your Organization Already Has a System/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Engineering Foundation Built for Operational Rigor/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Direct Answers for Pragmatic Operators/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Have a Mission-Critical Workflow Worth Solving in Code\?/i,
      }),
    ).toBeInTheDocument();

    // Verify all canonical anchor target IDs exist on the DOM
    const requiredAnchorIds = [
      "top",
      "hero",
      "portfolio",
      "methodology",
      "xray",
      "engineering",
      "faq",
      "extraction",
    ];

    for (const id of requiredAnchorIds) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
