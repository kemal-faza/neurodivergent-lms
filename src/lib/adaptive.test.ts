import { describe, expect, test } from "vitest";
import { MAX_LEVEL, MIN_LEVEL, nextAdaptiveLevel, nextQuestionLevel, quizPoints, scoreToRatio, selectNextSoal } from "./adaptive";
import type { Soal } from "./types";

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

function soal(id: string, diff: number): Soal {
  return { id, t: id, opsi: ["a", "b", "c"], benar: 0, diff };
}

describe("nextQuestionLevel", () => {
  test("naik satu level saat jawaban benar", () => {
    expect(nextQuestionLevel(1, true)).toBe(2);
  });
  test("turun satu level saat jawaban salah", () => {
    expect(nextQuestionLevel(2, false)).toBe(1);
  });
  test("klamp ke MAX_LEVEL", () => {
    expect(nextQuestionLevel(MAX_LEVEL, true)).toBe(MAX_LEVEL);
  });
  test("klamp ke MIN_LEVEL", () => {
    expect(nextQuestionLevel(MIN_LEVEL, false)).toBe(MIN_LEVEL);
  });
});

describe("selectNextSoal", () => {
  const pool: Soal[] = [
    soal("s1", 1),
    soal("s2", 2),
    soal("s3", 2),
    soal("s4", 3),
  ];

  test("memilih soal diff sesuai target", () => {
    expect(selectNextSoal(pool, 2, [])?.id).toBe("s2");
  });
  test("melewatkan soal yang sudah terpakai", () => {
    expect(selectNextSoal(pool, 2, ["s2"])?.id).toBe("s3");
  });
  test("fallback ke diff terdekat saat target kosong", () => {
    expect(selectNextSoal(pool, 3, ["s4"])?.id).toBe("s2");
  });
  test("mengembalikan undefined saat semua soal terpakai", () => {
    expect(selectNextSoal(pool, 1, pool.map((s) => s.id))).toBeUndefined();
  });
  test("mengembalikan undefined saat pool kosong", () => {
    expect(selectNextSoal([], 1, [])).toBeUndefined();
  });
});
