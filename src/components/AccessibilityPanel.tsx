"use client";

import { useState } from "react";
import { Sliders, X, Check, RotateCcw } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { CONTRAST_OPTIONS, FONT_OPTIONS, PROFILE_LABELS } from "@/lib/constants";
import type { Contrast, FontFamily, Profile } from "@/lib/types";
import { ToggleSwitch } from "./ui/WireframePrimitives";

const PROFILES: Profile[] = ["disleksia", "adhd", "umum"];

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const s = useAccessibilityStore();

  const activeCount = [s.bionic, s.lineGuide, s.focusMode, s.ttsEnabled].filter(Boolean).length;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-mono flex flex-col items-end">
      {/* Floating Card Panel */}
      {open && (
        <div className="mb-3 w-80 max-h-[80vh] overflow-y-auto bg-card border-2 border-border rounded-xl shadow-2xl p-4 space-y-4 text-fg animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-accent text-accent-fg flex items-center justify-center text-xs font-bold">
                ♿
              </div>
              <div>
                <h3 className="text-xs font-bold text-fg font-sans">Panel Aksesibilitas</h3>
                <p className="text-[9px] text-muted">Floating · Berlaku di Semua Halaman</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-muted hover:text-fg hover:bg-muted/10 rounded"
              title="Tutup Panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Profile Presets */}
          <div>
            <SectionHeader label="preset profil cepat" />
            <div className="grid grid-cols-3 gap-1.5">
              {PROFILES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => s.applyProfile(p)}
                  className={`text-[10px] py-1.5 px-2 border rounded text-center transition-all ${
                    s.profile === p
                      ? "border-fg bg-fg text-bg font-bold"
                      : "border-border bg-card text-muted hover:bg-muted/10"
                  }`}
                >
                  {p === "disleksia" ? "📖 Disleksia" : p === "adhd" ? "⚡ ADHD" : "🌐 Umum"}
                </button>
              ))}
            </div>
          </div>

          {/* Font Selector */}
          <div>
            <SectionHeader label="jenis font" />
            <div className="space-y-1">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => s.setSetting("fontFamily", f.value)}
                  className={`w-full text-left text-[11px] px-2.5 py-1.5 border rounded transition-colors flex items-center justify-between ${
                    s.fontFamily === f.value
                      ? "border-fg bg-fg text-bg font-bold"
                      : "border-border bg-card text-muted hover:bg-muted/10"
                  }`}
                >
                  <span>{f.label}</span>
                  {s.fontFamily === f.value && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size & Spacing Controls */}
          <div className="space-y-2">
            <SectionHeader label="spasi baris & teks" />

            <RangeControl
              label="Ukuran font"
              value={s.fontSize}
              min={14}
              max={30}
              step={1}
              unit="px"
              onChange={(v) => s.setSetting("fontSize", v)}
            />
            <RangeControl
              label="Line height"
              value={s.lineHeight}
              min={1.2}
              max={2.4}
              step={0.1}
              onChange={(v) => s.setSetting("lineHeight", v)}
            />
            <RangeControl
              label="Letter spacing"
              value={s.letterSpacing}
              min={0}
              max={4}
              step={0.5}
              unit="px"
              onChange={(v) => s.setSetting("letterSpacing", v)}
            />
            <RangeControl
              label="Word spacing"
              value={s.wordSpacing}
              min={0}
              max={10}
              step={1}
              unit="px"
              onChange={(v) => s.setSetting("wordSpacing", v)}
            />
          </div>

          {/* Contrast Selector */}
          <div>
            <SectionHeader label="kontras warna" />
            <div className="grid grid-cols-3 gap-1">
              {CONTRAST_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => s.setSetting("contrast", c.value)}
                  className={`text-[10px] py-1 border rounded transition-colors ${
                    s.contrast === c.value
                      ? "border-fg bg-fg text-bg font-bold"
                      : "border-border bg-card text-muted hover:bg-muted/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Toggles */}
          <div>
            <SectionHeader label="fitur aksesibilitas" />
            <div className="space-y-1.5">
              <ToggleSwitch
                label="🔊 TTS (Text-to-Speech)"
                active={s.ttsEnabled}
                onToggle={() => s.setSetting("ttsEnabled", !s.ttsEnabled)}
              />
              <ToggleSwitch
                label="⚡ Bionic Reading"
                active={s.bionic}
                onToggle={() => s.setSetting("bionic", !s.bionic)}
              />
              <ToggleSwitch
                label="📏 Line Guide Ruler"
                active={s.lineGuide}
                onToggle={() => s.setSetting("lineGuide", !s.lineGuide)}
              />
              <ToggleSwitch
                label="🎯 Focus Mode"
                active={s.focusMode}
                onToggle={() => s.setSetting("focusMode", !s.focusMode)}
              />
            </div>
          </div>

          {/* Reset Footer */}
          <div className="pt-2 border-t border-dashed border-border flex justify-between items-center text-[10px]">
            <span className="text-muted">
              {activeCount > 0 ? `${activeCount} fitur aktif` : "Standard"}
            </span>
            <button
              type="button"
              onClick={() => s.reset()}
              className="text-muted hover:text-fg flex items-center gap-1 underline"
            >
              <RotateCcw size={10} /> Reset Default
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:opacity-90 text-accent-fg rounded-full shadow-xl border-2 border-border transition-transform active:scale-95"
        title="Buka Floating Panel Aksesibilitas"
      >
        <Sliders size={16} className="text-amber-400" />
        <span className="text-xs font-bold font-sans">Aksesibilitas</span>
        {activeCount > 0 && (
          <span className="w-5 h-5 bg-amber-400 text-gray-900 rounded-full text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 mb-1.5">
      <span className="w-1.5 h-1.5 bg-muted rounded-sm" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (val: number) => void;
}) {
  return (
    <div className="text-[10px]">
      <div className="flex justify-between text-muted mb-0.5 font-mono">
        <span>{label}</span>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-muted/20 rounded cursor-pointer accent-fg"
      />
    </div>
  );
}
