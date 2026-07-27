"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";

/**
 * Reading ruler: a horizontal highlight that follows the cursor, helping readers
 * keep their place (PRD P0 "Line Guide ruler (follow cursor)"). Active only when
 * `lineGuide` is enabled in the accessibility store. Person B owns the visual
 * design system polish here.
 */
export function LineGuide() {
  const lineGuide = useAccessibilityStore((s) => s.lineGuide);
  const [y, setY] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineGuide) {
      setY(null);
      return;
    }
    const onMove = (e: MouseEvent) => setY(e.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [lineGuide]);

  if (!lineGuide || y === null) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-40 h-12 bg-accent/20"
      style={{ top: y - 24 }}
    />
  );
}
