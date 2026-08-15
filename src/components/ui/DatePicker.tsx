"use client";

import { useState, useRef, useEffect } from "react";

interface DatePickerProps {
  value: string; // yyyy-mm-dd
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: Date;
}

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISO(s: string): Date | null {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function formatDE(s: string): string {
  const d = parseISO(s);
  if (!d) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function DatePicker({ value, onChange, placeholder = "Datum wählen", minDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = parseISO(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ?? today;

  const [viewMonth, setViewMonth] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Mo=0 … So=6
  const leadingBlanks = (firstDay.getDay() + 6) % 7;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm sm:text-base text-left flex items-center justify-between gap-2 transition-all duration-150 outline-none ${
          open
            ? "border-blue-500 ring-2 ring-blue-500/15 bg-white"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? formatDE(value) : placeholder}
        </span>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full sm:w-72 rounded-xl border border-gray-100 bg-white shadow-xl p-3.5">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={prevMonth}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Vorheriger Monat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-xs font-semibold text-gray-900">
              {MONTHS[month]} {year}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Nächster Monat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 mb-0.5">
            {WEEKDAYS.map((w) => (
              <div key={w} className="h-7 flex items-center justify-center text-[11px] font-medium text-gray-400">
                {w}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell) return <div key={`b${i}`} className="h-8" />;
              const isSunday = cell.getDay() === 0;
              const disabled = cell < min || isSunday;
              const isSelected = selected ? isSameDay(cell, selected) : false;
              const isToday = isSameDay(cell, today);
              return (
                <button
                  key={toISO(cell)}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(toISO(cell));
                    setOpen(false);
                  }}
                  className={`h-8 rounded-md text-[13px] font-medium transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : isToday
                      ? "text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                      : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  {cell.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
            {today.getDay() !== 0 && (
              <button
                type="button"
                onClick={() => {
                  onChange(toISO(today));
                  setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                  setOpen(false);
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Heute
              </button>
            )}
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="ml-auto text-xs font-medium text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                Löschen
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
