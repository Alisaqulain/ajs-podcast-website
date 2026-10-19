import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/hero/page-hero";
import { Container } from "@/components/ui/container";
import { GoldButton } from "@/components/ui/gold-button";
import { buttonStyles } from "@/components/ui/button";
import { StudioBackdrop } from "@/components/ui/studio-backdrop";
import { CtaSection } from "@/components/home/cta-section";
import { FOUNDER } from "@/lib/site-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Founder — ${FOUNDER.name}`,
  description: `${FOUNDER.name} founded ${SITE.name}, a podcast and video studio in Bengaluru. Creator of 400+ videos with 20+ years in retail brand-building.`,
  openGraph: {
    title: `${FOUNDER.name} | Founder of ${SITE.name}`,
    description: FOUNDER.summary,
    images: [FOUNDER.photo],
  },
};

export default async function FounderPage() {
  return (
    <div>
      <PageHero
        eyebrow="The founder"
        title={FOUNDER.name}
        subtitle={
          <>
            <span className="font-display text-lg text-brand-gold-deep md:text-xl">
              {FOUNDER.headline}
            </span>
            <span className="mt-4 block text-base text-luxury-body">
              Content has always been the connecting thread, from a cycling
              channel built from scratch to training videos for national brands
              to the {SITE.name} studio.
            </span>
          </>
        }
      >
        <GoldButton href="/book">Record with Ajay</GoldButton>
      </PageHero>

      <section className="relative overflow-hidden py-16 md:py-24">
        <StudioBackdrop waveform={false} />
        <Container className="relative">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* Photo column */}
            <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none">
              <div className="relative">
                <div className="absolute -inset-[3px] overflow-hidden rounded-[2.1rem]">
                  <div className="studio-photo-ring absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sky-950">
                  <Image
                    src={FOUNDER.photo}
                    alt={`${FOUNDER.name}, ${FOUNDER.role}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-cover object-[50%_25%]"
                  />
                </div>
              </div>
              <div className="mt-6 text-center lg:text-left">
                <p className="font-display text-2xl font-semibold text-luxury-heading">
                  {FOUNDER.name}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-gold-deep">
                  {FOUNDER.role}
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {FOUNDER.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col-reverse rounded-2xl border border-luxury-border bg-white/80 px-4 py-4 text-center shadow-sm backdrop-blur"
                  >
                    <dt className="mt-1 text-xs leading-snug text-luxury-muted">{s.label}</dt>
                    <dd className="font-display text-2xl font-semibold tabular-nums text-brand-gold-deep">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Story column */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
                The story
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-luxury-heading md:text-5xl">
                From the saddle to the studio
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-luxury-body md:text-lg">
                <p>{FOUNDER.summary}</p>
                <p>{FOUNDER.studioStory}</p>
              </div>

              <h3 className="mt-14 font-display text-2xl font-semibold text-luxury-heading">
                What Ajay brings to your session
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {FOUNDER.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-luxury-border bg-white/80 px-4 py-3.5 text-sm text-luxury-body shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Founder's channels */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#04223a] via-[#062f4f] to-[#0b3d63] py-16 text-white md:py-20">
        <StudioBackdrop variant="dark" rings={false} />
        <Container className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                Ajay&apos;s own channels
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                See the creator behind the studio
              </h2>
              <p className="mt-3 text-sky-100/80">
                Ajay still shoots, edits, and publishes his own videos. All his
                channels and latest uploads live on AJs Vlog.
              </p>
            </div>
            <a
              href={SITE.creatorSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 px-8 text-sm font-semibold text-[#04223a] transition hover:brightness-110"
            >
              Visit ajsvlog.com <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {FOUNDER.channels.map((c) => (
              <li key={c.name}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-5 backdrop-blur-sm transition hover:border-sky-300/50 hover:bg-white/10"
                >
                  <span>
                    <span className="block text-lg font-semibold">{c.name}</span>
                    <span className="text-sm text-sky-100/70">{c.topic}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-sky-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/about"
              className={buttonStyles({ variant: "ghost", className: "!text-sky-200 hover:!bg-white/10 hover:!text-white" })}
            >
              About the studio →
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection />
    </div>
  );
}
