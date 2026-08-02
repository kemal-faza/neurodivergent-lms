export type PomodoroMode = "focus" | "break";

export interface PomodoroSnapshot {
  mode: PomodoroMode;
  remainingSec: number;
  running: boolean;
  completedCycles: number;
  updatedAt: string;
  /** Absolute timestamp when the current phase ends. Optional for legacy snapshots. */
  endAt?: number | null;
}

export const FOCUS_SECONDS = 25 * 60;
export const BREAK_SECONDS = 5 * 60;
export const POMODORO_STORAGE_KEY = "levelup-pomodoro";
export const POMODORO_PERSIST_INTERVAL_MS = 30_000;

export type PomodoroPersistReason = "action" | "checkpoint";

export function shouldPersistPomodoro(
  reason: PomodoroPersistReason,
  now: number,
  lastPersistAt: number | null,
): boolean {
  if (reason === "action") return true;
  return lastPersistAt === null || now - lastPersistAt >= POMODORO_PERSIST_INTERVAL_MS;
}

export interface PomodoroState {
  remainingSec: number;
  mode: PomodoroMode;
  completedCycles: number;
  transitioned: boolean;
  endAt: number | null;
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
      endAt: snapshot.endAt ?? null,
    };
  }

  // Use a stable deadline so delayed callbacks cannot make the timer run slow.
  let endAt =
    snapshot.endAt ??
    new Date(snapshot.updatedAt).getTime() + Math.max(0, snapshot.remainingSec) * 1000;
  let mode = snapshot.mode;
  let completedCycles = snapshot.completedCycles;
  let transitioned = false;

  while (now >= endAt) {
    transitioned = true;

    if (mode === "focus") {
      mode = "break";
      endAt += BREAK_SECONDS * 1000;
      completedCycles += 1;
    } else {
      mode = "focus";
      endAt += FOCUS_SECONDS * 1000;
    }
  }

  return {
    remainingSec: Math.max(0, Math.ceil((endAt - now) / 1000)),
    mode,
    completedCycles,
    transitioned,
    endAt,
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
    endAt: snapshot.running ? null : now + snapshot.remainingSec * 1000,
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
    endAt: null,
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
    endAt: null,
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
    endAt: null,
  };
}
