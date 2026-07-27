"use client";

import { useEffect } from "react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { FONT_STACKS } from "@/lib/constants";

/**
 * Applies accessibility settings to the document root as CSS variables and
 * data-attributes. Every reading surface uses these via the `.reader` class and
 * the `[data-bionic]`, `[data-contrast]` selectors in globals.css. Person A's
 * ArticleReader and Person B's panel both rely on this — do not duplicate the
 * logic elsewhere.
 */
export function AccessibilityApplier() {
  const settings = useAccessibilityStore();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reader-font", FONT_STACKS[settings.fontFamily]);
    root.style.setProperty("--reader-font-size", `${settings.fontSize}px`);
    root.style.setProperty("--reader-line-height", String(settings.lineHeight));
    root.style.setProperty("--reader-letter-spacing", `${settings.letterSpacing}px`);
    root.style.setProperty("--reader-word-spacing", `${settings.wordSpacing}px`);
    root.dataset.contrast = settings.contrast;
    root.dataset.bionic = settings.bionic ? "on" : "off";
    root.dataset.lineGuide = settings.lineGuide ? "on" : "off";
    root.dataset.focus = settings.focusMode ? "on" : "off";
  }, [
    settings.fontFamily,
    settings.fontSize,
    settings.lineHeight,
    settings.letterSpacing,
    settings.wordSpacing,
    settings.contrast,
    settings.bionic,
    settings.lineGuide,
    settings.focusMode,
  ]);

  return null;
}
