import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateCAGR } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function CAGRCalculator() {
  const [initial, setInitial] = useState(100000);
  const [final, setFinal] = useState(300000);
  const [years, setYears] = useState(5);

  const { cagr } = useMemo(
    () => calculateCAGR(initial, final, years),
    [initial, final, years]
  );

  const isValid = final > 0 && initial > 0 && years > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "CAGR Calculator" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">CAGR Calculator</h2>
              <SliderInput label="Initial Value" value={initial} min={1000} max={10000000} step={1000} prefix="₹" onChange={setInitial} data-testid="initial" />
              <SliderInput label="Final Value" value={final} min={1000} max={100000000} step={1000} prefix="₹" onChange={setFinal} data-testid="final" />
              <SliderInput label="Number of Years" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} data-testid="years" />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col items-center justify-center">
              <p className="text-sm text-gray-500 mb-2">Compound Annual Growth Rate</p>
              <div className="text-6xl font-extrabold mb-4" style={{ color: isValid && cagr >= 0 ? "#5367FF" : "#ef4444" }} data-testid="result-cagr">
                {isValid ? cagr.toFixed(2) : "—"}%
              </div>
              {isValid && (
                <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Initial Value</span>
                    <span className="font-semibold text-gray-800">{formatINR(initial)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Final Value</span>
                    <span className="font-semibold" style={{ color: "#00B386" }}>{formatINR(final)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Growth</span>
                    <span className="font-semibold text-gray-800">{(((final - initial) / initial) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">CAGR Calculator</h1>
            <p className="text-gray-600 leading-relaxed">
              CAGR (Compound Annual Growth Rate) represents the rate at which an investment has grown from its initial value to its final value, assuming it grew at a constant rate. Formula: <strong>CAGR = (Final/Initial)^(1/n) - 1</strong>. It is widely used to compare investment performance.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



