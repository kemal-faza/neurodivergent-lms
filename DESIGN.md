# DESIGN.md — LevelUp LMS Design System

> **Source of Truth:** Halaman Beranda (`src/app/page.tsx`)
> **Branch:** `feature/accessibility-panel`
> **Tanggal:** 2026-07-30

---

## 1. Prinsip Utama

1. **Beranda adalah acuan visual** — semua halaman lain diselaraskan ke pola Beranda.
2. **Tidak ada karakter emoji** di JSX — semua ikon menggunakan Lucide React.
3. **SectionLabel dihapus** dari seluruh halaman — diganti heading bersih.
4. **WBox dihapus** dari penggunaan di halaman kuis.
5. **Border solid** (`border-2 border-border`) di semua tempat — tidak ada `border-dashed`.
6. **Font reader (`src/app/globals.css` .reader)** tetap mengikuti template accessibility panel.

---

## 2. Standar Visual Global

### 2.1. Font

| Elemen                          | Aturan                                       |
| ------------------------------- | -------------------------------------------- |
| Container utama                 | `font-sans`                                |
| Heading (h1, h2, judul section) | `font-lexend font-bold`                    |
| Body teks                       | `font-sans`                                |
| Back link, label kecil          | `text-xs font-sans font-medium text-muted` |
| Reader surface (`.reader`)    | Ikut CSS variables accessibility panel       |

### 2.2. Spacing & Layout

| Properti            | Nilai                             |
| ------------------- | --------------------------------- |
| Max width container | `max-w-5xl`                     |
| Padding horizontal  | `px-4` (mobile), `px-6` (sm+) |
| Padding vertical    | `py-8`                          |
| Gap antar section   | `space-y-16`                    |
| Gap antar card grid | `gap-5` atau `gap-6`          |

### 2.3. Border & Card

| Elemen                 | Aturan                                                  |
| ---------------------- | ------------------------------------------------------- |
| Card / container utama | `border-2 border-border bg-card rounded-xl shadow-sm` |
| Card hover             | `hover:border-fg/30 transition-all hover:shadow-md`   |
| Separator section      | `border-t-2 border-border`                            |
| Badge locked           | Tetap`opacity-50` + solid border (tanpa dashed)       |

### 2.4. Button

| Tipe                    | Aturan                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| Primary                 | `border-2 border-fg bg-fg text-bg rounded-xl font-sans font-semibold shadow-sm hover:opacity-90` |
| Secondary / back        | `border-2 border-border text-fg rounded-xl font-sans font-semibold hover:bg-muted/10`            |
| Disabled                | `border-2 border-border text-muted bg-muted/10 cursor-not-allowed`                               |
| Min height touch target | `min-h-[44px]`                                                                                   |

### 2.5. Heading Section

Setiap section menggunakan heading tanpa SectionLabel:

```tsx
<div className="mb-6 text-center sm:text-left">
  <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
    Judul Section
  </h2>
  <p className="text-sm text-muted mt-1.5 max-w-xl">
    Deskripsi singkat section.
  </p>
</div>
```

### 2.6. Back Link

```tsx
<Link
  href="/previous"
  className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted hover:text-fg mb-6 transition-colors"
>
  <ArrowLeft size={14} /> Kembali ke ...
</Link>
```

---

## 3. Ikon — Emoji → Lucide React

**Aturan:** Tidak boleh ada karakter emoji di JSX. Semua diganti ikon dari `lucide-react`.

### 3.1. Dashboard

| Emoji Saat Ini | Lokasi              | Pengganti Lucide                                               |
| -------------- | ------------------- | -------------------------------------------------------------- |
| `👋`         | Heading h1          | `Hand` — `size={22}`                                      |
| `🔥`         | Streak value string | `Flame` — sudah jadi icon terpisah, hapus dari string value |

### 3.2. Dashboard — Badge Collection

| Emoji Saat Ini  | Pengganti Lucide           |
| --------------- | -------------------------- |
| `🏅` (earned) | `Medal` — `size={24}` |
| `🔒` (locked) | `Lock` — `size={24}`  |

### 3.3. Dashboard — Footer Notes

| Emoji Saat Ini | Teks              | Pengganti Lucide               |
| -------------- | ----------------- | ------------------------------ |
| `💾`         | IndexedDB persist | `Database` — `size={12}`  |
| `📊`         | SVG Bar Chart     | `BarChart3` — `size={12}` |
| `🏆`         | Leaderboard       | `Trophy` — `size={12}`    |
| `🔄`         | State Zustand     | `RefreshCw` — `size={12}` |

### 3.4. Kuis — IndexedDB Note

