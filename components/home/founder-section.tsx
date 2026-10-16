"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic, PlayCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";
import { FOUNDER } from "@/lib/site-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function FounderSection() {
  return (
    <section
      id="founder"
      className="relative isolate scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#04223a] via-[#062f4f] to-[#0b3d63] py-20 text-white md:py-28"
      aria-labelledby="founder-heading"
    >
      <StudioBackdrop variant="dark" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
              {/* animated gradient ring */}
              <div className="absolute -inset-[3px] overflow-hidden rounded-[2.1rem]">
                <div className="studio-photo-ring absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="absolute -inset-6 rounded-[2.5rem] bg-sky-400/20 blur-2xl" aria-hidden />

              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#062f4f]">
                <Image
                  src={FOUNDER.photo}
                  alt={`${FOUNDER.name}, ${FOUNDER.role}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[50%_25%] transition-transform duration-[1.2s] hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04223a] via-[#04223a]/60 to-transparent p-6 pt-24">
                  <p className="font-display text-3xl font-semibold">{FOUNDER.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {FOUNDER.role}
                  </p>
                </div>
              </div>

              {/* floating badges */}
              <div className="studio-float absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl border border-sky-300/25 bg-[#04223a]/80 px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex lg:-left-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/25 text-sky-200">
                  <PlayCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-semibold leading-none">400+</span>
                  <span className="text-xs text-sky-100/80">videos published</span>
                </span>
              </div>
              <div
                className="studio-float absolute -right-4 bottom-28 hidden items-center gap-3 rounded-2xl border border-sky-300/25 bg-[#04223a]/80 px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md sm:flex lg:-right-10"
                style={{ animationDelay: "-3s" }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/25 text-cyan-200">
                  <Mic className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-lg font-semibold leading-none">Since 2016</span>
                  <span className="text-xs text-sky-100/80">on camera</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Meet the founder
            </motion.p>
            <motion.h2
              id="founder-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="mt-5 font-display text-4xl font-semibold leading-[1.1] md:text-5xl"
            >
              A creator who&apos;s been on{" "}
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400 bg-clip-text text-transparent">
                both sides of the camera
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mt-6 text-base leading-relaxed text-sky-100/85 md:text-lg"
            >
              {FOUNDER.summary}
            </motion.p>

            <dl className="mt-10 grid grid-cols-2 gap-4 xl:grid-cols-4">
              {FOUNDER.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-5 text-center backdrop-blur-sm transition-colors hover:border-sky-300/40 hover:bg-white/10"
                >
                  <dt className="mt-1.5 text-xs leading-snug text-sky-100/70">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold tabular-nums text-sky-300">
                    {s.value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/founder"
                className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-8 text-sm font-semibold text-[#04223a] shadow-[0_10px_40px_-10px_rgba(56,189,248,0.8)] transition hover:brightness-110"
              >
                Read Ajay&apos;s story
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/book"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border border-white/25 px-8 text-sm font-semibold text-white transition hover:border-sky-300/60 hover:bg-white/10"
              >
                Record with Ajay
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
