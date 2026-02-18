"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TempleImage from "@/components/ui/TempleImage";
import { ShoppingCart, Plus, Check, Info, X } from "lucide-react";

interface ChadhavaItem {
  id: number;
  name: string;
  hindiName: string;
  price: number;
  emoji: string;
  description: string;
  significance: string;
  temples: string[];
  category: string;
  popular?: boolean;
  image?: string;
}

const CHADHAVA_ITEMS: ChadhavaItem[] = [
  // Flowers & Garlands
  {
    id: 1,
    name: "Marigold Garland",
    hindiName: "गेंदे की माला",
    price: 151,
    emoji: "🌼",
    category: "Flowers & Garlands",
    description:
      "Fresh, fragrant marigold garland offered to the deity with devotion and prayers.",
    significance:
      "Marigolds are considered auspicious in Hinduism and are the favorite of Lord Ganesha and Durga Maa.",
    temples: ["Kashi Vishwanath", "Siddhivinayak", "All Temples"],
    popular: true,
  },
  {
    id: 2,
    name: "Rose Flower Offering",
    hindiName: "गुलाब फूल",
    price: 101,
    emoji: "🌹",
    category: "Flowers & Garlands",
    description:
      "Fresh red roses offered as a symbol of devotion and love for the divine.",
    significance:
      "Roses symbolize divine love and purity. They are especially dear to Goddess Lakshmi.",
    temples: ["Siddhivinayak", "Tirupati Balaji"],
  },
  {
    id: 3,
    name: "Lotus Flower",
    hindiName: "कमल का फूल",
    price: 201,
    emoji: "🪷",
    category: "Flowers & Garlands",
    description:
      "Sacred white lotus offered representing spiritual awakening and divine beauty.",
    significance:
      "The lotus is the most sacred flower in Hinduism, associated with Lakshmi, Saraswati & Brahma.",
    temples: ["Tirupati Balaji", "Vaishno Devi"],
    popular: true,
  },
  {
    id: 4,
    name: "Bel Patra",
    hindiName: "बेल पत्र",
    price: 51,
    emoji: "🌿",
    category: "Sacred Leaves",
    description:
      "Three-leaved bel patra (wood apple leaves) — most sacred offering to Lord Shiva.",
    significance:
      "Bel patra is the most beloved offering to Shiva. Even a single bel patra pleases Shivji more than a thousand flowers.",
    temples: ["Kashi Vishwanath", "Mahakaleshwar", "Somnath"],
    popular: true,
  },
  {
    id: 5,
    name: "Tulsi Leaves",
    hindiName: "तुलसी पत्र",
    price: 51,
    emoji: "🌱",
    category: "Sacred Leaves",
    description:
      "Sacred tulsi (holy basil) leaves, considered extremely pure and holy.",
    significance:
      "Tulsi is the most sacred plant in Vaishnavism. It is especially dear to Lord Vishnu and Krishna.",
    temples: ["Tirupati Balaji", "Siddhivinayak"],
  },
  // Prasad & Food
  {
    id: 6,
    name: "Panchamrit",
    hindiName: "पंचामृत",
    price: 251,
    emoji: "🥛",
    category: "Prasad & Food",
    description:
      "Sacred mixture of milk, curd, honey, ghee and sugar used for abhishek.",
    significance:
      "Panchamrit is used to bathe the deity during abhishek. Each ingredient represents a divine quality.",
    temples: ["Kashi Vishwanath", "All Shiva Temples"],
    popular: true,
  },
  {
    id: 7,
    name: "Modak Offering",
    hindiName: "मोदक",
    price: 251,
    emoji: "🥮",
    category: "Prasad & Food",
    description:
      "21 pieces of pure ghee modak — Lord Ganesha's favorite sweet.",
    significance:
      "Modak is the most beloved sweet of Lord Ganesha. Offering 21 modaks is considered extremely auspicious.",
    temples: ["Siddhivinayak"],
    popular: true,
  },
  {
    id: 8,
    name: "Mishri & Makhana",
    hindiName: "मिश्री और मखाना",
    price: 151,
    emoji: "🍬",
    category: "Prasad & Food",
    description:
      "Pure crystallized sugar (mishri) and lotus seeds (makhana) offered as prasad.",
    significance:
      "Mishri represents the sweetness of devotion. Makhana is especially dear to Lord Vishnu.",
    temples: ["Tirupati Balaji", "All Vishnu Temples"],
  },
  {
    id: 9,
    name: "Prasad Thali",
    hindiName: "प्रसाद थाली",
    price: 351,
    emoji: "🍱",
    category: "Prasad & Food",
    description:
      "A complete prasad thali with seasonal fruits, sweets, and panchamrit.",
    significance:
      "A complete offering that includes all five elements, ensuring holistic divine blessings.",
    temples: ["All Temples"],
    popular: true,
  },
  // Ritual Items
  {
    id: 10,
    name: "Coconut Offering",
    hindiName: "नारियल",
    price: 101,
    emoji: "🥥",
    category: "Ritual Items",
    description:
      "Whole coconut broken as offering — symbolizing the ego surrendered to the divine.",
    significance:
      "Breaking a coconut symbolizes the breaking of the ego (husk) to reveal the pure soul (white inside).",
    temples: ["All Temples"],
    popular: true,
  },
  {
    id: 11,
    name: "Pure Ghee Diya",
    hindiName: "शुद्ध घी का दीपक",
    price: 251,
    emoji: "🪔",
    category: "Ritual Items",
    description:
      "Clay diya lit with pure cow ghee in your name before the deity.",
    significance:
      "A lit diya represents knowledge, light and dispelling of darkness and ignorance.",
    temples: ["All Temples"],
    popular: true,
  },
  {
    id: 12,
    name: "Dhatura",
    hindiName: "धतूरा",
    price: 51,
    emoji: "🌸",
    category: "Ritual Items",
    description: "Sacred dhatura flowers — exclusively offered to Lord Shiva.",
    significance:
      "Dhatura is one of the few flowers that Lord Shiva is particularly fond of.",
    temples: ["Kashi Vishwanath", "Mahakaleshwar", "Somnath"],
  },
  {
    id: 13,
    name: "Sindoor & Shringar",
    hindiName: "सिंदूर और श्रृंगार",
    price: 501,
    emoji: "🔴",
    category: "Ritual Items",
    description:
      "Sacred adornment (shringar) for the deity including sindoor, bangles and flowers.",
    significance:
      "Shringar represents our offering of beauty and love to the divine feminine.",
    temples: ["Vaishno Devi", "Siddhivinayak"],
  },
  // Special
  {
    id: 14,
    name: "Gold Foil Chadar",
    hindiName: "सोने का वर्क",
    price: 2100,
    emoji: "✨",
    category: "Special Offerings",
    description:
      "Gold-foil embossed chadar draped over the deity with full ceremony.",
    significance:
      "Offering a chadar is one of the highest forms of offering, symbolizing royal submission to the divine.",
    temples: ["Vaishno Devi", "Shirdi Sai Baba"],
    popular: true,
  },
  {
    id: 15,
    name: "Silver Abhishek Jal",
    hindiName: "चांदी का अभिषेक जल",
    price: 1100,
    emoji: "💧",
    category: "Special Offerings",
    description:
      "Holy water from Ganga stored in a silver vessel, poured over the Shivling.",
    significance:
      "Ganga jal is the purest water in the universe. Abhishek with Ganga jal is extremely meritorious.",
    temples: ["Kashi Vishwanath"],
  },
  {
    id: 16,
    name: "Navratna Shringar",
    hindiName: "नवरत्न श्रृंगार",
    price: 5100,
    emoji: "💎",
    category: "Special Offerings",
    description:
      "Precious nine-gemstone adornment (replica) offered to the deity on special occasions.",
    significance:
      "Navratna represents nine planets. Offering this ensures planetary blessings across all spheres of life.",
    temples: ["Tirupati Balaji", "Vaishno Devi"],
  },
];

