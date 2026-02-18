"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "saffron" | "maroon" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "saffron",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
      saffron:
        "bg-gradient-to-r from-[#ff7f0a] to-[#ff9b30] text-white shadow-[0_4px_15px_rgba(255,127,10,0.3)] hover:shadow-[0_6px_25px_rgba(255,127,10,0.45)] hover:-translate-y-0.5 focus:ring-[#ff7f0a]",
      maroon:
        "bg-gradient-to-r from-[#8b0000] to-[#c74900] text-white shadow-[0_4px_15px_rgba(139,0,0,0.25)] hover:shadow-[0_6px_25px_rgba(139,0,0,0.35)] hover:-translate-y-0.5 focus:ring-[#8b0000]",
      gold: "bg-gradient-to-r from-[#f0bc00] to-[#ffd60a] text-[#1a1209] shadow-[0_4px_15px_rgba(240,188,0,0.3)] hover:-translate-y-0.5 focus:ring-[#f0bc00]",
      outline:
        "border-2 border-[#ff7f0a] text-[#ff7f0a] bg-transparent hover:bg-[#ff7f0a] hover:text-white focus:ring-[#ff7f0a]",
      ghost: "text-[#ff7f0a] hover:bg-[#fff8f0] focus:ring-[#ff7f0a]",
    };

    const sizes = {
      sm: "text-xs px-4 py-1.5",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-7 py-3",
      xl: "text-lg px-9 py-4",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;


























