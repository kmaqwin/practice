import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-8xl font-black mb-4" style={{ color: "#5367FF" }}>404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm" style={{ background: "#5367FF" }}>
            Back to SIP Calculator
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}



