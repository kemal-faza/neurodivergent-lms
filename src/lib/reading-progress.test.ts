import { describe, expect, test } from "vitest";
import { calculateReadingProgress } from "./reading-progress";

describe("calculateReadingProgress", () => {
  test("marks a non-scrollable material as complete", () => {
    expect(calculateReadingProgress(0, 800, 800)).toBe(100);
  });

  test("starts a scrollable material at 20 percent", () => {
    expect(calculateReadingProgress(0, 1200, 800)).toBe(20);
  });

  test("marks the bottom of a scrollable material as complete", () => {
    expect(calculateReadingProgress(400, 1200, 800)).toBe(100);
  });

  test("clamps overscroll and negative scroll positions", () => {
    expect(calculateReadingProgress(-100, 1200, 800)).toBe(20);
    expect(calculateReadingProgress(999, 1200, 800)).toBe(100);
  });

  test("does not produce NaN for invalid dimensions", () => {
    expect(calculateReadingProgress(0, Number.NaN, 800)).toBe(100);
    expect(calculateReadingProgress(0, 1200, Number.NaN)).toBe(100);
    expect(calculateReadingProgress(0, Number.POSITIVE_INFINITY, 800)).toBe(100);
  });
});
