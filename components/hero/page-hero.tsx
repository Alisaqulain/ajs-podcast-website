import {
  PageHeroVideo,
  type PageHeroVideoProps,
} from "@/components/hero/page-hero-video";

export type PageHeroProps = Omit<PageHeroVideoProps, "ambientClips">;

/**
 * Inner-page hero. Uses the animated studio backdrop (or NEXT_PUBLIC_PAGE_HERO_VIDEO_URL
 * when set) — the YouTube ambient clips came from the founder's vlog channel, which
 * is off-brand for the studio.
 */
export async function PageHero(props: PageHeroProps) {
  return <PageHeroVideo {...props} ambientClips={[]} />;
}
