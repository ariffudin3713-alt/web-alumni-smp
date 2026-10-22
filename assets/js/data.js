/* ==========================================================================
   DATA ALUMNI — satu-satunya file yang perlu diedit untuk menambah /
   mengubah data siswa. Salin satu blok alumni lalu ubah isinya.
   --------------------------------------------------------------------------
   { id         kode unik (wajib, tanpa spasi)
     name       nama lengkap
     nickname   nama panggilan
     angkatan   contoh "2021/2022"
     tahunLulus 2022
     kelas      contoh "6B"
     gender     "L" | "P"
     ttl        { tempat, tanggal }
     status     "mahasiswa" | "siswa" | "pekerja" | "wirausaha"
     minat      bidang minat
     kota       kota domisili sekarang
     sekolahLanjut nama sekolah lanjutan (dipakai untuk filter)
     pendidikan [{ tingkat, sekolah, tahun, jurusan, detail }]
     skills [..]  organisasi [..]  prestasi [..]
     kenangan    kenangan favorit saat SMP
     kutipan     pesan untuk angkatan
     sosial      { ig, tiktok, fb, x, linkedin, youtube, github, website, whatsapp, email }
     galeri      [{ caption, warna }] -> ganti dengan foto asli: { src: "assets/img/..." }
   }
   ========================================================================== */

