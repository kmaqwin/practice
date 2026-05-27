import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateLumpsum } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const { totalInvested, estimatedReturns, futureValue } = useMemo(
    () => calculateLumpsum(principal, rate, years),
    [principal, rate, years]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "Lumpsum Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Lumpsum Calculator</h2>
              <SliderInput label="Total Investment" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} data-testid="principal" />
              <SliderInput label="Expected Return Rate (p.a.)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} data-testid="return-rate" />
              <SliderInput label="Time Period" value={years} min={1} max={30} step={1} suffix="Yr" onChange={setYears} data-testid="time-period" />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Invested Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(totalInvested))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Est. Returns</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(estimatedReturns))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Total Value</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(futureValue))}</span>
                </div>
              </div>
              <DonutChart invested={totalInvested} returns={estimatedReturns} />
              <p className="mt-4 text-center text-xs text-gray-400">Use the results above to plan your lumpsum investment with your preferred broker.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lumpsum Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              A lumpsum investment means investing a large amount all at once rather than in periodic instalments. This calculator helps you estimate the future value of a one-time investment based on your expected annual return rate and time horizon.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The formula used is: <strong>FV = P × (1 + r/100)^n</strong>, where P is the principal, r is the annual return rate, and n is the number of years. This is the standard compound interest formula.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



