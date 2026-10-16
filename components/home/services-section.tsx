"use client";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";
import Link from "next/link";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { HOME_SERVICES } from "@/lib/site-content";

export function ServicesSection({ showMoreLink = true }: { showMoreLink?: boolean } = {}) {
  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-28 border-t border-luxury-border bg-section-mesh py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <StudioBackdrop />
      <Container className="relative">
        <SectionHeading
          id="services-heading"
          eyebrow={HOME_SERVICES.eyebrow}
          title={HOME_SERVICES.title}
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {HOME_SERVICES.items.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                delay: Math.min(i * 0.08, 0.32),
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-panel glass-panel-hover flex h-full flex-col rounded-3xl p-6 md:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-luxury-heading">
                {i + 1}. {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-luxury-body">
                {service.description}
              </p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
                Includes
              </p>
              <ul className="mt-3 flex-1 space-y-2">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-luxury-body"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-deep"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CtaButton intent="book" size="lg">
            {BOOK_NOW_LABEL}
          </CtaButton>
          {showMoreLink ? (
            <Link
              href="/services"
              className="text-sm font-semibold text-brand-gold-deep underline underline-offset-4 hover:text-brand-gold"
            >
              Explore all services →
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
