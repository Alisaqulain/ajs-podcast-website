import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE } from "@/lib/site";

const mapQuery = encodeURIComponent(`${SITE.address}, India`);
const embedSrc = `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

/** "Where we are" — address, contact, and an embedded map. */
export function LocationSection() {
  return (
    <section
      id="location"
      className="scroll-mt-28 border-t border-luxury-border bg-sky-50/60 py-20 md:py-28"
      aria-labelledby="location-heading"
    >
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              Where we are
            </p>
            <h2
              id="location-heading"
              className="mt-4 font-display text-4xl font-semibold leading-tight text-luxury-heading md:text-5xl"
            >
              In the heart of Bengaluru
            </h2>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-gold-deep shadow-sm ring-1 ring-luxury-border">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-luxury-muted">
                    Address
                  </p>
                  <p className="mt-1 text-lg text-luxury-heading">{SITE.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-gold-deep shadow-sm ring-1 ring-luxury-border">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-luxury-muted">
                    Call
                  </p>
                  <p className="mt-1 text-lg text-luxury-heading">
                    <a href={`tel:+91${SITE.phones.mobile}`} className="hover:text-brand-gold-deep">
                      {SITE.phones.mobile}
                    </a>
                    <span className="mx-2 text-luxury-muted">·</span>
                    <a
                      href={`tel:${SITE.phones.landline.replace(/\s/g, "")}`}
                      className="hover:text-brand-gold-deep"
                    >
                      {SITE.phones.landline}
                    </a>
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-500 px-7 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                <Navigation className="h-4 w-4" /> Get directions
              </a>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-luxury-border bg-white px-7 text-sm font-semibold text-luxury-heading transition hover:border-sky-300"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>

          <div className="min-h-[22rem] overflow-hidden rounded-[2rem] border border-luxury-border bg-white shadow-[0_24px_60px_-30px_rgba(14,116,144,0.45)]">
            <iframe
              title={`Map showing ${SITE.name}`}
              src={embedSrc}
              className="h-full min-h-[22rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
