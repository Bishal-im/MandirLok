import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TempleImage from "@/components/ui/TempleImage";

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    bg: "from-[#ff7f0a] to-[#8b0000]",
    initial: "अ",
  },
  {
    name: "Priya Sharma",
    role: "Head of Temple Relations",
    bg: "from-[#8b0000] to-[#1a0a00]",
    initial: "प्",
  },
  {
    name: "Rohit Gupta",
    role: "Technology Lead",
    bg: "from-[#f0bc00] to-[#ff7f0a]",
    initial: "रो",
  },
  {
    name: "Kavita Iyer",
    role: "Pandit Relations",
    bg: "from-[#1a6b1a] to-[#2d9d2d]",
    initial: "क",
  },
];

const milestones = [
  {
    year: "2022",
    title: "Founded with a Vision",
    desc: "Mandirlok was born from a simple idea — connect devotees who cannot physically visit temples with the divine.",
  },
  {
    year: "2023",
    title: "10,000 Poojas Completed",
    desc: "Crossed 10,000 poojas milestone. Verified our model and expanded to 50+ temples across India.",
  },
  {
    year: "2024",
    title: "WhatsApp Video Integration",
    desc: "Launched real-time WhatsApp video delivery. Now devotees receive the sacred experience on their phones.",
  },
  {
    year: "2025",
    title: "50,000 Happy Devotees",
    desc: "Over 50,000 devotees have experienced the divine through Mandirlok. 200+ temples. 500+ pandits.",
  },
  {
    year: "2026",
    title: "Expanding to 500+ Temples",
    desc: "On track to onboard 500 temples and serve 2 lakh devotees this year.",
  },
];

const values = [
  {
    emoji: "🙏",
    title: "Authentic Devotion",
    desc: "Every pooja is performed with genuine devotion and according to proper Vedic scriptures.",
  },
  {
    emoji: "🧘",
    title: "Verified Pandits Only",
    desc: "All our pandits are thoroughly background-checked, trained, and experienced in their respective traditions.",
  },
  {
    emoji: "📹",
    title: "Transparent & Accountable",
    desc: "Every pooja is recorded and sent to the devotee. No guesswork, no fraud — only genuine divine service.",
  },
  {
    emoji: "🔒",
    title: "Privacy & Security",
    desc: "Your personal details and sankalp information are kept strictly private and never shared.",
  },
  {
    emoji: "💚",
    title: "Devotee First",
    desc: "Every decision we make is guided by what is best for the devotee's spiritual experience and peace of mind.",
  },
  {
    emoji: "🌿",
    title: "Eco-conscious Rituals",
    desc: "We encourage eco-friendly offerings and discourage plastic use at temple premises.",
  },
];

