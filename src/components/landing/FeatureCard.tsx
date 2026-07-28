"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

interface FeatureCardProps {
  icon: React.ReactNode;
  label: string;
  desc: string;
}

export function FeatureCard({ icon, label, desc }: FeatureCardProps) {
  return (
    <Card className="p-4 border-dashed hover:border-solid hover:shadow-sm transition-all duration-200">
      <div className="w-10 h-10 border-2 border-dashed border-border bg-muted/10 rounded-lg flex items-center justify-center text-fg mb-3">
        {icon}
      </div>
      <h3 className="text-xs font-bold font-sans text-fg mb-1">{label}</h3>
      <p className="text-[11px] font-mono text-muted leading-relaxed">{desc}</p>
    </Card>
  );
}
