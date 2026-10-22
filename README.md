# Website Alumni — SMP Negeri 1 Rongkop

Website alumni statis (HTML + CSS + JavaScript murni, tanpa framework) berisi:

| Fitur | Halaman |
|---|---|
| Beranda + statistik + sorotan alumni | `index.html` |
| Direktori alumni dengan pencarian & filter | `alumni.html` |
| Profil lengkap tiap siswa (biodata, sosial media, galeri) | `profil.html?id=<id-alumni>` |
| Jejak sekolah lanjutan (SMA / SMK / MAN / perguruan tinggi) | `lanjutan.html` |
| Galeri kelas yang tersambung dengan Instagram | `galeri.html` |
| Tentang sekolah & cara bergabung | `tentang.html` |

---

## 1. Menjalankan

### Cara paling cepat
Buka `index.html` dengan browser. Seluruh situs berjalan tanpa server.

### Dengan server lokal (disarankan)

```bash
node server.js
```

Lalu buka <http://localhost:8080>.

---

## 2. Struktur berkas

```
├── index.html              Beranda
├── alumni.html             Direktori alumni
├── profil.html             Detail profil alumni
├── lanjutan.html           Jejak sekolah lanjutan
├── galeri.html             Galeri kelas (Instagram)
├── tentang.html            Tentang sekolah
├── server.js               Server statis + proxy Instagram
├── package.json
├── assets/
│   ├── css/style.css       Seluruh gaya tampilan
│   ├── img/                Folder foto alumni (silakan diisi)
│   └── js/
│       ├── config.js       KONFIGURASI UTAMA (nama sekolah, akun IG, widget)
│       ├── data.js         DATA ALUMNI (satu-satunya berkas yang perlu diedit)
│       ├── gallery-cache.js Cache galeri dari Instagram (hasil sinkron)
│       ├── app.js          Helper bersama: ikon, header, footer, tema, lightbox
│       ├── home.js         Logika beranda
│       ├── alumni.js       Logika direktori
│       ├── profil.js       Logika halaman profil
│       ├── lanjutan.js     Logika sekolah lanjutan
│       └── galeri.js       Logika galeri + adapter Instagram
└── tools/
    └── sync-ig.mjs         Skrip sinkron galeri Instagram -> gallery-cache.js
```

---

## 3. Menambah / mengubah data alumni

Semua data ada di **`assets/js/data.js`**. Salin satu blok alumni, lalu ubah isinya.

```js
{
  id: "nama-unik-tanpa-spasi",   // wajib unik, dipakai pada URL profil
  name: "Nama Lengkap",
  nickname: "Panggilan",
  angkatan: "2021/2022",
  tahunLulus: 2022,
  kelas: "6B",
  gender: "L",                    // "L" atau "P"
  ttl: { tempat: "Rongkop", tanggal: "12 Mei 2009" },
  status: "mahasiswa",            // mahasiswa | siswa | pekerja | wirausaha
  minat: "Teknologi Informasi",
  kota: "Bandar Lampung",
  sekolahLanjut: "SMA Negeri 1 Pringsewu",
  pendidikan: [
    { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022",
      jurusan: "6B", detail: "Keterangan singkat." },
    { tingkat: "SMA", sekolah: "...", tahun: "2022 - 2025", jurusan: "IPA", detail: "..." },
    { tingkat: "Perguruan Tinggi", sekolah: "...", tahun: "2025 - sekarang", jurusan: "...", detail: "..." }
  ],
  skills: ["JavaScript", "Public Speaking"],
  organisasi: ["OSIS SMPN 1 Rongkop"],
  prestasi: ["Juara 1 Lomba Robotika (2022)"],
  kenangan: "Kenangan favorit saat di SMP.",
  kutipan: "Pesan singkat untuk angkatan.",
  sosial: {
    ig: "https://www.instagram.com/namapengguna",
    tiktok: "https://www.tiktok.com/@namapengguna",
    facebook: "", x: "", linkedin: "", youtube: "",
    github: "", behance: "", website: "",
    whatsapp: "628123456789", email: "alamat@email.com"
  },
  galeri: [ { caption: "Juara 1 Lomba", warna: "#f59e0b" } ]
}
```

**Catatan tingkat pendidikan yang dikenali timeline:** `SMP`, `SMA`, `SMK`, `MAN`, `Perguruan Tinggi`.

**Menaruh foto asli alumni:** simpan berkas di `assets/img/`, lalu tambahkan kolom `foto` pada data alumni
atau isi `src` pada entri galeri. Contoh:

```js
galeri: [ { src: "assets/img/fauzi-1.jpg", caption: "Juara 2 Cerdas Cermat", warna: "#f59e0b" } ]
```

---

## 4. Menyambungkan galeri ke Instagram

