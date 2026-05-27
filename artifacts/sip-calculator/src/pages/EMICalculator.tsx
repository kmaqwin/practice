import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliderInput from "@/components/SliderInput";
import DonutChart from "@/components/DonutChart";
import Breadcrumb from "@/components/Breadcrumb";
import { calculateEMI } from "@/utils/calculations";
import { formatINR } from "@/utils/formatters";

export default function EMICalculator() {
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  const { emi, totalInterest, totalPayment } = useMemo(
    () => calculateEMI(loan, rate, years),
    [loan, rate, years]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Calculators", path: "/" }, { label: "EMI Calculator" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">EMI Calculator</h2>
              <SliderInput label="Loan Amount" value={loan} min={10000} max={50000000} step={10000} prefix="₹" onChange={setLoan} data-testid="loan-amount" />
              <SliderInput label="Rate of Interest (p.a.)" value={rate} min={1} max={30} step={0.1} suffix="%" onChange={setRate} data-testid="rate" />
              <SliderInput label="Loan Tenure" value={years} min={1} max={30} step={1} suffix="Yr" onChange={setYears} data-testid="tenure" />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Monthly EMI</h2>
              <div className="text-4xl font-extrabold mb-6" style={{ color: "#5367FF" }} data-testid="result-emi">
                {formatINR(Math.round(emi))}
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Principal Amount</span>
                  <span className="text-base font-semibold text-gray-800">{formatINR(Math.round(loan))}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Total Interest</span>
                  <span className="text-base font-semibold" style={{ color: "#f97316" }}>{formatINR(Math.round(totalInterest))}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-gray-700">Total Payment</span>
                  <span className="text-xl font-bold text-gray-800">{formatINR(Math.round(totalPayment))}</span>
                </div>
              </div>
              <DonutChart invested={loan} returns={totalInterest} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">EMI Calculator</h1>
            <p className="text-gray-600 leading-relaxed mb-4">
              An EMI (Equated Monthly Instalment) is a fixed monthly payment made by a borrower to a lender on a specified date each calendar month. It comprises both principal and interest. Our EMI calculator helps you determine the monthly instalment for any loan amount, interest rate, and tenure.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Formula: <strong>EMI = P × r × (1+r)^n / ((1+r)^n - 1)</strong>, where P is the loan amount, r is the monthly interest rate, and n is the number of monthly instalments.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



