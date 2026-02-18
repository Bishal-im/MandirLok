"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ChevronRight,
  Star,
  Clock,
  Calendar,
  Plus,
  Minus,
  Shield,
} from "lucide-react";

const pooja = {
  id: 101,
  name: "Rudrabhishek",
  temple: "Kashi Vishwanath Temple, Varanasi",
  emoji: "🪔",
  price: 1100,
  originalPrice: 1500,
  duration: "45 minutes",
  rating: 4.9,
  reviews: 3240,
  pandit: "Pandit Ramesh Sharma (15 yrs exp.)",
  description:
    "Rudrabhishek is one of the most powerful rituals dedicated to Lord Shiva. The sacred ritual involves bathing the Shivling with milk, honey, curd, and panchamrit while chanting Shiva mantras. It removes negative energies, brings health, and invites prosperity into your life.",
  benefits: [
    "Removes negative energies",
    "Blesses with good health",
    "Brings peace & prosperity",
    "Protection from evil eye",
    "Fulfillment of wishes",
  ],
  includes: [
    "Personalized sankalp in your name",
    "HD video delivered on WhatsApp",
    "Prasad offered to deity",
    "Pandit's personal blessings",
  ],
  offerings: [
    { id: 201, name: "Bel Patra Offering", price: 51, emoji: "🌿" },
    { id: 202, name: "Dhatura", price: 51, emoji: "🌸" },
    { id: 203, name: "Flower Garland", price: 151, emoji: "💐" },
    { id: 204, name: "Prasad Thali", price: 251, emoji: "🥮" },
  ],
};

const dates = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return {
    date: d.getDate(),
    day: d.toLocaleDateString("en-IN", { weekday: "short" }),
    full: d.toLocaleDateString("en-IN"),
    slots: i === 2 ? 2 : i === 5 ? 1 : Math.floor(Math.random() * 5) + 3,
  };
});

