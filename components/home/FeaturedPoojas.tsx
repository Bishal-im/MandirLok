import Link from 'next/link'
import { Clock, Star } from 'lucide-react'

const poojas = [
  {
    id: 1,
    name: 'Rudrabhishek',
    temple: 'Kashi Vishwanath',
    price: 1100,
    originalPrice: 1500,
    duration: '45 min',
    rating: 4.9,
    reviews: 3240,
    emoji: '🪔',
    benefit: 'Health & Prosperity',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Satyanarayan Katha',
    temple: 'Siddhivinayak',
    price: 2100,
    originalPrice: 2800,
    duration: '2 hrs',
    rating: 4.8,
    reviews: 1890,
    emoji: '🌸',
    benefit: 'Success & Peace',
    tag: 'Popular',
  },
  {
    id: 3,
    name: 'Navgrah Puja',
    temple: 'Kashi Vishwanath',
    price: 1500,
    originalPrice: 2000,
    duration: '60 min',
    rating: 4.7,
    reviews: 2100,
    emoji: '⭐',
    benefit: 'Remove Obstacles',
    tag: 'Trending',
  },
  {
    id: 4,
    name: 'Ganesh Pooja',
    temple: 'Siddhivinayak',
    price: 800,
    originalPrice: 1100,
    duration: '30 min',
    rating: 4.9,
    reviews: 4500,
    emoji: '🐘',
    benefit: 'New Beginnings',
    tag: 'Must Book',
  },
  {
    id: 5,
    name: 'Lakshmi Puja',
    temple: 'Tirupati Balaji',
    price: 1200,
    originalPrice: 1600,
    duration: '45 min',
    rating: 4.8,
    reviews: 2900,
    emoji: '💛',
    benefit: 'Wealth & Fortune',
    tag: 'Popular',
  },
  {
    id: 6,
    name: 'Mahamrityunjaya Jaap',
    temple: 'Kashi Vishwanath',
    price: 3100,
    originalPrice: 4000,
    duration: '3 hrs',
    rating: 4.9,
    reviews: 1560,
    emoji: '🙏',
    benefit: 'Health & Long Life',
    tag: 'Sacred',
  },
]

const badgeColors: Record<string, string> = {
  'Best Seller': '#8b0000',
  'Popular':     '#ff7f0a',
  'Trending':    '#f0bc00',
  'Must Book':   '#8b0000',
  'Sacred':      '#1a6b1a',
}

export default function FeaturedPoojas() {
  return (
    <section className="section-py bg-white">
      <div className="container-app">
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="badge-saffron mb-3 inline-block">Sacred Rituals</span>
          <h2 className="heading-lg text-[#1a1209] mb-3">Popular Poojas to Book</h2>
          <p className="text-[#6b5b45] max-w-xl mx-auto">
            Experience the power of authentic Vedic rituals performed by qualified pandits at sacred temples.
          </p>
        </div>

        {/* ── Category Filters ── */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {['All Poojas', 'Ganesh Puja', 'Lakshmi Puja', 'Shiva Puja', 'Navratri Special', 'Griha Pravesh'].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-[#ff7f0a] text-white shadow-sm'
                  : 'bg-[#fff8f0] border border-[#f0dcc8] text-[#6b5b45] hover:border-[#ffbd6e] hover:text-[#ff7f0a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {poojas.map(pooja => (
            <Link
              key={pooja.id}
              href={`/poojas/${pooja.id}`}
              className="bg-white border border-[#f0dcc8] rounded-2xl p-5 card-lift group block"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#fff8f0] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {pooja.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-semibold text-[#1a1209] text-base leading-tight group-hover:text-[#ff7f0a] transition-colors truncate">
                      {pooja.name}
                    </h3>
                    <span
                      className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                      style={{ background: badgeColors[pooja.tag] }}
                    >
                      {pooja.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#ff7f0a] font-medium mb-1">🛕 {pooja.temple}</p>
                  <p className="text-xs text-[#6b5b45] mb-3">✨ {pooja.benefit}</p>

                  <div className="flex items-center gap-3 text-xs text-[#6b5b45] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-[#b89b7a]" /> {pooja.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-[#f0bc00] fill-[#f0bc00]" />
                      {pooja.rating} ({(pooja.reviews / 1000).toFixed(1)}k)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-[#ff7f0a]">₹{pooja.price.toLocaleString()}</span>
                      <span className="text-xs text-[#b89b7a] line-through">₹{pooja.originalPrice.toLocaleString()}</span>
                    </div>
                    <button className="btn-saffron text-xs py-1.5 px-3">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── View All ── */}
        <div className="text-center">
          <Link href="/poojas" className="btn-outline-saffron text-sm inline-flex">
            View All Poojas & Rituals
          </Link>
        </div>
      </div>
    </section>
  )
}
