import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import { authOptions } from "@/lib/auth";
import { publishedFilterForPublic } from "@/lib/cms-content";
import { ensureUniqueSlug } from "@/lib/content-slug";
import type { ContentStatus } from "@/lib/cms";
import type { TestimonialInput } from "@/models/testimonial";

export const dynamic = "force-dynamic";

function normalizeTestimonialBody(body: Partial<TestimonialInput>) {
  const content = (body.content ?? body.message ?? "").trim();
  const featuredImage = (body.featuredImage ?? body.image ?? "").trim();
  return {
    name: body.name?.trim() ?? "",
    title: (body.title ?? "").trim(),
    shortDescription: (body.shortDescription ?? "").trim(),
    content,
    message: content,
    featuredImage,
    image: featuredImage,
    videoUrl: (body.videoUrl ?? "").trim(),
    status: (body.status ?? "published") as ContentStatus,
    rating: body.rating,
  };
}

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json([]);

  const session = await getServerSession(authOptions);
  const isAdmin = Boolean(session?.user?.email);
  const filter = isAdmin ? {} : publishedFilterForPublic();

  const docs = await db
    .collection("testimonials")
    .find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .toArray();

  return NextResponse.json(
    docs.map((d) => ({
      ...d,
      _id: d._id.toString(),
      content: d.content ?? d.message ?? "",
      message: d.message ?? d.content ?? "",
      featuredImage: d.featuredImage ?? d.image ?? "",
      image: d.image ?? d.featuredImage ?? "",
    }))
  );
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const body = (await req.json()) as TestimonialInput & { rating?: unknown };
  const fields = normalizeTestimonialBody(body);

  let rating: number | undefined;
  const rawR = body.rating as unknown;
  if (rawR != null && rawR !== "") {
    const r = Number(rawR);
    if (Number.isFinite(r) && r >= 1 && r <= 5) rating = Math.round(r);
  }

  if (!fields.name || !fields.content) {
    return NextResponse.json(
      { error: "name and content are required" },
      { status: 400 }
    );
  }

  const slug = await ensureUniqueSlug(
    db,
    "testimonials",
    fields.name,
    body.slug
  );

  const now = new Date();
  const doc = {
    ...fields,
    slug,
    ...(rating != null ? { rating } : {}),
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("testimonials").insertOne(doc);
  return NextResponse.json({ ...doc, _id: result.insertedId.toString() });
}
