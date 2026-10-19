import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { RecordedHereSection } from "@/components/home/recorded-here-section";
import { StudioSessionsGallery } from "@/components/home/studio-sessions-gallery";
import { CtaSection } from "@/components/home/cta-section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recorded Here",
  description: `Creators and channels who have recorded at ${SITE.name}, Bengaluru.`,
  openGraph: {
    title: `Recorded Here | ${SITE.name}`,
    description: `Creators and channels who have recorded at ${SITE.name}.`,
  },
};

export const dynamic = "force-dynamic";

export default async function CreatorsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Recorded here"
        title="Creators who've used our space"
        subtitle="Channels and shows recorded at the studio."
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
