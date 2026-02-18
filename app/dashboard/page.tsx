'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Calendar, Clock, Download, Star, ChevronRight, Video } from 'lucide-react'

const bookings = [
  {
    id: 'BK001',
    pooja: 'Rudrabhishek',
    temple: 'Kashi Vishwanath, Varanasi',
    date: '20 Feb 2026',
    time: '7:00 AM',
    pandit: 'Pt. Ramesh Sharma',
    status: 'completed',
    amount: 1251,
    hasVideo: true,
    emoji: '🪔',
  },
  {
    id: 'BK002',
    pooja: 'Satyanarayan Katha',
    temple: 'Siddhivinayak, Mumbai',
    date: '25 Feb 2026',
    time: '10:00 AM',
    pandit: 'Pt. Suresh Joshi',
    status: 'upcoming',
    amount: 2100,
    hasVideo: false,
    emoji: '🌸',
  },
  {
    id: 'BK003',
    pooja: 'Navgrah Puja',
    temple: 'Kashi Vishwanath, Varanasi',
    date: '2 Mar 2026',
    time: '6:30 AM',
    pandit: 'TBD',
    status: 'confirmed',
    amount: 1500,
    hasVideo: false,
    emoji: '⭐',
  },
]

const statusConfig = {
  completed: { label: 'Completed',  bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700' },
  upcoming:  { label: 'Upcoming',   bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-700'  },
  confirmed: { label: 'Confirmed',  bg: 'bg-[#fff8f0]', border: 'border-[#ffd9a8]', text: 'text-[#ff7f0a]' },
  cancelled: { label: 'Cancelled',  bg: 'bg-red-50',    border: 'border-red-200',   text: 'text-red-600'   },
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all')

  const filtered = bookings.filter(b => {
    if (activeTab === 'all')       return true
    if (activeTab === 'upcoming')  return b.status === 'upcoming' || b.status === 'confirmed'
    if (activeTab === 'completed') return b.status === 'completed'
    return true
  })

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#fdf6ee]">
        <div className="container-app py-8">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card">
                {/* Profile */}
                <div className="text-center mb-5 pb-5 border-b border-[#f0dcc8]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-3">
                    प्र
                  </div>
                  <h2 className="font-display font-semibold text-[#1a1209]">Priya Sharma</h2>
                  <p className="text-xs text-[#6b5b45]">+91 98765 43210</p>
                  <span className="badge-saffron mt-2 inline-block">Devotee</span>
                </div>

                {/* Nav */}
                <nav className="space-y-1">
                  {[
                    { label: 'My Bookings',     href: '/dashboard', active: true  },
                    { label: 'Profile',          href: '/dashboard/profile' },
                    { label: 'Saved Temples',    href: '/dashboard/saved' },
                    { label: 'Notifications',    href: '/dashboard/notifications' },
                    { label: 'Logout',           href: '/login' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        item.active
                          ? 'bg-[#fff8f0] text-[#ff7f0a] font-semibold border border-[#ffd9a8]'
                          : 'text-[#6b5b45] hover:bg-[#fdf6ee] hover:text-[#ff7f0a]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* ── Main ── */}
            <div className="lg:col-span-3 space-y-5">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Bookings', value: '12',  emoji: '🙏' },
                  { label: 'Completed',      value: '9',   emoji: '✅' },
                  { label: 'Videos Received',value: '9',   emoji: '📹' },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-[#f0dcc8] rounded-2xl p-4 text-center shadow-card">
                    <div className="text-2xl mb-1">{s.emoji}</div>
                    <div className="text-2xl font-display font-bold text-[#ff7f0a]">{s.value}</div>
                    <div className="text-xs text-[#6b5b45]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {(['all', 'upcoming', 'completed'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-[#ff7f0a] text-white shadow-sm'
                        : 'bg-white border border-[#f0dcc8] text-[#6b5b45] hover:border-[#ffbd6e]'
                    }`}
                  >
                    {tab === 'all' ? 'All Bookings' : tab === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </button>
                ))}
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {filtered.map(booking => {
                  const sc = statusConfig[booking.status as keyof typeof statusConfig]
                  return (
                    <div key={booking.id} className="bg-white border border-[#f0dcc8] rounded-2xl p-5 shadow-card">
                      <div className="flex items-start gap-4">
                        {/* Emoji */}
                        <div className="w-12 h-12 bg-[#fff8f0] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                          {booking.emoji}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-display font-semibold text-[#1a1209]">{booking.pooja}</h3>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.border} ${sc.text}`}>
                              {sc.label}
                            </span>
                          </div>

                          <p className="text-xs text-[#ff7f0a] mb-2">🛕 {booking.temple}</p>

                          <div className="flex flex-wrap gap-4 text-xs text-[#6b5b45]">
                            <span className="flex items-center gap-1"><Calendar size={11} className="text-[#ff7f0a]" /> {booking.date}</span>
                            <span className="flex items-center gap-1"><Clock size={11} className="text-[#ff7f0a]" /> {booking.time}</span>
                            <span>🧘 {booking.pandit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f0dcc8]">
                        <span className="font-bold text-[#ff7f0a]">₹{booking.amount.toLocaleString()}</span>
                        <div className="flex gap-2">
                          {booking.hasVideo && (
                            <button className="flex items-center gap-1.5 text-xs bg-[#f0fdf4] border border-green-200 text-green-700 px-3 py-1.5 rounded-full font-medium hover:bg-green-50">
                              <Video size={12} /> Watch Video
                            </button>
                          )}
                          {booking.status === 'completed' && !booking.hasVideo && (
                            <button className="flex items-center gap-1.5 text-xs btn-outline-saffron py-1.5 px-3">
                              <Download size={12} /> Download Receipt
                            </button>
                          )}
                          {booking.status === 'upcoming' && (
                            <button className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50">
                              Cancel
                            </button>
                          )}
                          <Link href={`/bookings/${booking.id}`} className="flex items-center gap-1 text-xs text-[#ff7f0a] font-medium hover:underline">
                            Details <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
