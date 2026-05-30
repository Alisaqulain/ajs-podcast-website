"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/hero/cta-button";
import { HeroVideoPlaceholder } from "@/components/hero/hero-video-placeholder";
import { SITE } from "@/lib/site";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_HERO } from "@/lib/site-content";

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

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-deep sm:tracking-[0.28em]"
          >
            {HOME_HERO.trustLine}
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 font-display text-[clamp(2rem,6.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[#0f172a] text-balance"
          >
            {HOME_HERO.headline}
            <span className="mt-2 block bg-gold-gradient bg-clip-text text-transparent">
              {HOME_HERO.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-luxury-body sm:mt-6 sm:text-lg"
          >
            {HOME_HERO.subheading}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTAButton intent="book" size="lg" className="w-full sm:w-auto">
              {BOOK_NOW_LABEL}
            </CTAButton>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="relative mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          <div
            className="absolute -inset-3 rounded-[1.85rem] bg-gradient-to-br from-brand-gold/25 via-transparent to-[#0f172a]/10 blur-xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-[#d4c4a8]/50 bg-[#0f172a]/5 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.28)] ring-1 ring-[#c9a14a]/25 sm:rounded-3xl">
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
        </motion.div>
      </Container>
    </section>
  );
}
