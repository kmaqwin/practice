import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateSIP, calculateLumpsum, calculateSIPYearly } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function MFCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const sip = useMemo(() => calculateSIP(amount, rate, years), [amount, rate, years]);
  const lump = useMemo(() => calculateLumpsum(amount, rate, years), [amount, rate, years]);
  const result = mode === "sip" ? sip : lump;

  const yearlyData = useMemo(() => calculateSIPYearly(amount, rate, years), [amount, rate, years]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "MF Returns Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">MF Returns Calculator</h2>

              <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
                {(["sip", "lumpsum"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className="flex-1 py-2 text-sm font-semibold transition-all"
                    style={
                      mode === m
                        ? { background: "#5367FF", color: "#fff" }
                        : { background: "#fff", color: "#6b7280" }
                    }
                  >
                    {m === "sip" ? "SIP" : "Lumpsum"}
                  </button>
                ))}
              </div>

              <SliderInput
                label={mode === "sip" ? "Monthly Investment" : "Investment Amount"}
                value={amount}
                min={mode === "sip" ? 500 : 5000}
                max={mode === "sip" ? 200000 : 10000000}
                step={mode === "sip" ? 500 : 5000}
                prefix="₹"
                onChange={setAmount}
              />
              <SliderInput label="Expected Return Rate (p.a.)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
              <SliderInput label="Time Period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Invested Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.totalInvested))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Est. Returns</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(result.estimatedReturns))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Total Value</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(result.futureValue))}</span>
                </div>
              </div>
              <DonutChart invested={result.totalInvested} returns={result.estimatedReturns} />
            </div>
          </div>

          {mode === "sip" && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Year-by-Year Growth</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 pr-4 font-semibold text-gray-500">Year</th>
                      <th className="text-right py-3 pr-4 font-semibold text-gray-500">Invested</th>
                      <th className="text-right py-3 pr-4 font-semibold text-gray-500">Returns</th>
                      <th className="text-right py-3 font-semibold text-gray-500">Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlyData.map((row) => (
                      <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 pr-4 text-gray-700">{row.year}</td>
                        <td className="py-2.5 pr-4 text-right text-gray-700">{formatINR(Math.round(row.totalInvested))}</td>
                        <td className="py-2.5 pr-4 text-right" style={{ color: "#00B386" }}>{formatINR(Math.round(row.estimatedReturns))}</td>
                        <td className="py-2.5 text-right font-medium" style={{ color: "#5367FF" }}>{formatINR(Math.round(row.futureValue))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mutual Fund Returns Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              This calculator estimates the returns on your mutual fund investment whether you invest via SIP (monthly) or as a lump sum. Returns are calculated based on your expected rate of return, which varies by fund category — equity funds typically return 10–15% p.a. over the long term.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Mutual fund returns are subject to market risk. Past performance does not guarantee future results. This calculator provides an estimate based on a fixed assumed rate of return.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



