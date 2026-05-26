import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import {
  FOUNDER_FEARS,
  FOUNDER_MISSION,
  FOUNDER_QUALIFICATIONS,
  FOUNDER_STORY_CLOSING,
  FOUNDER_STORY_CLOSING_LINE,
  FOUNDER_STORY_INTRO,
  FOUNDER_TAGLINE,
  FOUNDER_VISION,
} from "@/lib/founder-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Namrata",
  description:
    "Mission, vision, and the story behind BHAW Namrata — visibility, podcasting, and personal branding.",
  openGraph: {
    title: `About | ${SITE.name}`,
    description:
      "Discover Namrata’s story, mission, and approach to expression, visibility, and personal branding.",
  },
};

export default async function AboutPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="About"
        title={SITE.name}
        subtitle={
          <>
            <span className="font-display text-lg text-brand-gold-deep md:text-xl">
              {FOUNDER_TAGLINE}
            </span>
            <span className="mt-4 block text-base text-luxury-body">
              Mission, vision, and the story behind visibility, podcasting, and
              personal branding with Namrata.
            </span>
          </>
        }
      >
        <CTAButton intent="book">Book Podcast Now</CTAButton>
      </PageHero>

      <Container className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <section className="text-center">
          <h2 className="font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
            {SITE.name}
          </h2>
          <p className="mt-2 font-display text-lg text-brand-gold-deep md:text-xl">
            {FOUNDER_TAGLINE}
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-semibold text-luxury-heading">
            My Story
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-luxury-body">
            {FOUNDER_STORY_INTRO.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-luxury-border bg-luxury-bg/80 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-deep">
              As a woman entrepreneur, I deeply understood the fears many people
              silently carry
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {FOUNDER_FEARS.map((fear) => (
                <li key={fear} className="flex gap-3 text-sm text-luxury-body">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold-deep" />
                  {fear}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-4 leading-relaxed text-luxury-body">
            {FOUNDER_STORY_CLOSING.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <p className="font-display text-lg font-medium text-luxury-heading">
              {FOUNDER_STORY_CLOSING_LINE}
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-luxury-heading">
            Educational Qualification &amp; Experience
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {FOUNDER_QUALIFICATIONS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-luxury-border bg-surface/90 px-4 py-3 text-sm text-luxury-body"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div className="glass-panel rounded-4xl p-8 md:p-10">
            <h3 className="font-display text-xl font-semibold text-luxury-heading">
              Mission
            </h3>
            <p className="mt-3 leading-relaxed text-luxury-body">
              {FOUNDER_MISSION}
            </p>
          </div>
          <div className="glass-panel rounded-4xl p-8 md:p-10">
            <h3 className="font-display text-xl font-semibold text-luxury-heading">
              Vision
            </h3>
            <p className="mt-3 leading-relaxed text-luxury-body">
              {FOUNDER_VISION}
            </p>
          </div>
        </section>

        <section className="flex flex-wrap gap-4">
          <CTAButton intent="book">Book Podcast Now</CTAButton>
          <CTAButton intent="enquire" variant="outline">
            Send a message
          </CTAButton>
          <CTAButton intent="enquire" variant="ghost">
            Explore the podcast
          </CTAButton>
        </section>
      </Container>
    </div>
  );
}
