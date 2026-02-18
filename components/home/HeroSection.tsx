'use client'

import Link from 'next/link'
import { Search, Star, Users, Video, CheckCircle } from 'lucide-react'

const stats = [
  { value: '50,000+', label: 'Poojas Done',     icon: '🪔' },
  { value: '200+',    label: 'Temples',          icon: '🛕' },
  { value: '500+',    label: 'Pandits',          icon: '🧘' },
  { value: '4.9★',   label: 'Average Rating',   icon: '⭐' },
]

const trust = [
  { icon: <CheckCircle size={15} />, text: 'Verified Pandits' },
  { icon: <Video size={15} />,       text: 'Pooja Video on WhatsApp' },
  { icon: <Star size={15} />,        text: '4.9★ Rated Service' },
  { icon: <Users size={15} />,       text: '50,000+ Happy Devotees' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#fdf6ee] pt-24 pb-12">

      {/* ── Decorative background circles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#ffd9a8]/30 to-transparent" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#8b0000]/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#ff7f0a]/4 to-transparent" />
      </div>

      {/* ── Floating diyas (decorative) ── */}
      <div className="absolute top-32 right-16 text-3xl animate-float opacity-60 hidden lg:block" style={{ animationDelay: '0s' }}>🪔</div>
      <div className="absolute top-56 right-40 text-2xl animate-float opacity-40 hidden lg:block" style={{ animationDelay: '1s' }}>🌸</div>
      <div className="absolute bottom-40 left-20 text-3xl animate-float opacity-50 hidden lg:block" style={{ animationDelay: '0.5s' }}>🛕</div>
      <div className="absolute bottom-56 left-44 text-xl animate-float opacity-40 hidden lg:block" style={{ animationDelay: '1.5s' }}>🌺</div>

      <div className="container-app relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* ── Eyebrow pill ── */}
          <div className="inline-flex items-center gap-2 bg-[#fff8f0] border border-[#ffd9a8] rounded-full px-4 py-1.5 text-sm font-medium text-[#ff7f0a] mb-6 shadow-sm">
            <span className="font-devanagari text-base">🙏</span>
            Book Pooja from the Comfort of Your Home
          </div>

          {/* ── Headline ── */}
          <h1 className="heading-xl text-[#1a1209] mb-5 leading-tight">
            Connect with Holy{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#ff7f0a] to-[#8b0000] bg-clip-text text-transparent">
                Pilgrimage Sites
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff7f0a] to-[#8b0000] rounded-full" />
            </span>
            {' '}& Divine Temples of India
          </h1>

          <p className="text-lg text-[#6b5b45] mb-8 leading-relaxed max-w-xl mx-auto">
            Book online pooja, make chadhava offerings, and receive the sacred video on WhatsApp.
            Authentic pandits, transparent pricing, real blessings.
          </p>

          {/* ── Trust badges ── */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {trust.map(({ icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-xs font-medium text-[#6b5b45] bg-white border border-[#f0dcc8] rounded-full px-3 py-1.5 shadow-sm"
              >
                <span className="text-[#ff7f0a]">{icon}</span>
                {text}
              </span>
            ))}
          </div>

          {/* ── Search Bar ── */}
          <div className="bg-white border border-[#f0dcc8] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-3 flex flex-col sm:flex-row gap-3 mb-8 max-w-xl mx-auto">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search size={18} className="text-[#b89b7a] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search temples, poojas…"
                className="flex-1 bg-transparent text-[#1a1209] placeholder-[#b89b7a] outline-none text-sm font-body"
              />
            </div>
            <Link
              href="/temples"
              className="btn-saffron text-sm text-center whitespace-nowrap"
            >
              Book Now
            </Link>
          </div>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/temples" className="btn-saffron text-base px-8 py-3 w-full sm:w-auto">
              🛕 Explore Temples
            </Link>
            <Link href="/poojas" className="btn-outline-saffron text-base px-8 py-3 w-full sm:w-auto">
              🪔 View Poojas
            </Link>
          </div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon }) => (
              <div key={label} className="text-center bg-white border border-[#f0dcc8] rounded-2xl px-4 py-5 shadow-sm">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-2xl font-display font-bold text-[#ff7f0a] mb-0.5">{value}</div>
                <div className="text-xs text-[#6b5b45]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
