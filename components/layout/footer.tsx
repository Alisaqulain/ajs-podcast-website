"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconVideo,
  IconLinkedin,
  IconInstagram,
  IconFacebook,
} from "@/components/icons/social-icons";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";
import { FOOTER_CONTENT } from "@/lib/site-content";
import { SiteLogo } from "@/components/brand/site-logo";

const social = [
  { href: SITE.social.instagram, icon: IconInstagram, label: "Instagram" },
  { href: SITE.social.youtube, icon: IconVideo, label: "YouTube" },
  { href: SITE.social.linkedin, icon: IconLinkedin, label: "LinkedIn" },
  { href: SITE.social.facebook, icon: IconFacebook, label: "Facebook" },
].filter((item) => Boolean(item.href?.trim()));

const linkClass =
  "text-luxury-body transition-colors hover:text-luxury-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold rounded-sm";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-luxury-border bg-white/60 backdrop-blur-md">
      <Container className="py-16 sm:py-20 pb-[max(3rem,calc(env(safe-area-inset-bottom,0px)+2rem))]">
        <div className="flex flex-col gap-12 md:flex-row md:flex-wrap md:items-start md:justify-between lg:flex-nowrap">
          <div className="max-w-md">
            <div className="flex items-center">
              <SiteLogo variant="footer" />
            </div>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-brand-gold-deep">
              {FOOTER_CONTENT.tagline}
            </p>
            <p className="mt-4 text-sm italic leading-relaxed text-luxury-body">
              &ldquo;{FOOTER_CONTENT.quote}&rdquo;
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_CONTENT.quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Social Media
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {social.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-luxury-border bg-surface text-luxury-body shadow-sm transition hover:border-brand-gold/50 hover:bg-brand-gold/10 hover:text-brand-gold-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-luxury-body">
              <li>
                <a href={`mailto:${SITE.contactEmail}`} className={linkClass}>
                  Email: {SITE.contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phones.landline.replace(/\s/g, "")}`} className={linkClass}>
                  {SITE.phones.landline}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phones.mobile}`} className={linkClass}>
                  {SITE.phones.mobile}
                </a>
              </li>
              <li>{SITE.address}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className={linkClass}>
                  Refund &amp; Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-luxury-border pt-8 text-center text-xs text-luxury-muted">
          © {new Date().getFullYear()} {SITE.name}. {FOOTER_CONTENT.tagline}.
        </p>
      </Container>
    </footer>
  );
}
