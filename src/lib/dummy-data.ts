import type { Kuis, Materi } from "./types";

/**
 * Dummy educational content (PRD Non-Goal: "Tidak ada konten edukasi real").
 * Replace freely — these exist only to give the UI something to render and to
 * define the Materi/Kuis shape both workers depend on. Keep the `id` stable so
 * routes like /belajar/materi/[id] and progress tracking stay consistent.
 */
export const MATERI: Materi[] = [
  {
    id: "m1",
    judul: "Fotosintesis",
    level: 1,
    konten:
      "Fotosintesis adalah proses tumbuhan mengubah cahaya matahari, air, dan karbon dioksida menjadi makanan berupa glukosa. Klorofil pada daun menyerap cahaya merah dan biru, sehingga daun tampak hijau karena warna hijau dipantulkan. Proses ini menghasilkan oksigen sebagai produk sampingan yang kita hirup setiap hari. Tanpa fotosintesis, rantai makanan di Bumi tidak akan bisa berjalan.",
  },
  {
    id: "m2",
    judul: "Sistem Tata Surya",
    level: 2,
    konten:
      "Tata surya kita terdiri dari Matahari di pusat dan delapan planet yang mengelilinginya. Planet terdekat ke Matahari adalah Merkurius, lalu Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus. Jupiter adalah planet terbesar, sementara Merkurius terkecil. Sabuk asteroid terletak di antara Mars dan Jupiter, memisahkan planet kebumian dari planet raksasa gas.",
  },
];

export const KUIS: Kuis[] = [
  {
    id: "q1",
    materiId: "m1",
    soal: [
      { id: "q1s1", t: "Apa warna yang dipantulkan daun?", opsi: ["Merah", "Hijau", "Biru"], benar: 1, diff: 1 },
      {
        id: "q1s2",
        t: "Apa produk sampingan fotosintesis yang kita hirup?",
        opsi: ["Karbon dioksida", "Oksigen", "Glukosa"],
        benar: 1,
        diff: 1,
      },
      {
        id: "q1s3",
        t: "Zat apa yang menyerap cahaya pada daun?",
        opsi: ["Klorofil", "Klorin", "Kromium"],
        benar: 0,
        diff: 2,
      },
    ],
  },
  {
    id: "q2",
    materiId: "m2",
    soal: [
      { id: "q2s1", t: "Planet terdekat ke Matahari adalah?", opsi: ["Venus", "Bumi", "Merkurius"], benar: 2, diff: 1 },
      {
        id: "q2s2",
        t: "Di antara planet manakah sabuk asteroid berada?",
        opsi: ["Bumi-Mars", "Mars-Jupiter", "Jupiter-Saturnus"],
        benar: 1,
        diff: 2,
      },
      {
        id: "q2s3",
        t: "Planet terbesar di tata surya adalah?",
        opsi: ["Saturnus", "Neptunus", "Jupiter"],
        benar: 2,
        diff: 1,
      },
    ],
  },
];

export function getMateri(id: string): Materi | undefined {
  return MATERI.find((m) => m.id === id);
}

export function getKuis(id: string): Kuis | undefined {
  return KUIS.find((k) => k.id === id);
}
