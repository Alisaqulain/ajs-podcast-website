import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type SiteLogoProps = {
  className?: string;
  variant?: "nav" | "footer" | "auth";
  priority?: boolean;
  /** Parent must be `relative` with defined size. */
  fill?: boolean;
};

const circularFrameClass: Record<"nav" | "footer" | "auth", string> = {
  nav: "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.75rem] md:w-[4.75rem]",
  footer: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20",
  auth: "h-20 w-20 sm:h-24 sm:w-24",
};

function CircularLogo({
  variant,
  priority,
  className,
}: {
  variant: "nav" | "footer" | "auth";
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "logo-pill relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 transition duration-500 motion-safe:hover:scale-105 motion-safe:hover:shadow-gold-glow",
        circularFrameClass[variant],
        className
      )}
    >
      <Image
        src={SITE.logoSrc}
        alt={`${SITE.name} — ${SITE.tagline}`}
        fill
        sizes="(max-width: 768px) 56px, 72px"
        priority={priority}
        className="object-cover object-center"
      />
    </span>
  );
}

export function SiteLogo({
  className,
  variant = "nav",
  priority = false,
  fill: useFill,
}: SiteLogoProps) {
  if (useFill) {
    return (
      <Image
        src={SITE.logoSrc}
        alt={`${SITE.name} — ${SITE.tagline}`}
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        priority={priority}
        className={cn("object-cover object-center", className)}
      />
    );
  }

  if (variant === "auth") {
    return (
      <CircularLogo variant={variant} priority={priority} className={className} />
    );
  }

  if (variant === "nav" || variant === "footer") {
    return (
      <span className="inline-flex min-w-0 items-center gap-3">
        <CircularLogo
          variant={variant}
          priority={priority}
          className={cn(variant === "nav" && "!h-11 !w-11 sm:!h-12 sm:!w-12", className)}
        />
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-luxury-heading sm:text-2xl">
            {SITE.name}
          </span>
          <span className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-gold-deep sm:text-[11px]">
            Podcast Studio
          </span>
        </span>
      </span>
    );
  }

  return null;
}
