import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import { listBlogs } from "@/lib/data";
import { BlogCard } from "@/components/blog/blog-card";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    `Podcasting tips, production notes, and brand storytelling from ${SITE.name}.`,
  openGraph: {
    title: `Blog | ${SITE.name}`,
    description: "Podcasting tips, production notes, and brand storytelling from Anushtan.",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await listBlogs();

  const cards = blogs.map((b) => ({
    id: b.id,
    slug: String(b.slug),
    title: String(b.title),
    coverImage:
      b.featuredImage || b.coverImage
        ? String(b.featuredImage || b.coverImage)
        : undefined,
    seoDescription:
      b.shortDescription || b.seoDescription
        ? String(b.shortDescription || b.seoDescription)
        : undefined,
    createdAt: b.createdAt,
    hrefPrefix: "/blog" as const,
  }));

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Journal"
        title="Notes from the studio"
        subtitle="Practical guides on starting a podcast, sounding great on mic, and turning conversations into content."
        align="left"
      >
        <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
      </PageHero>

      <Container className="mt-14">
        {cards.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-luxury-body">
            Fresh articles are being prepared. Meanwhile, catch the latest on the{" "}
            <a
              href={SITE.videosUrl}
              className="font-semibold text-brand-gold-deep underline hover:text-brand-gold"
            >
              podcast
            </a>
            .
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((b, i) => (
              <BlogCard key={b.id ?? b.slug} blog={b} index={i} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
