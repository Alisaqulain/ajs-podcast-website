import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/hero/page-hero";
import { Container } from "@/components/ui/container";
import { GoldButton } from "@/components/ui/gold-button";
import { buttonStyles } from "@/components/ui/button";
import { HOME_INTRO, HOME_WHY_US, HOME_SERVICES } from "@/lib/site-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: SITE.description,
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
        title={SITE.name}
        subtitle={
          <>
            <span className="font-display text-lg text-brand-gold-deep md:text-xl">
              {SITE.tagline}
            </span>
            <span className="mt-4 block text-base text-luxury-body">
              {HOME_INTRO.mission}
            </span>
          </>
        }
      >
        <GoldButton href={SITE.social.youtube}>Subscribe on YouTube</GoldButton>
      </PageHero>

      <Container className="mt-16 space-y-16 md:mt-24 md:space-y-24">
        <section className="mx-auto max-w-3xl space-y-5 text-center leading-relaxed text-luxury-body">
          <h2 className="font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
            {HOME_INTRO.title}
          </h2>
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
            {HOME_WHY_US.title}
          </h2>
          <p className="mt-4 max-w-2xl text-luxury-body">{HOME_WHY_US.closing}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {HOME_WHY_US.focusAreas.map((item) => (
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

        <section>
          <h2 className="font-display text-3xl font-semibold text-luxury-heading">
            {HOME_SERVICES.title}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {HOME_SERVICES.items.map((service) => (
              <article
                key={service.title}
                className="glass-panel rounded-3xl p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-luxury-heading">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-luxury-body">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-4xl p-8 text-center md:p-10">
          <p className="text-sm text-luxury-muted">{SITE.address}</p>
          <p className="mt-2 text-sm text-luxury-body">
            {SITE.phones.landline} · {SITE.phones.mobile} · {SITE.contactEmail}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <GoldButton href={SITE.social.youtube}>Watch on YouTube</GoldButton>
            <Link href="/contact" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Contact
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
