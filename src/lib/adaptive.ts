import type { ProgressState } from "./types";

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 3;

/** Correct answers / total questions, clamped to [0, 1]. */
export function scoreToRatio(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, correct / total));
}

/**
 * Rule-based adaptive difficulty (PRD: "ML nyata" is a Non-Goal; use simple
 * threshold). Pure function so Person A's QuizEngine and the progress store
 * both compute the same next level.
 *
 *  - ratio >= 0.8 and not at max -> level + 1
 *  - ratio <= 0.4 and not at min -> level - 1
 *  - otherwise keep current level
 */
export function nextAdaptiveLevel(current: number, correctRatio: number): number {
  let next = current;
  if (correctRatio >= 0.8) next = current + 1;
  else if (correctRatio <= 0.4) next = current - 1;
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, next));
}

/** Points awarded for a quiz attempt: base + bonus for high accuracy. */
export function quizPoints(correct: number, total: number): number {
  if (total <= 0) return 0;
  const ratio = scoreToRatio(correct, total);
  return Math.round(correct * 10 + ratio * 20);
}

/** Initial progress used by the progress store before any persistence. */
export const INITIAL_PROGRESS: ProgressState = {
  userId: "u1",
  poin: 120,
  streak: 5,
  lastActiveDate: null,
  badge: ["Starter", "Week-Streak"],
  adaptiveLevel: 2,
  completedMateri: [],
  quizScores: {},
  quizAttempts: {},
  maxStreak: 5,
  dailyPoints: {},
  materiProgress: {},
};
