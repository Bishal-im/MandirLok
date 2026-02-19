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
  Phone,
} from "lucide-react";

const pooja = {
  id: 101,
  name: "Rudrabhishek",
  temple: "Kashi Vishwanath Temple, Varanasi",
  emoji: "🪔",
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
    { id: 201, name: "Bel Patra Offering", emoji: "🌿" },
    { id: 202, name: "Dhatura", emoji: "🌸" },
    { id: 203, name: "Flower Garland", emoji: "💐" },
    { id: 204, name: "Prasad Thali", emoji: "🥮" },
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

  const toggleOffering = (id: number) => {
    setAddedOfferings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#fdf6ee]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#f0dcc8]">
          <div className="container-app py-3 flex items-center gap-2 text-xs text-[#6b5b45]">
            <Link href="/" className="hover:text-[#ff7f0a]">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/poojas" className="hover:text-[#ff7f0a]">
              Poojas
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#1a1209] font-medium">{pooja.name}</span>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT: Pooja Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Header Card */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-6 shadow-card">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-[#fff8f0] flex items-center justify-center text-4xl flex-shrink-0 shadow-sm">
                    {pooja.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
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
                          <p className="text-xs text-[#6b5b45]">
                            Sacred offering at the temple
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
                          {added ? "✓ Added" : "+ Add"}
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

            {/* RIGHT: Booking Panel */}
            <div className="space-y-4">
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card sticky top-24">
                <h3 className="font-display font-semibold text-[#1a1209] mb-4">
                  Book This Pooja
                </h3>

                {/* Devotees */}
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

                {/* Selected offerings summary */}
                {addedOfferings.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-[#f0dcc8]">
                    <p className="text-xs text-[#6b5b45] font-semibold mb-2">
                      Selected Offerings:
                    </p>
                    {addedOfferings.map((id) => {
                      const o = pooja.offerings.find((x) => x.id === id);
                      return o ? (
                        <div
                          key={id}
                          className="flex items-center gap-2 text-xs text-[#6b5b45] mb-1"
                        >
                          <span>{o.emoji}</span> {o.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Pricing note */}
                <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-xl p-3 mb-4">
                  <p className="text-xs text-[#6b5b45] font-semibold mb-1 flex items-center gap-1.5">
                    <Phone size={11} className="text-[#ff7f0a]" /> Pricing on
                    Request
                  </p>
                  <p className="text-xs text-[#6b5b45] leading-relaxed">
                    Price is determined by the pandit based on your
                    requirements. Contact us via WhatsApp to get a quote.
                  </p>
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

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl text-sm transition-all mb-3"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

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
