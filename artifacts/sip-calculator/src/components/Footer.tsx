import { Link } from "wouter";

const companyLinks = [
  { label: "About Us", path: "/about-us" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "Sitemap", path: "/sitemap" },
];

const calculatorLinks = [
  { label: "SIP Calculator", path: "/" },
  { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
  { label: "FD Calculator", path: "/calculators/fd-calculator" },
  { label: "EMI Calculator", path: "/calculators/emi-calculator" },
  { label: "PPF Calculator", path: "/calculators/ppf-calculator" },
  { label: "Income Tax Calculator", path: "/calculators/income-tax-calculator" },
  { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
  { label: "GST Calculator", path: "/calculators/gst-calculator" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-of-service" },
];

const moreCalcLinks = [
  { label: "RD Calculator", path: "/calculators/rd-calculator" },
  { label: "SWP Calculator", path: "/calculators/swp-calculator" },
  { label: "NPS Calculator", path: "/calculators/nps-calculator" },
  { label: "Gratuity Calculator", path: "/calculators/gratuity-calculator" },
  { label: "MF Returns Calculator", path: "/calculators/mf-calculator" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SIP Calculator" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Free financial calculators to help you plan your investments, taxes, and retirement. Plan Today, Wealth Tomorrow.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
              {legalLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Calculators</h4>
            <ul className="space-y-2">
              {calculatorLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">More Calculators</h4>
            <ul className="space-y-2">
              {moreCalcLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center space-y-2">
          <p className="text-xs text-gray-500">
            All calculations are for informational purposes only and do not constitute financial advice. Mutual Fund investments are subject to market risks.
          </p>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} SIP Calculator. All rights reserved. | Read all scheme related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}



