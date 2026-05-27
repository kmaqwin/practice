import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface PlaceholderCalculatorProps {
  name: string;
  description: string;
}

const relatedCalcs = [
  { label: "SIP Calculator", path: "/" },
  { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
  { label: "FD Calculator", path: "/calculators/fd-calculator" },
  { label: "EMI Calculator", path: "/calculators/emi-calculator" },
  { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
  { label: "GST Calculator", path: "/calculators/gst-calculator" },
];

export default function PlaceholderCalculator({ name, description }: PlaceholderCalculatorProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "You're on the list!", description: "We'll notify you when this calculator is ready." });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: name }]} />

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "#EEF0FF" }}>
              <span className="text-3xl font-black" style={{ color: "#5367FF" }}>%</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{name}</h1>
            <p className="text-gray-500 text-base max-w-md mx-auto mb-8 leading-relaxed">{description}</p>

            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              Coming Soon
            </div>

            <form onSubmit={handleNotify} className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5367FF] focus:ring-2 focus:ring-indigo-100 transition-all"
                data-testid="input-notify-email"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-all"
                style={{ background: "#5367FF" }}
                data-testid="btn-notify"
              >
                Notify Me
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Try These Calculators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedCalcs.map((c) => (
                <Link key={c.path} href={c.path} className="text-sm font-medium text-[#5367FF] bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-2.5 text-center transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}



