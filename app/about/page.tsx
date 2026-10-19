import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { Container } from "@/components/ui/container";
import { LocationSection } from "@/components/home/location-section";
import { FOUNDER, HOME_INTRO } from "@/lib/site-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Studio",
  description: `${SITE.name} is a podcast studio in Bengaluru by ${SITE.company}. ${HOME_INTRO.mission}`,
  openGraph: {
    title: `About | ${SITE.name}`,
    description: HOME_INTRO.mission,
  },
};

/** Short and calm on purpose: who we are, who runs it, where to find us. */
export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About the studio"
        title={SITE.name}
        subtitle={`A podcast studio on Castle Street, Bengaluru, by ${SITE.company}.`}
        compact
      >
        <GoldButton href="/book">Book a Studio Session</GoldButton>
      </PageHero>

      <section className="bg-white py-20 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-luxury-body">
            <p className="font-display text-2xl font-medium text-luxury-heading md:text-3xl">
              {HOME_INTRO.lead}
            </p>
            <p>{HOME_INTRO.mission}</p>
            <p>
              {SITE.name} is run by {SITE.company}, the business {FOUNDER.name} founded in
              2003. He has published 400+ videos of his own, so the studio is set up the way
              creators actually work.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-base font-semibold">
              <Link
                href="/spaces"
                className="inline-flex items-center gap-2 text-brand-gold-deep hover:underline"
              >
                See the spaces <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/founder"
                className="inline-flex items-center gap-2 text-brand-gold-deep hover:underline"
              >
                Meet the founder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <LocationSection />
    </div>
  );
}
