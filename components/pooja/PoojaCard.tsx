import Link from "next/link";
import { Clock, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface Pooja {
  id: number;
  name: string;
  temple: string;
  templeId: number;
  emoji: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  reviews: number;
  benefit: string;
  tag: string;
  tagVariant: "saffron" | "maroon" | "gold" | "green";
  description: string;
  category: string;
}

interface PoojaCardProps {
  pooja: Pooja;
  variant?: "default" | "horizontal" | "compact";
}

export default function PoojaCard({
  pooja,
  variant = "default",
}: PoojaCardProps) {
  // Discount calculation removed as it's no longer needed
  // const discount = Math.round(
  //   ((pooja.originalPrice - pooja.price) / pooja.originalPrice) * 100,
  // );

  if (variant === "compact") {
    return (
      <Link
        href={`/poojas/${pooja.id}`}
        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#f0dcc8] hover:border-[#ffbd6e] hover:shadow-sm transition-all group"
      >
        <div className="w-10 h-10 bg-[#fff8f0] rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {pooja.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1a1209] truncate group-hover:text-[#ff7f0a] transition-colors">
            {pooja.name}
          </p>
          <p className="text-[10px] text-[#6b5b45]">
            {pooja.duration} · {pooja.benefit}
          </p>
        </div>
        {/* Price tag removed */}
        {/* <span className="text-sm font-bold text-[#ff7f0a] flex-shrink-0">
          ₹{pooja.price.toLocaleString()}
        </span> */}
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/poojas/${pooja.id}`}
        className="flex items-center gap-4 bg-white border border-[#f0dcc8] rounded-2xl p-4 hover:border-[#ffbd6e] hover:shadow-[0_4px_20px_rgba(255,127,10,0.1)] transition-all group"
      >
        <div className="w-16 h-16 bg-[#fff8f0] rounded-xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {pooja.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <h3 className="font-display font-semibold text-[#1a1209] group-hover:text-[#ff7f0a] transition-colors">
              {pooja.name}
            </h3>
            <Badge variant={pooja.tagVariant} size="sm">
              {pooja.tag}
            </Badge>
          </div>
          <p className="text-xs text-[#ff7f0a] mb-1">🛕 {pooja.temple}</p>
          <div className="flex items-center gap-3 text-xs text-[#6b5b45]">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-[#ff7f0a]" />
              {pooja.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} className="text-[#f0bc00] fill-[#f0bc00]" />
              {pooja.rating} ({(pooja.reviews / 1000).toFixed(1)}k)
            </span>
            <span>✨ {pooja.benefit}</span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          {/* Price and discount section completely removed */}
          {/* <div className="flex items-baseline gap-1.5 justify-end">
            <span className="text-lg font-bold text-[#ff7f0a]">
              ₹{pooja.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#b89b7a] line-through">
              ₹{pooja.originalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-green-600 font-medium">
            {discount}% off
          </span> */}
          <div className="mt-2">
            <span className="inline-block bg-gradient-to-r from-[#ff7f0a] to-[#ff9b30] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Participate Puja
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // default card
  return (
    <Link
      href={`/poojas/${pooja.id}`}
      className="bg-white border border-[#f0dcc8] rounded-2xl p-5 hover:border-[#ffbd6e] hover:shadow-[0_8px_30px_rgba(255,127,10,0.12)] hover:-translate-y-1 transition-all duration-300 group block"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-14 h-14 bg-[#fff8f0] rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {pooja.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1 mb-0.5">
            <h3 className="font-display font-semibold text-[#1a1209] text-sm leading-tight group-hover:text-[#ff7f0a] transition-colors">
              {pooja.name}
            </h3>
            <Badge
              variant={pooja.tagVariant}
              size="sm"
              className="flex-shrink-0"
            >
              {pooja.tag}
            </Badge>
          </div>
          <p className="text-xs text-[#ff7f0a] font-medium">
            🛕 {pooja.temple}
          </p>
        </div>
      </div>

      <p className="text-xs text-[#6b5b45] mb-3 line-clamp-2 leading-relaxed">
        {pooja.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-[#6b5b45] mb-3">
        <span className="flex items-center gap-1">
          <Clock size={11} className="text-[#ff7f0a]" />
          {pooja.duration}
        </span>
        <span className="flex items-center gap-1">
          <Star size={11} className="text-[#f0bc00] fill-[#f0bc00]" />
          {pooja.rating} ({(pooja.reviews / 1000).toFixed(1)}k)
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#f0dcc8]">
        {/* Price section completely removed */}
        {/* <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[#ff7f0a]">
              ₹{pooja.price.toLocaleString()}
            </span>
            <span className="text-xs text-[#b89b7a] line-through">
              ₹{pooja.originalPrice.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-green-600 font-medium">
            {discount}% savings
          </span>
        </div> */}
        <div></div> {/* Empty div for spacing */}
        <button className="bg-gradient-to-r from-[#ff7f0a] to-[#ff9b30] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-[0_4px_15px_rgba(255,127,10,0.4)] transition-all">
          Participate Puja
        </button>
      </div>
    </Link>
  );
}
