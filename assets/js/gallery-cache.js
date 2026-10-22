/* ==========================================================================
   GALLERY CACHE — sumber galeri manual (mode tanpa server)
   --------------------------------------------------------------------------
   File ini ditulis otomatis oleh:  node tools/sync-ig.mjs
   --------------------------------------------------------------------------
   STRUKTUR satu entri:
   {
     id       : kode unik post,
     caption  : teks caption,
     angkatan : label angkatan (dipakai filter),
     src      : URL foto (kosongkan bila ingin pakai placeholder),
     permalink: tautan ke post di Instagram,
     mediaType: "image" | "video",
     date     : tanggal unggah (ISO)
   }
   --------------------------------------------------------------------------
   CARA MENGISI CEPAT:
   1) Jalankan:  node tools/sync-ig.mjs        (butuh access token)
   2) Atau tempel manual URL foto + tautan post di bawah
   3) Tapi paling mudah: isi instagram.widget.id di assets/js/config.js
   ========================================================================== */

window.IG_CACHE = {
  updatedAt: "2026-10-22T00:00:00.000Z",
  source: "manual",
  username: "63b_archive",
  posts: [
    {
      id: "manual-01",
      caption: "Hari pertama masuk kelas 6B - seragam baru, wajah baru",
      angkatan: "2021/2022",
      src: "",
      warna: "#f59e0b",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-06-20T00:00:00.000Z"
    },
    {
      id: "manual-02",
      caption: "Juara 2 Cerdas Cermat tingkat kabupaten",
      angkatan: "2021/2022",
      src: "",
      warna: "#0d9488",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-04-15T00:00:00.000Z"
    },
    {
      id: "manual-03",
      caption: "Latihan paduan suara tiap Jumat sore",
      angkatan: "2021/2022",
      src: "",
      warna: "#7c3aed",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-05-27T00:00:00.000Z"
    },
    {
      id: "manual-04",
      caption: "Final futsal antar kelas di halaman sekolah",
      angkatan: "2021/2022",
      src: "",
      warna: "#1b6ca8",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-02-18T00:00:00.000Z"
    },
    {
      id: "manual-05",
      caption: "Final robotika tingkat nasional - bangga mewakili SMPN 1 Rongkop",
      angkatan: "2021/2022",
      src: "",
      warna: "#d62976",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-08-12T00:00:00.000Z"
    },
    {
      id: "manual-06",
      caption: "Praktik lapangan kelas teknik bangunan",
      angkatan: "2021/2022",
      src: "",
      warna: "#0891b2",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-10-05T00:00:00.000Z"
    },
    {
      id: "manual-07",
      caption: "Upacara bendera hari Senin - angkatan 6B hadir lengkap",
      angkatan: "2021/2022",
      src: "",
      warna: "#ef4444",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-01-17T00:00:00.000Z"
    },
    {
      id: "manual-08",
      caption: "Perpisahan kelas 6 - kami wisuda!",
      angkatan: "2021/2022",
      src: "",
      warna: "#22c55e",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-06-25T00:00:00.000Z"
    },
    {
      id: "manual-09",
      caption: "Kumpul bareng sebelum sekolah bubar",
      angkatan: "2021/2022",
      src: "",
      warna: "#6366f1",
      permalink: "https://www.instagram.com/63b_archive/",
      mediaType: "image",
      date: "2022-03-08T00:00:00.000Z"
    }
  ]
};
