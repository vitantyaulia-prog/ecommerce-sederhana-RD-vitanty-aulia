Final Project RD Vitanty Aulia
# 📖 Ikhtisar Bisnis — Dapur Aulicious ✨

> Dokumen ini merangkum profil bisnis, strategi, dan rencana pengembangan platform e-commerce **Dapur Aulicious**, sebagaimana diimplementasikan pada situs: [dapur-aulicious](https://vitantyaulia-prog.github.io/ecommerce-sederhana-RD-vitanty-aulia/)

---

## 1. Profil Bisnis

**Nama Bisnis:** Dapur Aulicious ✨

**Deskripsi:**
Dapur Aulicious adalah usaha kuliner rumahan (home-based food business) yang menjual dimsum, tahu bakso, dan aneka minuman segar tanpa bahan pengawet. Bisnis ini beroperasi dengan model B2C melalui platform digital sederhana yang memungkinkan pelanggan menelusuri katalog produk, melakukan pemesanan, dan melakukan pembayaran secara daring, dengan konfirmasi akhir melalui WhatsApp.

**Proposisi Nilai:**
"Masakan rumahan dengan cinta, untuk setiap momen berharga." Dapur Aulicious menawarkan camilan hangat berkualitas premium dengan harga terjangkau, dibuat dari bahan-bahan alami pilihan tanpa pengawet — menempatkan produk sebagai teman santai belajar, bekerja, maupun berkumpul bersama orang tersayang.

---

## 2. Target Pasar & Segmentasi Pelanggan

| Segmen | Kebutuhan Utama |
|---|---|
| Mahasiswa & pelajar | Camilan murah namun lezat |
| Pekerja kantoran | Makanan praktis untuk jam istirahat |
| Keluarga | Hidangan untuk acara kumpul/arisan |
| Anak muda urban | Kuliner kekinian yang *instagramable* |

**Kriteria segmentasi demografis-geografis:** usia 15–35 tahun, berdomisili perkotaan (basis operasional di Bandung, Indonesia), dan aktif di media sosial — sehingga strategi pemasaran dapat difokuskan pada kanal digital visual seperti Instagram.

---

## 3. Analisis Pasar Singkat & Pesaing

Persaingan pada segmen ini didominasi oleh gerai dimsum kekinian, food truck, dan pelaku UMKM kuliner sejenis yang menyasar target pasar yang relatif sama. Untuk memposisikan diri secara kompetitif, Dapur Aulicious mengandalkan empat keunggulan utama:

1. Harga terjangkau dengan kualitas bahan premium
2. Varian rasa unik (Mentai, Keju, Birthday, Matcha) yang membedakan dari kompetitor generik
3. Kemasan menarik dan ramah dibagikan di media sosial
4. Layanan pesan-antar yang cepat dan terpercaya

Diferensiasi ini penting mengingat produk dimsum/tahu bakso tergolong mudah ditiru; keunggulan kompetitif jangka panjang lebih banyak bergantung pada konsistensi rasa, branding visual, dan pengalaman pemesanan — bukan semata pada resep.

---

## 4. Strategi Manajemen Produk & Katalog

**Kategori Produk:**

- 🍽️ **Makanan:** Dimsum Goreng Keju, Dimsum Mentai, Dimsum Original, Dimsum Mentai Birthday, Tahu Bakso Topping, Dessol, Pisang Naget
- 🧋 **Minuman:** Ice Matcha, Ice Coffee, Ice Boba Brown Sugar

**Standar Deskripsi Produk:**
Setiap produk pada katalog dilengkapi deskripsi yang menggugah selera, informasi bahan baku, berat/porsi, estimasi masa simpan (kadaluarsa), serta kode SKU dan status stok — memberikan transparansi yang membangun kepercayaan pelanggan sebelum membeli.

**Strategi Visual:**
Foto produk menggunakan pencahayaan yang baik dan tampilan yang menarik secara komposisi, selaras dengan target pasar anak muda yang mengutamakan estetika visual saat memilih produk kuliner.

**Manajemen Katalog (sisi admin):**
Situs dilengkapi panel admin untuk menambah, mengedit, dan memantau produk (termasuk rating, jumlah ulasan, dan stok), serta memantau statistik penjualan dan pesanan secara real-time — memungkinkan pengambilan keputusan restock berbasis data internal.

---

## 5. Model Bisnis & Aliran Pendapatan

- **Model:** B2C (*Business-to-Consumer*) — penjualan langsung ke konsumen akhir, dengan proses transaksi difinalisasi melalui WhatsApp.
- **Aliran Pendapatan Utama:** Penjualan eceran makanan dan minuman melalui katalog daring.
- **Aliran Pendapatan Tambahan:** Paket katering untuk acara khusus (ulang tahun, meeting kantor, arisan), yang berpotensi memiliki margin lebih tinggi karena volume pesanan yang lebih besar.

---

## 6. Strategi Harga, Promosi, dan Diskon

**Struktur Harga:**
Rentang harga Rp 5.000 – Rp 65.000, dirancang agar terjangkau oleh seluruh segmen target, khususnya mahasiswa dan pelajar.

**Promosi & Diskon:**
- Diskon 10% untuk pembelian di atas Rp 50.000 — mendorong nilai transaksi rata-rata (*average order value*) yang lebih tinggi
- Paket bundle hemat (1 makanan + 1 minuman) — strategi *cross-selling* sederhana antar kategori produk

**Kanal Marketing:**
Instagram, WhatsApp, dan *word-of-mouth* — sesuai karakteristik target pasar yang aktif di media sosial dan mengandalkan rekomendasi dari lingkaran sosial terdekat.

---

## 7. Proses Checkout & Simulasi Payment Gateway

**Alur Pemesanan:**

1. Pelanggan memilih menu dan menambahkannya ke keranjang belanja
2. Mengisi formulir data pemesan (nama, email, nomor WhatsApp, alamat pengiriman, catatan opsional)
3. Memilih metode pembayaran yang tersedia: Transfer Bank, QRIS, E-Wallet, atau COD (Cash on Delivery)
4. Pesanan dikonfirmasi secara final melalui WhatsApp untuk verifikasi dan tindak lanjut pengiriman

**Simulasi Payment Gateway — Midtrans (Dummy Integration):**
Untuk kebutuhan pengembangan dan demonstrasi, sistem checkout disiapkan untuk simulasi integrasi dengan **Midtrans** sebagai payment gateway pilihan, dengan alur konseptual sebagai berikut:

- Setelah pelanggan menekan "Pesan Sekarang", sistem membuat objek transaksi (order ID, total, item) yang akan dikirim ke Snap API Midtrans (disimulasikan pada tahap ini)
- Midtrans Snap menampilkan popup pembayaran dengan pilihan metode (transfer bank, e-wallet, QRIS, kartu)
- Status pembayaran (`pending`, `settlement`, `expire`, `cancel`) disimulasikan untuk menguji alur *notification handler* sebelum implementasi produksi
- Setelah status `settlement` diterima, sistem memperbarui status pesanan dan mengirim notifikasi konfirmasi

Pemilihan Midtrans didasarkan pada kesesuaiannya dengan pasar Indonesia (dukungan penuh untuk QRIS dan metode pembayaran lokal), dibandingkan Xendit maupun PayPal yang relevansinya lebih besar untuk kebutuhan lintas negara.

---

## 8. Rencana SEO, Keamanan, dan Pemeliharaan

**SEO:**
- Penggunaan meta tags dan meta description yang deskriptif pada setiap halaman
- Deskripsi produk yang kaya kata kunci relevan (nama produk, kategori, lokasi)
- Struktur URL yang bersih dan mudah dibaca mesin pencari

**Keamanan:**
- Validasi input pada seluruh formulir (data pemesan, checkout) untuk mencegah input tidak valid
- Sanitasi input guna mencegah potensi serangan seperti *cross-site scripting* (XSS) atau *injection*
- Pembatasan akses panel admin melalui sistem autentikasi (login username/password)

**Pemeliharaan:**
- Pembaruan konten katalog secara rutin (produk baru, perubahan harga/stok)
- Backup data pesanan dan produk secara berkala
- Pemantauan performa situs untuk menjaga kecepatan akses dan pengalaman pengguna

---

## 9. Rencana Penggunaan Data Analitik untuk Pengambilan Keputusan

**Metrik yang Dipantau:**

| Metrik | Kegunaan |
|---|---|
| Page Views | Mengidentifikasi halaman/produk paling diminati |
| Bounce Rate | Mengukur efektivitas halaman dalam mempertahankan pengunjung |
| Add to Cart | Melihat produk paling populer sebelum keputusan beli final |
| Checkout Start | Mengukur niat beli yang belum terkonversi |
| Conversion Rate | Rasio pembelian terhadap jumlah pengunjung |
| Search Queries | Mengetahui kebutuhan/preferensi pelanggan yang belum terpenuhi katalog |

**Pemanfaatan untuk Pengambilan Keputusan:**
Data ini digunakan sebagai dasar untuk menentukan produk yang perlu ditambah stoknya, mengevaluasi efektivitas promosi yang sedang berjalan, serta mengidentifikasi titik-titik perbaikan pada pengalaman pengguna (*UX*) — misalnya jika *bounce rate* tinggi pada halaman tertentu atau *checkout start* tidak berbanding lurus dengan *conversion rate*, yang mengindikasikan adanya friksi pada proses checkout.

---

## 10. Teknis & Implementasi

**🔗 Live Demo:** [vitantyaulia-prog.github.io/ecommerce-sederhana-RD-vitanty-aulia](https://vitantyaulia-prog.github.io/ecommerce-sederhana-RD-vitanty-aulia/)

**📦 Repositori:** [github.com/vitantyaulia-prog/ecommerce-sederhana-RD-vitanty-aulia](https://github.com/vitantyaulia-prog/ecommerce-sederhana-RD-vitanty-aulia)

**Tech Stack:**

| Komponen | Teknologi | Alasan Pemakaian |
|---|---|---|
| Struktur halaman | HTML5 | Markup semantik dasar, ringan untuk GitHub Pages |
| Styling | CSS murni (vanilla) | Kontrol penuh atas desain kustom (kartu produk, hero banner, badge kategori) tanpa overhead ukuran file dari framework CSS |
| Interaktivitas | JavaScript (vanilla) | Mengelola state keranjang belanja (cart), filter/pencarian produk, modal detail produk, dan panel admin tanpa dependensi eksternal |
| Penyimpanan data sisi klien | `localStorage` | Menyimpan data keranjang & data produk agar tetap ada meski halaman di-refresh, tanpa perlu backend/database |
| Hosting | GitHub Pages | Gratis, otomatis ter-deploy dari branch repo, cocok untuk proyek akademik skala kecil |

> *Catatan:* Proyek ini **tidak menggunakan Bootstrap/Tailwind** — seluruh styling (grid produk, tombol, form checkout, dashboard admin) dibangun dari CSS murni agar tampilan lebih custom dan sesuai branding Dapur Aulicious, sekaligus melatih pemahaman fundamental CSS tanpa bergantung pada utility class framework. *(Sesuaikan baris ini jika kamu memang memakai Bootstrap/Tailwind di kode aslinya — sebutkan alasannya, misal: "mempercepat pengembangan komponen responsif".)*

**Struktur Folder (sesuai repo):**

```
ecommerce-sederhana-RD-vitanty-aulia/
│
├── indeks.html         # Halaman utama (Beranda, Menu, Checkout, Tentang Kami)
├── gaya.css             # Seluruh styling situs
├── script.js             # Seluruh logika interaktif (cart, filter, modal, checkout, admin)
├── gambar/               # Aset foto produk (dimsum, minuman, dll.)
└── README.md             # Dokumentasi proyek (file ini)
```

> *Catatan:* Struktur di atas bersifat flat (semua file inti berada di root repo, tanpa subfolder `css/` atau `js/` terpisah) — cukup rapi dan wajar untuk proyek skala kecil seperti ini, karena hanya ada satu file CSS dan satu file JS utama. Jika ke depannya file `script.js` mulai membengkak, bisa dipertimbangkan untuk dipecah ke beberapa file dalam folder `js/` agar lebih mudah dikelola.

**Riwayat Commit:**

Repositori ini memiliki **76 commit**, jauh melampaui syarat minimal 8–10 commit bermakna. Riwayat commit mencerminkan proses pengembangan bertahap, mulai dari commit awal (*"Komitmen awal"* untuk `README.md`) hingga penambahan berkelanjutan untuk `indeks.html`, `script.js`, `gaya.css`, dan aset pada folder `gambar/`.

> *Tips untuk mahasiswa:* Kualitas riwayat commit tidak hanya dinilai dari jumlah, tapi juga dari **kejelasan pesan commit**. Pastikan pesan-pesan commit (terutama yang penting/signifikan) menggunakan format deskriptif, misalnya:
> - `Add: fitur filter dan pencarian produk`
> - `Fix: perbaikan responsif tampilan mobile`
> - `Update: tambah 3 produk baru ke katalog`
>
> daripada pesan generik seperti "update" atau "perbaikan" saja, agar riwayat commit lebih informatif saat direview.

**Cara Menjalankan Secara Lokal:**

```bash
git clone https://github.com/vitantyaulia-prog/ecommerce-sederhana-RD-vitanty-aulia.git
cd ecommerce-sederhana-RD-vitanty-aulia
# buka index.html langsung di browser, atau gunakan Live Server (VS Code extension)
```

**Deploy ke GitHub Pages:**
1. Buka *Settings* → *Pages* pada repositori
2. Pilih branch (biasanya `main`) dan folder root (`/`)
3. Simpan — GitHub akan otomatis membuatkan URL publik dalam beberapa menit

---

## 11. Rencana Pengembangan ke Depan

- Integrasi payment gateway Midtrans secara penuh (bukan lagi simulasi)
- Sistem loyalitas pelanggan (poin & reward)
- Fitur pelacakan pesanan secara real-time
- Pengembangan menjadi Progressive Web App (PWA) untuk kemudahan akses mobile
- Ekspansi menu dengan varian makanan dan minuman baru setiap bulan

---

## Kontak

- 💬 WhatsApp: [0895-4129-66120](https://wa.me/62895412966120)
- 📧 Email: vitantyauia@gmail.com
- 📸 Instagram: [@tntyaull_](https://instagram.com/tntyaull_)
- 📍 Lokasi: Bandung, Indonesia

---
*Dokumen ini disusun sebagai bagian dari dokumentasi proyek e-commerce UMKM Dapur Aulicious.*
