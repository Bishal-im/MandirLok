"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TempleCard, { type Temple } from "@/components/temple/TempleCard";
import TempleFilters, {
  type FilterState,
} from "@/components/temple/TempleFilters";
import TempleImage from "@/components/ui/TempleImage";

const TEMPLES: Temple[] = [
  {
    id: 1,
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    location: "Varanasi, UP",
    state: "Uttar Pradesh",
    imageKey: "kashi-vishwanath",
    rating: 4.9,
    reviews: 12400,
    poojaCount: 24,
    badge: "Most Popular",
    badgeVariant: "maroon",
    deity: "Shiva",
    startingPrice: 301,
  },
  {
    id: 2,
    slug: "tirupati-balaji",
    name: "Tirupati Balaji",
    location: "Tirupati, AP",
    state: "Andhra Pradesh",
    imageKey: "tirupati-balaji",
    rating: 4.9,
    reviews: 23100,
    poojaCount: 18,
    badge: "Top Rated",
    badgeVariant: "saffron",
    deity: "Vishnu",
    startingPrice: 501,
  },
  {
    id: 3,
    slug: "siddhivinayak",
    name: "Siddhivinayak",
    location: "Mumbai, MH",
    state: "Maharashtra",
    imageKey: "siddhivinayak",
    rating: 4.8,
    reviews: 9870,
    poojaCount: 15,
    badge: "Trending",
    badgeVariant: "gold",
    deity: "Ganesh",
    startingPrice: 251,
  },
  {
    id: 4,
    slug: "vaishno-devi",
    name: "Vaishno Devi",
    location: "Katra, J&K",
    state: "J&K",
    imageKey: "vaishno-devi",
    rating: 4.9,
    reviews: 18200,
    poojaCount: 12,
    badge: "Sacred",
    badgeVariant: "maroon",
    deity: "Devi",
    startingPrice: 501,
  },
  {
    id: 5,
    slug: "somnath",
    name: "Somnath Temple",
    location: "Somnath, Gujarat",
    state: "Gujarat",
    imageKey: "somnath",
    rating: 4.8,
    reviews: 7600,
    poojaCount: 20,
    badge: "Heritage",
    badgeVariant: "gold",
    deity: "Shiva",
    startingPrice: 251,
  },
  {
    id: 6,
    slug: "shirdi-sai",
    name: "Shirdi Sai Baba",
    location: "Shirdi, Maharashtra",
    state: "Maharashtra",
    imageKey: "shirdi-sai",
    rating: 4.9,
    reviews: 15000,
    poojaCount: 14,
    badge: "Faith",
    badgeVariant: "saffron",
    deity: "Sai Baba",
    startingPrice: 201,
  },
  {
    id: 7,
    slug: "dwarka",
    name: "Dwarkadhish Temple",
    location: "Dwarka, Gujarat",
    state: "Gujarat",
    imageKey: "dwarka",
    rating: 4.7,
    reviews: 5400,
    poojaCount: 16,
    badge: "Pilgrimage",
    badgeVariant: "gold",
    deity: "Vishnu",
    startingPrice: 401,
  },
  {
    id: 8,
    slug: "mahakaleshwar",
    name: "Mahakaleshwar",
    location: "Ujjain, MP",
    state: "Madhya Pradesh",
    imageKey: "mahakaleshwar",
    rating: 4.8,
    reviews: 8900,
    poojaCount: 22,
    badge: "Jyotirlinga",
    badgeVariant: "maroon",
    deity: "Shiva",
    startingPrice: 501,
  },
  {
    id: 9,
    slug: "badrinath",
    name: "Badrinath Temple",
    location: "Badrinath, Uttarakhand",
    state: "Uttarakhand",
    imageKey: "badrinath",
    rating: 4.9,
    reviews: 11200,
    poojaCount: 10,
    badge: "Himalayan",
    badgeVariant: "saffron",
    deity: "Vishnu",
    startingPrice: 601,
  },
  {
    id: 10,
    slug: "meenakshi",
    name: "Meenakshi Amman",
    location: "Madurai, Tamil Nadu",
    state: "Tamil Nadu",
    imageKey: "meenakshi",
    rating: 4.8,
    reviews: 9300,
    poojaCount: 18,
    badge: "Dravidian",
    badgeVariant: "gold",
    deity: "Devi",
    startingPrice: 351,
  },
  {
    id: 11,
    slug: "kedarnath",
    name: "Kedarnath Temple",
    location: "Kedarnath, Uttarakhand",
    state: "Uttarakhand",
    imageKey: "kedarnath",
    rating: 4.9,
    reviews: 16700,
    poojaCount: 12,
    badge: "Sacred",
    badgeVariant: "maroon",
    deity: "Shiva",
    startingPrice: 701,
  },
  {
    id: 12,
    slug: "golden-temple",
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    state: "Punjab",
    imageKey: "golden-temple",
    rating: 4.9,
    reviews: 22000,
    poojaCount: 8,
    badge: "Iconic",
    badgeVariant: "gold",
    deity: "Waheguru",
    startingPrice: 151,
  },
];

