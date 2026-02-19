"use client";

import { useState } from "react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
const FILTERS = [
  "All Pujas",
  "Shiva",
  "Vishnu",
  "Devi",
  "Ganesha",
  "Surya",
  "Navgraha",
];

const SORT_OPTIONS = [
  "Most Popular",
  "Upcoming Date",
  "Price: Low to High",
  "Price: High to Low",
];

const POOJAS = [
  {
    id: "mahakaleshwar-rudrabhishek",
    title: "Mahakaleshwar Rudrabhishek & Bhasma Aarti",
    temple: "Shri Mahakaleshwar Jyotirlinga, Ujjain, MP",
    date: "Every Monday, Maha Shivratri",
    deity: "Shiva",
    description:
      "The most powerful Rudrabhishek performed at the only south-facing Jyotirlinga. Bhasma Aarti is offered at dawn. Performed in your name sankalp by temple priests.",
    price: "₹2,100",
    originalPrice: "₹2,800",
    tag: "MOST POPULAR",
    tagColor: "bg-orange-500",
    benefits: [
      "Peace & prosperity",
      "Health & longevity",
      "Removal of obstacles",
    ],
    duration: "2 hours",
    participants: "Individual / Family",
  },
  {
    id: "kashi-rudrabhishek",
    title: "Kashi Vishwanath Rudrabhishek",
    temple: "Shri Kashi Vishwanath Temple, Varanasi, UP",
    date: "Every Monday & Pradosh Tithi",
    deity: "Shiva",
    description:
      "A sacred Rudrabhishek on the banks of the holy Ganga at one of India's most powerful Shiva temples. Receive blessings of Moksha and divine grace.",
    price: "₹1,500",
    originalPrice: "₹2,000",
    tag: "TRENDING",
    tagColor: "bg-amber-500",
    benefits: ["Moksha blessings", "Kaal Sarp dosh remedy", "Pitru shanti"],
    duration: "1.5 hours",
    participants: "Individual",
  },
  {
    id: "tirupati-archana",
    title: "Tirupati Balaji Vishesh Archana",
    temple: "Sri Venkateswara Temple, Tirupati, AP",
    date: "Every Day",
    deity: "Vishnu",
    description:
      "Special Archana at the world's most visited temple. Sahasranama Archana performed with 1008 names of Lord Venkateswara for wealth and wish fulfilment.",
    price: "₹551",
    originalPrice: "₹751",
    tag: "SPECIAL OFFER",
    tagColor: "bg-rose-500",
    benefits: ["Wealth & prosperity", "Wish fulfilment", "Marriage blessings"],
    duration: "45 mins",
    participants: "Individual / Family",
  },
  {
    id: "siddhivinayak-puja",
    title: "Siddhivinayak Maha Abhishek",
    temple: "Shree Siddhivinayak Temple, Mumbai, MH",
    date: "Every Wednesday",
    deity: "Ganesha",
    description:
      "Maha Abhishek and Archana at the most celebrated Ganesha temple in Maharashtra. Perfect for new beginnings, career success and business growth.",
    price: "₹1,100",
    originalPrice: "₹1,500",
    tag: "NEW",
    tagColor: "bg-teal-500",
    benefits: ["Business success", "Education blessings", "Obstacle removal"],
    duration: "1 hour",
    participants: "Individual",
  },
  {
    id: "bagalamukhi-havan",
    title: "Bagalamukhi Havan & Chadhava",
    temple: "Maa Baglamukhi Pitambara Peeth, Datia, MP",
    date: "Every Tuesday",
    deity: "Devi",
    description:
      "For victory over enemies and relief from legal issues. Havan performed by experienced purohitjis with full Vedic procedures.",
    price: "₹3,100",
    originalPrice: "₹4,000",
    tag: "POWERFUL",
    tagColor: "bg-purple-500",
    benefits: [
      "Victory over enemies",
      "Court case relief",
      "Protection from evil",
    ],
    duration: "3 hours",
    participants: "Individual / Family",
  },
  {
    id: "navgraha-puja",
    title: "Navgrah Shanti Maha Puja",
    temple: "Shri Navagraha Shani Mandir, Ujjain, MP",
    date: "Every Saturday",
    deity: "Navgraha",
    description:
      "Complete Navgraha Shanti puja to pacify all 9 planetary energies. Ideal for people experiencing Shani Sade Saati, Rahu/Ketu dasha.",
    price: "₹1,800",
    originalPrice: "₹2,400",
    tag: "",
    tagColor: "",
    benefits: ["Sade Saati relief", "Dasha shanti", "Career growth"],
    duration: "2.5 hours",
    participants: "Individual",
  },
  {
    id: "vaishno-devi-aarti",
    title: "Mata Vaishno Devi Aarti Seva",
    temple: "Shri Mata Vaishno Devi Bhavan, Katra",
    date: "Every Friday & Navratri",
    deity: "Devi",
    description:
      "Special Aarti and Chadhava at the most visited Shakti shrine in northern India. Receive blessings of Mata for health, protection and prosperity.",
    price: "₹800",
    originalPrice: "₹1,100",
    tag: "",
    tagColor: "",
    benefits: ["Divine protection", "Health blessings", "Family well-being"],
    duration: "1 hour",
    participants: "Individual / Family",
  },
  {
    id: "surya-puja",
    title: "Surya Sankranti Mahaseva",
    temple: "Shri Galtaji Surya Temple, Jaipur, RJ",
    date: "Every Sunday & Sankranti",
    deity: "Surya",
    description:
      "Worship the Sun God on his most powerful day for career success, government favour and health. Offered at the ancient Galtaji Surya Temple.",
    price: "₹1,200",
    originalPrice: "₹1,600",
    tag: "",
    tagColor: "",
    benefits: [
      "Government job success",
      "Health & vitality",
      "Leadership qualities",
    ],
    duration: "1.5 hours",
    participants: "Individual",
  },
  {
    id: "hanuman-chadhava",
    title: "Hanuman Garhi Special Chadhava",
    temple: "Shri Hanuman Garhi Temple, Ayodhya, UP",
    date: "Every Tuesday & Saturday",
    deity: "Shiva",
    description:
      "Sacred offering at Hanuman Garhi — the divine protector's abode. For protection from negative energies, strength and victory in all endeavours.",
    price: "₹750",
    originalPrice: "₹1,000",
    tag: "",
    tagColor: "",
    benefits: ["Protection from evil", "Courage & strength", "Shani shanti"],
    duration: "45 mins",
    participants: "Individual",
  },
];

