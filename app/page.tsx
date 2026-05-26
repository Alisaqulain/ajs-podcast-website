import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/home-hero";
import { SITE } from "@/lib/site";
import { LatestConversations } from "@/components/home/latest-conversations";
import { FounderSection } from "@/components/home/founder-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { SocialProof } from "@/components/home/social-proof";
import { PricingSection } from "@/components/home/pricing-section";
import { CtaSection } from "@/components/home/cta-section";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import { WhyBookSection } from "@/components/home/why-book-section";
import { CredibilitySection } from "@/components/home/credibility-section";
import { RoiSection } from "@/components/home/roi-section";
import { SeoBenefitsSection } from "@/components/home/seo-benefits-section";
import { MediaJournalSpotlight } from "@/components/home/media-journal-spotlight";
import { getLatestPodcastEpisodesForHome } from "@/lib/podcast-episodes";

export const metadata: Metadata = {
  title: `${SITE.name} | Founder Podcast Booking & Personal Branding`,
  description:
    "Book a premium founder podcast with BHAW Namrata. Studio production, SEO-friendly episode assets, credibility-building interviews, and social-ready clips for entrepreneurs and women leaders in India.",
  keywords: [
    "founder podcast India",
    "book podcast guest slot",
    "business podcast booking",
    "personal branding podcast",
    "podcast SEO visibility",
    "BHAW Namrata",
  ],
};

/** Aligns with YouTube RSS/API fetch revalidation — fresh uploads surface without redeploys. */
export const revalidate = 300;

export default async function HomePage() {
  const episodes = await getLatestPodcastEpisodesForHome(12);

  return (
    <>
      <HomeHero />
      <LatestConversations episodes={episodes} />
      <WhyBookSection syncedEpisodeCount={episodes.length} />
      <TestimonialsSection />
      <CredibilitySection />
      <RoiSection />
      <SeoBenefitsSection />
      <FounderSection />
      <MediaJournalSpotlight />
      <SocialProof />
      <PricingSection />
      <CtaSection />
      <NewsletterCta />
    </>
  );
}
