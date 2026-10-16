import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { ProcessSection } from "@/components/home/process-section";
import { IntroductionSection } from "@/components/home/introduction-section";
import { WhyPodcastSection } from "@/components/home/why-podcast-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: `From idea to published episode: how recording at ${SITE.name} works, step by step.`,
  openGraph: {
    title: `How It Works | ${SITE.name}`,
    description: "Plan, book, record, edit, publish — your podcast in five steps.",
  },
};

export default async function HowItWorksPage() {
  return (
    <div>
      <PageHero
        eyebrow="How it works"
        title="From idea to episode in five steps"
        subtitle="No experience or equipment needed. Walk in with your topic and we'll take care of the rest."
      >
        <GoldButton href="/book">Book a Studio Session</GoldButton>
      </PageHero>
      <ProcessSection />
      <IntroductionSection />
      <WhyPodcastSection />
      <CtaSection />
    </div>
  );
}
