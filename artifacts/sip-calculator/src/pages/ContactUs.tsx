import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Contact Us" }]} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Get in Touch</h2>
                {[
                  { icon: Mail, label: "Email", value: "reflektaa86@gmail.com" },
                  { icon: MapPin, label: "Office", value: "India, Hyderabad" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#EEF0FF" }}>
                      <Icon size={14} style={{ color: "#5367FF" }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{label}</p>
                      <p className="text-sm text-gray-700 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5367FF] focus:ring-2 focus:ring-indigo-100 transition-all" data-testid="input-name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5367FF] focus:ring-2 focus:ring-indigo-100 transition-all" data-testid="input-email" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5367FF] focus:ring-2 focus:ring-indigo-100 transition-all" data-testid="input-subject" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your issue or question..." required rows={5} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5367FF] focus:ring-2 focus:ring-indigo-100 transition-all resize-none" data-testid="input-message" />
                </div>
                <button type="submit" className="w-full py-3 text-white font-semibold rounded-xl hover:opacity-90 transition-all" style={{ background: "#5367FF" }} data-testid="btn-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}



