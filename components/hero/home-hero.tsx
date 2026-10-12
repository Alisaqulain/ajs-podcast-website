"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { HeroVideoPlaceholder } from "@/components/hero/hero-video-placeholder";
import { SITE } from "@/lib/site";
import { GoldButton } from "@/components/ui/gold-button";
import { HOME_HERO } from "@/lib/site-content";

const HERO_VIDEO_SRC = SITE.homeHeroVideoUrl;

const stagger = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.06 * i,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

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
    <section className="relative overflow-hidden border-b border-sky-200/70 pt-[max(5.5rem,env(safe-area-inset-top)+4.25rem)] pb-14 sm:pb-20 md:pb-24">
      <div className="pointer-events-none absolute inset-0 hero-gradient-shimmer opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-12 h-96 w-96 animate-blob rounded-full bg-sky-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-8 h-80 w-80 animate-blob animation-delay-2000 rounded-full bg-cyan-300/25 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            custom={0}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={stagger}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold-deep sm:tracking-[0.28em]"
          >
            {HOME_HERO.trustLine}
          </motion.p>

          <motion.h1
            custom={1}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={stagger}
            className="mt-6 font-display text-[clamp(2rem,6.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-luxury-heading text-balance"
          >
            {HOME_HERO.headline}
            <span className="mt-2 block text-gradient-animate">
              {HOME_HERO.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={stagger}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-luxury-body sm:mt-6 sm:text-lg"
          >
            {HOME_HERO.subheading}
          </motion.p>

          <motion.div
            custom={3}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={stagger}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <GoldButton
              href={SITE.social.youtube}
              className="w-full sm:w-auto motion-safe:hover:scale-[1.03]"
            >
              {HOME_HERO.ctaPrimary}
            </GoldButton>
            <Link
              href="/contact"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className: "w-full sm:w-auto motion-safe:hover:scale-[1.02]",
              })}
            >
              Contact
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          <div
            className="absolute -inset-3 animate-pulse-soft rounded-[1.85rem] bg-gradient-to-br from-sky-400/30 via-transparent to-cyan-500/15 blur-xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-white/40 shadow-[0_24px_60px_-16px_rgba(14,116,144,0.22)] ring-1 ring-sky-300/40 sm:rounded-3xl motion-safe:hover:ring-sky-400/55 transition-[box-shadow,transform] duration-500 hover:-translate-y-1">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/45 via-transparent to-transparent" />
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-white/95 text-sky-900 shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl sm:h-[4.5rem] sm:w-[4.5rem]"
                    aria-label="Play highlight"
                    onClick={handlePlayClick}
                  >
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </>
              ) : (
                <HeroVideoPlaceholder
                  onPlayClick={handlePlayClick}
                  label="Aj's Cycling Vlog"
                />
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
