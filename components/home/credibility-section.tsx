"use client";

import { motion } from "framer-motion";
import { Award, Building2, Mic2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Studio-grade trust",
    copy: "Professional lighting, sound, and editorial review—so your episode reflects the quality of your brand.",
  },
  {
    icon: Building2,
    title: "Founder-first positioning",
    copy: "Story-led interviews designed for decision-makers, investors, and customers who need clarity—not hype.",
  },
  {
    icon: Mic2,
    title: "Proven interview craft",
    copy: "Conversations that stay human, structured, and memorable—backed by a channel built for business leaders.",
  },
  {
    icon: Award,
    title: "Credibility you can link to",
    copy: "Evergreen episode pages, clips, and assets you can share across decks, bios, and sales conversations.",
  },
];

export function CredibilitySection() {
  return (
    <section
      id="credibility"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-bg py-20 md:py-28"
      aria-labelledby="credibility-heading"
    >
      <Container>
        <SectionHeading
          id="credibility-heading"
          eyebrow="Credibility"
          title="Trust that shows up before you walk in the room"
          subtitle="BN combines premium production with strategic storytelling—so your podcast appearance feels like an asset, not a one-off post."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass-panel flex h-full flex-col rounded-3xl p-6 ring-1 ring-[color:var(--overlay-ring)] transition hover:-translate-y-1 hover:shadow-soft-xl"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold/12 text-brand-gold-deep ring-1 ring-brand-gold/25">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-luxury-heading">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-luxury-body">
                {item.copy}
              </p>
              <CtaButton
                intent="enquire"
                variant="outline"
                size="sm"
                className="mt-6 w-full"
              >
                Enquire Now
              </CtaButton>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CtaButton intent="book">Book Podcast Now</CtaButton>
          <CtaButton intent="enquire" variant="outline">
            See How It Works
          </CtaButton>
        </div>
      </Container>
    </section>
  );
}
