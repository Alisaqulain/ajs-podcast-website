import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import { authOptions } from "@/lib/auth";
import {
  buildContentDocument,
  publishedFilterForPublic,
  serializeContentRow,
  type ContentDocInput,
} from "@/lib/cms-content";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const db = await getDb();
  if (!db) return NextResponse.json([]);

  const session = await getServerSession(authOptions);
  const isAdmin = Boolean(session?.user?.email);
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  const filter: Record<string, unknown> = isAdmin ? {} : publishedFilterForPublic();
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { shortDescription: { $regex: q, $options: "i" } },
      { seoTitle: { $regex: q, $options: "i" } },
    ];
  }

  const docs = await db
    .collection("blogs")
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(docs.map(serializeContentRow));
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const body = (await req.json()) as ContentDocInput;
  const built = await buildContentDocument(db, "blogs", body);
  if ("error" in built) {
    return NextResponse.json({ error: built.error }, { status: 400 });
  }

  const result = await db.collection("blogs").insertOne(built.doc);
  return NextResponse.json(
    serializeContentRow({ ...built.doc, _id: result.insertedId })
  );
}