| Emoji Saat Ini | Pengganti Lucide              |
| -------------- | ----------------------------- |
| `💾`         | `Database` — `size={12}` |

### 3.5. Kuis — Feedback Box

| Teks Saat Ini              | Pengganti                                                     |
| -------------------------- | ------------------------------------------------------------- |
| `✓ Jawaban Benar!`      | Hapus string`✓`, sudah ada `CheckCircle` icon di atasnya |
| `✗ Jawaban Belum Tepat` | Hapus string`✗`, sudah ada `AlertCircle` icon di atasnya |

### 3.6. Materi Footer — Navigation

| Teks Panah                      | Pengganti                                              |
| ------------------------------- | ------------------------------------------------------ |
| `← Kembali ke Daftar Materi` | Gunakan`<ArrowLeft size={14} />` sebagai icon + teks |

---

## 4. Perubahan Per Halaman

### 4.1. Beranda (`src/app/page.tsx`)

**Perubahan minimal — halaman ini adalah acuan.**

| Item                                                             | Tindakan                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------ |
| `<style>` tag inline untuk flow arrows                         | Pindahkan ke`globals.css` atau hapus jika tidak diperlukan |
| Profil card props kosong (`accentClass`, `borderClass`, dll) | Hapus props yang selalu empty string                         |

Status: **Tidak ada perubahan structural — hanya cleanup.**

### 4.2. Dashboard (`src/app/dashboard/page.tsx`)

**Perubahan terbesar.**

| Item                          | Sebelum                                 | Sesudah                                          |
| ----------------------------- | --------------------------------------- | ------------------------------------------------ |
| Font container                | `font-mono`                           | `font-sans`                                    |
| Max width                     | `max-w-6xl`                           | `max-w-5xl`                                    |
| Padding Y                     | `py-6`                                | `py-8`                                         |
| Padding X                     | `px-4 sm:px-6`                        | `px-4`                                         |
| Import SectionLabel, WBox     | Di-import                               | Hapus import                                     |
| Heading h1                    | `font-sans` + `👋`                  | `font-lexend font-bold` + `<Hand>` icon      |
| Subheading                    | `font-mono text-xs`                   | `font-sans text-sm text-muted`                 |
| Export PDF button             | `border-dashed` + `font-mono`       | `border-2 border-border` solid + `font-sans` |
| "P3 feature" label            | `border-dashed`                       | `border-2 border-border` solid                 |
| SectionLabel (5×)            | Ada                                     | **Hapus semua**                            |
| Stat cards — ikon box        | `border-dashed bg-muted/10` wrapper   | Hapus wrapper, ikon langsung                     |
| Stat cards — sub text        | `font-mono text-[10px]`               | `font-sans text-xs text-muted`                 |
| Stat cards — label           | `font-mono text-[11px]`               | `font-sans text-xs text-muted`                 |
| Chart — section              | `border-dashed` border + SectionLabel | Solid border + heading tanpa label               |
| Chart — aksis label          | `font-mono text-[10px]`               | `font-sans text-xs text-muted`                 |
| Chart — footer               | `border-dashed` separator             | `border-t-2 border-border` solid               |
| Leaderboard — border         | `border-dashed`                       | `border-2 border-border` solid                 |
| Leaderboard — header label   | `font-mono`                           | `font-sans font-semibold`                      |
| Leaderboard — simulasi label | `border-dashed`                       | `border-2 border-border`                       |
| Badge locked                  | `border-dashed opacity-50`            | `border-2 border-border opacity-50`            |
| Badge earned label            | `font-mono text-[8px]`                | `font-sans text-[10px]`                        |
| Footer separator              | `border-dashed`                       | `border-t-2 border-border` solid               |
| Footer items                  | `font-mono` + emoji                   | `font-sans` + Lucide icons                     |
| Leaderboard`← kamu`        | String teks                             | Biarkan teks                                     |

**Data & Logika:** Tidak berubah.

### 4.3. Belajar — Daftar Mata Pelajaran (`src/app/belajar/page.tsx`)

| Item                | Sebelum       | Sesudah                |
| ------------------- | ------------- | ---------------------- |
| Import SectionLabel | Di-import     | Hapus import           |
| SectionLabel        | Ada di header | **Hapus**        |
| Padding Y           | `py-8`      | `py-8` (sudah benar) |

**Status: Hanya hapus SectionLabel.**

### 4.4. Belajar — Daftar Materi (`src/app/belajar/[subjek]/page.tsx`)

| Item                | Sebelum       | Sesudah         |
| ------------------- | ------------- | --------------- |
| Import SectionLabel | Di-import     | Hapus import    |
| SectionLabel        | Ada di header | **Hapus** |

