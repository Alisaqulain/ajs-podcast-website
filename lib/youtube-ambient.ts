import type { PodcastEpisodeCard } from "@/lib/podcast-episodes";
import { filterLongFormLandscapeEpisodes } from "@/lib/youtube-episode-eligibility";

export type AmbientClip = {
  videoId: string;
  title: string;
};

/** Muted, looping YouTube embed suitable for ambient / background playback. */
/** Fast-loading still frame — shown before any embed mounts. */
export function youtubePosterSrc(videoId: string, quality: "hq" | "max" = "hq") {
  const file = quality === "max" ? "maxresdefault" : "hqdefault";
  return `https://i.ytimg.com/vi/${videoId}/${file}.jpg`;
}

export function youtubeAmbientEmbedSrc(videoId: string, autoplay: boolean) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: "1",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
    iv_load_policy: "3",
    disablekb: "1",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function clipsFromEpisodes(
  episodes: PodcastEpisodeCard[]
): AmbientClip[] {
  return filterLongFormLandscapeEpisodes(episodes.filter(Boolean)).map((e) => ({
    videoId: e.videoId,
    title: e.title,
  }));
}

/** Build ambient clips from arbitrary YouTube watch URLs (e.g. MongoDB podcast rows). */
export function clipsFromYoutubeLinks(
  rows: { title: string; youtubeLink: string }[]
): AmbientClip[] {
  const seen = new Set<string>();
  const out: AmbientClip[] = [];
  for (const row of rows) {
    const m = row.youtubeLink.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = m?.[1];
    if (!videoId || seen.has(videoId)) continue;
    seen.add(videoId);
    out.push({ videoId, title: row.title });
    if (out.length >= 12) break;
  }
  return out;
}
