import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { SpacesSection } from "@/components/home/spaces-section";
import { ProcessSection } from "@/components/home/process-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio Spaces",
  description: `Three podcast studio sets at ${SITE.name}, Bengaluru: 2-seater, 3-seater and 5-seater, plus a green room. ₹1,000 per hour with lights and a wireless RODE mic.`,
  openGraph: {
    title: `Studio Spaces | ${SITE.name}`,
    description: "2, 3 & 5-seater podcast sets and a green room, from ₹1,000 an hour.",
  },
};

export default async function SpacesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Studio spaces"
        title="A set for every conversation"
        subtitle="Choose a 2, 3 or 5-seater studio, get ready in the green room, and start recording. ₹1,000 an hour with lights and a wireless RODE mic included."
      >
        <GoldButton href="/book">Book a space</GoldButton>
      </PageHero>
      <SpacesSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
