import type { Metadata } from "next";
import { SpacesSection } from "@/components/home/spaces-section";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { ServicesSection } from "@/components/home/services-section";
import { IdealClientSection } from "@/components/home/ideal-client-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Podcast studio hire from ₹1,000/hour at ${SITE.name}, Bengaluru: 2, 3 & 5-seater sets, lights and a wireless RODE mic, plus videographer and editing add-ons.`,
  openGraph: {
    title: `Services | ${SITE.name}`,
    description:
      "Studio hire from ₹1,000/hour, plus videographer, editing and equipment add-ons.",
  },
};

export default async function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Everything you need to make a great show"
        subtitle="Hire a 2, 3 or 5-seater studio by the hour, with lights and a wireless RODE mic included. Add a videographer, editing or extra gear when you need it."
      >
        <GoldButton href="/pricing">See pricing</GoldButton>
      </PageHero>
      <SpacesSection />
      <ServicesSection showMoreLink={false} />
      <IdealClientSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