const CATEGORIES = [
  "All",
  "Flowers & Garlands",
  "Sacred Leaves",
  "Prasad & Food",
  "Ritual Items",
  "Special Offerings",
];

const TEMPLE_LIST = [
  {
    key: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    location: "Varanasi, UP",
  },
  { key: "tirupati-balaji", name: "Tirupati Balaji", location: "Tirupati, AP" },
  { key: "siddhivinayak", name: "Siddhivinayak", location: "Mumbai, MH" },
  { key: "vaishno-devi", name: "Vaishno Devi", location: "Katra, J&K" },
  { key: "somnath", name: "Somnath", location: "Gujarat" },
  { key: "shirdi-sai", name: "Shirdi Sai Baba", location: "Shirdi, MH" },
];

export default function ChadhavaPage() {
  const [category, setCategory] = useState("All");
  const [selectedTemple, setSelectedTemple] = useState("All");
  const [cart, setCart] = useState<number[]>([]);
  const [infoItem, setInfoItem] = useState<ChadhavaItem | null>(null);

  const toggleCart = (id: number) =>
    setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const filtered = CHADHAVA_ITEMS.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (
      selectedTemple !== "All" &&
      !item.temples.some(
        (t) =>
          t.toLowerCase().includes(selectedTemple.toLowerCase()) ||
          t === "All Temples",
      )
    )
      return false;
    return true;
  });

  const cartTotal = cart.reduce((sum, id) => {
    const item = CHADHAVA_ITEMS.find((i) => i.id === id);
    return sum + (item?.price ?? 0);
  }, 0);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fdf6ee]">
        {/* ── Hero ── */}
        <div className="relative bg-gradient-to-br from-[#1a0a00] via-[#3d1500] to-[#8b0000] py-14 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-[200px] flex items-center justify-end pr-8 select-none">
            🙏
          </div>
          <div className="container-app relative z-10 text-center text-white">
            <span className="inline-block bg-white/10 border border-white/20 text-[#ffd9a8] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              🌸 Sacred Temple Offerings
            </span>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-3 leading-tight">
              Chadhava &amp; Temple Offerings
            </h1>
            <p className="text-[#ffd9a8] max-w-xl mx-auto text-sm md:text-base mb-6">
              Make authentic sacred offerings at India's most revered temples.
              Our pandits present each chadhava with proper Vedic rituals and
              devotion.
            </p>

            {/* ── Trust Row ── */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {[
                "🌿 Fresh daily offerings",
                "📹 Photo/video proof",
                "🧘 Performed by pandits",
                "📦 Prasad delivery available",
              ].map((t) => (
                <span
                  key={t}
                  className="bg-white/10 backdrop-blur border border-white/20 text-[#ffd9a8] px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Temple Selector ── */}
        <div className="bg-white border-b border-[#f0dcc8] py-4 sticky top-16 z-30">
          <div className="container-app">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-xs font-semibold text-[#6b5b45] whitespace-nowrap flex-shrink-0">
                Select Temple:
              </span>
              <button
                onClick={() => setSelectedTemple("All")}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
                  selectedTemple === "All"
                    ? "bg-[#ff7f0a] text-white border-[#ff7f0a]"
                    : "bg-white text-[#6b5b45] border-[#f0dcc8] hover:border-[#ffbd6e]"
                }`}
              >
                All Temples
              </button>
              {TEMPLE_LIST.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedTemple(t.name)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all flex-shrink-0 ${
                    selectedTemple === t.name
                      ? "bg-[#ff7f0a] text-white border-[#ff7f0a]"
                      : "bg-white text-[#6b5b45] border-[#f0dcc8] hover:border-[#ffbd6e]"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container-app py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ── LEFT: Offerings ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      category === cat
                        ? "bg-[#ff7f0a] text-white border-[#ff7f0a] shadow-sm"
                        : "bg-white text-[#6b5b45] border-[#f0dcc8] hover:border-[#ffbd6e]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((item) => {
                  const inCart = cart.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`bg-white border rounded-2xl p-5 transition-all ${
                        inCart
                          ? "border-[#ff7f0a] shadow-[0_0_0_2px_rgba(255,127,10,0.1)]"
                          : "border-[#f0dcc8] hover:border-[#ffbd6e] hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-4xl flex-shrink-0">
                          {item.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-semibold text-[#1a1209] text-sm">
                              {item.name}
                            </h3>
                            {item.popular && (
                              <span className="bg-[#fff8f0] text-[#ff7f0a] border border-[#ffd9a8] text-[9px] font-bold px-2 py-0.5 rounded-full">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6b5b45] font-devanagari">
                            {item.hindiName}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            setInfoItem(item === infoItem ? null : item)
                          }
                          className="text-[#b89b7a] hover:text-[#ff7f0a] transition-colors flex-shrink-0"
                        >
                          <Info size={14} />
                        </button>
                      </div>

                      <p className="text-xs text-[#6b5b45] mb-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Temples */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.temples.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] bg-[#fff8f0] text-[#ff7f0a] border border-[#ffd9a8] px-2 py-0.5 rounded-full"
                          >
                            🛕 {t}
                          </span>
                        ))}
                      </div>

                      {/* Info Expand */}
                      {infoItem?.id === item.id && (
                        <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-xl p-3 mb-3 text-xs text-[#6b5b45] leading-relaxed">
                          <strong className="text-[#ff7f0a] block mb-1">
                            Significance:
                          </strong>
                          {item.significance}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#ff7f0a]">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={() => toggleCart(item.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                            inCart
                              ? "bg-[#ff7f0a] text-white shadow-sm"
                              : "border border-[#ff7f0a] text-[#ff7f0a] hover:bg-[#fff8f0]"
                          }`}
                        >
                          {inCart ? <Check size={13} /> : <Plus size={13} />}
                          {inCart ? "Added" : "Add to Offering"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">🌸</div>
                  <p className="font-display font-semibold text-[#1a1209]">
                    No offerings found for this selection
                  </p>
                  <p className="text-sm text-[#6b5b45] mt-1">
                    Try selecting a different temple or category
                  </p>
                </div>
              )}
            </div>

            {/* ── RIGHT: Cart & Temple Info ── */}
            <div className="space-y-5">
              {/* Cart Summary */}
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card sticky top-36">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-[#1a1209]">
                    Your Offerings
                  </h3>
                  <span className="bg-[#ff7f0a] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8 text-[#b89b7a]">
                    <div className="text-4xl mb-2">🙏</div>
                    <p className="text-sm">No offerings selected yet</p>
                    <p className="text-xs mt-1">
                      Add items from the left panel
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-4 max-h-52 overflow-y-auto">
                      {cart.map((id) => {
                        const item = CHADHAVA_ITEMS.find((i) => i.id === id)!;
                        return (
                          <div key={id} className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#1a1209] truncate">
                                {item.name}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-[#ff7f0a]">
                              ₹{item.price}
                            </span>
                            <button
                              onClick={() => toggleCart(id)}
                              className="text-[#b89b7a] hover:text-red-500 transition-colors ml-1"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-[#f0dcc8] pt-3 mb-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-[#1a1209]">Total</span>
                        <span className="text-[#ff7f0a] text-lg">
                          ₹{cartTotal}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/cart?type=chadhava"
                      className="w-full block text-center bg-gradient-to-r from-[#ff7f0a] to-[#ff9b30] text-white font-semibold text-sm py-3 rounded-xl shadow-[0_4px_15px_rgba(255,127,10,0.3)] hover:shadow-[0_6px_25px_rgba(255,127,10,0.45)] transition-all"
                    >
                      🌸 Proceed to Book Offering
                    </Link>
                    <p className="text-center text-[10px] text-[#6b5b45] mt-2">
                      📹 Photo/video proof sent on WhatsApp
                    </p>
                  </>
                )}
              </div>

              {/* Why Chadhava */}
              <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-2xl p-5">
                <h4 className="font-display font-semibold text-[#1a1209] mb-3 text-sm">
                  Why Offer Chadhava?
                </h4>
                <div className="space-y-2.5 text-xs text-[#6b5b45]">
                  {[
                    "🙏 Direct connection with the divine",
                    "✨ Fulfillment of your prayers and wishes",
                    "🌿 Fresh offerings prepared daily",
                    "📹 Proof sent on WhatsApp",
                    "🧘 Performed with Vedic mantras",
                    "📦 Prasad shipped to your home",
                  ].map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Temple Photo Gallery ── */}
        <section className="section-py bg-white">
          <div className="container-app">
            <div className="text-center mb-8">
              <span className="badge-saffron mb-2 inline-block">
                Temples We Serve
              </span>
              <h2 className="heading-lg text-[#1a1209]">
                Make Offerings at Sacred Temples
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TEMPLE_LIST.map((t) => (
                <Link
                  key={t.key}
                  href="/temples"
                  className="group relative h-48 rounded-2xl overflow-hidden block"
                >
                  <TempleImage
                    templeKey={t.key}
                    className="w-full h-full"
                    showOverlay
                    overlayOpacity={0.4}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <p className="text-white font-display font-semibold text-sm group-hover:text-[#ffd9a8] transition-colors">
                      {t.name}
                    </p>
                    <p className="text-white/70 text-xs">{t.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
