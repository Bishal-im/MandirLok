"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: "🙏", label: "Trusted by 1 Million+ Devotees" },
  { icon: "🔒", label: "100% Secure Payments" },
  { icon: "🕌", label: "500+ Sacred Temples" },
  { icon: "📹", label: "Video Proof of Every Puja" },
];

const HERO_SLIDES = [
  {
    title: "Perform Your Puja with Mandirlok",
    subtitle:
      "Let your prayers reach the Divine through authentic Vedic rituals performed on your behalf.",
    cta: "Book a Puja",
    ctaLink: "/poojas",
    secondary: "Explore Temples",
    secondaryLink: "/temples",
    gradient: "from-[#1a0500]/80 via-[#2d0a00]/60 to-transparent",
    accent: "#ff6b1a",
  },
  {
    title: "Sacred Chadhava Offerings",
    subtitle:
      "Offer sacred items at renowned temples across India from the comfort of your home.",
    cta: "Book Chadhava",
    ctaLink: "/chadhava",
    secondary: "View All Temples",
    secondaryLink: "/temples",
    gradient: "from-[#0a0a1a]/80 via-[#1a0a2d]/60 to-transparent",
    accent: "#a855f7",
  },
  {
    title: "Seek Divine Blessings Today",
    subtitle:
      "Connect with 500+ temples. Book pujas, chadhava and receive videos of completed rituals.",
    cta: "Get Started",
    ctaLink: "/poojas",
    secondary: "How It Works",
    secondaryLink: "#how-it-works",
    gradient: "from-[#0a1a0a]/80 via-[#0a2d0a]/60 to-transparent",
    accent: "#22c55e",
  },
];

const FEATURED_POOJAS = [
  {
    title: "Mahakaleshwar Special Abhishek",
    temple: "Shri Mahakaleshwar Jyotirlinga, Ujjain",
    date: "Every Monday",
    description:
      "For peace, prosperity and removal of all obstacles. Rudrabhishek performed in your name.",
    price: "₹1,100",
    tag: "MOST POPULAR",
    tagColor: "bg-orange-500",
    deity: "Shiva",
  },
  {
    title: "Tirupati Balaji Archana",
    temple: "Sri Venkateswara Temple, Tirupati",
    date: "Every Day",
    description:
      "Seek blessings for wealth, health and fulfilment of all wishes. Archana on your name.",
    price: "₹551",
    tag: "SPECIAL OFFER",
    tagColor: "bg-rose-500",
    deity: "Vishnu",
  },
  {
    title: "Kashi Vishwanath Rudrabhishek",
    temple: "Shri Kashi Vishwanath Temple, Varanasi",
    date: "Every Monday & Pradosh",
    description:
      "Receive the divine blessings of Lord Shiva through this powerful Rudrabhishek.",
    price: "₹2,100",
    tag: "TRENDING",
    tagColor: "bg-amber-500",
    deity: "Shiva",
  },
  {
    title: "Siddhivinayak Maha Puja",
    temple: "Shree Siddhivinayak Temple, Mumbai",
    date: "Every Wednesday",
    description:
      "Remove obstacles and bring success. Maha Puja performed by experienced pandits.",
    price: "₹1,500",
    tag: "",
    tagColor: "",
    deity: "Ganesha",
  },
  {
    title: "Vaishno Devi Aarti Seva",
    temple: "Shri Mata Vaishno Devi, Katra",
    date: "Every Friday",
    description:
      "Special Aarti and Chadhava offering at the divine abode of Mata Vaishno Devi.",
    price: "₹800",
    tag: "NEW",
    tagColor: "bg-teal-500",
    deity: "Devi",
  },
  {
    title: "Shirdi Sai Baba Seva",
    temple: "Shri Sai Baba Mandir, Shirdi",
    date: "Every Thursday",
    description:
      "Offer your prayers and receive Sai Baba's divine grace and blessings.",
    price: "₹750",
    tag: "",
    tagColor: "",
    deity: "Sai",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Puja",
    desc: "Browse 500+ puja services across India's most sacred temples and select the one that resonates.",
    icon: "🙏",
  },
  {
    step: "02",
    title: "Enter Your Name",
    desc: "Provide your name and gotra for the Sankalp. Our pandits will chant it during the puja.",
    icon: "✍️",
  },
  {
    step: "03",
    title: "Secure Payment",
    desc: "Pay securely using UPI, credit/debit card, or net banking through our Razorpay gateway.",
    icon: "🔐",
  },
  {
    step: "04",
    title: "Receive Puja Video",
    desc: "Get a complete video of your puja performed at the temple, delivered within 24–48 hours.",
    icon: "📹",
  },
];