Halaman `galeri.html` mencoba tiga sumber secara berurutan. Yang pertama yang tersedia dipakai.

Akun angkatan saat ini: **@63b_archive**
(ubah di `assets/js/config.js` pada `instagram.username`)

### 4.1 Cara A — Widget pihak ketiga (paling gampang, tanpa API key)

1. Daftar di [lightwidget.com](https://www.lightwidget.com/) atau [snapwidget.com](https://www.snapwidget.com/).
2. Buat widget baru dengan sumber: **Profil/Hashtag** → `63b_archive` (atau `#63b_archive`).
3. Salin ID widget yang diberikan.
4. Isi di `assets/js/config.js`:

```js
widget: {
  provider: "lightwidget",   // "lightwidget" atau "snapwidget"
  id: "1234567890"           // ID widget dari langkah 3
}
```

Selesai. Galeri langsung menampilkan feed Instagram dan diperbarui otomatis oleh penyedia widget.

### 4.2 Cara B — API Instagram (paling resmi, data selalu mutakhir)

1. Buka [developers.facebook.com](https://developers.facebook.com/) → buat aplikasi Instagram Basic Display.
2. Buat **Access Token** untuk akun Instagram angkatan.
3. Jalankan backend dengan token (di Windows PowerShell):

```powershell
$env:IG_ACCESS_TOKEN = "token-anda-di-sini"
node server.js
```

Backend menyediakan `GET /api/ig/posts` sehingga **token tidak pernah terkirim ke browser**.
Halaman galeri otomatis memakai data live dari endpoint tersebut.

> Untuk akun bisnis (Instagram Business / Professional yang terhubung ke Fan Page),
> isi juga `IG_USER_ID` agar memakai Graph API `/{ig-user-id}/media`.

### 4.3 Cara C — Sinkron manual, tanpa server sama sekali

```bash
set IG_ACCESS_TOKEN=xxxx        # Windows PowerShell
node tools/sync-ig.mjs
```

Skrip menarik foto terbaru dari Instagram lalu menulis `assets/js/gallery-cache.js`.
Unggah ulang berkas tersebut ke hosting dan galeri akan ikut ter-update.

---

## 5. Menyesuaikan tampilan

Semua ada di `assets/js/config.js`:

```js
school: {
  name: "SMP Negeri 1 Rongkop",
  short: "SMPN 1 Rongkop",
  mark: "1",                    // teks pada logo kotak
  tagline: "Cerdas, Berakhlak, dan Berprestasi",
  address: "...", email: "...", phone: "...", mapUrl: "..."
},
instagram: {
  username: "63b_archive",
  profileUrl: "https://www.instagram.com/63b_archive/",
  hashtags: ["#63b_archive", "#smpn1rongkop"]
},
ui: {
  heroTitle: "Jejak Kita, Kisah yang Tak Pernah Hilang.",
  heroSubtitle: "..."
}
```

Warna utama, font, danradius kartu diatur di bagian `:root` pada `assets/css/style.css`.
Mode gelap otomatis mengikuti pengaturan sistem dan bisa diganti lewat tombol bulan/matahari.

---

## 6. Mengunggah ke hosting

Situs ini statis, jadi bisa diunggah ke:

- **Netlify / Vercel / Cloudflare Pages** — serahkan folder ini, selesai.
- **GitHub Pages** — dorong ke repositori, aktifkan Pages pada branch `main`.
- **Hosting cPanel / shared hosting** — unggah semua berkas ke `public_html`.

Jangan lupa mengunggah folder `assets/` beserta seluruh isinya.

---

## 7. Checklist sebelum publikasi

- [ ] Ganti nama sekolah, alamat, email, dan telepon di `assets/js/config.js`
- [ ] Ganti data contoh di `assets/js/data.js` dengan data alumni sebenarnya
- [ ] Isi `instagram.widget.id` **atau** siapkan `IG_ACCESS_TOKEN` untuk sinkron
- [ ] Letakkan foto alumni di `assets/img/` lalu sambungkan lewat kolom `src`
- [ ] Periksa tautan media sosial setiap alumni
- [ ] Uji di ponsel (situs sudah responsif)

---

## 8. Catatan teknis

- Tanpa dependensi npm untuk sisi situs; `server.js` memakai modul bawaan Node saja.
- Butuh Node.js 18 ke atas untuk `server.js` dan `tools/sync-ig.mjs`.
- Website tetap berfungsi penuh tanpa JavaScript dinonaktifkan? Tidak — data alumni dimuat lewat
  JavaScript. Aktifkan JavaScript agar profil, filter, dan galeri tampil.
- Token Instagram **tidak pernah** ditulis ke berkas HTML/JS yang diunggah ke hosting publik
  (kecuali bila Anda sendiri menempelkannya di `gallery-cache.js` yang tidak pernah memuat token).
