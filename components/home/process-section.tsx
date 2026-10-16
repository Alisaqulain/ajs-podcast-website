"use client";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_PROCESS } from "@/lib/site-content";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden scroll-mt-28 border-t border-luxury-border bg-luxury-bg py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <StudioBackdrop />
      <Container className="relative">
        <SectionHeading
          id="process-heading"
          eyebrow={HOME_PROCESS.eyebrow}
          title={HOME_PROCESS.title}
        />

        <ol className="grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {HOME_PROCESS.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.06, 0.3) }}
              className="flex h-full flex-col gap-3 rounded-2xl border border-luxury-border bg-luxury-section/90 p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-sm font-bold text-[#1a1a1a]">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-luxury-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-luxury-body">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CtaButton intent="book" size="lg">
            {BOOK_NOW_LABEL}
          </CtaButton>
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-brand-gold-deep underline underline-offset-4 hover:text-brand-gold"
          >
            See the full process →
          </Link>
        </div>
      </Container>
    </section>
  );
}
