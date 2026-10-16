"use client";

import { Mic, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroVideoPlaceholderProps = {
  className?: string;
  label?: string;
  onPlayClick?: () => void;
  compact?: boolean;
};

export function HeroVideoPlaceholder({
  className,
  label = "Anushtan Studio",
  onPlayClick,
  compact = false,
}: HeroVideoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        "bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-950",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-2/3 w-2/3 rounded-full bg-sky-400/25 blur-[80px] animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-cyan-400/20 blur-[90px] animate-blob animation-delay-2000"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] px-8 pb-6 opacity-25 sm:gap-1 sm:px-16 sm:pb-10"
        aria-hidden
      >
        {Array.from({ length: compact ? 24 : 40 }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-sky-300"
            style={{
              height: `${12 + Math.sin(i * 0.55) * 18 + (i % 5) * 4}px`,
              animation: `wave-pulse ${1.2 + (i % 7) * 0.15}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-950/50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-sm sm:text-xs">
          <Mic className="h-3 w-3" aria-hidden />
          {label}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-10 text-center sm:pt-0">
        <p className="hidden font-display text-sm font-medium tracking-wide text-sky-200/80 sm:block sm:text-base">
          Anushtan
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl md:text-2xl">
          Talk. Record. Publish.
        </p>

        <button
          type="button"
          onClick={onPlayClick}
          className={cn(
            "group relative mt-6 flex items-center justify-center rounded-full",
            "border-2 border-white/70 bg-white/95 text-sky-900",
            "shadow-[0_8px_32px_rgba(56,189,248,0.4)]",
            "transition duration-300 hover:scale-110 hover:border-sky-300 hover:shadow-[0_12px_40px_rgba(56,189,248,0.5)]",
            compact ? "h-14 w-14" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
          )}
          aria-label="Watch episodes"
        >
          <span
            className="absolute inset-0 rounded-full bg-sky-400/25 opacity-0 transition group-hover:opacity-100"
            aria-hidden
          />
          <Play
            className={cn(
              "relative ml-0.5 fill-current",
              compact ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8"
            )}
          />
        </button>

        <p className="mt-4 text-xs text-sky-200/60 sm:text-sm">
          Tap to watch episodes recorded at the studio
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-950/85 via-transparent to-sky-900/25"
        aria-hidden
      />
    </div>
  );
}
