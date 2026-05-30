"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOKING_WEEKDAYS } from "@/lib/booking-rules";
import { formatSlotLabel, ymd } from "@/lib/booking-client";

type Props = {
  idPrefix?: string;
  dateStr: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  compact?: boolean;
};

export function BookingDateTimePicker({
  idPrefix = "bk",
  dateStr,
  time,
  onDateChange,
  onTimeChange,
  compact = false,
}: Props) {
  const [calMonth, setCalMonth] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [slotLoading, setSlotLoading] = useState(false);

  useEffect(() => {
    if (!dateStr) {
      setSlots([]);
      onTimeChange("");
      return;
    }
    let cancelled = false;
    (async () => {
      setSlotLoading(true);
      try {
        const res = await fetch(
          `/api/bookings/availability?date=${encodeURIComponent(dateStr)}`
        );
        const data = (await res.json()) as { slots?: string[] };
        if (!cancelled) {
          setSlots(Array.isArray(data.slots) ? data.slots : []);
          onTimeChange("");
        }
      } finally {
        if (!cancelled) setSlotLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset time when date changes
  }, [dateStr]);

  const calendarCells = useMemo(() => {
    const y = calMonth.getFullYear();
    const m = calMonth.getMonth();
    const firstDow = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells: { day: number | null; date: Date | null }[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ day: null, date: null });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, date: new Date(y, m, d) });
    }
    return cells;
  }, [calMonth]);

  function isSelectable(d: Date) {
    const day = d.getDay();
    if (!BOOKING_WEEKDAYS.includes(day as 3 | 5)) return false;
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    if (d < startToday) return false;
    return true;
  }

  return (
    <div
      className={cn(
        "grid gap-8",
        compact ? "lg:grid-cols-1" : "lg:grid-cols-2"
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
          Date
        </p>
        <div className="mt-3 rounded-3xl border border-luxury-border bg-luxury-bg p-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              className="rounded-xl p-2 text-luxury-heading hover:bg-muted"
              onClick={() =>
                setCalMonth(
                  new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1)
                )
              }
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-luxury-heading">
              {calMonth.toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              className="rounded-xl p-2 text-luxury-heading hover:bg-muted"
              onClick={() =>
                setCalMonth(
                  new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1)
                )
              }
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-luxury-muted">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {calendarCells.map((c, idx) => {
              if (!c.date || c.day == null) {
                return <span key={`e-${idx}`} className="h-9" />;
              }
              const ok = isSelectable(c.date);
              const isSel = dateStr === ymd(c.date);
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!ok}
                  onClick={() => {
                    if (ok && c.date) onDateChange(ymd(c.date));
                  }}
                  className={cn(
                    "flex h-9 items-center justify-center rounded-xl text-sm transition",
                    !ok && "cursor-not-allowed text-luxury-border",
                    ok &&
                      !isSel &&
                      "text-luxury-body hover:bg-brand-gold/15 hover:text-luxury-heading",
                    isSel &&
                      "bg-gold-gradient font-semibold text-[#1A1A1A] shadow-md"
                  )}
                >
                  {c.day}
                </button>
              );
            })}
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-luxury-muted">
            <CalendarDays className="h-3.5 w-3.5" />
            Wednesdays &amp; Fridays only · past dates disabled
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
          Time (IST)
        </p>
        <div
          className={cn(
            "mt-3 rounded-3xl border border-luxury-border bg-luxury-bg p-4",
            compact ? "min-h-[160px]" : "min-h-[200px]"
          )}
        >
          <AnimatePresence mode="wait">
            {!dateStr ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center text-sm text-luxury-muted"
              >
                Pick a date to see open slots.
              </motion.p>
            ) : slotLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold-deep" />
              </div>
            ) : slots.length === 0 ? (
              <p className="py-12 text-center text-sm text-luxury-muted">
                No slots left on this day. Try another Wednesday or Friday.
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    id={`${idPrefix}-slot-${s}`}
                    onClick={() => onTimeChange(s)}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-sm font-medium transition",
                      time === s
                        ? "border-brand-gold/50 bg-brand-gold/15 text-luxury-heading"
                        : "border-luxury-border bg-surface text-luxury-body hover:border-brand-gold/40 hover:bg-muted"
                    )}
                  >
                    {formatSlotLabel(s)}
                  </button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