const stats = [
  { value: "50,000+", label: "Happy Devotees" },
  { value: "200+", label: "Partner Temples" },
  { value: "500+", label: "Verified Pandits" },
  { value: "4.9★", label: "Average Rating" },
  { value: "12", label: "States Covered" },
  { value: "99.2%", label: "Completion Rate" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fdf6ee]">
        {/* ── Hero ── */}
        <section className="relative bg-gradient-to-br from-[#1a0a00] to-[#8b0000] py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-5 text-[300px] flex items-center justify-center select-none leading-none">
            ॐ
          </div>
          <div className="container-app relative z-10 text-center text-white">
            <p className="text-[#ffd9a8] text-sm mb-3 tracking-widest uppercase font-medium">
              Our Story
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 leading-tight">
              Bridging Devotees &amp; the Divine
              <br />
              <span className="text-[#ffd9a8]">Since 2022</span>
            </h1>
            <p className="text-[#ffd9a8] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Mandirlok was created with one sacred mission — to ensure that
              distance, health, or circumstance never becomes a barrier between
              a devotee and their deity. We bring the temple to your home.
            </p>
          </div>
        </section>

        {/* ── The Problem We Solve ── */}
        <section className="section-py bg-white">
          <div className="container-app">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="badge-saffron mb-3 inline-block">
                  Our Mission
                </span>
                <h2 className="heading-lg text-[#1a1209] mb-4">
                  Faith Should Have No Barriers
                </h2>
                <p className="text-[#6b5b45] leading-relaxed mb-4">
                  Millions of devotees across India and abroad carry a deep
                  longing to offer prayers at sacred temples — at Kashi
                  Vishwanath during Mahashivratri, at Vaishno Devi on Navratri,
                  at Tirupati on an auspicious occasion. But life intervenes.
                  Distance, health, work, family responsibilities.
                </p>
                <p className="text-[#6b5b45] leading-relaxed mb-4">
                  We founded Mandirlok in 2022 because we believed this
                  shouldn't be the end of the devotee's journey. Technology,
                  when used with reverence and authenticity, can serve the
                  divine. That's our north star.
                </p>
                <p className="text-[#6b5b45] leading-relaxed mb-6">
                  Today, over 50,000 devotees have received the blessings of
                  India's most revered temples through Mandirlok — watching
                  their pooja unfold on their WhatsApp screen, tears of devotion
                  in their eyes.
                </p>
                <Link
                  href="/temples"
                  className="btn-saffron text-sm inline-flex"
                >
                  🛕 Experience It Today
                </Link>
              </div>

              <div className="relative">
                <div className="h-72 md:h-96 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <TempleImage
                    templeKey="kashi-vishwanath"
                    className="w-full h-full"
                    showOverlay
                    overlayOpacity={0.15}
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-5 -left-5 bg-white border border-[#f0dcc8] rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold text-[#ff7f0a]">50,000+</p>
                  <p className="text-xs text-[#6b5b45]">Poojas Completed</p>
                </div>
                <div className="absolute -top-5 -right-5 bg-white border border-[#f0dcc8] rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold text-[#ff7f0a]">4.9★</p>
                  <p className="text-xs text-[#6b5b45]">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-12 bg-gradient-to-br from-[#8b0000] to-[#3d1500]">
          <div className="container-app">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-3xl text-[#ffd9a8]">
                    {s.value}
                  </p>
                  <p className="text-xs text-[#ffd9a8]/70 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works (Detailed) ── */}
        <section className="section-py bg-white">
          <div className="container-app">
            <div className="text-center mb-10">
              <span className="badge-saffron mb-2 inline-block">
                The Process
              </span>
              <h2 className="heading-lg text-[#1a1209]">
                How We Ensure Authenticity
              </h2>
              <p className="text-[#6b5b45] max-w-xl mx-auto">
                Our rigorous process ensures every pooja is performed with
                complete devotion and authenticity.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  num: "01",
                  emoji: "🔍",
                  title: "Temple Verification",
                  desc: "We partner only with government-registered temples that have proper sanction and reputation. Every temple is visited and verified by our team before onboarding.",
                },
                {
                  num: "02",
                  emoji: "🧘",
                  title: "Pandit Vetting",
                  desc: "Pandits undergo a 3-stage verification — background check, knowledge test, and a trial pooja. Only 30% of applicants are accepted.",
                },
                {
                  num: "03",
                  emoji: "🎥",
                  title: "Video Recording Protocol",
                  desc: "Every pooja is recorded in HD following our video protocol — clear view of deity, sankalp announcement, and all rituals from start to finish.",
                },
                {
                  num: "04",
                  emoji: "✅",
                  title: "Quality Review",
                  desc: "Our quality team reviews each video before it is sent to the devotee. Substandard videos result in the pooja being repeated at no extra cost.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-[#fff8f0] border border-[#f0dcc8] rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] text-white flex items-center justify-center text-xl flex-shrink-0">
                    {step.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#ff7f0a] tracking-widest uppercase mb-1">
                      Step {step.num}
                    </p>
                    <h3 className="font-display font-semibold text-[#1a1209] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#6b5b45] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section className="section-py section-alt">
          <div className="container-app">
            <div className="text-center mb-10">
              <span className="badge-saffron mb-2 inline-block">
                What We Believe
              </span>
              <h2 className="heading-lg text-[#1a1209]">Our Core Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-[#f0dcc8] rounded-2xl p-6 hover:border-[#ffbd6e] hover:shadow-sm transition-all"
                >
                  <div className="text-3xl mb-3">{v.emoji}</div>
                  <h3 className="font-display font-semibold text-[#1a1209] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#6b5b45] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="section-py bg-white">
          <div className="container-app">
            <div className="text-center mb-10">
              <span className="badge-saffron mb-2 inline-block">
                Our Journey
              </span>
              <h2 className="heading-lg text-[#1a1209]">The Mandirlok Story</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-5 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7f0a] to-[#8b0000] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-[#f0dcc8] mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-xs font-bold text-[#ff7f0a] tracking-widest mb-1">
                      {m.year}
                    </p>
                    <h3 className="font-display font-semibold text-[#1a1209] mb-1">
                      {m.title}
                    </h3>
                    <p className="text-sm text-[#6b5b45] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="section-py section-alt">
          <div className="container-app">
            <div className="text-center mb-10">
              <span className="badge-saffron mb-2 inline-block">
                The People
              </span>
              <h2 className="heading-lg text-[#1a1209]">
                The Team Behind Mandirlok
              </h2>
              <p className="text-[#6b5b45]">
                A small, passionate team united by devotion and technology.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.bg} text-white font-display font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  >
                    {member.initial}
                  </div>
                  <h4 className="font-display font-semibold text-[#1a1209] text-sm">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[#6b5b45]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 bg-gradient-to-br from-[#8b0000] to-[#1a0a00] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 text-[200px] flex items-center justify-center select-none">
            🙏
          </div>
          <div className="container-app text-center text-white relative z-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
              Ready to Experience the Divine?
            </h2>
            <p className="text-[#ffd9a8] mb-8 max-w-xl mx-auto">
              Join 50,000+ devotees who have received blessings from India's
              most sacred temples through Mandirlok.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/temples" className="btn-saffron text-base px-8 py-3">
                🛕 Book a Pooja Now
              </Link>
              <Link
                href="/chadhava"
                className="bg-white/10 backdrop-blur border border-white/30 text-white hover:bg-white/20 font-semibold text-base px-8 py-3 rounded-full transition-all"
              >
                🌸 Make an Offering
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
