"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Mic, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";
import { HOME_HERO } from "@/lib/site-content";
import { youtubeAmbientEmbedSrc, youtubePosterSrc } from "@/lib/youtube-ambient";

const MP4_SRC = SITE.homeHeroVideoUrl;
const YT_ID = SITE.homeHeroYoutubeId;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + 0.1 * i, ease },
  }),
};

const HERO_STATS = [
  { value: "₹1,000", label: "Per hour" },
  { value: "3", label: "Studio sets" },
  { value: "RODE", label: "Wireless mic" },
];

/** Embed src with the JS API on so we can toggle sound without reloading. */
function heroEmbedSrc(videoId: string) {
  const base = youtubeAmbientEmbedSrc(videoId, true);
  return `${base}&enablejsapi=1&start=5`;
}

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const [mountVideo, setMountVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [iframeEl, setIframeEl] = useState<HTMLIFrameElement | null>(null);

  // Mount the embed after first paint so the hero text renders instantly.
  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setTimeout(() => setMountVideo(true), 300);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (MP4_SRC) return;
    iframeEl?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: next ? "mute" : "unMute", args: [] }),
      "*"
    );
  };

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#031a2e] text-white">
      {/* ── Background media ── */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {/* poster first, so there is never an empty frame */}
        {!MP4_SRC && YT_ID ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={youtubePosterSrc(YT_ID, "max")}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"
          />
        ) : null}

        {mountVideo && MP4_SRC ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted={muted}
            playsInline
            loop
            onPlaying={() => setVideoVisible(true)}
          >
            <source src={MP4_SRC} type="video/mp4" />
          </video>
        ) : null}

        {mountVideo && !MP4_SRC && YT_ID ? (
          <div
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${videoVisible ? "opacity-100" : "opacity-0"}`}
          >
            <iframe
              ref={setIframeEl}
              src={heroEmbedSrc(YT_ID)}
              title={`${SITE.name} studio video`}
              allow="autoplay; encrypted-media; picture-in-picture"
              tabIndex={-1}
              // Wait a beat after load so YouTube's title overlay has faded before we reveal.
              onLoad={() => window.setTimeout(() => setVideoVisible(true), 1800)}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "max(100vw, 177.78svh)",
                height: "max(100svh, 56.25vw)",
                transform: "translate(-50%, -50%) scale(1.18)",
                border: 0,
              }}
            />
          </div>
        ) : null}

        {/* scrims: readable copy on the left, cinematic fade at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031a2e]/95 via-[#031a2e]/70 to-[#031a2e]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031a2e] via-transparent to-[#031a2e]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(56,189,248,0.18),transparent_60%)]" />
      </div>

      {/* animated equalizer along the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex h-24 items-end justify-between gap-[3px] px-2 opacity-40"
        aria-hidden
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 20%, black 80%, transparent)",
        }}
      >
        {Array.from({ length: 90 }).map((_, i) => (
          <span
            key={i}
            className="studio-eq-bar w-full max-w-[5px] rounded-t-full bg-gradient-to-t from-sky-500 to-cyan-200"
            style={{
              height: `${25 + ((i * 37) % 75)}%`,
              animationDuration: `${1 + ((i * 13) % 9) * 0.12}s`,
              animationDelay: `${((i * 7) % 11) * -0.15}s`,
            }}
          />
        ))}
      </div>

      <Container className="relative pb-28 pt-[max(7rem,env(safe-area-inset-top)+6rem)] sm:pb-32">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100 backdrop-blur-md sm:text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            {HOME_HERO.trustLine}
          </motion.p>

          <motion.h1
            custom={1}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
            className="mt-7 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-balance"
          >
            {HOME_HERO.headline}{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              {HOME_HERO.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-sky-50/85 sm:text-lg md:text-xl"
          >
            {HOME_HERO.subheading}
          </motion.p>

          <motion.div
            custom={3}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="/book"
              className="group inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-8 text-base font-semibold text-[#031a2e] shadow-[0_12px_40px_-10px_rgba(56,189,248,0.9)] transition hover:scale-[1.03] hover:brightness-110"
            >
              <Mic className="h-5 w-5" />
              {HOME_HERO.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/spaces"
              className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition hover:border-sky-300/70 hover:bg-white/15"
            >
              {HOME_HERO.ctaSecondary}
            </Link>
          </motion.div>

          <motion.dl
            custom={4}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={fadeUp}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-8"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-sky-100/70 sm:text-sm">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>

      {/* sound toggle */}
      {mountVideo && (MP4_SRC || YT_ID) ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Unmute background video" : "Mute background video"}
          className="absolute bottom-8 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-10"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      ) : null}

      {/* scroll cue */}
      <a
        href="#offer"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-100/70 transition hover:text-white sm:flex"
      >
        Scroll
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
