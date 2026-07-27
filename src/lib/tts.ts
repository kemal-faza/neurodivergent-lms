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
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

export function isTTSAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
