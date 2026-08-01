import { beforeEach, describe, expect, test } from "vitest";
import { useProgressStore } from "./progressStore";
import type { QuizSession } from "../lib/types";

beforeEach(() => {
  useProgressStore.getState().reset();
});

describe("progressStore", () => {
  test("recordQuiz with high score raises adaptive level and awards points", () => {
    const before = useProgressStore.getState().adaptiveLevel;
    const basePoin = useProgressStore.getState().poin;
    useProgressStore.getState().recordQuiz("q1", 5, 5);
    const s = useProgressStore.getState();
    expect(s.adaptiveLevel).toBe(Math.min(3, before + 1));
    expect(s.poin).toBeGreaterThan(basePoin);
    expect(s.quizScores["q1"]).toBeGreaterThan(0);
  });

  test("recordQuiz with low score lowers adaptive level", () => {
    useProgressStore.setState({ adaptiveLevel: 2 });
    useProgressStore.getState().recordQuiz("q1", 0, 5);
    expect(useProgressStore.getState().adaptiveLevel).toBe(1);
  });

  test("addBadge is idempotent", () => {
    useProgressStore.getState().addBadge("Focused");
    useProgressStore.getState().addBadge("Focused");
    expect(useProgressStore.getState().badge.filter((b) => b === "Focused")).toHaveLength(1);
  });

  test("completeMateri records once", () => {
    useProgressStore.getState().completeMateri("m1");
    useProgressStore.getState().completeMateri("m1");
    expect(useProgressStore.getState().completedMateri).toEqual(["m1"]);
  });
});

describe("quiz progress & sessions", () => {
  test("setQuizProgress clamps 0-100", () => {
    const store = useProgressStore.getState();
    store.setQuizProgress("m1", 40);
    expect(useProgressStore.getState().quizProgress["m1"]).toBe(40);
    store.setQuizProgress("m1", 150);
    expect(useProgressStore.getState().quizProgress["m1"]).toBe(100);
    store.setQuizProgress("m1", -5);
    expect(useProgressStore.getState().quizProgress["m1"]).toBe(0);
  });

  test("saveQuizSession upserts", () => {
    const session: QuizSession = {
      soalIds: ["a", "b"],
      levels: [1, 2],
      answers: [{ selected: 1, isCorrect: true }],
      updatedAt: "2026-07-31T00:00:00.000Z",
    };
    const store = useProgressStore.getState();
    store.saveQuizSession("m1", session);
    expect(useProgressStore.getState().quizSessions["m1"]).toEqual(session);
    const v2 = { ...session, answers: [] };
    store.saveQuizSession("m1", v2);
    expect(useProgressStore.getState().quizSessions["m1"]).toEqual(v2);
  });

  test("clearQuizSession removes key", () => {
    const store = useProgressStore.getState();
    store.saveQuizSession("m1", {
      soalIds: ["a"],
      levels: [1],
      answers: [],
      updatedAt: "x",
    });
    store.clearQuizSession("m1");
    expect(useProgressStore.getState().quizSessions["m1"]).toBeUndefined();
  });
});
