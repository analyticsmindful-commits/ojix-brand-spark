import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const NAV_LINKS = [
  { label: "Clients", href: "#clients", id: "clients" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Sectors", href: "#sectors", id: "sectors" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Methodology", href: "#methodology", id: "methodology" },
  { label: "Business X-Ray", href: "#xray", id: "xray" },
  { label: "Engineering", href: "#engineering", id: "engineering" },
  { label: "FAQ", href: "#faq", id: "faq" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on window resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E0D8] bg-[#FAF8F5]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Monogram & Status Indicator */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#top"
            className="group flex items-center gap-2 text-xl font-black tracking-tighter text-[#0B1320] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17]"
            aria-label="OJIX Systems Home"
          >
            <span className="font-display text-2xl tracking-tight">
              OJ
              <span className="text-[#C85A17] transition-colors group-hover:text-[#A74711]">
                IX
              </span>
            </span>
            <span className="hidden font-mono text-[10px] font-semibold tracking-widest text-[#4B5563] sm:inline-block border-l border-[#E5E0D8] pl-2.5">
              SYSTEMS
            </span>
          </a>

          {/* Architectural Live Status Indicator */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D8] bg-white/80 px-2.5 py-1 shadow-xs"
            role="status"
            aria-label="System status: All systems nominal"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-[#0B1320] uppercase">
              <span className="hidden sm:inline">SYSTEMS </span>NOMINAL
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Anchor Links */}
        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="group relative font-mono text-xs uppercase tracking-wider text-[#4B5563] transition-colors hover:text-[#0B1320] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C85A17] py-1"
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-[#C85A17] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Right: Primary Magnetic Action Button Placeholder & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <a
              href="#extraction"
              data-magnetic="true"
              className="inline-flex items-center justify-center rounded-md bg-[#C85A17] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all duration-150 hover:bg-[#B34E13] active:scale-[0.97] press-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17] focus-visible:ring-offset-2"
            >
              <span>Initialize Project</span>
              <ArrowUpRight className="ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-[#E5E0D8] bg-white p-2 text-[#0B1320] transition-colors hover:bg-[#FAF8F5] lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C85A17]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (320px–1023px Viewports) */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 top-16 z-50 flex flex-col justify-between bg-[#FAF8F5] px-6 py-8 lg:hidden animate-fade-in border-b border-[#E5E0D8]"
        >
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#4B5563]">
                Navigation Index
              </span>
            </div>

            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation Links">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center justify-between border-b border-[#E5E0D8]/60 py-3 text-lg font-bold tracking-tight text-[#0B1320] transition-colors hover:text-[#C85A17]"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium text-[#C85A17]">
                      0{index + 1}
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-[#4B5563]" />
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6">
            <a
              href="#extraction"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-md bg-[#C85A17] px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-white shadow-xs transition-colors hover:bg-[#B34E13] active:scale-[0.97]"
            >
              <span>Initialize Project</span>
              <ArrowUpRight className="ml-1.5 size-4" />
            </a>

            <div className="flex items-center justify-between pt-2 font-mono text-[11px] text-[#4B5563]">
              <span>OJIX Systems · All Systems Nominal</span>
              <span>v2026.10</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
