'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar, Clock, CheckCircle, Upload, IndianRupee,
  User, LogOut, Menu, X, Video, Phone
} from 'lucide-react'

const todayPoojas = [
  {
    id: 'BK1042',
    devotee: 'Priya Sharma',
    pooja: 'Rudrabhishek',
    temple: 'Kashi Vishwanath',
    time: '7:00 AM',
    status: 'completed',
    amount: 1251,
    whatsapp: '9876543210',
    sankalp: 'For good health of my father',
  },
  {
    id: 'BK1043',
    devotee: 'Mohan Das',
    pooja: 'Navgrah Puja',
    temple: 'Kashi Vishwanath',
    time: '10:30 AM',
    status: 'in-progress',
    amount: 1500,
    whatsapp: '9988776655',
    sankalp: 'Remove obstacles in business',
  },
  {
    id: 'BK1044',
    devotee: 'Sunita Verma',
    pooja: 'Panchopchar Puja',
    temple: 'Kashi Vishwanath',
    time: '3:00 PM',
    status: 'upcoming',
    amount: 301,
    whatsapp: '9112233445',
    sankalp: 'Blessings for newborn baby',
  },
]

const statusConfig = {
  'completed':    { label: 'Completed',    bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200'  },
  'in-progress':  { label: 'In Progress',  bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200'   },
  'upcoming':     { label: 'Upcoming',     bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
}

export default function PanditDashboard() {
  const [sideOpen,       setSideOpen]       = useState(false)
  const [uploadingId,    setUploadingId]    = useState<string | null>(null)
  const [uploadedIds,    setUploadedIds]    = useState<string[]>([])

  const handleUpload = (id: string) => {
    setUploadingId(id)
    setTimeout(() => {
      setUploadedIds(prev => [...prev, id])
      setUploadingId(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#1a0a00] text-white flex flex-col transition-transform duration-300 ${
        sideOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:flex`}>

        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center font-bold text-base">
            🧘
          </div>
          <div>
            <span className="font-display font-bold text-sm">Pt. Ramesh Sharma</span>
            <span className="block text-[10px] text-[#ff9b30] tracking-widest uppercase">Pandit Portal</span>
          </div>
          <button onClick={() => setSideOpen(false)} className="ml-auto lg:hidden text-[#b89b7a]">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Today's Poojas",  icon: <Calendar size={17} />,     active: true  },
            { label: 'Upcoming',        icon: <Clock size={17} />                        },
            { label: 'Completed',       icon: <CheckCircle size={17} />                  },
            { label: 'Earnings',        icon: <IndianRupee size={17} />                  },
            { label: 'My Profile',      icon: <User size={17} />                         },
          ].map(item => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                item.active
                  ? 'bg-[#ff7f0a] text-white'
                  : 'text-[#b89b7a] hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#b89b7a] hover:text-white">
            <LogOut size={17} /> Logout
          </Link>
        </div>
      </aside>

      {sideOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSideOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-display font-bold text-gray-900 text-lg">Today's Poojas</h1>
              <p className="text-xs text-gray-500">Tuesday, 17 Feb 2026 · Varanasi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-saffron">🧘 Active Pandit</span>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Today's Poojas", value: '3',      icon: '🪔', color: '#ff7f0a' },
              { label: 'Completed',      value: '1',      icon: '✅', color: '#16a34a' },
              { label: 'This Month',     value: '₹12,400',icon: '💰', color: '#8b0000' },
              { label: 'Total Poojas',   value: '247',    icon: '📊', color: '#1a6b8a' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-xl font-display font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Pooja Cards ── */}
          <div className="space-y-4">
            {todayPoojas.map(booking => {
              const sc = statusConfig[booking.status as keyof typeof statusConfig]
              const uploaded = uploadedIds.includes(booking.id)
              const uploading = uploadingId === booking.id

              return (
                <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#fff8f0] rounded-xl flex items-center justify-center text-xl">🙏</div>
                      <div>
                        <h3 className="font-display font-semibold text-gray-900">{booking.pooja}</h3>
                        <p className="text-xs text-[#ff7f0a]">🛕 {booking.temple}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                      {sc.label}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 text-xs text-gray-600">
                      <p>👤 Devotee: <strong className="text-gray-900">{booking.devotee}</strong></p>
                      <p>📅 Date: <strong className="text-gray-900">Today</strong></p>
                      <p>🕐 Time: <strong className="text-gray-900">{booking.time}</strong></p>
                      <p>💰 Amount: <strong className="text-[#ff7f0a]">₹{booking.amount.toLocaleString()}</strong></p>
                    </div>
                    <div className="bg-[#fff8f0] border border-[#ffd9a8] rounded-xl p-3">
                      <p className="text-xs font-semibold text-[#6b5b45] mb-1">Sankalp / Wish:</p>
                      <p className="text-xs text-[#1a1209] italic">"{booking.sankalp}"</p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-[#6b5b45]">
                        <Phone size={11} className="text-[#25D366]" />
                        WhatsApp: +91 {booking.whatsapp}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
                    {booking.status === 'upcoming' && (
                      <button className="btn-saffron text-xs py-2 px-4">
                        ▶ Mark as Started
                      </button>
                    )}
                    {booking.status === 'in-progress' && (
                      <>
                        <button
                          onClick={() => handleUpload(booking.id)}
                          disabled={uploading || uploaded}
                          className={`flex items-center gap-1.5 text-xs py-2 px-4 rounded-full font-semibold transition-all ${
                            uploaded
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'btn-saffron'
                          }`}
                        >
                          {uploading ? (
                            <span className="animate-spin">⟳</span>
                          ) : uploaded ? (
                            <CheckCircle size={12} />
                          ) : (
                            <Upload size={12} />
                          )}
                          {uploading ? 'Uploading…' : uploaded ? 'Video Uploaded ✓' : 'Upload Pooja Video'}
                        </button>
                        {uploaded && (
                          <button className="btn-maroon text-xs py-2 px-4">
                            ✅ Mark Completed
                          </button>
                        )}
                      </>
                    )}
                    {booking.status === 'completed' && (
                      <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                        <CheckCircle size={14} />
                        Pooja completed · Video sent to devotee on WhatsApp
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Earnings Summary ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Earnings This Month</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#ff7f0a]">₹12,400</p>
                <p className="text-xs text-gray-500">Total Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">₹9,920</p>
                <p className="text-xs text-gray-500">After Commission (80%)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₹2,480</p>
                <p className="text-xs text-gray-500">Platform Commission</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button className="btn-saffron text-xs py-2 px-5">
                Request Payout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
