'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, MapPin, Star, Users, IndianRupee,
  TrendingUp, Package, CheckCircle, Clock, AlertCircle,
  Menu, X, LogOut, Settings, BarChart3, ShoppingBag
} from 'lucide-react'

const stats = [
  { label: 'Total Orders',   value: '4,287',  change: '+12%', icon: <ShoppingBag size={20} />,    color: '#ff7f0a' },
  { label: 'Revenue',        value: '₹18.4L', change: '+8%',  icon: <IndianRupee size={20} />,    color: '#8b0000' },
  { label: 'Total Users',    value: '12,540', change: '+22%', icon: <Users size={20} />,          color: '#1a6b4a' },
  { label: 'Active Pandits', value: '142',    change: '+5%',  icon: <Star size={20} />,           color: '#f0bc00' },
]

const recentOrders = [
  { id: 'BK1042', user: 'Priya Sharma',  pooja: 'Rudrabhishek',        temple: 'Kashi',       amount: 1251, status: 'completed', pandit: 'Pt. Ramesh S.' },
  { id: 'BK1041', user: 'Rajesh Kumar',  pooja: 'Satyanarayan Katha',  temple: 'Siddhivinayak', amount: 2100, status: 'pending',   pandit: 'Not assigned'  },
  { id: 'BK1040', user: 'Anita Patel',   pooja: 'Navgrah Puja',        temple: 'Kashi',       amount: 1500, status: 'in-progress',pandit: 'Pt. Mohan V.'  },
  { id: 'BK1039', user: 'Vikram Singh',  pooja: 'Mahamrityunjaya Jaap',temple: 'Kashi',       amount: 3100, status: 'completed', pandit: 'Pt. Ramesh S.' },
  { id: 'BK1038', user: 'Sunita Gupta',  pooja: 'Lakshmi Puja',        temple: 'Tirupati',    amount: 1200, status: 'pending',   pandit: 'Not assigned'  },
]

const statusConfig = {
  'completed':    { label: 'Completed',    bg: 'bg-green-100', text: 'text-green-700' },
  'pending':      { label: 'Pending',      bg: 'bg-yellow-100',text: 'text-yellow-700'},
  'in-progress':  { label: 'In Progress',  bg: 'bg-blue-100',  text: 'text-blue-700'  },
  'cancelled':    { label: 'Cancelled',    bg: 'bg-red-100',   text: 'text-red-700'   },
}

const navItems = [
  { label: 'Dashboard',        href: '/admin',           icon: <LayoutDashboard size={18} />, active: true  },
  { label: 'Orders',           href: '/admin/orders',    icon: <ShoppingBag size={18} />               },
  { label: 'Temples',          href: '/admin/temples',   icon: <MapPin size={18} />                    },
  { label: 'Poojas',           href: '/admin/poojas',    icon: <Star size={18} />                      },
  { label: 'Pandits',          href: '/admin/pandits',   icon: <Users size={18} />                     },
  { label: 'Payments',         href: '/admin/payments',  icon: <IndianRupee size={18} />               },
  { label: 'Analytics',        href: '/admin/analytics', icon: <BarChart3 size={18} />                 },
  { label: 'Settings',         href: '/admin/settings',  icon: <Settings size={18} />                  },
]

export default function AdminDashboard() {
  const [sideOpen, setSideOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#1a0a00] text-white flex flex-col transition-transform duration-300 ${
        sideOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:flex`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center font-bold text-lg">
            म
          </div>
          <div>
            <span className="font-display font-bold text-sm">Mandirlok</span>
            <span className="block text-[10px] text-[#ff9b30] tracking-widest uppercase">Admin Panel</span>
          </div>
          <button onClick={() => setSideOpen(false)} className="ml-auto lg:hidden text-[#b89b7a] hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm transition-colors ${
                item.active
                  ? 'bg-[#ff7f0a] text-white'
                  : 'text-[#b89b7a] hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#b89b7a] hover:bg-white/10 hover:text-white">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sideOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto">

        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSideOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-display font-bold text-gray-900 text-lg">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome back, Admin · Feb 17, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-saffron text-xs">Super Admin</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* ── Stats Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: s.color }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ── Quick Actions ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Add Temple', emoji: '🛕', href: '/admin/temples/add' },
              { label: 'Add Pooja',  emoji: '🪔', href: '/admin/poojas/add' },
              { label: 'Add Pandit', emoji: '🧘', href: '/admin/pandits/add' },
              { label: 'Send WhatsApp', emoji: '💬', href: '/admin/whatsapp' },
            ].map(a => (
              <Link
                key={a.label}
                href={a.href}
                className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-[#ffbd6e] hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-1.5">{a.emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{a.label}</p>
              </Link>
            ))}
          </div>

          {/* ── Recent Orders Table ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-[#ff7f0a] hover:underline">
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Order ID', 'User', 'Pooja', 'Temple', 'Pandit', 'Amount', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => {
                    const sc = statusConfig[order.status as keyof typeof statusConfig]
                    return (
                      <tr key={order.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/20'}`}>
                        <td className="px-4 py-3 text-[#ff7f0a] font-medium text-xs">{order.id}</td>
                        <td className="px-4 py-3 text-gray-900 font-medium text-xs">{order.user}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{order.pooja}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{order.temple}</td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{order.pandit}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 text-xs">₹{order.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {order.status === 'pending' && (
                              <button className="text-[10px] bg-[#fff8f0] text-[#ff7f0a] border border-[#ffd9a8] px-2.5 py-1 rounded-full font-medium hover:bg-[#ff7f0a] hover:text-white transition-colors">
                                Assign
                              </button>
                            )}
                            <Link href={`/admin/orders/${order.id}`} className="text-[10px] text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full hover:border-gray-400">
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom Grid ── */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Top Temples */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Top Temples by Revenue</h3>
              {[
                { name: 'Kashi Vishwanath',  revenue: 4,20000, orders: 124 },
                { name: 'Siddhivinayak',     revenue: 3,10000, orders: 98  },
                { name: 'Tirupati Balaji',   revenue: 2,80000, orders: 87  },
                { name: 'Vaishno Devi',      revenue: 1,90000, orders: 62  },
              ].map((t, i) => (
                <div key={t.name} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-[#ff7f0a] font-bold text-sm w-5">#{i+1}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.orders} orders</p>
                  </div>
                  <p className="text-sm font-bold text-[#ff7f0a]">₹{(t.revenue).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Pending Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-4">Pending Actions</h3>
              {[
                { label: 'Unassigned orders', count: 8,  color: 'text-yellow-600 bg-yellow-50', action: 'Assign Pandits' },
                { label: 'Videos pending',    count: 3,  color: 'text-blue-600 bg-blue-50',     action: 'View'          },
                { label: 'New pandit requests',count: 5, color: 'text-green-600 bg-green-50',   action: 'Review'        },
                { label: 'Refund requests',   count: 2,  color: 'text-red-600 bg-red-50',       action: 'Process'       },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.color}`}>{item.count}</span>
                  <p className="flex-1 text-sm text-gray-700">{item.label}</p>
                  <button className="text-xs text-[#ff7f0a] font-medium hover:underline">{item.action}</button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
