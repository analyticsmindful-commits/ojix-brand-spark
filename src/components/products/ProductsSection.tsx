import { useState } from "react";
import {
  Scale,
  ShieldCheck,
  FileScan,
  HardDrive,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Activity,
  Zap,
  Lock,
  Layers,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductId = "lawx" | "proctx" | "ocr" | "ddfs";

export interface ProductData {
  id: ProductId;
  badge: string;
  name: string;
  seoTitle: string;
  tagline: string;
  description: string;
  primaryKeyword: string;
  icon: React.ComponentType<{ className?: string }>;
  kpis: { label: string; value: string; detail: string }[];
  features: string[];
  architectureStack: string[];
  payloadExample: Record<string, unknown>;
}

export const PRODUCTS_DATA: Record<ProductId, ProductData> = {
  lawx: {
    id: "lawx",
    badge: "LAWTECH // PRODUCT 01",
    name: "OJIX LawX™",
    seoTitle: "Autonomous Legal OS & Case Intelligence Platform",
    tagline:
      "AI-Powered Legal Management Platform for Modern Law Firms and Corporate Legal Counsel.",
    description:
      "Engineered specifically for complex commercial litigation and high-volume practices. Replaces fragmented spreadsheets, untracked WhatsApp partner dispatches, and manual billing reconciliation with an autonomous matter operating system.",
    primaryKeyword: "AI Legal Management Platform",
    icon: Scale,
    kpis: [
      { label: "Docket Ingestion", value: "14ms", detail: "Real-time court e-filing sync" },
      {
        label: "Conflict Detection",
        value: "0 False-Negatives",
        detail: "1,400+ entity graph evaluated",
      },
      {
        label: "Billing Acceleration",
        value: "+38% Realized",
        detail: "Automated work product ledger",
      },
    ],
    features: [
      "Real-time court docket ingestion via automated e-filing webhooks",
      "Relational conflict check evaluating thousands of adverse entities in milliseconds",
      "Automated statutory limitation deadline mapping with jurisdiction-aware rules",
      "Cryptographically auditable IOLTA escrow trust ledger postings",
      "Encrypted attorney-client work product vault with granular privilege controls",
    ],
    architectureStack: [
      "PostgreSQL 16",
      "Graph Traversal API",
      "Webhooks Ingestion",
      "SOC2 Type II",
    ],
    payloadExample: {
      product: "OJIX LawX™ v2.6",
      docket_event: "E_FILING_INGESTED",
      matter_id: "MAT-2026-COMM-994",
      adverse_parties_scanned: 1420,
      conflict_status: "CLEARED_ZERO_MATCH",
      trust_disbursement_lock: false,
      statutory_deadline: "2026-11-14T17:00:00Z",
      integrity_hash: "0x8f2a41d9e2b109c391",
    },
  },
  proctx: {
    id: "proctx",
    badge: "EDTECH // PRODUCT 02",
    name: "OJIX AI ProctX™",
    seoTitle: "Autonomous AI Examination & Multimodal Online Proctoring Suite",
    tagline: "AI-Powered Online Proctoring and High-Stakes Assessment Integrity Platform.",
    description:
      "High-concurrency, zero-latency examination proctoring built for universities, certification bodies, and enterprise hiring pipelines. Delivers continuous multimodal behavioral telemetry without invasive latency or privacy compromises.",
    primaryKeyword: "AI Online Proctoring Platform",
    icon: ShieldCheck,
    kpis: [
      { label: "Concurrent Examinees", value: "50,000+", detail: "Horizontal edge distribution" },
      { label: "Verification Latency", value: "<45ms", detail: "On-device WebAssembly vision" },
      { label: "False Positive Rate", value: "<0.08%", detail: "Multimodal cross-validation" },
    ],
    features: [
      "Continuous multimodal gaze tracking, facial telemetry, and ambient audio anomaly analysis",
      "Air-gapped secure browser environment preventing virtual machine or clipboard leakage",
      "Secondary device electromagnetic and RF anomaly telemetry detection",
      "Seamless LTI 1.3 integration with Canvas, Blackboard, Moodle, and proprietary LMS",
      "Full FERPA, GDPR, and ISO 27001 compliant zero-retention biometric processing",
    ],
    architectureStack: [
      "WebAssembly On-Device AI",
      "WebRTC Low-Latency",
      "LTI 1.3 Standards",
      "Kafka Streaming",
    ],
    payloadExample: {
      product: "OJIX AI ProctX™ v4.1",
      session_id: "EXAM-2026-MED-4412",
      active_examinees: 12450,
      biometric_verification: "CONTINUOUS_VERIFIED",
      anomalies_flagged: 0,
      browser_lockdown_status: "ENFORCED_ZERO_LEAK",
      edge_node_latency: "38ms",
      audit_token: "proctx_jwt_secure_90b2",
    },
  },
  ocr: {
    id: "ocr",
    badge: "INTELLIGENT IDP // PRODUCT 03",
    name: "OJIX OCR™",
    seoTitle: "Intelligent Document Processing (IDP) & Multimodal Extraction Engine",
    tagline: "Intelligent OCR and Document Processing Solution for Messy Enterprise Records.",
    description:
      "Enterprise Vision-Language model engine built to extract structured, validated data from degraded invoices, customs bills of lading, land deeds, handwritten tax forms, and complex nested balance sheet tables.",
    primaryKeyword: "Intelligent Document Processing OCR",
    icon: FileScan,
    kpis: [
      { label: "Field Accuracy", value: "99.4%", detail: "Spatial bounding-box grounding" },
      { label: "Processing Speed", value: "115ms/page", detail: "Parallel GPU inference API" },
      {
        label: "Format Coverage",
        value: "80+ Document Types",
        detail: "Multi-lingual and handwritten",
      },
    ],
    features: [
      "Multimodal vision-language spatial table extraction preserving hierarchical row-column relationships",
      "High-precision handwritten text recognition (HTR) for signatures, stamps, and cursive annotations",
      "Automated two-way and three-way purchase order reconciliation against ERP ledgers",
      "Zero-retention ephemeral processing guaranteeing sensitive financial data remains confidential",
      "REST and gRPC streaming APIs with real-time JSON Schema validation and human-in-the-loop review",
    ],
    architectureStack: [
      "Vision Transformers",
      "PyTorch Inference Engine",
      "gRPC / REST",
      "Spatial Graph OCR",
    ],
    payloadExample: {
      product: "OJIX OCR™ Enterprise v3.0",
      job_id: "DOC-EXTRACT-77189",
      document_type: "CUSTOMS_BILL_OF_LADING",
      pages_processed: 4,
      tables_extracted: 3,
      extraction_confidence: 0.994,
      currency_reconciled: "USD 842,500.00",
      tax_id_validated: true,
      execution_ms: 112,
    },
  },
  ddfs: {
    id: "ddfs",
    badge: "DATA FABRIC // PRODUCT 04",
    name: "OJIX DDFS™",
    seoTitle: "Distributed Document File System & Immutable Enterprise Data Fabric",
    tagline:
      "Cryptographically Verified Document and File Management Platform for Regulated Industries.",
    description:
      "An immutable, content-addressable document fabric providing tamper-evident storage, sub-millisecond retrieval, and granular role-based lifecycle management. Designed for organizations subject to strict regulatory audits.",
    primaryKeyword: "Distributed Document File System",
    icon: HardDrive,
    kpis: [
      {
        label: "Integrity Verification",
        value: "SHA-256 Chained",
        detail: "Immutable cryptographic ledger",
      },
      { label: "Read Latency", value: "<8ms", detail: "Global multi-tier caching" },
      { label: "Audit Compliance", value: "WORM Storage", detail: "SEC Rule 17a-4 & HIPAA" },
    ],
    features: [
      "Content-addressable storage (CAS) preventing duplicate file bloat and silent bit-rot",
      "Write-Once-Read-Many (WORM) immutable retention policies satisfying legal hold standards",
      "End-to-end cryptographic chain of custody recording every view, export, and authorization",
      "Multi-tier storage lifecycle automatically migrating cold documents to cost-optimized vaults",
      "Sub-second vector indexing enabling instant semantic search across millions of stored files",
    ],
    architectureStack: [
      "Rust Core Engine",
      "S3 Compatible API",
      "SHA-256 Chaining",
      "Role-Based RBAC",
    ],
    payloadExample: {
      product: "OJIX DDFS™ v1.8",
      vault_id: "VAULT-ENTERPRISE-SEC-01",
      storage_policy: "WORM_IMMUTABLE_LEGAL_HOLD",
      content_hash: "0x3e8a91b2c74d6f8a01",
      audit_events_recorded: 48920,
      retention_period_years: 7,
      tamper_check_status: "VERIFIED_UNMODIFIED",
      replication_nodes: 5,
    },
  },
};

export function ProductsSection() {
  const [activeProductId, setActiveProductId] = useState<ProductId>("lawx");
  const [copied, setCopied] = useState(false);

  const activeProduct = PRODUCTS_DATA[activeProductId];
  const productIds = Object.keys(PRODUCTS_DATA) as ProductId[];

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(activeProduct.payloadExample, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="border-b border-[#E5E0D8] bg-[#FAF8F5] py-20 lg:py-28 text-[#0B1320]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded border border-[#E5E0D8] bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#C85A17]">
            <Layers className="size-3.5" />
            <span>02 // FLAGSHIP SOFTWARE PRODUCTS</span>
          </div>
          <h2
            id="products-heading"
            className="mt-4 font-display text-fluid-h2 font-extrabold tracking-tight text-[#0B1320]"
          >
            Product-Driven Software Engineering.
          </h2>
          <p className="mt-4 font-sans text-fluid-body text-[#4B5563]">
            OJIX develops high-performance proprietary software products designed to replace brittle
            point-solutions. From autonomous legal management to AI examination integrity and
            intelligent document processing, explore our core technology platforms.
          </p>
        </div>

        {/* Product Selection Tabs */}
        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          role="tablist"
          aria-label="OJIX Products"
        >
          {productIds.map((pId) => {
            const prod = PRODUCTS_DATA[pId];
            const Icon = prod.icon;
            const isActive = activeProductId === pId;

            return (
              <button
                key={pId}
                role="tab"
                id={`tab-${pId}`}
                aria-selected={isActive}
                aria-controls={`panel-${pId}`}
                onClick={() => setActiveProductId(pId)}
                className={cn(
                  "group flex min-h-[56px] flex-col items-start justify-center rounded-lg border p-4 text-left transition-all duration-200 active:scale-[0.98]",
                  isActive
                    ? "border-[#C85A17] bg-white shadow-md shadow-[#C85A17]/10"
                    : "border-[#E5E0D8] bg-[#F4F1EA] hover:border-[#0B1320] hover:bg-white",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C85A17]">
                    {pId.toUpperCase()}
                  </span>
                  <Icon
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-[#C85A17]" : "text-[#4B5563] group-hover:text-[#0B1320]",
                    )}
                  />
                </div>
                <div className="mt-1 font-display text-base font-bold text-[#0B1320]">
                  {prod.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Product Showcase Detail Card */}
        <div
          id={`panel-${activeProduct.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeProduct.id}`}
          className="mt-8 overflow-hidden rounded-xl border border-[#0B1320] bg-white shadow-xl shadow-[#0B1320]/5"
        >
          {/* Top Banner Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#E5E0D8] bg-[#FAF8F5] px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#C85A17]">
                {activeProduct.badge}
              </span>
              <span className="text-[#E5E0D8]">|</span>
              <span className="font-mono text-xs text-[#4B5563]">{activeProduct.seoTitle}</span>
            </div>
            <div className="mt-2 sm:mt-0 flex items-center gap-2 font-mono text-xs text-[#0B1320]">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PRODUCTION PLATFORM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Product Overview, KPIs & Features */}
            <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E0D8]">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1320]">
                  {activeProduct.name}
                </h3>
                <p className="mt-2 font-display text-lg font-semibold text-[#C85A17]">
                  {activeProduct.tagline}
                </p>
                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-[#4B5563]">
                  {activeProduct.description}
                </p>

                {/* KPI Metrics Highlight */}
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {activeProduct.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3 text-left"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#4B5563]">
                        {kpi.label}
                      </span>
                      <div className="mt-1 font-display text-xl font-extrabold text-[#0B1320]">
                        {kpi.value}
                      </div>
                      <span className="mt-0.5 block font-sans text-[11px] text-[#6B7280]">
                        {kpi.detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Core Architectural Capabilities */}
                <div className="mt-8">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1320]">
                    Key Capabilities & Compliance
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {activeProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#374151]">
                        <CheckCircle2 className="size-4 shrink-0 text-[#C85A17] mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-6 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.architectureStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[#FAF8F5] border border-[#E5E0D8] px-2.5 py-1 font-mono text-[11px] font-medium text-[#4B5563]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#extraction"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C85A17] px-5 py-2.5 font-sans text-sm font-bold text-white transition-all hover:bg-[#A8480F] active:scale-[0.98]"
                >
                  <span>Deploy {activeProduct.name}</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Live Terminal Telemetry & Schema Preview */}
            <div className="bg-[#0B1320] p-6 sm:p-8 lg:col-span-5 text-[#FAF8F5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-[#C85A17]" />
                    <span className="font-mono text-xs font-bold text-white/90">
                      LIVE SCHEMA TELEMETRY
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className="flex items-center gap-1 font-mono text-[11px] text-white/60 hover:text-white transition-colors"
                    aria-label="Copy JSON payload"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>COPY JSON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                    <Activity className="size-3 animate-pulse" />
                    <span>STATUS: ACTIVE_NODE_TELEMETRY</span>
                  </div>
                  <pre className="mt-3 overflow-x-auto rounded bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-[#F3F4F6] border border-white/10">
                    <code>{JSON.stringify(activeProduct.payloadExample, null, 2)}</code>
                  </pre>
                </div>

                <div className="mt-6 rounded border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#C85A17]">
                    <Zap className="size-3.5" />
                    <span>2026 ARCHITECTURE GUARANTEE</span>
                  </div>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-white/75">
                    Zero multi-tenant data contamination. Each deployment of {activeProduct.name} is
                    partitioned with private cryptographic keys, KMS encryption at rest, and full
                    sub-millisecond compliance logging.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-white/50">
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3 text-emerald-400" />
                  <span>SECURE RUNTIME ISOLATION</span>
                </div>
                <span>OJIX PLATFORM CORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
