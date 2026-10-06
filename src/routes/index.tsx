import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ClientTrustSection } from "@/components/clients/ClientTrustSection";
import { ProductsSection } from "@/components/products/ProductsSection";
import { SevenSectorsSection } from "@/components/sectors/SevenSectorsSection";
import { ShowcaseSection } from "@/components/showcases/ShowcaseSection";
import { MethodologySection } from "@/components/methodology/MethodologySection";
import { BusinessXRaySection } from "@/components/xray/BusinessXRaySection";
import { EngineeringPillarsSection } from "@/components/engineering/EngineeringPillarsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "OJIX — Autonomous Software Products & Operating Systems | LawX, ProctX, OCR, DDFS",
      },
      {
        name: "description",
        content:
          "OJIX builds enterprise software platforms and custom operating systems for 7 mission-critical sectors. Explore OJIX LawX™ (AI Legal OS), OJIX AI ProctX™ (Exam Integrity), OJIX OCR™ (Intelligent IDP), and OJIX DDFS™ (Distributed Document Fabric).",
      },
      {
        name: "keywords",
        content:
          "AI legal management platform, legal operating system, online proctoring software, exam integrity AI, intelligent document processing, enterprise OCR engine, distributed document file system, custom ERP, LawTech, FinTech, HealthTech, EdTech, LogisticsTech",
      },
      {
        property: "og:title",
        content:
          "OJIX — Autonomous Software Products & Operating Systems | LawX, ProctX, OCR, DDFS",
      },
      {
        property: "og:description",
        content:
          "Proprietary software platforms and custom operating systems replacing manual spreadsheet chaos across 7 mission-critical sectors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OJIX" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "OJIX — Autonomous Software Products & Operating Systems | LawX, ProctX, OCR, DDFS",
      },
      {
        name: "twitter:description",
        content:
          "Proprietary software platforms and custom operating systems replacing manual spreadsheet chaos across 7 mission-critical sectors.",
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://ojix.in/#organization",
        name: "OJIX",
        url: "https://ojix.in",
        logo: "https://ojix.in/logo.png",
        description:
          "Product-driven technology company engineering autonomous software platforms and custom operating systems.",
      },
      {
        "@type": "SoftwareApplication",
        name: "OJIX LawX™",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud",
        description:
          "AI-powered Legal Management Platform and case intelligence system for law firms and corporate legal teams.",
      },
      {
        "@type": "SoftwareApplication",
        name: "OJIX AI ProctX™",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Cloud",
        description:
          "Autonomous AI examination and continuous multimodal online proctoring platform for high-stakes assessment integrity.",
      },
      {
        "@type": "SoftwareApplication",
        name: "OJIX OCR™",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Cloud",
        description:
          "Intelligent Document Processing (IDP) and multimodal vision-language data extraction engine.",
      },
      {
        "@type": "SoftwareApplication",
        name: "OJIX DDFS™",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud",
        description:
          "Distributed Document File System and cryptographically immutable enterprise data fabric.",
      },
    ],
  };

  return (
    <div
      id="top"
      className="min-h-screen bg-[#FAF8F5] text-[#0B1320] antialiased selection:bg-[#C85A17] selection:text-white overflow-x-hidden flex flex-col"
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Sticky Architectural Navigation */}
      <Navbar />

      {/* Main Operational Blueprint Stream */}
      <main className="flex-1">
        {/* Above-the-fold Value Engine & Operational Topology Builder */}
        <Hero />

        {/* Proven Client Engagements & Institutional Logos */}
        <ClientTrustSection />

        {/* 4 Flagship Software Products: LawX, AI ProctX, OCR, DDFS */}
        <ProductsSection />

        {/* 7 Mission-Critical Sectors: SaaS, FinTech, HealthTech, E-commerce, EdTech, LogisticsTech, LawTech */}
        <SevenSectorsSection />

        {/* 4 Core Domain Blueprints: Legal OS, ERP, Clinical Logistics, Supply Chain */}
        <ShowcaseSection />

        {/* 4-Stage Engineering Lifecycle (Diagnostics -> Topology -> Prototype -> Cloud) */}
        <MethodologySection />

        {/* Forensic Audit of Spreadsheet & WhatsApp Leakage */}
        <BusinessXRaySection />

        {/* ERP Core, Autonomous Pipelines, Cloud Infrastructure */}
        <EngineeringPillarsSection />

        {/* Anti-AI Founder FAQs & Direct Answers */}
        <FaqSection />

        {/* Final Magnetic Technical Scoping Intake & Founder Ingress */}
        <FinalCtaSection />
      </main>

      {/* Institutional 12-Column Footer */}
      <Footer />
    </div>
  );
}

export default IndexPage;
