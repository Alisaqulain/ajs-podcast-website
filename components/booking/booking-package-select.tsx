"use client";

import { formatInrPaise, payablePaise } from "@/lib/booking-client";
import type { PackagePublic } from "@/components/booking/booking-experience";

export function BookingPackageSelect({
  idPrefix = "bk",
  packages,
  selectedId,
  onSelect,
}: {
  idPrefix?: string;
  packages: PackagePublic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (packages.length === 0) {
    return (
      <p className="text-sm text-luxury-muted">
        Packages are loading. If none appear, visit the{" "}
        <a href="/book" className="font-semibold text-brand-gold-deep underline">
          booking page
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      <label
        className="text-xs font-semibold uppercase tracking-wide text-luxury-heading"
        htmlFor={`${idPrefix}-package`}
      >
        Package
      </label>
      <select
        id={`${idPrefix}-package`}
        value={selectedId ?? ""}
        onChange={(e) => onSelect(e.target.value)}
        className="field-input mt-1.5 w-full"
        required
      >
        <option value="" disabled>
          Select a package
        </option>
        {packages.map((pkg) => (
          <option key={pkg._id} value={pkg._id}>
            {pkg.title} — {formatInrPaise(payablePaise(pkg))}
          </option>
        ))}
      </select>
    </div>
  );
}
