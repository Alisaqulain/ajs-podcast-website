import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  primary:
    "bg-gold-gradient text-[var(--gold-foreground)] shadow-gold-glow ring-1 ring-inset ring-white/35 hover:brightness-110 hover:shadow-gold-glow-lg hover:scale-[1.03] active:scale-[0.98] active:brightness-95",
  secondary:
    "border-2 border-accent bg-transparent text-accent hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-fg)] active:scale-[0.98]",
  outline:
    "border-2 border-brand-gold-deep/50 bg-surface/90 text-luxury-heading shadow-[0_4px_18px_rgba(14,165,233,0.12)] backdrop-blur-sm hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold-deep hover:shadow-gold-glow hover:scale-[1.02] active:scale-[0.98]",
  ghost:
    "text-luxury-body hover:bg-muted hover:text-luxury-heading active:scale-[0.98]",
} as const;

const sizes = {
  sm: "min-h-10 px-5 py-2 text-sm",
  md: "min-h-12 px-7 py-3 text-sm",
  lg: "min-h-[3.25rem] px-8 py-3.5 text-sm",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
    "touch-manipulation disabled:pointer-events-none disabled:opacity-55",
    variants[variant],
    sizes[size],
    className
  );
}

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

export type ButtonProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> &
  Omit<ComponentProps<"button">, "className" | "children" | "type">;

type Props = ButtonProps;

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...rest
}: Props) {
  const base = buttonStyles({ variant, size, className });

  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={base} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={base} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
