"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pujas", href: "/poojas" },
  { label: "Chadhava", href: "/chadhava" },
  { label: "Temples", href: "/temples" },
  { label: "About", href: "/about" },
];

// Words that cycle in the top spiritual bar
const SPIRITUAL_WORDS = [
  "Spiritual",
  "Divine",
  "Sacred",
  "Blessed",
  "Devotional",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cycling spiritual word
  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % SPIRITUAL_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style suppressHydrationWarning>{`
        /* ── Top bar marquee ── */
        @keyframes topMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .top-marquee { animation: topMarquee 22s linear infinite; }

        /* ── Spiritual word flip ── */
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(10px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0)    scale(1); }
          to   { opacity: 0; transform: translateY(-10px) scale(0.92); }
        }
        .word-in  { animation: wordIn  0.35s cubic-bezier(.34,1.56,.64,1) forwards; }
        .word-out { animation: wordOut 0.3s  ease-in forwards; }

        /* ── Login button ripple ── */
        @keyframes ripple {
          0%   { box-shadow: 0 0 0 0 rgba(251,146,60,0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(251,146,60,0); }
          100% { box-shadow: 0 0 0 0 rgba(251,146,60,0); }
        }
        .btn-login:hover { animation: ripple 0.7s ease-out; }

        /* ── Book Puja shimmer ── */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .btn-book {
          background: linear-gradient(
            90deg,
            #ea580c 0%,
            #f97316 30%,
            #fbbf24 50%,
            #f97316 70%,
            #ea580c 100%
          );
          background-size: 200% auto;
        }
        .btn-book:hover {
          animation: shimmer 1.2s linear infinite;
        }

        /* ── Pulse dot on Book Puja ── */
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .ping { animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }

        /* ── Hamburger transition ── */
        .hamburger-line {
          display: block; width: 22px; height: 2px;
          background: #1a1209;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(.77,0,.18,1);
          transform-origin: center;
        }
        .menu-open .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .menu-open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .menu-open .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu slide ── */
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: menuSlide 0.25s ease-out forwards; }

        /* ── Nav link underline ── */
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #f97316;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      {/* ── TOP SPIRITUAL BAR ── */}
      <div className="bg-gradient-to-r from-[#7c1a00] via-[#a32200] to-[#7c1a00] text-white text-xs overflow-hidden h-8 flex items-center relative">
        {/* Cycling spiritual word badge */}
        <div className="absolute left-4 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-0.5 rounded-full border border-white/20 shrink-0">
          <span className="text-yellow-300">✦</span>
          <span
            key={wordIndex}
            className={
              wordVisible
                ? "word-in inline-block text-yellow-200 font-bold tracking-wide"
                : "word-out inline-block text-yellow-200 font-bold tracking-wide"
            }
          >
            {SPIRITUAL_WORDS[wordIndex]}
          </span>
          <span className="text-white/70 font-medium hidden sm:inline">
            Services
          </span>
        </div>

        {/* Scrolling marquee text */}
        <div className="flex whitespace-nowrap ml-48">
          <div className="top-marquee flex items-center gap-0">
            {[
              "🙏 Trusted by 1 Million+ Devotees",
              "🔒 100% Secure Payments",
              "🛕 500+ Sacred Temples",
              "📹 Video Proof Delivered",
              "⚡ Book in 2 Minutes",
              "🌍 Devotees in 30+ Countries",
              "🎁 Prasad Home Delivery",
              "✅ 100% Authentic Rituals",
              "🙏 Trusted by 1 Million+ Devotees",
              "🔒 100% Secure Payments",
              "🛕 500+ Sacred Temples",
              "📹 Video Proof Delivered",
              "⚡ Book in 2 Minutes",
              "🌍 Devotees in 30+ Countries",
              "🎁 Prasad Home Delivery",
              "✅ 100% Authentic Rituals",
            ].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-5 px-6 text-white/90 font-medium text-[11px]"
              >
                {item}
                <span className="text-orange-300/50">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right: WhatsApp */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="absolute right-4 flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] transition-colors text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shrink-0"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled
            ? "shadow-[0_2px_20px_rgba(0,0,0,0.12)]"
            : "border-b border-orange-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white text-lg shadow-md group-hover:shadow-orange-300/50 transition-all duration-300 group-hover:scale-110">
                🛕
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold text-[#1a0500] tracking-tight">
                  Mandirlok
                </span>
                <span className="text-[10px] text-orange-500 font-semibold tracking-widest uppercase">
                  Sacred Services
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 rounded-lg hover:bg-orange-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── DESKTOP CTA BUTTONS ── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Login — ripple on hover */}
              <Link
                href="/login"
                className="btn-login relative flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-orange-400 text-orange-600 text-sm font-bold transition-all duration-200 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-700 hover:-translate-y-0.5 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Login
              </Link>

              {/* Book Puja — shimmer + ping dot */}
              <Link
                href="/poojas"
                className="btn-book relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-orange-300/40 hover:shadow-orange-400/60 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 overflow-hidden"
              >
                {/* Animated pulse dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-100"></span>
                </span>
                Book Puja
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* ── MOBILE MENU BUTTON ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-xl hover:bg-orange-50 transition-colors ${menuOpen ? "menu-open" : ""}`}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div className="mobile-menu md:hidden bg-white border-t border-orange-100 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTAs */}
              <div className="flex gap-3 mt-3 pt-3 border-t border-orange-100">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-orange-400 text-orange-600 text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Login
                </Link>
                <Link
                  href="/poojas"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 btn-book flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold shadow-md"
                >
                  Book Puja 🙏
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
