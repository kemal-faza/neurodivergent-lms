import { describe, expect, test } from "vitest";
import { MAX_LEVEL, MIN_LEVEL, nextAdaptiveLevel, quizPoints, scoreToRatio } from "./adaptive";

describe("scoreToRatio", () => {
  test("computes correct ratio", () => {
    expect(scoreToRatio(3, 5)).toBeCloseTo(0.6);
  });
  test("guards divide-by-zero", () => {
    expect(scoreToRatio(0, 0)).toBe(0);
  });
});

describe("nextAdaptiveLevel", () => {
  test("raises level on high accuracy", () => {
    expect(nextAdaptiveLevel(2, 1)).toBe(3);
  });
  test("lowers level on low accuracy", () => {
    expect(nextAdaptiveLevel(2, 0)).toBe(1);
  });
  test("holds level on medium accuracy", () => {
    expect(nextAdaptiveLevel(2, 0.5)).toBe(2);
  });
  test("clamps to MAX_LEVEL", () => {
    expect(nextAdaptiveLevel(MAX_LEVEL, 1)).toBe(MAX_LEVEL);
  });
  test("clamps to MIN_LEVEL", () => {
    expect(nextAdaptiveLevel(MIN_LEVEL, 0)).toBe(MIN_LEVEL);
  });
});

describe("quizPoints", () => {
  test("awards base + accuracy bonus", () => {
    expect(quizPoints(5, 5)).toBe(70); // 5*10 + 1*20
  });
  test("zero when no questions", () => {
    expect(quizPoints(0, 0)).toBe(0);
  });
});
