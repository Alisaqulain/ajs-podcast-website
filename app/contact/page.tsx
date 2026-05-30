import type { Metadata } from "next";
import {
  IconVideo,
  IconLinkedin,
  IconInstagram,
  IconFacebook,
} from "@/components/icons/social-icons";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { SITE } from "@/lib/site";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book Namrata for coaching, speaking, or collaborations—or send a message.",
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description: "Reach BHAW Namrata via the form, WhatsApp, or social channels.",
  },
};

const social = [
  { href: SITE.social.youtube, label: "YouTube", Icon: IconVideo },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
  { href: SITE.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: SITE.social.facebook, label: "Facebook", Icon: IconFacebook },
];

export default async function ContactPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Contact"
        title="Let’s design your next level of expression"
        subtitle="Coaching, podcast collaborations, and visibility mentorship inquiries are welcome. Share a few details and we'll follow up with the right next step."
        align="left"
      >
        <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
      </PageHero>

      <Container className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
        <ContactForm />

        <div className="space-y-8">
          <div className="glass-panel rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Email
            </p>
            <p className="mt-3 text-sm text-luxury-muted">
              For coaching, collaborations, and payment questions.
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-deep hover:text-brand-gold"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              {SITE.contactEmail}
            </a>
          </div>

          <div className="surface-form rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              WhatsApp
            </p>
            <p className="mt-3 text-sm text-luxury-muted">
              Prefer a quick hello? Message Namrata directly.
            </p>
            <a
              href={SITE.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold-gradient py-3 text-sm font-semibold text-[#1A1A1A] shadow-gold-glow transition hover:brightness-110 hover:-translate-y-0.5"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="glass-panel rounded-3xl p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Social
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border bg-luxury-bg text-luxury-body shadow-sm transition hover:border-brand-gold/45 hover:bg-brand-gold/10 hover:text-brand-gold-deep"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
