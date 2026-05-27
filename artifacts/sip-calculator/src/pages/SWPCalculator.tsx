import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateSWPYearly } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function SWPCalculator() {
  const [corpus, setCorpus] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(8000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);

  const yearlyData = useMemo(
    () => calculateSWPYearly(corpus, monthlyWithdrawal, rate, years),
    [corpus, monthlyWithdrawal, rate, years]
  );

  const totalWithdrawn = yearlyData.reduce((s, r) => s + r.withdrawn, 0);
  const remainingCorpus = yearlyData[yearlyData.length - 1]?.remaining ?? 0;
  const corpusLasted = yearlyData.length;
  const corpusDepleted = remainingCorpus === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "SWP Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">SWP Calculator</h2>
              <SliderInput label="Total Investment (Corpus)" value={corpus} min={100000} max={10000000} step={50000} prefix="₹" onChange={setCorpus} />
              <SliderInput label="Monthly Withdrawal" value={monthlyWithdrawal} min={500} max={200000} step={500} prefix="₹" onChange={setMonthlyWithdrawal} />
              <SliderInput label="Expected Return Rate (p.a.)" value={rate} min={1} max={30} step={0.5} suffix="%" onChange={setRate} />
              <SliderInput label="Time Period" value={years} min={1} max={40} step={1} suffix="Yr" onChange={setYears} />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Investment</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(corpus))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Withdrawn</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(totalWithdrawn))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Remaining Corpus</span>
                  <span className="text-base font-semibold" style={{ color: remainingCorpus > 0 ? "#5367FF" : "#ef4444" }}>
                    {remainingCorpus > 0 ? formatINR(Math.round(remainingCorpus)) : "Depleted"}
                  </span>
                </div>
              </div>
              {corpusDepleted ? (
                <div className="rounded-xl p-4 text-sm" style={{ background: "#FFF5F5", border: "1px solid #fecaca" }}>
                  <p className="font-semibold text-red-600 mb-1">Corpus runs out in Year {corpusLasted}</p>
                  <p className="text-red-500">Reduce monthly withdrawal or increase corpus/return rate.</p>
                </div>
              ) : (
                <div className="rounded-xl p-4 text-sm" style={{ background: "#F0FDF4", border: "1px solid #bbf7d0" }}>
                  <p className="font-semibold text-green-700 mb-1">Corpus lasts full {years} years</p>
                  <p className="text-green-600">Remaining balance: {formatINR(Math.round(remainingCorpus))}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Year-by-Year Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-500">Year</th>
                    <th className="text-right py-3 pr-4 font-semibold text-gray-500">Withdrawn</th>
                    <th className="text-right py-3 font-semibold text-gray-500">Remaining Corpus</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 pr-4 text-gray-700">{row.year}</td>
                      <td className="py-2.5 pr-4 text-right" style={{ color: "#00B386" }}>{formatINR(Math.round(row.withdrawn))}</td>
                      <td className="py-2.5 text-right font-medium" style={{ color: row.remaining > 0 ? "#5367FF" : "#ef4444" }}>
                        {row.remaining > 0 ? formatINR(Math.round(row.remaining)) : "₹0 (Depleted)"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">SWP Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount from your mutual fund investment at regular intervals. This calculator shows how long your corpus will last given a monthly withdrawal amount and expected return from the invested corpus.
            </p>
            <p className="text-gray-600 leading-relaxed">
              SWP is ideal for retirees who want a regular income stream while keeping the remaining corpus invested and growing. The key is balancing the withdrawal rate against the expected portfolio return.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



