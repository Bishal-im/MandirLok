"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateSlot {
  date: Date;
  available: boolean;
  slots: number;
}

interface BookingDatePickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  minDaysAhead?: number;
  maxDaysAhead?: number;
}

function generateSlots(minAhead = 1, maxAhead = 30): DateSlot[] {
  return Array.from({ length: maxAhead }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + minAhead);
    d.setHours(0, 0, 0, 0);
    const slots = Math.floor(Math.random() * 6) + 1;
    return { date: d, available: slots > 0, slots };
  });
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingDatePicker({
  selectedDate,
  onSelect,
  minDaysAhead = 1,
  maxDaysAhead = 30,
}: BookingDatePickerProps) {
  const slots = generateSlots(minDaysAhead, maxDaysAhead);
  const [weekStart, setWeekStart] = useState(0); // index into slots

  const weekSlots = slots.slice(weekStart, weekStart + 7);
  const canGoBack = weekStart > 0;
  const canGoForward = weekStart + 7 < slots.length;

  const isSelected = (d: Date) =>
    selectedDate?.toDateString() === d.toDateString();
  const isToday = (d: Date) => new Date().toDateString() === d.toDateString();

  return (
    <div className="select-none">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-[#1a1209]">
          {MONTHS[weekSlots[0]?.date.getMonth()]}{" "}
          {weekSlots[0]?.date.getFullYear()}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setWeekStart((w) => Math.max(0, w - 7))}
            disabled={!canGoBack}
            className="w-7 h-7 rounded-full border border-[#f0dcc8] flex items-center justify-center text-[#6b5b45] hover:border-[#ff7f0a] hover:text-[#ff7f0a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() =>
              setWeekStart((w) => Math.min(slots.length - 7, w + 7))
            }
            disabled={!canGoForward}
            className="w-7 h-7 rounded-full border border-[#f0dcc8] flex items-center justify-center text-[#6b5b45] hover:border-[#ff7f0a] hover:text-[#ff7f0a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Weekday Labels ── */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {weekSlots.map((s) => (
          <div
            key={s.date.toISOString()}
            className="text-center text-[10px] font-bold text-[#b89b7a] uppercase"
          >
            {WEEKDAYS[s.date.getDay()]}
          </div>
        ))}
      </div>

      {/* ── Date Buttons ── */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekSlots.map((slot) => {
          const selected = isSelected(slot.date);
          const today = isToday(slot.date);
          const low = slot.slots <= 2;

          return (
            <button
              key={slot.date.toISOString()}
              onClick={() => slot.available && onSelect(slot.date)}
              disabled={!slot.available}
              className={cn(
                "flex flex-col items-center py-2 rounded-xl border text-xs transition-all",
                selected
                  ? "border-[#ff7f0a] bg-[#ff7f0a] text-white shadow-[0_4px_12px_rgba(255,127,10,0.4)]"
                  : slot.available
                    ? "border-[#f0dcc8] hover:border-[#ffbd6e] hover:bg-[#fff8f0] text-[#1a1209] cursor-pointer"
                    : "border-[#f0dcc8] bg-[#faf7f3] text-[#c5b5a0] cursor-not-allowed",
              )}
            >
              <span className="font-bold text-sm leading-none">
                {slot.date.getDate()}
              </span>
              {slot.available ? (
                <span
                  className={cn(
                    "text-[9px] mt-0.5 leading-none font-medium",
                    selected
                      ? "text-white/80"
                      : low
                        ? "text-red-500"
                        : "text-[#6b5b45]",
                  )}
                >
                  {low ? `${slot.slots} left` : `${slot.slots} slots`}
                </span>
              ) : (
                <span className="text-[9px] mt-0.5 leading-none text-[#c5b5a0]">
                  Full
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-[#6b5b45]">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#ff7f0a] inline-block" />{" "}
          Selected
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-white border border-[#f0dcc8] inline-block" />{" "}
          Available
        </span>
        <span className="flex items-center gap-1 text-red-400">
          ⚠ Limited slots
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-[#faf7f3] border border-[#f0dcc8] inline-block" />{" "}
          Unavailable
        </span>
      </div>
    </div>
  );
}
