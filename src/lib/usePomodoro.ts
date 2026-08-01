"use client";

import { useEffect, useRef, useState } from "react";
import { get, set } from "idb-keyval";
import {
  POMODORO_STORAGE_KEY,
  computeRemaining,
  initialSnapshot,
  resetPomodoro,
  skipPomodoro,
  toggleRunning,
  type PomodoroSnapshot,
} from "./pomodoro";
import { playChime } from "./pomodoro-audio";

const IDB_AVAILABLE = typeof indexedDB !== "undefined";

/** Throttle IndexedDB writes while running to avoid per-second jank. */
const PERSIST_INTERVAL_MS = 10_000;

export function usePomodoro(enabled: boolean) {
  const [snapshot, setSnapshot] = useState<PomodoroSnapshot>(() =>
    initialSnapshot(Date.now()),
  );
  const [loaded, setLoaded] = useState(false);
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;
  const lastPersistAtRef = useRef(0);

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

  // Persist snapshot — immediately on pause, throttled while running (after load).
  useEffect(() => {
    if (!loaded || !IDB_AVAILABLE) return;
    const now = Date.now();
    if (!snapshot.running || now - lastPersistAtRef.current >= PERSIST_INTERVAL_MS) {
      lastPersistAtRef.current = now;
      set(POMODORO_STORAGE_KEY, snapshot).catch(() => {});
    }
  }, [snapshot, loaded]);

  // Tick when running & enabled.
  useEffect(() => {
    if (!enabled || !snapshot.running) return;
    const id = setInterval(() => {
      const next = computeRemaining(snapshotRef.current, Date.now());
      if (next.transitioned) {
        playChime();
      }
      setSnapshot((prev) => ({
        ...prev,
        remainingSec: next.remainingSec,
        mode: next.mode,
        completedCycles: next.completedCycles,
        updatedAt: new Date().toISOString(),
      }));
    }, 1000);
    return () => clearInterval(id);
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
      setSnapshot((prev) => ({
        ...prev,
        remainingSec: next.remainingSec,
        mode: next.mode,
        completedCycles: next.completedCycles,
        updatedAt: new Date(now).toISOString(),
      }));
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [enabled]);

  // Pause when disabled (persist effect writes immediately on pause).
  useEffect(() => {
    if (!enabled && snapshot.running) {
      setSnapshot((prev) => ({ ...prev, running: false }));
    }
  }, [enabled, snapshot.running]);

  const toggle = () =>
    setSnapshot((prev) => toggleRunning(prev, Date.now()));
  const reset = () =>
    setSnapshot((prev) => resetPomodoro(prev, Date.now()));
  const skip = () =>
    setSnapshot((prev) => skipPomodoro(prev, Date.now()));

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
