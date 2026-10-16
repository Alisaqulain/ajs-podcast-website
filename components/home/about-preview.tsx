"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";
import { HOME_INTRO } from "@/lib/site-content";
import { AmbientSectionShell } from "@/components/cinematic/ambient-section-shell";
import type { AmbientClip } from "@/lib/youtube-ambient";

export function AboutPreview({ clips }: { clips: AmbientClip[] }) {
  return (
    <AmbientSectionShell
      clips={clips}
      variant="split-left"
      startOffset={2}
      className="border-t border-luxury-border py-20 md:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="glass-panel rounded-4xl p-10 md:p-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              About {SITE.name}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
              {HOME_INTRO.title}
            </h2>
            <p className="mt-6 leading-relaxed text-luxury-body">
              {HOME_INTRO.lead} {HOME_INTRO.mission}
            </p>
            <p className="mt-4 leading-relaxed text-luxury-body">
              {HOME_INTRO.attention}
            </p>
            <div className="mt-8">
              <GoldButton href="/about" variant="outline">
                Learn more
              </GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="glass-panel rounded-4xl border border-luxury-border p-10 shadow-luxury-card">
              <ul className="space-y-6 text-luxury-body">
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
                  <div>
                    <p className="font-semibold text-luxury-heading">
                      Podcast recording
                    </p>
                    <p className="text-sm text-luxury-muted">
                      Multi-cam video podcasts recorded in Bengaluru.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
                  <div>
                    <p className="font-semibold text-luxury-heading">
                      Brand &amp; training video
                    </p>
                    <p className="text-sm text-luxury-muted">
                      Creative production from the Bangalore studio.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
                  <div>
                    <p className="font-semibold text-luxury-heading">
                      Podcasts
                    </p>
                    <p className="text-sm text-luxury-muted">
                      Conversations recorded and produced at {SITE.name}.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </AmbientSectionShell>
  );
}
