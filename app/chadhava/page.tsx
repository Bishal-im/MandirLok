"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, MapPin, ChevronRight, Filter, Sparkles, Heart } from "lucide-react";
import { getUserFavorites, toggleChadhavaFavorite } from "@/lib/actions/user";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Temple {
  _id: string;
  name: string;
  location: string;
  slug: string;
}

interface Chadhava {
  _id: string;
  name: string;
  category: string;
  emoji: string;
  image?: string;
  price: number;
  description: string;
  tag: string;
  tagColor: string;
  templeId: Temple;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", name: "All Offerings", icon: "✨" },
  { id: "Bhog", name: "Prasad & Bhog", icon: "🍬" },
  { id: "Vastra", name: "Shringar & Vastra", icon: "👘" },
  { id: "Deep Daan", name: "Deep & Oil", icon: "🪔" },
  { id: "Flowers", name: "Pushpa & Mala", icon: "🌸" },
  { id: "Seva", name: "Special Seva", icon: "🙏" },
];

// ── Chadhava Card ─────────────────────────────────────────────────────────────
function ChadhavaCard({ 
  item, 
  isFavorite, 
  onToggle 
}: { 
  item: Chadhava; 
  isFavorite: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-50 flex flex-col h-full relative cursor-pointer">
      {/* Link wrapper for most of the card */}
      <Link href={`/chadhava/${item._id}`} className="absolute inset-0 z-0" />
      
      {/* Image Area */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center z-10">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-700">
            {item.emoji || "🌸"}
          </span>
        )}
        
        {/* Floating Badges */}
        {item.tag && (
          <div className={`absolute top-4 left-4 ${item.tagColor || "bg-orange-500"} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm`}>
            {item.tag}
          </div>
        )}
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle(item._id);
          }}
          className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm z-20 ${
            isFavorite 
              ? "bg-rose-500 text-white" 
              : "bg-white/80 text-amber-600 hover:text-rose-500 hover:bg-white"
          }`}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center justify-center gap-2">
            View Details <ChevronRight size={12} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 space-y-3 z-10 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest">
           <span>{item.category || "General"}</span>
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors line-clamp-1 leading-tight">
          {item.name}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-400">
           <MapPin size={12} className="text-amber-400" />
           <span className="text-[11px] font-medium line-clamp-1">{item.templeId?.name}</span>
        </div>

        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        <div className="pt-4 flex items-center justify-between border-t border-amber-50 mt-auto">

          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-amber-50 animate-pulse">
      <div className="h-56 bg-gray-100" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-100 rounded w-1/4" />
        <div className="h-6 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-12 bg-gray-100 rounded w-full mt-4" />
      </div>
    </div>
  );
}

export default function ChadhavaPage() {
  const [items, setItems] = useState<Chadhava[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchFavorites() {
      const res = await getUserFavorites();
      if (res.success && res.data) {
        setFavorites(res.data);
      }
    }
    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (activeCategory !== "all") params.set("category", activeCategory);

        const res = await fetch(`/api/chadhava?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setItems(data.data);
        } else {
          setError("Failed to load chadhava offerings.");
        }
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchItems, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  const handleToggleFavorite = async (id: string) => {
    const res = await toggleChadhavaFavorite(id);
    if (res.success) {
      setFavorites(prev => 
        res.isAdded ? [...prev, id] : prev.filter(fid => fid !== id)
      );
    } else {
      alert(res.message || "Failed to toggle favorite");
    }
  };

  // Sort items: favorites first
  const sortedItems = [...items].sort((a, b) => {
    const aFav = favorites.includes(a._id);
    const bFav = favorites.includes(b._id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fdfaf5] font-sans pt-20">
        {/* Modern Header */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-200/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/20 blur-[120px] rounded-full"></div>
          </div>
          
          <div className="container-app relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-[10px] font-bold tracking-[0.2em] uppercase">
              <Sparkles size={12} /> Sacred Offerings Seva
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Express Your <span className="text-amber-600">Devotion</span><br />
              Through Chadhava
            </h1>
            <p className="max-w-xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
              Make authentic offerings at 500+ sacred temples across India. 
              Receive personalized sankalp benefits and video proof of your devotion.
            </p>
          </div>
        </section>

        {/* Dynamic Filters & Search */}
        <div className="sticky top-20 z-40 bg-[#fdfaf5]/80 backdrop-blur-xl border-y border-amber-50 py-6">
          <div className="container-app space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                        : "bg-white text-gray-600 hover:bg-amber-50 border border-amber-100 shadow-sm"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search offerings or temples..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-amber-100 rounded-[1.25rem] text-xs focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container-app py-12">
          {/* Results Summary */}
          {!loading && !error && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Filter size={14} />
                <span>Showing <span className="text-gray-900 font-bold">{items.length}</span> results</span>
              </div>
            </div>
          )}

          {/* Grid */}
          {error ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-amber-100 shadow-sm">
              <div className="text-5xl mb-4">🪔</div>
              <p className="text-red-500 text-sm mb-6 font-medium">{error}</p>
              <button onClick={() => setSearch("")} className="btn-primary">Try Again</button>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedItems.map((item) => (
                <ChadhavaCard 
                  key={item._id} 
                  item={item} 
                  isFavorite={favorites.includes(item._id)}
                  onToggle={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-amber-100 shadow-sm">
              <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-amber-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No offerings found</h3>
              <p className="text-gray-500 text-xs mb-8">Try adjusting your filters or search terms.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="btn-primary">Clear all filters</button>
            </div>
          )}
        </div>
        
        {/* Support Section */}
        <section className="container-app py-12 pb-20">
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
             <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-4xl font-black">Need a Special Seva?</h2>
                <p className="max-w-lg mx-auto text-white/80 text-sm leading-relaxed">
                  If you wish to perform a specific ritual or offering not listed here, our team can arrange it personally for you.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a href="https://wa.me/yournumber" className="bg-white text-amber-700 font-bold px-8 py-3 rounded-2xl hover:bg-amber-50 transition-colors shadow-lg">WhatsApp Us</a>
                  <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-3 rounded-2xl hover:bg-white/20 transition-colors">Contact Support</Link>
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
