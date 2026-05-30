import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import { ensureUniqueSlug } from "@/lib/content-slug";
import {
  normalizeContentFields,
  serializeContentRow,
  type ContentDocInput,
} from "@/lib/cms-content";
import type { ContentStatus } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

export async function GET(_req: NextRequest, context: Ctx) {
  const { id } = context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const db = await getDb();
  if (!db) return NextResponse.json(null, { status: 404 });
  const doc = await db
    .collection("articles")
    .findOne({ _id: new ObjectId(id) });
  if (!doc) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(serializeContentRow(doc));
}

export async function PATCH(req: NextRequest, context: Ctx) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const oid = new ObjectId(id);
  const existing = await db.collection("articles").findOne({ _id: oid });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json()) as Partial<ContentDocInput>;
  const update: Record<string, unknown> = { updatedAt: new Date() };

  if (
    body.title !== undefined ||
    body.content !== undefined ||
    body.shortDescription !== undefined ||
    body.featuredImage !== undefined ||
    body.coverImage !== undefined ||
    body.videoUrl !== undefined ||
    body.status !== undefined ||
    body.seoTitle !== undefined ||
    body.seoDescription !== undefined
  ) {
    const merged = normalizeContentFields({
      title: body.title ?? String(existing.title),
      shortDescription:
        body.shortDescription ?? String(existing.shortDescription ?? ""),
      content: body.content ?? String(existing.content),
      featuredImage:
        body.featuredImage ??
        body.coverImage ??
        String(existing.featuredImage ?? existing.coverImage ?? ""),
      videoUrl: body.videoUrl ?? String(existing.videoUrl ?? ""),
      status: (body.status ?? existing.status ?? "draft") as ContentStatus,
      seoTitle: body.seoTitle ?? String(existing.seoTitle ?? existing.title),
      seoDescription:
        body.seoDescription ?? String(existing.seoDescription ?? ""),
    });
    Object.assign(update, merged);
  }

  if (body.slug !== undefined || body.title !== undefined) {
    const title = (update.title as string) || String(existing.title);
    update.slug = await ensureUniqueSlug(
      db,
      "articles",
      title,
      body.slug !== undefined ? String(body.slug) : undefined,
      oid
    );
  }

  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  await db.collection("articles").updateOne({ _id: oid }, { $set: update });
  const doc = await db.collection("articles").findOne({ _id: oid });
  return NextResponse.json(serializeContentRow(doc!));
}

export async function DELETE(_req: NextRequest, context: Ctx) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  await db.collection("articles").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