**Status: Hanya hapus SectionLabel.**

### 4.5. Materi Reader (`src/app/belajar/[subjek]/[material]/page.tsx`)

| Item                | Sebelum                                   | Sesudah                                 |
| ------------------- | ----------------------------------------- | --------------------------------------- |
| Font container      | `font-mono`                             | `font-sans`                           |
| Max width           | `max-w-4xl`                             | `max-w-5xl`                           |
| Padding Y           | `py-6`                                  | `py-8`                                |
| Padding X           | `px-4 sm:px-6`                          | `px-4`                                |
| SectionLabel        | Ada di header                             | **Hapus**                         |
| Heading h1          | `font-sans`                             | `font-lexend font-bold`               |
| Back link           | `font-mono text-[10px]`                 | `text-xs font-sans font-medium`       |
| TTS bar background  | `bg-orange-50 dark:bg-orange-950/20`    | `bg-muted/10`                         |
| TTS bar border      | `border-orange-300`                     | `border-border`                       |
| TTS play button     | `bg-orange-600 hover:bg-orange-700`     | `bg-fg text-bg hover:opacity-90`      |
| TTS stop button     | `border-orange-300 hover:bg-orange-100` | `border-border hover:bg-muted/10`     |
| TTS speed label     | `text-orange-600 border-orange-200`     | `text-muted border-border`            |
| Footer buttons      | `font-mono` + `text-xs`               | `font-sans font-semibold`             |
| Kuis belum tersedia | `border-red-300 text-red-400`           | `border-border text-muted bg-muted/5` |

**Yang tidak berubah:** Reader surface (`.reader`), bionic, focus mode, struktur paragraf, TTS logic.

### 4.6. Kuis (`src/app/belajar/kuis/[id]/page.tsx`)

| Item                       | Sebelum                         | Sesudah                                                |
| -------------------------- | ------------------------------- | ------------------------------------------------------ |
| Font container             | `font-mono`                   | `font-sans`                                          |
| Import WBox                | Di-import                       | Hapus import                                           |
| SectionLabel (4×)         | Ada                             | **Hapus semua**                                  |
| Adaptive level badge       | Class warna hardcoded + WBox    | `border-2 border-border` solid + warna dari CSS vars |
| Progress bar label         | `font-mono`                   | `font-sans text-xs`                                  |
| Session score label        | `font-mono`                   | `font-sans`                                          |
| Adaptive logic section     | `border-dashed`               | `border-2 border-border` solid                       |
| Adaptive logic WBox        | `WBox label="[Threshold...]"` | Hapus, ganti teks biasa                                |
| Badge progress section     | `border-dashed`               | `border-2 border-border` solid                       |
| Badge progress WBox        | `WBox label="[ Badge: ... ]"` | Hapus, ganti teks + progress bar saja                  |
| IndexedDB note             | `border-dashed` + `💾`      | `border-2 border-border` solid + `<Database>` icon |
| Action buttons             | `font-mono`                   | `font-sans font-semibold`                            |
| Feedback box:`✓` prefix | String literal                  | Hapus prefix dari string                               |
| Feedback box:`✗` prefix | String literal                  | Hapus prefix dari string                               |

**Yang tidak berubah:** Quiz logic, adaptive engine, answer selection, score tracking, progress bar.

---

## 5. Komponen yang Tidak Dipakai Lagi

| Komponen         | File                                          | Tindakan                                     |
| ---------------- | --------------------------------------------- | -------------------------------------------- |
| `SectionLabel` | `src/components/ui/WireframePrimitives.tsx` | Hapus penggunaan, komponen tetap ada di file |
| `WBox`         | `src/components/ui/WireframePrimitives.tsx` | Hapus penggunaan, komponen tetap ada di file |

---

## 6. Yang Tidak Berubah

- CSS variables di `globals.css`
- `AccessibilityApplier` & `AccessibilityPanel`
- `Navbar`, `LineGuide`, `StoreHydrator`
- Semua store (Zustand)
- Semua data dummy
- Logic adaptive quiz, TTS, bionic, focus mode
- Routing & struktur halaman

---

## 7. Urutan Pengerjaan

1. **Dashboard** — perubahan terbesar, kerjakan lebih dulu
2. **Kuis** — hapus SectionLabel, WBox, dashed → solid
3. **Materi Reader** — ganti font-mono → font-sans, cleanup TTS bar
4. **Belajar** & **Subjek** — hapus SectionLabel saja
5. **Beranda** — cleanup minor (props kosong, inline style)
6. **Verifikasi** — pastikan tidak ada emoji tersisa di JSX
