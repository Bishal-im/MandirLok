import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 14,
  showValue = false,
  reviewCount,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;

          return (
            <Star
              key={i}
              size={size}
              className={cn(
                filled
                  ? "text-[#f0bc00] fill-[#f0bc00]"
                  : partial
                    ? "text-[#f0bc00] fill-[#f0bc00]/40"
                    : "text-[#e5d5c0]",
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-[#1a1209]">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-[#6b5b45]">
          (
          {reviewCount >= 1000
            ? `${(reviewCount / 1000).toFixed(1)}k`
            : reviewCount}
          )
        </span>
      )}
    </div>
  );
}
