# Slide: Hasil dan Analisis (LevelUp)

> **Dokumen Panduan Presentasi CITECH 2026**  
> **Judul Proyek:** LevelUp: *Platform* Belajar *Web* Inklusif dan Adaptif untuk *Learner* Neurodivergen  
> **Tema:** *Technology for Smart Living and Sustainable Future* — Subtema: *Education*  
> **Tim:** Menunggu Kabar (Universitas Diponegoro)

---

## Preview Desain Slide

![Slide Hasil dan Analisis (3 Pilar)](./hasil_analisis_slide_v2.jpg)

---

## 1. Format Tampilan Slide (Layout Visual Deck — 3 Pilar Terpadu)

```
+-----------------------------------------------------------------------------------+
|  CITECH 2026 - Universitas Jember | Subtema: Education                            |
|                              HASIL DAN ANALISIS                                   |
|       Implementasi & Kinerja Nyata Platform Pembelajaran Inklusif LevelUp         |
+-------------------------+-------------------------+-------------------------------+
|   🎨 INKLUSIVITAS & UX  |  🧠 KUIS & ADAPTIVITAS  |    ⚡ ARSITEKTUR & PRIVASI    |
|   (Standar WCAG 2.1 AA) |   (100% Test Passed)    |         (Zero-Backend)        |
+-------------------------+-------------------------+-------------------------------+
| • 5 Alat Aksesibilitas  | • Real-time Difficulty  | • Zero Backend (Client-Side)  |
|   Aktif (TTS, Bionic,   |   Scaling (80% / 40%)   | • Local Storage (IndexedDB)   |
|   Ruler, Fokus, Timer)  | • 106 Unit Test Lolos   | • Bebas Biaya Server &        |
| • Profil 1-Klik         |   (Vitest)              |   Live di Vercel              |
|   Disleksia & ADHD      | • Gamifikasi Terpadu    |                               |
| • Kontras Teruji        |   (Poin, Streak, Badge) |                               |
|   >= 13.8:1             |                         |                               |
+-------------------------+-------------------------+-------------------------------+
| Tim: Menunggu Kabar | Universitas Diponegoro                                     |
+-----------------------------------------------------------------------------------+
```

---

## 2. Teks Slide (Siap Salin ke Slide Deck / Figma / Canva)

### **Judul & Subjudul:**
* **Judul:** Hasil dan Analisis
* **Subjudul:** Implementasi & Kinerja Nyata Platform Pembelajaran Inklusif LevelUp

---

### **Pilar 1: Inklusivitas & UX** *(Standar WCAG 2.1 AA)*

* 5 Alat Aksesibilitas Aktif (*TTS, Bionic Reading, Ruler, Focus Mode, Timer Pomodoro*)
* Profil 1-Klik Disleksia & ADHD
* Kontras Teruji $\ge 13.8:1$ sesuai standar WCAG 2.1 AA

### **Pilar 2: Kuis & Adaptivitas** *(100% Test Passed)*

* *Real-time Difficulty Scaling* ($\ge 80\%$ / $\le 40\%$)
* 106 *Unit Test* Lolos (*Vitest*)
* Gamifikasi Terpadu (Poin, *Streak*, *Badge*)

### **Pilar 3: Arsitektur & Privasi** *(Zero-Backend)*

* *Zero Backend* (*Client-Side* Next.js)
* *Local Storage* (IndexedDB)
* Bebas Biaya Server & *Live* di Vercel

---

## 3. Naskah Presentasi (Speaker Notes / Script Presenter)

> **Estimasi Durasi:** 45 – 60 Detik  
> **Prinsip Penyampaian:** *The Rule of Three*; setiap pilar langsung digandengkan dengan bukti kinerjanya.

### **Panduan Berbicara:**

**[1. Kalimat Pembuka — Transisi Singkat]**  
> *Bapak/Ibu Dewan Juri, semua rancangan LevelUp sudah terimplementasi dan tervalidasi. Kami rangkum dalam tiga pencapaian kunci.*

**[2. Pilar 1 — Inklusivitas & UX]**  
> *Pertama, **Inklusivitas Terstandar**. Lima alat aksesibilitas (Text-to-Speech, Bionic Reading, reading ruler, focus mode, hingga timer pomodoro) aktif dan bisa dinyalakan lewat satu klik profil Disleksia atau ADHD. Antarmuka kami tervalidasi memenuhi standar WCAG 2.1 AA dengan rasio kontras terukur $\ge 13.8:1$, jadi nyaman dipakai learner neurodivergen.*

**[3. Pilar 2 — Kuis & Adaptivitas]**  
> *Kedua, **Adaptivitas Teruji**. Mesin kuis adaptif menyesuaikan tingkat kesulitan secara real-time di ambang 80% dan 40%. Keandalan logikanya teruji lewat 106 unit test otomatis yang seluruhnya lolos. Gamifikasi poin, streak, dan badge juga sudah berjalan terpadu untuk menjaga motivasi belajar.*

**[4. Pilar 3 — Arsitektur & Privasi]**  
> *Ketiga, **Arsitektur Efisien dan Aman**. Dengan model zero-backend berbasis Next.js, platform memuat konten secara instan, termasuk di perangkat sekolah berspesifikasi rendah. Seluruh data tersimpan lokal di IndexedDB tanpa pengumpulan data pribadi, dan aplikasinya kini sudah live serta bisa diakses publik di Vercel.*

---

## 4. Parameter Teknis Pendukung (Rujukan Tanya Jawab / Q&A)

* **Suite Pengujian (Vitest):** Mencakup pengujian logika transisi level (`adaptive.test.ts`), persistensi data IndexedDB, perhitungan streak dan badge gamifikasi, serta manipulasi CSS variable tema kontras.
* **Standar Aksesibilitas (WCAG 2.1 AA):** Palet kontras 3-mode (Normal, High Contrast Dark, High Contrast Light); hasil pengukuran mencapai $\ge 13.8:1$, jauh di atas ambang minimum $\ge 4.5:1$ untuk teks biasa dan $\ge 3:1$ untuk komponen UI interaktif.
* **Zero-Backend Benefits:** Tidak ada latensi *network round-trip* saat berganti soal kuis maupun mengubah setting aksesibilitas; responsnya konsisten di bawah 16ms (60 FPS).
* **Live Demo URL:** [https://neurodivergent-lms.vercel.app/](https://neurodivergent-lms.vercel.app/)
