import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BookingField({
  label,
  htmlFor,
  children,
  className,
  labelClassName,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("sm:col-span-1", className)}>
      <label
        className={cn(
          "text-xs font-semibold uppercase tracking-wide text-luxury-heading",
          labelClassName
        )}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
