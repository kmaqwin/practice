import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

interface InfoPageProps {
  title: string;
  subtitle: string;
  content: string[];
}

export default function InfoPage({ title, subtitle, content }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: title }]} />

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-8">
            <div className="p-8 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #5367FF10 0%, #5367FF05 100%)" }}>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-500 text-base">{subtitle}</p>
            </div>
            <div className="p-8 space-y-5">
              {content.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
              ))}
              <div className="pt-4">
                <p className="text-sm text-gray-500">Use the calculators above to plan your investment before getting started with your preferred broker.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Useful Calculators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "SIP Calculator", path: "/" },
                { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
                { label: "FD Calculator", path: "/calculators/fd-calculator" },
                { label: "EMI Calculator", path: "/calculators/emi-calculator" },
                { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
                { label: "GST Calculator", path: "/calculators/gst-calculator" },
              ].map((c) => (
                <Link key={c.path} href={c.path} className="text-sm font-medium text-[#5367FF] bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-2.5 text-center transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



