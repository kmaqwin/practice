import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const sitemapSections = [
  {
    title: "Calculators",
    links: [
      { label: "SIP Calculator", path: "/" },
      { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
      { label: "FD Calculator", path: "/calculators/fd-calculator" },
      { label: "EMI Calculator", path: "/calculators/emi-calculator" },
      { label: "PPF Calculator", path: "/calculators/ppf-calculator" },
      { label: "RD Calculator", path: "/calculators/rd-calculator" },
      { label: "SWP Calculator", path: "/calculators/swp-calculator" },
      { label: "MF Returns Calculator", path: "/calculators/mf-calculator" },
      { label: "NPS Calculator", path: "/calculators/nps-calculator" },
      { label: "Simple Interest Calculator", path: "/calculators/simple-interest-calculator" },
      { label: "Compound Interest Calculator", path: "/calculators/compound-interest-calculator" },
      { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
      { label: "GST Calculator", path: "/calculators/gst-calculator" },
      { label: "Gratuity Calculator", path: "/calculators/gratuity-calculator" },
      { label: "Income Tax Calculator", path: "/calculators/income-tax-calculator" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Mutual Funds", path: "/mutual-funds" },
      { label: "Stocks", path: "/stocks" },
      { label: "IPO", path: "/ipo" },
      { label: "US Stocks", path: "/us-stocks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about-us" },
      { label: "Contact Us", path: "/contact-us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" },
      { label: "Sitemap", path: "/sitemap" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Sitemap" }]} />
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Sitemap</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {sitemapSections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link href={link.path} className="text-sm text-gray-700 hover:text-[#5367FF] transition-colors flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



