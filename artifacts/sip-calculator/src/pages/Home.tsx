import * as React from "react";
import { Link } from "wouter";

export default function Home() {
    const [years, setYears] = React.useState(20);
    const [monthlySip, setMonthlySip] = React.useState(5000);
    const [annualReturn, setAnnualReturn] = React.useState(12);
    const [metalRates, setMetalRates] = React.useState<any>(null);
    const [metalLoading, setMetalLoading] = React.useState(true);
    React.useEffect(() => {
        async function loadRates() {
            try {
                const [goldRes, silverRes] = await Promise.all([
    fetch("https://www.goldapi.io/api/XAU/INR", {
        headers: {
            "x-access-token": import.meta.env.VITE_GOLDAPI_KEY,
            "Content-Type": "application/json",
        },
    }),
    fetch("https://www.goldapi.io/api/XAG/INR", {
        headers: {
            "x-access-token": import.meta.env.VITE_GOLDAPI_KEY,
            "Content-Type": "application/json",
        },
    }),
]);

const gold = await goldRes.json();
const silver = await silverRes.json();

const data = {
    gold10g: gold.price_gram_24k * 10,
    silver10g: silver.price_gram_24k * 10,
};
                setMetalRates(data);
            } catch {
                setMetalRates(null);
            } finally {
                setMetalLoading(false);
            }
        }

        loadRates();
    }, []);
    const calculators = [
        { title: "SIP Calculator", desc: "Calculate monthly SIP returns.", url: "/calculators/sip-calculator" },
        { title: "Lumpsum Calculator", desc: "Estimate one-time investment growth.", url: "/calculators/lumpsum-calculator" },
        { title: "EMI Calculator", desc: "Calculate loan EMI instantly.", url: "/calculators/emi-calculator" },
        { title: "FD Calculator", desc: "Estimate fixed deposit maturity.", url: "/calculators/fd-calculator" },
        { title: "PPF Calculator", desc: "Calculate long-term PPF returns.", url: "/calculators/ppf-calculator" },
        { title: "GST Calculator", desc: "Calculate GST inclusive/exclusive price.", url: "/calculators/gst-calculator" },
        { title: "CAGR Calculator", desc: "Find annualized return percentage.", url: "/calculators/cagr-calculator" },
        { title: "Income Tax Calculator", desc: "Estimate income tax liability.", url: "/calculators/income-tax-calculator" },
    ];

    const months = years * 12;
    const monthlyRate = annualReturn / 12 / 100;

    const futureValue =
        monthlyRate > 0
            ? monthlySip *
            (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                (1 + monthlyRate))
            : monthlySip * months;

    const investedAmount = monthlySip * months;
    const estimatedReturns = futureValue - investedAmount;

    const formatINR = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
        }).format(Math.max(0, value || 0));

    const chartBars = Array.from({ length: 12 }, (_, index) => {
        const progress = (index + 1) / 12;
        return Math.round(24 + progress * 140 * (years / 25));
    });

    return (
        <main className="min-h-screen bg-[#020817] text-white">
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/">
                        <a className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Growwvesta Logo"
                                className="w-11 h-11 rounded-xl bg-white p-1"
                            />

                            <div>
                                <div className="text-xl font-bold leading-5">
                                    Growwvesta
                                </div>

                                <div className="text-xs text-slate-400">
                                    Financial Calculators
                                </div>
                            </div>
                        </a>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <Link href="/">
                            <a className="text-emerald-400">Home</a>
                        </Link>

                        <Link href="/about-us">
                            <a>About Us</a>
                        </Link>

                        <Link href="/contact-us">
                            <a>Contact Us</a>
                        </Link>
                    </div>

                    <Link href="/calculators/sip-calculator">
                        <a className="bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-300 transition shadow-[0_0_30px_rgba(52,211,153,0.25)]">
                            Open SIP Calculator →
                        </a>
                    </Link>
                </div>
            </nav>
           
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_35%)]" />

                <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 mb-7">
                            100% Free • No Sign Up • Accurate Results
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                            Growwvesta
                            <span className="block text-emerald-400">
                                Financial Calculators
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 leading-8 max-w-2xl mb-10">
                            Plan your finances better with accurate calculators for SIP,
                            FD, EMI, CAGR, PPF, GST, and mutual fund returns.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/calculators/sip-calculator">
                                <a className="h-[92px] w-full sm:w-[360px] inline-flex items-center justify-center rounded-2xl bg-emerald-400 text-lg font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                    Open SIP Calculator →
                                </a>
                            </Link>

                            <a
                                href="#calculators"
                                className="h-[92px] w-full sm:w-[360px] inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg font-bold text-white transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.06]"
                            >
                                Explore Calculators
                            </a>
                        </div>
                        <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-4xl">
                            <div className="h-[92px] rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-6 py-4 backdrop-blur-xl flex items-center justify-between shadow-[0_0_25px_rgba(250,204,21,0.08)]">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-full bg-yellow-400/20 border border-yellow-300/30 flex items-center justify-center">
                                            <span className="text-xs font-bold text-yellow-300">10g</span>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-white">
                                                Gold / 10 gm
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                Updated every 6 hours
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xl font-extrabold text-yellow-300">
                                           {metalLoading
                                             ? "--"
                                             : metalRates?.gold10g
                                             ? `₹${Math.round(metalRates.gold10g).toLocaleString("en-IN")}`
                                             : "--"}
                                        </p>
                                        <p className="text-xs text-emerald-300">Live Rate</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-300/20 bg-white/[0.06] px-5 py-4 backdrop-blur-xl shadow-[0_0_25px_rgba(148,163,184,0.08)]">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-full bg-slate-300/20 border border-slate-300/30 flex items-center justify-center">
                                            <span className="text-xs font-bold text-slate-200">10g</span>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-white">
                                                Silver / 10 gm
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                Updated every 6 hours
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xl font-extrabold text-slate-100">
                                            {metalLoading
                                                ? "--"
                                                    : metalRates?.silver10g
                                                    ? `₹${Math.round(metalRates.silver10g).toLocaleString("en-IN")}`
                                                    : "--"}
                                        </p>
                                        <p className="text-xs text-emerald-300">Live Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl max-w-md ml-auto">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-2xl font-bold leading-7">
                                    Investment
                                    <br />
                                    Growth Preview
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Dynamic SIP projection
                                </p>
                            </div>

                            <div className="flex rounded-full bg-slate-950/60 border border-white/10 p-1">
                                {[5, 10, 15, 20, 25].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setYears(item)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${years === item
                                            ? "bg-emerald-400 text-slate-950"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        {item}Y
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="rounded-2xl bg-slate-950/70 p-5 border border-white/10">
                                <label className="text-sm text-slate-400 block mb-2">
                                    Monthly SIP
                                </label>

                                <input
                                    type="number"
                                    value={monthlySip}
                                    onChange={(e) =>
                                        setMonthlySip(Number(e.target.value))
                                    }
                                    className="w-full bg-transparent text-3xl font-bold text-emerald-400 outline-none"
                                />
                            </div>

                            <div className="rounded-2xl bg-slate-950/70 p-5 border border-white/10">
                                <label className="text-sm text-slate-400 block mb-2">
                                    Expected Return %
                                </label>

                                <input
                                    type="number"
                                    value={annualReturn}
                                    onChange={(e) =>
                                        setAnnualReturn(Number(e.target.value))
                                    }
                                    className="w-full bg-transparent text-3xl font-bold text-cyan-300 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="rounded-2xl bg-slate-950/70 p-5 border border-white/10">
                                <p className="text-sm text-slate-400">
                                    Invested Amount
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    ₹{formatINR(investedAmount)}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-950/70 p-5 border border-white/10">
                                <p className="text-sm text-slate-400">
                                    Estimated Returns
                                </p>

                                <p className="text-2xl font-bold text-emerald-400 mt-2">
                                    ₹{formatINR(estimatedReturns)}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-950/70 p-5 border border-white/10">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <p className="text-sm text-slate-400">
                                        Total Value
                                    </p>

                                    <p className="text-4xl font-extrabold mt-2">
                                        ₹{formatINR(futureValue)}
                                    </p>
                                </div>

                                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">
                                    {years} Years
                                </div>
                            </div>

                            <div className="h-32 flex items-end gap-2">
                                {chartBars.map((height, index) => (
                                    <div
                                        key={index}
                                        className="h-[92px] w-full sm:w-[360px] inline-flex items-center justify-center rounded-2xl bg-emerald-400 text-lg font-bold text-slate-950 transition-all duration-300 hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                                        style={{ height }}
                                    />
                                ))}
                            </div>
                        </div>
                       </div>
                </div>                            
            </section>
            <section
                id="calculators"
                className="max-w-7xl mx-auto px-6 py-16"
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-3">
                        Popular Financial Calculators
                    </h2>

                    <p className="text-slate-400">
                        Choose a calculator below to plan your savings,
                        investment or loan.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {calculators.map((item) => (
                        <Link key={item.url} href={item.url}>
                            <a className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl hover:border-emerald-400/40 hover:bg-emerald-400/5 transition hover:-translate-y-1">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-5">
                                    <span className="text-emerald-300 font-bold text-lg">
                                        {item.title
                                            .split(" ")
                                            .slice(0, 2)
                                            .map((word) => word[0])
                                            .join("")}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-400 leading-6 mb-5">
                                    {item.desc}
                                </p>

                                <span className="text-emerald-300 font-semibold">
                                    Open Calculator →
                                </span>
                            </a>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 backdrop-blur-xl">
                    <h2 className="text-2xl font-bold mb-3">
                        Smart Financial Planning Starts Here
                    </h2>

                    <p className="text-slate-300 leading-7">
                        Use our free financial calculators to estimate SIP returns,
                        calculate EMI payments, compare FD maturity values,
                        evaluate CAGR growth and make smarter investment decisions.
                    </p>
                </div>
            </section>

            <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Growwvesta Financial Calculators
                            </h3>

                            <p className="text-sm leading-6">
                                Free online financial calculators for SIP,
                                EMI, FD, PPF, CAGR, GST and tax planning.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-3">
                                Popular Links
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/calculators/sip-calculator">
                                        SIP Calculator
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/calculators/emi-calculator">
                                        EMI Calculator
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/calculators/fd-calculator">
                                        FD Calculator
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/calculators/ppf-calculator">
                                        PPF Calculator
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-3">
                                Company
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/about-us">About Us</Link>
                                </li>

                                <li>
                                    <Link href="/contact-us">Contact Us</Link>
                                </li>

                                <li>
                                    <Link href="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/terms-of-service">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-5 text-center text-sm text-slate-500">
                        © 2026 Growwvesta Financial Calculators.
                        All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}