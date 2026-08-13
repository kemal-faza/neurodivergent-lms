import { del, get, set } from "idb-keyval";
import type { StateStorage } from "zustand/middleware";

/**
 * Zustand persist storage backed by IndexedDB (idb-keyval) per the PRD tech stack.
 * Falls back to an in-memory map when IndexedDB is unavailable (SSR / node tests)
 * so the stores remain importable and testable everywhere.
 *
 * **Hydration gate:** zustand's `persist` auto-persists on *every* `set()`. During the
 * initial mount, transient `set()` calls (e.g. `setPanelOpen`) fire *before*
 * `rehydrate()`'s async IndexedDB read resolves, and those writes serialise the current
 * (default) settings into storage — overwriting the user's saved preferences so they
 * appear "lost" on reload. To prevent that, `setItem` is ignored until the store has
 * hydrated once (`markHydrated()`), which the accessibility/progress stores call from
 * `onRehydrateStorage`. Nothing is persisted while restoring, so `rehydrate()` reads the
 * user's real last-known settings.
 */
const memory = new Map<string, string>();
const hasIDB = typeof indexedDB !== "undefined";

let hydrated = false;

/** Called by stores after a successful rehydrate to allow writes to persist. */
export function markHydrated(): void {
  hydrated = true;
}

export const idbStorage: StateStorage = {
  getItem: async (name) => {
    if (hasIDB) return (await get(name)) ?? null;
    return memory.get(name) ?? null;
  },
  setItem: async (name, value) => {
    if (!hydrated) return; // ignore pre-hydration default writes (prevents clobbering saved settings)
    if (hasIDB) {
      await set(name, value);
      return;
    }
    memory.set(name, value);
  },
  removeItem: async (name) => {
    if (hasIDB) {
      await del(name);
      return;
    }
    memory.delete(name);
  },
};