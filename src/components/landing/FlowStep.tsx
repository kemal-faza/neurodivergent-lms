"use client";

import React from "react";
import { ChevronRight, Check } from "lucide-react";

interface FlowStepProps {
  step: number;
  label: string;
  isLast?: boolean;
}

export function FlowStep({ step, label, isLast = false }: FlowStepProps) {
  return (
    <>
      <div className="flex-1 min-w-[120px] border border-border bg-card rounded-lg p-3 flex items-center gap-3 shadow-sm hover-lift">
        <span
          className="w-7 h-7 flex-shrink-0 rounded-full bg-accent text-accent-fg text-xs font-bold font-sans flex items-center justify-center"
          aria-hidden
        >
          {step}
        </span>
        <span className="text-xs font-sans text-fg font-medium leading-tight">
          {label}
        </span>
        <Check size={12} className="text-emerald-600 ml-auto flex-shrink-0" aria-hidden />
      </div>
      {!isLast && (
        <ChevronRight
          size={16}
          className="text-muted flex-shrink-0"
          aria-hidden
        />
      )}
    </>
  );
}
