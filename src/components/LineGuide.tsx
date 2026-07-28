"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Lock } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { getAllLineRects, snapToLine, getNextLineIndex } from "@/lib/line-guide";
import type { LineRect } from "@/lib/line-guide";

/**
 * LineGuide — Reading ruler with snap-to-line + keyboard navigation.
 *
 * - **Snap-to-line**: Ruler selalu menempel ke baris teks terdekat
 *   dari posisi kursor (tidak floating bebas).
 * - **Keyboard**: ↑/↓ pindah baris, L toggle lock.
 * - **Lock (L)**: Ruler terkunci di posisi saat ini, scroll bebas.
 * - **Dimming**: Gradient gelap di atas & bawah ruler.
 * - **Theme-aware**: Via CSS vars --ruler-* di globals.css.
 */
export function LineGuide() {
  const lineGuide = useAccessibilityStore((s) => s.lineGuide);

  // Active line position (null = hidden)
  const [activeLine, setActiveLine] = useState<{
    top: number;
    height: number;
  } | null>(null);

  // State
  const [isLocked, setIsLocked] = useState(false);

  // Refs for perf
  const linesCache = useRef<LineRect[]>([]);
  const indexRef = useRef(0);
  const lastCalcRef = useRef(0);

  // ── DOM Helpers ──

  /** Recalculate line rects from the .reader surface (throttled ~50ms). */
  const refreshLines = useCallback(() => {
    const reader = document.querySelector(".reader");
    if (!reader) return [];
    const now = performance.now();
    if (now - lastCalcRef.current > 50) {
      linesCache.current = getAllLineRects(reader);
      lastCalcRef.current = now;
    }
    return linesCache.current;
  }, []);

  /** Force recalc (for scroll/resize). */
  const forceRefreshLines = useCallback(() => {
    const reader = document.querySelector(".reader");
    if (!reader) return [];
    linesCache.current = getAllLineRects(reader);
    lastCalcRef.current = performance.now();
    return linesCache.current;
  }, []);

  /** Set active line from a LineRect + update indexRef. */
  const activateLine = useCallback((rect: LineRect, lines: LineRect[]) => {
    const idx = lines.indexOf(rect);
    if (idx >= 0) indexRef.current = idx;
    setActiveLine({ top: rect.top, height: rect.height });
  }, []);

  // ── Mouse handler — snap-to-line ──

  useEffect(() => {
    if (!lineGuide) {
      setActiveLine(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isLocked) return;

      const lines = refreshLines();
      if (lines.length === 0) return;

      const snapped = snapToLine(e.clientY, lines);
      if (snapped) activateLine(snapped, lines);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lineGuide, isLocked, refreshLines, activateLine]);

  // ── Keyboard handler — ↑↓ navigation, L lock, ESC off ──

  useEffect(() => {
    if (!lineGuide) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const lines = forceRefreshLines();

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (lines.length === 0) break;
          indexRef.current = getNextLineIndex(
            indexRef.current,
            1,
            lines.length,
          );
          activateLine(lines[indexRef.current], lines);
          break;

        case "ArrowUp":
          e.preventDefault();
          if (lines.length === 0) break;
          indexRef.current = getNextLineIndex(
            indexRef.current,
            -1,
            lines.length,
          );
          activateLine(lines[indexRef.current], lines);
          break;

        case "l":
        case "L":
          setIsLocked((v) => !v);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lineGuide, forceRefreshLines, activateLine]);

  // ── Recalc lines on scroll ──

  useEffect(() => {
    if (!lineGuide) return;

    const handleScroll = () => {
      forceRefreshLines();
      // Re-activate current index so ruler moves with scroll
      const lines = linesCache.current;
      if (lines.length > 0 && activeLine) {
        // Find nearest line to previous active position
        const snapped = snapToLine(activeLine.top + activeLine.height / 2, lines);
        if (snapped) activateLine(snapped, lines);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lineGuide, activeLine, forceRefreshLines, activateLine]);

  // ── Recalc lines on resize ──

  useEffect(() => {
    if (!lineGuide) return;

    const handleResize = () => {
      forceRefreshLines();
      const lines = linesCache.current;
      if (lines.length > 0 && activeLine) {
        const snapped = snapToLine(activeLine.top + activeLine.height / 2, lines);
        if (snapped) activateLine(snapped, lines);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [lineGuide, activeLine, forceRefreshLines, activateLine]);

  // ── Render ──

  if (!lineGuide || activeLine === null) return null;

  const rulerBottom = activeLine.top + activeLine.height;

  return (
    <>
      {/* Top dim */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-30 select-none"
        style={{
          top: 0,
          height: `${activeLine.top}px`,
          background:
            "linear-gradient(to bottom, transparent 0%, var(--ruler-dim-near) 60%, var(--ruler-dim-far) 100%)",
        }}
      />

      {/* Ruler strip */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-30 select-none"
        style={{
          top: `${activeLine.top}px`,
          height: `${activeLine.height}px`,
          background: "var(--ruler-highlight)",
          borderTop: "1.5px solid var(--ruler-edge)",
          borderBottom: "1.5px solid var(--ruler-edge)",
          boxShadow: "var(--ruler-glow)",
        }}
      />

      {/* Bottom dim */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-30 select-none"
        style={{
          top: `${rulerBottom}px`,
          bottom: 0,
          background:
            "linear-gradient(to top, transparent 0%, var(--ruler-dim-near) 60%, var(--ruler-dim-far) 100%)",
        }}
      />

      {/* Lock indicator */}
      {isLocked && (
        <div className="fixed top-4 right-4 z-40 pointer-events-none select-none">
          <div className="bg-card/90 backdrop-blur border border-border rounded-lg px-3 py-1.5 text-[11px] font-mono text-fg shadow-lg flex items-center gap-1.5">
            <Lock size={14} className="text-blue-500" />
            <span>Ruler terkunci</span>
          </div>
        </div>
      )}
    </>
  );
}
