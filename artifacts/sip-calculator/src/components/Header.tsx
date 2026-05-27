import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";

const calculators = [
  { label: "SIP Calculator", path: "/" },
  { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
  { label: "FD Calculator", path: "/calculators/fd-calculator" },
  { label: "EMI Calculator", path: "/calculators/emi-calculator" },
  { label: "PPF Calculator", path: "/calculators/ppf-calculator" },
  { label: "RD Calculator", path: "/calculators/rd-calculator" },
  { label: "SWP Calculator", path: "/calculators/swp-calculator" },
  { label: "MF Calculator", path: "/calculators/mf-calculator" },
  { label: "NPS Calculator", path: "/calculators/nps-calculator" },
  { label: "Simple Interest", path: "/calculators/simple-interest-calculator" },
  { label: "Compound Interest", path: "/calculators/compound-interest-calculator" },
  { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
  { label: "GST Calculator", path: "/calculators/gst-calculator" },
  { label: "Gratuity Calculator", path: "/calculators/gratuity-calculator" },
  { label: "Income Tax Calculator", path: "/calculators/income-tax-calculator" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcDropdown, setCalcDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalcDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="SIP Calculator" className="h-24 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/mutual-funds" className="hover:text-[#5367FF] transition-colors">Mutual Funds</Link>
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setCalcDropdown(!calcDropdown)}
                className="flex items-center gap-1 hover:text-[#5367FF] transition-colors"
                data-testid="nav-calculators"
              >
                Calculators <ChevronDown size={14} className={`transition-transform ${calcDropdown ? "rotate-180" : ""}`} />
              </button>
              {calcDropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white border border-gray-200 rounded-xl shadow-xl p-4 grid grid-cols-3 gap-1 z-50">
                  {calculators.map((c) => (
                    <Link
                      key={c.path}
                      href={c.path}
                      onClick={() => setCalcDropdown(false)}
                      className="text-xs text-gray-700 hover:text-[#5367FF] hover:bg-indigo-50 rounded-lg px-3 py-2 transition-colors"
                      data-testid={`dropdown-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          <Link href="/mutual-funds" className="block py-2 px-3 text-sm font-medium text-gray-700 hover:text-[#5367FF] rounded-lg hover:bg-indigo-50">Mutual Funds</Link>
          <div className="border-t border-gray-100 pt-2 mt-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pb-1">Calculators</p>
            {calculators.map((c) => (
              <Link key={c.path} href={c.path} className="block py-2 px-3 text-sm text-gray-700 hover:text-[#5367FF] rounded-lg hover:bg-indigo-50">{c.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}



