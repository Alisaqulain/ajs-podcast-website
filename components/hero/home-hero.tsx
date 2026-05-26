"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/hero/cta-button";
import { HeroVideoPlaceholder } from "@/components/hero/hero-video-placeholder";
import { SITE } from "@/lib/site";

const STATS_PILLS = [
  "500+ Founders Featured",
  "10M+ Views Generated",
  "#1 Founder Podcast Platform",
  "Trusted by Entrepreneurs",
] as const;

/**
 * Homepage hero media source.
 * TODO: Replace placeholder with final client shoot video
 */
const HERO_VIDEO_SRC = SITE.homeHeroVideoUrl;

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const hasVideo = Boolean(HERO_VIDEO_SRC) && !videoFailed;

  useEffect(() => {
    if (!HERO_VIDEO_SRC || reduceMotion) return;
    setShouldLoadVideo(true);
  }, [reduceMotion]);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setVideoFailed(true));
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !HERO_VIDEO_SRC || videoFailed) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    tryPlay();
  }, [shouldLoadVideo, videoFailed, tryPlay]);

  const handlePlayClick = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.muted = false;
      void videoRef.current.play();
      return;
    }
    window.open(SITE.social.youtube, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden border-b border-[#e8dfd3] bg-gradient-to-b from-[#fffdf9] via-[#faf7f2] to-[#f5efe6] pt-[max(5.5rem,env(safe-area-inset-top)+4.25rem)] pb-14 sm:pb-20 md:pb-24">
      <div
        className="pointer-events-none absolute -left-28 top-8 h-80 w-80 rounded-full bg-brand-gold/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#c4a574]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0f172a]/[0.02] blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#d4c4a8]/60 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0f172a] shadow-sm sm:gap-2.5 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]"
          >
            <span>India&apos;s Founder Podcast Platform</span>
            <span className="inline-flex items-center gap-0.5" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
              ))}
            </span>
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 font-display text-lg font-medium tracking-tight text-[#5c4a3a] sm:mt-8 sm:text-xl md:text-2xl"
          >
            Transform Your Founder Story
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-3 font-display text-[clamp(2.15rem,7vw,4.25rem)] font-semibold leading-[1.06] tracking-tight text-[#0f172a] text-balance"
          >
            Into a Powerful{" "}
            <span className="bg-gold-gradient bg-clip-text text-transparent">
              Marketing Asset
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-luxury-body sm:text-lg"
          >
            One high-quality podcast episode can build trust, increase visibility, and
            turn your story into brand authority.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTAButton intent="book" size="lg" className="w-full sm:w-auto">
              Book Podcast Now
            </CTAButton>
            <CTAButton
              intent="enquire"
              variant="outline"
              size="lg"
              className="w-full border-[#c9a14a]/50 bg-white/80 sm:w-auto"
            >
              See How It Works
            </CTAButton>
          </motion.div>
        </div>

        {/* Premium video placeholder card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="relative mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          <div
            className="absolute -inset-3 rounded-[1.85rem] bg-gradient-to-br from-brand-gold/25 via-transparent to-[#0f172a]/10 blur-xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-[#d4c4a8]/50 bg-[#0f172a]/5 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.28),0_8px_24px_-8px_rgba(201,161,74,0.15)] ring-1 ring-[#c9a14a]/25 sm:rounded-3xl">
            <div className="relative aspect-[16/9] w-full">
              {hasVideo && shouldLoadVideo && !reduceMotion ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    onError={() => setVideoFailed(true)}
                    onLoadedData={tryPlay}
                  >
                    <source src={HERO_VIDEO_SRC} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent" />
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-white/95 text-[#0f172a] shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl sm:h-[4.5rem] sm:w-[4.5rem]"
                    aria-label="Play highlight"
                    onClick={handlePlayClick}
                  >
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </>
              ) : (
                <HeroVideoPlaceholder onPlayClick={handlePlayClick} />
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-sm font-medium italic text-[#6b5344]">
            Only 25 founders are selected per month — apply today to secure your spot.
          </p>
        </motion.div>

        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS_PILLS.map((label) => (
            <li
              key={label}
              className="flex items-center justify-center rounded-full border border-[#e0d5c4] bg-white/90 px-4 py-3 text-center text-xs font-semibold text-[#0f172a] shadow-sm transition duration-300 hover:border-brand-gold/45 hover:shadow-md sm:text-sm"
            >
              {label}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
