import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "saffron" | "maroon" | "gold" | "green" | "red" | "blue" | "ghost";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "saffron",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    saffron: "bg-[#fff8f0] text-[#ff7f0a] border border-[#ffd9a8]",
    maroon: "bg-[#fff0f0] text-[#8b0000] border border-[#ffcaca]",
    gold: "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]",
    green: "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]",
    red: "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]",
    blue: "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]",
    ghost: "bg-white/80 text-[#6b5b45] border border-[#f0dcc8]",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
