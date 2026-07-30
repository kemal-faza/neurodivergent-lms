import type { Kuis, Materi, Subjek } from "./types";

export const SUBJEK_MAP: Record<string, Subjek> = {
  ipa: {
    id: "ipa",
    nama: "Ilmu Pengetahuan Alam",
    icon: "dna",
    materiIds: ["fotosintesis", "tata-surya", "siklus-air"],
  },
  matematika: {
    id: "matematika",
    nama: "Matematika",
    icon: "sigma",
    materiIds: ["pecahan", "bangun-datar", "persamaan-linear"],
  },
  "bahasa-indonesia": {
    id: "bahasa-indonesia",
    nama: "Bahasa Indonesia",
    icon: "book-open",
    materiIds: ["teks-deskripsi", "ide-pokok", "kalimat-efektif"],
  },
};

export const MATERI_MAP: Record<string, Materi> = {
  fotosintesis: {
    id: "fotosintesis",
    judul: "Fotosintesis",
    deskripsi: "Proses tumbuhan mengubah cahaya matahari menjadi energi.",
    subjekId: "ipa",
    level: 1,
    kuisId: "q1",
    paragraphs: [
      { id: 0, title: "Pengertian & Fungsi Utama", text: "Fotosintesis adalah proses tumbuhan mengubah cahaya matahari, air, dan karbon dioksida menjadi makanan berupa glukosa. Klorofil pada daun menyerap cahaya merah dan biru, sehingga daun tampak hijau karena warna hijau dipantulkan. Proses ini menghasilkan oksigen sebagai produk sampingan yang kita hirup setiap hari. Tanpa fotosintesis, rantai makanan di Bumi tidak akan bisa berjalan." },
      { id: 1, title: "Kloroplas & Klorofil", text: "Proses fotosintesis terjadi di dalam organel sel tumbuhan yang disebut kloroplas. Di dalam kloroplas terdapat pigmen hijau bernama klorofil yang berfungsi menyerap energi cahaya matahari. Klorofil terutama menyerap cahaya merah dan biru, sementara cahaya hijau dipantulkan sehingga daun tampak berwarna hijau. Tanpa klorofil, tumbuhan tidak dapat melakukan fotosintesis." },
      { id: 2, title: "Tahapan Reaksi Terang & Gelap", text: "Fotosintesis terdiri dari dua tahapan utama: reaksi terang dan reaksi gelap. Reaksi terang terjadi di membran tilakoid dan membutuhkan cahaya untuk memecah molekul air menghasilkan oksigen. Reaksi gelap atau Siklus Calvin terjadi di stroma dan menggunakan ATP dari reaksi terang untuk mengubah karbon dioksida menjadi glukosa." },
      { id: 3, title: "Peran Penting Bagi Ekosistem", text: "Fotosintesis adalah fondasi kehidupan di Bumi karena menghasilkan oksigen yang kita hirup dan menjadi sumber energi bagi hampir semua makhluk hidup. Tumbuhan sebagai produsen mengubah energi matahari menjadi makanan, lalu hewan herbivora memakan tumbuhan, dan hewan karnivora memakan herbivora. Rantai makanan ini tidak akan ada tanpa fotosintesis." },
    ],
  },
  "tata-surya": {
    id: "tata-surya",
    judul: "Sistem Tata Surya",
    deskripsi: "Susunan planet dan benda langit yang mengelilingi Matahari.",
    subjekId: "ipa",
    level: 1,
    kuisId: "q2",
    paragraphs: [
      { id: 0, title: "Pengertian Tata Surya", text: "Tata surya adalah kumpulan benda langit yang terdiri dari Matahari sebagai pusat dan semua objek yang terikat oleh gravitasinya. Sistem ini terbentuk sekitar 4,6 miliar tahun yang lalu dari awan gas dan debu raksasa. Delapan planet, satelit alami, asteroid, komet, dan meteoroid adalah anggota dari tata surya kita." },
      { id: 1, title: "Planet-Planet di Tata Surya", text: "Delapan planet dalam tata surya terbagi menjadi planet dalam (Merkurius, Venus, Bumi, Mars) yang berbatu dan planet luar (Jupiter, Saturnus, Uranus, Neptunus) yang berupa raksasa gas. Jupiter adalah planet terbesar dengan diameter 142.984 km, sementara Merkurius adalah planet terkecil. Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan." },
      { id: 2, title: "Sabuk Asteroid & Planet Kerdil", text: "Di antara orbit Mars dan Jupiter terdapat sabuk asteroid utama yang berisi jutaan batuan luar angkasa. Beberapa benda di sabuk ini seperti Ceres diklasifikasikan sebagai planet kerdil. Pluto, yang dulunya dianggap sebagai planet kesembilan, kini juga dikategorikan sebagai planet kerdil karena ukurannya yang kecil dan orbitnya yang tidak bersih dari objek lain." },
      { id: 3, title: "Gerakan Planet & Hukum Kepler", text: "Semua planet bergerak mengelilingi Matahari dalam orbit elips sesuai dengan Hukum Kepler. Periode revolusi planet bervariasi: Merkurius hanya 88 hari sedangkan Neptunus membutuhkan 165 tahun untuk satu kali mengelilingi Matahari. Selain berevolusi, planet juga berotasi pada porosnya masing-masing dengan kecepatan yang berbeda-beda." },
    ],
  },
  "siklus-air": {
    id: "siklus-air",
    judul: "Siklus Air",
    deskripsi: "Proses perputaran air dari bumi ke atmosfer dan kembali lagi.",
    subjekId: "ipa",
    level: 1,
    paragraphs: [
      { id: 0, title: "Pengertian Siklus Air", text: "Siklus air atau siklus hidrologi adalah proses perputaran air secara terus-menerus dari bumi ke atmosfer dan kembali lagi ke bumi. Siklus ini tidak pernah berhenti dan merupakan salah satu proses alami terpenting yang menjaga keseimbangan ekosistem di planet kita. Air yang ada di bumi saat ini adalah air yang sama yang telah ada selama miliaran tahun." },
      { id: 1, title: "Tahap Evaporasi & Transpirasi", text: "Evaporasi adalah proses penguapan air dari permukaan air seperti laut, danau, dan sungai akibat panas matahari. Transpirasi adalah penguapan air dari tubuh makhluk hidup, terutama dari daun tumbuhan melalui stomata. Kedua proses ini mengubah air dalam bentuk cair menjadi uap air yang naik ke atmosfer." },
      { id: 2, title: "Tahap Kondensasi & Presipitasi", text: "Uap air yang naik ke atmosfer mengalami kondensasi yaitu berubah kembali menjadi titik-titik air karena suhu udara yang lebih dingin di ketinggian. Titik-titik air ini berkumpul membentuk awan. Ketika awan sudah terlalu berat, air jatuh kembali ke bumi dalam bentuk hujan, salju, atau es — proses ini disebut presipitasi." },
      { id: 3, title: "Tahap Infiltrasi & Limpasan", text: "Air hujan yang jatuh ke tanah akan mengalami infiltrasi yaitu meresap ke dalam tanah menjadi air tanah. Sebagian air yang tidak terserap akan mengalir di permukaan sebagai limpasan menuju sungai, danau, dan akhirnya kembali ke laut. Air tanah juga dapat muncul kembali ke permukaan melalui mata air dan bergabung kembali dalam siklus." },
    ],
  },
  pecahan: {
    id: "pecahan",
    judul: "Pecahan",
    deskripsi: "Konsep bagian dari keseluruhan dalam bentuk pembilang dan penyebut.",
    subjekId: "matematika",
    level: 2,
    paragraphs: [
      { id: 0, title: "Pengertian Pecahan", text: "Pecahan adalah bilangan yang menyatakan bagian dari keseluruhan. Pecahan terdiri dari dua bagian utama: pembilang (angka di atas) dan penyebut (angka di bawah). Misalnya pada pecahan 3/4, angka 3 adalah pembilang yang menunjukkan berapa bagian yang diambil, dan 4 adalah penyebut yang menunjukkan jumlah bagian keseluruhan." },
      { id: 1, title: "Jenis-Jenis Pecahan", text: "Terdapat beberapa jenis pecahan dalam matematika: pecahan biasa (3/4, 2/5), pecahan campuran (1 1/2, 3 2/3), pecahan desimal (0,75, 2,5), dan persen (75%, 50%). Setiap jenis pecahan memiliki bentuk yang berbeda namun mewakili nilai yang sama dan dapat dikonversi satu sama lain." },
      { id: 2, title: "Operasi Dasar Pecahan", text: "Operasi penjumlahan dan pengurangan pecahan memerlukan penyebut yang sama. Jika berbeda, harus disamakan terlebih dahulu dengan mencari KPK. Untuk perkalian pecahan, kalikan pembilang dengan pembilang dan penyebut dengan penyebut. Untuk pembagian, balik pecahan kedua lalu kalikan. Contoh: 1/2 x 2/3 = 2/6 = 1/3." },
      { id: 3, title: "Aplikasi Pecahan Sehari-Hari", text: "Pecahan sering kita jumpai dalam kehidupan sehari-hari: setengah gelas air, seperempat kilogram gula, diskon 25% di toko, atau tiga perempat jam. Memahami konsep pecahan membantu kita dalam berbagai aktivitas seperti memasak, berbelanja, mengukur bahan bangunan, dan membagi sesuatu secara adil." },
    ],
  },
  "bangun-datar": {
    id: "bangun-datar",
    judul: "Bangun Datar",
    deskripsi: "Bentuk dua dimensi, luas, keliling, dan sifat-sifatnya.",
    subjekId: "matematika",
    level: 1,
    paragraphs: [
      { id: 0, title: "Pengertian Bangun Datar", text: "Bangun datar adalah bentuk geometri dua dimensi yang hanya memiliki panjang dan lebar. Semua titik pada bangun datar terletak pada satu bidang datar. Bangun datar dibatasi oleh garis-garis lurus atau lengkung yang membentuk keliling dan memiliki luas daerah di dalamnya. Contoh bangun datar antara lain persegi, persegi panjang, segitiga, dan lingkaran." },
      { id: 1, title: "Persegi & Persegi Panjang", text: "Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku (90 derajat). Luas persegi = sisi x sisi, keliling = 4 x sisi. Persegi panjang juga memiliki empat sudut siku-siku namun sisi-sisi yang berhadapan sama panjang. Luas persegi panjang = panjang x lebar, keliling = 2 x (panjang + lebar)." },
      { id: 2, title: "Segitiga & Jenisnya", text: "Segitiga adalah bangun datar dengan tiga sisi dan tiga sudut. Berdasarkan sisinya, segitiga dibagi menjadi segitiga sama sisi, sama kaki, dan sembarang. Berdasarkan sudutnya, ada segitiga lancip, siku-siku, dan tumpul. Luas segitiga = 1/2 x alas x tinggi, keliling = jumlah ketiga sisinya." },
      { id: 3, title: "Lingkaran & Komponennya", text: "Lingkaran adalah bangun datar yang semua titiknya berjarak sama dari titik pusat. Komponen lingkaran meliputi jari-jari (r), diameter (d = 2r), busur, tali busur, dan juring. Luas lingkaran = pi x r pangkat 2, keliling = 2 x pi x r atau pi x d. Nilai pi adalah konstanta sekitar 3,14 atau 22/7." },
    ],
  },
  "persamaan-linear": {
    id: "persamaan-linear",
    judul: "Persamaan Linear",
    deskripsi: "Persamaan dengan variabel pangkat satu dan cara penyelesaiannya.",
    subjekId: "matematika",
    level: 2,
    paragraphs: [
      { id: 0, title: "Pengertian Persamaan Linear", text: "Persamaan linear adalah persamaan aljabar yang variabelnya berpangkat satu. Bentuk umum persamaan linear satu variabel adalah ax + b = 0, di mana a dan b adalah konstanta dan a tidak sama dengan 0. Persamaan linear dua variabel memiliki bentuk ax + by + c = 0. Kata 'linear' berasal dari fakta bahwa grafik persamaan ini selalu berbentuk garis lurus." },
      { id: 1, title: "Menyelesaikan Persamaan Satu Variabel", text: "Untuk menyelesaikan persamaan linear satu variabel, kita mencari nilai x yang memenuhi persamaan. Langkah-langkahnya: (1) pindahkan semua suku yang mengandung variabel ke satu sisi, (2) pindahkan konstanta ke sisi lainnya, (3) bagi kedua sisi dengan koefisien variabel. Contoh: 2x + 3 = 7, maka 2x = 4, sehingga x = 2." },
      { id: 2, title: "Sistem Persamaan Linear Dua Variabel", text: "SPLDV adalah dua persamaan linear dengan dua variabel yang memiliki penyelesaian bersama. Ada tiga metode penyelesaian: substitusi (mengganti variabel), eliminasi (menghilangkan variabel), dan campuran (gabungan keduanya). Metode grafik juga bisa digunakan dengan menggambar kedua garis dan mencari titik potongnya." },
      { id: 3, title: "Aplikasi Dalam Kehidupan", text: "Persamaan linear banyak digunakan dalam kehidupan nyata: menghitung biaya total berdasarkan harga satuan dan jumlah barang, menentukan waktu tempuh perjalanan, menghitung keuntungan bisnis, dan memprediksi pertumbuhan populasi. Kemampuan menyusun persamaan linear dari masalah sehari-hari adalah keterampilan penting dalam pemecahan masalah matematika." },
    ],
  },
  "teks-deskripsi": {
    id: "teks-deskripsi",
    judul: "Teks Deskripsi",
    deskripsi: "Jenis teks yang menggambarkan suatu objek secara detail.",
    subjekId: "bahasa-indonesia",
    level: 1,
    paragraphs: [
      { id: 0, title: "Pengertian Teks Deskripsi", text: "Teks deskripsi adalah jenis teks yang bertujuan menggambarkan suatu objek, tempat, atau peristiwa secara detail sehingga pembaca seolah-olah dapat melihat, mendengar, atau merasakan apa yang digambarkan. Teks deskripsi menggunakan panca indera sebagai dasar penggambaran dan kaya akan kata sifat serta majas." },
      { id: 1, title: "Struktur Teks Deskripsi", text: "Struktur teks deskripsi terdiri dari tiga bagian: identifikasi (pengenalan objek yang akan dideskripsikan), deskripsi bagian (penggambaran detail karakteristik objek), dan simpulan atau kesan (penutup yang merangkum kesan penulis). Setiap bagian saling melengkapi untuk membangun gambaran utuh tentang objek yang dideskripsikan." },
      { id: 2, title: "Ciri Kebahasaan Teks Deskripsi", text: "Teks deskripsi memiliki ciri kebahasaan khas: menggunakan kata sifat untuk menggambarkan (indah, besar, harum), kata kerja untuk memberi gambaran aksi, kata benda yang dideskripsikan, kata keterangan tempat dan waktu, serta majas seperti simile dan metafora. Penggunaan kalimat yang melibatkan panca indera juga menjadi ciri utama teks ini." },
      { id: 3, title: "Contoh & Latihan", text: "Contoh teks deskripsi: 'Pantai itu membentang luas dengan pasir putih bersih yang berkilau diterpa sinar matahari pagi. Deburan ombak terdengar berirama, menciptakan melodi alam yang menenangkan. Di kejauhan, pulau-pulau kecil tampak samar diselimuti kabut tipis. Udara segar bercampur aroma asin laut memenuhi setiap tarikan napas.'" },
    ],
  },
  "ide-pokok": {
    id: "ide-pokok",
    judul: "Ide Pokok",
    deskripsi: "Cara menemukan gagasan utama dalam sebuah paragraf atau bacaan.",
    subjekId: "bahasa-indonesia",
    level: 1,
    paragraphs: [
      { id: 0, title: "Pengertian Ide Pokok", text: "Ide pokok atau gagasan utama adalah inti pembahasan dalam sebuah paragraf atau bacaan. Setiap paragraf yang baik hanya memiliki satu ide pokok yang menjadi dasar pengembangan kalimat-kalimat lainnya. Ide pokok bisa terletak di awal paragraf (deduktif), di akhir (induktif), atau di awal dan akhir (campuran)." },
      { id: 1, title: "Ciri-Ciri Ide Pokok", text: "Ide pokok memiliki ciri-ciri: bersifat umum yang mencakup seluruh isi paragraf, didukung oleh kalimat penjelas yang lebih spesifik, dan biasanya dinyatakan dalam satu kalimat utama. Kalimat utama yang mengandung ide pokok seringkali tidak memerlukan kata penghubung antarkalimat karena ia adalah fondasi paragraf." },
      { id: 2, title: "Cara Menemukan Ide Pokok", text: "Langkah-langkah menemukan ide pokok: (1) baca seluruh paragraf dengan teliti, (2) identifikasi kalimat utama yang bersifat umum, (3) periksa apakah kalimat-kalimat lain mendukung kalimat tersebut, (4) rumuskan ide pokok dengan kalimat sendiri. Untuk teks yang lebih panjang, cari ide pokok di setiap paragraf lalu simpulkan ide pokok keseluruhan." },
      { id: 3, title: "Perbedaan Ide Pokok & Kalimat Utama", text: "Meskipun sering dianggap sama, ide pokok dan kalimat utama sebenarnya berbeda. Kalimat utama adalah kalimat yang mengandung ide pokok dan biasanya eksplisit dalam paragraf. Ide pokok adalah gagasan intinya — bisa dinyatakan ulang dengan kata-kata berbeda. Dalam paragraf deskriptif tertentu, ide pokok mungkin tidak dinyatakan dalam satu kalimat utama melainkan tersirat." },
    ],
  },
  "kalimat-efektif": {
    id: "kalimat-efektif",
    judul: "Kalimat Efektif",
    deskripsi: "Kalimat yang tepat sasaran, hemat kata, dan mudah dipahami.",
    subjekId: "bahasa-indonesia",
    level: 2,
    paragraphs: [
      { id: 0, title: "Pengertian Kalimat Efektif", text: "Kalimat efektif adalah kalimat yang mampu menyampaikan pesan kepada pembaca atau pendengar secara tepat, jelas, dan lengkap sesuai dengan kaidah bahasa. Kalimat efektif mengutamakan kehematan kata tanpa mengorbankan kejelasan makna. Dalam komunikasi sehari-hari dan penulisan formal, penggunaan kalimat efektif sangat penting untuk menghindari kesalahpahaman." },
      { id: 1, title: "Syarat Kalimat Efektif", text: "Syarat kalimat efektif meliputi: (1) kesepadanan — memiliki subjek dan predikat yang jelas, (2) keparalelan — konsistensi bentuk kata dalam perincian, (3) kehematan — tidak boros kata atau pleonasme, (4) kecermatan — tepat memilih kata dan ejaan, (5) kelogisan — masuk akal dan dapat diterima nalar." },
      { id: 2, title: "Kesalahan Umum & Cara Memperbaiki", text: "Kesalahan umum dalam kalimat tidak efektif antara lain: penggunaan kata yang mubazir, kalimat ambigu bermakna ganda, struktur tidak sejajar, dan kontaminasi atau kerancuan struktur. Perbaiki dengan menghilangkan kata-kata yang tidak perlu, memperjelas subjek, dan menjaga konsistensi bentuk kata dalam perincian." },
      { id: 3, title: "Contoh Kalimat Efektif & Tidak Efektif", text: "Tidak efektif: 'Bagi semua peserta ujian harap mengumpulkan tugas tepat pada waktunya.' Efektif: 'Semua peserta ujian harap mengumpulkan tugas tepat waktu.' Tidak efektif: 'Adapun gedung itu terletak di Jalan Merdeka.' Efektif: 'Gedung itu terletak di Jalan Merdeka.' Perhatikan penggunaan kata 'bagi' dan 'adapun' yang sering membuat kalimat menjadi tidak efektif karena menghilangkan subjek." },
    ],
  },
};

export const KUIS: Kuis[] = [
  {
    id: "q1",
    materiId: "fotosintesis",
    soal: [
      { id: "q1s1", t: "Apa warna yang dipantulkan daun?", opsi: ["Merah", "Hijau", "Biru"], benar: 1, diff: 1 },
      { id: "q1s2", t: "Apa produk sampingan fotosintesis yang kita hirup?", opsi: ["Karbon dioksida", "Oksigen", "Glukosa"], benar: 1, diff: 1 },
      { id: "q1s3", t: "Zat apa yang menyerap cahaya pada daun?", opsi: ["Klorofil", "Klorin", "Kromium"], benar: 0, diff: 2 },
      { id: "q1s4", t: "Di bagian tumbuhan mana fotosintesis terutama terjadi?", opsi: ["Akar", "Daun", "Batang"], benar: 1, diff: 2 },
      { id: "q1s5", t: "Apa sumber energi utama untuk fotosintesis?", opsi: ["Air", "Tanah", "Cahaya matahari"], benar: 2, diff: 1 },
    ],
  },
  {
    id: "q2",
    materiId: "tata-surya",
    soal: [
      { id: "q2s1", t: "Planet terdekat ke Matahari adalah?", opsi: ["Venus", "Bumi", "Merkurius"], benar: 2, diff: 1 },
      { id: "q2s2", t: "Di antara planet manakah sabuk asteroid berada?", opsi: ["Bumi-Mars", "Mars-Jupiter", "Jupiter-Saturnus"], benar: 1, diff: 2 },
      { id: "q2s3", t: "Planet terbesar di tata surya adalah?", opsi: ["Saturnus", "Neptunus", "Jupiter"], benar: 2, diff: 1 },
      { id: "q2s4", t: "Planet yang dikenal dengan cincinnya yang indah adalah?", opsi: ["Jupiter", "Saturnus", "Uranus"], benar: 1, diff: 1 },
      { id: "q2s5", t: "Berapa lama Bumi membutuhkan waktu untuk satu kali revolusi?", opsi: ["24 jam", "365 hari", "30 hari"], benar: 1, diff: 1 },
    ],
  },
];

export function getSubjekById(id: string): Subjek | undefined {
  return SUBJEK_MAP[id];
}

export function getAllSubjek(): Subjek[] {
  return Object.values(SUBJEK_MAP);
}

export function getMateriById(id: string): Materi | undefined {
  return MATERI_MAP[id];
}

export function getMateriBySubjek(subjekId: string): Materi[] {
  const subjek = SUBJEK_MAP[subjekId];
  if (!subjek) return [];
  return subjek.materiIds.map((id) => MATERI_MAP[id]).filter(Boolean);
}

export function getKuis(id: string): Kuis | undefined {
  return KUIS.find((k) => k.id === id);
}

export function getMateriWithQuizBySubjek(subjekId: string): Materi[] {
  return getMateriBySubjek(subjekId).filter((m) => m.kuisId != null);
}
