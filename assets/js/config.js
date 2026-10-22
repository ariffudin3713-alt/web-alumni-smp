/* ==========================================================================
   KONFIGURASI SITUS
   Ubah semua yang perlu di sini. File ini dimuat pertama oleh semua halaman.
   ========================================================================== */

window.SITE_CONFIG = {
  /* ---------- Identitas sekolah ---------- */
  school: {
    name: "SMP Negeri 1 Rongkop",
    short: "SMPN 1 Rongkop",
    mark: "1",
    npsn: "10805432",
    tagline: "Cerdas, Berakhlak, dan Berprestasi",
    description:
      "Website alumni resmi SMP Negeri 1 Rongkop. Temukan teman sekelas, telusuri perjalanan sekolah lanjutan mereka, dan nikmati galeri kelas yang tersambung langsung dengan Instagram angkatan.",
    address: "Jl. Ki Hajar Dewantara No. 1, Rongkop, Kabupaten Pringsewu, Lampung 35372",
    email: "alumni@smpn1rongkop.sch.id",
    phone: "+62 812-3456-7890",
    mapUrl: "https://maps.google.com/?q=SMP+Negeri+1+Rongkop"
  },

  /* ---------- Instagram angkatan ---------- */
  instagram: {
    username: "63b_archive",
    profileUrl: "https://www.instagram.com/63b_archive/",
    hashtags: ["#63b_archive", "#smpn1rongkop", "#alumnirongkop", "#kelas6b", "#weslulus"],
    /* Cara menyambungkan galeri live (panduan lengkap ada di README.md):
       1) Isi widget.id  -> pakai widget LightWidget / SnapWidget (tanpa API key)
       2) Isi api.enabled + jalankan server.js dengan IG_ACCESS_TOKEN (live penuh)
       3) Kosongkan keduanya -> galeri memakai kurasi manual dari gallery-cache.js */
    widget: {
      provider: "", // "lightwidget" | "snapwidget" | ""
      id: "" // contoh lightwidget: 1234567890 ; snapwidget: 987654321
    },
    api: {
      enabled: true,
      proxyPath: "/api/ig/posts"
    }
  },

  /* ---------- Tampilan umum ---------- */
  ui: {
    theme: "auto",
    heroTitle: "Jejak Kita, Kisah yang Tak Pernah Hilang.",
    heroSubtitle:
      "Temukan kembali teman sekelas, telusuri perjalanan sekolah lanjutan mereka, dan jelajahi galeri kelas yang hidup di Instagram angkatan kami.",
    statLabels: {
      alumni: "Alumni Terdaftar",
      angkatan: "Angkatan Aktif",
      lanjutan: "Sekolah Lanjutan",
      ig: "Pengikut IG"
    }
  }
};
