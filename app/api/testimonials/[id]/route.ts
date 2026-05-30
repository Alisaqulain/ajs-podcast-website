import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import { ensureUniqueSlug } from "@/lib/content-slug";
import type { ContentStatus } from "@/lib/cms";
import type { TestimonialInput } from "@/models/testimonial";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

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
  const existing = await db.collection("testimonials").findOne({ _id: oid });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json()) as Partial<TestimonialInput>;
  const update: Record<string, unknown> = { updatedAt: new Date() };

  if (body.name !== undefined) update.name = String(body.name).trim();
  if (body.title !== undefined) update.title = String(body.title).trim();
  if (body.shortDescription !== undefined) {
    update.shortDescription = String(body.shortDescription).trim();
  }
  if (body.content !== undefined || body.message !== undefined) {
    const content = String(body.content ?? body.message).trim();
    update.content = content;
    update.message = content;
  }
  if (body.featuredImage !== undefined || body.image !== undefined) {
    const img = String(body.featuredImage ?? body.image).trim();
    update.featuredImage = img;
    update.image = img;
  }
  if (body.videoUrl !== undefined) {
    update.videoUrl = String(body.videoUrl).trim();
  }
  if (body.status !== undefined) {
    update.status = body.status as ContentStatus;
  }
  if (body.rating !== undefined) {
    if (body.rating === null) {
      update.rating = null;
    } else {
      const r = Number(body.rating);
      if (Number.isFinite(r) && r >= 1 && r <= 5) {
        update.rating = Math.round(r);
      }
    }
  }

  if (body.slug !== undefined || body.name !== undefined) {
    const name = (update.name as string) || String(existing.name);
    update.slug = await ensureUniqueSlug(
      db,
      "testimonials",
      name,
      body.slug !== undefined ? String(body.slug) : undefined,
      oid
    );
  }

  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  await db.collection("testimonials").updateOne({ _id: oid }, { $set: update });

  const doc = await db.collection("testimonials").findOne({ _id: oid });
  return NextResponse.json({ ...doc, _id: doc?._id?.toString() });
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

  await db.collection("testimonials").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
