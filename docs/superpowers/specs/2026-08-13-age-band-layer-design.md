# Design — Dimensi Usia (Age Band Layer) di atas Profil Neurotype

**Project:** LevelUp — Neurodivergent Education Platform (CITECH 2026)
**Status:** Approved
**Date:** 2026-08-13
**Scope:** Single implementation plan (dimensi usia + penguatan klaim font)

---

## 1. Latar Belakang & Masalah

Proposal LevelUp mendefinisikan persona belajar hanya berdasarkan 3 tipe neurotype
(Disleksia / ADHD / Umum) tanpa dimensi usia. Ini menimbulkan dua gap:

1. **Tidak ada batasan/diferensiasi usia.** PRD §4 tidak menyebut umur/kelas. Padahal
   kebutuhan readability (ukuran font, line-height, letter-spacing) dan pendekatan
   gamification berbeda antara anak, remaja, dan dewasa.
2. **Klaim font OpenDyslexic berbasis asumsi literatur, bukan konsensus.** Sebagian
   riset menunjukkan tidak ada perbedaan signifikan keterbacaan OpenDyslexic vs font
   regular untuk semua penyandang disleksia; sebagian pengguna justru melaporkan lebih
   sulit membaca. Kode saat ini meng-hardcode `opendyslexic` sebagai default profil
   disleksia.

## 2. Keputusan Desain (dari sesi brainstorming)

- **KD-A1:** Dimensi usia ditambahkan sebagai **lapisan di atas profil** neurotype.
  Profil tetap menjadi preset utama; band usia memodifikasi beberapa nilai numerik.
- **KD-A2:** Tiga band usia sederhana: **Anak (6-9), Remaja (10-15), Dewasa (16+)**.
  "Usia ringan" — bukan developmental tiers penuh. Scope rendah, dampak tinggi untuk juri.
- **KD-A3:** Meccanisme overlay via **`AGE_BAND_DELTAS` + fungsi murni `applyBandOverlay`**,
  bukan matriks preset flat 9x.
- **KD-A4:** Perilaku ganti usia = **re-apply penuh** (reset penyesuaian manual user),
  konsisten dengan kontrak `applyProfile` yang sudah ada.
- **KD-A5:** UI pemilihan usia = **3 tombol segmen**, default **Dewasa** (baseline netral).
- **KD-A6 (OpenDyslexic):** OpenDyslexic tetap **default** profil disleksia tetapi **tidak
  hard-lock** — user bisa ganti font via panel. Tambahkan microcopy alternatif saat font
  aktif, dan geser narasi presentasi dari "efektivitas font terbukti" ke "adaptivitas &
  kontrol user".

## 3. Arsitektur

### 3.1 Tipe (`src/lib/types.ts`)

Tambahkan:

```ts
export type AgeBand = "anak" | "remaja" | "dewasa";
```

Dan tambahkan field persist di `AccessibilitySettings`:

```ts
ageBand: AgeBand | null;
```

### 3.2 Konstanta (`src/lib/constants.ts`)

```ts
export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  anak: "Anak (6-9)",
  remaja: "Remaja (10-15)",
  dewasa: "Dewasa (16+)",
};

export const AGE_BAND_DELTAS: Record<AgeBand, Partial<AccessibilitySettings>> = {
  // `wordSpacing` sengaja ikut di-overlay karena merupakan metrik keterbacaan numerik
  // yang sama dengan fontSize/lineHeight/letterSpacing (preset disleksia men-set-nya ke 4).
  anak: { fontSize: +2, lineHeight: +0.1, letterSpacing: +0.5, wordSpacing: +1 },
  remaja: { fontSize: +1, lineHeight: +0.05, letterSpacing: +0.25, wordSpacing: +0.5 },
  dewasa: {}, // baseline, tidak ada overlay
};
```

**Catatan kritis:** `fontSize`/`lineHeight`/`letterSpacing` di `DEFAULT_SETTINGS` dan
`PROFILE_PRESETS` adalah **nilai absolut**, bukan delta. Oleh karena itu `applyBandOverlay`
harus **menambahkan delta di atas nilai preset** — tidak boleh `set` nilai absolut.

### 3.3 Fungsi overlay murni (`src/lib/age-bands.ts`)

```ts
import type { AccessibilitySettings, AgeBand } from "./types";
import { AGE_BAND_DELTAS } from "./constants";

export function applyBandOverlay(
  preset: Partial<AccessibilitySettings>,
  ageBand: AgeBand | null,
): Partial<AccessibilitySettings> {
  if (!ageBand || ageBand === "dewasa") return { ...preset };
  const deltas = AGE_BAND_DELTAS[ageBand];
  const out: Partial<AccessibilitySettings> = { ...preset };
  if (deltas.fontSize !== undefined && out.fontSize !== undefined)
    out.fontSize = out.fontSize + deltas.fontSize;
  if (deltas.lineHeight !== undefined && out.lineHeight !== undefined)
    out.lineHeight = out.lineHeight + deltas.lineHeight;
  if (deltas.letterSpacing !== undefined && out.letterSpacing !== undefined)
    out.letterSpacing = out.letterSpacing + deltas.letterSpacing;
  if (deltas.wordSpacing !== undefined && out.wordSpacing !== undefined)
    out.wordSpacing = out.wordSpacing + deltas.wordSpacing;
  return out;
}
```

File `age-bands.ts` dipisah dari `adaptive.ts` agar tidak membebani source-of-truth kuis.

