"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  search: string;
  state: string;
  deity: string;
  sortBy: string;
}

interface TempleFiltersProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  totalResults: number;
}

const STATES = [
  "All States",
  "Uttar Pradesh",
  "Maharashtra",
  "Gujarat",
  "Uttarakhand",
  "Andhra Pradesh",
  "Tamil Nadu",
  "Delhi",
  "Madhya Pradesh",
  "J&K",
];
const DEITIES = [
  "All Deities",
  "Shiva",
  "Vishnu",
  "Ganesh",
  "Devi",
  "Sai Baba",
  "Ram",
  "Krishna",
];
const SORT = [
  "Most Popular",
  "Highest Rated",
  "Price: Low to High",
  "Most Poojas",
];
const QUICK = [
  "All",
  "Jyotirlinga",
  "Shakti Peeth",
  "Char Dham",
  "Trending",
  "Near Me",
];

export default function TempleFilters({
  filters,
  onChange,
  totalResults,
}: TempleFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    filters.state !== "All States" ||
    filters.deity !== "All Deities" ||
    filters.search;

  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  const reset = () =>
    onChange({
      search: "",
      state: "All States",
      deity: "All Deities",
      sortBy: "Most Popular",
    });

  return (
    <div className="space-y-4">
      {/* ── Search + Toggle ── */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b89b7a]"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search temples, city, deity…"
            className="w-full pl-10 pr-4 py-2.5 border border-[#f0dcc8] rounded-xl text-sm bg-white outline-none focus:border-[#ff7f0a] focus:ring-2 focus:ring-[#ff7f0a]/10 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => update("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b89b7a] hover:text-[#ff7f0a]"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
            showAdvanced
              ? "border-[#ff7f0a] bg-[#fff8f0] text-[#ff7f0a]"
              : "border-[#f0dcc8] bg-white text-[#6b5b45] hover:border-[#ffbd6e]",
          )}
        >
          <SlidersHorizontal size={15} />
          Filters{" "}
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-[#ff7f0a] rounded-full" />
          )}
        </button>
      </div>

      {/* ── Quick Filter Chips ── */}
      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border",
              q === "All"
                ? "bg-[#ff7f0a] text-white border-[#ff7f0a]"
                : "bg-white text-[#6b5b45] border-[#f0dcc8] hover:border-[#ffbd6e] hover:text-[#ff7f0a]",
            )}
          >
            {q}
          </button>
        ))}
      </div>

      {/* ── Advanced Filters ── */}
      {showAdvanced && (
        <div className="bg-white border border-[#f0dcc8] rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
              State
            </label>
            <select
              value={filters.state}
              onChange={(e) => update("state", e.target.value)}
              className="w-full border border-[#f0dcc8] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[#ff7f0a]"
            >
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
              Deity
            </label>
            <select
              value={filters.deity}
              onChange={(e) => update("deity", e.target.value)}
              className="w-full border border-[#f0dcc8] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[#ff7f0a]"
            >
              {DEITIES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#6b5b45] uppercase tracking-widest mb-1.5">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => update("sortBy", e.target.value)}
              className="w-full border border-[#f0dcc8] rounded-xl px-3 py-2 text-sm bg-white outline-none focus:border-[#ff7f0a]"
            >
              {SORT.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {hasActiveFilters && (
            <div className="sm:col-span-3 flex justify-end">
              <button
                onClick={reset}
                className="text-xs text-[#ff7f0a] hover:underline flex items-center gap-1"
              >
                <X size={12} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Results count ── */}
      <p className="text-xs text-[#6b5b45]">
        Showing <strong className="text-[#1a1209]">{totalResults}</strong>{" "}
        temples
        {hasActiveFilters && " matching your filters"}
      </p>
    </div>
  );
}
