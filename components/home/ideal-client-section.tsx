"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { HOME_IDEAL_CLIENT } from "@/lib/site-content";

export function IdealClientSection() {
  return (
    <section
      id="ideal-client"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="ideal-client-heading"
    >
      <Container>
        <SectionHeading
          id="ideal-client-heading"
          eyebrow={HOME_IDEAL_CLIENT.eyebrow}
          title={HOME_IDEAL_CLIENT.title}
        />

        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_IDEAL_CLIENT.clients.map((client, i) => (
            <motion.li
              key={client}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.25) }}
              className="flex items-center gap-3 rounded-2xl border border-luxury-border bg-luxury-bg/90 px-4 py-3.5 text-sm text-luxury-body"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
              {client}
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl text-center font-display text-lg font-medium text-luxury-heading md:text-xl"
        >
          {HOME_IDEAL_CLIENT.closing}
        </motion.p>
      </Container>
    </section>
  );
}
