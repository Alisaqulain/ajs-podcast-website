import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import { listArticles } from "@/lib/data";
import { BlogCard } from "@/components/blog/blog-card";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Articles",
  description:
    `Podcasting tips, production notes, and brand storytelling from ${SITE.name}.`,
  openGraph: {
    title: `Articles | ${SITE.name}`,
    description: "Podcasting tips, production notes, and brand storytelling from AJ's Studio Space.",
  },
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await listArticles();

  const cards = articles.map((b) => ({
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
    hrefPrefix: "/articles" as const,
  }));

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Articles"
        title="Notes from the studio"
        subtitle="Practical reads on starting a podcast, sounding great on mic, and turning conversations into content."
        align="left"
      >
        <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
      </PageHero>

      <Container className="mt-14">
        {cards.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-luxury-body">
            New articles are on the way. Explore the{" "}
            <a
              href="/blog"
              className="font-semibold text-brand-gold-deep underline hover:text-brand-gold"
            >
              blog
            </a>{" "}
            in the meantime.
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
