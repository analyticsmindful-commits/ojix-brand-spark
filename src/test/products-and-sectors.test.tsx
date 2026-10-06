import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductsSection, PRODUCTS_DATA } from "@/components/products/ProductsSection";
import { SevenSectorsSection, SEVEN_SECTORS } from "@/components/sectors/SevenSectorsSection";
import { ClientTrustSection } from "@/components/clients/ClientTrustSection";
import IndexPage from "@/routes/index";

describe("ProductsSection & SevenSectorsSection (Mission-Critical Focus)", () => {
  it("renders all 4 flagship products and allows interactive tab switching", () => {
    render(<ProductsSection />);

    // Check heading
    expect(
      screen.getByRole("heading", { name: /Product-Driven Software Engineering/i }),
    ).toBeInTheDocument();

    // Verify all 4 products exist in tab list
    expect(screen.getByRole("tab", { name: /OJIX LawX/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /OJIX AI ProctX/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /OJIX OCR/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /OJIX DDFS/i })).toBeInTheDocument();

    // Default active is LawX
    expect(screen.getByText("LAWTECH // PRODUCT 01")).toBeInTheDocument();
    expect(screen.getByText(/14ms/i)).toBeInTheDocument();

    // Switch to OJIX AI ProctX
    const proctxTab = screen.getByRole("tab", { name: /OJIX AI ProctX/i });
    fireEvent.click(proctxTab);
    expect(screen.getByText("EDTECH // PRODUCT 02")).toBeInTheDocument();
    expect(screen.getByText(/50,000\+/i)).toBeInTheDocument();

    // Switch to OJIX OCR
    const ocrTab = screen.getByRole("tab", { name: /OJIX OCR/i });
    fireEvent.click(ocrTab);
    expect(screen.getByText("INTELLIGENT IDP // PRODUCT 03")).toBeInTheDocument();
    expect(screen.getByText(/99\.4%/i)).toBeInTheDocument();

    // Switch to OJIX DDFS
    const ddfsTab = screen.getByRole("tab", { name: /OJIX DDFS/i });
    fireEvent.click(ddfsTab);
    expect(screen.getByText("DATA FABRIC // PRODUCT 04")).toBeInTheDocument();
    expect(screen.getByText(/SHA-256 Chained/i)).toBeInTheDocument();
  });

  it("renders all Seven Mission-Critical Sectors including LawTech with correct focus", () => {
    render(<SevenSectorsSection />);

    // Check section heading
    expect(
      screen.getByRole("heading", { name: /Seven Mission-Critical Sectors/i }),
    ).toBeInTheDocument();

    // Verify all 7 sectors are present
    const expectedSectors = [
      "SaaS",
      "FinTech",
      "HealthTech",
      "E-commerce",
      "EdTech",
      "LogisticsTech",
      "LawTech",
    ];

    for (const sectorName of expectedSectors) {
      expect(
        screen.getByRole("heading", { name: new RegExp(`^${sectorName}$`, "i") }),
      ).toBeInTheDocument();
    }

    // Verify LawTech focus is explicitly rendered
    expect(
      screen.getByText(/AI-powered legal technology, case management, and compliance workflows/i),
    ).toBeInTheDocument();

    // Verify sector count
    expect(SEVEN_SECTORS.length).toBe(7);
  });

  it("renders all 8 verified client logos and displays their operational scope", () => {
    render(<ClientTrustSection />);

    expect(
      screen.getByRole("heading", { name: /Trusted by High-Stakes Enterprises/i }),
    ).toBeInTheDocument();

    const expectedClients = [
      "Jain Anveshana",
      "BSG Karnataka",
      "BNN Family Law Chambers",
      "GVS Law Chambers",
      "Ashwik Law Associates",
      "Ramees Enterprises",
      "Worexa",
      "Nele - Architecture and Planning",
    ];

    for (const clientName of expectedClients) {
      expect(
        screen.getByLabelText(new RegExp(`View engagement profile for ${clientName}`, "i")),
      ).toBeInTheDocument();
    }

    // Default spotlight is Jain Anveshana
    expect(screen.getByText("50,000+")).toBeInTheDocument();
    expect(screen.getByText(/Concurrent Exam Sessions/i)).toBeInTheDocument();

    // Click BSG Karnataka
    const bsgBtn = screen.getByLabelText(/View engagement profile for BSG Karnataka/i);
    fireEvent.click(bsgBtn);
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText(/Digital Credential Integrity/i)).toBeInTheDocument();

    // Click BNN Family Law Chambers
    const bnnBtn = screen.getByLabelText(/View engagement profile for BNN Family Law Chambers/i);
    fireEvent.click(bnnBtn);
    expect(screen.getByText("-90%")).toBeInTheDocument();
    expect(screen.getByText(/Docket Intake Lag/i)).toBeInTheDocument();
  });

  it("mounts Clients, Products and Sectors on IndexPage with anchor targets", () => {
    const { container } = render(<IndexPage />);

    expect(container.querySelector("#clients")).not.toBeNull();
    expect(container.querySelector("#products")).not.toBeNull();
    expect(container.querySelector("#sectors")).not.toBeNull();
  });
});
