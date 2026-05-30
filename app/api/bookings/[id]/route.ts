import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import { BOOKING_WORKFLOW_STATUSES } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

const patchSchema = z.object({
  status: z.enum(BOOKING_WORKFLOW_STATUSES as [string, ...string[]]).optional(),
});

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

  const json = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const $set: Record<string, unknown> = { updatedAt: new Date() };
  if (parsed.data.status) $set.status = parsed.data.status;

  const result = await db
    .collection("bookings")
    .updateOne({ _id: new ObjectId(id) }, { $set });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const doc = await db.collection("bookings").findOne({ _id: new ObjectId(id) });
  return NextResponse.json({
    ...doc,
    _id: doc!._id.toString(),
    packageId: doc!.packageId?.toString?.() ?? doc!.packageId,
  });
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

  const result = await db
    .collection("bookings")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
