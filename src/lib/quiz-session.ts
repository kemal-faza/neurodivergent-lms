import type { QuizSession, Soal } from "./types";
import { selectNextSoal } from "./adaptive";

export interface ResumeSession {
  orderedSoal: Soal[];
  questionLevels: number[];
  answers: Record<number, { selected: number; isCorrect: boolean }>;
  startIndex: number;
}

export interface InitialSession extends ResumeSession {
  sessionCorrect: number[];
}

/**
 * Validate and parse a stored quiz session against the current soal pool.
 * Returns null when there is nothing to resume: no session, a finished
 * session, a malformed snapshot, or stored soal ids that no longer exist
 * in the pool (e.g. soal content changed).
 */
export function parseStoredSession(
  soalList: Soal[],
  stored: QuizSession | undefined,
): ResumeSession | null {
  if (!stored) return null;
  if (stored.answers.length >= stored.soalIds.length) return null;
  if (
    stored.soalIds.length === 0 ||
    stored.soalIds.length !== stored.levels.length
  ) {
    return null;
  }
  const byId = new Map(soalList.map((s) => [s.id, s]));
  const orderedSoal: Soal[] = [];
  for (const id of stored.soalIds) {
    const soal = byId.get(id);
    if (!soal) return null;
    orderedSoal.push(soal);
  }
  const answers: ResumeSession["answers"] = {};
  stored.answers.forEach((a, i) => {
    answers[i] = { selected: a.selected, isCorrect: a.isCorrect };
  });
  return {
    orderedSoal,
    questionLevels: stored.levels,
    answers,
    startIndex: stored.answers.length,
  };
}

/** Resume a stored session when valid, otherwise start a fresh session. */
export function buildInitialSession(
  soalList: Soal[],
  adaptiveLevel: number,
  stored: QuizSession | undefined,
): InitialSession {
  const parsed = parseStoredSession(soalList, stored);
  if (parsed) {
    return {
      ...parsed,
      sessionCorrect: Object.values(parsed.answers).map((a) =>
        a.isCorrect ? 1 : 0,
      ),
    };
  }
  const first = selectNextSoal(soalList, adaptiveLevel, []);
  const orderedSoal = first ? [first] : soalList.length > 0 ? [soalList[0]] : [];
  return {
    orderedSoal,
    questionLevels: [adaptiveLevel],
    answers: {},
    startIndex: 0,
    sessionCorrect: [],
  };
}

/** Count of consecutive correct answers at the end of a session. */
export function trailingCorrectStreak(sessionCorrect: number[]): number {
  let streak = 0;
  for (let i = sessionCorrect.length - 1; i >= 0 && sessionCorrect[i] === 1; i--) {
    streak++;
  }
  return streak;
}
