import { describe, expect, test } from "vitest";
import {
  BREAK_SECONDS,
  FOCUS_SECONDS,
  computeRemaining,
  initialSnapshot,
  resetPomodoro,
  skipPomodoro,
  toggleRunning,
} from "./pomodoro";

const NOW = 1_000_000_000_000;
const SEC = 1000;

function snap(partial: Partial<Parameters<typeof computeRemaining>[0]> = {}) {
  return {
    mode: "focus" as const,
    remainingSec: FOCUS_SECONDS,
    running: false,
    completedCycles: 0,
    updatedAt: new Date(NOW).toISOString(),
    ...partial,
  };
}

describe("computeRemaining", () => {
  test("returns snapshot unchanged when not running", () => {
    const s = snap();
    const r = computeRemaining(s, NOW);
    expect(r).toEqual({ remainingSec: FOCUS_SECONDS, mode: "focus", completedCycles: 0, transitioned: false });
  });

  test("decrements remaining by elapsed time", () => {
    const s = snap({ running: true, remainingSec: FOCUS_SECONDS });
    const r = computeRemaining(s, NOW + 60 * SEC);
    expect(r.remainingSec).toBe(FOCUS_SECONDS - 60);
    expect(r.transitioned).toBe(false);
    expect(r.mode).toBe("focus");
  });

  test("transitions focus -> break with cycle+1 when time is up", () => {
    const s = snap({ running: true, remainingSec: 10, completedCycles: 2 });
    const r = computeRemaining(s, NOW + 10 * SEC);
    expect(r.mode).toBe("break");
    expect(r.remainingSec).toBe(BREAK_SECONDS);
    expect(r.completedCycles).toBe(3);
    expect(r.transitioned).toBe(true);
  });

  test("transitions break -> focus when break is up", () => {
    const s = snap({ running: true, mode: "break", remainingSec: 5, completedCycles: 3 });
    const r = computeRemaining(s, NOW + 5 * SEC);
    expect(r.mode).toBe("focus");
    expect(r.remainingSec).toBe(FOCUS_SECONDS);
    expect(r.completedCycles).toBe(3);
    expect(r.transitioned).toBe(true);
  });

  test("resumes correctly from a stale updatedAt (cross-refresh)", () => {
    const s = snap({ running: true, remainingSec: FOCUS_SECONDS, updatedAt: new Date(NOW - 5 * 60 * SEC).toISOString() });
    const r = computeRemaining(s, NOW);
    expect(r.remainingSec).toBe(FOCUS_SECONDS - 300);
  });

  test("clamps remaining at 0 on exact boundary then transitions", () => {
    const s = snap({ running: true, remainingSec: 0, completedCycles: 1 });
    const r = computeRemaining(s, NOW);
    expect(r.transitioned).toBe(true);
    expect(r.mode).toBe("break");
  });
});

describe("toggleRunning", () => {
  test("pauses and preserves remaining", () => {
    const s = snap({ running: true, remainingSec: 500 });
    const r = toggleRunning(s, NOW);
    expect(r.running).toBe(false);
    expect(r.remainingSec).toBe(500);
    expect(r.updatedAt).toBe(new Date(NOW).toISOString());
  });

  test("starts and stamps updatedAt", () => {
    const s = snap({ running: false, remainingSec: 500 });
    const r = toggleRunning(s, NOW);
    expect(r.running).toBe(true);
    expect(r.updatedAt).toBe(new Date(NOW).toISOString());
  });
});

describe("resetPomodoro", () => {
  test("resets to full focus and preserves completedCycles", () => {
    const s = snap({ running: true, completedCycles: 3 });
    const r = resetPomodoro(s, NOW);
    expect(r.mode).toBe("focus");
    expect(r.remainingSec).toBe(FOCUS_SECONDS);
    expect(r.running).toBe(false);
    expect(r.completedCycles).toBe(3);
    expect(r.updatedAt).toBe(new Date(NOW).toISOString());
  });
});

describe("initialSnapshot", () => {
  test("creates a fresh focus snapshot with zero cycles", () => {
    const r = initialSnapshot(NOW);
    expect(r.mode).toBe("focus");
    expect(r.remainingSec).toBe(FOCUS_SECONDS);
    expect(r.running).toBe(false);
    expect(r.completedCycles).toBe(0);
  });
});

describe("skipPomodoro", () => {
  test("skipping focus -> break increments cycles", () => {
    const s = snap({ running: true, completedCycles: 1 });
    const r = skipPomodoro(s, NOW);
    expect(r.mode).toBe("break");
    expect(r.remainingSec).toBe(BREAK_SECONDS);
    expect(r.completedCycles).toBe(2);
    expect(r.running).toBe(false);
  });

  test("skipping break -> focus keeps cycles", () => {
    const s = snap({ running: true, mode: "break", completedCycles: 2 });
    const r = skipPomodoro(s, NOW);
    expect(r.mode).toBe("focus");
    expect(r.remainingSec).toBe(FOCUS_SECONDS);
    expect(r.completedCycles).toBe(2);
  });
});
