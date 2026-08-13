import type { AccessibilitySettings, AgeBand } from "./types";
import { AGE_BAND_DELTAS } from "./constants";

export function applyBandOverlay(
  preset: Partial<AccessibilitySettings>,
  ageBand: AgeBand | null,
): Partial<AccessibilitySettings> {
  // null dan "dewasa" sama-sama no-op (baseline).
  if (!ageBand || ageBand === "dewasa") return { ...preset };
  const deltas = AGE_BAND_DELTAS[ageBand];
  const out: Partial<AccessibilitySettings> = { ...preset };
  if (deltas.fontSize !== undefined && out.fontSize !== undefined)
    out.fontSize = out.fontSize + deltas.fontSize;
  if (deltas.lineHeight !== undefined && out.lineHeight !== undefined)
    out.lineHeight = out.lineHeight + deltas.lineHeight;
  if (deltas.letterSpacing !== undefined && out.letterSpacing !== undefined)
    out.letterSpacing = out.letterSpacing + deltas.letterSpacing;
  if (deltas.wordSpacing !== undefined && out.wordSpacing !== undefined)
    out.wordSpacing = out.wordSpacing + deltas.wordSpacing;
  return out;
}