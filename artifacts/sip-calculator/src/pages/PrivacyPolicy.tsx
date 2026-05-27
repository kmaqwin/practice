import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Privacy Policy" }]} />
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 prose prose-gray max-w-none">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: January 1, 2025</p>

            {[
              { title: "1. Information We Collect", body: "We collect information you provide directly to us, such as when you create an account, make a transaction, or contact us for support. This includes your name, email address, phone number, PAN card, Aadhaar number, bank account details, and investment preferences." },
              { title: "2. How We Use Your Information", body: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and comply with legal obligations including KYC requirements mandated by SEBI and AMFI." },
              { title: "3. Information Sharing", body: "We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers." },
              { title: "4. Data Security", body: "We implement a variety of security measures to maintain the safety of your personal information. We use SSL encryption for data transmission and store all information behind secured networks that are only accessible by a limited number of persons who have special access rights." },
              { title: "5. Cookies", body: "Our site may use cookies to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about you. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent." },
              { title: "6. Your Rights", body: "You have the right to access, update, or delete your personal information at any time. You can also request data portability or object to processing of your data. To exercise these rights, please contact our support team." },
              { title: "7. Contact Us", body: "If you have any questions about this Privacy Policy, please contact us at reflektaa86@gmail.com ." },
            ].map(({ title, body }) => (
              <div key={title} className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}

            <p className="text-xs text-gray-400 mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
              This privacy policy applies to the SIP Calculator website and the information it collects through your use of our calculator tools.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



