import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = false,
  padding = "md",
  onClick,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6 md:p-8",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-[#f0dcc8] rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)]",
        hover &&
          "transition-all duration-300 hover:border-[#ffbd6e] hover:shadow-[0_8px_30px_rgba(255,127,10,0.12)] hover:-translate-y-1 cursor-pointer",
        paddings[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
