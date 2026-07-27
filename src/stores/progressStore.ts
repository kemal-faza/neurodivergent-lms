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
    (set) => ({
      ...INITIAL_PROGRESS,
      hasHydrated: false,
      addPoin: (n) => set((s) => ({ poin: s.poin + n })),
      recordQuiz: (kuisId, correct, total) =>
        set((s) => {
          const ratio = scoreToRatio(correct, total);
          const points = quizPoints(correct, total);
          const best = Math.max(s.quizScores[kuisId] ?? 0, points);
          return {
            poin: s.poin + points,
            quizScores: { ...s.quizScores, [kuisId]: best },
            adaptiveLevel: nextAdaptiveLevel(s.adaptiveLevel, ratio),
          };
        }),
      addBadge: (id) =>
        set((s) => (s.badge.includes(id) ? s : { badge: [...s.badge, id] })),
      completeMateri: (id) =>
        set((s) =>
          s.completedMateri.includes(id) ? s : { completedMateri: [...s.completedMateri, id] },
        ),
      bumpStreak: () =>
        set((s) => {
          if (s.lastActiveDate === todayISO()) return s;
          return { streak: s.streak + 1, lastActiveDate: todayISO() };
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
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
