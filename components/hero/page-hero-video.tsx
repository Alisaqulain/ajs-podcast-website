"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BackgroundVideo } from "@/components/cinematic/background-video";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";
import type { AmbientClip } from "@/lib/youtube-ambient";

/**
 * Viral-style background video for inner pages.
 * TODO: Replace with final viral background video URL
 */
function resolvePageHeroVideoSrc() {
  return (SITE.pageHeroVideoUrl || SITE.heroVideoUrl || "").trim();
}

export type PageHeroVideoProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Extra UI below subtitle (search bars, chips, etc.) */
  children?: ReactNode;
  /** Muted rotating YouTube embeds when no `NEXT_PUBLIC_PAGE_HERO_VIDEO_URL` is set. */
  ambientClips?: AmbientClip[];
  align?: "center" | "left";
  compact?: boolean;
  className?: string;
};

function AnimatedGradientFallback() {
  return (
    <div className="hero-gradient-fallback absolute inset-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5efe6] via-[#faf7f2] to-[#fffdf9]" />
      <div className="hero-gradient-shimmer absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(201,161,74,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_60%,rgba(15,23,42,0.08),transparent_50%)]" />
    </div>
  );
}

export function PageHeroVideo({
  eyebrow,
  title,
  subtitle,
  children,
  ambientClips = [],
  align = "center",
  compact = false,
  className,
}: PageHeroVideoProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = resolvePageHeroVideoSrc();
  const hasAmbient = ambientClips.some((c) => c.videoId);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const showMp4 =
    Boolean(videoSrc) && shouldLoad && !videoFailed && !reduceMotion;
  const showYoutubeAmbient = !videoSrc && hasAmbient;

  useEffect(() => {
    if (!videoSrc || reduceMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "80px", threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [videoSrc, reduceMotion]);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setVideoFailed(true));
  }, []);

  useEffect(() => {
    if (!showMp4) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    tryPlay();
  }, [showMp4, tryPlay]);

  const centered = align === "center";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative isolate overflow-hidden border-b border-[#e8dfd3]",
        compact ? "min-h-[min(52vh,28rem)]" : "min-h-[min(72vh,36rem)]",
        className
      )}
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        {showMp4 ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            loop
            preload="none"
            onError={() => setVideoFailed(true)}
            onLoadedData={tryPlay}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : showYoutubeAmbient ? (
          <BackgroundVideo
            clips={ambientClips}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <AnimatedGradientFallback />
        )}

        {/* Cream + navy scrim for readable copy */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-[#fffdf9]/80 via-[#faf7f2]/70 to-[#0f172a]/60",
            (showMp4 || showYoutubeAmbient) &&
              "from-[#fffdf9]/85 via-[#faf7f2]/75 to-[#0f172a]/70"
          )}
          aria-hidden
        />
        <div
          className={cn(
            "absolute inset-0 bg-[#0f172a]/[0.15]",
            (showMp4 || showYoutubeAmbient) && "bg-[#0f172a]/[0.25]"
          )}
          aria-hidden
        />
      </div>

      {/* Centered premium text — no card panel */}
      <Container
        className={cn(
          "relative z-10 flex flex-col justify-center",
          compact
            ? "py-12 sm:py-16 md:py-20"
            : "py-16 sm:py-20 md:py-28",
          "pt-[max(6rem,env(safe-area-inset-top)+5rem)]"
        )}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full",
            centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
          )}
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-display font-semibold leading-[1.1] tracking-tight text-[#0f172a] text-balance drop-shadow-sm",
              eyebrow ? "mt-4" : "mt-0",
              compact
                ? "text-[clamp(1.75rem,5.5vw,2.75rem)]"
                : "text-[clamp(1.85rem,6vw,3.5rem)]"
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <div
              className={cn(
                "mt-4 text-pretty text-base leading-relaxed text-[#334155] sm:mt-5 sm:text-lg",
                centered && "mx-auto max-w-2xl"
              )}
            >
              {subtitle}
            </div>
          ) : null}
          {children ? (
            <div className={cn("mt-8", centered && "flex flex-col items-center")}>
              {children}
            </div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
