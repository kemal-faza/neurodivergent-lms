"use client";

import React from "react";
import { ArrowRight, ArrowDown, Check } from "lucide-react";

interface FlowStepProps {
  step: number;
  label: string;
  isLast?: boolean;
}

export function FlowStep({ step, label, isLast = false }: FlowStepProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 flex-1 w-full sm:min-w-[150px]">
      <div className="w-full sm:flex-1 border border-border/80 bg-card rounded-xl p-3.5 flex items-center gap-3 shadow-2xs hover-lift group">
        <span
          className="w-7 h-7 flex-shrink-0 rounded-lg bg-fg text-bg text-xs font-bold font-sans flex items-center justify-center shadow-2xs"
          aria-hidden
        >
          {step}
        </span>
        <span className="text-xs font-sans text-fg font-semibold leading-tight">
          {label}
        </span>
        <Check size={14} className="text-muted ml-auto flex-shrink-0" aria-hidden />
      </div>
      {!isLast && (
        <>
          <ArrowRight
            size={16}
            className="arrow-right text-muted/60 flex-shrink-0 hidden sm:block"
            aria-hidden
          />
          <ArrowDown
            size={16}
            className="arrow-down text-muted/60 flex-shrink-0 sm:hidden my-1"
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
