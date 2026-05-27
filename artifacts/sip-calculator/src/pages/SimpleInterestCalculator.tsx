import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateSimpleInterest } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(5);

  const { interest, total } = useMemo(
    () => calculateSimpleInterest(principal, rate, time),
    [principal, rate, time]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "Simple Interest Calculator" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Simple Interest Calculator</h2>
              <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000} prefix="₹" onChange={setPrincipal} data-testid="principal" />
              <SliderInput label="Rate of Interest (p.a.)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} data-testid="rate" />
              <SliderInput label="Time Period" value={time} min={1} max={30} step={1} suffix="Yr" onChange={setTime} data-testid="time" />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Principal Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(principal))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Simple Interest</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(interest))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Total Amount</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(total))}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-xs text-gray-500 mb-1">Formula Used</p>
                <p className="text-sm font-mono text-gray-700">SI = (P × R × T) / 100</p>
                <p className="text-xs text-gray-500 mt-2">{formatINR(principal)} × {rate}% × {time} years = {formatINR(Math.round(interest))}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Simple Interest Calculator</h1>
            <p className="text-gray-600 leading-relaxed">
              Simple interest is calculated only on the principal amount, not on accumulated interest. Formula: SI = (P × R × T) / 100. It is commonly used for short-term loans like personal loans and auto loans.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



