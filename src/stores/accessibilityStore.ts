"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage } from "./storage";
import type { AccessibilitySettings, Profile } from "../lib/types";
import { DEFAULT_SETTINGS, PROFILE_PRESETS } from "../lib/constants";

type Settings = AccessibilitySettings;

interface AccessibilityStore extends Settings {
  hasHydrated: boolean;
  /** Update a single setting. */
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  /** Apply a profile preset (PRD: panel auto-config per profile). */
  applyProfile: (profile: Profile) => void;
  reset: () => void;
  setHasHydrated: (v: boolean) => void;
}

const SETTING_KEYS: (keyof Settings)[] = [
  "profile",
  "fontFamily",
  "fontSize",
  "lineHeight",
  "letterSpacing",
  "wordSpacing",
  "contrast",
  "bionic",
  "ttsEnabled",
  "lineGuide",
  "pomodoroEnabled",
  "focusMode",
];

export const useAccessibilityStore = create<AccessibilityStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      hasHydrated: false,
      setSetting: (key, value) => set({ [key]: value } as Partial<AccessibilityStore>),
      applyProfile: (profile) => set({ profile, ...PROFILE_PRESETS[profile] }),
      reset: () => set({ ...DEFAULT_SETTINGS, hasHydrated: true }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "levelup-accessibility",
      storage: createJSONStorage(() => idbStorage),
      skipHydration: true,
      partialize: (state) =>
        ({
          profile: state.profile,
          fontFamily: state.fontFamily,
          fontSize: state.fontSize,
          lineHeight: state.lineHeight,
          letterSpacing: state.letterSpacing,
          wordSpacing: state.wordSpacing,
          contrast: state.contrast,
          bionic: state.bionic,
          ttsEnabled: state.ttsEnabled,
          lineGuide: state.lineGuide,
          pomodoroEnabled: state.pomodoroEnabled,
          focusMode: state.focusMode,
        }) as Partial<AccessibilityStore>,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
