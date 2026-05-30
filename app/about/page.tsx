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
import { HOME_FOUNDER, HOME_INTRO } from "@/lib/site-content";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Namrata",
  description:
    "Meet Namrata — visibility mentor, podcast strategist, and self-image coach behind BHAW Namrata.",
  openGraph: {
    title: `About | ${SITE.name}`,
    description: HOME_INTRO.mission,
  },
};

export default async function AboutPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="About"
        title={HOME_FOUNDER.title}
        subtitle={
          <>
            <span className="font-display text-lg text-brand-gold-deep md:text-xl">
              {HOME_FOUNDER.roles}
            </span>
            <span className="mt-4 block text-base text-luxury-body">
              {HOME_FOUNDER.belief}
            </span>
          </>
        }
      >
        <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
      </PageHero>

      <Container className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <section className="mx-auto max-w-3xl space-y-5 text-center leading-relaxed text-luxury-body">
          <h2 className="font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
            {HOME_INTRO.title}
          </h2>
          <p className="font-display text-lg text-brand-gold-deep">{FOUNDER_TAGLINE}</p>
          <p className="text-lg font-medium text-luxury-heading">{HOME_INTRO.lead}</p>
          <p>{HOME_INTRO.mission}</p>
          <p className="font-medium text-luxury-heading">{HOME_INTRO.attention}</p>
          <p>{HOME_INTRO.podcastTrust}</p>
          <p className="font-display text-lg font-medium text-luxury-heading">
            {HOME_INTRO.closing}
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
          <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
        </section>
      </Container>
    </div>
  );
}
