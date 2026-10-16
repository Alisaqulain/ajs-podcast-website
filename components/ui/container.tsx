import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1720px]",
        "pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))]",
        "sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))]",
        "lg:pl-[max(2.5rem,env(safe-area-inset-left,0px))] lg:pr-[max(2.5rem,env(safe-area-inset-right,0px))]",
        "2xl:pl-14 2xl:pr-14",
        className
      )}
    >
      {children}
    </div>
  );
}
