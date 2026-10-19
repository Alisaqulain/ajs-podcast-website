import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/site";

/** Photos from real sessions recorded at the studio (files in /public/studio-sessions). */
const SESSION_PHOTOS = [
  { src: "/studio-sessions/session-3.jpeg", w: 1600, h: 1200 },
  { src: "/studio-sessions/session-1.jpeg", w: 1280, h: 720 },
  { src: "/studio-sessions/session-2.jpeg", w: 1280, h: 720 },
  { src: "/studio-sessions/session-4.jpeg", w: 1600, h: 1200 },
  { src: "/studio-sessions/session-5.jpeg", w: 1600, h: 1200 },
] as const;

/** "Inside a session" — photo gallery of conversations recorded at the studio. */
export function StudioSessionsGallery() {
  return (
    <section
      id="sessions"
      className="scroll-mt-28 border-t border-luxury-border bg-sky-50/60 py-20 md:py-24"
      aria-labelledby="sessions-heading"
    >
      <Container>
        <SectionHeading
          id="sessions-heading"
          eyebrow="Inside a session"
          title="Conversations Recorded Here"
          subtitle={`A look at real sessions at ${SITE.name}.`}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SESSION_PHOTOS.map((p, i) => (
            <li
              key={p.src}
              className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sky-100 shadow-[0_24px_60px_-30px_rgba(14,116,144,0.45)]">
                <Image
                  src={p.src}
                  alt={`A podcast session recorded at ${SITE.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
