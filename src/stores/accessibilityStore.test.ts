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
});
