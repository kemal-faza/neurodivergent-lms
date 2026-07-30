"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage } from "./storage";
import type { ProgressState } from "../lib/types";
import { INITIAL_PROGRESS, nextAdaptiveLevel, scoreToRatio, quizPoints } from "../lib/adaptive";

interface ProgressStore extends ProgressState {
  hasHydrated: boolean;
  addPoin: (n: number) => void;
  /** Record a quiz attempt; updates best score, points, and adaptive level. */
  recordQuiz: (kuisId: string, correct: number, total: number) => void;
  /** Record a full quiz session (batch); updates best score, attempts history, and points. */
  recordQuizSession: (materiId: string, correct: number, total: number) => void;
  /** Get progress for a specific material quiz. */
  getQuizProgress: (materiId: string) => { isCompleted: boolean; bestScore: number | null; lastAttempt: { correct: number; total: number } | null };
  addBadge: (id: string) => void;
  completeMateri: (id: string) => void;
  /** Call when the learner is active on a new day to extend the streak. */
  bumpStreak: () => void;
  reset: () => void;
  setHasHydrated: (v: boolean) => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_PROGRESS,
      hasHydrated: false,
      addPoin: (n) =>
        set((s) => {
          const today = todayISO();
          return {
            poin: s.poin + n,
            dailyPoints: { ...s.dailyPoints, [today]: (s.dailyPoints[today] ?? 0) + n },
          };
        }),
      recordQuiz: (kuisId, correct, total) =>
        set((s) => {
          const ratio = scoreToRatio(correct, total);
          const points = quizPoints(correct, total);
          const best = Math.max(s.quizScores[kuisId] ?? 0, points);
          const today = todayISO();
          return {
            poin: s.poin + points,
            quizScores: { ...s.quizScores, [kuisId]: best },
            adaptiveLevel: nextAdaptiveLevel(s.adaptiveLevel, ratio),
            dailyPoints: { ...s.dailyPoints, [today]: (s.dailyPoints[today] ?? 0) + points },
          };
        }),
      recordQuizSession: (materiId, correct, total) =>
        set((s) => {
          const ratio = scoreToRatio(correct, total);
          const points = quizPoints(correct, total);
          const best = Math.max(s.quizScores[materiId] ?? 0, points);
          const today = todayISO();
          return {
            poin: s.poin + points,
            quizScores: { ...s.quizScores, [materiId]: best },
            quizAttempts: {
              ...s.quizAttempts,
              [materiId]: [...(s.quizAttempts[materiId] ?? []), { correct, total, date: today }],
            },
            adaptiveLevel: nextAdaptiveLevel(s.adaptiveLevel, ratio),
            dailyPoints: { ...s.dailyPoints, [today]: (s.dailyPoints[today] ?? 0) + points },
          };
        }),
      getQuizProgress: (materiId) => {
        const state = get();
        const attempts = state.quizAttempts[materiId];
        const bestScore = state.quizScores[materiId] ?? null;
        const isCompleted = bestScore !== null;
        const lastAttempt = attempts && attempts.length > 0 ? attempts[attempts.length - 1] : null;
        return {
          isCompleted,
          bestScore: bestScore !== null ? Math.round(bestScore) : null,
          lastAttempt: lastAttempt ? { correct: lastAttempt.correct, total: lastAttempt.total } : null,
        };
      },
      addBadge: (id) =>
        set((s) => (s.badge.includes(id) ? s : { badge: [...s.badge, id] })),
      completeMateri: (id) =>
        set((s) =>
          s.completedMateri.includes(id) ? s : { completedMateri: [...s.completedMateri, id] },
        ),
      bumpStreak: () =>
        set((s) => {
          const today = todayISO();
          if (s.lastActiveDate === today) return s;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yestISO = yesterday.toISOString().slice(0, 10);
          const newStreak = s.lastActiveDate === yestISO ? s.streak + 1 : 1;
          return { streak: newStreak, lastActiveDate: today, maxStreak: Math.max(s.maxStreak, newStreak) };
        }),
      reset: () => set({ ...INITIAL_PROGRESS, hasHydrated: true }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "levelup-progress",
      storage: createJSONStorage(() => idbStorage),
      skipHydration: true,
      partialize: (state) => ({
        userId: state.userId,
        poin: state.poin,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        badge: state.badge,
        adaptiveLevel: state.adaptiveLevel,
        completedMateri: state.completedMateri,
        quizScores: state.quizScores,
        quizAttempts: state.quizAttempts,
        maxStreak: state.maxStreak,
        dailyPoints: state.dailyPoints,
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
