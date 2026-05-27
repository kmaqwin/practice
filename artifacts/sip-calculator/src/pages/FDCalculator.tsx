import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateFD } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(3);

  const { interest, futureValue } = useMemo(
    () => calculateFD(principal, rate, years, 4),
    [principal, rate, years]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "FD Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">FD Calculator</h2>
              <SliderInput label="Principal Amount" value={principal} min={1000} max={5000000} step={1000} prefix="₹" onChange={setPrincipal} data-testid="principal" />
              <SliderInput label="Rate of Interest (p.a.)" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} data-testid="rate" />
              <SliderInput label="Time Period" value={years} min={1} max={10} step={1} suffix="Yr" onChange={setYears} data-testid="time-period" />
              <p className="text-xs text-gray-400 mt-2">Compounding: Quarterly</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Principal Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(principal))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Interest</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(interest))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Maturity Amount</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(futureValue))}</span>
                </div>
              </div>
              <DonutChart invested={principal} returns={interest} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">FD Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Fixed Deposit (FD) is a financial instrument offered by banks and NBFCs that provides a higher interest rate than a regular savings account. You deposit a lump sum for a fixed tenure and earn guaranteed interest. This calculator uses quarterly compounding to compute the maturity amount.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Formula used: <strong>A = P × (1 + r/400)^(4n)</strong>, where P is the principal, r is the annual interest rate, and n is the number of years.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



