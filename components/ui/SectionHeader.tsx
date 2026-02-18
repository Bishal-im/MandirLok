import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClass?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClass,
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-2 mb-10", alignClass, className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 bg-[#fff8f0] border border-[#ffd9a8] text-[#ff7f0a] text-xs font-semibold rounded-full px-3 py-1">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-bold text-[#1a1209] text-2xl md:text-3xl lg:text-4xl leading-tight",
          titleClass,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-[#6b5b45] leading-relaxed max-w-xl",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
