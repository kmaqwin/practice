import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateCompoundInterest } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

const COMPOUNDING_OPTIONS = [
  { label: "Annually (1/yr)", value: 1 },
  { label: "Half-Yearly (2/yr)", value: 2 },
  { label: "Quarterly (4/yr)", value: 4 },
  { label: "Monthly (12/yr)", value: 12 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);
  const [n, setN] = useState(1);

  const { interest, total } = useMemo(
    () => calculateCompoundInterest(principal, rate, time, n),
    [principal, rate, time, n]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "Compound Interest Calculator" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Compound Interest Calculator</h2>
              <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} data-testid="principal" />
              <SliderInput label="Rate of Interest (p.a.)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} data-testid="rate" />
              <SliderInput label="Time Period" value={time} min={1} max={30} step={1} suffix="Yr" onChange={setTime} data-testid="time" />
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">Compounding Frequency</label>
                <div className="grid grid-cols-2 gap-2">
                  {COMPOUNDING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setN(opt.value)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${n === opt.value ? "border-[#5367FF] bg-indigo-50 text-[#5367FF]" : "border-gray-200 text-gray-600 hover:border-[#5367FF]"}`}
                      data-testid={`compounding-${opt.value}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
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
                  <span className="text-sm font-medium text-gray-700">Total Amount</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(total))}</span>
                </div>
              </div>
              <DonutChart invested={principal} returns={interest} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Compound Interest Calculator</h1>
            <p className="text-gray-600 leading-relaxed">
              Compound interest is calculated on the initial principal and the accumulated interest from previous periods. Formula: <strong>A = P × (1 + r/(n×100))^(n×t)</strong>. Higher compounding frequency results in more interest earned.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



