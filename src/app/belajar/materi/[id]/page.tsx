"use client";

import { useParams } from "next/navigation";
import { getMateri } from "@/lib/dummy-data";

/**
 * FOUNDATION STUB — Person A builds ArticleReader.
 * Render dummy content with accessibility tokens (.reader).
 * Wire: toBionic, TTS (speak/stopSpeaking), per-sentence highlight.
 */
export default function MateriPage() {
  const params = useParams<{ id: string }>();
  const materi = getMateri(params.id);

  if (!materi) {
    return <p className="reader">Materi tidak ditemukan.</p>;
  }

  return (
    <article className="reader space-y-4">
      <h1 className="text-2xl font-bold">{materi.judul}</h1>
      <p className="leading-relaxed">{materi.konten}</p>
    </article>
  );
}
