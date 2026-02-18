"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Real temple photos from Wikimedia Commons (public domain / CC licensed)
export const TEMPLE_IMAGES: Record<
  string,
  { src: string; alt: string; credit?: string }
> = {
  "kashi-vishwanath": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg",
    alt: "Kashi Vishwanath Temple, Varanasi",
    credit: "Wikimedia Commons",
  },
  "tirupati-balaji": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Tirumala_temple_shoot.jpg/800px-Tirumala_temple_shoot.jpg",
    alt: "Tirupati Balaji Temple, Andhra Pradesh",
    credit: "Wikimedia Commons",
  },
  siddhivinayak: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SiddhivinayakTemple.jpg/800px-SiddhivinayakTemple.jpg",
    alt: "Shree Siddhivinayak Temple, Mumbai",
    credit: "Wikimedia Commons",
  },
  "vaishno-devi": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Vaishno-devi-bhavan.jpg/800px-Vaishno-devi-bhavan.jpg",
    alt: "Vaishno Devi Temple, Katra",
    credit: "Wikimedia Commons",
  },
  somnath: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Somnath_temple_evening.jpg/800px-Somnath_temple_evening.jpg",
    alt: "Somnath Temple, Gujarat",
    credit: "Wikimedia Commons",
  },
  "shirdi-sai": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Shirdi_Sai_Baba_Temple.jpg/800px-Shirdi_Sai_Baba_Temple.jpg",
    alt: "Shirdi Sai Baba Temple, Maharashtra",
    credit: "Wikimedia Commons",
  },
  dwarka: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dwarkadhish_Temple_%281%29.jpg/800px-Dwarkadhish_Temple_%281%29.jpg",
    alt: "Dwarkadhish Temple, Dwarka",
    credit: "Wikimedia Commons",
  },
  mahakaleshwar: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mahakaleshwar_Jyotirlinga.jpg/800px-Mahakaleshwar_Jyotirlinga.jpg",
    alt: "Mahakaleshwar Temple, Ujjain",
    credit: "Wikimedia Commons",
  },
  badrinath: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Badrinath_Temple.jpg/800px-Badrinath_Temple.jpg",
    alt: "Badrinath Temple, Uttarakhand",
    credit: "Wikimedia Commons",
  },
  meenakshi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Meenakshi_Amman_Temple_Madurai.jpg/800px-Meenakshi_Amman_Temple_Madurai.jpg",
    alt: "Meenakshi Amman Temple, Madurai",
    credit: "Wikimedia Commons",
  },
  kedarnath: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Kedarnath_Temple.jpg/800px-Kedarnath_Temple.jpg",
    alt: "Kedarnath Temple, Uttarakhand",
    credit: "Wikimedia Commons",
  },
  "golden-temple": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Golden_Temple_reflected_in_Lake.jpg/800px-Golden_Temple_reflected_in_Lake.jpg",
    alt: "Golden Temple, Amritsar",
    credit: "Wikimedia Commons",
  },
  default: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg",
    alt: "Hindu Temple",
  },
};

interface TempleImageProps {
  templeKey?: string;
  src?: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  showOverlay?: boolean;
  overlayOpacity?: number;
}

export default function TempleImage({
  templeKey,
  src: customSrc,
  alt: customAlt,
  className,
  objectFit = "cover",
  showOverlay = false,
  overlayOpacity = 0.3,
}: TempleImageProps) {
  const [errored, setErrored] = useState(false);

  const imageData = templeKey
    ? (TEMPLE_IMAGES[templeKey] ?? TEMPLE_IMAGES["default"])
    : null;
  const src = errored
    ? TEMPLE_IMAGES["default"].src
    : (customSrc ?? imageData?.src ?? TEMPLE_IMAGES["default"].src);
  const alt = customAlt ?? imageData?.alt ?? "Temple";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        className={cn(
          "w-full h-full transition-transform duration-500 group-hover:scale-105",
          objectFit === "cover" ? "object-cover" : "object-contain",
        )}
        loading="lazy"
      />
      {showOverlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          style={{ opacity: overlayOpacity > 0 ? 1 : 0 }}
        />
      )}
    </div>
  );
}
