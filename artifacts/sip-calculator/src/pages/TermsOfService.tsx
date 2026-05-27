import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Terms of Service" }]} />
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 prose prose-gray max-w-none">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

            {[
              { title: "1. Acceptance of Terms", body: "By accessing and using SIP Calculator, you accept and agree to be bound by these terms. If you do not agree with any part of these terms, please do not use this website." },
              { title: "2. Use of Calculators", body: "The calculators on this website are provided for educational and informational purposes only. All results are estimates based on the inputs you provide and assumed rates of return. Actual investment returns may vary significantly from the estimates shown." },
              { title: "3. No Investment Advice", body: "Nothing on this website constitutes investment advice, financial advice, trading advice, or any other form of professional advice. You should not treat any calculator result as a recommendation to buy, sell, or hold any financial instrument. Always consult a qualified financial advisor before making investment decisions." },
              { title: "4. Accuracy of Information", body: "While we strive to keep all formulas and information accurate and up-to-date, we make no warranty regarding the completeness or accuracy of any calculator result. Tax slabs, interest rates, and regulations change periodically — always verify with official sources." },
              { title: "5. Limitation of Liability", body: "SIP Calculator shall not be held liable for any errors, omissions, or inaccuracies in the content, or for any actions taken in reliance thereon. Use of this website is entirely at your own risk." },
              { title: "6. Changes to Terms", body: "We reserve the right to modify these terms at any time. We will always post the most current version on this page. By continuing to use the site after changes are posted, you agree to be bound by the revised terms." },
            ].map(({ title, body }) => (
              <div key={title} className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}

            <p className="text-xs text-gray-400 mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
              Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



