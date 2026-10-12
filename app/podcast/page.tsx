import type { Metadata } from "next";
import { PodcastDirectory } from "@/components/podcast/podcast-directory";
import { listPodcastsPublic } from "@/lib/list-podcasts-public";
import { getPageHeroAmbientClips } from "@/lib/page-hero-clips";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Watch Aj's Cycling Vlog and studio videos on YouTube—latest uploads from AJ'S Studio.",
  openGraph: {
    title: `Podcast | ${SITE.name}`,
    description:
      "Explore episodes, watch on YouTube, and search the full library.",
  },
};

export const revalidate = 300;

export default async function PodcastPage() {
  const [initial, ambientClips] = await Promise.all([
    listPodcastsPublic(),
    getPageHeroAmbientClips(),
  ]);

  return <PodcastDirectory initial={initial} ambientClips={ambientClips} />;
}
