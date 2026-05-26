import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/hero/page-hero";
import { Container } from "@/components/ui/container";
import { ImageCard } from "@/components/ui/image-card";
import { getBlogBySlug } from "@/lib/data";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";
import { SITE } from "@/lib/site";
import { optimizeMediaSrc } from "@/lib/media-url";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return { title: "Article" };
  }

  const title = String(post.seoTitle || post.title);
  const description = String(post.seoDescription || "").slice(0, 160);
  const images = post.coverImage ? [String(post.coverImage)] : undefined;

  return {
    title,
    description: description || SITE.description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: description || SITE.description,
      type: "article",
      url: `${SITE.url}/blog/${params.slug}`,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description: description || SITE.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();

  const html = sanitizeBlogHtml(String(post.content));
  const cover = post.coverImage ? String(post.coverImage) : null;

  const coverAlt = cover
    ? `Cover image for article: ${String(post.title)}`
    : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: String(post.title),
    description: String(post.seoDescription || ""),
    datePublished: post.createdAt
      ? new Date(post.createdAt as Date).toISOString()
      : undefined,
    author: { "@type": "Person", name: "Namrata Tiwary Singh" },
    image: cover
      ? [
          {
            "@type": "ImageObject",
            url: optimizeMediaSrc(cover),
            caption: String(post.title),
            description: String(post.seoDescription || "").slice(0, 300),
            representativeOfPage: true,
          },
        ]
      : undefined,
    mainEntityOfPage: `${SITE.url}/blog/${params.slug}`,
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHero
        compact
        eyebrow={
          post.createdAt
            ? new Date(post.createdAt as Date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Article"
        }
        title={String(post.title)}
        subtitle={post.seoDescription ? String(post.seoDescription) : undefined}
        align="left"
      />

      {cover ? (
        <Container className="mt-10 max-w-4xl">
          <ImageCard
            type="blog"
            src={cover}
            alt={coverAlt ?? "Article cover image"}
            textSafeOverlay
            priority
            className="ring-1 ring-luxury-border"
            sizes="(max-width:1024px) 100vw, 896px"
          />
        </Container>
      ) : null}

      <Container className="mt-12 max-w-3xl">
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </article>
  );
}
