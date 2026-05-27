import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How accurate are these calculators?", a: "All calculators use standard financial formulas (SIP, compound interest, EMI, PPF, etc.). Results are estimates based on your inputs and assumed rates of return. Actual investment returns will vary with market conditions." },
  { q: "What is SIP and how does it work?", a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals (monthly). Your money buys more units when prices are low and fewer when prices are high, averaging out the cost over time — a strategy called Rupee Cost Averaging." },
  { q: "What is the minimum SIP amount?", a: "You can start a SIP with as little as ₹100 per month in most mutual funds. For lumpsum investments, the minimum is typically ₹500 to ₹1,000 depending on the fund." },
  { q: "How is my SIP return calculated?", a: "SIP returns are calculated using the compound interest formula for periodic payments: FV = P × [((1 + r)^n − 1) / r] × (1 + r), where P is the monthly investment, r is the monthly rate, and n is the number of months." },
  { q: "What is the difference between Old and New income tax regime?", a: "The Old Regime allows many deductions (80C, 80D, HRA, etc.) but has higher base tax rates. The New Regime has lower slab rates but allows fewer deductions. Our Income Tax Calculator compares both regimes and tells you which saves you more." },
  { q: "How are equity mutual fund returns taxed?", a: "Equity mutual funds held for more than 1 year attract Long-Term Capital Gains (LTCG) tax of 10% on gains above ₹1 lakh per year. Holdings under 1 year attract Short-Term Capital Gains (STCG) tax of 15%." },
  { q: "What is PPF and is it tax-free?", a: "Public Provident Fund (PPF) is a government-backed savings scheme with a 15-year lock-in period. It enjoys EEE (Exempt-Exempt-Exempt) status — your deposits qualify for 80C deduction, the interest earned is tax-free, and the maturity amount is fully exempt." },
  { q: "Can I use these calculators on mobile?", a: "Yes, all calculators are fully responsive and work on any device — mobile, tablet, or desktop. No app download is required." },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Help Center" }]} />

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Help Center</h1>
            <p className="text-gray-500 mb-8">Find answers to common questions about our financial calculators</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {["SIP & Mutual Funds", "Tax Calculators", "Fixed Deposits", "PPF & NPS", "EMI & Loans", "Returns & CAGR"].map((cat) => (
                <div key={cat} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center cursor-pointer hover:bg-indigo-100 transition-colors">
                  <p className="text-sm font-semibold text-gray-700">{cat}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Still have questions?</p>
            <Link href="/contact-us" className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-xl hover:opacity-90 text-sm" style={{ background: "#5367FF" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



