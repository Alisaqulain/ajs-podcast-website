import { listPodcastsPublic } from "@/lib/list-podcasts-public";
import { getLatestPodcastEpisodesForHome } from "@/lib/podcast-episodes";
import {
  clipsFromEpisodes,
  clipsFromYoutubeLinks,
  type AmbientClip,
} from "@/lib/youtube-ambient";

/** YouTube ambient clips for inner-page heroes (RSS/API → podcast URLs fallback). */
export async function getPageHeroAmbientClips(): Promise<AmbientClip[]> {
  const [episodes, podcasts] = await Promise.all([
    getLatestPodcastEpisodesForHome(12),
    listPodcastsPublic().catch(() => []),
  ]);

  const fromChannel = clipsFromEpisodes(episodes);
  if (fromChannel.length > 0) return fromChannel;

  return clipsFromYoutubeLinks(podcasts);
}
