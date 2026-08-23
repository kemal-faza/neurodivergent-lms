# Cheatsheet & Panduan Tanya Jawab (Q&A) Dewan Juri CITECH 2026

> **Dokumen Strategis Persiapan Presentasi & Sidang Juri**  
> **Judul Proyek:** LevelUp: *Platform* Belajar *Web* Inklusif dan Adaptif untuk *Learner* Neurodivergen  
> **Tema:** *Technology for Smart Living and Sustainable Future* — Subtema: *Education*  
> **Tim:** Menunggu Kabar (Universitas Diponegoro)  
> **Tautan Deployment:** [https://neurodivergent-lms.vercel.app/](https://neurodivergent-lms.vercel.app/)  
> **Repositori:** [https://github.com/kemal-faza/neurodivergent-lms](https://github.com/kemal-faza/neurodivergent-lms)

---

## 📌 BAGIAN 1: MATRIKS KUNCI CEPAT (QUICK REFERENCE CHEATSHEET)

Hafalkan metrik kunci berikut sebagai jangkar (*data anchors*) saat menjawab pertanyaan:

| Parameter | Angka / Fakta Kunci | Dasar Rujukan / File Terkait |
| :--- | :--- | :--- |
| **Data Disabilitas Indonesia** | **245,3 Ribu Siswa** (151,7 ribu di jenjang menengah) | Dapodik Kemendikdasmen (TA 2025/2026) |
| **Prevalensi Neurodivergensi** | **1 dari 6 Anak (17%)** usia 3–17 tahun; 1 dari 31 autisme | CDC ADDM Report (2025) |
| **Keandalan Unit Test** | **106 Unit Tests Lolos 100%** (Logika adaptif & state) | src/**/*.test.ts (Vitest) |
| **Ambang Kuis Adaptif** | • **Naik Level:** Skor $\ge 80\%$<br>• **Turun Level:** Skor $\le 40\%$<br>• **Tetap:** $41\% - 79\%$ | `src/lib/adaptive.ts` |
| **Alat Bantu Aktif** | **5 Alat:** TTS, Bionic Reading, Reading Ruler, Focus Mode, Timer Pomodoro | src/components/AccessibilityPanel.tsx |
| **Standar Aksesibilitas** | **WCAG 2.1 Level AA** — Kontras teruji $\ge 13.8:1$ (ambang: teks normal $\ge 4.5:1$, Large UI $\ge 3:1$) | W3C Guidelines & DESIGN.md |
| **Tipografi Khusus** | • **Disleksia:** *OpenDyslexic* (Bottom-weighted)<br>• **ADHD:** *Lexend* (Expanded letter-spacing) | src/lib/constants.ts |
| **Arsitektur Sistem** | **Zero-Backend (Client-Side Murni)** + Next.js 15 + React 19 + TypeScript | PRD.md & Proposal Bab Platform |
| **Storage & Persistensi** | **IndexedDB** (idb-keyval) + Zustand 5 (*Hydrated State*) | src/stores/ |
| **Biaya Server / Operasional** | **Rp 0 / Zero Server Cost** (Deployment gratis di Vercel) | Proposal Bab Kelebihan Produk |

---

## 🧠 BAGIAN 2: LANDASAN TEORI & NEUROSAINS (THE WHY)

Gunakan istilah-istilah ilmiah ini untuk menunjukkan kedalaman riset tim Anda:

### 1. Disleksia (Hambatan Pemrosesan Fonologis & Visual)
* **OpenDyslexic Font:** Memiliki pusat gravitasi (pemberat) tebal di bagian bawah karakter. Mencegah otak membalikkan orientasi huruf (*letter flipping*) seperti $b \leftrightarrow d$ atau $p \leftrightarrow q$.
* **Reading Ruler & Expanded Spacing:** Membatasi *visual saccade* (rentang lompatan mata) agar pandangan tidak melompat ke baris yang salah.
* **Cognitive Load Theory (John Sweller):** LevelUp memangkas *Extraneous Load* (beban akibat desain buruk/spasi rapat) hingga mendekati nol, sehingga kapasitas memori kerja (*working memory*) siswa fokus pada *Germane Load* (pembentukan skema pemahaman materi).

### 2. ADHD (Defisit Regulasi Dopamin & Rentang Atensi)
* **Dopamine Compensation Loop:** Poin, streak harian, dan badge memberikan penguatan positif instan (*instant reinforcement*) yang merangsang pelepasan dopamin, menjaga fungsi eksekutif otak agar tidak cepat jenuh.
* **Bionic Reading:** Menebalkan separuh pertama setiap kata sebagai titik fiksasi buatan (*artificial fixation points*), mempercepat proses memindai tanpa kehilangan makna konteks.
* **Focus Mode (Dimming Effect):** Meredupkan paragraf di luar fokus baca untuk meminimalkan distraksi visual lingkungan.

### 3. Kuis Adaptif & Flow Theory (Mihaly Csikszentmihalyi)
* Pembelajaran optimal terjadi ketika **Tingkat Tantangan (*Challenge*) seimbang dengan Tingkat Keterampilan (*Skill*)**.
* Soal terlalu sulit $\rightarrow$ Memicu kecemasan (*Anxiety*) & frustrasi.
* Soal terlalu mudah $\rightarrow$ Memicu kebosanan (*Boredom*).
* Kuis adaptif LevelUp menjaga siswa selalu berada di dalam **Flow Channel**.

---

## 🎯 BAGIAN 3: PREDIKSI 10 PERTANYAAN JURI & JAWABAN BULLETPROOF

---

### ❓ Q1: Mengapa harus membuat platform LMS baru? Bukankah Moodle atau Canvas bisa dipasangi ekstensi browser aksesibilitas?
> **💡 Jawaban Tangguh:**
> Perbedaan mendasarnya ada pada **keterpaduan alur belajar (Contextual Learning Flow)**:
> 1. Ekstensi browser tidak mengenal konteks halaman. Teks diubah secara buta, sering merusak tata letak, menimpa tombol kuis, dan malah menambah beban visual.
> 2. Ekstensi tidak bisa menyediakan **kuis adaptif yang terhubung langsung dengan materi**, apalagi pelacakan progres yang terintegrasi.
> 3. LevelUp memang dibangun dengan prinsip **Accessibility-by-Design**: tipografi, pembaca audio TTS, mesin kuis adaptif, dan dashboard observer membaca satu struktur data yang sama tanpa konflik tampilan.

---

### ❓ Q2: Kuis adaptif kalian memakai algoritma apa? Mengapa tidak langsung memakai AI / Machine Learning berbasis Cloud?
> **💡 Jawaban Tangguh:**
> Untuk tahap proof of concept ini, kami sengaja memilih **ambang rule-based ($\ge 80\%$ naik level, $\le 40\%$ turun level)** karena tiga alasan teknis:
> 1. **Deterministik dan bisa diuji 100%:** Logika rule-based bisa diverifikasi langsung dan terbukti lolos 106 unit test kami, tanpa risiko halusinasi AI.
> 2. **Zero latency & zero cost:** Evaluasi berjalan instan di browser siswa, tidak bergantung kuota API berbayar atau internet cepat di sekolah.
> 3. **Roadmap ke depan:** Di Fase 2 kami sudah merancang peningkatan ke pemodelan Item Response Theory (IRT) berbasis on-device ML agar tetap mandiri dan ramah offline.

---

### ❓ Q3: Apakah fitur gamifikasi seperti poin dan badge tidak justru menjadi distraksi baru bagi anak ADHD?
> **💡 Jawaban Tangguh:**
> Kami menerapkan prinsip **non-intrusive gamification**.
> Gamifikasi di LevelUp tidak memakai animasi berlebihan, pop-up bising, atau efek suara yang bisa memicu sensory overload. Yang ada hanya indikator visual sederhana: streak counter dan lencana di akhir sesi belajar.
> Fungsinya sebagai **dopamine feedback berkala**, memberi rasa pencapaian atas tugas yang berhasil diselesaikan.

---

### ❓ Q4: Kalian mengklaim Zero-Backend, bagaimana jika siswa berganti perangkat atau cache browser terhapus?
> **💡 Jawaban Tangguh:**
> Kami memilih arsitektur zero-backend demi **privasi data yang maksimal dan akses instan di sekolah tanpa harus registrasi akun**. Data tersimpan di IndexedDB browser lokal.
> Untuk risiko lintas perangkat, mitigasinya dua lapis:
> 1. Skema ekspor/impor data profil dalam format JSON terenkripsi sudah kami rancang.
> 2. Di Roadmap Fase 3 (PWA Offline-First), kami menambahkan opsi sinkronisasi peer-to-peer lokal di lab komputer sekolah, tanpa server terpusat.

---

### ❓ Q5: Bagaimana kalian memverifikasi bahwa LevelUp memenuhi standar WCAG 2.1 AA?
> **💡 Jawaban Tangguh:**
> Verifikasinya lewat tiga jalur:
> 1. **Rasio kontras dihitung matematis:** Hasil pengukuran palet warna mencapai $\ge 13.8:1$, jauh di atas ambang WCAG 2.1 AA ($\ge 4.5:1$ untuk teks biasa, $\ge 3:1$ untuk elemen UI interaktif), berlaku konsisten di ketiga mode kontras.
> 2. **Semantik & navigasi keyboard:** Kami memakai elemen HTML5 semantik, atribut ARIA yang tepat, dan outline fokus yang jelas.
> 3. **Unit testing terisolasi:** Perubahan variabel CSS di root dokumen diuji otomatis lewat Vitest agar styling tidak bocor antar halaman.

---

### ❓ Q6: Apa fungsi nyata dari Dashboard Observer jika data tersimpan di browser lokal?
> **💡 Jawaban Tangguh:**
> Mode Observer dirancang untuk skenario nyata di kelas inklusi maupun di rumah.
> Setelah sesi belajar selesai, guru atau orang tua cukup membuka dashboard di perangkat yang sama untuk melihat riwayat skor kuis, level adaptif yang dicapai, dan streak atensi secara transparan. Anak tidak merasa diawasi dari belakang, hal yang sering membuat siswa neurodivergen tertekan.

---

### ❓ Q7: Materi dan kuis di aplikasi kalian saat ini masih contoh (dummy). Bagaimana kesiapannya untuk kurikulum nyata?
> **💡 Jawaban Tangguh:**
> Arsitektur konten LevelUp dirancang **modular & data-driven (berbasis JSON Schema)**.
> Struktur materi terpisah sepenuhnya dari komponen antarmuka. Seperti yang kami cantumkan di **Roadmap Fase 1**, kami tinggal mengimpor modul kurikulum terbuka (Open Educational Resources / Kurikulum Merdeka) ke dalam skema data LevelUp, tanpa mengubah satu baris pun kode tampilan.

---

### ❓ Q8: Apakah kalian sudah melakukan pengujian langsung kepada siswa penyandang disleksia atau ADHD?
> **💡 Jawaban Tangguh:**
> Pada tahap perancangan awal dan kompetisi ini, produk kami dibangun di atas **studi literatur neurosains yang tervalidasi, standar aksesibilitas WCAG 2.1 AA, dan pemodelan tiga persona empiris**.
> Seluruh fungsionalitas sistem sudah live dan berfungsi 100%. Sesuai roadmap jangka pendek kami, langkah berikutnya adalah menggelar **usability testing dan eye-tracking study** langsung bersama komunitas disleksia dan sekolah inklusi untuk mengukur efektivitasnya secara kuantitatif di lapangan.

---

### ❓ Q9: Mengapa memilih Next.js App Router dan Zustand jika aplikasinya tanpa backend?
> **💡 Jawaban Tangguh:**
> Next.js App Router memberi kami **arsitektur komponen modern, optimasi build statis, dan integrasi next/font** yang pas untuk memuat font lokal OpenDyslexic.
> Zustand kami pilih karena ringan (<1KB), minim boilerplate, dan middleware persistensinya gampang diintegrasikan dengan IndexedDB melalui custom StoreHydrator untuk mencegah hydration error di Next.js.

---

### ❓ Q10: Bagaimana relevansi proyek ini dengan tema CITECH 2026: Technology for Smart Living and Sustainable Future?
> **💡 Jawaban Tangguh:**
> Relevansinya paling konkret di subtema **Education**:
> 1. **Smart Living:** Anak neurodivergen dibantu hidup mandiri lewat teknologi belajar adaptif yang memahami cara otak mereka bekerja.
> 2. **Sustainable Future:** Arsitektur zero-backend membuat platform ini bebas biaya pemeliharaan server, hemat energi komputasi cloud sehingga lebih ramah lingkungan, dan tetap bisa diakses sekolah di wilayah 3T dalam jangka panjang.

---

## 🎬 BAGIAN 4: PANDUAN LIVE DEMO 60 DETIK

Saat sesi demo di depan juri, ikuti urutan berikut:

1. **Detik 00–15 (Landing Page & 1-Click Profile):**  
   * Buka [https://neurodivergent-lms.vercel.app/](https://neurodivergent-lms.vercel.app/).
   * Klik tombol **Profil Disleksia** $\rightarrow$ Tunjukkan ke juri bagaimana seluruh website seketika berganti ke font *OpenDyslexic* dengan kontras tinggi.
2. **Detik 15–30 (Materi & Multi-Sensori):**  
   * Masuk ke menu **Belajar**, buka salah satu materi.
   * Gerakkan mouse untuk menunjukkan **Reading Ruler** yang memandu baris baca.
   * Klik tombol **Putar Audio (TTS)** $\rightarrow$ Biarkan Web Speech API membacakan paragraf selama 3 detik.
3. **Detik 30–45 (Kuis Adaptif Real-Time):**  
   * Masuk ke **Kuis**. Jawab benar beruntun $\rightarrow$ Tunjukkan notifikasi kenaikan level kesulitan adaptif.
   * Dapatkan poin, streak, dan lencana (*badge*).
4. **Detik 45–60 (Dashboard Observer):**  
   * Buka menu **Dashboard**.
   * Tunjukkan grafik perkembangan belajar, streak hari, dan lencana yang tersimpan rapi di IndexedDB lokal browser.

---

## 🧭 BAGIAN 5: SIKAP MENTAL & TIP KOMUNIKASI

* **Kuasai 3 Detik Pertama:** Saat juri bertanya, jangan buru-buru menjawab. Ambil jeda 1 detik, ucapkan terima kasih ("Terima kasih, Bapak/Ibu Dewan Juri, atas pertanyaannya"), lalu sampaikan poin utama di kalimat pertama.
* **Terima Masukan, Jangan Debat:** Jika juri menyarankan fitur lanjutan (misal: AI generatif untuk materi), jangan didebat. Katakan saja: "Kami sepakat, masukan itu relevan dengan Roadmap Fase 2 kami saat mengintegrasikan on-device machine learning."
* **Bagi Peran Tim Secara Rapi:**  
  * **Anggota 1:** Fokus menjawab visi produk, latar belakang data, neurosains, dan pedagogi.
  * **Anggota 2:** Fokus menjawab arsitektur teknis, unit test, state management, dan kepatuhan WCAG.
