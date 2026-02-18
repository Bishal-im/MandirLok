import Link from 'next/link'

const offerings = [
  { id: 1, name: 'Flower Garland',   price: 151,  emoji: '🌸', temple: 'All Temples',    desc: 'Fresh marigold garland offered with prayers' },
  { id: 2, name: 'Prasad Thali',     price: 251,  emoji: '🥮', temple: 'Kashi',           desc: 'Traditional prasad with sweets & fruits' },
  { id: 3, name: 'Coconut Offering', price: 101,  emoji: '🥥', temple: 'All Temples',    desc: 'Symbolic coconut break offering' },
  { id: 4, name: 'Gold Foil Chadar', price: 2100, emoji: '🌟', temple: 'Vaishno Devi',   desc: 'Gold foil chadar draped with devotion' },
  { id: 5, name: 'Diya & Ghee',      price: 201,  emoji: '🪔', temple: 'All Temples',    desc: 'Pure cow ghee diya lit in your name' },
  { id: 6, name: 'Shringar',         price: 501,  emoji: '💛', temple: 'Siddhivinayak', desc: 'Sacred decoration offering for the deity' },
]

export default function ChadhavaSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-app">
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <span className="badge-saffron mb-3 inline-block">Offerings</span>
          <h2 className="heading-lg text-[#1a1209] mb-3">
            Chadhava & Temple Offerings
          </h2>
          <p className="text-[#6b5b45] max-w-xl mx-auto">
            Make sacred offerings at renowned temples. Our pandits ensure your chadhava is offered with proper Vedic rituals.
          </p>
        </div>

        {/* ── Offerings Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {offerings.map(item => (
            <Link
              key={item.id}
              href={`/chadhava/${item.id}`}
              className="group text-center bg-[#fff8f0] border border-[#f0dcc8] rounded-2xl p-4 hover:border-[#ffbd6e] hover:shadow-divine transition-all"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {item.emoji}
              </div>
              <h3 className="font-display font-semibold text-[#1a1209] text-sm mb-1 group-hover:text-[#ff7f0a] transition-colors">
                {item.name}
              </h3>
              <p className="text-[10px] text-[#6b5b45] mb-2 line-clamp-2">{item.desc}</p>
              <p className="text-xs text-[#ff7f0a] font-bold">₹{item.price}</p>
            </Link>
          ))}
        </div>

        {/* ── Banner CTA ── */}
        <div className="bg-gradient-to-br from-[#1a0a00] to-[#3d1500] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 text-[200px] opacity-5 select-none leading-none">🪔</div>
          <div className="absolute bottom-0 left-0 text-[150px] opacity-5 select-none leading-none">🛕</div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Can't Visit the Temple?
            </h3>
            <p className="text-[#ffd9a8] max-w-md">
              Let Mandirlok be the bridge between you and your deity. We handle everything with devotion and care.
            </p>
          </div>
          <Link href="/chadhava" className="btn-saffron text-base px-8 py-3 whitespace-nowrap relative z-10 flex-shrink-0">
            Make an Offering →
          </Link>
        </div>
      </div>
    </section>
  )
}
