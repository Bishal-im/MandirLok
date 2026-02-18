const steps = [
  {
    num: '01',
    emoji: '🛕',
    title: 'Select Temple & Pooja',
    desc: 'Choose from 200+ temples across India. Browse poojas, chadhava offerings, and select what resonates with your devotion.',
    color: '#ff7f0a',
  },
  {
    num: '02',
    emoji: '📅',
    title: 'Choose Date & Fill Details',
    desc: 'Pick your preferred date and enter your name, gotra, and sankalp details for the personalized pooja.',
    color: '#8b0000',
  },
  {
    num: '03',
    emoji: '💳',
    title: 'Secure Online Payment',
    desc: 'Pay safely via UPI, cards, or net banking through Razorpay. 100% secure and encrypted.',
    color: '#f0bc00',
  },
  {
    num: '04',
    emoji: '📹',
    title: 'Receive Video on WhatsApp',
    desc: 'Your assigned pandit performs the pooja and sends the live video directly to your WhatsApp with blessings.',
    color: '#ff7f0a',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-py section-alt">
      <div className="container-app">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="badge-saffron mb-3 inline-block">Simple Process</span>
          <h2 className="heading-lg text-[#1a1209] mb-3">How Mandirlok Works</h2>
          <p className="text-[#6b5b45] max-w-xl mx-auto">
            From booking to blessings in 4 simple steps. Divine darshan delivered to your door.
          </p>
        </div>

        {/* ── Video Placeholder ── */}
        <div className="max-w-2xl mx-auto mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0a00] to-[#3d1500] aspect-video flex flex-col items-center justify-center shadow-temple border border-[#ff7f0a]/20 relative">
          {/* Fake play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#ff7f0a] flex items-center justify-center shadow-[0_0_30px_rgba(255,127,10,0.5)] cursor-pointer hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-[#ffd9a8] text-sm font-medium">Watch: How Mandirlok Pooja Works</p>
          </div>
          {/* Decorative diya icons */}
          <div className="absolute top-4 left-6 text-2xl opacity-30">🪔</div>
          <div className="absolute bottom-4 right-6 text-2xl opacity-30">🛕</div>
        </div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative group">
              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#f0dcc8] to-transparent z-0 -translate-y-px" />
              )}

              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-6 text-center hover:border-[#ffbd6e] hover:shadow-divine transition-all duration-300 relative z-10">
                {/* Step number */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white font-display font-bold text-lg mb-4 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                >
                  {step.emoji}
                </div>
                <div className="text-xs font-bold text-[#b89b7a] tracking-widest uppercase mb-2">Step {step.num}</div>
                <h3 className="font-display font-semibold text-[#1a1209] text-base mb-2">{step.title}</h3>
                <p className="text-xs text-[#6b5b45] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
