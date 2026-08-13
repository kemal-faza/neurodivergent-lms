import { beforeEach, describe, expect, test } from "vitest";
import { useAccessibilityStore } from "./accessibilityStore";

beforeEach(() => {
  useAccessibilityStore.getState().reset();
});

describe("accessibilityStore", () => {
  test("applyProfile disleksia applies the preset", () => {
    useAccessibilityStore.getState().applyProfile("disleksia");
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBe("disleksia");
    expect(s.fontFamily).toBe("opendyslexic");
    expect(s.contrast).toBe("high");
    expect(s.lineGuide).toBe(true);
    expect(s.ttsEnabled).toBe(true);
  });

  test("applyProfile adhd applies the preset", () => {
    useAccessibilityStore.getState().applyProfile("adhd");
    const s = useAccessibilityStore.getState();
    expect(s.fontFamily).toBe("lexend");
    expect(s.bionic).toBe(true);
    expect(s.focusMode).toBe(true);
  });

  test("applyProfile adhd enables pomodoro", () => {
    useAccessibilityStore.getState().applyProfile("adhd");
    expect(useAccessibilityStore.getState().pomodoroEnabled).toBe(true);
  });

  test("setSetting toggles pomodoroEnabled", () => {
    useAccessibilityStore.getState().setSetting("pomodoroEnabled", true);
    expect(useAccessibilityStore.getState().pomodoroEnabled).toBe(true);
    useAccessibilityStore.getState().setSetting("pomodoroEnabled", false);
    expect(useAccessibilityStore.getState().pomodoroEnabled).toBe(false);
  });

  test("setSetting updates a single field", () => {
    useAccessibilityStore.getState().setSetting("bionic", true);
    expect(useAccessibilityStore.getState().bionic).toBe(true);
  });

  test("reset returns to defaults", () => {
    useAccessibilityStore.getState().applyProfile("disleksia");
    useAccessibilityStore.getState().reset();
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBeNull();
    expect(s.fontFamily).toBe("default");
  });

  test("applyProfile with anak applies profile preset + age overlay", () => {
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBe("disleksia");
    expect(s.ageBand).toBe("anak");
    // disleksia base fontSize 20 + anak delta 2
    expect(s.fontSize).toBe(22);
    // non-numeric preset fields untouched
    expect(s.contrast).toBe("high");
  });

  test("applyProfile one-arg leaves ageBand null and no overlay", () => {
    useAccessibilityStore.getState().applyProfile("disleksia");
    const s = useAccessibilityStore.getState();
    expect(s.ageBand).toBeNull();
    expect(s.fontSize).toBe(20); // preset base, no overlay
  });

  test("reset returns ageBand to null", () => {
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    useAccessibilityStore.getState().reset();
    const s = useAccessibilityStore.getState();
    expect(s.profile).toBeNull();
    expect(s.ageBand).toBeNull();
  });

  test("re-apply penuh tidak men-stack delta (store recompute from base)", () => {
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    const first = useAccessibilityStore.getState().fontSize; // 20 base + 2 = 22
    useAccessibilityStore.getState().applyProfile("disleksia", "anak");
    const second = useAccessibilityStore.getState().fontSize; // recompute dari base -> tetap 22
    expect(first).toBe(22);
    expect(second).toBe(22);
  });
});
