"use client";

import { useEffect } from "react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";

/**
 * Rehydrates both persisted stores from IndexedDB on the client (the stores use
 * `skipHydration` to avoid SSR mismatches). Wrap the app once in the root layout.
 */
export function StoreHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useAccessibilityStore.persist.rehydrate();
    void useProgressStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
