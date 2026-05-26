"use client";

import { motion } from "framer-motion";
import {
  Globe,
  LineChart,
  Megaphone,
  Search,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";

const benefits = [
  {
    icon: Megaphone,
    title: "Podcast visibility",
    copy: "Show up on YouTube and podcast platforms where your buyers already spend time—with titles and descriptions tuned for discovery.",
  },
  {
    icon: LineChart,
    title: "Brand authority",
    copy: "Long-form conversations signal expertise. Episode pages become proof points you can link from proposals, bios, and press kits.",
  },
  {
    icon: Globe,
    title: "Audience reach",
    copy: "Clips and highlights extend your message across social—turning one interview into weeks of consistent, on-brand touchpoints.",
  },
  {
    icon: Search,
    title: "Search ranking support",
    copy: "Keyword-aware show notes, chapter-friendly structure, and evergreen pages help Google understand what you stand for—naturally, not stuffed.",
  },
];

export function SeoBenefitsSection() {
  return (
    <section
      id="seo-benefits"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-bg py-20 md:py-28"
      aria-labelledby="seo-benefits-heading"
    >
      <Container>
        <SectionHeading
          id="seo-benefits-heading"
          eyebrow="SEO & discovery"
          title="Be found when people search for leaders like you"
          subtitle="Professional podcast production is also a visibility strategy—structured content that strengthens how search engines and humans understand your brand."
        />

        <div className="mt-10 rounded-3xl border border-luxury-border bg-surface/80 p-6 text-sm leading-relaxed text-luxury-body sm:p-8 md:text-base">
          <p>
            When you publish with BN, you are not only recording an interview—you are creating
            indexable assets: episode pages, transcripts-friendly descriptions, and social clips
            that reinforce the same core message. That consistency helps search engines connect
            your name with the topics you want to own, while giving prospects a credible trail to
            follow before they ever book a call.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass-panel flex h-full flex-col rounded-3xl p-6 ring-1 ring-[color:var(--overlay-ring)] transition hover:-translate-y-1 hover:shadow-soft-xl"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold/12 text-brand-gold-deep">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-luxury-heading">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-luxury-body">
                {item.copy}
              </p>
              <CtaButton intent="book" size="sm" className="mt-6 w-full">
                Book Now
              </CtaButton>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <CtaButton intent="book">Book Podcast Now</CtaButton>
        </div>
      </Container>
    </section>
  );
}
