import type { Metadata } from "next";
import { SpacesSection } from "@/components/home/spaces-section";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { IntroductionSection } from "@/components/home/introduction-section";
import { WhyUsSection } from "@/components/home/why-us-section";
import { FounderSection } from "@/components/home/founder-section";
import { WhyPodcastSection } from "@/components/home/why-podcast-section";
import { CtaSection } from "@/components/home/cta-section";
import { HOME_INTRO } from "@/lib/site-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Studio",
  description: `${SITE.name} is a podcast and video studio in Bengaluru. ${HOME_INTRO.mission}`,
  openGraph: {
    title: `About | ${SITE.name}`,
    description: HOME_INTRO.mission,
  },
};

export default async function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About the studio"
        title={SITE.name}
        subtitle={
          <>
            <span className="font-display text-lg text-brand-gold-deep md:text-xl">
              {SITE.tagline}
            </span>
            <span className="mt-4 block text-base text-luxury-body">
              {HOME_INTRO.lead}
            </span>
          </>
        }
      >
        <GoldButton href="/book">Book a Studio Session</GoldButton>
      </PageHero>
      <IntroductionSection />
      <SpacesSection />
      <WhyUsSection />
      <FounderSection />
      <WhyPodcastSection />
      <CtaSection />
    </div>
  );
}