export default function PoojaDetailPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [addedOfferings, setAddedOfferings] = useState<number[]>([]);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState<"details" | "sankalp">("details");

  const toggleOffering = (id: number) => {
    setAddedOfferings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const offeringsTotal = addedOfferings.reduce((sum, id) => {
    const o = pooja.offerings.find((o) => o.id === id);
    return sum + (o?.price ?? 0);
  }, 0);
  const total = (pooja.price + offeringsTotal) * qty;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#fdf6ee]">
        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-[#f0dcc8]">
          <div className="container-app py-3 flex items-center gap-2 text-xs text-[#6b5b45]">
            <Link href="/" className="hover:text-[#ff7f0a]">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/temples" className="hover:text-[#ff7f0a]">
              Temples
            </Link>
            <ChevronRight size={12} />
            <Link href="/temples/1" className="hover:text-[#ff7f0a]">
              Kashi Vishwanath
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#1a1209] font-medium">{pooja.name}</span>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ── LEFT: Pooja Info ── */}
            <div className="lg:col-span-2 space-y-5">
              {/* Header Card */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-6 shadow-card">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#fff8f0] flex items-center justify-center text-4xl flex-shrink-0 shadow-sm">
                    {pooja.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="badge-saffron text-xs mb-2 inline-block">
                          Best Seller
                        </span>
                        <h1 className="heading-md text-[#1a1209]">
                          {pooja.name}
                        </h1>
                        <p className="text-sm text-[#ff7f0a] mt-0.5">
                          🛕 {pooja.temple}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-bold text-[#ff7f0a]">
                          ₹{pooja.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#b89b7a] line-through">
                          ₹{pooja.originalPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-green-600 font-medium mt-0.5">
                          Save ₹
                          {(pooja.originalPrice - pooja.price).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#6b5b45]">
                      <span className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="text-[#f0bc00] fill-[#f0bc00]"
                        />
                        <strong className="text-[#1a1209]">
                          {pooja.rating}
                        </strong>{" "}
                        ({(pooja.reviews / 1000).toFixed(1)}k reviews)
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#ff7f0a]" />{" "}
                        {pooja.duration}
                      </span>
                      <span>🧘 {pooja.pandit}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#f0dcc8]">
                  <p className="text-sm text-[#6b5b45] leading-relaxed">
                    {pooja.description}
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-semibold text-[#1a1209] mb-3">
                  Benefits of This Pooja
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pooja.benefits.map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-2 text-sm text-[#6b5b45]"
                    >
                      <span className="text-[#ff7f0a] text-base">✦</span> {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-semibold text-[#1a1209] mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-[#ff7f0a]" /> Choose Pooja
                  Date
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(i)}
                      className={`flex flex-col items-center py-3 px-2 rounded-xl border transition-all text-xs ${
                        selectedDate === i
                          ? "border-[#ff7f0a] bg-[#fff8f0] text-[#ff7f0a]"
                          : "border-[#f0dcc8] text-[#6b5b45] hover:border-[#ffbd6e]"
                      }`}
                    >
                      <span className="font-semibold mb-0.5">{d.day}</span>
                      <span className="text-lg font-bold">{d.date}</span>
                      <span
                        className={`text-[10px] ${d.slots <= 2 ? "text-red-500 font-medium" : "text-[#6b5b45]"}`}
                      >
                        {d.slots} slots
                      </span>
                    </button>
                  ))}
                </div>
                {selectedDate !== null && (
                  <p className="mt-3 text-xs text-green-600 flex items-center gap-1">
                    ✅ Date selected: {dates[selectedDate].full}
                  </p>
                )}
              </div>

              {/* Chadhava Add-ons */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card">
                <h3 className="font-display font-semibold text-[#1a1209] mb-1">
                  Choose Your Offerings
                </h3>
                <p className="text-xs text-[#6b5b45] mb-4">
                  Add chadhava items to enhance your pooja
                </p>
                <div className="space-y-3">
                  {pooja.offerings.map((item) => {
                    const added = addedOfferings.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                          added
                            ? "border-[#ff7f0a] bg-[#fff8f0]"
                            : "border-[#f0dcc8] hover:border-[#ffbd6e]"
                        }`}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1a1209]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#ff7f0a] font-bold">
                            ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleOffering(item.id)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            added
                              ? "bg-[#ff7f0a] text-white"
                              : "border border-[#ff7f0a] text-[#ff7f0a] hover:bg-[#fff8f0]"
                          }`}
                        >
                          {added ? "✓ Added" : "+ Add to Cart"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-2xl p-5">
                <h3 className="font-display font-semibold text-[#1a1209] mb-3">
                  What's Included
                </h3>
                {pooja.includes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#6b5b45] py-1.5 border-b border-[#f0dcc8] last:border-0"
                  >
                    <span className="text-[#ff7f0a]">✅</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Booking Panel ── */}
            <div className="space-y-4">
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card sticky top-24">
                <h3 className="font-display font-semibold text-[#1a1209] mb-4">
                  Booking Summary
                </h3>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#f0dcc8]">
                  <span className="text-sm text-[#6b5b45]">
                    Devotees / Family Members
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full border border-[#f0dcc8] flex items-center justify-center hover:border-[#ff7f0a] text-[#6b5b45] hover:text-[#ff7f0a]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold text-[#1a1209] w-4 text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                      className="w-8 h-8 rounded-full border border-[#f0dcc8] flex items-center justify-center hover:border-[#ff7f0a] text-[#6b5b45] hover:text-[#ff7f0a]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-[#6b5b45]">
                    <span>
                      {pooja.name} × {qty}
                    </span>
                    <span>₹{(pooja.price * qty).toLocaleString()}</span>
                  </div>
                  {addedOfferings.length > 0 && (
                    <div className="flex justify-between text-[#6b5b45]">
                      <span>Offerings ({addedOfferings.length})</span>
                      <span>₹{offeringsTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[#1a1209] pt-2 border-t border-[#f0dcc8] text-base">
                    <span>Total</span>
                    <span className="text-[#ff7f0a]">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Date indicator */}
                {selectedDate !== null ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-xs text-green-700 text-center">
                    📅 Pooja on: <strong>{dates[selectedDate].full}</strong>
                  </div>
                ) : (
                  <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-xl p-3 mb-4 text-xs text-[#ff7f0a] text-center">
                    ⬆️ Please select a date above
                  </div>
                )}

                <Link
                  href={selectedDate !== null ? "/cart" : "#"}
                  className={`btn-saffron w-full text-center text-sm block mb-3 ${selectedDate === null ? "opacity-60 pointer-events-none" : ""}`}
                >
                  Proceed to Book →
                </Link>

                <p className="text-center text-xs text-[#6b5b45] flex items-center justify-center gap-1">
                  <Shield size={12} className="text-green-500" />
                  Secured by Razorpay · 100% Safe
                </p>

                <div className="mt-4 pt-4 border-t border-[#f0dcc8] text-xs text-[#6b5b45] space-y-1.5">
                  <p>📹 Pooja video on WhatsApp</p>
                  <p>🧘 Experienced verified pandit</p>
                  <p>↩️ Full refund if cancelled 24hrs before</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
