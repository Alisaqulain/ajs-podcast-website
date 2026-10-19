import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { listTestimonials } from "@/lib/data";
import { SITE } from "@/lib/site";

/**
 * "Recorded here" — creators who have used the studio.
 * Managed in Admin → Recorded Here (stored in the testimonials collection):
 *   name = channel name, title = channel link or @handle, photo = featured image.
 */
type Creator = {
  id: string;
  channel: string;
  link?: string;
  handle?: string;
  photo?: string;
  note?: string;
};

function toLink(raw: string): { href?: string; handle?: string } {
  const v = raw.trim();
  if (!v) return {};
  if (/^https?:\/\//i.test(v)) {
    const at = v.match(/@[\w.-]+/)?.[0];
    return { href: v, handle: at };
  }
  if (v.startsWith("@")) {
    return { href: `https://www.youtube.com/${v}`, handle: v };
  }
  return { handle: v };
}

async function getCreators(): Promise<Creator[]> {
  const rows = await listTestimonials().catch(() => []);
  return rows.map((r) => {
    const { href, handle } = toLink(String(r.title || ""));
    return {
      id: String(r.id ?? r._id ?? r.name),
      channel: String(r.name || ""),
      link: href,
      handle,
      photo: String(r.featuredImage || r.image || "") || undefined,
      note: String(r.shortDescription || "") || undefined,
    };
  });
}

export async function RecordedHereSection({
  limit,
  showViewAll = true,
}: {
  limit?: number;
  showViewAll?: boolean;
} = {}) {
  const all = await getCreators();
  const creators = typeof limit === "number" ? all.slice(0, limit) : all;

  return (
    <section
      id="recorded-here"
      className="scroll-mt-28 border-t border-luxury-border bg-white py-20 md:py-24"
      aria-labelledby="recorded-here-heading"
    >
      <Container>
        <SectionHeading
          id="recorded-here-heading"
          eyebrow="Record here"
          title="Be the Next Creator to Use Our Space"
        />

        {creators.length > 0 ? (
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {creators.map((c) => {
              const card = (
                <>
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-sky-100">
                    {c.photo ? (
                      <Image
                        src={c.photo}
                        alt={`${c.channel} recording at ${SITE.name}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sky-400">
                        <Camera className="h-10 w-10" />
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-luxury-heading">{c.channel}</p>
                      {c.handle ? (
                        <p className="truncate text-sm text-brand-gold-deep">{c.handle}</p>
                      ) : null}
                      {c.note ? (
                        <p className="mt-1 line-clamp-2 text-sm text-luxury-muted">{c.note}</p>
                      ) : null}
                    </div>
                    {c.link ? (
                      <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-luxury-muted transition group-hover:text-brand-gold-deep" />
                    ) : null}
                  </div>
                </>
              );
              return (
                <li key={c.id}>
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-3xl p-2 transition hover:bg-sky-50"
                    >
                      {card}
                    </a>
                  ) : (
                    <div className="group rounded-3xl p-2">{card}</div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}

        {showViewAll && creators.length > 0 && typeof limit === "number" && all.length > limit ? (
          <div className="mt-10 text-center">
            <Link
              href="/creators"
              className="text-sm font-semibold text-brand-gold-deep underline-offset-4 hover:underline"
            >
              See everyone who&apos;s recorded here →
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
