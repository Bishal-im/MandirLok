'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Temples', href: '/temples' },
  { label: 'Poojas',  href: '/poojas' },
  { label: 'Chadhava',href: '/chadhava' },
  { label: 'About',   href: '/about' },
]

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-[#f0dcc8]'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar – WhatsApp CTA */}
      <div className="bg-[#8b0000] text-white text-center text-xs py-1.5 px-4 hidden sm:block">
        <span className="font-devanagari mr-2">🙏</span>
        Book your pooja from home — Video delivered on WhatsApp
        <span className="ml-2 font-devanagari">🙏</span>
      </div>

      <div className="container-app">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center text-white font-display font-bold text-lg shadow-divine group-hover:scale-105 transition-transform">
              म
            </div>
            <div>
              <span className="text-xl font-display font-bold text-[#1a1209]">Mandirlok</span>
              <span className="block text-[10px] text-[#ff7f0a] font-medium -mt-0.5 tracking-widest uppercase">
                Divine Bookings
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="nav-link text-sm">
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-[#fff8f0] transition-colors text-[#6b5b45] hover:text-[#ff7f0a]"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#ff7f0a] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>

            {/* Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 btn-outline-saffron text-sm"
            >
              <User size={15} />
              Login
            </Link>

            {/* Book Now CTA */}
            <Link href="/temples" className="btn-saffron text-sm hidden md:inline-flex">
              Book Pooja
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#fff8f0] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        } bg-white border-t border-[#f0dcc8]`}
      >
        <div className="container-app py-4 flex flex-col gap-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="py-3 px-4 rounded-xl hover:bg-[#fff8f0] font-medium text-[#1a1209] hover:text-[#ff7f0a] transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#f0dcc8] flex flex-col gap-2">
            <Link href="/login" className="btn-outline-saffron text-center text-sm" onClick={() => setOpen(false)}>
              Login / Sign Up
            </Link>
            <Link href="/temples" className="btn-saffron text-center text-sm" onClick={() => setOpen(false)}>
              Book a Pooja
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
