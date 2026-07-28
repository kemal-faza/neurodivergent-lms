"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight, Play, Pause, Square, Sliders, Volume2, Focus, Sparkles, BookOpen
} from "lucide-react";
import { getMateri } from "@/lib/dummy-data";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";
import { SectionLabel, WBox } from "@/components/ui/WireframePrimitives";
import { toBionic } from "@/lib/bionic";
import { speak, stopSpeaking, isTTSAvailable } from "@/lib/tts";

export default function MateriPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const materi = getMateri(params.id || "m1");

  const completeMateri = useProgressStore((s) => s.completeMateri);
  const bumpStreak = useProgressStore((s) => s.bumpStreak);

  const font = useAccessibilityStore((s) => s.fontFamily);
  const spacing = useAccessibilityStore((s) => s.lineHeight);
  const contrast = useAccessibilityStore((s) => s.contrast);
  const ttsEnabled = useAccessibilityStore((s) => s.ttsEnabled);
  const bionic = useAccessibilityStore((s) => s.bionic);
  const lineGuide = useAccessibilityStore((s) => s.lineGuide);
  const focusMode = useAccessibilityStore((s) => s.focusMode);

  const [activeParaIndex, setActiveParaIndex] = useState<number>(0);
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);

  // Mark materi complete when page loads
  useEffect(() => {
    if (materi?.id) {
      completeMateri(materi.id);
      bumpStreak();
    }
  }, [materi?.id, completeMateri, bumpStreak]);

  // Clean up TTS when unmounting or changing page
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!materi) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
        <p className="text-muted">Materi tidak ditemukan.</p>
        <button onClick={() => router.push("/")} className="mt-4 px-4 py-2 text-xs border rounded">
          ← Kembali ke Beranda
        </button>
      </div>
    );
  }

  const activeCount = [bionic, lineGuide, focusMode, ttsEnabled].filter(Boolean).length;

  const paragraphs = [
    {
      id: 0,
      title: "Paragraf 1 — Pengertian & Fungsi Utama",
      text: materi.konten,
    },
    {
      id: 1,
      title: "Paragraf 2 — Kloroplas & Klorofil",
      text: "Proses ini terjadi di dalam kloroplas sel tumbuhan. Pigmen klorofil menyerap cahaya merah dan biru dari matahari, lalu memantulkan warna hijau sehingga daun tampak berwarna hijau segar.",
    },
    {
      id: 2,
      title: "Paragraf 3 — Tahapan Reaksi Terang & Gelap",
      text: "Fotosintesis terbagi menjadi dua tahap: Reaksi Terang yang memecah molekul air menggunakan energi cahaya, dan Reaksi Gelap (Siklus Calvin) yang membentuk gula dari karbon dioksida.",
    },
    {
      id: 3,
      title: "Paragraf 4 — Peran Penting Bagi Ekosistem",
      text: "Tanpa fotosintesis, ketersediaan oksigen di atmosfer akan habis dan rantai makanan pada ekosistem darat maupun perairan tidak dapat bertahan hidup.",
    },
  ];

  const handleToggleTts = () => {
    if (isPlayingTts) {
      stopSpeaking();
      setIsPlayingTts(false);
    } else {
      const fullContent = paragraphs.map((p) => p.text).join(" ");
      speak(fullContent, {
        onend: () => setIsPlayingTts(false),
        onerror: () => setIsPlayingTts(false),
      });
      setIsPlayingTts(true);
    }
  };

  const handleStopTts = () => {
    stopSpeaking();
    setIsPlayingTts(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 font-mono relative">
      {/* Screen Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-border pb-4">
        <div>
          <SectionLabel>halaman materi / reader</SectionLabel>
          <h1 className="text-xl sm:text-2xl font-bold font-sans text-fg flex items-center gap-2">
            <BookOpen className="text-muted" size={22} />
            Materi: {materi.judul}
          </h1>
          <p className="text-[11px] text-muted mt-0.5 font-mono">
            Gunakan Floating Accessibility Panel di pojok kanan bawah untuk menyesuaikan mode baca.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const btn = document.querySelector('[aria-label="Buka panel aksesibilitas"]') as HTMLButtonElement;
            btn?.click();
          }}
          className="flex items-center gap-2 px-3.5 py-2 text-xs bg-fg text-bg rounded-xl shadow hover:opacity-90 transition-opacity"
        >
          <Sliders size={14} className="text-amber-400" />
          <span className="font-sans font-bold">Atur Aksesibilitas</span>
          {activeCount > 0 && (
            <span className="bg-amber-400 text-gray-900 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Active Features Indicator Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-card p-3 rounded-xl border border-dashed border-border text-xs">
        <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Mode Aktif:</span>
        <span className="text-[10px] px-2 py-0.5 bg-muted/10 border border-border rounded text-fg font-mono">
          Font: <strong>{font}</strong>
        </span>
        <span className="text-[10px] px-2 py-0.5 bg-muted/10 border border-border rounded text-fg font-mono">
          Spacing: <strong>{spacing}x</strong>
        </span>
        <span className="text-[10px] px-2 py-0.5 bg-muted/10 border border-border rounded text-fg font-mono">
          Kontras: <strong>{contrast}</strong>
        </span>

        {ttsEnabled && (
          <span className="text-[10px] px-2 py-0.5 bg-orange-100 dark:bg-orange-950/40 border border-orange-300 text-orange-700 dark:text-orange-300 rounded font-bold flex items-center gap-1">
            <Volume2 size={10} /> TTS Active
          </span>
        )}
        {bionic && (
          <span className="text-[10px] px-2 py-0.5 bg-amber-100 dark:bg-amber-950/40 border border-amber-300 text-amber-800 dark:text-amber-300 rounded font-bold flex items-center gap-1">
            <Sparkles size={10} /> Bionic Reading
          </span>
        )}
        {lineGuide && (
          <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-950/40 border border-blue-300 text-blue-700 dark:text-blue-300 rounded font-bold flex items-center gap-1">
            📏 Line Guide Ruler
          </span>
        )}
        {focusMode && (
          <span className="text-[10px] px-2 py-0.5 bg-purple-100 dark:bg-purple-950/40 border border-purple-300 text-purple-700 dark:text-purple-300 rounded font-bold flex items-center gap-1">
            <Focus size={10} /> Focus Mode
          </span>
        )}
      </div>

      {/* TTS Interactive Control Bar */}
      {ttsEnabled && (
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-300 rounded-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Volume2 size={20} className="text-orange-600 animate-pulse" />
            <div>
              <span className="text-xs font-bold font-sans text-orange-900 dark:text-orange-200 block">Text-To-Speech (Web Speech API)</span>
              <span className="text-[11px] text-orange-700 dark:text-orange-300">Membacakan materi artikel secara otomatis</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleTts}
              className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs flex items-center gap-1.5 font-sans font-bold shadow-sm"
            >
              {isPlayingTts ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlayingTts ? "Pause Suara" : "Putar Suara"}</span>
            </button>
            <button
              type="button"
              onClick={handleStopTts}
              className="p-1.5 bg-card border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-100"
              title="Stop TTS"
            >
              <Square size={12} />
            </button>
            <span className="text-[10px] font-mono text-orange-600 border border-orange-200 bg-card px-2 py-0.5 rounded">Speed 1.0x</span>
          </div>
        </div>
      )}

      {/* Article Reader Surface Container */}
      <div className="reader relative border-2 border-border bg-card rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Focus Mode Banner */}
        {focusMode && (
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-300 rounded-lg text-purple-800 dark:text-purple-200 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>🎯 <strong>Focus Mode Aktif:</strong> Klik paragraf untuk fokus. Paragraf lain diredupkan untuk konsentrasi ADHD.</span>
            <div className="flex gap-1">
              {paragraphs.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveParaIndex(idx)}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                    activeParaIndex === idx
                      ? "bg-purple-700 text-white border-purple-700"
                      : "bg-card text-purple-700 border-purple-300 hover:bg-purple-100"
                  }`}
                >
                  P{idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bionic Reading Banner */}
        {bionic && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 rounded-lg text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <Sparkles size={14} className="text-amber-600 flex-shrink-0" />
            <span>⚡ <strong>Bionic Reading Mode:</strong> Bagian awal kata ditebalkan otomatis untuk memandu visual pembaca Disleksia & ADHD.</span>
          </div>
        )}

        {/* Article Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-sans text-fg border-b border-border pb-3">
          {materi.judul} — Penjelasan Lengkap
        </h2>

        {/* Paragraphs List */}
        <div className="space-y-6">
          {paragraphs.map((para, idx) => {
            const isFocused = !focusMode || activeParaIndex === idx;

            return (
              <div
                key={para.id}
                onClick={() => setActiveParaIndex(idx)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isFocused
                    ? "bg-card border-border text-fg shadow-sm"
                    : "focus-dimmed bg-muted/5 border-border/50 text-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider">
                    {para.title}
                  </span>
                  {focusMode && isFocused && (
                    <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded font-bold">
                      Fokus P{idx + 1}
                    </span>
                  )}
                </div>

                {bionic ? (
                  <p
                    className="font-reader"
                    dangerouslySetInnerHTML={{ __html: toBionic(para.text) }}
                  />
                ) : (
                  <p className="font-reader">
                    {para.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Diagram Box */}
        <div className="mt-8">
          <WBox
            label="[ Diagram Infografis: Proses Biokimia Fotosintesis ]"
            className="!h-36 rounded-xl"
          />
        </div>
      </div>

      {/* Footer Navigation Actions */}
      <div className="mt-8 border-t-2 border-dashed border-border pt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-muted font-mono">
          Progress Membaca: <strong className="text-emerald-600 dark:text-emerald-400">100% Selesai ✓</strong>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 text-xs border-2 border-border text-fg rounded-lg hover:bg-muted/10 font-mono"
          >
            ← Kembali ke Beranda
          </button>
          <button
            type="button"
            onClick={() => router.push("/belajar/kuis/q1")}
            className="px-5 py-2 text-xs border-2 border-accent bg-accent text-accent-fg rounded-lg hover:opacity-90 font-mono font-bold flex items-center gap-1.5 shadow"
          >
            Kerjakan Kuis Adaptif <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
