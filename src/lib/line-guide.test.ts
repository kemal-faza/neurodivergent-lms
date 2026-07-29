import { describe, expect, test } from "vitest";
import { snapToLine, getNextLineIndex } from "./line-guide";
import type { LineRect } from "./line-guide";

function makeRect(top: number, height: number): LineRect {
  return { top, bottom: top + height, height, left: 0, width: 800 };
}

describe("snapToLine", () => {
  test("returns null for empty lines", () => {
    expect(snapToLine(100, [])).toBeNull();
  });

  test("returns exact line when point is inside a line", () => {
    const lines = [makeRect(0, 30), makeRect(40, 30), makeRect(80, 30)];
    const result = snapToLine(50, lines);
    expect(result).toEqual(lines[1]);
  });

  test("returns nearest line when point is between lines", () => {
    const lines = [makeRect(0, 30), makeRect(50, 30), makeRect(100, 30)];
    // point 45: mid of line 0 = 15, mid of line 1 = 65 → closer to line 1
    const result = snapToLine(45, lines);
    expect(result).toEqual(lines[1]);
  });

  test("snaps to first line when point is above all lines", () => {
    const lines = [makeRect(100, 30), makeRect(140, 30)];
    const result = snapToLine(0, lines);
    expect(result).toEqual(lines[0]);
  });

  test("snaps to last line when point is below all lines", () => {
    const lines = [makeRect(0, 30), makeRect(40, 30)];
    const result = snapToLine(200, lines);
    expect(result).toEqual(lines[1]);
  });

  test("tolerance of 8px from line edge still snaps", () => {
    const lines = [makeRect(100, 30), makeRect(150, 30)];
    // point 92 is 8px above line 0 top (100) → within tolerance
    const result = snapToLine(92, lines);
    expect(result).toEqual(lines[0]);
  });

  test("point exactly at line center returns that line", () => {
    const lines = [makeRect(0, 40), makeRect(60, 40)];
    const result = snapToLine(20, lines);
    expect(result).toEqual(lines[0]);
  });
});

describe("getNextLineIndex", () => {
  test("moves up by 1", () => {
    expect(getNextLineIndex(2, -1, 5)).toBe(1);
  });

  test("moves down by 1", () => {
    expect(getNextLineIndex(2, 1, 5)).toBe(3);
  });

  test("clamps at 0 when going up from first line", () => {
    expect(getNextLineIndex(0, -1, 5)).toBe(0);
  });

  test("clamps at last when going down from last line", () => {
    expect(getNextLineIndex(4, 1, 5)).toBe(4);
  });

  test("works with single line total", () => {
    expect(getNextLineIndex(0, 1, 1)).toBe(0);
    expect(getNextLineIndex(0, -1, 1)).toBe(0);
  });
});
