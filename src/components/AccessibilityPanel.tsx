"use client";

import { useState } from "react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { CONTRAST_OPTIONS, FONT_OPTIONS, PROFILE_LABELS } from "@/lib/constants";
import type { Contrast, FontFamily, Profile } from "@/lib/types";
import { cn } from "@/lib/cn";

const PROFILES: Profile[] = ["disleksia", "adhd", "umum"];

/**
 * Floating accessibility control panel (PRD P0). Mostly functional in the
 * foundation: it reads/writes the accessibility store, and AccessibilityApplier
 * reflects the changes live. Person A extends TTS wiring; Person B refines the
 * design system / Line Guide integration.
 */
export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const s = useAccessibilityStore();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Buka panel aksesibilitas"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-accent px-4 py-3 font-medium text-accent-fg shadow-lg"
      >
        {open ? "Tutup" : "Aksesibilitas"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Panel aksesibilitas"
          className="mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-xl border border-border bg-card p-4 text-fg shadow-xl"
        >
          <h2 className="mb-3 font-reader text-base font-bold">Aksesibilitas</h2>

          <Section title="Profil cepat">
            <div className="flex gap-2">
              {PROFILES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => s.applyProfile(p)}
                  className={cn(
                    "rounded-md px-2 py-1 text-sm",
                    s.profile === p ? "bg-accent text-accent-fg" : "bg-bg text-fg",
                  )}
                >
                  {PROFILE_LABELS[p]}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Font">
            <select
              value={s.fontFamily}
              onChange={(e) => s.setSetting("fontFamily", e.target.value as FontFamily)}
              className="w-full rounded-md border border-border bg-bg p-1 text-sm"
            >
              {FONT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Section>

          <Range
            label="Ukuran font"
            value={s.fontSize}
            min={14}
            max={32}
            step={1}
            suffix="px"
            onChange={(v) => s.setSetting("fontSize", v)}
          />
          <Range
            label="Line height"
            value={s.lineHeight}
            min={1.2}
            max={2.6}
            step={0.1}
            onChange={(v) => s.setSetting("lineHeight", v)}
          />
          <Range
            label="Letter spacing"
            value={s.letterSpacing}
            min={0}
            max={4}
            step={0.5}
            suffix="px"
            onChange={(v) => s.setSetting("letterSpacing", v)}
          />
          <Range
            label="Word spacing"
            value={s.wordSpacing}
            min={0}
            max={10}
            step={1}
            suffix="px"
            onChange={(v) => s.setSetting("wordSpacing", v)}
          />

          <Section title="Kontras">
            <select
              value={s.contrast}
              onChange={(e) => s.setSetting("contrast", e.target.value as Contrast)}
              className="w-full rounded-md border border-border bg-bg p-1 text-sm"
            >
              {CONTRAST_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Section>

          <Toggle label="Bionic reading" checked={s.bionic} onChange={(v) => s.setSetting("bionic", v)} />
          <Toggle label="Text-to-speech" checked={s.ttsEnabled} onChange={(v) => s.setSetting("ttsEnabled", v)} />
          <Toggle label="Line guide" checked={s.lineGuide} onChange={(v) => s.setSetting("lineGuide", v)} />
          <Toggle label="Focus mode" checked={s.focusMode} onChange={(v) => s.setSetting("focusMode", v)} />

          <button
            type="button"
            onClick={() => s.reset()}
            className="mt-3 w-full rounded-md border border-border bg-bg py-2 text-sm"
          >
            Reset ke default
          </button>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      {children}
    </div>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-muted">
        <span>{label}</span>
        <span>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="mb-2 flex items-center justify-between text-sm">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
    </label>
  );
}