// ── Image Placeholder ──────────────────────────────────────────────────────────
function ImagePlaceholder({
  label = "",
  className = "",
  gradient = "from-orange-800/60 to-red-900/70",
}: {
  label?: string;
  className?: string;
  gradient?: string;
}) {
  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      <div className="flex flex-col items-center text-white/50 gap-1 z-10 p-4">
        <span className="text-3xl">🙏</span>
        {label && (
          <p className="text-xs text-center opacity-70 line-clamp-2 max-w-[120px]">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Puja Card ─────────────────────────────────────────────────────────────────
function PujaCard({ puja }: { puja: (typeof POOJAS)[0] }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
      {/* Image Area */}
      <div className="relative h-52 overflow-hidden">
        <ImagePlaceholder
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
          label={puja.title}
        />
        {puja.tag && (
          <span
            className={`absolute top-3 left-3 ${puja.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}
          >
            {puja.tag}
          </span>
        )}
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {puja.deity}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 leading-snug">
          {puja.title}
        </h3>

        {/* Temple */}
        <div className="flex items-start gap-1.5 mb-1.5">
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

        {/* Date */}
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
          <p className="text-xs text-gray-500 font-medium">{puja.date}</p>
        </div>

        <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-1">
          {puja.description}
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {puja.benefits.slice(0, 2).map((b) => (
            <span
              key={b}
              className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full border border-orange-100"
            >
              ✓ {b}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div>
            <p className="text-xs text-gray-400 line-through">
              {puja.originalPrice}
            </p>
            <p className="text-xl font-extrabold text-orange-600">
              {puja.price}
            </p>
          </div>
          <Link
            href={`/poojas/${puja.id}`}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-orange-200"
          >
            PARTICIPATE
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
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page Banner ────────────────────────────────────────────────────────────────
function PageBanner() {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      <ImagePlaceholder
        className="absolute inset-0 w-full h-full"
        gradient="from-[#3d0a00] to-[#1a0500]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0500]/90 via-[#2d0a00]/70 to-transparent" />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Divine Blessings through Puja
            </span>
            <span className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Vedic Rituals by Expert Pandits
            </span>
            <span className="bg-white/10 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Video in 24–48 Hours
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Mandirlok Special Pujas
          </h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            Get authentic Vedic pujas performed at India's most powerful temples
            on your behalf. Receive blessings and puja video directly.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── How Puja Works Banner ──────────────────────────────────────────────────────
function HowItWorksBanner() {
  const steps = [
    {
      icon: "🛕",
      title: "Choose Puja",
      desc: "Select from 200+ authentic pujas across India's sacred temples",
    },
    {
      icon: "✍️",
      title: "Enter Your Name",
      desc: "Panditji will chant your name in the Sankalp during the puja",
    },
    {
      icon: "💳",
      title: "Secure Payment",
      desc: "Pay securely via UPI, card or net banking through Razorpay",
    },
    {
      icon: "📹",
      title: "Get Puja Video",
      desc: "Receive the video proof of your completed puja within 24–48 hrs",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl shrink-0">
                {s.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">
                  {s.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function PoojasPage() {
  const [activeFilter, setActiveFilter] = useState("All Pujas");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [search, setSearch] = useState("");

  const filtered = POOJAS.filter((p) => {
    const matchFilter =
      activeFilter === "All Pujas" || p.deity === activeFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.temple.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <PageBanner />
      <HowItWorksBanner />

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === f
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search pujas, temples, deities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="text-sm text-gray-400 ml-auto">
            {filtered.length} pujas found
          </span>
        </div>

        {/* Puja Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((puja) => (
              <PujaCard key={puja.id} puja={puja} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🙏</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No pujas found
            </h3>
            <p className="text-gray-500 mb-6">
              Try a different filter or search keyword
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All Pujas");
              }}
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* View More */}
        {filtered.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200">
              Load More Pujas
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
