import { describe, expect, test } from "vitest";
import type { QuizSession, Soal } from "./types";
import { buildInitialSession, parseStoredSession } from "./quiz-session";

function soal(id: string, diff: number): Soal {
  return { id, t: id, opsi: ["a", "b", "c"], benar: 0, diff };
}

const pool: Soal[] = [
  soal("s1", 1),
  soal("s2", 2),
  soal("s3", 1),
  soal("s4", 3),
  soal("s5", 2),
];

function stored(overrides: Partial<QuizSession> = {}): QuizSession {
  return {
    soalIds: ["s1", "s3"],
    levels: [1, 1],
    answers: [{ selected: 0, isCorrect: true }],
    updatedAt: "2026-07-31T00:00:00.000Z",
    ...overrides,
  };
}

describe("parseStoredSession", () => {
  test("null saat tidak ada sesi", () => {
    expect(parseStoredSession(pool, undefined)).toBeNull();
  });
  test("null saat sesi sudah selesai", () => {
    expect(
      parseStoredSession(
        pool,
        stored({
          answers: [
            { selected: 0, isCorrect: true },
            { selected: 1, isCorrect: false },
          ],
        }),
      ),
    ).toBeNull();
  });
  test("null saat levels tidak sejajar soalIds", () => {
    expect(parseStoredSession(pool, stored({ levels: [1] }))).toBeNull();
  });
  test("null saat id soal tidak ada di pool", () => {
    expect(parseStoredSession(pool, stored({ soalIds: ["s1", "hilang"] }))).toBeNull();
  });
  test("null saat soalIds kosong", () => {
    expect(parseStoredSession(pool, stored({ soalIds: [] }))).toBeNull();
  });
  test("membangun sesi resume yang valid", () => {
    const r = parseStoredSession(pool, stored());
    expect(r).not.toBeNull();
    expect(r!.orderedSoal.map((s) => s.id)).toEqual(["s1", "s3"]);
    expect(r!.questionLevels).toEqual([1, 1]);
    expect(r!.answers[0]).toEqual({ selected: 0, isCorrect: true });
    expect(r!.startIndex).toBe(1);
  });
});

describe("buildInitialSession", () => {
  test("memakai sesi tersimpan jika valid", () => {
    const b = buildInitialSession(pool, 2, stored());
    expect(b.startIndex).toBe(1);
    expect(b.sessionCorrect).toEqual([1]);
    expect(b.orderedSoal[0].id).toBe("s1");
  });
  test("membuat sesi baru jika tidak ada tersimpan", () => {
    const b = buildInitialSession(pool, 2, undefined);
    expect(b.startIndex).toBe(0);
    expect(b.questionLevels).toEqual([2]);
    expect(b.answers).toEqual({});
    expect(b.sessionCorrect).toEqual([]);
    expect(b.orderedSoal).toHaveLength(1);
    expect(b.orderedSoal[0].diff).toBe(2);
  });
  test("membuat sesi baru jika tersimpan tidak valid", () => {
    const b = buildInitialSession(pool, 2, stored({ soalIds: ["s1", "hilang"] }));
    expect(b.startIndex).toBe(0);
    expect(b.questionLevels).toEqual([2]);
  });
});
