"use client";

import React from "react";
import { cn } from "@/lib/cn";

/* ─── shadcn-style Badge (no extra deps — manual variant map) ─── */

type BadgeVariant = "default" | "outline" | "soft" | "accent";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-fg text-bg border-fg",
  outline: "bg-transparent text-fg border-border",
  soft: "bg-muted/10 text-fg border-transparent",
  accent: "bg-accent text-accent-fg border-accent",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "soft", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-sans font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeVariant };
