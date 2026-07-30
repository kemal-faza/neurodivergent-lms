"use client";

import { useState } from "react";
import {
  Sliders, X, Check, RotateCcw,
  Accessibility, BookOpen, Zap, Settings2,
  Volume2, Eye, Ruler, Focus,
} from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { CONTRAST_OPTIONS, FONT_OPTIONS } from "@/lib/constants";
import type { Profile, AccessibilitySettings } from "@/lib/types";

const PROFILE_ITEMS: { id: Profile; label: string; icon: typeof BookOpen }[] = [
  { id: "disleksia", label: "Disleksia", icon: BookOpen },
  { id: "adhd", label: "ADHD", icon: Zap },
  { id: "umum", label: "Umum", icon: Settings2 },
];

const TOOLS: {
  key: keyof AccessibilitySettings;
  label: string;
  desc: string;
  icon: typeof Volume2;
}[] = [
  { key: "ttsEnabled", label: "Text-to-Speech (TTS)", desc: "Membacakan teks dengan suara", icon: Volume2 },
  { key: "bionic", label: "Bionic Reading", desc: "Highlight awal kata untuk fokus membaca", icon: Eye },
  { key: "lineGuide", label: "Line Guide Ruler", desc: "Garis bantu mengikuti kursor", icon: Ruler },
  { key: "focusMode", label: "Focus Mode", desc: "Fokus pada satu paragraf saja", icon: Focus },
];

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const s = useAccessibilityStore();

  const activeCount = [s.bionic, s.lineGuide, s.focusMode, s.ttsEnabled].filter(Boolean).length;

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-50 font-sans flex flex-col items-end">
      {/* Floating Card Panel */}
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-h-[80vh] overflow-y-auto bg-card border-2 border-border rounded-xl shadow-2xl p-4 text-fg animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <Accessibility size={20} className="text-fg" />
              <div>
                <h3 className="text-sm font-bold font-lexend text-fg">Panel Aksesibilitas</h3>
                <p className="text-[11px] text-muted font-sans">Pengaturan berlaku di semua halaman</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 text-muted hover:text-fg rounded-lg hover:bg-muted/10 min-h-[36px] min-w-[36px] flex items-center justify-center"
              title="Tutup Panel"
            >
              <X size={16} />
            </button>
          </div>

          <hr className="border-t-2 border-border my-4" />

          {/* Group 1: Profil */}
          <div>
            <h4 className="text-xs font-bold font-lexend text-fg mb-2.5">Profil Belajar</h4>
            <div className="grid grid-cols-3 gap-2">
              {PROFILE_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => s.applyProfile(id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 border-2 rounded-xl text-center transition-all min-h-[56px] ${
                    s.profile === id
                      ? "border-fg bg-fg text-bg font-semibold shadow-sm"
                      : "border-border bg-card text-muted hover:bg-muted/10 hover:text-fg"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-[11px] font-sans font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-t-2 border-border my-4" />

          {/* Group 2: Tampilan */}
          <div>
            <h4 className="text-xs font-bold font-lexend text-fg mb-2.5">Tampilan</h4>

            <div className="mb-3">
              <p className="text-[11px] font-sans text-muted mb-1.5">Jenis Font</p>
              <div className="space-y-1">
                {FONT_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => s.setSetting("fontFamily", f.value)}
                    className={`w-full text-left text-[11px] px-3 py-2.5 border-2 rounded-xl transition-colors flex items-center justify-between font-sans ${
                      s.fontFamily === f.value
                        ? "border-fg bg-fg text-bg font-semibold"
                        : "border-border bg-card text-fg hover:bg-muted/10"
                    }`}
                  >
                    <span>{f.label}</span>
                    {s.fontFamily === f.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 space-y-3">
              <p className="text-[11px] font-sans text-muted mb-1.5">Ukuran &amp; Spasi</p>
              <RangeControl label="Ukuran font" value={s.fontSize} min={14} max={30} step={1} unit="px" onChange={(v) => s.setSetting("fontSize", v)} />
              <RangeControl label="Line height" value={s.lineHeight} min={1.2} max={2.4} step={0.1} onChange={(v) => s.setSetting("lineHeight", v)} />
              <RangeControl label="Letter spacing" value={s.letterSpacing} min={0} max={4} step={0.5} unit="px" onChange={(v) => s.setSetting("letterSpacing", v)} />
              <RangeControl label="Word spacing" value={s.wordSpacing} min={0} max={10} step={1} unit="px" onChange={(v) => s.setSetting("wordSpacing", v)} />
            </div>

            <div>
              <p className="text-[11px] font-sans text-muted mb-1.5">Kontras Warna</p>
              <div className="grid grid-cols-3 gap-2">
                {CONTRAST_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => s.setSetting("contrast", c.value)}
                    className={`text-[11px] py-2.5 px-2 border-2 rounded-xl transition-colors font-sans font-semibold ${
                      s.contrast === c.value
                        ? "border-fg bg-fg text-bg"
                        : "border-border bg-card text-fg hover:bg-muted/10"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-border my-4" />

          {/* Group 3: Alat Bantu */}
          <div>
            <h4 className="text-xs font-bold font-lexend text-fg mb-2.5">Alat Bantu</h4>
            <div className="space-y-1.5">
              {TOOLS.map(({ key, label, desc, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => s.setSetting(key, !s[key])}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 border-2 rounded-xl text-left transition-all font-sans ${
                    s[key]
                      ? "border-fg bg-fg/5 shadow-sm"
                      : "border-border bg-card hover:bg-muted/10"
                  }`}
                >
                  <Icon size={18} className={s[key] ? "text-fg" : "text-muted"} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-fg">{label}</p>
                    <p className="text-[10px] text-muted leading-tight">{desc}</p>
                  </div>
                  <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 flex-shrink-0 ${
                    s[key] ? "bg-fg" : "bg-muted/30"
                  }`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-bg transition-transform ${
                      s[key] ? "translate-x-4" : "translate-x-0"
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-t-2 border-border my-4" />

          {/* Footer */}
          <div className="pt-1 flex items-center justify-between border-t-2 border-border">
            <span className="text-[11px] font-sans text-muted">
              {activeCount > 0 ? `${activeCount} alat bantu aktif` : "Pengaturan standar"}
            </span>
            <button
              type="button"
              onClick={() => s.reset()}
              className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-muted hover:text-fg transition-colors min-h-[36px] px-2 rounded-lg hover:bg-muted/10"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-fg text-bg rounded-full shadow-xl border-2 border-border hover:opacity-90 transition-all active:scale-95 font-sans"
        title="Buka Floating Panel Aksesibilitas"
      >
        <Sliders size={16} />
        <span className="text-xs font-semibold">Aksesibilitas</span>
        {activeCount > 0 && (
          <span className="w-5 h-5 bg-amber-400 text-gray-900 rounded-full text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>
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
    <div className="text-[11px] font-sans">
      <div className="flex justify-between text-muted mb-0.5">
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
        className="w-full h-2 bg-muted/20 rounded cursor-pointer accent-fg"
      />
    </div>
  );
}
