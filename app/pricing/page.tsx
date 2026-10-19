import type { Metadata } from "next";
import { SpacesSection } from "@/components/home/spaces-section";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

const PRICING_POINTS = [
  "₹1,000 for an hour – no minimum booking",
  "Choose from our 3 spaces",
  "Lights and wireless mic included",
  "Videographer, camera, editing and extra equipment are optional add-ons",
];

export const metadata: Metadata = {
  title: "Pricing",
  description: `Podcast studio hire at ${SITE.name}, Bengaluru: ₹1,000 per hour including space, lights and a wireless RODE mic.`,
  openGraph: {
    title: `Pricing | ${SITE.name}`,
    description: "₹1,000 per hour. Videographer, camera, editing and extra equipment available as add-ons.",
  },
};

export default async function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="One simple rate"
        subtitle={
          <ul className="space-y-1.5">
            {PRICING_POINTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        }
      >
        <GoldButton href="/book">Book now</GoldButton>
      </PageHero>
      <SpacesSection showBookLink={false} />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
