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
| • 6 Alat Aksesibilitas  | • Real-time Difficulty  | • 100% Client-Side (Next.js)  |
|   Aktif (Font, TTS,     |   Scaling (80% / 40%)   | • Local Storage (IndexedDB)   |
|   Ruler, Bionic)        | • 97 Unit Test Lolos    | • Bebas Biaya Server &        |
| • Profil 1-Klik         |   (Vitest)              |   Live di Vercel              |
|   Disleksia & ADHD      | • Gamifikasi Terpadu    |                               |
| • Kontras Teruji        |   (Poin, Streak, Badge) |                               |
|   >= 4.5:1              |                         |                               |
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

* 6 Alat Aksesibilitas Aktif (*Font, TTS, Ruler, Bionic*)
* Profil 1-Klik Disleksia & ADHD
* Kontras Teruji $\ge 4.5:1$

### **Pilar 2: Kuis & Adaptivitas** *(100% Test Passed)*

* *Real-time Difficulty Scaling* ($\ge 80\%$ / $\le 40\%$)
* 97 *Unit Test* Lolos (*Vitest*)
* Gamifikasi Terpadu (Poin, *Streak*, *Badge*)

### **Pilar 3: Arsitektur & Privasi** *(Zero-Backend)*

* 100% *Client-Side* (Next.js 15)
* *Local Storage* (IndexedDB)
* Bebas Biaya Server & *Live* di Vercel

---

## 3. Naskah Presentasi (Speaker Notes / Script Presenter)

> **Estimasi Durasi:** 45 – 60 Detik  
> **Prinsip Penyampaian:** *The Rule of Three* — tiga pilar utama menyatukan hasil implementasi dan bukti kinerjanya secara langsung, tanpa perlu membedakan kolom terpisah.

### **Panduan Berbicara:**

**[1. Kalimat Pembuka — Transisi Singkat]**  
> *Bapak/Ibu Dewan Juri, seluruh rancangan platform LevelUp telah berhasil kami implementasikan dan tervalidasi. Kami merangkumnya ke dalam tiga pencapaian kunci.*

**[2. Pilar 1 — Inklusivitas & UX]**  
> *Pertama, **Inklusivitas Terstandar**: enam alat aksesibilitas—dari font khusus disleksia, Text-to-Speech, hingga Bionic Reading—telah aktif terintegrasi dan dapat diaktifkan hanya dengan satu klik profil. Antarmuka kami tervalidasi memenuhi standar WCAG 2.1 AA dengan rasio kontras di atas 4.5:1, memastikan kenyamanan visual bagi learner neurodivergen.*

**[3. Pilar 2 — Kuis & Adaptivitas]**  
> *Kedua, **Adaptivitas Teruji**: mesin kuis adaptif kami berhasil menyesuaikan tingkat kesulitan secara real-time pada ambang batas 80% dan 40%. Keandalan logikanya telah dibuktikan oleh 97 unit test otomatis yang seluruhnya lolos 100%. Sistem gamifikasi dengan poin, streak, dan badge juga telah berjalan terpadu untuk menjaga motivasi belajar.*

**[4. Pilar 3 — Arsitektur & Privasi]**  
> *Ketiga, **Arsitektur Efisien dan Aman**: berkat model Zero-Backend berbasis Next.js, platform memuat konten secara instan di perangkat sekolah berspesifikasi rendah. Seluruh data tersimpan lokal via IndexedDB tanpa pengumpulan data pribadi, dan saat ini sudah live dapat diakses publik di Vercel.*

---

## 4. Parameter Teknis Pendukung (Rujukan Tanya Jawab / Q&A)

* **Suite Pengujian (Vitest):** Mencakup pengujian logika transisi level (`adaptive.test.ts`), persistensi data IndexedDB, perhitungan streak dan badge gamifikasi, serta manipulasi CSS variable tema kontras.
* **Standar Aksesibilitas (WCAG 2.1 AA):** Menggunakan palet kontras 3-mode (Normal, High Contrast Dark, High Contrast Light) dengan rasio kontras $\ge 4.5:1$ pada teks biasa dan $\ge 3:1$ pada komponen UI interaktif.
* **Zero-Backend Benefits:** Mengeliminasi latensi *network round-trip* untuk pergantian soal kuis dan perubahan setting aksesibilitas, memberikan responsivitas di bawah 16ms (60 FPS).
* **Live Demo URL:** [https://neurodivergent-lms.vercel.app/](https://neurodivergent-lms.vercel.app/)
