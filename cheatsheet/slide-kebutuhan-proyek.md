# Slide: Kebutuhan Proyek (LevelUp)

> **Dokumen Panduan Presentasi CITECH 2026**
> **Judul Proyek:** LevelUp: *Platform* Belajar *Web* Inklusif dan Adaptif untuk *Learner* Neurodivergen
> **Tema:** *Technology for Smart Living and Sustainable Future* — Subtema: *Education*
> **Tim:** Menunggu Kabar (Universitas Diponegoro)

---

## Preview Desain Slide

![Slide Kebutuhan Proyek (Updated)](./requirement_proyek_slide_updated.jpg)

---

## 1. Format Tampilan Slide (Layout Visual Deck)

```
+---------------------------------------------------------------------------------------------------------+
|  CITECH 2026 - Universitas Jember | Subtema: Education                                                 |
|                                         KEBUTUHAN PROYEK                                                |
|                      Kebutuhan Fungsional & Non-Fungsional Platform LevelUp                             |
+----------------------------------------------------+----------------------------------------------------+
|             ⚙️ KEBUTUHAN FUNGSIONAL                 |            🛡️ KEBUTUHAN NON-FUNGSIONAL             |
+----------------------------------------------------+----------------------------------------------------+
| 1. Panel Aksesibilitas Adaptif                     | 1. Standar WCAG 2.1 AA                             |
|    • Tipografi Khusus (OpenDyslexic & Lexend)      |    • Cognitive-Friendly Design                     |
|    • Kontras Dinamis & Text-to-Speech (TTS)        |    • Teruji rasio kontras & bebas beban mental     |
|    • Bionic Reading & Reading Ruler                |                                                    |
|                                                    | 2. Arsitektur Zero-Backend                         |
| 2. Kuis Adaptif Berbasis Performa                  |    • Client-side murni (Next.js & React 19)        |
|    • Dynamic Difficulty Adjustment                 |    • Sangat ringan untuk device sekolah low-spec   |
|    • Personalisasi ambang batas learner            |                                                    |
|                                                    | 3. Privasi & Persistensi Lokal                     |
| 3. Gamifikasi & Observer Mode                      |    • Penyimpanan lokal aman (IndexedDB)            |
|    • Reward System (Poin, Streak, Badge)           |    • Bebas registrasi / Zero Data Collection       |
|    • Dashboard Pemantau Guru & Orang Tua           |                                                    |
|                                                    | 4. Keandalan Sistem & CI/CD                        |
|                                                    |    • Type-Safe (TypeScript) & Tested (Vitest)      |
|                                                    |    • Deployment otomatis via Vercel                |
+----------------------------------------------------+----------------------------------------------------+
| Tim: Menunggu Kabar | Universitas Diponegoro                                                            |
+---------------------------------------------------------------------------------------------------------+
```

---

## 2. Teks Slide (Siap Salin ke Slide Deck / Figma / Canva)

### **Judul & Subjudul:**

* **Judul:** Kebutuhan Proyek
* **Subjudul:** Kebutuhan Fungsional & Non-Fungsional Platform LevelUp

---

### **A. Kebutuhan Fungsional (Functional Requirements):**

1. **Panel Aksesibilitas Adaptif**

   * Tipografi Khusus (*OpenDyslexic & Lexend*)
   * Kontras Dinamis & *Text-to-Speech* (TTS)
   * *Bionic Reading & Reading Ruler*
2. **Kuis Adaptif Berbasis Performa**

   * *Dynamic Difficulty Adjustment* (Otomatis)
   * Personalisasi ambang batas kemampuan *learner*
3. **Gamifikasi & Observer Mode**

   * *Reward System* (Poin, *Streak*, *Badge*, *Leaderboard*)
   * *Dashboard* Pemantau Guru & Orang Tua

---

### **B. Kebutuhan Non-Fungsional (Non-Functional Requirements):**

1. **Standar WCAG 2.1 AA**

   * *Cognitive-Friendly Design*
   * Rasio kontras teruji & mitigasi *sensory overload*
2. **Arsitektur Zero-Backend**

   * *Client-side murni* (Next.js 15 & React 19)
   * Sangat ringan untuk perangkat sekolah berspesifikasi rendah
3. **Privasi & Persistensi Lokal**

   * Penyimpanan lokal via IndexedDB (idb-keyval)
   * Tanpa registrasi / *Zero Data Tracking*
