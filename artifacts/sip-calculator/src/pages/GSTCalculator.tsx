import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateGST } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

const GST_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
  const [price, setPrice] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const result = useMemo(
    () => calculateGST(price, gstRate, mode),
    [price, gstRate, mode]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "GST Calculator" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">GST Calculator</h2>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">Calculate GST</label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                  <button onClick={() => setMode("add")} className={`flex-1 py-2 text-sm font-semibold transition-all ${mode === "add" ? "bg-[#5367FF] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`} data-testid="mode-add">Add GST</button>
                  <button onClick={() => setMode("remove")} className={`flex-1 py-2 text-sm font-semibold transition-all ${mode === "remove" ? "bg-[#5367FF] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`} data-testid="mode-remove">Remove GST</button>
                </div>
              </div>

              <SliderInput
                label={mode === "add" ? "Net Price (excluding GST)" : "Gross Price (including GST)"}
                value={price}
                min={1}
                max={10000000}
                step={100}
                prefix="₹"
                onChange={setPrice}
                data-testid="price"
              />

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 block mb-2">GST Rate</label>
                <div className="grid grid-cols-4 gap-2">
                  {GST_RATES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setGstRate(r)}
                      className={`py-2 rounded-lg text-sm font-semibold border transition-all ${gstRate === r ? "border-[#5367FF] bg-indigo-50 text-[#5367FF]" : "border-gray-200 text-gray-600 hover:border-[#5367FF]"}`}
                      data-testid={`gst-rate-${r}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">GST Breakdown</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Pre-GST Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.preGST))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">SGST ({gstRate / 2}%)</span>
                  <span className="text-base font-semibold text-gray-700">{formatINR(Math.round(result.sgst))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">CGST ({gstRate / 2}%)</span>
                  <span className="text-base font-semibold text-gray-700">{formatINR(Math.round(result.cgst))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total GST ({gstRate}%)</span>
                  <span className="text-base font-semibold" style={{ color: "#f97316" }}>{formatINR(Math.round(result.totalGST))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Post-GST Amount</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(result.postGST))}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">GST Calculator</h1>
            <p className="text-gray-600 leading-relaxed">
              GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services in India. GST rates are 5%, 12%, 18%, and 28% depending on the category of goods/services. Use this calculator to add GST to a net price or remove GST from an inclusive price.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



