"use client";

import { useParams } from "next/navigation";
import { getMateri } from "@/lib/dummy-data";
import { toBionic } from "@/lib/bionic";
import { speak, stopSpeaking } from "@/lib/tts";
import { useAccessibilityStore } from "@/stores/accessibilityStore";

/**
 * ArticleReader stub (PRD: Materi page). Renders dummy content with the live
 * accessibility tokens (.reader). Bionic transform + TTS are wired here using the
 * shared libs; Person A builds the richer reading experience on top.
 */
export default function MateriPage() {
  const params = useParams<{ id: string }>();
  const materi = getMateri(params.id);
  const bionic = useAccessibilityStore((s) => s.bionic);

  if (!materi) {
    return <p className="reader">Materi tidak ditemukan.</p>;
  }

  const html = bionic ? toBionic(materi.konten) : materi.konten;

  return (
    <article className="reader space-y-4">
      <h1 className="text-2xl font-bold">{materi.judul}</h1>
      <div
        className="leading-relaxed"
        dangerouslySetInnerHTML={{ __html: bionic ? html : `<p>${html}</p>` }}
      />
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => speak(materi.konten)}
          className="rounded-md bg-accent px-3 py-1.5 text-accent-fg"
        >
          Dengarkan (TTS)
        </button>
        <button
          type="button"
          onClick={() => stopSpeaking()}
          className="rounded-md border border-border px-3 py-1.5"
        >
          Stop
        </button>
      </div>
    </article>
  );
}
