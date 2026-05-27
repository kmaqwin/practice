import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateGratuity } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function GratuityCalculator() {
  const [lastSalary, setLastSalary] = useState(50000);
  const [yearsOfService, setYearsOfService] = useState(10);

  const { gratuity } = useMemo(
    () => calculateGratuity(lastSalary, yearsOfService),
    [lastSalary, yearsOfService]
  );

  const taxFreeLimit = 2000000;
  const taxableGratuity = Math.max(0, gratuity - taxFreeLimit);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "Gratuity Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Gratuity Calculator</h2>
              <SliderInput label="Last Drawn Salary (Basic + DA)" value={lastSalary} min={5000} max={500000} step={1000} prefix="₹" onChange={setLastSalary} />
              <SliderInput label="Years of Service" value={yearsOfService} min={5} max={40} step={1} suffix="Yr" onChange={setYearsOfService} />
              <p className="text-xs text-gray-400 mt-2">Minimum 5 years of continuous service required to be eligible for gratuity.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Last Salary (Basic + DA)</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(lastSalary)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Years of Service</span>
                  <span className="text-base font-semibold text-gray-800">{yearsOfService} Years</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Tax-Free Limit</span>
                  <span className="text-base font-semibold text-gray-800">₹20.00 L</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Taxable Gratuity</span>
                  <span className="text-base font-semibold" style={{ color: taxableGratuity > 0 ? "#ef4444" : "#00B386" }}>
                    {taxableGratuity > 0 ? formatINR(Math.round(taxableGratuity)) : "Nil"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl p-5 text-center" style={{ background: "#EEF0FF", border: "1px solid #c7d2fe" }}>
                <p className="text-xs text-gray-500 mb-1">Gratuity Amount</p>
                <p className="text-4xl font-extrabold" style={{ color: "#5367FF" }}>{formatINR(Math.round(gratuity))}</p>
                <p className="text-xs text-gray-400 mt-2">= (15 × ₹{lastSalary.toLocaleString("en-IN")} × {yearsOfService}) ÷ 26</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gratuity Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              Gratuity is a lump-sum benefit paid by an employer to an employee as a token of appreciation for services rendered. It is governed by the Payment of Gratuity Act, 1972 and applies to organisations with 10 or more employees.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Formula:</strong> Gratuity = (15 × Last Basic Salary × Years of Service) ÷ 26
            </p>
            <p className="text-gray-600 leading-relaxed">
              Gratuity up to ₹20 lakh is fully tax-exempt for government and private sector employees covered under the Payment of Gratuity Act. Any amount above ₹20 lakh is taxable as per your applicable income tax slab.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



