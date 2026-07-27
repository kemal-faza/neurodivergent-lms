"use client";

import { useAccessibilityStore } from "../stores/accessibilityStore";
import { useProgressStore } from "../stores/progressStore";

/**
 * Returns true once both persisted stores have rehydrated from IndexedDB.
 * Use it to gate UI that depends on persisted values, preventing SSR/CSR
 * hydration mismatches (e.g. the dashboard reading streak/poin).
 */
export function useHydrated(): boolean {
  const a = useAccessibilityStore((s) => s.hasHydrated);
  const p = useProgressStore((s) => s.hasHydrated);
  return Boolean(a && p);
}
