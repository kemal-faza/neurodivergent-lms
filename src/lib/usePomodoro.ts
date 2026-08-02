"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { get, set } from "idb-keyval";
import {
  POMODORO_STORAGE_KEY,
  POMODORO_PERSIST_INTERVAL_MS,
  computeRemaining,
  initialSnapshot,
  resetPomodoro,
  shouldPersistPomodoro,
  skipPomodoro,
  toggleRunning,
  type PomodoroSnapshot,
} from "./pomodoro";
import { playChime } from "./pomodoro-audio";

const IDB_AVAILABLE = typeof indexedDB !== "undefined";

export function usePomodoro(enabled: boolean) {
  const [snapshot, setSnapshot] = useState<PomodoroSnapshot>(() =>
    initialSnapshot(Date.now()),
  );
  const [loaded, setLoaded] = useState(false);
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;
  const lastPersistAtRef = useRef<number | null>(null);

  const persistSnapshot = useCallback(
    (next: PomodoroSnapshot, reason: "action" | "checkpoint", now: number) => {
      if (
        !loaded ||
        !IDB_AVAILABLE ||
        !shouldPersistPomodoro(reason, now, lastPersistAtRef.current)
      ) {
        return;
      }
      lastPersistAtRef.current = now;
      void set(POMODORO_STORAGE_KEY, next).catch(() => {});
    },
    [loaded],
  );

  const materialize = useCallback(
    (current: PomodoroSnapshot, now: number): PomodoroSnapshot => {
      if (!current.running) return current;
      const next = computeRemaining(current, now);
      return {
        ...current,
        remainingSec: next.remainingSec,
        mode: next.mode,
        completedCycles: next.completedCycles,
        updatedAt: new Date(now).toISOString(),
        endAt: next.endAt,
      };
    },
    [],
  );

  // Load snapshot from IndexedDB on mount.
  useEffect(() => {
    let cancelled = false;
    if (!IDB_AVAILABLE) {
      setLoaded(true);
      return;
    }
    get<PomodoroSnapshot>(POMODORO_STORAGE_KEY)
      .then((stored) => {
        if (cancelled) return;
        if (stored) setSnapshot(stored);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist a checkpoint separately from the per-second display updates.
  useEffect(() => {
    if (!loaded || !IDB_AVAILABLE || !snapshot.running) return;

    let timeout: ReturnType<typeof setTimeout>;
    const checkpoint = () => {
      const now = Date.now();
      const current = snapshotRef.current;
      if (current.running) {
        persistSnapshot(materialize(current, now), "checkpoint", now);
      }
      timeout = setTimeout(checkpoint, POMODORO_PERSIST_INTERVAL_MS);
    };

    timeout = setTimeout(checkpoint, POMODORO_PERSIST_INTERVAL_MS);
    return () => clearTimeout(timeout);
  }, [loaded, materialize, persistSnapshot, snapshot.running]);

  // Tick when running & enabled.
  useEffect(() => {
    if (!enabled || !snapshot.running) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = Date.now();
      const current = snapshotRef.current;
      const next = computeRemaining(current, now);
      if (next.transitioned) {
        playChime();
      }
      const nextSnapshot = {
        ...current,
        remainingSec: next.remainingSec,
        mode: next.mode,
        completedCycles: next.completedCycles,
        updatedAt: new Date(now).toISOString(),
        endAt: next.endAt,
      };
      snapshotRef.current = nextSnapshot;
      setSnapshot(nextSnapshot);
      timeout = setTimeout(tick, Math.max(50, 1000 - (Date.now() % 1000)));
    };

    timeout = setTimeout(tick, Math.max(50, 1000 - (Date.now() % 1000)));
    return () => clearTimeout(timeout);
  }, [enabled, snapshot.running]);

  // Recompute immediately when the tab regains focus (skip throttled ticks).
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const cur = snapshotRef.current;
      if (!cur.running) return;
      const now = Date.now();
      const next = computeRemaining(cur, now);
      if (next.transitioned) {
        playChime();
      }
      const nextSnapshot = {
        ...cur,
        remainingSec: next.remainingSec,
        mode: next.mode,
        completedCycles: next.completedCycles,
        updatedAt: new Date(now).toISOString(),
        endAt: next.endAt,
      };
      snapshotRef.current = nextSnapshot;
      setSnapshot(nextSnapshot);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled]);

  // Pause when disabled and persist the latest timer state immediately.
  useEffect(() => {
    if (!enabled && snapshot.running) {
      const now = Date.now();
      const next = {
        ...materialize(snapshotRef.current, now),
        running: false,
        updatedAt: new Date(now).toISOString(),
        endAt: null,
      };
      snapshotRef.current = next;
      setSnapshot(next);
      persistSnapshot(next, "action", now);
    }
  }, [enabled, materialize, persistSnapshot, snapshot.running]);

  const toggle = () => {
    const now = Date.now();
    const next = toggleRunning(materialize(snapshotRef.current, now), now);
    snapshotRef.current = next;
    setSnapshot(next);
    persistSnapshot(next, "action", now);
  };
  const reset = () => {
    const now = Date.now();
    const next = resetPomodoro(snapshotRef.current, now);
    snapshotRef.current = next;
    setSnapshot(next);
    persistSnapshot(next, "action", now);
  };
  const skip = () => {
    const now = Date.now();
    const next = skipPomodoro(snapshotRef.current, now);
    snapshotRef.current = next;
    setSnapshot(next);
    persistSnapshot(next, "action", now);
  };

  return {
    mode: snapshot.mode,
    remainingSec: snapshot.remainingSec,
    running: snapshot.running,
    completedCycles: snapshot.completedCycles,
    toggle,
    reset,
    skip,
  };
}
