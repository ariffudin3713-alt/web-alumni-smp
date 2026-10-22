# The Family · Alumni Angkatan 2016

Situs kenangan alumni SMA Harapan Bangsa angkatan 2016. Satu halaman statis tanpa build step, siap dideploy ke Vercel.

## Fitur

- **Profil keluarga** — 32 kartu anggota dengan julukan, impian, dan kutipan.
- **Pencarian anggota** — cari berdasarkan nama, julukan, impian, atau kutipan; jumlah hasil ditampilkan langsung.
- **Galeri kenangan** — 8 kenangan awal plus kenangan baru dari pengunjung.
- **Tambah kenangan** — judul, waktu, cerita, dan foto opsional dengan pratinjau.
- **Foto otomatis dikompres** — maksimal 1280 px, JPEG 78%, batas file 8 MB agar hemat penyimpanan.
- **Penyimpanan permanen** — kenangan disimpan di `localStorage` browser dan tetap ada setelah reload.
- **Hapus kenangan** — dengan konfirmasi, tersimpan permanen.
- **Pencarian kenangan** — filter judul, waktu, dan cerita.
- **Lightbox foto** — klik foto untuk melihat versi besar; tutup dengan klik latar, tombol, atau `Esc`.
- **Notifikasi (toast)** untuk setiap aksi simpan/hapus/gagal.
- **Aksesibilitas** — navigasi keyboard, `aria-live` untuk hasil pencarian, `alt` pada gambar, dan dukungan `prefers-reduced-motion`.
- **Responsif** untuk ponsel, tablet, dan desktop.

## Menjalankan secara lokal

Buka `index.html` langsung di browser, atau jalankan server statis:

```bash
npx serve .
```

## Deploy

Proyek ini statis, jadi Vercel tidak memerlukan konfigurasi build.

```bash
vercel --prod
```

## Catatan data

Data kenangan disimpan di perangkat pengunjung (bukan database bersama). Jika penyimpanan browser penuh, kenangan tetap disimpan tanpa foto dan pengguna diberi tahu. Untuk galeri yang dibagikan antar pengunjung, diperlukan backend/database (mis. Vercel KV atau Supabase).
