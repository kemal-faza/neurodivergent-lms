import { del, get, set } from "idb-keyval";
import type { StateStorage } from "zustand/middleware";

/**
 * Zustand persist storage backed by IndexedDB (idb-keyval) per the PRD tech stack.
 * Falls back to an in-memory map when IndexedDB is unavailable (SSR / node tests)
 * so the stores remain importable and testable everywhere.
 */
const memory = new Map<string, string>();
const hasIDB = typeof indexedDB !== "undefined";

export const idbStorage: StateStorage = {
  getItem: async (name) => {
    if (hasIDB) return (await get(name)) ?? null;
    return memory.get(name) ?? null;
  },
  setItem: async (name, value) => {
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
