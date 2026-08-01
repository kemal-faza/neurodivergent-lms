export type PomodoroMode = "focus" | "break";

export interface PomodoroSnapshot {
  mode: PomodoroMode;
  remainingSec: number;
  running: boolean;
  completedCycles: number;
  updatedAt: string;
}

export const FOCUS_SECONDS = 25 * 60;
export const BREAK_SECONDS = 5 * 60;
export const POMODORO_STORAGE_KEY = "levelup-pomodoro";

export interface PomodoroState {
  remainingSec: number;
  mode: PomodoroMode;
  completedCycles: number;
  transitioned: boolean;
}

export function computeRemaining(
  snapshot: PomodoroSnapshot,
  now: number,
): PomodoroState {
  if (!snapshot.running) {
    return {
      remainingSec: snapshot.remainingSec,
      mode: snapshot.mode,
      completedCycles: snapshot.completedCycles,
      transitioned: false,
    };
  }
  const elapsed = Math.floor((now - new Date(snapshot.updatedAt).getTime()) / 1000);
  const remaining = Math.max(0, snapshot.remainingSec - elapsed);
  if (remaining > 0) {
    return {
      remainingSec: remaining,
      mode: snapshot.mode,
      completedCycles: snapshot.completedCycles,
      transitioned: false,
    };
  }
  if (snapshot.mode === "focus") {
    return {
      remainingSec: BREAK_SECONDS,
      mode: "break",
      completedCycles: snapshot.completedCycles + 1,
      transitioned: true,
    };
  }
  return {
    remainingSec: FOCUS_SECONDS,
    mode: "focus",
    completedCycles: snapshot.completedCycles,
    transitioned: true,
  };
}

export function toggleRunning(
  snapshot: PomodoroSnapshot,
  now: number,
): PomodoroSnapshot {
  return {
    ...snapshot,
    running: !snapshot.running,
    updatedAt: new Date(now).toISOString(),
  };
}

/** Initial snapshot (full focus, zero cycles) — basis for reset. */
export function initialSnapshot(now: number): PomodoroSnapshot {
  return {
    mode: "focus",
    remainingSec: FOCUS_SECONDS,
    running: false,
    completedCycles: 0,
    updatedAt: new Date(now).toISOString(),
  };
}

/** Reset to a full focus session; preserves completedCycles. */
export function resetPomodoro(
  snapshot: PomodoroSnapshot,
  now: number,
): PomodoroSnapshot {
  return {
    mode: "focus",
    remainingSec: FOCUS_SECONDS,
    running: false,
    completedCycles: snapshot.completedCycles,
    updatedAt: new Date(now).toISOString(),
  };
}

export function skipPomodoro(
  snapshot: PomodoroSnapshot,
  now: number,
): PomodoroSnapshot {
  const nextMode: PomodoroMode = snapshot.mode === "focus" ? "break" : "focus";
  return {
    mode: nextMode,
    remainingSec: nextMode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS,
    running: false,
    completedCycles:
      snapshot.mode === "focus" ? snapshot.completedCycles + 1 : snapshot.completedCycles,
    updatedAt: new Date(now).toISOString(),
  };
}
