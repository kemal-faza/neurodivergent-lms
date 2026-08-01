// Shared domain types for the LevelUp neurodivergent education platform.
// Both parallel workers (A: panel/materi/adaptive, B: design/gamification/dashboard)
// must import these types — do NOT redefine them locally.

export type Profile = "disleksia" | "adhd" | "umum";

export type FontFamily = "default" | "lexend" | "opendyslexic";

export type Contrast = "normal" | "high" | "dark";
import type { LucideIcon } from "lucide-react";

/** All accessibility settings, persisted in IndexedDB via the accessibility store. */
export interface AccessibilitySettings {
  profile: Profile | null;
  fontFamily: FontFamily;
  /** Base font size in px for reading surfaces. */
  fontSize: number;
  /** Unitless line-height multiplier. */
  lineHeight: number;
  /** Extra letter spacing in px. */
  letterSpacing: number;
  /** Extra word spacing in px. */
  wordSpacing: number;
  contrast: Contrast;
  /** Bionic reading: bold the first half of each word. */
  bionic: boolean;
  /** Text-to-speech enabled (Web Speech API). */
  ttsEnabled: boolean;
  /** Reading ruler / line guide overlay follows the cursor. */
  lineGuide: boolean;
  /** Focus mode: dim surrounding content, optionally paired with a Pomodoro timer. */
  focusMode: boolean;
}

export interface Soal {
  id: string;
  /** Question text. */
  t: string;
  opsi: string[];
  /** Zero-based index of the correct option. */
  benar: number;
  /** Difficulty 1 (easy) .. 3 (hard). Used by the adaptive engine. */
  diff: number;
}

export interface Kuis {
  id: string;
  materiId: string;
  soal: Soal[];
}

export interface Paragraph {
  id: number;
  title: string;
  text: string;
}

export interface Materi {
  id: string;
  judul: string;
  deskripsi: string;
  subjekId: string;
  level: number;
  kuisId?: string;
  paragraphs: Paragraph[];
}

export interface Subjek {
  id: string;
  nama: string;
  icon: LucideIcon;
  materiIds: string[];
}

export interface QuizAttempt {
  correct: number;
  total: number;
  date: string;
}

export interface QuizSessionAnswer {
  selected: number;
  isCorrect: boolean;
}

export interface QuizSession {
  soalIds: string[];
  levels: number[];
  answers: QuizSessionAnswer[];
  updatedAt: string;
}

export interface ProgressState {
  userId: string;
  poin: number;
  streak: number;
  /** ISO date string (yyyy-mm-dd) of the last active day, or null. */
  lastActiveDate: string | null;
  /** Badge ids the learner has earned. */
  badge: string[];
  /** Current adaptive difficulty level 1..3. */
  adaptiveLevel: number;
  completedMateri: string[];
  /** kuisId -> best score (points). */
  quizScores: Record<string, number>;
  /** materiId -> history of quiz attempts. */
  quizAttempts: Record<string, QuizAttempt[]>;
  /** Highest streak the user has ever achieved. */
  maxStreak: number;
  /** Points per day keyed by ISO date (yyyy-mm-dd). */
  dailyPoints: Record<string, number>;
  /** Materi id -> 0-100 reading progress. */
  materiProgress: Record<string, number>;
  /** Materi id -> 0-100 quiz progress (answered questions / total). */
  quizProgress: Record<string, number>;
  /** Materi id -> in-progress quiz session snapshot (for resume). */
  quizSessions: Record<string, QuizSession>;
}
