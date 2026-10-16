"use client";

import { motion } from "framer-motion";
import {
  AudioLines,
  Clapperboard,
  Clock,
  Film,
  Languages,
  Megaphone,
  Smartphone,
  Smile,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";
import { CtaButton } from "@/components/lead/cta-button";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_WHY_US } from "@/lib/site-content";

/** One icon per focus area, in the same order as HOME_WHY_US.focusAreas. */
const ICONS: LucideIcon[] = [
  AudioLines,
  Clapperboard,
  Smile,
  Film,
  Smartphone,
  Megaphone,
  Clock,
  Languages,
];

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="why-us-heading"
    >
      <StudioBackdrop waveform={false} />
      <Container className="relative">
        <SectionHeading
          id="why-us-heading"
          eyebrow={HOME_WHY_US.eyebrow}
          title={HOME_WHY_US.title}
          subtitle={`${HOME_WHY_US.subtitle} ${HOME_WHY_US.tagline}`}
        />

        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-deep">
          {HOME_WHY_US.focusIntro}
        </p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_WHY_US.focusAreas.map((area, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.li
                key={area}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-luxury-border bg-white/85 p-6 shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-sky-300 hover:shadow-[0_20px_50px_-20px_rgba(14,116,144,0.35)]"
              >
                <span
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-200/0 blur-2xl transition duration-500 group-hover:bg-sky-300/40"
                  aria-hidden
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-[0_8px_20px_-6px_rgba(2,132,199,0.6)] transition duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="relative mt-5 text-base font-semibold leading-snug text-luxury-heading">
                  {area}
                </p>
              </motion.li>
            );
          })}
        </ul>

        <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-luxury-body md:text-lg">
          {HOME_WHY_US.closing}
        </p>
        <div className="mt-10 flex justify-center">
          <CtaButton intent="book" size="lg">
            {BOOK_NOW_LABEL}
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
