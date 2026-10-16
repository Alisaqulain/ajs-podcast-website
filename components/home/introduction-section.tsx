"use client";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HOME_INTRO } from "@/lib/site-content";

export function IntroductionSection() {
  return (
    <section
      id="introduction"
      className="relative overflow-hidden scroll-mt-28 border-t border-luxury-border bg-surface/60 py-20 backdrop-blur-sm md:py-28"
      aria-labelledby="introduction-heading"
    >
      <StudioBackdrop />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep"
            >
              {HOME_INTRO.eyebrow}
            </motion.p>
            <motion.h2
              id="introduction-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 }}
              className="mt-4 font-display text-4xl font-semibold leading-tight text-luxury-heading md:text-5xl"
            >
              {HOME_INTRO.title}
            </motion.h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-luxury-body md:text-lg">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="font-display text-xl font-medium text-luxury-heading md:text-2xl"
              >
                {HOME_INTRO.lead}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
              >
                {HOME_INTRO.mission}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-medium text-luxury-heading"
              >
                {HOME_INTRO.attention}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
              >
                {HOME_INTRO.podcastTrust}
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-[2.25rem] bg-gradient-to-br from-sky-300/40 via-transparent to-cyan-300/30 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-[2rem] border border-sky-200/80 bg-white/85 p-7 shadow-[0_30px_70px_-30px_rgba(14,116,144,0.45)] backdrop-blur-md md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-deep">
                {HOME_INTRO.audienceIntro}
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {HOME_INTRO.audiences.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="flex gap-3 text-sm text-luxury-body md:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-deep" aria-hidden />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 border-t border-luxury-border pt-6 font-display text-xl font-medium text-luxury-heading md:text-2xl">
                {HOME_INTRO.closing}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
