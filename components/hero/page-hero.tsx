import { getPageHeroAmbientClips } from "@/lib/page-hero-clips";
import {
  PageHeroVideo,
  type PageHeroVideoProps,
} from "@/components/hero/page-hero-video";

export type PageHeroProps = Omit<PageHeroVideoProps, "ambientClips">;

/** Server hero with YouTube ambient background when no page MP4 URL is configured. */
export async function PageHero(props: PageHeroProps) {
  const ambientClips = await getPageHeroAmbientClips();
  return <PageHeroVideo {...props} ambientClips={ambientClips} />;
}
