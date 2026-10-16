import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LatestConversationsCta } from "@/components/home/latest-conversations-cta";
import { LatestConversationsGrid } from "@/components/podcast/latest-conversations-grid";
import type { PodcastEpisodeCard } from "@/lib/podcast-episodes";
import {
  getLatestPodcastEpisodesForHome,
  podcastEpisodesVideoObjectJsonLd,
} from "@/lib/podcast-episodes";
import { SITE } from "@/lib/site";

const HOME_EPISODE_COUNT = 4;

export async function LatestConversations(props?: {
  episodes?: PodcastEpisodeCard[];
}) {
  const episodes =
    props?.episodes ??
    (await getLatestPodcastEpisodesForHome(HOME_EPISODE_COUNT));
  const siteUrl = SITE.url.replace(/\/$/, "");
  const jsonLd =
    episodes.length > 0
      ? podcastEpisodesVideoObjectJsonLd(episodes, siteUrl)
      : null;

  return (
    <section
      id="latest-podcasts"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-bg py-12 sm:py-16 md:py-28"
      aria-labelledby="latest-conversations-heading"
    >
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Container>
        <div className="readable-content-panel mb-8 w-full rounded-[1.25rem] px-4 py-5 sm:mb-12 sm:rounded-[1.5rem] sm:px-7 sm:py-7 md:mx-auto md:max-w-3xl">
          <SectionHeading
            id="latest-conversations-heading"
            eyebrow="Episodes"
            title="Latest from the Studio"
            subtitle="Conversations recorded at Anushtan. Preview here or watch the full episode on YouTube."
            className="mb-0"
          />
        </div>
        <LatestConversationsGrid episodes={episodes} />
        <LatestConversationsCta />
      </Container>
    </section>
  );
}
