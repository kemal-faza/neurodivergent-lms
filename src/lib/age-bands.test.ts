import { describe, expect, test } from "vitest";
import { applyBandOverlay } from "./age-bands";
import { PROFILE_PRESETS } from "./constants";

describe("applyBandOverlay", () => {
  test("anak menambahkan delta numerik di atas preset disleksia", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, "anak");
    expect(out.fontSize).toBe(base.fontSize! + 2);
    expect(out.lineHeight).toBe(base.lineHeight! + 0.1);
    expect(out.letterSpacing).toBe(base.letterSpacing! + 0.5);
    expect(out.wordSpacing).toBe(base.wordSpacing! + 1);
  });

  test("dewasa tidak mengubah preset (baseline)", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, "dewasa");
    expect(out).toEqual({ ...base });
  });

  test("null tidak mengubah preset (default)", () => {
    const base = PROFILE_PRESETS.disleksia;
    const out = applyBandOverlay(base, null);
    expect(out).toEqual({ ...base });
  });

  test("overlay tidak menyentuh field non-numerik", () => {
    const base = PROFILE_PRESETS.disleksia; // contrast: "high", ttsEnabled: true, bionic: false
    const out = applyBandOverlay(base, "anak");
    expect(out.contrast).toBe("high");
    expect(out.ttsEnabled).toBe(true);
    expect(out.bionic).toBe(false);
  });

  // Catatan: fungsi ini TIDAK idempotent — setiap pemanggilan menambah delta ke
  // preset yang diberikan. "Tidak men-stack" dijamin oleh store (applyProfile selalu
  // menghitung dari PROFILE_PRESETS[profile] sebagai base), diuji di accessibilityStore.test.ts.
});