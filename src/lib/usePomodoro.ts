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

export function usePomodoro(enabled: boolean) {
  const [snapshot, setSnapshot] = useState<PomodoroSnapshot>(() =>
    initialSnapshot(Date.now()),
  );
  const [loaded, setLoaded] = useState(false);
  const snapshotRef = useRef(snapshot);
  snapshotRef.current = snapshot;

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

  // Persist snapshot on every change (after load).
  useEffect(() => {
    if (!loaded) return;
    if (IDB_AVAILABLE) {
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

  // Pause & persist when disabled.
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