### 3.4 Store (`src/stores/accessibilityStore.ts`)

Modifikasi `applyProfile`:

```ts
applyProfile: (profile: Profile, ageBand: AgeBand | null) =>
  set({
    profile,
    ageBand,
    ...applyBandOverlay(PROFILE_PRESETS[profile], ageBand),
  }),
```

Perubahan lain:
- Tambah `ageBand` ke `SETTING_KEYS`.
- Tambah `ageBand: null` ke `DEFAULT_SETTINGS` dan ke objek `partialize`.
- `reset()` otomatis mengembalikan `ageBand: null` (via spread `DEFAULT_SETTINGS`).
- **Tidak ada setter terpisah untuk usia** — `ageBand` hanya ditulis lewat `applyProfile`,
  mencegah state tidak konsisten.

**Invarian ordering:** overlay dihitung hanya saat `applyProfile` dipanggil. Setelah itu
semua nilai flat/absolut di store; edit manual user menimpa dan dipersist normal. Mengubah
usia = memanggil `applyProfile(profile, usiaBaru)` kembali (reset edits manual).

### 3.5 UI (`src/components/landing/ProfileCard.tsx` + landing)

Flow baru:

```
Pilih profil → Pilih usia (3 tombol segmen: Anak 6-9 / Remaja 10-15 / Dewasa 16+)
→ Klik "Mulai Belajar" → applyProfile(profile, usia) → router.push("/belajar")
```

- Default usia = **Dewasa** (baseline netral, tidak ada overlay).
- Update `ProfileCard.handleSelect` untuk menerima `ageBand` & memanggil `applyProfile` dua-argumen.
- Touch target mengikuti pola existing `min-h-[44px]`.

## 4. Penguatan OpenDyslexic

- **Tidak hard-lock:** preset disleksia tetap `fontFamily: "opendyslexic"` sebagai default,
  tetapi `FONT_OPTIONS` di `AccessibilityPanel` sudah menyediakan override ke Default/Lexend.
  Biarkan kontrol di panel.
- **Microcopy kontekstual** di panel saat font aktif `opendyslexic` (`src/components/AccessibilityPanel.tsx`):
  teks halus seperti "Terasa berat? Coba Default/Lexend — tiap otak punya preferensi beda."
- **Narasi presentasi** dalam dokumen keluar digeser dari klaim efektivitas font ke klaim
  adaptivitas & kontrol user. Ini mendukung Mitigasi Risiko PRD §12 (bionic terlihat gimmick)
  dan §11 scoring.

## 5. Testing (TDD, RED-GREEN-REFACTOR)

### 5.1 `src/lib/age-bands.test.ts` (baru)

- `applyBandOverlay(dyslexiaPreset, "anak")` → `fontSize` naik +2, `letterSpacing` +0.5,
  `lineHeight` +0.1, dan `wordSpacing` +1 dari preset.
- `applyBandOverlay(dyslexiaPreset, "dewasa")` → preset tak berubah (baseline).
- `applyBandOverlay(dyslexiaPreset, null)` → preset tak berubah (default).
- Overlay **tidak menyentuh** field non-numerik (`contrast`, `ttsEnabled`, `bionic` tetap
  dari preset profil).
- Re-apply penuh: `("anak")` lalu `("dewasa")` → hasil akhir = preset base, tanpa stacking.

### 5.2 `src/stores/accessibilityStore.test.ts` (update)

- `applyProfile("disleksia", "anak")` menerapkan preset + overlay.
- `reset()` mengembalikan `ageBand: null`.

## 6. Error Handling & Invarian

- `applyBandOverlay` aman untuk preset kosong / field `undefined` (guard `!== undefined`).
- Usia tidak pernah diubah tanpa profil (`applyProfile` selalu menerima profil).
- Tidak ada stacking saat usia diubah berulang (re-apply penuh dari preset base).
- Tidak ada setter usia terpisah ⇒ tidak ada state persisten tidak konsisten.

## 7. Saat Ini Tidak Dicakup (Non-Goals Dimensi Usia)

- Per-usia konten/materi yang berbeda (developmental tiers penuh).
- Dimensi usia pada hasil (hasil per usia), adaptive quiz difficulty berbasis usia.
- Fitur gamification frekuensi reward berbasis usia (dideferral; tidak di scope plan ini).

## 8. Urutan Kerja (test-first per file)

1. `types.ts` — tambah `AgeBand` + field `ageBand`.
2. `constants.ts` — `AGE_BAND_LABELS` + `AGE_BAND_DELTAS`.
3. `age-bands.ts` + `age-bands.test.ts` (TDD).
4. `accessibilityStore.ts` — modifikasi `applyProfile`, `SETTING_KEYS`, `partialize`,
   `DEFAULT_SETTINGS` + test update.
5. `ProfileCard.tsx` / landing — selektor usia 3 tombol segmen.
6. `src/components/AccessibilityPanel.tsx` — microcopy OpenDyslexic.
7. Verifikasi: `npm run build` + `npm test`.

## 9. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Delta numerik salah tafsir absolut | Test unit + komentar eksplisit "delta ditambahkan" |
| Usia mengacaukan fitur existing | Invarian re-apply penuh + tidak ada setter terpisah |
| Landing lebih ramai (profil+usia) | Single flow terurut, tetap `min-h-[44px]` touch |
| Klaim font berlebihan di demo | Narasi digeser ke adaptivitas & kontrol user |