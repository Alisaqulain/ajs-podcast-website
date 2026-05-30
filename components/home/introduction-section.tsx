"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOME_INTRO } from "@/lib/site-content";

export function IntroductionSection() {
  return (
    <section
      id="introduction"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="introduction-heading"
    >
      <Container>
        <SectionHeading
          id="introduction-heading"
          eyebrow={HOME_INTRO.eyebrow}
          title={HOME_INTRO.title}
        />

        <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-luxury-body md:text-lg">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-xl font-medium text-luxury-heading md:text-2xl"
          >
            {HOME_INTRO.lead}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            {HOME_INTRO.mission}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-medium text-luxury-heading"
          >
            {HOME_INTRO.attention}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {HOME_INTRO.podcastTrust}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-luxury-border bg-luxury-bg/90 p-6 md:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-deep">
            {HOME_INTRO.audienceIntro}
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {HOME_INTRO.audiences.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-luxury-body md:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-deep" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-lg font-medium text-luxury-heading md:text-xl">
            {HOME_INTRO.closing}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
