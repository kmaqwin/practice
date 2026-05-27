import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import SIPCalculator from "@/pages/SIPCalculator";
import LumpsumCalculator from "@/pages/LumpsumCalculator";
import FDCalculator from "@/pages/FDCalculator";
import EMICalculator from "@/pages/EMICalculator";
import SimpleInterestCalculator from "@/pages/SimpleInterestCalculator";
import CompoundInterestCalculator from "@/pages/CompoundInterestCalculator";
import CAGRCalculator from "@/pages/CAGRCalculator";
import GSTCalculator from "@/pages/GSTCalculator";
import PPFCalculator from "@/pages/PPFCalculator";
import RDCalculator from "@/pages/RDCalculator";
import SWPCalculator from "@/pages/SWPCalculator";
import MFCalculator from "@/pages/MFCalculator";
import NPSCalculator from "@/pages/NPSCalculator";
import GratuityCalculator from "@/pages/GratuityCalculator";
import IncomeTaxCalculator from "@/pages/IncomeTaxCalculator";
import InfoPage from "@/pages/InfoPage";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import HelpCenter from "@/pages/HelpCenter";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Sitemap from "@/pages/Sitemap";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function Router() {
  return (
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculators/sip-calculator" component={SIPCalculator} />
      <Route path="/calculators/lumpsum-calculator" component={LumpsumCalculator} />
      <Route path="/calculators/fd-calculator" component={FDCalculator} />
      <Route path="/calculators/emi-calculator" component={EMICalculator} />
      <Route path="/calculators/simple-interest-calculator" component={SimpleInterestCalculator} />
      <Route path="/calculators/compound-interest-calculator" component={CompoundInterestCalculator} />
      <Route path="/calculators/cagr-calculator" component={CAGRCalculator} />
      <Route path="/calculators/gst-calculator" component={GSTCalculator} />

      <Route path="/calculators/ppf-calculator" component={PPFCalculator} />
      <Route path="/calculators/rd-calculator" component={RDCalculator} />
      <Route path="/calculators/swp-calculator" component={SWPCalculator} />
      <Route path="/calculators/mf-calculator" component={MFCalculator} />
      <Route path="/calculators/nps-calculator" component={NPSCalculator} />
      <Route path="/calculators/gratuity-calculator" component={GratuityCalculator} />
      <Route path="/calculators/income-tax-calculator" component={IncomeTaxCalculator} />

      <Route path="/mutual-funds">
        {() => (
          <InfoPage
            title="Mutual Funds"
            subtitle="Diversified, professionally managed investment vehicle for every investor"
            content={[
              "A mutual fund is a type of financial vehicle made up of a pool of money collected from many investors to invest in securities such as stocks, bonds, and other assets. Mutual funds are operated by professional money managers, who allocate the fund's assets and attempt to produce capital gains or income for the fund's investors.",
              "Mutual funds give small or individual investors access to professionally managed portfolios of equities, bonds, and other securities. Each shareholder, therefore, participates proportionally in the gains or losses of the fund.",
              "Investing in mutual funds through SIP (Systematic Investment Plan) is one of the most efficient ways to build long-term wealth. With investments starting from as low as ₹100 per month, you can participate in the growth of India's capital markets.",
              "Use our SIP Calculator to estimate how much wealth you can build over time, or our MF Returns Calculator to compare SIP vs lumpsum returns across different time horizons.",
            ]}
          />
        )}
      </Route>
      <Route path="/stocks">
        {() => (
          <InfoPage
            title="Stocks"
            subtitle="Invest directly in India's top companies listed on NSE and BSE"
            content={[
              "Stock investing means buying ownership shares in a public company. As a shareholder, you benefit from the company's growth through price appreciation and dividends. Stock investing is ideal for those seeking long-term wealth creation with higher return potential.",
              "India's stock markets — NSE and BSE — list over 5,000 companies across sectors. Investors can choose from large-cap, mid-cap, and small-cap stocks depending on their risk appetite and investment horizon.",
              "Use our CAGR Calculator to analyse historical stock performance, or the Compound Interest Calculator to estimate how your equity portfolio can grow over the long term.",
            ]}
          />
        )}
      </Route>
      <Route path="/ipo">
        {() => (
          <InfoPage
            title="IPO"
            subtitle="Apply for Initial Public Offerings and list-day gains"
            content={[
              "An IPO (Initial Public Offering) is when a private company offers shares to the public for the first time. Investing in IPOs gives you the opportunity to get in at the ground floor of promising companies before they start trading on stock exchanges.",
              "IPO applications in India are processed through the ASBA (Application Supported by Blocked Amount) mechanism — your funds are blocked in your bank account but not debited until allotment is confirmed.",
              "Use our CAGR Calculator to evaluate the annualised return on any IPO investment since its listing date.",
            ]}
          />
        )}
      </Route>
      <Route path="/us-stocks">
        {() => (
          <InfoPage
            title="US Stocks"
            subtitle="Invest in Apple, Tesla, Amazon and 4,500+ US stocks from India"
            content={[
              "US stock investing allows Indian investors to diversify their portfolio internationally and participate in the growth of global giants like Apple, Google, Amazon, Tesla, and thousands more. Indian residents can invest in US stocks under the RBI's Liberalised Remittance Scheme (LRS) up to $250,000 per year.",
              "Fractional investing lets you buy a slice of expensive US stocks — for example, you can invest ₹500 in a company like Apple without needing to buy a full share.",
              "Use our CAGR Calculator to measure the historical annualised return of any US stock investment, or the Lumpsum Calculator to estimate future value.",
            ]}
          />
        )}
      </Route>

      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/sitemap" component={Sitemap} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;



