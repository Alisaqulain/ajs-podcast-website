import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Studio hours, full episode production, and monthly podcast packages at ${SITE.name}, Bengaluru.`,
  openGraph: {
    title: `Pricing | ${SITE.name}`,
    description: "Transparent studio and production packages. Book and pay online.",
  },
};

export default async function PricingPage() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Simple packages, studio-grade results"
        subtitle="Pick a recording slot or a fully produced show. Secure online payment and easy scheduling."
      >
        <GoldButton href="/book">Book now</GoldButton>
      </PageHero>
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
