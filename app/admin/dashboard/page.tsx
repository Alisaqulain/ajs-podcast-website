import Link from "next/link";
import { getDb } from "@/lib/mongodb";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Heart,
  PackageOpen,
  CalendarRange,
  Settings,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const db = await getDb();
  const [articles, blogs, testimonials, packages, bookings] = await Promise.all([
    db ? db.collection("articles").countDocuments() : 0,
    db ? db.collection("blogs").countDocuments() : 0,
    db ? db.collection("testimonials").countDocuments() : 0,
    db ? db.collection("packages").countDocuments() : 0,
    db ? db.collection("bookings").countDocuments() : 0,
  ]);

  const cards = [
    { label: "Articles", count: articles, href: "/admin/articles", icon: Newspaper },
    { label: "Blogs", count: blogs, href: "/admin/blogs", icon: FileText },
    {
      label: "Testimonials",
      count: testimonials,
      href: "/admin/testimonials",
      icon: Heart,
    },
    { label: "Packages", count: packages, href: "/admin/packages", icon: PackageOpen },
    { label: "Bookings", count: bookings, href: "/admin/bookings", icon: CalendarRange },
    { label: "Settings", count: null, href: "/admin/settings", icon: Settings },
  ];

  return (
    <div>
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-brand-gold-deep" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-brand-dark">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-brand-dark/65">
            Manage articles, blogs, testimonials, packages, and booking enquiries.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, count, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-3xl border border-brand-gold/15 bg-white/70 p-6 shadow-sm transition hover:border-brand-gold/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <Icon className="h-8 w-8 text-brand-gold-deep" />
              {count != null ? (
                <span className="font-display text-3xl font-semibold text-brand-dark">
                  {count}
                </span>
              ) : (
                <span className="text-xs font-medium uppercase tracking-wide text-brand-dark/50">
                  Config
                </span>
              )}
            </div>
            <p className="mt-4 text-sm font-medium text-brand-dark/70">{label}</p>
          </Link>
        ))}
      </div>

      {!db ? (
        <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          MongoDB is not connected. Add{" "}
          <code className="font-mono">MONGODB_URI</code> to{" "}
          <code className="font-mono">.env.local</code>. Test with{" "}
          <Link href="/api/check-db" className="font-semibold underline">
            /api/check-db
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
