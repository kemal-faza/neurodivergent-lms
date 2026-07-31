"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight, Play, Pause, Square, BookOpen, ArrowLeft
} from "lucide-react";
import { getMateriById } from "@/lib/dummy-data";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";

import { toBionic } from "@/lib/bionic";
import { speak, stopSpeaking, isTTSAvailable } from "@/lib/tts";

export default function MateriPage() {
  const params = useParams<{ subjek: string; material: string }>();
  const router = useRouter();
  const materi = getMateriById(params.material);

  const completeMateri = useProgressStore((s) => s.completeMateri);
  const bumpStreak = useProgressStore((s) => s.bumpStreak);

  const ttsEnabled = useAccessibilityStore((s) => s.ttsEnabled);
  const bionic = useAccessibilityStore((s) => s.bionic);
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
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-sans">
        <p className="text-muted text-lg mb-4">Materi tidak ditemukan.</p>
        <button onClick={() => router.push("/belajar")} className="px-5 py-2.5 text-sm font-sans font-semibold border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-colors min-h-[44px]">
          <ArrowLeft size={16} className="inline" /> Kembali ke Daftar Mata Pelajaran
        </button>
      </div>
    );
  }

  const paragraphs = materi.paragraphs;

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
              <span>{isPlayingTts ? "Pause Suara" : "Putar Suara"}</span>
            </button>
            <button
              type="button"
              onClick={handleStopTts}
              className="p-1.5 bg-card border border-border text-muted rounded-lg hover:bg-muted/10"
              title="Stop TTS"
            >
              <Square size={12} />
            </button>
            <span className="text-[10px] font-sans text-muted border border-border bg-card px-2 py-0.5 rounded">Speed 1.0x</span>
          </div>
        </div>
      )}

      {/* Article Reader Surface Container */}
      <div className="reader relative border-2 border-border bg-card rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
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
    </div>
  );
}
