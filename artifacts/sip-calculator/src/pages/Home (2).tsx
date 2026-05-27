import * as React from "react";
import { Link } from "wouter";

export default function Home() {
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

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 text-center">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/logo.png"
                            alt="SIP Calculator Logo"
                            className="w-28 h-28 bg-white rounded-2xl p-3 shadow-xl"
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-5">
                        Growwvesta Financial Calculators
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-emerald-50 mb-8">
                        Plan your finances better with accurate calculators for SIP, FD, EMI, CAGR, PPF,
                        GST, and mutual fund returns.
                    </p>

                    <Link href="/calculators/sip-calculator">
                        <a className="inline-block bg-white text-emerald-600 px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-50 transition">
                            Open SIP Calculator
                        </a>
                    </Link>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-14">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    Popular Financial Calculators
                </h2>

                <p className="text-slate-600 mb-8">
                    Choose a calculator below to plan your savings, investment or loan.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {calculators.map((item) => (
                        <Link key={item.url} href={item.url}>
                            <a className="block bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-slate-600 text-sm mb-4">
                                    {item.desc}
                                </p>

                                <span className="text-emerald-600 font-medium">
                                    Open Calculator →
                                </span>
                            </a>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-16">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        Smart Financial Planning Starts Here
                    </h2>

                    <p className="text-slate-600 leading-7">
                        Use our free financial calculators to estimate SIP returns,
                        calculate EMI payments, compare FD maturity values, evaluate
                        CAGR growth and make smarter investment decisions.
                    </p>
                </div>
            </section>

            <footer className="bg-slate-900 text-white mt-10">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3">
                                Growwvesta Financial Calculators
                            </h3>

                            <p className="text-slate-300 text-sm leading-6">
                                Free online financial calculators for SIP, EMI, FD, PPF,
                                CAGR, GST and tax planning.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">
                                Popular Links
                            </h4>

                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li><Link href="/calculators/sip-calculator">SIP Calculator</Link></li>
                                <li><Link href="/calculators/emi-calculator">EMI Calculator</Link></li>
                                <li><Link href="/calculators/fd-calculator">FD Calculator</Link></li>
                                <li><Link href="/calculators/ppf-calculator">PPF Calculator</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3">
                                Company
                            </h4>

                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li><Link href="/about-us">About Us</Link></li>
                                <li><Link href="/contact-us">Contact Us</Link></li>
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 mt-8 pt-5 text-center text-slate-400 text-sm">
                        © 2026 Growwvesta Financial Calculators. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}