/**
 * Text-to-speech helper backed by the Web Speech API (PRD P0: "TTS via Web Speech API").
 * Person A extends this (e.g. per-sentence highlighting, voice selection) — the
 * foundation provides a working baseline so the demo works immediately.
 */
export function speak(text: string, opts?: Partial<SpeechSynthesisUtterance>): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (opts) Object.assign(utterance, opts);

  // Keep the spoken language Indonesian even when the browser's default voice
  // is configured for another language.
  utterance.lang = "id-ID";

  const voices = typeof window.speechSynthesis.getVoices === "function"
    ? window.speechSynthesis.getVoices()
    : [];
  const indonesianVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("id")
  );
  if (indonesianVoice) utterance.voice = indonesianVoice;

  window.speechSynthesis.speak(utterance);
}

export function pauseSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.pause();
}

export function resumeSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.resume();
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

export function isTTSAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
