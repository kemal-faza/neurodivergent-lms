import type { AccessibilitySettings, Contrast, FontFamily, Profile } from "./types";

/** Baseline settings before any profile is chosen. */
export const DEFAULT_SETTINGS: AccessibilitySettings = {
  profile: null,
  fontFamily: "default",
  fontSize: 18,
  lineHeight: 1.7,
  letterSpacing: 0,
  wordSpacing: 0,
  contrast: "normal",
  bionic: false,
  ttsEnabled: false,
  lineGuide: false,
  focusMode: false,
};

/**
 * Profile -> preset accessibility settings (PRD Flow Learner: "Accessibility Panel
 * aktif otomatis sesuai profil"). Person A wires the profile selector to applyProfile().
 */
export const PROFILE_PRESETS: Record<Profile, Partial<AccessibilitySettings>> = {
  disleksia: {
    fontFamily: "opendyslexic",
    fontSize: 20,
    lineHeight: 2.0,
    letterSpacing: 0.5,
    wordSpacing: 4,
    contrast: "high",
    lineGuide: true,
    ttsEnabled: true,
    bionic: false,
    focusMode: false,
  },
  adhd: {
    fontFamily: "lexend",
    fontSize: 18,
    lineHeight: 1.8,
    letterSpacing: 0,
    wordSpacing: 2,
    contrast: "normal",
    bionic: true,
    focusMode: true,
    ttsEnabled: false,
    lineGuide: false,
  },
  umum: {
    fontFamily: "default",
    fontSize: 18,
    lineHeight: 1.7,
    letterSpacing: 0,
    wordSpacing: 0,
    contrast: "normal",
    bionic: false,
    ttsEnabled: false,
    lineGuide: false,
    focusMode: false,
  },
};

export const FONT_OPTIONS: { value: FontFamily; label: string }[] = [
  { value: "default", label: "Default (System)" },
  { value: "lexend", label: "Lexend" },
  { value: "opendyslexic", label: "OpenDyslexic" },
];

export const CONTRAST_OPTIONS: { value: Contrast; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "high", label: "High Contrast" },
  { value: "dark", label: "Dark Mode" },
];

export const PROFILE_LABELS: Record<Profile, string> = {
  disleksia: "Disleksia",
  adhd: "ADHD",
  umum: "Umum",
};

/** CSS font-family stacks per option. OpenDyslexic needs the font file added later
 *  (drop it in /public/fonts and add an @font-face in globals.css). */
export const FONT_STACKS: Record<FontFamily, string> = {
  default: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  lexend: "var(--font-lexend), system-ui, sans-serif",
  opendyslexic: "OpenDyslexic, var(--font-lexend), sans-serif",
};
