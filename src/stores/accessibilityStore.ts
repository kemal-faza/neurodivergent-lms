"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { idbStorage, markHydrated } from "./storage";
import type { AccessibilitySettings, Profile, AgeBand } from "../lib/types";
import { DEFAULT_SETTINGS, PROFILE_PRESETS } from "../lib/constants";
import { applyBandOverlay } from "../lib/age-bands";

type Settings = AccessibilitySettings;

interface AccessibilityStore extends Settings {
  hasHydrated: boolean;
  /** Runtime (non-persisted) flag: accessibility panel is open. */
  panelOpen: boolean;
  /** Update a single setting. */
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  /** Apply a profile preset, optionally layered with an age band delta. */
  applyProfile: (profile: Profile, ageBand?: AgeBand | null) => void;
  /** Set whether the accessibility panel is open (not persisted). */
  setPanelOpen: (v: boolean) => void;
  reset: () => void;
  setHasHydrated: (v: boolean) => void;
}

const SETTING_KEYS: (keyof Settings)[] = [
  "profile",
  "ageBand",
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
      panelOpen: false,
      setSetting: (key, value) => set({ [key]: value } as Partial<AccessibilityStore>),
      applyProfile: (profile, ageBand) =>
        set({
          profile,
          ageBand: ageBand ?? null,
          ...applyBandOverlay(PROFILE_PRESETS[profile], ageBand ?? null),
        }),
      setPanelOpen: (v) => set({ panelOpen: v }),
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
          ageBand: state.ageBand,
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
      onRehydrateStorage: () => (state) => {
        markHydrated();
        state?.setHasHydrated(true);
      },
    },
  ),
);
