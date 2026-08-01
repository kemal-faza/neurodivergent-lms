import { afterEach, describe, expect, test, vi } from "vitest";
import { pauseSpeaking, resumeSpeaking, speak } from "./tts";

type MockVoice = { lang: string; name: string };

class MockUtterance {
  lang = "";
  voice: MockVoice | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor(public text: string) {}
}

const originalWindow = globalThis.window;
const originalUtterance = globalThis.SpeechSynthesisUtterance;

afterEach(() => {
  globalThis.window = originalWindow;
  globalThis.SpeechSynthesisUtterance = originalUtterance;
});

function setupTts(voices: MockVoice[]) {
  const speakMock = vi.fn();
  const cancelMock = vi.fn();
  const pauseMock = vi.fn();
  const resumeMock = vi.fn();
  const getVoicesMock = vi.fn(() => voices);

  globalThis.window = {
    speechSynthesis: {
      speak: speakMock,
      cancel: cancelMock,
      pause: pauseMock,
      resume: resumeMock,
      getVoices: getVoicesMock,
    },
  } as unknown as Window & typeof globalThis;
  globalThis.SpeechSynthesisUtterance = MockUtterance as unknown as typeof SpeechSynthesisUtterance;

  return { speakMock, cancelMock, pauseMock, resumeMock, getVoicesMock };
}

describe("speak", () => {
  test("menggunakan voice Indonesia jika tersedia", () => {
    const voiceIndonesia = { lang: "id-ID", name: "Bahasa Indonesia" };
    const { speakMock, cancelMock, getVoicesMock } = setupTts([
      { lang: "en-US", name: "English" },
      voiceIndonesia,
    ]);

    speak("Selamat belajar");

    const utterance = speakMock.mock.calls[0][0] as MockUtterance;
    expect(cancelMock).toHaveBeenCalledOnce();
    expect(getVoicesMock).toHaveBeenCalledOnce();
    expect(utterance.text).toBe("Selamat belajar");
    expect(utterance.lang).toBe("id-ID");
    expect(utterance.voice).toBe(voiceIndonesia);
  });

  test("tetap menggunakan id-ID sebagai fallback tanpa voice Indonesia", () => {
    const { speakMock } = setupTts([{ lang: "en-US", name: "English" }]);

    speak("Materi pembelajaran");

    const utterance = speakMock.mock.calls[0][0] as MockUtterance;
    expect(utterance.lang).toBe("id-ID");
    expect(utterance.voice).toBeNull();
  });

  test("meneruskan opsi callback dari pemanggil", () => {
    const { speakMock } = setupTts([]);
    const onend = vi.fn();
    const onerror = vi.fn();

    speak("Soal kuis", { onend, onerror });

    const utterance = speakMock.mock.calls[0][0] as MockUtterance;
    expect(utterance.onend).toBe(onend);
    expect(utterance.onerror).toBe(onerror);
  });

  test("menjeda dan melanjutkan pembacaan", () => {
    const { pauseMock, resumeMock } = setupTts([]);

    pauseSpeaking();
    resumeSpeaking();

    expect(pauseMock).toHaveBeenCalledOnce();
    expect(resumeMock).toHaveBeenCalledOnce();
  });

  test("menerapkan kecepatan pembacaan", () => {
    const { speakMock } = setupTts([]);

    speak("Pembacaan cepat", { rate: 1.5 });

    const utterance = speakMock.mock.calls[0][0] as MockUtterance & { rate: number };
    expect(utterance.rate).toBe(1.5);
  });
});
