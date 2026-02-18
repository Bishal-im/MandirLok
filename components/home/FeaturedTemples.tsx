import Link from "next/link";
import { MapPin } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import TempleImage from "@/components/ui/TempleImage";

const temples = [
  {
    id: 1,
    name: "Kashi Vishwanath",
    location: "Varanasi, UP",
    imageKey: "kashi-vishwanath",
    rating: 4.9,
    reviews: 12400,
    poojas: 24,
    badge: "Most Popular",
    badgeVariant: "maroon" as const,
    startingPrice: 301,
    deity: "Shiva",
  },
  {
    id: 2,
    name: "Tirupati Balaji",
    location: "Tirupati, AP",
    imageKey: "tirupati-balaji",
    rating: 4.9,
    reviews: 23100,
    poojas: 18,
    badge: "Top Rated",
    badgeVariant: "saffron" as const,
    startingPrice: 501,
    deity: "Vishnu",
  },
  {
    id: 3,
    name: "Siddhivinayak",
    location: "Mumbai, MH",
    imageKey: "siddhivinayak",
    rating: 4.8,
    reviews: 9870,
    poojas: 15,
    badge: "Trending",
    badgeVariant: "gold" as const,
    startingPrice: 251,
    deity: "Ganesh",
  },
  {
    id: 4,
    name: "Vaishno Devi",
    location: "Katra, J&K",
    imageKey: "vaishno-devi",
    rating: 4.9,
    reviews: 18200,
    poojas: 12,
    badge: "Navratri Special",
    badgeVariant: "maroon" as const,
    startingPrice: 501,
    deity: "Devi",
  },
];

export default function FeaturedTemples() {
  return (
    <section className="section-py bg-white">
      <div className="container-app">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-[#fff8f0] border border-[#ffd9a8] text-[#ff7f0a] text-xs font-semibold rounded-full px-3 py-1 mb-3">
            🛕 Featured Temples
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1a1209] mb-3">
            Sacred Temples Across India
          </h2>
          <p className="text-[#6b5b45] max-w-xl mx-auto">
            Choose from India's most revered temples. Authentic pandits, sacred
            rituals, divine blessings — all delivered on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {temples.map((temple) => (
            <Link
              key={temple.id}
              href={`/temples/${temple.id}`}
              className="group block"
            >
              <div className="bg-white border border-[#f0dcc8] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#ffbd6e] hover:shadow-[0_12px_40px_rgba(255,127,10,0.15)] hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <TempleImage
                    templeKey={temple.imageKey}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    showOverlay
                    overlayOpacity={0.2}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={temple.badgeVariant} size="sm">
                      {temple.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/50 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {temple.deity}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-[#1a1209] mb-1 group-hover:text-[#ff7f0a] transition-colors">
                    {temple.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-[#6b5b45] mb-2">
                    <MapPin size={11} className="text-[#ff7f0a]" />
                    {temple.location}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <StarRating
                      rating={temple.rating}
                      size={12}
                      showValue
                      reviewCount={temple.reviews}
                    />
                    <Badge variant="saffron" size="sm">
                      {temple.poojas} Poojas
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#f0dcc8]">
                    <div>
                      <p className="text-[10px] text-[#6b5b45]">
                        Starting from
                      </p>
                      <p className="text-base font-bold text-[#ff7f0a]">
                        ₹{temple.startingPrice}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-[#ff7f0a] to-[#ff9b30] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm hover:shadow-[0_4px_15px_rgba(255,127,10,0.4)] transition-all">
                      Book Now →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/temples"
            className="btn-outline-saffron text-sm inline-flex items-center gap-2"
          >
            View All 200+ Temples →
          </Link>
        </div>
      </div>
    </section>
  );
}
