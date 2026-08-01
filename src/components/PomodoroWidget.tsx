"use client";

import { Timer, Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { usePomodoro } from "@/lib/usePomodoro";
import { BREAK_SECONDS, FOCUS_SECONDS } from "@/lib/pomodoro";

function formatTime(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PomodoroWidget() {
  const enabled = useAccessibilityStore((s) => s.pomodoroEnabled);
  const { mode, remainingSec, running, completedCycles, toggle, reset, skip } =
    usePomodoro(enabled);

  if (!enabled) return null;

  const total = mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;
  const pct = Math.max(0, Math.min(100, Math.round((remainingSec / total) * 100)));
  const isFocus = mode === "focus";

  return (
    <div className="fixed bottom-24 right-3 sm:bottom-5 sm:right-5 z-40 w-56 bg-card border-2 border-border rounded-xl shadow-2xl p-4 font-sans">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Timer size={14} className={isFocus ? "text-fg" : "text-emerald-600"} />
          <span className="text-xs font-bold font-lexend text-fg">Pomodoro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-full border text-[10px] font-sans font-semibold ${
              isFocus
                ? "border-fg bg-fg/10 text-fg"
                : "border-emerald-500/40 bg-emerald-500/15 text-emerald-600"
            }`}
          >
            {isFocus ? "Fokus" : "Istirahat"}
          </span>
          {completedCycles > 0 && (
            <span className="px-2 py-0.5 rounded-full border border-border bg-muted/10 text-[10px] font-mono text-muted">
              #{completedCycles}
            </span>
          )}
        </div>
      </div>

      <div className="text-center py-2">
        <span
          className={`text-3xl font-mono font-bold ${
            isFocus ? "text-fg" : "text-emerald-600"
          }`}
        >
          {formatTime(remainingSec)}
        </span>
      </div>

      <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isFocus ? "bg-fg" : "bg-emerald-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={toggle}
          className="min-h-[44px] min-w-[44px] px-3 py-2 bg-fg text-bg rounded-xl border-2 border-fg hover:opacity-90 transition-all flex items-center justify-center shadow-sm"
          aria-label={running ? "Jeda Timer" : "Mulai Timer"}
          title={running ? "Jeda" : "Mulai"}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[44px] min-w-[44px] px-3 py-2 border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-all flex items-center justify-center"
          aria-label="Reset Timer"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button
          type="button"
          onClick={skip}
          className="min-h-[44px] min-w-[44px] px-3 py-2 border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-all flex items-center justify-center"
          aria-label="Lewati Sesi"
          title="Lewati"
        >
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
}
