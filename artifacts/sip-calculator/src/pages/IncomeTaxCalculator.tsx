import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateIncomeTax } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deduction80D, setDeduction80D] = useState(25000);
  const [hra, setHra] = useState(60000);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const result = useMemo(
    () => calculateIncomeTax(income, deductions80C, deduction80D, hra, otherDeductions),
    [income, deductions80C, deduction80D, hra, otherDeductions]
  );

  const betterRegime = result.oldTax <= result.newTax ? "old" : "new";

  const oldSlabs = [
    { range: "₹0 – ₹2.5L", rate: "0%" },
    { range: "₹2.5L – ₹5L", rate: "5%" },
    { range: "₹5L – ₹10L", rate: "20%" },
    { range: "Above ₹10L", rate: "30%" },
  ];

  const newSlabs = [
    { range: "₹0 – ₹3L", rate: "0%" },
    { range: "₹3L – ₹6L", rate: "5%" },
    { range: "₹6L – ₹9L", rate: "10%" },
    { range: "₹9L – ₹12L", rate: "15%" },
    { range: "₹12L – ₹15L", rate: "20%" },
    { range: "Above ₹15L", rate: "30%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "Income Tax Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Income Tax Calculator</h2>
              <p className="text-xs text-gray-400 mb-5">FY 2024-25 (AY 2025-26) — includes 4% health & education cess</p>
              <SliderInput label="Annual Income (Gross)" value={income} min={100000} max={10000000} step={50000} prefix="₹" onChange={setIncome} />
              <SliderInput label="Deductions u/s 80C (max ₹1.5L)" value={deductions80C} min={0} max={150000} step={5000} prefix="₹" onChange={setDeductions80C} />
              <SliderInput label="Deductions u/s 80D (Health Insurance)" value={deduction80D} min={0} max={100000} step={5000} prefix="₹" onChange={setDeduction80D} />
              <SliderInput label="HRA Exemption" value={hra} min={0} max={500000} step={5000} prefix="₹" onChange={setHra} />
              <SliderInput label="Other Deductions" value={otherDeductions} min={0} max={200000} step={5000} prefix="₹" onChange={setOtherDeductions} />
              <p className="text-xs text-gray-400 mt-2">Standard deduction of ₹50,000 applied automatically to both regimes.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Tax Comparison</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div
                  className="rounded-xl p-4 border-2 text-center"
                  style={betterRegime === "old" ? { borderColor: "#00B386", background: "#F0FDF4" } : { borderColor: "#e5e7eb", background: "#f9fafb" }}
                >
                  <p className="text-xs font-semibold text-gray-500 mb-1">OLD REGIME</p>
                  <p className="text-2xl font-extrabold text-gray-900">{formatINR(result.oldTax)}</p>
                  <p className="text-xs text-gray-400 mt-1">Taxable: {formatINR(Math.round(result.taxableOld))}</p>
                  {betterRegime === "old" && <p className="text-xs font-bold mt-2" style={{ color: "#00B386" }}>✓ Better for you</p>}
                </div>
                <div
                  className="rounded-xl p-4 border-2 text-center"
                  style={betterRegime === "new" ? { borderColor: "#00B386", background: "#F0FDF4" } : { borderColor: "#e5e7eb", background: "#f9fafb" }}
                >
                  <p className="text-xs font-semibold text-gray-500 mb-1">NEW REGIME</p>
                  <p className="text-2xl font-extrabold text-gray-900">{formatINR(result.newTax)}</p>
                  <p className="text-xs text-gray-400 mt-1">Taxable: {formatINR(Math.round(result.taxableNew))}</p>
                  {betterRegime === "new" && <p className="text-xs font-bold mt-2" style={{ color: "#00B386" }}>✓ Better for you</p>}
                </div>
              </div>

              <div className="rounded-xl p-4 mb-6" style={{ background: "#EEF0FF" }}>
                <p className="text-sm text-gray-600 text-center">
                  You save <span className="font-bold text-lg" style={{ color: "#5367FF" }}>{formatINR(Math.abs(result.savings))}</span>{" "}
                  with the <span className="font-semibold">{betterRegime === "old" ? "Old" : "New"} Regime</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-semibold text-gray-600 mb-2">Old Regime Slabs</p>
                  {oldSlabs.map((s) => (
                    <div key={s.range} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{s.range}</span>
                      <span className="font-semibold text-gray-700">{s.rate}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-600 mb-2">New Regime Slabs</p>
                  {newSlabs.map((s) => (
                    <div key={s.range} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">{s.range}</span>
                      <span className="font-semibold text-gray-700">{s.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Income Tax Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              This calculator compares your income tax liability under the Old and New tax regimes for FY 2024-25. The Old Regime allows various deductions (80C, 80D, HRA, etc.) but has higher base rates. The New Regime has lower slab rates but allows fewer deductions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A 4% Health & Education Cess is applied on top of the income tax in both regimes. Section 87A rebate is applied — nil tax for income up to ₹5L (old) and ₹7L (new). This is an estimate; consult a tax professional for precise calculations.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



