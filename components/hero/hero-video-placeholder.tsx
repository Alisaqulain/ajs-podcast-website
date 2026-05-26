"use client";

import { Mic2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroVideoPlaceholderProps = {
  className?: string;
  /** Shown on the placeholder badge */
  label?: string;
  onPlayClick?: () => void;
  /** When true, renders a smaller variant for inner-page previews */
  compact?: boolean;
};

/**
 * Premium podcast-trailer placeholder — CSS-only, no screenshot assets.
 * TODO: Replace placeholder with final client shoot video
 */
export function HeroVideoPlaceholder({
  className,
  label = "Founder Podcast Trailer",
  onPlayClick,
  compact = false,
}: HeroVideoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        "bg-gradient-to-br from-[#0f172a] via-[#1a2332] to-[#0c1220]",
        className
      )}
    >
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-2/3 w-2/3 rounded-full bg-brand-gold/20 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-2/3 w-2/3 rounded-full bg-[#c9a14a]/15 blur-[90px]"
        aria-hidden
      />

      {/* Subtle studio grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,161,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,161,74,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      {/* Decorative waveform bars */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] px-8 pb-6 opacity-20 sm:gap-1 sm:px-16 sm:pb-10"
        aria-hidden
      >
        {Array.from({ length: compact ? 24 : 40 }).map((_, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full bg-brand-gold-light"
            style={{
              height: `${12 + Math.sin(i * 0.55) * 18 + (i % 5) * 4}px`,
              animation: `wave-pulse ${1.2 + (i % 7) * 0.15}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.04}s`,
            }}
          />
        ))}
      </div>

      {/* Top badge */}
      <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-[#0f172a]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold-light backdrop-blur-sm sm:text-xs">
          <Mic2 className="h-3 w-3" aria-hidden />
          {label}
        </span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-sm font-medium tracking-wide text-white/70 sm:text-base">
          Premium founder feature
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl md:text-2xl">
          Your story. Cinematic production.
        </p>

        <button
          type="button"
          onClick={onPlayClick}
          className={cn(
            "group relative mt-6 flex items-center justify-center rounded-full",
            "border-2 border-white/60 bg-white/95 text-[#0f172a]",
            "shadow-[0_8px_32px_rgba(201,161,74,0.35)]",
            "transition duration-300 hover:scale-105 hover:border-brand-gold hover:shadow-[0_12px_40px_rgba(201,161,74,0.45)]",
            compact ? "h-14 w-14" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
          )}
          aria-label="Play podcast trailer preview"
        >
          <span
            className="absolute inset-0 rounded-full bg-brand-gold/20 opacity-0 transition group-hover:opacity-100"
            aria-hidden
          />
          <Play
            className={cn(
              "relative ml-0.5 fill-current",
              compact ? "h-6 w-6" : "h-7 w-7 sm:h-8 sm:w-8"
            )}
          />
        </button>

        <p className="mt-4 text-xs text-white/50 sm:text-sm">
          Final shoot video coming soon
        </p>
      </div>

      {/* Bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c1220]/80 via-transparent to-[#0f172a]/30"
        aria-hidden
      />
    </div>
  );
}
