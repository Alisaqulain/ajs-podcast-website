import type { Db } from "mongodb";
import { ObjectId } from "mongodb";
import type { ContentStatus } from "@/lib/cms";
import { PUBLISHED_CONTENT_FILTER } from "@/lib/cms";
import { ensureUniqueSlug } from "@/lib/content-slug";

export type ContentCollection = "articles" | "blogs";

export type ContentDocInput = {
  title: string;
  slug?: string;
  shortDescription?: string;
  content: string;
  featuredImage?: string;
  coverImage?: string;
  videoUrl?: string;
  status?: ContentStatus;
  seoTitle?: string;
  seoDescription?: string;
};

export function normalizeContentFields(body: Partial<ContentDocInput>) {
  const featuredImage = (
    body.featuredImage ??
    body.coverImage ??
    ""
  ).trim();
  return {
    title: body.title?.trim() ?? "",
    shortDescription: (body.shortDescription ?? "").trim(),
    content: body.content ?? "",
    featuredImage,
    coverImage: featuredImage,
    videoUrl: (body.videoUrl ?? "").trim(),
    status: (body.status ?? "draft") as ContentStatus,
    seoTitle: (body.seoTitle ?? body.title ?? "").trim(),
    seoDescription: (body.seoDescription ?? body.shortDescription ?? "").trim(),
  };
}

export async function buildContentDocument(
  db: Db,
  collection: ContentCollection,
  body: ContentDocInput,
  excludeId?: ObjectId
) {
  const fields = normalizeContentFields(body);
  if (!fields.title || !fields.content?.trim()) {
    return { error: "title and content are required" as const };
  }

  const slug = await ensureUniqueSlug(
    db,
    collection,
    fields.title,
    body.slug,
    excludeId
  );

  const now = new Date();
  return {
    doc: {
      ...fields,
      slug,
      createdAt: now,
      updatedAt: now,
    },
  };
}

export function publishedFilterForPublic() {
  return PUBLISHED_CONTENT_FILTER;
}

export function serializeContentRow<T extends { _id?: ObjectId }>(d: T) {
  return {
    ...d,
    _id: d._id?.toString?.() ?? d._id,
  };
}
