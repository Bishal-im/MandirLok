"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India", length: 10 },
  { code: "+1", flag: "🇺🇸", name: "USA", length: 10 },
  { code: "+44", flag: "🇬🇧", name: "UK", length: 10 },
  { code: "+61", flag: "🇦🇺", name: "Australia", length: 9 },
  { code: "+971", flag: "🇦🇪", name: "UAE", length: 9 },
  { code: "+65", flag: "🇸🇬", name: "Singapore", length: 8 },
  { code: "+60", flag: "🇲🇾", name: "Malaysia", length: 9 },
  { code: "+974", flag: "🇶🇦", name: "Qatar", length: 8 },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia", length: 9 },
  { code: "+973", flag: "🇧🇭", name: "Bahrain", length: 8 },
  { code: "+968", flag: "🇴🇲", name: "Oman", length: 8 },
  { code: "+965", flag: "🇰🇼", name: "Kuwait", length: 8 },
  { code: "+977", flag: "🇳🇵", name: "Nepal", length: 10 },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka", length: 9 },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh", length: 10 },
  { code: "+92", flag: "🇵🇰", name: "Pakistan", length: 10 },
  { code: "+27", flag: "🇿🇦", name: "South Africa", length: 9 },
  { code: "+254", flag: "🇰🇪", name: "Kenya", length: 9 },
  { code: "+234", flag: "🇳🇬", name: "Nigeria", length: 10 },
  { code: "+81", flag: "🇯🇵", name: "Japan", length: 10 },
  { code: "+82", flag: "🇰🇷", name: "South Korea", length: 10 },
  { code: "+86", flag: "🇨🇳", name: "China", length: 11 },
  { code: "+49", flag: "🇩🇪", name: "Germany", length: 10 },
  { code: "+33", flag: "🇫🇷", name: "France", length: 9 },
  { code: "+39", flag: "🇮🇹", name: "Italy", length: 10 },
  { code: "+34", flag: "🇪🇸", name: "Spain", length: 9 },
  { code: "+64", flag: "🇳🇿", name: "New Zealand", length: 9 },
  { code: "+62", flag: "🇮🇩", name: "Indonesia", length: 10 },
  { code: "+63", flag: "🇵🇭", name: "Philippines", length: 10 },
  { code: "+66", flag: "🇹🇭", name: "Thailand", length: 9 },
];

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp" | "name">("phone");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      const nextInput = document.getElementById(`otp-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const sendOtp = () => {
    if (phone.length !== countryCode.length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp.join("").length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("name");
    }, 1000);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-[#f0dcc8] px-4 py-3">
        <div className="container-app flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center text-white font-bold">
              म
            </div>
            <span className="font-display font-bold text-[#1a1209]">
              Mandirlok
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[#6b5b45] hover:text-[#ff7f0a]"
          >
            ← Back
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-[#fdf6ee] flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#f0dcc8] rounded-3xl p-8 shadow-temple">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center text-white font-display font-bold text-2xl mx-auto mb-3 shadow-divine">
                म
              </div>
              <h1 className="font-display font-bold text-xl text-[#1a1209]">
                {step === "phone"
                  ? "Welcome to Mandirlok"
                  : step === "otp"
                    ? "Verify OTP"
                    : "Almost Done!"}
              </h1>
              <p className="text-xs text-[#6b5b45] mt-1">
                {step === "phone"
                  ? "Enter your mobile number to get started"
                  : step === "otp"
                    ? `OTP sent to ${countryCode.code} ${phone}`
                    : "Tell us your name for personalized blessings"}
              </p>
            </div>

            {step === "phone" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#6b5b45] uppercase tracking-wide mb-2 block">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountries(!showCountries)}
                        className="flex items-center gap-2 bg-[#fff8f0] border border-[#f0dcc8] rounded-xl px-3 h-[46px] hover:border-[#ffbd6e] transition-colors min-w-[90px]"
                      >
                        <span className="text-lg">{countryCode.flag}</span>
                        <span className="text-sm font-semibold text-[#6b5b45]">
                          {countryCode.code}
                        </span>
                        <span className="text-xs text-[#b89b7a]">▼</span>
                      </button>
                      {showCountries && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowCountries(false)}
                          />
                          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#f0dcc8] rounded-xl shadow-xl max-h-60 overflow-y-auto z-50">
                            {COUNTRY_CODES.map((c) => (
                              <button
                                key={c.code}
                                onClick={() => {
                                  setCountryCode(c);
                                  setShowCountries(false);
                                  setPhone("");
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#fff8f0] transition-colors text-left"
                              >
                                <span className="text-lg">{c.flag}</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-[#1a1209]">
                                    {c.name}
                                  </p>
                                  <p className="text-xs text-[#6b5b45]">
                                    {c.code}
                                  </p>
                                </div>
                                {countryCode.code === c.code && (
                                  <span className="text-[#ff7f0a]">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, countryCode.length),
                        )
                      }
                      placeholder={`${countryCode.length}-digit number`}
                      className="input-divine flex-1"
                      maxLength={countryCode.length}
                    />
                  </div>
                  <p className="text-xs text-[#6b5b45] mt-1.5">
                    📱 {countryCode.name} ({countryCode.code})
                  </p>
                </div>
                <button
                  onClick={sendOtp}
                  disabled={phone.length !== countryCode.length || loading}
                  className={`btn-saffron w-full flex items-center justify-center gap-2 ${phone.length !== countryCode.length ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : null}
                  {loading ? "Sending…" : "Send OTP"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-[#6b5b45] uppercase tracking-wide mb-3 block text-center">
                    Enter 6-digit OTP
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        className="w-11 h-12 text-center text-lg font-bold border-2 border-[#f0dcc8] rounded-xl outline-none focus:border-[#ff7f0a] focus:shadow-[0_0_0_3px_rgba(255,127,10,0.12)] transition-all text-[#1a1209]"
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={verifyOtp}
                  disabled={otp.join("").length !== 6 || loading}
                  className={`btn-saffron w-full flex items-center justify-center gap-2 ${otp.join("").length !== 6 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : null}
                  {loading ? "Verifying…" : "Verify OTP"}
                </button>
                <div className="text-center">
                  <button
                    onClick={() => setStep("phone")}
                    className="text-xs text-[#ff7f0a] hover:underline"
                  >
                    Change Number
                  </button>
                  <span className="text-[#b89b7a] mx-2">·</span>
                  <button className="text-xs text-[#ff7f0a] hover:underline">
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {step === "name" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#6b5b45] uppercase tracking-wide mb-1.5 block">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input-divine"
                  />
                </div>
                <Link
                  href="/"
                  className="btn-saffron w-full flex items-center justify-center gap-2"
                >
                  🙏 Start My Journey
                </Link>
              </div>
            )}

            <div className="om-divider my-5 text-[#f0dcc8]">
              <span className="text-sm text-[#b89b7a]">ॐ</span>
            </div>

            <p className="text-center text-[10px] text-[#b89b7a] leading-relaxed">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-[#ff7f0a] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#ff7f0a] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <p className="text-center mt-6 text-xs text-[#6b5b45]">
            Are you a Pandit?{" "}
            <Link
              href="/pandit/login"
              className="text-[#ff7f0a] font-semibold hover:underline"
            >
              Login to Pandit Portal
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
