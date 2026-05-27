import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateRD, calculateRDYearly } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(6.5);
  const [months, setMonths] = useState(24);

  const { totalInvested, interest, maturityAmount } = useMemo(
    () => calculateRD(monthlyDeposit, rate, months),
    [monthlyDeposit, rate, months]
  );

  const yearlyData = useMemo(
    () => calculateRDYearly(monthlyDeposit, rate, months),
    [monthlyDeposit, rate, months]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "RD Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">RD Calculator</h2>
              <SliderInput label="Monthly Deposit" value={monthlyDeposit} min={100} max={100000} step={100} prefix="₹" onChange={setMonthlyDeposit} />
              <SliderInput label="Rate of Interest (p.a.)" value={rate} min={1} max={15} step={0.1} suffix="%" onChange={setRate} />
              <SliderInput label="Tenure (Months)" value={months} min={6} max={120} step={6} suffix="Mo" onChange={setMonths} />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Deposited</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(totalInvested))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Interest Earned</span>
                  <span className="text-base font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(interest))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Maturity Amount</span>
                  <span className="text-xl font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(maturityAmount))}</span>
                </div>
              </div>
              <DonutChart invested={totalInvested} returns={interest} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Year-by-Year Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-500">Year</th>
                    <th className="text-right py-3 pr-4 font-semibold text-gray-500">Deposited</th>
                    <th className="text-right py-3 pr-4 font-semibold text-gray-500">Interest</th>
                    <th className="text-right py-3 font-semibold text-gray-500">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5 pr-4 text-gray-700">{row.year}</td>
                      <td className="py-2.5 pr-4 text-right text-gray-700">{formatINR(Math.round(row.totalInvested))}</td>
                      <td className="py-2.5 pr-4 text-right" style={{ color: "#00B386" }}>{formatINR(Math.round(row.interest))}</td>
                      <td className="py-2.5 text-right font-medium" style={{ color: "#5367FF" }}>{formatINR(Math.round(row.balance))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">RD Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Recurring Deposit (RD) is a term deposit offered by banks where you deposit a fixed amount every month for a predetermined tenure. At maturity, you receive the total deposited amount along with accumulated interest.
            </p>
            <p className="text-gray-600 leading-relaxed">
              RDs are a great tool for disciplined saving. Unlike FDs, they allow you to invest smaller amounts periodically. The interest is compounded monthly and paid at maturity along with the principal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



