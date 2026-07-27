import { beforeEach, describe, expect, test } from "vitest";
import { useProgressStore } from "./progressStore";

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
