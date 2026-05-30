"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CtaButton } from "@/components/lead/cta-button";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_FINAL_CTA } from "@/lib/site-content";

export function CtaSection() {
  return (
    <section className="border-t border-luxury-border bg-luxury-bg py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel relative overflow-hidden rounded-4xl px-8 py-14 text-center md:px-16"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-brand-gold-light/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              {HOME_FINAL_CTA.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
              {HOME_FINAL_CTA.title}
            </h2>
            <div className="mt-4 space-y-3 text-luxury-body">
              {HOME_FINAL_CTA.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <CtaButton intent="book" size="lg">
                {BOOK_NOW_LABEL}
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
