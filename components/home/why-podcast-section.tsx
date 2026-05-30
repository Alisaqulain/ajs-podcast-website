"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOME_WHY_PODCAST } from "@/lib/site-content";

export function WhyPodcastSection() {
  return (
    <section
      id="why-podcast"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-bg py-20 md:py-28"
      aria-labelledby="why-podcast-heading"
    >
      <Container>
        <SectionHeading
          id="why-podcast-heading"
          eyebrow={HOME_WHY_PODCAST.eyebrow}
          title={HOME_WHY_PODCAST.title}
          subtitle={`${HOME_WHY_PODCAST.subtitle} ${HOME_WHY_PODCAST.intro}`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl p-6 md:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-luxury-heading">
              {HOME_WHY_PODCAST.helpsIntro}
            </h3>
            <ul className="mt-5 space-y-3">
              {HOME_WHY_PODCAST.benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-luxury-body md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass-panel rounded-3xl p-6 md:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-luxury-heading">
              {HOME_WHY_PODCAST.becomesIntro}
            </h3>
            <ul className="mt-5 space-y-3">
              {HOME_WHY_PODCAST.becomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-luxury-body md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