const INITIAL_FILTERS: FilterState = {
  search: "",
  state: "All States",
  deity: "All Deities",
  sortBy: "Most Popular",
};

export default function TemplesPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = [...TEMPLES];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.deity.toLowerCase().includes(q),
      );
    }
    if (filters.state !== "All States")
      list = list.filter((t) => t.state === filters.state);
    if (filters.deity !== "All Deities")
      list = list.filter((t) => t.deity === filters.deity);
    if (filters.sortBy === "Highest Rated")
      list.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === "Most Poojas")
      list.sort((a, b) => b.poojaCount - a.poojaCount);
    if (filters.sortBy === "Price: Low to High")
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    return list;
  }, [filters]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fdf6ee]">
        {/* ── Hero with real photo mosaic ── */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 gap-0.5">
            {[
              "kashi-vishwanath",
              "tirupati-balaji",
              "siddhivinayak",
              "vaishno-devi",
            ].map((key) => (
              <div key={key} className="relative overflow-hidden">
                <TempleImage
                  templeKey={key}
                  className="w-full h-full"
                  showOverlay
                  overlayOpacity={0.4}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a00]/60 via-[#8b0000]/30 to-[#1a0a00]/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
            <span className="bg-white/10 border border-white/20 text-[#ffd9a8] text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              🛕 {TEMPLES.length}+ Sacred Temples
            </span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-3 leading-tight">
              Explore Temples Across India
            </h1>
            <p className="text-[#ffd9a8] max-w-lg text-sm md:text-base">
              Book pooja at India's most revered temples. Receive blessings on
              WhatsApp.
            </p>
          </div>
        </div>

        <div className="container-app py-8 space-y-6">
          {/* Filters */}
          <TempleFilters
            filters={filters}
            onChange={setFilters}
            totalResults={filtered.length}
          />

          {/* View toggle */}
          <div className="flex justify-end">
            <div className="flex border border-[#f0dcc8] rounded-xl overflow-hidden bg-white">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v)}
                  className={`px-4 py-2 text-sm transition-colors ${viewMode === v ? "bg-[#ff7f0a] text-white" : "text-[#6b5b45] hover:bg-[#fdf6ee]"}`}
                >
                  {v === "grid" ? "⊞ Grid" : "≡ List"}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🛕</div>
              <h3 className="font-display font-semibold text-[#1a1209] text-xl mb-2">
                No temples found
              </h3>
              <p className="text-sm text-[#6b5b45] mb-4">
                Try adjusting your search or clearing filters
              </p>
              <button
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="btn-outline-saffron text-sm"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((t) => (
                <TempleCard key={t.id} temple={t} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((t) => (
                <TempleCard key={t.id} temple={t} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
