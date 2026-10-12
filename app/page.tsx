import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/home-hero";
import { SITE } from "@/lib/site";
import { IntroductionSection } from "@/components/home/introduction-section";
import { WhyPodcastSection } from "@/components/home/why-podcast-section";
import { WhyUsSection } from "@/components/home/why-us-section";
import { ServicesSection } from "@/components/home/services-section";
import { IdealClientSection } from "@/components/home/ideal-client-section";
import { ProcessSection } from "@/components/home/process-section";
import { LatestConversations } from "@/components/home/latest-conversations";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PricingSection } from "@/components/home/pricing-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { getLatestPodcastEpisodesForHome } from "@/lib/podcast-episodes";

export const metadata: Metadata = {
  title: `${SITE.name} | Aj's Cycling Vlog`,
  description: SITE.description,
  keywords: [
    "Aj's Cycling Vlog",
    "AJ'S Studio Bangalore",
    "cycling vlog India",
    "Bangalore commute cycling",
    "ajsvlog YouTube",
    "podcast studio Bangalore",
  ],
};

export const revalidate = 300;

export default async function HomePage() {
  const episodes = await getLatestPodcastEpisodesForHome(12);

  return (
    <>
      <HomeHero />
      <IntroductionSection />
      <WhyPodcastSection />
      <WhyUsSection />
      <ServicesSection />
      <IdealClientSection />
      <ProcessSection />
      <LatestConversations episodes={episodes} />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
