"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PoojaCard from "@/components/pooja/PoojaCard";
import { ALL_POOJAS, POOJA_CATEGORIES } from "@/components/pooja/PoojaData";
import { Search, SlidersHorizontal, X, Clock, IndianRupee } from "lucide-react";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹5,000", min: 2000, max: 5000 },
  { label: "Above ₹5,000", min: 5000, max: Infinity },
];

const DURATION_FILTERS = [
  "All Durations",
  "Under 1 hr",
  "1–2 hrs",
  "2–4 hrs",
  "4+ hrs",
];

const SORT_OPTIONS = [
  "Most Popular",
  "Lowest Price",
  "Highest Rated",
  "Shortest Duration",
];

export default function PoojasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("Most Popular");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = [...ALL_POOJAS];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.temple.toLowerCase().includes(q) ||
          p.benefit.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    const pr = PRICE_RANGES[priceRange];
    list = list.filter((p) => p.price >= pr.min && p.price <= pr.max);

    if (sort === "Lowest Price") list.sort((a, b) => a.price - b.price);
    if (sort === "Highest Rated") list.sort((a, b) => b.rating - a.rating);
    if (sort === "Most Popular") list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [search, category, priceRange, sort]);

  const hasFilters =
    search || category !== "All" || priceRange !== 0 || sort !== "Most Popular";

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fdf6ee]">
        {/* ── Hero Banner ── */}
        <div className="bg-gradient-to-br from-[#8b0000] via-[#6b0000] to-[#1a0a00] py-14 px-4 relative overflow-hidden">
          {/* decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 text-9xl rotate-12">🪔</div>
            <div className="absolute bottom-4 left-8 text-8xl -rotate-12">
              🛕
            </div>
          </div>

          <div className="container-app relative z-10 text-center text-white">
            <p className="text-[#ffd9a8] text-sm mb-2 font-medium tracking-widest uppercase">
              🙏 Sacred Rituals
            </p>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight">
              Book Online Poojas &amp; Rituals
            </h1>
            <p className="text-[#ffd9a8] max-w-xl mx-auto mb-6 text-sm md:text-base">
              Authentic Vedic rituals performed by qualified pandits at sacred
              temples. Receive HD video on WhatsApp.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-3 flex gap-3">
              <div className="flex-1 flex items-center gap-2 px-2">
                <Search size={16} className="text-[#ffd9a8] flex-shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search poojas, benefits, temples…"
                  className="flex-1 bg-transparent text-white placeholder-[#ffd9a8]/70 outline-none text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-[#ffd9a8] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button className="bg-[#ff7f0a] hover:bg-[#ff9b30] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="bg-white border-b border-[#f0dcc8]">
          <div className="container-app py-3 flex flex-wrap gap-6 justify-center md:justify-start text-xs text-[#6b5b45]">
            {[
              { icon: "🪔", text: `${ALL_POOJAS.length}+ Poojas` },
              { icon: "🛕", text: "200+ Temples" },
              { icon: "🧘", text: "500+ Verified Pandits" },
              { icon: "📹", text: "Video on WhatsApp" },
              { icon: "🔒", text: "Secure Payment" },
            ].map((s) => (
              <span key={s.text} className="flex items-center gap-1.5">
                <span>{s.icon}</span> {s.text}
              </span>
            ))}
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* ── SIDEBAR Filters ── */}
            <aside className="hidden lg:block space-y-5">
              {/* Category */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-4">
                <h4 className="font-display font-semibold text-[#1a1209] mb-3 text-sm">
                  Pooja Category
                </h4>
                <div className="space-y-1">
                  {POOJA_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                        category === cat
                          ? "bg-[#fff8f0] text-[#ff7f0a] font-semibold border border-[#ffd9a8]"
                          : "text-[#6b5b45] hover:bg-[#fdf6ee] hover:text-[#ff7f0a]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-4">
                <h4 className="font-display font-semibold text-[#1a1209] mb-3 text-sm flex items-center gap-1.5">
                  <IndianRupee size={14} className="text-[#ff7f0a]" /> Price
                  Range
                </h4>
                <div className="space-y-1">
                  {PRICE_RANGES.map((pr, i) => (
                    <button
                      key={pr.label}
                      onClick={() => setPriceRange(i)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${
                        priceRange === i
                          ? "bg-[#fff8f0] text-[#ff7f0a] font-semibold border border-[#ffd9a8]"
                          : "text-[#6b5b45] hover:bg-[#fdf6ee]"
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-4">
                <h4 className="font-display font-semibold text-[#1a1209] mb-3 text-sm flex items-center gap-1.5">
                  <Clock size={14} className="text-[#ff7f0a]" /> Duration
                </h4>
                <div className="space-y-1">
                  {DURATION_FILTERS.map((d) => (
                    <button
                      key={d}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-[#6b5b45] hover:bg-[#fdf6ee] hover:text-[#ff7f0a] transition-all"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setPriceRange(0);
                    setSort("Most Popular");
                  }}
                  className="w-full text-center text-xs text-[#ff7f0a] border border-[#ffd9a8] rounded-xl py-2 hover:bg-[#fff8f0] transition-colors"
                >
                  ✕ Clear All Filters
                </button>
              )}
            </aside>

            {/* ── MAIN Content ── */}
            <div className="lg:col-span-3 space-y-5">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[#6b5b45]">
                  <strong className="text-[#1a1209]">{filtered.length}</strong>{" "}
                  poojas found
                  {category !== "All" && (
                    <span className="text-[#ff7f0a]"> in {category}</span>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-[#f0dcc8] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[#ff7f0a] text-[#6b5b45]"
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <div className="flex border border-[#f0dcc8] rounded-xl overflow-hidden">
                    {(["grid", "list"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setViewMode(v)}
                        className={`px-3 py-2 text-sm transition-colors ${viewMode === v ? "bg-[#ff7f0a] text-white" : "text-[#6b5b45] hover:bg-[#fdf6ee]"}`}
                      >
                        {v === "grid" ? "⊞" : "≡"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden scrollbar-hide">
                {POOJA_CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
                      category === cat
                        ? "bg-[#ff7f0a] text-white border-[#ff7f0a]"
                        : "bg-white text-[#6b5b45] border-[#f0dcc8] hover:border-[#ffbd6e]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🙏</div>
                  <h3 className="font-display font-semibold text-[#1a1209] text-xl mb-2">
                    No poojas found
                  </h3>
                  <p className="text-[#6b5b45] text-sm mb-4">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setPriceRange(0);
                    }}
                    className="btn-outline-saffron text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map((pooja) => (
                    <PoojaCard key={pooja.id} pooja={pooja} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((pooja) => (
                    <PoojaCard
                      key={pooja.id}
                      pooja={pooja}
                      variant="horizontal"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