window.ALUMNI_DATA = [
  {
    id: "ahmad-fauzi-ramadhan",
    name: "Ahmad Fauzi Ramadhan",
    nickname: "Fauzi",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "L",
    ttl: { tempat: "Rongkop", tanggal: "12 Mei 2009" },
    status: "mahasiswa",
    minat: "Teknologi Informasi",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMA Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Juara 2 Lomba Cerdas Cermat tingkat kabupaten." },
      { tingkat: "SMA", sekolah: "SMA Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Peminat Sains Komputer, aktif di tim basket sekolah." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Indonesia", tahun: "2025 - sekarang", jurusan: "Ilmu Komputer", detail: "Aktif dalam organisasi himpunan mahasiswa." }
    ],
    skills: ["JavaScript", "Python", "Desain UI/UX", "Public Speaking"],
    organisasi: ["OSIS SMPN 1 Rongkop", "Karang Taruna Melati", "Klub Basket"],
    prestasi: ["Juara 2 Cerdas Cermat Tingkat Kabupaten (2021)", "Juara 1 Lomba Poster Literasi (2020)", "Penghargaan Student of The Year (2022)"],
    kenangan: "Momen paling berkesan justru hari biasa, bukan hari juara. Saat itu kami duduk melingkar di kantin sambil tertawa sampai habis.",
    kutipan: "Sekolah itu tempat kita belajar jatuh. Kita tetap belajar untuk berdiri.",
    sosial: {
      ig: "https://www.instagram.com/fauzi.ramadhan",
      tiktok: "https://www.tiktok.com/@fauzi.ramadhan",
      github: "https://github.com/fauziramadhan",
      linkedin: "https://www.linkedin.com/in/fauziramadhan",
      email: "fauzi.ramadhan@example.com"
    },
    galeri: [
      { caption: "Juara 2 Cerdas Cermat", warna: "#f59e0b" },
      { caption: "Study Banding ke Krakatau", warna: "#0ea5e9" },
      { caption: "Pensi 2022 angkatan 6B", warna: "#ec4899" }
    ]
  },
  {
    id: "siti-nurhaliza-putri",
    name: "Siti Nurhaliza Putri",
    nickname: "Nurhaliza",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6A",
    gender: "P",
    ttl: { tempat: "Pringsewu", tanggal: "3 Agustus 2009" },
    status: "mahasiswa",
    minat: "Pendidikan Matematika",
    kota: "Pringsewu",
    sekolahLanjut: "MAN 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6A", detail: "Kapten tim cerdas cermat, bendahara OSIS." },
      { tingkat: "SMA", sekolah: "MAN 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Matematika Tingkat Provinsi Lampung 2024." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Pendidikan Indonesia", tahun: "2025 - sekarang", jurusan: "Pendidikan Matematika", detail: "Menjadi asisten pengajar di sekolah menengah atas." }
    ],
    skills: ["Matematika", "Public Speaking", "Excel Lanjutan", "Editing Video"],
    organisasi: ["OSIS SMPN 1 Rongkop", "Palang Merah Remaja", "Klub Seni Rupa"],
    prestasi: ["Juara 1 Matematika Tingkat Provinsi Lampung (2024)", "Juara 1 Lomba Adat Lampung (2021)", "Juara 3 Speech Contest Bahasa Inggris (2022)"],
    kenangan: "Setiap pagi aku menyanyikan lagu Indonesia Raya di ruang tamu. Aku nervous sekali, tapi tetap menyanyi sampai habis.",
    kutipan: "Ilmu itu cahaya. Jangan biarkan cahaya itu padam.",
    sosial: {
      ig: "https://www.instagram.com/nurhaliza.putri",
      tiktok: "https://www.tiktok.com/@nurhalizaputri",
      youtube: "https://www.youtube.com/@nurhalizaputri",
      linkedin: "https://www.linkedin.com/in/nurhalizaputri",
      email: "nurhaliza.putri@example.com"
    },
    galeri: [
      { caption: "Juara 1 Matematika Provinsi", warna: "#6366f1" },
      { caption: "Latihan paduan suara", warna: "#10b981" },
      { caption: "Kuliah pertama", warna: "#8b5cf6" }
    ]
  },
  {
    id: "bagas-prasetyo",
    name: "Bagas Prasetyo",
    nickname: "Bagas",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6C",
    gender: "L",
    ttl: { tempat: "Tanjung Karang", tanggal: "19 November 2009" },
    status: "mahasiswa",
    minat: "Teknik Elektro",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMK Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6C", detail: "Juara 1 Lomba Robotika Tingkat Nasional 2022." },
      { tingkat: "SMK", sekolah: "SMK Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "Rekayasa Perangkat Lunak", detail: "Juara 1 Lomba Informatika Tingkat Kota." },
      { tingkat: "Perguruan Tinggi", sekolah: "Politeknik Elektronika Negeri Surabaya", tahun: "2025 - sekarang", jurusan: "Teknik Elektronika", detail: "Magang di perusahaan manufaktur elektronik." }
    ],
    skills: ["C++", "Arduino", "Robotika", "Desain PCB"],
    organisasi: ["Robotics Club SMPN 1 Rongkop", "PMR SMPN 1 Rongkop"],
    prestasi: ["Juara 1 Lomba Robotika Tingkat Nasional (2022)", "Juara 2 Lomba Ketangkasan (2020)"],
    kenangan: "Robotics Club adalah rumah kedua saya. Latihan tiap Jumat sore di lab komputer, semua berantakan tapi menyenangkan.",
    kutipan: "Nilai rapor itu untuk rapor. Kompetensi yang kamu bangun itu untuk hidup.",
    sosial: {
      ig: "https://www.instagram.com/bagas.prasetyo",
      github: "https://github.com/bagasprasetyo",
      tiktok: "https://www.tiktok.com/@bagas.tech",
      linkedin: "https://www.linkedin.com/in/bagasprasetyo",
      email: "bagas.prasetyo@example.com"
    },
    galeri: [
      { caption: "Final robotika nasional", warna: "#0ea5e9" },
      { caption: "Workshop Arduino", warna: "#f97316" },
      { caption: "Kuliah pertama di PENS", warna: "#22c55e" }
    ]
  },
  {
    id: "anisa-rahmawati",
    name: "Anisa Rahmawati",
    nickname: "Nisa",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "P",
    ttl: { tempat: "Wonosodo", tanggal: "7 Februari 2009" },
    status: "siswa",
    minat: "Bahasa dan Sastra",
    kota: "Pringsewu",
    sekolahLanjut: "SMA Negeri 2 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Aktif di Klub English dan Paduan Suara." },
      { tingkat: "SMA", sekolah: "SMA Negeri 2 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Pronunciation Contest tingkat kabupaten." }
    ],
    skills: ["Public Speaking", "Bahasa Inggris", "Desain Poster", "Menulis Cerita"],
    organisasi: ["English Club", "Paduan Suara Bahari"],
    prestasi: ["Juara 1 Pronunciation Contest (2022)", "Juara 2 Poster Literasi (2021)"],
    kenangan: "Latihan paduan suara tiap Jumat sore. Suaraku pecah saat menyanyikan lagu kebangsaan, semua tertawa tapi kami tetap menyanyi.",
    kutipan: "Setiap hari yang sulit adalah hari yang baru.",
    sosial: {
      ig: "https://www.instagram.com/anisa.rahmawati",
      tiktok: "https://www.tiktok.com/@anisa.rahma",
      email: "anisa.rahmawati@example.com"
    },
    galeri: [
      { caption: "Paduan suara di aula sekolah", warna: "#a855f7" },
      { caption: "Juara Pronunciation Contest", warna: "#f43f5e" }
    ]
  },
  {
    id: "rizky-pratama",
    name: "Rizky Pratama",
    nickname: "Rizky",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6A",
    gender: "L",
    ttl: { tempat: "Tanjung Karang", tanggal: "25 Juni 2009" },
    status: "wirausaha",
    minat: "Ekonomi Digital",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMA Islam Al-Falah",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6A", detail: "Memulai usaha kecil jajanan sejak kelas 9." },
      { tingkat: "SMA", sekolah: "SMA Islam Al-Falah", tahun: "2022 - 2025", jurusan: "IPS", detail: "Aktif dalam Creativity and Innovation Competition." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Nurtanio", tahun: "2025 - 2026", jurusan: "Manajemen", detail: "Mengundurkan diri untuk fokus pada usaha." }
    ],
    skills: ["Digital Marketing", "Branding", "Manajemen Keuangan", "Content Creation"],
    organisasi: ["Kewirausahaan Club", "Karang Taruna Melati"],
    prestasi: ["Juara 1 Business Plan Competition (2021)", "Juara 3 English Competition (2022)"],
    kenangan: "Usaha jajananku pertama laku habis di sekolah. Hasil jualan kami pakai untuk mentraktir teman kelas.",
    kutipan: "Mulai kecil, ukur dulu, baru perbesar.",
    sosial: {
      ig: "https://www.instagram.com/rizky.pratama",
      tiktok: "https://www.tiktok.com/@rizkypratama.biz",
      website: "https://rizkypratama.example.com",
      whatsapp: "628123450001",
      email: "rizky.pratama@example.com"
    },
    galeri: [
      { caption: "Usaha jajanan di sekolah", warna: "#f59e0b" },
      { caption: "Business plan competition", warna: "#ef4444" }
    ]
  },
  {
    id: "dinda-kirana",
    name: "Dinda Kirana",
    nickname: "Dinda",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6C",
    gender: "P",
    ttl: { tempat: "Bandar Lampung", tanggal: "14 Oktober 2009" },
    status: "mahasiswa",
    minat: "Akuntansi",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMK Negeri 2 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6C", detail: "Juara 1 Lomba MARKETING Franchise tingkat kecamatan." },
      { tingkat: "SMK", sekolah: "SMK Negeri 2 Pringsewu", tahun: "2022 - 2025", jurusan: "Akuntansi dan Keuangan", detail: "Juara 1 Lomba Akuntansi tingkat kabupaten." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Logika Indonesia", tahun: "2025 - sekarang", jurusan: "Akuntansi", detail: "Magang di bagian keuangan perusahaan." }
    ],
    skills: ["Akuntansi", "Excel", "Audit", "Komunikasi"],
    organisasi: ["Accounting Club", "Pramuka"],
    prestasi: ["Juara 1 Lomba Akuntansi (2024)", "Juara 1 Lomba Marketing Franchise (2021)"],
    kenangan: "Praktik jualan produk di kelas gagal, tetapi kami tidak menyerah. Pelajaran besar: satu kesalahan kecil bisa jadi bangkrut.",
    kutipan: "Angka bicara lebih jujur daripada orang.",
    sosial: {
      ig: "https://www.instagram.com/dinda.kirana",
      linkedin: "https://www.linkedin.com/in/dindakirana",
      email: "dinda.kirana@example.com"
    },
    galeri: [
      { caption: "Juara Akuntansi", warna: "#6366f1" },
      { caption: "Praktik jualan kelas", warna: "#0ea5e9" }
    ]
  },
  {
    id: "ilham-fauzi",
    name: "Ilham Fauzi",
    nickname: "Ilham",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6A",
    gender: "L",
    ttl: { tempat: "Rongkop", tanggal: "2 Februari 2009" },
    status: "pekerja",
    minat: "Teknik Mesin",
    kota: "Pringsewu",
    sekolahLanjut: "SMK Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6A", detail: "Bendahara OSIS,impinan ekstrakurikuler olahraga." },
      { tingkat: "SMK", sekolah: "SMK Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "Teknik Mesin", detail: "Juara 2 Lomba CNC tingkat provinsi." }
    ],
    skills: ["CNC", "SolidWorks", "Komputerisasi", "Team Work"],
    organisasi: ["OSIS SMPN 1 Rongkop", "Ekstrakurikurer Sepak Bola"],
    prestasi: ["Juara 2 Lomba CNC Tingkat Provinsi (2024)", "Juara 1 Futsal Antar Kelas (2020)"],
    kenangan: "Final futsal antar kelas di halaman sekolah. Gol penentu terjadi di detik terakhir dan aku yang mencetak.",
    kutipan: "Kerja keras itu mahal, tapi malas itu lebih mahal lagi.",
    sosial: {
      ig: "https://www.instagram.com/ilham.fauzi",
      tiktok: "https://www.tiktok.com/@ilham.fauzi",
      whatsapp: "628123450002",
      email: "ilham.fauzi@example.com"
    },
    galeri: [
      { caption: "Final futsal antar kelas", warna: "#22c55e" },
      { caption: "Praktik CNC di SMK", warna: "#0ea5e9" }
    ]
  },
  {
    id: "fajar-nugroho",
    name: "Fajar Nugroho",
    nickname: "Fajar",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6A",
    gender: "L",
    ttl: { tempat: "Bandar Lampung", tanggal: "9 Januari 2009" },
    status: "mahasiswa",
    minat: "Ilmu Komputer",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMA Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6A", detail: "Juara 1 Lomba Ketangkasan antar sekolah." },
      { tingkat: "SMA", sekolah: "SMA Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Olimpiade Sains Komputer." },
      { tingkat: "Perguruan Tinggi", sekolah: "Institut Teknologi Bandung", tahun: "2025 - sekarang", jurusan: "Informatika", detail: "Asisten laboratorium pemrograman." }
    ],
    skills: ["Python", "Machine Learning", "C", "Data Analisis"],
    organisasi: ["KOMPUTER Club", "PMR SMPN 1 Rongkop"],
    prestasi: ["Juara 1 Olimpiade Sains Komputer (2024)", "Juara 1 Ketangkasan Antar Sekolah (2021)"],
    kenangan: "Uji komputer pertama kali di lab sekolah. Tombol mouse salah, program error, tapi errornya lucu.",
    kutipan: "Belajar itu tidak selalu soal nilai.",
    sosial: {
      ig: "https://www.instagram.com/fajar.nugroho",
      github: "https://github.com/fajarnugroho",
      linkedin: "https://www.linkedin.com/in/fajarnugroho",
      email: "fajar.nugroho@example.com"
    },
    galeri: [
      { caption: "Juara Olimpiade Sains Komputer", warna: "#6366f1" },
      { caption: "Belajar di lab komputer", warna: "#0ea5e9" }
    ]
  },
  {
    id: "nabila-zahra",
    name: "Nabila Zahra",
    nickname: "Zahra",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "P",
    ttl: { tempat: "Pringsewu", tanggal: "21 November 2009" },
    status: "mahasiswa",
    minat: "Hukum",
    kota: "Pringsewu",
    sekolahLanjut: "MAN 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Sekretaris OSIS dan anggota Debate Club." },
      { tingkat: "SMA", sekolah: "MAN 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 2 Lomba Debate tingkat provinsi." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Gadjah Mada", tahun: "2025 - sekarang", jurusan: "Ilmu Hukum", detail: "Aktif dalam kelompok diskusi hukum." }
    ],
    skills: ["Public Speaking", "Penulisan Hukum", "Research", "Critical Thinking"],
    organisasi: ["OSIS SMPN 1 Rongkop", "Debate Club", "Palang Merah Remaja"],
    prestasi: ["Juara 2 Debate Tingkat Provinsi (2024)", "Juara 1 Cerpen Tingkat Kabupaten (2021)"],
    kenangan: "Latihan debate tiap Kamis sore. Aku belajar bahwa menang bukan yang penting, tapi cara berargumentasi dengan baik.",
    kutipan: "Mendengar itu bagian dari berbicara.",
    sosial: {
      ig: "https://www.instagram.com/nabila.zahra",
      linkedin: "https://www.linkedin.com/in/nabilazahra",
      email: "nabila.zahra@example.com"
    },
    galeri: [
      { caption: "Juara Debate Provinsi", warna: "#8b5cf6" },
      { caption: "Latihan OSIS", warna: "#ec4899" }
    ]
  },
  {
    id: "keysha-aulia",
    name: "Keysha Aulia",
    nickname: "Keysha",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6C",
    gender: "P",
    ttl: { tempat: "Tanjung Karang", tanggal: "5 Maret 2009" },
    status: "mahasiswa",
    minat: "Desain Komunikasi Visual",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMK Negeri 2 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6C", detail: "Juara 1 Lomba Poster Literasi tingkat kecamatan." },
      { tingkat: "SMK", sekolah: "SMK Negeri 2 Pringsewu", tahun: "2022 - 2025", jurusan: "Desain Komunikasi Visual", detail: "Juara 1 Lomba Brand Design tingkat kabupaten." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Bina Nusantara", tahun: "2025 - sekarang", jurusan: "Desain Komunikasi Visual", detail: "Freelance poster untuk umkm lokal." }
    ],
    skills: ["Canva", "Adobe Illustrator", "Branding", "Tipografi"],
    organisasi: ["Seni Rupa", "Palang Merah Remaja"],
    prestasi: ["Juara 1 Poster Literasi (2021)", "Juara 1 Brand Design (2024)"],
    kenangan: "Menggambar di buku tulis waktu jam pelajaran. Guru menyuruh merapikan, aku tetap gambar di buku catatan.",
    kutipan: "Ide besar butuh keberanian untuk mulai dari coretan kecil.",
    sosial: {
      ig: "https://www.instagram.com/keysha.aulia",
      tiktok: "https://www.tiktok.com/@keyshaaulia",
      behance: "https://www.behance.net/keyshaaulia",
      email: "keysha.aulia@example.com"
    },
    galeri: [
      { caption: "Juara Brand Design", warna: "#ec4899" },
      { caption: "Poster untuk umkm lokal", warna: "#f97316" }
    ]
  },
  {
    id: "laras-wulandari",
    name: "Laras Wulandari",
    nickname: "Laras",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "P",
    ttl: { tempat: "Rongkop", tanggal: "30 Juni 2009" },
    status: "mahasiswa",
    minat: "Pendidikan Bahasa",
    kota: "Pringsewu",
    sekolahLanjut: "SMA Negeri 2 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Pengurus perpustakaan sekolah, anggota Paduan Suara." },
      { tingkat: "SMA", sekolah: "SMA Negeri 2 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Menulis Puisi tingkat provinsi." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Santo Thomas", tahun: "2025 - sekarang", jurusan: "Pendidikan Bahasa Inggris", detail: "Mengajar mengaji di TPA." }
    ],
    skills: ["Menulis Puisi", "Bahasa Inggris", "Membaca", "Mendongeng"],
    organisasi: ["Paduan Suara Bahari", "Perpustakaan Sekolah"],
    prestasi: ["Juara 1 Menulis Puisi Tingkat Provinsi (2024)", "Juara 2 Lomba Baca Puisi (2021)"],
    kenangan: "Menyembunyikan buku puisi di rak buku paling belakang perpustakaan. Semua orang mengira rak itu paling sunyi.",
    kutipan: "Kata yang tepat pada waktu yang tepat adalah hadiah.",
    sosial: {
      ig: "https://www.instagram.com/laras.wulandari",
      youtube: "https://www.youtube.com/@laraswulandari",
      email: "laras.wulandari@example.com"
    },
    galeri: [
      { caption: "Juara Menulis Puisi", warna: "#a855f7" },
      { caption: "Di perpustakaan sekolah", warna: "#0ea5e9" }
    ]
  },
  {
    id: "bayu-setiawan",
    name: "Bayu Setiawan",
    nickname: "Bayu",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6C",
    gender: "L",
    ttl: { tempat: "Pringsewu", tanggal: "12 Desember 2009" },
    status: "pekerja",
    minat: "Teknik Bangunan",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMK Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6C", detail: "Juara 1 Lomba Practical Localization tingkat kecamatan." },
      { tingkat: "SMK", sekolah: "SMK Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "Teknik Bangunan", detail: "Juara 1 Lomba DENAH Bangunan tingkat provinsi." }
    ],
    skills: ["AutoCAD", "RAB", "K3", "Survey"],
    organisasi: ["Pramuka", "Klub Sepak Bola"],
    prestasi: ["Juara 1 Lomba DENAH Bangunan (2024)", "Juara 3 Practical Localization (2021)"],
    kenangan: "Praktik lapangan di halaman sekolah, merakit lantai dengan paku yang salah ukuran.",
    kutipan: "Kerja keras di lapangan lebih bicara dari seribu kata.",
    sosial: {
      ig: "https://www.instagram.com/bayu.setiawan",
      tiktok: "https://www.tiktok.com/@bayusetiawan",
      whatsapp: "628123450003",
      email: "bayu.setiawan@example.com"
    },
    galeri: [
      { caption: "Juara DENAH Bangunan", warna: "#f59e0b" },
      { caption: "Praktik lapangan", warna: "#22c55e" }
    ]
  },
  {
    id: "nadia-safitri",
    name: "Nadia Safitri",
    nickname: "Nadia",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "P",
    ttl: { tempat: "Tanjung Karang", tanggal: "8 Oktober 2009" },
    status: "mahasiswa",
    minat: "Keperawatan",
    kota: "Bandar Lampung",
    sekolahLanjut: "MAN 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Anggota PMR, terlatih pertolongan pertama." },
      { tingkat: "SMA", sekolah: "MAN 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Praktik Donor Darah (2022)." },
      { tingkat: "Perguruan Tinggi", sekolah: "Politeknik Kesehatan", tahun: "2025 - sekarang", jurusan: "Keperawatan", detail: "Praktik klinik di rumah sakit." }
    ],
    skills: ["First Aid", "Basic Life Support", "Komunikasi", "Kepemimpinan"],
    organisasi: ["Palang Merah Remaja", "OSIS SMPN 1 Rongkop"],
    prestasi: ["Juara 1 Lomba Praktik Donation (2022)", "Juara 2 Lomba Evidence (2021)"],
    kenangan: "Latihan PMR di ruang kelas yang berubah jadi klinik mini. Aku membuat luka kecil di tangan untuk latihan, dengan arahan guruku.",
    kutipan: "Tangan yang terlatih lebih berharga daripada nilai rapor.",
    sosial: {
      ig: "https://www.instagram.com/nadia.safitri",
      linkedin: "https://www.linkedin.com/in/nadiasafitri",
      email: "nadia.safitri@example.com"
    },
    galeri: [
      { caption: "Latihan PMR", warna: "#ef4444" },
      { caption: "Praktik klinik", warna: "#0ea5e9" }
    ]
  },
  {
    id: "putri-ayu-lestari",
    name: "Putri Ayu Lestari",
    nickname: "Putri",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6A",
    gender: "P",
    ttl: { tempat: "Rongkop", tanggal: "17 April 2009" },
    status: "mahasiswa",
    minat: "Manajemen",
    kota: "Pringsewu",
    sekolahLanjut: "SMA Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6A", detail: "Juara 1 Lomba Business Plan tingkat kabupaten." },
      { tingkat: "SMA", sekolah: "SMA Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Akuntansi tingkat provinsi." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Mahasaraswati", tahun: "2025 - sekarang", jurusan: "Manajemen", detail: "Mendjadi president's assistant di organisasi kampus." }
    ],
    skills: ["Manajemen Proyek", "Akuntansi", "Leadership", "Presentasi"],
    organisasi: ["Kewirausahaan Club", "OSIS SMPN 1 Rongkop"],
    prestasi: ["Juara 1 Business Plan (2021)", "Juara 1 Akuntansi Tingkat Provinsi (2024)"],
    kenangan: "Presentasi bisnis di aula sekolah. Slide-ku error di depan banyak orang, tapi justru itu memorable.",
    kutipan: "Gagal di depan orang banyak lebih berguna daripada sukses di kamar.",
    sosial: {
      ig: "https://www.instagram.com/putri.ayu.lestari",
      linkedin: "https://www.linkedin.com/in/putriayulestari",
      whatsapp: "628123450004",
      email: "putri.ayu.lestari@example.com"
    },
    galeri: [
      { caption: "Presentasi business plan", warna: "#6366f1" },
      { caption: "Juara Akuntansi Provinsi", warna: "#10b981" }
    ]
  },
  {
    id: "muhammad-iqbal",
    name: "Muhammad Iqbal",
    nickname: "Iqbal",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6B",
    gender: "L",
    ttl: { tempat: "Bandar Lampung", tanggal: "23 September 2009" },
    status: "mahasiswa",
    minat: "Teknik Elektro",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMA Negeri 1 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6B", detail: "Juara 1 Lomba Fisika tingkat kecamatan." },
      { tingkat: "SMA", sekolah: "SMA Negeri 1 Pringsewu", tahun: "2022 - 2025", jurusan: "IPA", detail: "Juara 1 Lomba Fisika tingkat provinsi 2024." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Indonesia", tahun: "2025 - sekarang", jurusan: "Teknik Elektro", detail: "Aktif dalam komunitas robotika kampus." }
    ],
    skills: ["Fisika", "Circuit Design", "Soldering", "Matematika"],
    organisasi: ["Robotika Club", "PMR SMPN 1 Rongkop"],
    prestasi: ["Juara 1 Fisika Tingkat Provinsi (2024)", "Juara 1 Fisika Tingkat Kecamatan (2021)"],
    kenangan: "Membangun radio sederhana di kelas. Suara pertama yang keluar hanya desis, tapi kami tetap senang.",
    kutipan: "Kesalahan di laboratorio bagian dari proses belajar.",
    sosial: {
      ig: "https://www.instagram.com/muhammad.iqbal",
      github: "https://github.com/muhammadiqbal",
      email: "muhammad.iqbal@example.com"
    },
    galeri: [
      { caption: "Juara Fisika Provinsi", warna: "#0ea5e9" },
      { caption: "Proyek radio sederhana", warna: "#f97316" }
    ]
  },
  {
    id: "rendi-saputra",
    name: "Rendi Saputra",
    nickname: "Rendi",
    angkatan: "2021/2022",
    tahunLulus: 2022,
    kelas: "6C",
    gender: "L",
    ttl: { tempat: "Pringsewu", tanggal: "2 Oktober 2009" },
    status: "mahasiswa",
    minat: "Ilmu Ekonomi",
    kota: "Bandar Lampung",
    sekolahLanjut: "SMK Negeri 2 Pringsewu",
    pendidikan: [
      { tingkat: "SMP", sekolah: "SMP Negeri 1 Rongkop", tahun: "2019 - 2022", jurusan: "6C", detail: "Anggota tim futsal sekolah, anggota OSIS." },
      { tingkat: "SMK", sekolah: "SMK Negeri 2 Pringsewu", tahun: "2022 - 2025", jurusan: "Akuntansi dan Keuangan", detail: "Juara 2 Lomba Akuntansi tingkat kabupaten." },
      { tingkat: "Perguruan Tinggi", sekolah: "Universitas Trisakti", tahun: "2025 - sekarang", jurusan: "Ilmu Ekonomi", detail: "Membantu usaha keluarga di akhir pekan." }
    ],
    skills: ["Akuntansi", "Analisis Bisnis", "Stok/barang", "Microsoft Excel"],
    organisasi: ["OSIS SMPN 1 Rongkop", "Klub Futsal"],
    prestasi: ["Juara 2 Akuntansi (2024)", "Juara 1 Futsal Antar Kelas (2020)"],
    kenangan: "Final futsal antar kelas. Sunset di lapangan dan suara teriakan dari kelas yang menang.",
    kutipan: "Konsisten itu hasil dari kerja kecil setiap hari.",
    sosial: {
      ig: "https://www.instagram.com/rendi.saputra",
      tiktok: "https://www.tiktok.com/@rendisaputra",
      email: "rendi.saputra@example.com"
    },
    galeri: [
      { caption: "Final futsal antar kelas", warna: "#22c55e" },
      { caption: "Bantu usaha keluarga", warna: "#f59e0b" }
    ]
  },
];
