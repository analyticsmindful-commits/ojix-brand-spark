import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OjixBrandMosaic } from "@/components/brand-system/OjixBrandMosaic";
import { OjixBrandOutro } from "@/components/brand-system/OjixBrandOutro";

describe("OJIX Brand Guidelines System (Dropbox Brand Architecture)", () => {
  it("renders all 8 architectural brand tiles with accurate numbered headings", () => {
    render(<OjixBrandMosaic />);

    expect(screen.getByText("01 / FRAMEWORK")).toBeInTheDocument();
    expect(screen.getByText("02 / VOICE & TONE")).toBeInTheDocument();
    expect(screen.getByText("03 / IDENTITY")).toBeInTheDocument();
    expect(screen.getByText("04 / TYPOGRAPHY")).toBeInTheDocument();
    expect(screen.getByText("05 / SECURITY")).toBeInTheDocument();
    expect(screen.getByText("06 / CHROMATICS")).toBeInTheDocument();
    expect(screen.getByText("07 / SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText("08 / MOTION")).toBeInTheDocument();
  });

  it("toggles the Zero-Trust cryptographic vault lock on Tile 5 click", () => {
    render(<OjixBrandMosaic />);

    const lockTile = screen.getByLabelText(/Zero-trust cryptographic vault is currently locked/i);
    expect(lockTile).toBeInTheDocument();
    expect(screen.getByText(/SEALED · AES-256/i)).toBeInTheDocument();

    // Click to unlock
    fireEvent.click(lockTile);
    expect(screen.getByText(/DECRYPTED \(EDGE\)/i)).toBeInTheDocument();

    // Keyboard accessibility: space to lock
    fireEvent.keyDown(lockTile, { key: " " });
    expect(screen.getByText(/SEALED · AES-256/i)).toBeInTheDocument();
  });

  it("toggles 24/7 edge solar cycle between Day and Night on Tile 7 click", () => {
    render(<OjixBrandMosaic />);

    const solarTile = screen.getByLabelText(/Currently in Day \/ High-Availability Mode/i);
    expect(solarTile).toBeInTheDocument();
    expect(screen.getByText(/DAY · ACTIVE SLA/i)).toBeInTheDocument();

    // Click to toggle to night
    fireEvent.click(solarTile);
    expect(screen.getByText(/NIGHT · HEALING/i)).toBeInTheDocument();
  });

  it("copies color codes to clipboard on Chromatics tile block click", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<OjixBrandMosaic />);

    const terracottaBlock = screen.getByTitle("Click to copy #C85A17");
    fireEvent.click(terracottaBlock);

    expect(writeTextMock).toHaveBeenCalledWith("#C85A17");
  });

  it("calls onTileClick handler when clicking navigation tiles", () => {
    const handleTileClick = vi.fn();
    render(<OjixBrandMosaic onTileClick={handleTileClick} />);

    const frameworkLink = screen.getByRole("link", {
      name: /Framework & Topology: View interactive workflow architecture/i,
    });
    fireEvent.click(frameworkLink);

    expect(handleTileClick).toHaveBeenCalledWith("framework");
  });
});

describe("OJIX Brand Outro & Multi-User Collaboration Canvas", () => {
  it("renders the Charles Eames architecture conviction quote", () => {
    render(<OjixBrandOutro />);

    expect(
      screen.getByText(/The details are not the details\. They make the architecture\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/The OJIX Systems Manifesto/i)).toBeInTheDocument();
  });

  it("renders multi-user collaborative cursor tags across partners and engineers", () => {
    render(<OjixBrandOutro />);

    expect(screen.getByText("Deepak R.")).toBeInTheDocument();
    expect(screen.getByText("Jain Anveshana")).toBeInTheDocument();
    expect(screen.getByText("BSG Karnataka")).toBeInTheDocument();
    expect(screen.getByText("BNN Family Law")).toBeInTheDocument();
    expect(screen.getByText("GVS Law Chambers")).toBeInTheDocument();
    expect(screen.getByText("Ramees Enterprises")).toBeInTheDocument();
    expect(screen.getByText("Worexa")).toBeInTheDocument();
    expect(screen.getByText("Nele Architecture")).toBeInTheDocument();
  });

  it("renders action toolkit buttons for architecture review and founder terminal", () => {
    render(<OjixBrandOutro />);

    expect(
      screen.getByRole("link", { name: /Schedule 30-Min Architecture Audit/i }),
    ).toHaveAttribute("href", "#extraction");
    expect(
      screen.getByRole("link", { name: /Founder Ingress: engineering@ojix\.in/i }),
    ).toHaveAttribute("href", "mailto:engineering@ojix.in");
    expect(screen.getByRole("link", { name: /Mutual NDA & IP Protection/i })).toHaveAttribute(
      "href",
      "#top",
    );
  });
});
