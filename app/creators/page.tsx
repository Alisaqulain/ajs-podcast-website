import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { RecordedHereSection } from "@/components/home/recorded-here-section";
import { StudioSessionsGallery } from "@/components/home/studio-sessions-gallery";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Record Here",
  description: `Creators and channels who have recorded at ${SITE.name}, Bengaluru.`,
  openGraph: {
    title: `Record Here | ${SITE.name}`,
    description: `Creators and channels who have recorded at ${SITE.name}.`,
  },
};

export const dynamic = "force-dynamic";

export default async function CreatorsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Record here"
        title="Be the next creator to use our space"
        compact
      >
        <GoldButton href="/book">Record with us</GoldButton>
      </PageHero>
      <StudioSessionsGallery />
      <RecordedHereSection showViewAll={false} />
      <CtaSection />
    </div>
  );
}