const STATS = [
  { value: "1M+", label: "Devotees Served" },
  { value: "500+", label: "Sacred Temples" },
  { value: "50K+", label: "Pujas Completed" },
  { value: "25+", label: "States Covered" },
];

const FEATURES = [
  {
    icon: "🛕",
    title: "Sacred Temple Network",
    desc: "Access 500+ renowned temples across India — Jyotirlingas, Shaktipeeths, Divya Desams and more.",
  },
  {
    icon: "📿",
    title: "Authentic Vedic Rituals",
    desc: "All rituals performed by trained, experienced pandits following traditional Vedic procedures.",
  },
  {
    icon: "📱",
    title: "Real-Time Updates",
    desc: "Track your puja booking status and receive instant WhatsApp updates on ritual completion.",
  },
  {
    icon: "🎥",
    title: "Video Proof",
    desc: "Receive a high-quality video of your puja so you can witness the divine ritual personally.",
  },
  {
    icon: "💬",
    title: "WhatsApp Support",
    desc: "Dedicated support via WhatsApp for all booking queries, customization and post-puja questions.",
  },
  {
    icon: "🌍",
    title: "Book from Anywhere",
    desc: "Devotees across 30+ countries trust Mandirlok to connect them with India's sacred temples.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I booked a Rudrabhishek at Mahakaleshwar for my father's health. The video was so moving. Our family felt truly connected to the divine.",
    stars: 5,
    initials: "PS",
    color: "bg-orange-500",
  },
  {
    name: "Ramesh Nair",
    city: "Bangalore",
    text: "The entire experience was seamless. From booking to receiving the video, everything was professional. Will definitely book again!",
    stars: 5,
    initials: "RN",
    color: "bg-rose-500",
  },
  {
    name: "Meena Gupta",
    city: "Mumbai",
    text: "My son lives abroad and booked a puja at Tirupati for me. I received the video and felt Swami's blessings directly. Wonderful service.",
    stars: 5,
    initials: "MG",
    color: "bg-amber-500",
  },
  {
    name: "Suresh Rao",
    city: "Chennai",
    text: "Very authentic and transparent. I could see the pandit take my name in the sankalp. This is exactly what I needed.",
    stars: 5,
    initials: "SR",
    color: "bg-teal-500",
  },
];

// ── Placeholder Image Component ──────────────────────────────────────────────
function ImagePlaceholder({
  className = "",
  label = "",
  gradient = "from-orange-900/60 to-red-900/60",
}: {
  className?: string;
  label?: string;
  gradient?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="flex flex-col items-center text-white/60 gap-2">
        <div className="text-4xl">🛕</div>
        {label && (
          <p className="text-xs font-medium text-center px-4 opacity-70">
            {label}
          </p>
        )}
        <p className="text-xs opacity-50">Upload Image</p>
      </div>
    </div>
  );
}

// ── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-amber-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      {/* Background Placeholder */}
      <div className="absolute inset-0 transition-all duration-700">
        <ImagePlaceholder
          className="w-full h-full"
          gradient="from-[#3d1500] to-[#1a0500]"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-orange-300 text-sm font-semibold tracking-widest uppercase mb-4">
              🙏 Mandirlok Sacred Services
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              {slide.title}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:scale-105"
              >
                {slide.cta}
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href={slide.secondaryLink}
                className="inline-flex items-center gap-2 border border-white/50 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                {slide.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-orange-400" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <button
        onClick={() =>
          setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-all"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
}

// ── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 py-4">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">{b.icon}</span>
              <span className="text-sm font-medium">{b.label}</span>
              {i < TRUST_BADGES.length - 1 && (
                <span className="hidden md:block text-gray-200 ml-4">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-10">
      {tag && (
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-orange-100">
          🌸 {tag}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Puja Card ────────────────────────────────────────────────────────────────
function PujaCard({ puja }: { puja: (typeof FEATURED_POOJAS)[0] }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImagePlaceholder
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          label={puja.title}
          gradient="from-orange-800/70 to-rose-900/70"
        />
        {puja.tag && (
          <span
            className={`absolute top-3 left-3 ${puja.tagColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
          >
            {puja.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 leading-snug">
          {puja.title}
        </h3>

        <div className="flex items-start gap-1.5 mb-2">
          <svg
            className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <p className="text-xs text-gray-500 line-clamp-1">{puja.temple}</p>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <svg
            className="w-3.5 h-3.5 text-orange-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs text-gray-500">{puja.date}</p>
        </div>

        <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {puja.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-lg font-bold text-orange-600">{puja.price}</p>
          </div>
          <button className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-200">
            Book Now
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 bg-gradient-to-br from-orange-50 to-amber-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Simple Process"
          title="How Mandirlok Works"
          subtitle="A seamless 4-step process to get authentic puja performed at India's sacred temples on your behalf."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-full h-px border-t-2 border-dashed border-orange-200 z-0" />
              )}

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 border border-orange-100">
                  {step.icon}
                </div>
                <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Step {step.step}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/poojas"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-orange-300/50 transition-all duration-200 hover:scale-105 text-base"
          >
            Book Your First Puja
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-rose-700 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            India's Growing Devotional Platform
          </h2>
          <p className="text-white/80 text-sm">
            Connecting devotees with sacred temples since 2020
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                {s.value}
              </div>
              <div className="text-white/80 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Why Choose Us"
          title="One Platform for All Devotional Needs"
          subtitle="Mandirlok brings together the most sacred temples, trained pandits, and modern technology to serve your spiritual journey."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl hover:bg-orange-50 transition-colors duration-200 group border border-transparent hover:border-orange-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center text-3xl shrink-0 transition-colors duration-200">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Reviews"
          title="What Our Devotees Say"
          subtitle="Thousands of devotees trust Mandirlok to connect them with divine blessings from India's sacred temples."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-2 cursor-pointer ${active === i ? "border-orange-300 shadow-orange-100" : "border-transparent"}`}
              onClick={() => setActive(i)}
            >
              {/* Stars */}
              <Stars count={t.stars} />

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-4 line-clamp-4">
                "{t.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── App Banner ────────────────────────────────────────────────────────────────
function AppBanner() {
  return (
    <section className="py-14 bg-gradient-to-br from-[#1a0500] to-[#3d1500] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Download the Mandirlok App
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-md">
              Book pujas, track offerings, receive puja videos and stay
              connected with divine temples — all from your phone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="flex items-center gap-3 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                <span className="text-2xl">▶</span>
                <div className="text-left">
                  <div className="text-xs text-gray-500">GET IT ON</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                <span className="text-2xl"></span>
                <div className="text-left">
                  <div className="text-xs text-gray-500">DOWNLOAD ON</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mockup Placeholder */}
          <div className="w-48 h-80 bg-white/10 rounded-3xl border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-white/50">
              <div className="text-5xl mb-2">📱</div>
              <div className="text-xs">App Preview</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-700 flex items-center justify-center text-white font-bold text-lg">
                म
              </div>
              <div>
                <div className="text-white font-bold text-lg">Mandirlok</div>
                <div className="text-xs text-orange-400">
                  Your Sacred Temple Platform
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-sm">
              Mandirlok connects devotees with India's most sacred temples. Book
              authentic pujas, chadhava offerings and receive video proof — all
              from home.
            </p>
            <div className="flex gap-3">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center text-sm transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Book a Puja",
                "Chadhava Seva",
                "Temple Directory",
                "About Us",
                "Contact",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                📞 <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                💬 <span>WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-2">
                ✉️ <span>help@mandirlok.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Mandirlok. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-400 transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Payments by</span>
            <span className="text-white font-semibold">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="min-h-screen font-sans bg-white">
      <HeroSection />
      <TrustBar />

      {/* Featured Poojas Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Mandirlok Special Pujas"
            title="Upcoming Sacred Pujas & Rituals"
            subtitle="Book authentic pujas performed at India's most powerful temples. Receive a video within 24–48 hours."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {FEATURED_POOJAS.map((puja, i) => (
              <PujaCard key={i} puja={puja} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/poojas"
              className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
            >
              View All Pujas
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AppBanner />
      <Footer />
    </main>
  );
}
