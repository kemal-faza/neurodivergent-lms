"use client";

import React from "react";

interface FlowStepProps {
  step: number;
  label: string;
  isLast?: boolean;
}

export function FlowStep({ step, label, isLast = false }: FlowStepProps) {
  return (
    <>
      <div className="flex-1 min-w-[110px] border-2 border-dashed border-border bg-card rounded-lg p-3 text-center">
        <span className="text-[10px] text-fg font-mono font-bold">{label}</span>
      </div>
      {!isLast && (
        <svg
          className="w-4 h-4 text-muted flex-shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}
