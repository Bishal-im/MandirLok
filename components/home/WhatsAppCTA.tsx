import Link from 'next/link'

const features = [
  {
    emoji: '📹',
    title: 'Live Pooja Video',
    desc: 'Receive HD video of your pooja performed at the temple',
  },
  {
    emoji: '💬',
    title: 'WhatsApp Updates',
    desc: 'Get real-time notifications on booking, assignment & completion',
  },
  {
    emoji: '🧘',
    title: 'Verified Pandits',
    desc: 'All pandits are background-checked and highly experienced',
  },
  {
    emoji: '🔒',
    title: 'Secure Payments',
    desc: 'Razorpay encrypted. 100% safe. Instant confirmation.',
  },
  {
    emoji: '🌿',
    title: 'Authentic Rituals',
    desc: 'Poojas performed as per Vedic scriptures and tradition',
  },
  {
    emoji: '🎁',
    title: 'Prasad Delivery',
    desc: 'Temple prasad shipped to your home address (select temples)',
  },
]

export default function WhatsAppCTA() {
  return (
    <section className="section-py section-alt">
      <div className="container-app">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* ── Left: Content ── */}
          <div>
            <span className="badge-saffron mb-3 inline-block">WhatsApp Integration</span>
            <h2 className="heading-lg text-[#1a1209] mb-4">
              Receive Pooja Video{' '}
              <span className="text-[#ff7f0a]">Directly on WhatsApp</span>
            </h2>
            <p className="text-[#6b5b45] mb-6 leading-relaxed">
              After booking, everything happens automatically. Your pandit is assigned, performs the pooja at the temple,
              and sends you the sacred video with personalized blessings — all via WhatsApp.
            </p>

            {/* Whatsapp flow */}
            <div className="space-y-4 mb-6">
              {[
                { step: '1', text: 'Booking confirmed → Instant WhatsApp message' },
                { step: '2', text: 'Pandit assigned → You receive pandit details' },
                { step: '3', text: 'Pooja performed → Video + blessings on WhatsApp' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {step}
                  </div>
                  <p className="text-sm text-[#6b5b45]">{text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/temples"
              className="btn-saffron text-sm inline-flex items-center gap-2"
            >
              <span>💬</span> Book & Get on WhatsApp
            </Link>
          </div>

          {/* ── Right: Feature Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ emoji, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-[#f0dcc8] rounded-2xl p-5 hover:border-[#ffbd6e] hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-3">{emoji}</div>
                <h4 className="font-semibold text-[#1a1209] mb-1 text-sm">{title}</h4>
                <p className="text-xs text-[#6b5b45] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
