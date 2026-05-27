import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Breadcrumb
                        items={[
                            { label: "Home", path: "/" },
                            { label: "About Us" },
                        ]}
                    />

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                            About Growwvesta
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 leading-8">
                            Plan Today, Wealth Tomorrow — free financial calculators
                            for every Indian investor.
                        </p>

                        <div className="space-y-7">
                            <p className="text-gray-600 leading-8 text-lg">
                                Growwvesta is a free, easy-to-use financial planning platform
                                built to help every Indian investor make smarter investment
                                decisions. Our mission is simple — provide practical tools
                                that help users plan their financial future without complexity
                                or hidden costs.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg">
                                We offer calculators covering SIP, Lumpsum, FD, RD, PPF,
                                NPS, EMI, GST, Income Tax, Gratuity, CAGR, and more.
                                All calculations happen instantly in your browser with
                                no sign-up, no data collection, and no hidden charges.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg">
                                Whether you are planning your first SIP, estimating your
                                retirement corpus with NPS, or comparing Old vs New
                                income tax regimes — Growwvesta provides accurate,
                                formula-based results with clear breakdowns and
                                year-by-year growth projections.
                            </p>

                            <p className="text-gray-600 leading-8 text-lg">
                                We believe financial literacy should be accessible to
                                everyone. Our calculators are designed to be intuitive
                                for beginners while still detailed enough for experienced
                                investors and financial planners.
                            </p>
                        </div>

                        <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                            <p className="text-xs leading-6 text-gray-400">
                                DISCLAIMER: All calculations on this website are estimates
                                based on the inputs provided and assumed rates of return.
                                This website does not provide financial advice. Mutual Fund
                                investments are subject to market risks. Please read all
                                scheme-related documents carefully before investing.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}