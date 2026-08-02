"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, Play, Pause, Square, BookOpen, ArrowLeft
} from "lucide-react";
import { getMateriById } from "@/lib/dummy-data";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";

import { toBionic } from "@/lib/bionic";
import { pauseSpeaking, resumeSpeaking, speak, stopSpeaking, isTTSAvailable } from "@/lib/tts";
import { calculateReadingProgress } from "@/lib/reading-progress";
import { PomodoroWidget } from "@/components/PomodoroWidget";

export default function MateriPage() {
  const params = useParams<{ subjek: string; material: string }>();
  const router = useRouter();
  const materi = getMateriById(params.material);

  const completeMateri = useProgressStore((s) => s.completeMateri);
  const setMateriProgress = useProgressStore((s) => s.setMateriProgress);
  const bumpStreak = useProgressStore((s) => s.bumpStreak);
  const readerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const ttsEnabled = useAccessibilityStore((s) => s.ttsEnabled);
  const bionic = useAccessibilityStore((s) => s.bionic);
  const focusMode = useAccessibilityStore((s) => s.focusMode);

  const [activeParaIndex, setActiveParaIndex] = useState<number>(0);
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);
  const [isPausedTts, setIsPausedTts] = useState<boolean>(false);
  const [ttsRate, setTtsRate] = useState<number>(1);

  // Scroll-based reading progress
  useEffect(() => {
    if (!materi?.id || mounted) return;
    setMounted(true);
    bumpStreak();
    const existing = useProgressStore.getState().materiProgress[materi.id] ?? 0;
    if (existing < 20) setMateriProgress(materi.id, 20);
    const handleScroll = () => {
      const el = readerRef.current;
      if (!el) return;
      const existing = useProgressStore.getState().materiProgress[materi.id] ?? 0;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = calculateReadingProgress(scrollTop, scrollHeight, clientHeight);
      const next = Math.max(existing, pct);
      setMateriProgress(materi.id, next);
      if (next >= 100) {
        const state = useProgressStore.getState();
        if (!state.completedMateri.includes(materi.id)) completeMateri(materi.id);
      }
    };
    const el = readerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [materi?.id]);

  // Clean up TTS when unmounting or changing page
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!materi) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-sans">
        <p className="text-muted text-lg mb-4">Materi tidak ditemukan.</p>
        <button onClick={() => router.push("/belajar")} className="px-5 py-2.5 text-sm font-sans font-semibold border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-colors min-h-[44px]">
          <ArrowLeft size={16} className="inline" /> Kembali ke Daftar Mata Pelajaran
        </button>
      </div>
    );
  }

  const paragraphs = materi.paragraphs;

  const fullContent = paragraphs.map((p) => p.text).join(" ");

  const resetTtsState = () => {
    setIsPlayingTts(false);
    setIsPausedTts(false);
  };

  const startTts = (rate: number = ttsRate) => {
    if (!isTTSAvailable()) return;
    speak(fullContent, {
      rate,
      onend: resetTtsState,
      onerror: resetTtsState,
    });
    setIsPlayingTts(true);
    setIsPausedTts(false);
  };

  const handleToggleTts = () => {
    if (isPausedTts) {
      resumeSpeaking();
      setIsPlayingTts(true);
      setIsPausedTts(false);
    } else if (isPlayingTts) {
      pauseSpeaking();
      setIsPlayingTts(false);
      setIsPausedTts(true);
    } else {
      startTts();
    }
  };

  const handleRestartTts = () => {
    startTts();
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRate = Number(event.target.value);
    setTtsRate(nextRate);
    if (isPlayingTts || isPausedTts) startTts(nextRate);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans relative">
      {/* Screen Header */}
      <div>
        <div>
          <Link
            href={`/belajar/${params.subjek}`}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted hover:text-fg mb-3 transition-colors"
          >
            <ArrowLeft size={14} /> Kembali ke Daftar Materi
          </Link>

          <h1 className="text-xl sm:text-2xl font-bold font-lexend text-fg flex items-center gap-2 mb-4">
            {materi.judul}
          </h1>
        </div>
      </div>

      {/* TTS Interactive Control Bar */}
      {ttsEnabled && (
        <div className="mb-6 p-4 bg-muted/10 border-2 border-border rounded-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs font-bold font-sans text-fg block">Text-To-Speech (Web Speech API)</span>
              <span className="text-[11px] text-muted">Membacakan materi artikel secara otomatis</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleTts}
              className="px-3.5 py-1.5 bg-fg text-bg hover:opacity-90 rounded-lg text-xs flex items-center gap-1.5 font-sans font-bold shadow-sm"
            >
              {isPlayingTts ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlayingTts ? "Pause Suara" : isPausedTts ? "Lanjutkan Suara" : "Putar Suara"}</span>
            </button>
            <button
              id="stop-tts-button"
              type="button"
              onClick={handleRestartTts}
              className="p-1.5 bg-card border border-border text-muted rounded-lg hover:bg-muted/10"
              title="Ulangi dari awal"
              aria-label="Ulangi suara dari awal"
            >
              <Square size={12} />
            </button>
            <label className="text-[10px] font-sans text-muted border border-border bg-card px-2 py-0.5 rounded flex items-center gap-1.5">
              <span>Speed</span>
              <select
                value={ttsRate}
                onChange={handleRateChange}
                className="bg-transparent text-fg font-semibold outline-none cursor-pointer"
                aria-label="Kecepatan suara"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <option key={rate} value={rate}>{rate}x</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {/* Article Reader Surface Container */}
      <div ref={readerRef} className="reader relative border-2 border-border bg-card rounded-xl p-6 sm:p-8 space-y-6 shadow-sm max-h-[70vh] overflow-y-auto">
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
                onClick={() => focusMode && setActiveParaIndex(idx)}
                className={`p-4 rounded-xl border-2 transition-all ${
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
      </div>

      {/* Footer Navigation Actions */}
      <div className="mt-8 pt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => router.push(`/belajar/${params.subjek}`)}
          className="px-4 py-2 text-xs border-2 border-border text-fg rounded-lg hover:bg-muted/10 font-sans font-semibold hover:-translate-x-0.5 transition-all"
        >
          <ArrowLeft size={14} className="inline" /> Kembali ke Daftar Materi
        </button>
        {materi.kuisId ? (
          <button
            type="button"
            onClick={() => router.push(`/kuis/${params.subjek}/${params.material}?back=${encodeURIComponent(`/belajar/${params.subjek}/${params.material}`)}`)}
            className="px-5 py-2 text-xs border-2 border-accent bg-accent text-accent-fg rounded-lg hover:opacity-90 font-sans font-semibold flex items-center gap-1.5 shadow"
          >
            Kerjakan Kuis Adaptif <ChevronRight size={14} />
          </button>
        ) : (
          <span className="px-5 py-2 text-xs border-2 border-border text-muted bg-muted/5 rounded-lg font-sans cursor-not-allowed">
            Kuis Belum Tersedia
          </span>
        )}
      </div>

      <PomodoroWidget />
    </div>
  );
}
