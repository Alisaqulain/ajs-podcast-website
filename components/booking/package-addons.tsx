import { Plus } from "lucide-react";
import { CHARGEABLE_NOTE, STUDIO_INCLUDES } from "@/lib/site-content";

/** Add-ons offered with every booking: available on request, billed at actuals (★). */
const ADDONS = STUDIO_INCLUDES.filter((i) => i.chargeable);

export function PackageAddons() {
  return (
    <div className="mb-8 mt-5 rounded-2xl border border-dashed border-brand-gold/40 bg-brand-gold/5 px-4 py-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold-deep">
        Add-ons
      </p>
      <ul className="mt-2 space-y-1.5 text-sm text-luxury-body">
        {ADDONS.map((a) => (
          <li key={a.text} className="flex gap-2">
            <Plus className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-deep" />
            <span>
              {a.text}
              <span className="ml-1 text-brand-gold-deep" aria-label={CHARGEABLE_NOTE}>
                ★
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-luxury-muted">★ {CHARGEABLE_NOTE}</p>
    </div>
  );
}
