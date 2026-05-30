"use client";

import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";

type DbCheck = {
  success: boolean;
  message: string;
  database: string;
  error?: string;
};

export default function AdminSettingsPage() {
  const [check, setCheck] = useState<DbCheck | null>(null);
  const [loading, setLoading] = useState(true);

  async function runCheck() {
    setLoading(true);
    const res = await fetch("/api/check-db");
    const data = (await res.json()) as DbCheck;
    setCheck(data);
    setLoading(false);
  }

  useEffect(() => {
    void runCheck();
  }, []);

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-brand-dark">
          Settings
        </h1>
        <p className="mt-2 text-sm text-brand-dark/60">
          Environment and database health for this CMS.
        </p>
      </div>

      <section className="rounded-3xl border border-brand-gold/15 bg-white/70 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-brand-dark">
            Database connection
          </h2>
          <button
            type="button"
            onClick={() => void runCheck()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-gold/25 px-3 py-1.5 text-xs font-medium"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Re-check
          </button>
        </div>
        {check ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
              check.success
                ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <p className="font-medium">{check.message}</p>
            <p className="mt-1 text-xs opacity-80">
              Status: <strong>{check.database}</strong>
            </p>
            {check.error ? (
              <p className="mt-2 font-mono text-xs">{check.error}</p>
            ) : null}
          </div>
        ) : null}
        <p className="mt-4 text-xs text-brand-dark/50">
          Public endpoint:{" "}
          <Link href="/api/check-db" className="text-brand-gold-deep underline">
            /api/check-db
          </Link>{" "}
          · alias{" "}
          <Link href="/check" className="text-brand-gold-deep underline">
            /check
          </Link>
        </p>
      </section>

      <section className="rounded-3xl border border-brand-gold/15 bg-white/70 p-6 shadow-sm text-sm text-brand-dark/70">
        <h2 className="font-semibold text-brand-dark">Admin login</h2>
        <p className="mt-2">
          Credentials are read from <code className="text-xs">ADMIN_EMAIL</code>{" "}
          and <code className="text-xs">ADMIN_PASSWORD</code> in your environment.
          Sessions use NextAuth JWT (30-day max age).
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1 text-xs">
          <li>
            <code>NEXTAUTH_SECRET</code> — required in production
          </li>
          <li>
            <code>NEXTAUTH_URL</code> — site URL for auth callbacks
          </li>
          <li>
            <code>MONGODB_URI</code> — MongoDB connection string
          </li>
        </ul>
      </section>
    </div>
  );
}
