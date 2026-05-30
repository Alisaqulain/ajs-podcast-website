import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { requireAdminSession } from "@/lib/api-auth";
import {
  isAllowedBookingDay,
  isValidBookingTime,
  parseYmd,
} from "@/lib/booking-rules";
import { BOOKING_WORKFLOW_STATUSES } from "@/lib/cms";

export const dynamic = "force-dynamic";

const createSchema = z.object({
  packageId: z.string().min(1),
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().min(8).max(24),
  businessName: z.string().min(1).max(200).optional(),
  topic: z.string().min(1).max(3000).optional(),
  message: z.string().min(1).max(3000).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1).max(10),
});

export async function POST(req: NextRequest) {
  const db = await getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Booking unavailable. Try again later." },
      { status: 503 }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const {
    packageId,
    name,
    email,
    phone,
    businessName,
    topic,
    message,
    date,
    time,
  } = parsed.data;

  const note = (message ?? topic ?? "").trim();
  if (!note) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 }
    );
  }

  if (!ObjectId.isValid(packageId)) {
    return NextResponse.json({ error: "Invalid package." }, { status: 400 });
  }

  if (!isValidBookingTime(time)) {
    return NextResponse.json({ error: "Invalid time slot." }, { status: 400 });
  }

  const d = parseYmd(date);
  if (!d || !isAllowedBookingDay(d)) {
    return NextResponse.json(
      { error: "Choose an upcoming Wednesday or Friday." },
      { status: 400 }
    );
  }

  const pkg = await db.collection("packages").findOne({
    _id: new ObjectId(packageId),
    active: true,
  });
  if (!pkg) {
    return NextResponse.json({ error: "Package not found." }, { status: 404 });
  }

  const conflict = await db.collection("bookings").findOne({
    date,
    time,
    paymentStatus: "paid",
  });
  if (conflict) {
    return NextResponse.json(
      { error: "This slot was just booked. Pick another time." },
      { status: 409 }
    );
  }

  const doc = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    businessName: (businessName ?? "").trim(),
    message: note,
    topic: note,
    packageId: new ObjectId(packageId),
    packageTitle: String(pkg.title),
    date,
    time,
    status: "new" as const,
    amount: 0,
    paymentStatus: "pending" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection("bookings").insertOne(doc);
  return NextResponse.json({
    bookingId: result.insertedId.toString(),
    packageTitle: doc.packageTitle,
  });
}

export async function GET(req: NextRequest) {
  const unauthorized = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const db = await getDb();
  if (!db) return NextResponse.json([]);

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from")?.trim();
  const to = searchParams.get("to")?.trim();
  const paymentStatus = searchParams.get("paymentStatus")?.trim();
  const status = searchParams.get("status")?.trim();
  const q = searchParams.get("q")?.trim();

  const filter: Record<string, unknown> = {};
  if (from || to) {
    filter.date = {};
    if (from) (filter.date as Record<string, string>).$gte = from;
    if (to) (filter.date as Record<string, string>).$lte = to;
  }
  if (
    paymentStatus &&
    ["pending", "paid", "failed"].includes(paymentStatus)
  ) {
    filter.paymentStatus = paymentStatus;
  }
  if (status && BOOKING_WORKFLOW_STATUSES.includes(status as never)) {
    filter.status = status;
  }
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
      { packageTitle: { $regex: q, $options: "i" } },
      { message: { $regex: q, $options: "i" } },
      { topic: { $regex: q, $options: "i" } },
    ];
  }

  const docs = await db
    .collection("bookings")
    .find(filter)
    .sort({ createdAt: -1, date: -1, time: -1 })
    .toArray();

  return NextResponse.json(
    docs.map((d) => ({
      ...d,
      _id: d._id.toString(),
      packageId: d.packageId?.toString?.() ?? d.packageId,
      message: d.message ?? d.topic ?? "",
    }))
  );
}
