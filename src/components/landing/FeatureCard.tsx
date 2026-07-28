"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Tone = "amber" | "sky" | "violet" | "emerald";

const toneStyles: Record<Tone, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-100", text: "text-amber-700" },
  sky: { bg: "bg-sky-100", text: "text-sky-700" },
  violet: { bg: "bg-violet-100", text: "text-violet-700" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
};

interface FeatureCardProps {
  icon: LucideIcon;
  label: string;
  desc: string;
  tone?: Tone;
}

export function FeatureCard({
  icon: Icon,
  label,
  desc,
  tone = "sky",
}: FeatureCardProps) {
  const t = toneStyles[tone];

  return (
    <Card className="p-5 hover-lift">
      <div
        className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-sm",
          t.bg
        )}
        aria-hidden
      >
        <Icon size={20} className={t.text} />
      </div>
      <h3 className="text-sm font-bold font-sans text-fg mb-1.5">{label}</h3>
      <p className="text-xs font-sans text-muted leading-relaxed">{desc}</p>
    </Card>
  );
}
