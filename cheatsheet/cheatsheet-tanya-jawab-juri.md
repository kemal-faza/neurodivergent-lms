# Cheatsheet & Panduan Tanya Jawab (Q&A) Dewan Juri CITECH 2026

> **Dokumen Strategis Persiapan Presentasi & Sidang Juri**  
> **Judul Proyek:** LevelUp: *Platform* Belajar *Web* Inklusif dan Adaptif untuk *Learner* Neurodivergen  
> **Tema:** *Technology for Smart Living and Sustainable Future* — Subtema: *Education*  
> **Tim:** Menunggu Kabar (Universitas Diponegoro)  
> **Tautan Deployment:** [https://neurodivergent-lms.vercel.app/](https://neurodivergent-lms.vercel.app/)  
> **Repositori:** [https://github.com/kemal-faza/neurodivergent-lms](https://github.com/kemal-faza/neurodivergent-lms)

---

## 📌 BAGIAN 1: MATRIKS KUNCI CEPAT (QUICK REFERENCE CHEATSHEET)

Hafalkan data dan metrik kunci ini sebagai jangkar angka (*data anchors*) saat menjawab pertanyaan:

| Parameter | Angka / Fakta Kunci | Dasar Rujukan / File Terkait |
| :--- | :--- | :--- |
| **Data Disabilitas Indonesia** | **245,3 Ribu Siswa** (151,7 ribu di jenjang menengah) | Dapodik Kemendikdasmen (Maret 2026) |
| **Prevalensi Neurodivergensi** | **1 dari 6 Anak (17%)** usia 3–17 tahun; 1 dari 31 autisme | CDC ADDM Report (2025) |
| **Keandalan Unit Test** | **97 Unit Tests Lolos 100%** (Logika adaptif & state) | src/**/*.test.ts (Vitest) |
| **Ambang Kuis Adaptif** | • **Naik Level:** Skor $\ge 80\%$<br>• **Turun Level:** Skor $\le 40\%$<br>• **Tetap:** $41\% - 79\%$ | `src/lib/adaptive.ts` |
| **Standar Aksesibilitas** | **WCAG 2.1 Level AA** (Kontras Normal $\ge 4.5:1$, Large UI $\ge 3:1$) | W3C Guidelines & DESIGN.md |
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
* **Bionic Reading:** Menyorot huruf pertama kata secara tebal sebagai titik fiksasi buatan (*artificial fixation points*), mempercepat proses memindai tanpa kehilangan makna konteks.
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
> *Perbedaan mendasar antara LevelUp dan ekstensi pihak ketiga terletak pada **Keterpaduan Alur Belajar (Contextual Learning Flow)**:* 
> 1. *Ekstensi browser bersifat agnostik konten—mereka mengubah semua teks secara buta, yang sering merusak tata letak, menimpa tombol kuis, dan justru menambah beban visual.* 
> 2. *Ekstensi tidak bisa menyediakan **Kuis Adaptif yang terhubung langsung dengan materi** dan tidak memiliki sistem pelacakan progres terintegrasi.* 
> 3. *LevelUp mengusung pendekatan **Accessibility-by-Design**, di mana tipografi, pembaca audio TTS, mesin kuis adaptif, dan dashboard observer membaca satu struktur data yang sama tanpa konflik tampilan.*

---

### ❓ Q2: Kuis adaptif kalian memakai algoritma apa? Mengapa tidak langsung memakai AI / Machine Learning berbasis Cloud?
> **💡 Jawaban Tangguh:**
> *Untuk tahap pembuktian konsep ini, kami sengaja memilih **Rule-Based Adaptive Threshold ($\ge 80\%$ naik level, $\le 40\%$ turun level)** karena tiga pertimbangan teknis:* 
> 1. ***Determinisme & Keandalan 100%:** Logika rule-based dapat diuji secara matematis dan terbukti lolos 97 unit test kami tanpa risiko halusinasi AI.* 
> 2. ***Zero Latency & Zero Cost:** Evaluasi berjalan instan di browser siswa tanpa bergantung kuota API berbayar atau internet cepat di sekolah.* 
> 3. ***Roadmap Masa Depan:** Pada Roadmap Fase 2, kami telah merancang peningkatan ke pemodelan Item Response Theory (IRT) berbasis On-Device ML agar tetap mandiri dan offline-friendly.*

---

### ❓ Q3: Apakah fitur gamifikasi seperti poin dan badge tidak justru menjadi distraksi baru bagi anak ADHD?
> **💡 Jawaban Tangguh:**
> *Kami menerapkan prinsip **Non-Intrusive Gamification**:* 
> *Gamifikasi di LevelUp tidak menggunakan animasi berlebihan, pop-up bising, atau efek suara mengagetkan yang memicu sensory overload. Kami hanya menyematkan indikator visual bersih berupa streak counter dan lencana di akhir sesi belajar.* 
> *Fungsinya murni sebagai **dopamine feedback berkala** yang memberi rasa kepuasan dan pencapaian atas tugas yang berhasil diselesaikan.*

---

### ❓ Q4: Kalian mengklaim Zero-Backend, bagaimana jika siswa berganti perangkat atau cache browser terhapus?
> **💡 Jawaban Tangguh:**
> *Arsitektur Zero-Backend kami utamakan demi **keamanan privasi maksimal dan kemudahan akses instan di sekolah tanpa kewajiban registrasi akun**. Data disimpan di IndexedDB peramban lokal.* 
> *Namun untuk mitigasi lintas perangkat:* 
> 1. *Kami telah merancang skema ekspor/impor data profil dalam format JSON terenkripsi.* 
> 2. *Pada Roadmap Fase 3 (PWA Offline-First), kami menambahkan opsi sinkronisasi peer-to-peer lokal di lab komputer sekolah tanpa perlu server terpusat.*

---

### ❓ Q5: Bagaimana kalian memverifikasi bahwa LevelUp memenuhi standar WCAG 2.1 AA?
> **💡 Jawaban Tangguh:**
> *Kami mengujinya melalui tiga pilar verifikasi:* 
> 1. ***Pengujian Rasio Kontras Matematis:** Seluruh palet warna teks dan latar belakang menghasilkan rasio $\ge 4.5:1$ pada teks biasa dan $\ge 3:1$ pada elemen UI interaktif di ketiga mode kontras.* 
> 2. ***Semantik & Navigasi Keyboard:** Menggunakan elemen HTML5 semantik murni, atribut ARIA yang tepat, dan outline fokus yang jelas.* 
> 3. ***Unit Testing Terisolasi:** Perubahan variabel CSS di root dokumen diuji secara otomatis melalui Vitest untuk mencegah kebocoran styling antar halaman.*

---

### ❓ Q6: Apa fungsi nyata dari Dashboard Observer jika data tersimpan di browser lokal?
> **💡 Jawaban Tangguh:**
> *Mode Observer dirancang untuk skenario nyata di kelas inklusi atau di rumah:* 
> *Guru atau orang tua dapat membuka dashboard pada perangkat yang sama setelah sesi belajar siswa selesai untuk melihat metrik pemahaman (riwayat skor kuis, level adaptif yang dicapai, dan streak atensi) secara transparan—tanpa perlu mengawasi dari belakang yang sering membuat anak neurodivergen merasa tertekan.*

---

### ❓ Q7: Materi dan kuis di aplikasi kalian saat ini masih contoh (dummy). Bagaimana kesiapannya untuk kurikulum nyata?
> **💡 Jawaban Tangguh:**
> *Arsitektur konten LevelUp dirancang secara **Modular & Data-Driven (berbasis JSON Schema)**.* 
> *Struktur materi terpisah sepenuhnya dari komponen antarmuka. Seperti yang kami cantumkan pada **Roadmap Fase 1**, kami dapat langsung mengimpor modul kurikulum terbuka (Open Educational Resources / Kurikulum Merdeka) ke dalam skema data LevelUp tanpa perlu mengubah satu baris pun kode tampilan.*

---

### ❓ Q8: Apakah kalian sudah melakukan pengujian langsung kepada siswa penyandang disleksia atau ADHD?
> **💡 Jawaban Tangguh:**
> *Pada tahap perancangan awal dan kompetisi ini, produk kami dibangun berdasarkan **studi literatur neurosains yang tervalidasi, standar aksesibilitas WCAG 2.1 AA, dan pemodelan tiga persona empiris**.* 
> *Seluruh fungsionalitas sistem telah live dan berfungsi 100%. Sesuai dengan roadmap jangka pendek kami, tahap selanjutnya adalah menggelar **Usability Testing dan Eye-Tracking Study** langsung bersama komunitas disleksia dan sekolah inklusi untuk mengukur efektivitas kuantitatifnya di lapangan.*

---

### ❓ Q9: Mengapa memilih Next.js App Router dan Zustand jika aplikasinya tanpa backend?
> **💡 Jawaban Tangguh:**
> *Next.js App Router memberi kami keunggulan **arsitektur komponen modern, optimasi build statis, dan integrasi next/font yang sangat efisien** untuk font lokal OpenDyslexic.* 
> *Sedangkan Zustand dipilih karena sangat ringan (<1KB), bebas boilerplate, dan memiliki middleware persistensi yang mulus terintegrasi dengan IndexedDB melalui custom StoreHydrator untuk mencegah hydration error pada Next.js.*

---

### ❓ Q10: Bagaimana relevansi proyek ini dengan tema CITECH 2026: Technology for Smart Living and Sustainable Future?
> **💡 Jawaban Tangguh:**
> *LevelUp menjawab tema tersebut secara konkret pada subtema **Education**:* 
> 1. ***Smart Living:*** *Membantu anak-anak neurodivergen hidup mandiri dan berdaya melalui teknologi belajar adaptif yang memahami cara otak mereka bekerja.* 
> 2. ***Sustainable Future:*** *Arsitektur Zero-Backend memastikan platform ini bebas biaya pemeliharaan server selamanya (zero-cost maintenance), ramah lingkungan karena hemat konsumsi energi komputasi cloud, dan dapat diakses sekolah di wilayah 3T secara berkelanjutan.*

---

## 🎬 BAGIAN 4: PANDUAN LIVE DEMO 60 DETIK (MEMUKAU JURI)

Saat sesi demo produk di depan juri, ikuti urutan aksi taktis berikut:

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

* **Kuasai 3 Detik Pertama:** Saat juri bertanya, jangan langsung terburu-buru menjawab. Ambil jeda 1 detik, ucapkan terima kasih atas pertanyaannya (*Pertanyaan yang sangat krusial, Bapak/Ibu Dewan Juri...*), lalu berikan poin utama di kalimat pertama.
* **Tunjukkan Kerendahan Hati Ilmiah:** Jika juri memberi masukan mengenai fitur lanjutan (misal: AI generatif untuk materi), jangan didebat. Katakan: *Kami sangat sepakat, masukan tersebut sangat relevan untuk Roadmap Fase 2 kami saat mengintegrasikan on-device machine learning.*
* **Bagi Peran Tim Secara Rapi:**  
  * **Anggota 1:** Fokus menjawab visi produk, latar belakang data, neurosains, dan pedagogi.
  * **Anggota 2:** Fokus menjawab arsitektur teknis, unit test, state management, dan kepatuhan WCAG.
