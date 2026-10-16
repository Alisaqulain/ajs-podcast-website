"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, DoorOpen, Lightbulb, Mic, Plus, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";
import {
  STUDIO_ADDONS,
  STUDIO_INCLUDES,
  STUDIO_RATE_LABEL,
  STUDIO_SPACES,
} from "@/lib/site-content";

const ease = [0.22, 1, 0.36, 1] as const;

/** Row of seat icons so the size difference reads at a glance. */
function Seats({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.08, type: "spring", stiffness: 380, damping: 18 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-400/20 text-sky-200 ring-1 ring-sky-300/40"
        >
          <Mic className="h-4 w-4" />
        </motion.span>
      ))}
    </div>
  );
}

export function SpacesSection({ showBookLink = true }: { showBookLink?: boolean } = {}) {
  return (
    <section
      id="spaces"
      className="relative isolate scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#04223a] via-[#062f4f] to-[#0b3d63] py-20 text-white md:py-28"
      aria-labelledby="spaces-heading"
    >
      <StudioBackdrop variant="dark" />
      <Container className="relative">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
            <Sparkles className="h-3.5 w-3.5" />
            {STUDIO_SPACES.eyebrow}
          </p>
          <h2
            id="spaces-heading"
            className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl"
          >
            {STUDIO_SPACES.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sky-100/80 md:text-lg">
            {STUDIO_SPACES.subtitle}
          </p>
        </div>

        {/* Three spaces */}
        <div className="grid gap-6 md:grid-cols-3">
          {STUDIO_SPACES.items.map((space, i) => (
            <motion.article
              key={space.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -8 }}
              className={
                "group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-7 backdrop-blur-md transition-colors md:p-8 " +
                (i === 2
                  ? "border-sky-300/50 bg-gradient-to-b from-sky-400/20 to-white/[0.04]"
                  : "border-white/10 bg-white/[0.06] hover:border-sky-300/40")
              }
            >
              <span
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-400/0 blur-3xl transition duration-500 group-hover:bg-sky-400/30"
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                    {space.label}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold">{space.name}</h3>
                </div>
                <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Users className="h-4 w-4 text-sky-200" aria-hidden />
                  <span className="text-lg font-bold leading-none">{space.seats}</span>
                </span>
              </div>

              <div className="relative mt-6">
                <Seats count={space.seats} />
              </div>

              <p className="relative mt-6 text-sky-100/80">{space.description}</p>

              <ul className="relative mt-5 flex-1 space-y-2">
                {space.bestFor.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-sky-50/90">
                    <Check className="h-4 w-4 shrink-0 text-sky-300" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
                <p>
                  <span className="font-display text-3xl font-semibold text-white">₹1,000</span>
                  <span className="ml-1 text-sm text-sky-100/70">/ hour</span>
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-sky-400 hover:text-[#04223a]"
                >
                  Book <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Included + green room + add-ons */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              <Lightbulb className="h-4 w-4" /> Included in {STUDIO_RATE_LABEL}
            </p>
            <ul className="mt-5 space-y-3">
              {STUDIO_INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sky-50">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-400/25">
                    <Check className="h-3.5 w-3.5 text-sky-200" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="relative overflow-hidden rounded-[1.75rem] border border-sky-300/30 bg-gradient-to-br from-sky-500/25 to-cyan-400/10 p-7 backdrop-blur-md"
          >
            <span className="studio-float absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-sky-200 ring-1 ring-white/20" aria-hidden>
              <DoorOpen className="h-7 w-7" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
              Also available
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold">
              {STUDIO_SPACES.greenRoom.title}
            </h3>
            <p className="mt-3 max-w-xs text-sky-100/85">{STUDIO_SPACES.greenRoom.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-md"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
              <Plus className="h-4 w-4" /> Add-ons (extra)
            </p>
            <ul className="mt-5 space-y-4">
              {STUDIO_ADDONS.map((a) => (
                <li key={a.title}>
                  <p className="font-semibold text-white">{a.title}</p>
                  <p className="text-sm text-sky-100/70">{a.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {showBookLink ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-8 text-sm font-semibold text-[#04223a] shadow-[0_10px_40px_-10px_rgba(56,189,248,0.8)] transition hover:brightness-110"
            >
              Book a studio session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-white/25 px-8 text-sm font-semibold text-white transition hover:border-sky-300/60 hover:bg-white/10"
            >
              Ask about add-ons
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
