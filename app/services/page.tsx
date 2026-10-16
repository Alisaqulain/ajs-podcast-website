import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { ServicesSection } from "@/components/home/services-section";
import { IdealClientSection } from "@/components/home/ideal-client-section";
import { ProcessSection } from "@/components/home/process-section";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Podcast recording, full podcast production, short-form clips, and brand videos at ${SITE.name}, Bengaluru.`,
  openGraph: {
    title: `Services | ${SITE.name}`,
    description:
      "Podcast recording, full production, short-form clips, and brand & training videos.",
  },
};

export default async function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Everything you need to make a great show"
        subtitle="Book the room for an hour, or hand us the whole podcast. We plan, record, edit, and publish so you can focus on the conversation."
      >
        <GoldButton href="/pricing">See pricing</GoldButton>
      </PageHero>
      <ServicesSection showMoreLink={false} />
      <IdealClientSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
