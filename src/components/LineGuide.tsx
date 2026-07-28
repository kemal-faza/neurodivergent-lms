"use client";

import { useEffect, useState } from "react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";

/**
 * LineGuide component: Mouse-following reading ruler overlay for Dyslexia reading assistance.
 * Activated when `lineGuide` setting in `accessibilityStore` is true.
 */
export function LineGuide() {
  const lineGuide = useAccessibilityStore((s) => s.lineGuide);
  const [mouseY, setMouseY] = useState<number | null>(null);

  useEffect(() => {
    if (!lineGuide) {
      setMouseY(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lineGuide]);

  if (!lineGuide || mouseY === null) return null;

  return (
    <div
      className="fixed left-0 right-0 pointer-events-none z-30 transition-all duration-75 ease-out"
      style={{ top: `${mouseY}px` }}
    >
      {/* Top mask */}
      <div className="absolute bottom-full left-0 right-0 h-[50vh] bg-black/10 backdrop-blur-[0.2px] pointer-events-none" />

      {/* Highlight ruler strip */}
      <div className="h-10 bg-amber-200/50 border-y-2 border-amber-500 shadow-sm flex items-center justify-between px-6">
        <span className="text-[9px] font-mono font-bold text-amber-950 uppercase tracking-widest bg-amber-300 px-1.5 py-0.5 rounded">
          📏 Reading Ruler
        </span>
        <span className="text-[9px] text-amber-900 font-mono">Posisi: {Math.round(mouseY)}px</span>
      </div>

      {/* Bottom mask */}
      <div className="absolute top-full left-0 right-0 h-[50vh] bg-black/10 backdrop-blur-[0.2px] pointer-events-none" />
    </div>
  );
}
