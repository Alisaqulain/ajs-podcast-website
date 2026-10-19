import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/home-hero";
import { SITE } from "@/lib/site";
import { HomeOfferSection } from "@/components/home/home-offer-section";
import { LocationSection } from "@/components/home/location-section";
import { RecordedHereSection } from "@/components/home/recorded-here-section";
import { ExploreSection } from "@/components/home/explore-section";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | ${SITE.tagline}` },
  description: SITE.description,
  keywords: [
    "AJ's Studio Space",
    "Anushtan",
    "podcast studio Bengaluru",
    "podcast studio Bangalore",
    "podcast studio Castle Street",
    "video podcast recording Bangalore",
    "studio rental Bengaluru",
  ],
};

export const revalidate = 300;

/** Kept deliberately short: what we offer, where we are, who's recorded here, then signposts. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeOfferSection />
      <LocationSection />
      <RecordedHereSection limit={4} />
      <ExploreSection />
    </>
  );
}
