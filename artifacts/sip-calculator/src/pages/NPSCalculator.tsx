import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateNPS } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function NPSCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annualRate, setAnnualRate] = useState(10);
  const [annuityPct, setAnnuityPct] = useState(40);
  const [annuityReturnRate, setAnnuityReturnRate] = useState(6);

  const result = useMemo(
    () => calculateNPS(monthlyContribution, currentAge, retirementAge, annualRate, annuityPct, annuityReturnRate),
    [monthlyContribution, currentAge, retirementAge, annualRate, annuityPct, annuityReturnRate]
  );

  const investmentYears = retirementAge - currentAge;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "NPS Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">NPS Calculator</h2>
              <SliderInput label="Monthly Contribution" value={monthlyContribution} min={500} max={100000} step={500} prefix="₹" onChange={setMonthlyContribution} />
              <SliderInput label="Current Age" value={currentAge} min={18} max={65} step={1} suffix="Yr" onChange={(v) => setCurrentAge(Math.min(v, retirementAge - 1))} />
              <SliderInput label="Retirement Age" value={retirementAge} min={40} max={70} step={1} suffix="Yr" onChange={(v) => setRetirementAge(Math.max(v, currentAge + 1))} />
              <SliderInput label="Expected Return Rate" value={annualRate} min={6} max={20} step={0.5} suffix="%" onChange={setAnnualRate} />
              <SliderInput label="Annuity Percentage" value={annuityPct} min={40} max={100} step={10} suffix="%" onChange={setAnnuityPct} />
              <SliderInput label="Annuity Return Rate" value={annuityReturnRate} min={3} max={10} step={0.5} suffix="%" onChange={setAnnuityReturnRate} />
              <p className="text-xs text-gray-400 mt-2">Min. 40% of corpus must be used for annuity as per PFRDA rules.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Results</h2>
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Investment Period</span>
                  <span className="text-base font-semibold text-gray-800">{investmentYears} Years</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Invested</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.totalInvested))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Corpus at Retirement</span>
                  <span className="text-base font-semibold" style={{ color: "#5367FF" }}>{formatINR(Math.round(result.totalCorpus))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Lump Sum ({100 - annuityPct}%)</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.lumpSum))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Annuity Corpus ({annuityPct}%)</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.annuityCorpus))}</span>
                </div>
              </div>
              <div className="rounded-xl p-4 text-center mb-4" style={{ background: "#EEF0FF", border: "1px solid #c7d2fe" }}>
                <p className="text-xs text-gray-500 mb-1">Estimated Monthly Pension</p>
                <p className="text-3xl font-extrabold" style={{ color: "#5367FF" }}>{formatINR(Math.round(result.monthlyPension))}</p>
              </div>
              <DonutChart invested={result.lumpSum} returns={result.annuityCorpus} labelA="Lump Sum" labelB="Annuity" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">NPS Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              The National Pension System (NPS) is a government-backed voluntary retirement savings scheme. Your contributions are invested in a mix of equities, corporate bonds, and government securities. At retirement (age 60), you can withdraw up to 60% of the corpus as a lump sum; the remaining 40% must be used to purchase an annuity for a monthly pension.
            </p>
            <p className="text-gray-600 leading-relaxed">
              NPS offers tax benefits under Section 80CCD(1) (up to ₹1.5L) and an additional deduction of ₹50,000 under Section 80CCD(1B), making it one of the most tax-efficient retirement tools available.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