4. **Keandalan & CI/CD**

   * *Type-Safe* (TypeScript *strict*) & *Unit Tested* (Vitest)
   * *Automated Deployment* via Vercel

---

## 3. Naskah Presentasi (Speaker Notes / Script Presenter)

> **Estimasi Durasi:** 1.5 – 2 Menit
> **Prinsip Penyampaian:** Slide hanya menyajikan kata kunci (*visual anchors*), presenter memberikan konteks mendalam mengenai alasan teknis dan dampak penggunaannya.

### **Panduan Berbicara:**

**[1. Pengantar Transisi Slide]**

> *Bapak/Ibu Dewan Juri dan Hadirin sekalian, dalam merancang platform LevelUp, kami membagi kebutuhan sistem menjadi dua pilar utama: Kebutuhan Fungsional yang berfokus langsung pada pengalaman belajar siswa, dan Kebutuhan Non-Fungsional yang menjamin keandalan, aksesibilitas, serta keberlanjutan sistem.*

**[2. Penjelasan Kebutuhan Fungsional]**

> *Pada **Kebutuhan Fungsional**, terdapat tiga fitur inti:*
>
> 1. *Pertama, **Panel Aksesibilitas Adaptif**. Siswa dapat langsung mengaktifkan font khusus seperti OpenDyslexic untuk pembaca disleksia atau Lexend untuk ADHD, mengatur kontras warna, mendengarkan materi via Text-to-Speech, serta menggunakan fitur fokus seperti Bionic Reading dan Reading Ruler.*
> 2. *Kedua, **Kuis Adaptif**. Soal yang disajikan tidak bersifat statis, melainkan memiliki penyesuaian tingkat kesulitan dinamis (Dynamic Difficulty Adjustment) yang otomatis naik atau turun berdasarkan performa real-time siswa.*
> 3. *Ketiga, **Gamifikasi dan Observer Mode**. Kami menyematkan sistem reward berupa poin, streak, dan badge untuk menjaga dopamin serta atensi belajar, dilengkapi dashboard observer bagi guru dan orang tua untuk memantau progres belajar anak secara transparan.*

**[3. Penjelasan Kebutuhan Non-Fungsional]**

> *Beralih ke **Kebutuhan Non-Fungsional**, kami menetapkan empat standar utama:*
>
> 1. *Pertama, kepatuhan penuh pada **Standar WCAG 2.1 Level AA**. Desain kami bebas dari elemen distraksi dan telah lolos uji rasio kontras visual agar ramah beban kognitif.*
> 2. *Kedua, **Arsitektur Zero-Backend**. Aplikasi beroperasi penuh di sisi client menggunakan Next.js dan React 19, menjadikannya sangat ringan dan responsif meskipun dibuka pada komputer sekolah dengan spesifikasi rendah.*
> 3. *Ketiga, **Privasi dan Persistensi Lokal**. Kami menerapkan prinsip Privacy-First di mana seluruh data dan progres tersimpan lokal di IndexedDB peramban, tanpa memerlukan login rumit atau pengambilan data pribadi pengguna.*
> 4. *Keempat, **Keandalan dan CI/CD**. Kode dibangun secara type-safe dengan TypeScript strict, diproteksi oleh unit testing otomatis menggunakan Vitest, dan terintegrasi dalam pipeline deployment otomatis di Vercel.*

---

## 4. Parameter Teknis Pendukung (Rujukan Tanya Jawab / Q&A)

* **Engine Kuis Adaptif:** Berbasis *rule-based threshold* di mana skor $\ge 80\%$ menaikkan level kesulitan materi/kuis, dan skor $\le 40\%$ menurunkan tingkat kesulitan secara proporsional.
* **Standar Aksesibilitas:** Hasil ukur palet warna mencapai $\ge 13.8:1$, jauh di atas kriteria minimum WCAG 2.1 AA: 4.5:1 (teks normal) dan 3:1 (teks besar/elemen UI) sesuai pedoman W3C.
* **Storage Layer:** IndexedDB (idb-keyval) dienkapsulasi dalam state management Zustand dengan rehidrasi asinkron.
* **Testing Coverage:** Logika adaptif (`adaptive.ts`), kalkulasi gamifikasi, dan manipulasi kontras diuji 100% menggunakan Vitest di lingkungan Node.js.
