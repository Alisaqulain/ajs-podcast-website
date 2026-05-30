import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";

export const dynamic = "force-dynamic";

/** Health check: verifies MongoDB connectivity */
export async function GET() {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      database: "disconnected",
      error: "MONGODB_URI is not configured",
    });
  }

  try {
    const client = await getMongoClient();
    if (!client) {
      return NextResponse.json({
        success: false,
        message: "Database connection failed",
        database: "disconnected",
        error: "Could not create MongoDB client",
      });
    }

    await client.db().command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      database: "connected",
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      database: "disconnected",
      error,
    });
  }
}
