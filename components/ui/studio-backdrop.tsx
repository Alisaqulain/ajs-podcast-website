import { cn } from "@/lib/utils";

/** Deterministic values so server and client markup match. */
const PARTICLES = [
  { left: "6%", size: 6, duration: 14, delay: 0 },
  { left: "14%", size: 4, duration: 18, delay: 3 },
  { left: "23%", size: 8, duration: 16, delay: 6 },
  { left: "31%", size: 5, duration: 20, delay: 1.5 },
  { left: "42%", size: 4, duration: 15, delay: 8 },
  { left: "51%", size: 7, duration: 19, delay: 4 },
  { left: "60%", size: 5, duration: 17, delay: 10 },
  { left: "68%", size: 9, duration: 21, delay: 2 },
  { left: "77%", size: 4, duration: 14, delay: 7 },
  { left: "85%", size: 6, duration: 18, delay: 5 },
  { left: "93%", size: 5, duration: 16, delay: 9 },
];

const BAR_COUNT = 64;

type StudioBackdropProps = {
  variant?: "light" | "dark";
  /** Show the equalizer bars along the bottom edge. */
  waveform?: boolean;
  /** Show the rotating rings + pings. */
  rings?: boolean;
  className?: string;
};

/**
 * Decorative animated layer for sections: drifting glow orbs, rotating
 * "speaker" rings, rising particles, and a live-looking equalizer.
 * Place inside a `relative overflow-hidden` parent.
 */
export function StudioBackdrop({
  variant = "light",
  waveform = true,
  rings = true,
  className,
}: StudioBackdropProps) {
  const dark = variant === "dark";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* glow orbs */}
      <div
        className={cn(
          "absolute -left-40 top-[-10%] h-[34rem] w-[34rem] animate-blob rounded-full blur-[110px]",
          dark ? "bg-sky-500/30" : "bg-sky-300/35"
        )}
      />
      <div
        className={cn(
          "absolute -right-40 bottom-[-15%] h-[30rem] w-[30rem] animate-blob animation-delay-2000 rounded-full blur-[120px]",
          dark ? "bg-cyan-400/20" : "bg-cyan-200/40"
        )}
      />

      {/* faint grid */}
      <div
        className={cn("absolute inset-0", dark ? "opacity-[0.07]" : "opacity-[0.05]")}
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.9) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {rings ? (
        <>
          <div
            className={cn(
              "studio-spin-slow absolute -right-32 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full border border-dashed",
              dark ? "border-sky-300/20" : "border-sky-400/25"
            )}
          />
          <div
            className={cn(
              "studio-spin-reverse absolute -right-12 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border-2 border-dotted",
              dark ? "border-cyan-300/20" : "border-sky-300/30"
            )}
          />
          <div
            className={cn(
              "studio-spin-slow absolute -left-24 top-[20%] h-[20rem] w-[20rem] rounded-full border border-dashed",
              dark ? "border-sky-300/15" : "border-sky-400/20"
            )}
          />
          {[0, 1.5, 3].map((delay) => (
            <span
              key={delay}
              className={cn(
                "studio-ring-ping absolute left-[12%] top-[30%] h-64 w-64 rounded-full border",
                dark ? "border-sky-300/40" : "border-sky-400/40"
              )}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </>
      ) : null}

      {/* rising particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.left}
          className={cn(
            "studio-particle absolute bottom-[-20px] rounded-full",
            dark ? "bg-sky-300/60" : "bg-sky-400/50"
          )}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: dark ? "0 0 12px rgba(125,211,252,0.8)" : "0 0 10px rgba(56,189,248,0.5)",
          }}
        />
      ))}

      {/* equalizer along the bottom */}
      {waveform ? (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex h-28 items-end justify-between gap-[3px] px-2",
            dark ? "opacity-40" : "opacity-30"
          )}
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)",
          }}
        >
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "studio-eq-bar w-full max-w-[6px] rounded-t-full",
                dark
                  ? "bg-gradient-to-t from-sky-500 to-cyan-200"
                  : "bg-gradient-to-t from-sky-500 to-sky-200"
              )}
              style={{
                height: `${30 + ((i * 37) % 70)}%`,
                animationDuration: `${1.1 + ((i * 13) % 9) * 0.12}s`,
                animationDelay: `${((i * 7) % 11) * -0.15}s`,
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
