"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_WHY_US } from "@/lib/site-content";

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="why-us-heading"
    >
      <Container>
        <SectionHeading
          id="why-us-heading"
          eyebrow={HOME_WHY_US.eyebrow}
          title={HOME_WHY_US.title}
          subtitle={`${HOME_WHY_US.subtitle} ${HOME_WHY_US.tagline}`}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-deep">
            {HOME_WHY_US.focusIntro}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_WHY_US.focusAreas.map((area, i) => (
              <motion.li
                key={area}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.2) }}
                className="rounded-2xl border border-luxury-border bg-surface/90 px-4 py-3.5 text-center text-sm font-medium text-luxury-heading shadow-sm"
              >
                {area}
              </motion.li>
            ))}
          </ul>
          <p className="mt-10 text-center text-base leading-relaxed text-luxury-body md:text-lg">
            {HOME_WHY_US.closing}
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton intent="book" size="lg">
              {BOOK_NOW_LABEL}
            </CtaButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
