"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    city: "Delhi",
    avatar: "प्",
    rating: 5,
    pooja: "Rudrabhishek at Kashi Vishwanath",
    review:
      "Absolutely divine experience! The pandit was very knowledgeable and performed the pooja with complete dedication. Received the WhatsApp video within minutes of the completion. Felt the blessings even from far away.",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    city: "Mumbai",
    avatar: "रा",
    rating: 5,
    pooja: "Satyanarayan Katha at Siddhivinayak",
    review:
      "Booked for my mother's health. The entire process was smooth — payment, assignment, and video delivery. The pandit even called to confirm the sankalp details. Highly recommended!",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    name: "Anita Patel",
    city: "Ahmedabad",
    avatar: "अ",
    rating: 5,
    pooja: "Navgrah Puja at Kashi Vishwanath",
    review:
      "I was skeptical about online poojas but Mandirlok changed my mind. The video quality was excellent and watching the pandit perform the ritual with complete focus was very reassuring. Will book again!",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    city: "Jaipur",
    avatar: "वि",
    rating: 4,
    pooja: "Mahamrityunjaya Jaap",
    review:
      "Great service overall. The pandit was very experienced and explained each step of the pooja. Got the prasad too. Highly satisfied with the experience. Would definitely use again for special occasions.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 5,
    name: "Sunita Gupta",
    city: "Lucknow",
    avatar: "सु",
    rating: 5,
    pooja: "Lakshmi Puja at Tirupati",
    review:
      "Wonderful service. As someone who cannot travel to Tirupati due to health reasons, Mandirlok gave me a way to still connect with the divine. The pandit was respectful and professional.",
    date: "1 month ago",
    verified: true,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  return (
    <section className="section-py section-alt overflow-hidden">
      <div className="container-app">
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="badge-saffron mb-3 inline-block">
            Devotee Stories
          </span>
          <h2 className="heading-lg text-[#1a1209] mb-3">
            What Our Devotees Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-[#6b5b45]">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className="text-[#f0bc00] fill-[#f0bc00]"
                />
              ))}
            </div>
            <span>4.9 out of 5 · 50,000+ Reviews</span>
          </div>
        </div>

        {/* ── Featured Review ── */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white border border-[#f0dcc8] rounded-3xl p-8 shadow-card relative">
            {/* Quote mark */}
            <div className="absolute top-6 right-8 text-6xl font-display text-[#ffd9a8] leading-none select-none">
              "
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center text-white font-display font-bold">
                {reviews[active].avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-[#1a1209]">
                    {reviews[active].name}
                  </p>
                  {reviews[active].verified && (
                    <span className="badge-green text-[10px]">✓ Verified</span>
                  )}
                </div>
                <p className="text-xs text-[#6b5b45]">
                  {reviews[active].city} · {reviews[active].date}
                </p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: reviews[active].rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-[#f0bc00] fill-[#f0bc00]"
                  />
                ))}
              </div>
            </div>

            <p className="text-[#6b5b45] leading-relaxed mb-4 relative z-10">
              {reviews[active].review}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-[#ff7f0a] text-sm">🙏</span>
              <span className="text-xs font-medium text-[#6b5b45]">
                {reviews[active].pooja}
              </span>
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#f0dcc8] bg-white hover:border-[#ff7f0a] hover:text-[#ff7f0a] transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${
                    i === active
                      ? "w-6 h-2.5 bg-[#ff7f0a]"
                      : "w-2.5 h-2.5 bg-[#f0dcc8] hover:bg-[#ffbd6e]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#f0dcc8] bg-white hover:border-[#ff7f0a] hover:text-[#ff7f0a] transition-colors flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Mini Reviews Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {reviews.slice(0, 3).map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActive(i)}
              className={`text-left bg-white border rounded-xl p-4 transition-all ${
                i === active
                  ? "border-[#ff7f0a] shadow-divine"
                  : "border-[#f0dcc8] hover:border-[#ffbd6e]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] text-white text-xs flex items-center justify-center font-bold">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1a1209]">
                    {r.name}
                  </p>
                  <p className="text-[10px] text-[#6b5b45]">{r.city}</p>
                </div>
              </div>
              <p className="text-xs text-[#6b5b45] line-clamp-2">{r.review}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
