import Link from "next/link";
import { MapPin } from "lucide-react";
import TempleImage from "@/components/ui/TempleImage";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";

export interface Temple {
  id: number;
  slug: string;
  name: string;
  location: string;
  state: string;
  imageKey: string;
  rating: number;
  reviews: number;
  poojaCount: number;
  badge?: string;
  badgeVariant?: "saffron" | "maroon" | "gold" | "green";
  deity: string;
  startingPrice: number;
}

interface TempleCardProps {
  temple: Temple;
  variant?: "default" | "compact" | "wide";
}

export default function TempleCard({
  temple,
  variant = "default",
}: TempleCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/temples/${temple.id}`}
        className="flex items-center gap-3 group p-3 rounded-xl hover:bg-[#fff8f0] transition-colors border border-transparent hover:border-[#ffd9a8]"
      >
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <TempleImage templeKey={temple.imageKey} className="w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-[#1a1209] group-hover:text-[#ff7f0a] transition-colors truncate">
            {temple.name}
          </h3>
          <p className="text-xs text-[#6b5b45] flex items-center gap-1">
            <MapPin size={10} className="text-[#ff7f0a]" />
            {temple.location}
          </p>
          <StarRating
            rating={temple.rating}
            size={10}
            showValue
            reviewCount={temple.reviews}
            className="mt-0.5"
          />
        </div>
        <span className="text-xs font-bold text-[#ff7f0a]">
          ₹{temple.startingPrice}
        </span>
      </Link>
    );
  }

  return (
    <Link href={`/temples/${temple.id}`} className="group block">
      <div className="bg-white border border-[#f0dcc8] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#ffbd6e] hover:shadow-[0_12px_40px_rgba(255,127,10,0.15)] hover:-translate-y-1">
        {/* ── Image ── */}
        <div className="relative h-48 overflow-hidden">
          <TempleImage
            templeKey={temple.imageKey}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            showOverlay
            overlayOpacity={0.25}
          />
          {/* Badge */}
          {temple.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={temple.badgeVariant ?? "saffron"}>
                {temple.badge}
              </Badge>
            </div>
          )}
          {/* Deity tag */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/50 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              {temple.deity}
            </span>
          </div>
        </div>

        {/* ── Info ── */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-[#1a1209] mb-1 group-hover:text-[#ff7f0a] transition-colors leading-tight">
            {temple.name}
          </h3>

          <div className="flex items-center gap-1 text-xs text-[#6b5b45] mb-2">
            <MapPin size={11} className="text-[#ff7f0a] flex-shrink-0" />
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
              {temple.poojaCount} Poojas
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#f0dcc8]">
            <div>
              <span className="text-[10px] text-[#6b5b45]">Starting from</span>
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
  );
}
