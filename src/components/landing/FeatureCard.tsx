"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  label: string;
  desc: string;
  /** @deprecated tone is no longer used — all cards share a unified neutral style */
  tone?: string;
}

export function FeatureCard({
  icon: Icon,
  label,
  desc,
}: FeatureCardProps) {
  return (
    <Card className="p-6 hover-lift border border-border/80 bg-card shadow-xs flex flex-col justify-between">
      <div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-border/60 bg-bg shadow-2xs transition-transform group-hover:scale-105"
          aria-hidden
        >
          <Icon size={22} className="text-fg/70" />
        </div>
        <h3 className="text-sm font-bold font-lexend text-fg mb-2">{label}</h3>
        <p className="text-xs font-sans text-muted leading-relaxed">{desc}</p>
      </div>
    </Card>
  );
}
