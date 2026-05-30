import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/hero/page-hero";
import { Container } from "@/components/ui/container";
import { ImageCard } from "@/components/ui/image-card";
import { getArticleBySlug } from "@/lib/data";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";
import { SITE } from "@/lib/site";
import { optimizeMediaSrc } from "@/lib/media-url";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug);
  if (!post) {
    return { title: "Article" };
  }

  const title = String(post.seoTitle || post.title);
  const description = String(
    post.seoDescription || post.shortDescription || ""
  ).slice(0, 160);
  const cover =
    post.featuredImage || post.coverImage
      ? String(post.featuredImage || post.coverImage)
      : undefined;

  return {
    title,
    description: description || SITE.description,
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: description || SITE.description,
      type: "article",
      url: `${SITE.url}/articles/${params.slug}`,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function ArticlePostPage({ params }: Props) {
  const post = await getArticleBySlug(params.slug);
  if (!post) notFound();

  const html = sanitizeBlogHtml(String(post.content));
  const cover = post.featuredImage || post.coverImage;
  const coverStr = cover ? String(cover) : null;
  const videoUrl = post.videoUrl ? String(post.videoUrl) : null;

  return (
    <article className="pb-24">
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
        subtitle={
          post.shortDescription
            ? String(post.shortDescription)
            : post.seoDescription
              ? String(post.seoDescription)
              : undefined
        }
        align="left"
      />

      {coverStr ? (
        <Container className="mt-10 max-w-4xl">
          <ImageCard
            type="blog"
            src={coverStr}
            alt={`Cover: ${String(post.title)}`}
            textSafeOverlay
            priority
            className="ring-1 ring-luxury-border"
            sizes="(max-width:1024px) 100vw, 896px"
          />
        </Container>
      ) : null}

      {videoUrl ? (
        <Container className="mt-8 max-w-4xl">
          <video
            src={optimizeMediaSrc(videoUrl)}
            controls
            playsInline
            className="w-full rounded-3xl shadow-luxury-card"
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
