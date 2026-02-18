"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

const CONTACT_REASONS = [
  "Booking Issue",
  "Payment Problem",
  "Video Not Received",
  "Pandit Complaint",
  "Temple Inquiry",
  "General Question",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmit(true);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fdf6ee]">
        {/* ── Hero ── */}
        <div className="bg-gradient-to-br from-[#8b0000] to-[#1a0a00] py-14 px-4 text-center text-white">
          <span className="bg-white/10 border border-white/20 text-[#ffd9a8] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 inline-block">
            💬 We're Here to Help
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Contact Mandirlok
          </h1>
          <p className="text-[#ffd9a8] max-w-xl mx-auto">
            Any questions about your booking, payment, or pooja video? Our team
            is available 7 days a week.
          </p>
        </div>

        <div className="container-app py-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* ── Contact Cards ── */}
            <div className="space-y-4">
              {[
                {
                  icon: <Phone size={20} />,
                  title: "Call / WhatsApp",
                  value: "+91 98765 43210",
                  sub: "Mon–Sun 7AM–10PM",
                  color: "#25D366",
                },
                {
                  icon: <Mail size={20} />,
                  title: "Email Us",
                  value: "support@mandirlok.com",
                  sub: "Reply within 4 hours",
                  color: "#ff7f0a",
                },
                {
                  icon: <Clock size={20} />,
                  title: "Support Hours",
                  value: "7AM – 10PM IST",
                  sub: "7 days a week",
                  color: "#8b0000",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-[#f0dcc8] rounded-2xl p-5 flex gap-4 shadow-card"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: c.color }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1209] text-sm">
                      {c.title}
                    </p>
                    <p className="text-[#ff7f0a] text-sm font-medium">
                      {c.value}
                    </p>
                    <p className="text-xs text-[#6b5b45]">{c.sub}</p>
                  </div>
                </div>
              ))}

              <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-2xl p-4">
                <h4 className="font-semibold text-[#1a1209] text-sm mb-2">
                  Common Solutions
                </h4>
                {[
                  "Video not received → Check WhatsApp spam folder",
                  "Payment failed → Amount auto-refunded in 5–7 days",
                  "Booking issue → Share Booking ID for quick help",
                ].map((s) => (
                  <p
                    key={s}
                    className="text-xs text-[#6b5b45] py-1.5 border-b border-[#f0dcc8] last:border-0"
                  >
                    {s}
                  </p>
                ))}
              </div>
            </div>

            {/* ── Contact Form ── */}
            <div className="md:col-span-2">
              {submitted ? (
                <div className="bg-white border border-[#f0dcc8] rounded-2xl p-10 shadow-card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1a1209] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#6b5b45] text-sm mb-6">
                    Our team will reply to <strong>{form.email}</strong> within
                    4 hours. You'll also receive a WhatsApp confirmation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmit(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        reason: "",
                        message: "",
                      });
                    }}
                    className="btn-saffron text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#f0dcc8] rounded-2xl p-6 shadow-card space-y-4"
                >
                  <h2 className="font-display font-semibold text-[#1a1209] mb-2">
                    Send Us a Message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder="Full name"
                        className="input-divine"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        className="input-divine"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            phone: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          }))
                        }
                        placeholder="10-digit number"
                        className="input-divine"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
                        Reason for Contact *
                      </label>
                      <select
                        required
                        value={form.reason}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, reason: e.target.value }))
                        }
                        className="input-divine"
                      >
                        <option value="">Select a reason</option>
                        {CONTACT_REASONS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Describe your issue or question in detail…"
                      rows={5}
                      className="input-divine resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-saffron w-full text-base flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin">⟳</span>
                    ) : (
                      <MessageSquare size={16} />
                    )}
                    {loading ? "Sending…" : "Send Message"}
                  </button>

                  <p className="text-center text-xs text-[#6b5b45]">
                    Or WhatsApp us directly at{" "}
                    <strong className="text-[#25D366]">+91 98765 43210</strong>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
