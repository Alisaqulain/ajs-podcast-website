"use client";

import { motion } from "framer-motion";
import { Clock, Repeat, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/lead/cta-button";

const roiPoints = [
  {
    icon: Clock,
    title: "One session, many assets",
    copy: "Turn a single recording into long-form video, short clips, quotes, and thumbnails—without rebuilding your calendar.",
  },
  {
    icon: TrendingUp,
    title: "Authority that compounds",
    copy: "Podcast depth builds trust faster than scattered posts. Your story stays discoverable for months, not hours.",
  },
  {
    icon: Repeat,
    title: "Repurpose with intent",
    copy: "Every edit is structured for reuse across LinkedIn, YouTube, and your website—maximizing return on your time.",
  },
  {
    icon: Zap,
    title: "Faster path to visibility",
    copy: "Skip months of trial-and-error content. Show up where your audience already listens—with production done for you.",
  },
];

export function RoiSection() {
  return (
    <section
      id="roi"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="roi-heading"
    >
      <Container>
        <SectionHeading
          id="roi-heading"
          eyebrow="ROI on time"
          title="Your time is expensive—make one hour work harder"
          subtitle="Founders don't need more tasks. They need one high-leverage appearance that keeps paying off across sales, hiring, and brand building."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {roiPoints.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col gap-4 rounded-3xl border border-luxury-border bg-surface p-6 shadow-sm transition hover:border-brand-gold/35 hover:shadow-soft-xl sm:flex-row sm:items-start sm:p-8"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-[var(--gold-foreground)] shadow-gold-glow">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="font-display text-xl font-semibold text-luxury-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-luxury-body">
                  {item.copy}
                </p>
                <CtaButton intent="get-started" size="sm" className="mt-5 w-full sm:w-auto">
                  Get Started
                </CtaButton>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-brand-gold/25 bg-gradient-to-br from-brand-gold/10 via-white to-white px-6 py-10 text-center sm:px-10"
        >
          <p className="max-w-2xl text-base text-luxury-body">
            Ready to multiply the impact of your next hour on camera? Tell us your goals—we&apos;ll
            map the fastest path from recording to published, promoted episode.
          </p>
          <CtaButton intent="schedule" size="lg">
            Schedule Podcast
          </CtaButton>
        </motion.div>
      </Container>
    </section>
  );
}
