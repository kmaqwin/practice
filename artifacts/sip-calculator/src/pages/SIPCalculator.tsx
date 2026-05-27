import { useState, useMemo } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import {
  calculateSIP,
  calculateSIPYearly,
  calculateStepUpSIP,
  calculateStepUpSIPYearly,
  calculateGoalSIP,
  inflationAdjust,
} from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ViewMode = "chart" | "table";

interface BarRow {
  year: number;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
}

function GrowthBarChart({
  data,
  compareData,
}: {
  data: BarRow[];
  compareData?: BarRow[];
}) {
  const allValues = [
    ...data.map((d) => d.futureValue),
    ...(compareData ? compareData.map((d) => d.futureValue) : []),
  ];
  const maxValue = Math.max(...allValues);
  const BAR_H = 220;
  const numBars = data.length;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full overflow-x-auto">
      <div
        style={{ minWidth: Math.max(numBars * (compareData ? 64 : 44), 400) + "px" }}
        className="px-4 pb-2 pt-4"
      >
        <div className="relative flex items-end gap-1" style={{ height: BAR_H }}>
          {[0, 25, 50, 75, 100].map((pct) => (
            <div
              key={pct}
              className="absolute w-full border-t border-gray-100"
              style={{ bottom: `${pct}%`, left: 0, right: 0 }}
            />
          ))}
          {data.map((row, i) => {
            const stepRow = compareData?.[i];
            const investedH = (row.totalInvested / maxValue) * BAR_H;
            const returnsH = (row.estimatedReturns / maxValue) * BAR_H;
            const stepInvestedH = stepRow ? (stepRow.totalInvested / maxValue) * BAR_H : 0;
            const stepReturnsH = stepRow ? (stepRow.estimatedReturns / maxValue) * BAR_H : 0;
            const isHovered = hovered === i;

            return (
              <div
                key={row.year}
                className="relative flex-1 flex items-end gap-0.5 cursor-pointer group"
                style={{ minWidth: compareData ? 52 : 28 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap pointer-events-none"
                    style={{ minWidth: compareData ? 200 : 150 }}
                  >
                    <p className="font-semibold mb-1.5">Year {row.year}</p>
                    {compareData ? (
                      <>
                        <p className="text-gray-400 text-[10px] mb-0.5 uppercase tracking-wider">Regular SIP</p>
                        <p className="flex justify-between gap-4">
                          <span className="text-green-400">Invested</span>
                          <span>{formatINR(Math.round(row.totalInvested))}</span>
                        </p>
                        <p className="flex justify-between gap-4 mb-1">
                          <span className="text-indigo-300">Total</span>
                          <span>{formatINR(Math.round(row.futureValue))}</span>
                        </p>
                        <p className="text-amber-400 text-[10px] mb-0.5 uppercase tracking-wider">Step-Up SIP</p>
                        <p className="flex justify-between gap-4">
                          <span className="text-green-400">Invested</span>
                          <span>{formatINR(Math.round(compareData[i].totalInvested))}</span>
                        </p>
                        <p className="flex justify-between gap-4 mb-1">
                          <span className="text-amber-300">Total</span>
                          <span>{formatINR(Math.round(compareData[i].futureValue))}</span>
                        </p>
                        <p className="flex justify-between gap-4 border-t border-gray-700 pt-1 font-semibold">
                          <span className="text-amber-300">Extra Gain</span>
                          <span className="text-amber-300">+{formatINR(Math.round(compareData[i].futureValue - row.futureValue))}</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="flex justify-between gap-4">
                          <span className="text-green-400">Invested</span>
                          <span>{formatINR(Math.round(row.totalInvested))}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-indigo-300">Returns</span>
                          <span>{formatINR(Math.round(row.estimatedReturns))}</span>
                        </p>
                        <p className="flex justify-between gap-4 border-t border-gray-700 mt-1 pt-1 font-semibold">
                          <span>Total</span>
                          <span>{formatINR(Math.round(row.futureValue))}</span>
                        </p>
                      </>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                )}

                {/* Regular SIP bar */}
                <div className="flex-1 flex flex-col justify-end">
                  <div
                    className={`w-full rounded-t-sm transition-opacity ${isHovered ? "opacity-100" : "opacity-85 group-hover:opacity-100"}`}
                    style={{ height: returnsH, backgroundColor: "#5367FF", minHeight: returnsH > 0 ? 2 : 0 }}
                  />
                  <div
                    className={`w-full rounded-b-sm transition-opacity ${isHovered ? "opacity-100" : "opacity-85 group-hover:opacity-100"}`}
                    style={{ height: investedH, backgroundColor: "#00B386", minHeight: investedH > 0 ? 2 : 0 }}
                  />
                </div>

                {/* Step-Up SIP bar (comparison) */}
                {compareData && stepRow && (
                  <div className="flex-1 flex flex-col justify-end">
                    <div
                      className={`w-full rounded-t-sm transition-opacity ${isHovered ? "opacity-100" : "opacity-85 group-hover:opacity-100"}`}
                      style={{ height: stepReturnsH, backgroundColor: "#f59e0b", minHeight: stepReturnsH > 0 ? 2 : 0 }}
                    />
                    <div
                      className={`w-full rounded-b-sm transition-opacity ${isHovered ? "opacity-100" : "opacity-85 group-hover:opacity-100"}`}
                      style={{ height: stepInvestedH, backgroundColor: "#10b981", minHeight: stepInvestedH > 0 ? 2 : 0 }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex gap-1 mt-1">
          {data.map((row) => (
            <div
              key={row.year}
              className="flex-1 text-center"
              style={{ minWidth: compareData ? 52 : 28 }}
            >
              <span className="text-[10px] text-gray-400 font-medium">
                {numBars > 20 ? (row.year % 5 === 0 ? row.year : "") : row.year}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-1">Year</p>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#00B386" }} />
            <span className="text-xs text-gray-500 font-medium">Invested (Regular)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#5367FF" }} />
            <span className="text-xs text-gray-500 font-medium">Returns (Regular)</span>
          </div>
          {compareData && (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#10b981" }} />
                <span className="text-xs text-gray-500 font-medium">Invested (Step-Up)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#f59e0b" }} />
                <span className="text-xs text-gray-500 font-medium">Returns (Step-Up)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Goal-Based SIP Planner ───────────────────────────────────────────────────

const GOAL_PRESETS = [
  { label: "₹25 L", value: 2500000 },
  { label: "₹50 L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹2 Cr", value: 20000000 },
  { label: "₹5 Cr", value: 50000000 },
];

function GoalPlanner() {
  const [target, setTarget] = useState(10000000); // ₹1 Cr
  const [goalRate, setGoalRate] = useState(12);
  const [goalYears, setGoalYears] = useState(15);
  const [customTarget, setCustomTarget] = useState("");

  const result = useMemo(
    () => calculateGoalSIP(target, goalRate, goalYears),
    [target, goalRate, goalYears]
  );

  const pctFromReturns = target > 0 ? (result.estimatedReturns / target) * 100 : 0;

  function handleCustomTarget(val: string) {
    setCustomTarget(val);
    const n = Number(val.replace(/,/g, ""));
    if (!isNaN(n) && n > 0) setTarget(n);
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-8 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "#5367FF" }}>
            🎯
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">Goal-Based SIP Planner</h3>
            <p className="text-xs text-gray-500 mt-0.5">Enter your target corpus — we'll calculate the monthly SIP needed</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="space-y-6">
            {/* Target Corpus */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">Target Corpus</label>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">
                  <span className="text-sm text-gray-500">₹</span>
                  <input
                    type="text"
                    value={customTarget}
                    onChange={(e) => handleCustomTarget(e.target.value)}
                    placeholder={target.toLocaleString("en-IN")}
                    className="w-28 text-right text-sm font-semibold bg-transparent text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
              {/* Presets */}
              <div className="flex flex-wrap gap-2 mb-3">
                {GOAL_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => { setTarget(p.value); setCustomTarget(""); }}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                      target === p.value
                        ? "border-[#5367FF] bg-[#5367FF] text-white"
                        : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={100000}
                max={100000000}
                step={100000}
                value={target}
                onChange={(e) => { setTarget(Number(e.target.value)); setCustomTarget(""); }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#5367FF" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹1 L</span><span>₹10 Cr</span>
              </div>
            </div>

            {/* Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Expected Return Rate (p.a.)</label>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">
                  <input
                    type="number"
                    value={goalRate}
                    min={1}
                    max={30}
                    step={0.5}
                    onChange={(e) => setGoalRate(Math.min(30, Math.max(1, Number(e.target.value))))}
                    className="w-12 text-right text-sm font-semibold bg-transparent text-gray-800 focus:outline-none"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={goalRate}
                onChange={(e) => setGoalRate(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#5367FF" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1%</span><span>30%</span>
              </div>
            </div>

            {/* Years */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Investment Period</label>
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">
                  <input
                    type="number"
                    value={goalYears}
                    min={1}
                    max={40}
                    step={1}
                    onChange={(e) => setGoalYears(Math.min(40, Math.max(1, Number(e.target.value))))}
                    className="w-12 text-right text-sm font-semibold bg-transparent text-gray-800 focus:outline-none"
                  />
                  <span className="text-sm text-gray-500">Yr</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={goalYears}
                onChange={(e) => setGoalYears(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#5367FF" }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1 Yr</span><span>40 Yr</span>
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div className="flex flex-col justify-center">
            {/* Main result */}
            <div className="rounded-2xl border-2 border-[#5367FF] bg-indigo-50 p-5 mb-4 text-center">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Monthly SIP Required</p>
              <p className="text-4xl font-extrabold" style={{ color: "#5367FF" }}>
                {formatINR(Math.round(result.monthlySIP))}
              </p>
              <p className="text-xs text-gray-500 mt-1">per month for {goalYears} year{goalYears > 1 ? "s" : ""}</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-sm text-gray-500">Target Corpus</span>
                <span className="text-base font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(target))}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-sm text-gray-500">Total Amount Invested</span>
                <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(result.totalInvested))}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-sm text-gray-500">Wealth Gained from Market</span>
                <span className="text-base font-semibold" style={{ color: "#00B386" }}>
                  {formatINR(Math.round(result.estimatedReturns))}
                </span>
              </div>

              {/* Progress bar: how much comes from returns */}
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Your money: {(100 - pctFromReturns).toFixed(0)}%</span>
                  <span>Market returns: {pctFromReturns.toFixed(0)}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full flex">
                    <div
                      className="h-full rounded-l-full transition-all"
                      style={{ width: `${100 - pctFromReturns}%`, backgroundColor: "#00B386" }}
                    />
                    <div
                      className="h-full rounded-r-full transition-all"
                      style={{ width: `${pctFromReturns}%`, backgroundColor: "#5367FF" }}
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center mt-1">
                  Market returns contribute {pctFromReturns.toFixed(0)}% of your goal — your actual investment is just {formatINR(Math.round(result.totalInvested))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main SIP Calculator ──────────────────────────────────────────────────────

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [viewMode, setViewMode] = useState<ViewMode>("chart");
  const [inflationRate, setInflationRate] = useState(6);
  const [showInflation, setShowInflation] = useState(false);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [showStepUp, setShowStepUp] = useState(false);

  const { totalInvested, estimatedReturns, futureValue } = useMemo(
    () => calculateSIP(monthly, rate, years),
    [monthly, rate, years]
  );

  const stepUp = useMemo(
    () => calculateStepUpSIP(monthly, rate, years, stepUpRate),
    [monthly, rate, years, stepUpRate]
  );

  const realFutureValue = useMemo(
    () => inflationAdjust(futureValue, inflationRate, years),
    [futureValue, inflationRate, years]
  );
  const realReturns = realFutureValue - totalInvested;

  const yearlyData = useMemo(
    () => calculateSIPYearly(monthly, rate, years),
    [monthly, rate, years]
  );

  const stepUpYearly = useMemo(
    () => calculateStepUpSIPYearly(monthly, rate, years, stepUpRate),
    [monthly, rate, years, stepUpRate]
  );

  const displayData = useMemo(
    () =>
      yearlyData.map((row) => ({
        ...row,
        displayValue: showInflation
          ? inflationAdjust(row.futureValue, inflationRate, row.year)
          : row.futureValue,
        displayReturns: showInflation
          ? inflationAdjust(row.futureValue, inflationRate, row.year) - row.totalInvested
          : row.estimatedReturns,
      })),
    [yearlyData, showInflation, inflationRate]
  );

  const extraGains = stepUp.futureValue - futureValue;
  const extraInvested = stepUp.totalInvested - totalInvested;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Calculators", path: "/" },
              { label: "SIP Calculator" },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Calculator Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">SIP Calculator</h2>
              <SliderInput
                label="Monthly Investment"
                value={monthly}
                min={500}
                max={100000}
                step={500}
                prefix="₹"
                onChange={setMonthly}
                data-testid="monthly-investment"
              />
              <SliderInput
                label="Expected Return Rate (p.a.)"
                value={rate}
                min={1}
                max={30}
                step={0.1}
                suffix="%"
                onChange={setRate}
                data-testid="return-rate"
              />
              <SliderInput
                label="Time Period"
                value={years}
                min={1}
                max={40}
                step={1}
                suffix="Yr"
                onChange={setYears}
                data-testid="time-period"
              />

              {/* Step-Up SIP toggle */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Step-Up SIP</p>
                    <p className="text-xs text-gray-400">Increase investment every year</p>
                  </div>
                  <button
                    onClick={() => setShowStepUp(!showStepUp)}
                    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${
                      showStepUp ? "bg-[#5367FF]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        showStepUp ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {showStepUp && (
                  <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-indigo-700">Annual Step-Up Rate</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={stepUpRate}
                          min={1}
                          max={50}
                          step={1}
                          onChange={(e) => setStepUpRate(Math.min(50, Math.max(1, Number(e.target.value))))}
                          className="w-14 text-right text-xs font-semibold border border-indigo-200 rounded-md px-2 py-1 bg-white text-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                        />
                        <span className="text-xs text-indigo-600 font-medium">%</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      step={1}
                      value={stepUpRate}
                      onChange={(e) => setStepUpRate(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: "#5367FF" }}
                    />
                    <p className="text-[10px] text-indigo-500 mt-1">
                      Year 1: {formatINR(monthly)}/mo → Year {years}: {formatINR(Math.round(monthly * Math.pow(1 + stepUpRate / 100, years - 1)))}/mo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              {/* Header with inflation toggle */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Results</h2>
                <button
                  onClick={() => setShowInflation(!showInflation)}
                  className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    showInflation
                      ? "border-orange-300 bg-orange-50 text-orange-600"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className={`w-7 h-4 rounded-full relative transition-colors ${showInflation ? "bg-orange-400" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${showInflation ? "left-3.5" : "left-0.5"}`} />
                  </span>
                  Inflation-adjusted
                </button>
              </div>

              {/* Inflation rate input */}
              {showInflation && (
                <div className="mb-4 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-orange-700">Inflation Rate (p.a.)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={inflationRate}
                        min={1}
                        max={20}
                        step={0.5}
                        onChange={(e) => setInflationRate(Math.min(20, Math.max(1, Number(e.target.value))))}
                        className="w-14 text-right text-xs font-semibold border border-orange-200 rounded-md px-2 py-1 bg-white text-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-300"
                      />
                      <span className="text-xs text-orange-600 font-medium">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={0.5}
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#f97316" }}
                  />
                  <p className="text-[10px] text-orange-500 mt-1">Real purchasing power in today's ₹</p>
                </div>
              )}

              {/* Core results */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Invested Amount</span>
                  <span className="text-base font-semibold text-gray-800" data-testid="result-invested">
                    {formatINR(Math.round(totalInvested))}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                  <span className="text-sm text-gray-500">
                    {showInflation ? "Real Returns" : "Est. Returns"}
                  </span>
                  <div className="text-right">
                    <span
                      className="text-base font-semibold block"
                      style={{ color: showInflation ? (realReturns < 0 ? "#ef4444" : "#00B386") : "#00B386" }}
                      data-testid="result-returns"
                    >
                      {formatINR(Math.round(showInflation ? realReturns : estimatedReturns))}
                    </span>
                    {showInflation && (
                      <span className="text-xs text-gray-400">nominal: {formatINR(Math.round(estimatedReturns))}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-medium text-gray-700">
                    {showInflation ? "Real Corpus" : "Total Value"}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold block" style={{ color: "#5367FF" }} data-testid="result-total">
                      {formatINR(Math.round(showInflation ? realFutureValue : futureValue))}
                    </span>
                    {showInflation && (
                      <span className="text-xs text-gray-400">nominal: {formatINR(Math.round(futureValue))}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Step-Up comparison callout */}
              {showStepUp && (
                <div className="mb-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 p-3">
                  <p className="text-xs font-semibold text-indigo-700 mb-2">
                    ✦ Step-Up SIP ({stepUpRate}% annual increase)
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Total Invested</span>
                      <span className="font-semibold text-gray-800">{formatINR(Math.round(stepUp.totalInvested))}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Est. Returns</span>
                      <span className="font-semibold" style={{ color: "#00B386" }}>{formatINR(Math.round(stepUp.estimatedReturns))}</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-indigo-100 pt-1.5">
                      <span className="font-semibold text-gray-700">Total Corpus</span>
                      <span className="font-bold" style={{ color: "#5367FF" }}>{formatINR(Math.round(stepUp.futureValue))}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1 bg-amber-50 rounded-lg px-2 py-1.5 border border-amber-100">
                      <span className="font-semibold text-amber-700">Extra Gains vs Regular</span>
                      <span className="font-bold text-amber-600">+{formatINR(Math.round(extraGains))}</span>
                    </div>
                    {extraInvested > 0 && (
                      <p className="text-[10px] text-gray-400 text-center">
                        (+{formatINR(Math.round(extraInvested))} more invested → {formatINR(Math.round(extraGains))} extra wealth)
                      </p>
                    )}
                  </div>
                </div>
              )}

              <DonutChart
                invested={showStepUp ? stepUp.totalInvested : totalInvested}
                returns={showStepUp ? stepUp.estimatedReturns : (showInflation ? Math.max(0, realReturns) : estimatedReturns)}
              />

              <p className="mt-4 text-center text-xs text-gray-400">Use the results above to plan your SIP investment with your preferred broker.</p>
            </div>
          </div>

          {/* Goal-Based SIP Planner */}
          <GoalPlanner />

          {/* Year-by-Year Growth Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-8 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-gray-800">Year-by-Year Growth</h3>
                  {showStepUp && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 whitespace-nowrap">
                      vs Step-Up @ {stepUpRate}%
                    </span>
                  )}
                  {showInflation && !showStepUp && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 whitespace-nowrap">
                      Inflation-adjusted @ {inflationRate}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {showStepUp
                    ? "Regular SIP vs Step-Up SIP side by side"
                    : showInflation
                    ? `Real purchasing power over ${years} year${years > 1 ? "s" : ""} (today's ₹)`
                    : `How your wealth builds over ${years} year${years > 1 ? "s" : ""}`}
                </p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1 flex-shrink-0">
                <button
                  onClick={() => setViewMode("chart")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    viewMode === "chart" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Chart
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    viewMode === "table" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Chart View */}
            {viewMode === "chart" && (
              <GrowthBarChart
                data={displayData.map((d) => ({
                  year: d.year,
                  totalInvested: d.totalInvested,
                  estimatedReturns: d.displayReturns,
                  futureValue: d.displayValue,
                }))}
                compareData={showStepUp ? stepUpYearly : undefined}
              />
            )}

            {/* Table View */}
            {viewMode === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invested</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {showInflation ? "Real Returns" : "Est. Returns"}
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {showInflation ? "Real Value" : "Total Value"}
                      </th>
                      {showStepUp && (
                        <>
                          <th className="text-right px-4 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50">Step-Up Invested</th>
                          <th className="text-right px-4 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50">Step-Up Total</th>
                          <th className="text-right px-4 py-3 text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50">Extra Gain</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((row, i) => {
                      const stepRow = stepUpYearly[i];
                      return (
                        <tr
                          key={row.year}
                          className={`border-b border-gray-50 transition-colors hover:bg-indigo-50/40 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                          data-testid={`year-row-${row.year}`}
                        >
                          <td className="px-4 py-3 font-semibold text-gray-700">Yr {row.year}</td>
                          <td className="px-4 py-3 text-right text-gray-600">{formatINR(Math.round(row.totalInvested))}</td>
                          <td
                            className="px-4 py-3 text-right font-medium"
                            style={{ color: row.displayReturns < 0 ? "#ef4444" : "#00B386" }}
                          >
                            {formatINR(Math.round(row.displayReturns))}
                          </td>
                          <td className="px-4 py-3 text-right font-semibold" style={{ color: "#5367FF" }}>
                            {formatINR(Math.round(row.displayValue))}
                          </td>
                          {showStepUp && stepRow && (
                            <>
                              <td className="px-4 py-3 text-right text-gray-600 bg-amber-50/50">{formatINR(Math.round(stepRow.totalInvested))}</td>
                              <td className="px-4 py-3 text-right font-semibold bg-amber-50/50" style={{ color: "#d97706" }}>{formatINR(Math.round(stepRow.futureValue))}</td>
                              <td className="px-4 py-3 text-right font-bold bg-amber-50/50" style={{ color: "#d97706" }}>
                                +{formatINR(Math.round(stepRow.futureValue - row.futureValue))}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-indigo-50 border-t-2 border-indigo-100">
                      <td className="px-4 py-3 font-bold text-gray-800 text-sm">Final</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-800">{formatINR(Math.round(totalInvested))}</td>
                      <td className="px-4 py-3 text-right font-bold" style={{ color: showInflation && realReturns < 0 ? "#ef4444" : "#00B386" }}>
                        {formatINR(Math.round(showInflation ? realReturns : estimatedReturns))}
                      </td>
                      <td className="px-4 py-3 text-right font-bold" style={{ color: "#5367FF" }}>
                        {formatINR(Math.round(showInflation ? realFutureValue : futureValue))}
                      </td>
                      {showStepUp && (
                        <>
                          <td className="px-4 py-3 text-right font-bold bg-amber-50 text-gray-800">{formatINR(Math.round(stepUp.totalInvested))}</td>
                          <td className="px-4 py-3 text-right font-bold bg-amber-50" style={{ color: "#d97706" }}>{formatINR(Math.round(stepUp.futureValue))}</td>
                          <td className="px-4 py-3 text-right font-bold bg-amber-50" style={{ color: "#d97706" }}>+{formatINR(Math.round(extraGains))}</td>
                        </>
                      )}
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">SIP Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Systematic Investment Plan (SIP) is a smart and convenient method of investing money in mutual funds. By investing a fixed amount every month at a specified return rate, you can build significant wealth over time through the power of compounding. Our SIP Calculator helps you estimate how much your monthly investments will grow over your chosen investment period.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Use the sliders above to adjust your monthly investment amount, expected annual return rate, and investment duration. Enable Step-Up SIP to see how increasing your investment each year dramatically accelerates wealth creation.
            </p>

            <h2 className="text-lg font-bold text-gray-800 mb-3">What is SIP?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>SIP stands for Systematic Investment Plan — a disciplined way to invest in mutual funds</li>
              <li>You invest a fixed amount every month on a set date</li>
              <li>Units are allocated based on the NAV (Net Asset Value) on the investment date</li>
              <li>It enables rupee cost averaging — you buy more units when prices are low and fewer when high</li>
              <li>SIPs can be started with as little as ₹500 per month</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800 mb-3">What is Step-Up SIP?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Step-Up SIP (also called a Top-Up SIP) lets you increase your monthly SIP amount by a fixed percentage every year — usually in line with your salary growth. For example, if you start with ₹10,000/month and step up by 10% annually, by year 5 you invest ₹14,641/month. This small increase leads to dramatically higher returns thanks to compounding.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
              <li><span className="font-medium">Inflation hedge:</span> As your income grows, so does your investment — maintaining real value</li>
              <li><span className="font-medium">Compounding boost:</span> Higher contributions in later years compound for fewer years but on a larger base</li>
              <li><span className="font-medium">Flexible:</span> Most mutual fund houses support automatic annual step-ups</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">How is SIP return calculated?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  SIP returns are calculated using the compound interest formula. The formula is: FV = P × [(1 + r)^n - 1] / r × (1 + r), where P is the monthly investment, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of months.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">Is SIP better than a lumpsum investment?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  Both have their merits. SIP is better for regular investors as it reduces timing risk through rupee cost averaging. Lumpsum is better when you have a large amount available and markets are at a low. For most retail investors, SIP is recommended as it promotes disciplined investing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">What is the minimum SIP amount?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  Most mutual funds allow SIPs starting from ₹500 per month. Some funds may have higher minimums of ₹1,000 or ₹5,000. You can start small and increase your SIP amount over time as your income grows.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">Can I stop a SIP anytime?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  Yes, you can stop a SIP anytime without any penalty. You can also pause it temporarily. However, stopping early can significantly impact your wealth creation due to the loss of compounding benefits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">What is the average SIP return in India?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  Equity mutual funds in India have historically delivered 12–15% annualized returns over long periods (10+ years). Debt funds typically return 6–8%. However, past performance does not guarantee future returns. The calculator uses your expected rate as an estimate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger className="text-sm font-medium text-gray-700 text-left">Is SIP investment tax-free?</AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                  Equity SIP investments held for more than 1 year qualify for Long-Term Capital Gains (LTCG) tax of 10% on gains above ₹1 lakh per year. Gains within 1 year are taxed as Short-Term Capital Gains (STCG) at 15%. ELSS SIPs qualify for deduction under Section 80C up to ₹1.5 lakh.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Other Calculators Links */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Explore Other Calculators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { label: "Lumpsum Calculator", path: "/calculators/lumpsum-calculator" },
                { label: "FD Calculator", path: "/calculators/fd-calculator" },
                { label: "EMI Calculator", path: "/calculators/emi-calculator" },
                { label: "PPF Calculator", path: "/calculators/ppf-calculator" },
                { label: "CAGR Calculator", path: "/calculators/cagr-calculator" },
                { label: "GST Calculator", path: "/calculators/gst-calculator" },
                { label: "Simple Interest", path: "/calculators/simple-interest-calculator" },
                { label: "Compound Interest", path: "/calculators/compound-interest-calculator" },
              ].map((c) => (
                <Link
                  key={c.path}
                  href={c.path}
                  className="text-xs font-medium text-[#5367FF] bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-2 text-center transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



