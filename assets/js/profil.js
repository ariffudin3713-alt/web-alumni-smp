/* ==========================================================================
   profil.js — Halaman Detail Profil Alumni  (profil.html?id=...)
   ========================================================================== */

(function () {
  const host = document.getElementById("profileRoot");
  if (!host) return;

  const all = alumniList();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const a = id ? findAlumni(id) : null;

  /* -----------Alumni tidak ditemukan ---------- */
  if (!a) {
    host.innerHTML =
      '<section class="section"><div class="container">' +
        '<div class="empty-state">' + icon("users") +
          "<h3>Profil tidak ditemukan</h3>" +
          "<p>Maaf, data alumni yang Anda cari tidak tersedia atau tautannya salah.</p>" +
          '<a class="btn btn--primary" href="alumni.html" style="margin-top:10px">' + icon("arrowLeft") + " Kembali ke Direktori</a>" +
        "</div>" +
      "</div></section>";
    return;
  }

  const status = STATUS_META[a.status] || { label: a.status, chip: "", icon: "users" };
  const sosial = socialEntries(a.sosial);
  const sekolahLanjut = a.sekolahLanjut;

  /* ---------- Kartu media sosial ---------- */
  function socialCard(s) {
    const isMail = s.key === "email";
    const isWa = s.key === "whatsapp";
    const target = isMail || isWa ? "" : ' target="_blank" rel="noopener noreferrer"';
    const label = s.key === "email" ? s.value : s.label;
    const title = isMail ? s.value : (s.key === "whatsapp" ? "+" + s.value.replace(/[^0-9]/g, "") : s.label);
    return (
      '<a class="social-pill ' + s.cls + '" href="' + esc(s.url) + '"' + target +
        ' title="' + esc(title) + '" aria-label="' + esc(s.label) + '">' +
        '<span class="social-pill__icon">' + icon(s.icon) + "</span>" +
        "<span>" + esc(label) + "</span>" +
      "</a>"
    );
  }

  /* ---------- Timeline pendidikan ---------- */
  function timelineItem(p, i) {
    let cls = "";
    if (p.tingkat === "SMP") cls = "timeline__item--smp";
    else if (p.tingkat === "Perguruan Tinggi") cls = "timeline__item--pt";
    return (
      '<li class="timeline__item ' + cls + '">' +
        '<span class="timeline__dot"></span>' +
        '<div class="timeline__tingkat">' + esc(p.tingkat) + (p.jurusan ? " · " + esc(p.jurusan) : "") + "</div>" +
        '<h4 class="timeline__title">' + esc(p.sekolah) + "</h4>" +
        '<div class="timeline__meta">' + icon("calendar") + " " + esc(p.tahun) + "</div>" +
        (p.detail ? '<p class="timeline__detail">' + esc(p.detail) + "</p>" : "") +
      "</li>"
    );
  }

  /* ---------- Alumni lain di sekolah lanjutan yang sama ---------- */
  function classmates() {
    return all.filter(function (o) {
      return o.id !== a.id && o.sekolahLanjut && o.sekolahLanjut === sekolahLanjut;
    });
  }
  const others = classmates();

  /* ---------- Alumni sebelumnya / berikutnya ---------- */
  const idx = all.findIndex(function (x) { return x.id === a.id; });
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  /* ---------- Sosmed utama untuk tombol hero ---------- */
  const igEntry = sosial.filter(function (s) { return s.key === "ig"; })[0];

  /* ---------- Render ---------- */
  host.innerHTML =
    /* ===== HERO ===== */
    '<section class="profile-hero">' +
      '<div class="container">' +
        '<div class="profile-hero__inner">' +
          '<div class="avatar-lg" style="background:' + avatarGradient(a.id) + '">' + esc(initials(a.name)) + "</div>" +
          '<div class="profile-hero__info">' +
            "<h1>" + esc(a.name) + "</h1>" +
            '<div class="profile-hero__sub">' +
              '<span class="chip">' + icon("users") + "Kelas " + esc(a.kelas) + "</span>" +
              '<span class="chip">' + icon("graduation") + "Angkatan " + esc(a.angkatan) + "</span>" +
              '<span class="chip">' + icon(status.icon) + esc(status.label) + "</span>" +
              '<span class="chip">' + icon("mapPin") + esc(a.kota || "-") + "</span>" +
            "</div>" +
            '<p class="profile-hero__quote">"' + esc(a.kutipan || "") + '"</p>' +
            '<div class="profile-hero__actions">' +
              (igEntry ? '<a class="btn btn--gold" href="' + esc(igEntry.url) + '" target="_blank" rel="noopener">' + icon("instagram") + " Instagram</a>" : "") +
              '<a class="btn btn--light" href="alumni.html">' + icon("users") + " Direktori</a>" +
              '<button class="btn btn--light" id="shareBtn" type="button">' + icon("copy") + " Salin tautan</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    /* ===== ISI ===== */
    '<section class="section section--tight"><div class="container">' +
      '<div class="profile-layout">' +

        /* ---- Kolom kiri ---- */
        "<aside>" +
          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("users") + " Biodata</h3>" +
            '<dl class="info-list">' +
              '<div class="info-list__row"><dt>Nama</dt><dd>' + esc(a.name) + "</dd></div>" +
              (a.nickname ? '<div class="info-list__row"><dt>Panggilan</dt><dd>' + esc(a.nickname) + "</dd></div>" : "") +
              '<div class="info-list__row"><dt>TTL</dt><dd>' + esc((a.ttl || {}).tempat || "-") + ", " + esc((a.ttl || {}).tanggal || "-") + "</dd></div>" +
              '<div class="info-list__row"><dt>Jenis Kelamin</dt><dd>' + (a.gender === "P" ? "Perempuan" : "Laki-laki") + "</dd></div>" +
              '<div class="info-list__row"><dt>Angkatan</dt><dd>' + esc(a.angkatan) + "</dd></div>" +
              '<div class="info-list__row"><dt>Kelas</dt><dd>' + esc(a.kelas) + "</dd></div>" +
              '<div class="info-list__row"><dt>Minat</dt><dd>' + esc(a.minat || "-") + "</dd></div>" +
              '<div class="info-list__row"><dt>Domisili</dt><dd>' + esc(a.kota || "-") + "</dd></div>" +
              '<div class="info-list__row"><dt>Status</dt><dd>' + esc(status.label) + "</dd></div>" +
            "</dl>" +
          "</div>" +

          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("sparkles") + " Keahlian</h3>" +
            '<div class="tag-list">' +
              ((a.skills || []).map(function (s) { return '<span class="tag">' + esc(s) + "</span>"; }).join("") || '<span class="muted small">Belum diisi</span>') +
            "</div>" +
          "</div>" +

          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("award") + " Prestasi</h3>" +
            '<ul class="list-check">' +
              ((a.prestasi || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") || '<li class="muted">Belum diisi</li>') +
            "</ul>" +
          "</div>" +

          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("target") + " Organisasi</h3>" +
            '<ul class="list-check">' +
              ((a.organisasi || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") || '<li class="muted">Belum diisi</li>') +
            "</ul>" +
          "</div>" +
        "</aside>" +

        /* ---- Kolom kanan ---- */
        "<main>" +
          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("graduation") + " Riwayat Pendidikan &amp; Sekolah Lanjutan</h3>" +
            '<ul class="timeline">' + (a.pendidikan || []).map(timelineItem).join("") + "</ul>" +
          "</div>" +

          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("share") + " Sosial Media</h3>" +
            (sosial.length
              ? '<div class="social-grid">' + sosial.map(socialCard).join("") + "</div>"
              : '<p class="muted small">Belum ada tautan sosial media yang ditambahkan.</p>') +
            '<p class="small muted" style="margin:16px 0 0">Tautan profil bisa diperbarui oleh masing-masing alumni melalui pengelola website.</p>' +
          "</div>" +

          '<div class="panel">' +
            '<h3 class="panel__title">' + icon("camera") + " Galeri Kenangan</h3>" +
            '<div class="gallery-grid" id="profileGallery">' +
              ((a.galeri || []).map(function (g, i) {
                const bg = g.warna || "#1b6ca8";
                const caption = g.caption || "";
                const inner = g.src
                  ? '<img class="gallery-item__img" src="' + esc(g.src) + '" alt="' + esc(caption) + '" loading="lazy" decoding="async" />'
                  : '<span class="gallery-item__ph" style="background:linear-gradient(135deg,' + esc(bg) + ',#0a2540)">' + icon("image") + "</span>";
                return '<figure class="gallery-item" data-index="' + i + '">' +
                  '<button class="gallery-item__open" type="button" aria-label="Perbesar foto: ' + esc(caption) + '">' +
                    inner +
                    '<span class="gallery-item__cap">' + esc(caption) + "</span>" +
                  "</button></figure>";
              }).join("") || '<p class="muted small">Belum ada foto yang ditambahkan.</p>') +
            "</div>" +
          "</div>" +

          (a.kenangan
            ? '<div class="panel">' +
                '<h3 class="panel__title">' + icon("quote") + " Kenangan</h3>" +
                '<div class="quote-block"><p>"' + esc(a.kenangan) + '"</p></div>' +
              "</div>"
            : "") +

          (others.length
            ? '<div class="panel">' +
                '<h3 class="panel__title">' + icon("users2") + " Teman satu sekolah lanjutan</h3>" +
                '<p class="small muted" style="margin-top:-6px">Juga lanjut ke <b>' + esc(sekolahLanjut) + "</b></p>" +
                '<div class="social-grid">' +
                  others.map(function (o) {
                    return '<a class="social-pill" href="profil.html?id=' + encodeURIComponent(o.id) + '" style="gap:12px">' +
                      '<span class="social-pill__icon" style="background:' + avatarGradient(o.id) + '">' + esc(initials(o.name)) + "</span>" +
                      "<span>" + esc(o.name) + "</span></a>";
                  }).join("") +
                "</div>" +
              "</div>"
            : "") +

          '<div class="panel" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
            '<a class="btn btn--ghost btn--sm" href="profil.html?id=' + encodeURIComponent(prev.id) + '">' + icon("arrowLeft") + " " + esc(prev.name) + "</a>" +
            '<a class="btn btn--ghost btn--sm" href="profil.html?id=' + encodeURIComponent(next.id) + '">' + esc(next.name) + " " + icon("arrowRight") + "</a>" +
          "</div>" +
        "</main>" +

      "</div>" +
    "</div></section>";

  /* ---------- Tombol salin tautan ---------- */
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      const url = window.location.href;
      const fallback = function () {
        const area = document.createElement("textarea");
        area.value = url;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (e) { /* abaikan */ }
        document.body.removeChild(area);
        toast("Tautan profil disalin", "copy");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
          .then(function () { toast("Tautan profil disalin", "copy"); })
          .catch(fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------- Lightbox galeri kenangan ---------- */
  const gallery = document.getElementById("profileGallery");
  if (gallery) {
    const items = (a.galeri || []).map(function (g) {
      return { src: g.src || "", caption: g.caption || "", warna: g.warna || "#1b6ca8" };
    });
    const lb = initLightbox();
    function openProfilePhoto(target) {
      const btn = target.closest(".gallery-item__open");
      if (!btn) return;
      const fig = btn.closest(".gallery-item");
      if (!fig) return;
      lb.openWith(items, Number(fig.getAttribute("data-index")) || 0);
    }
    gallery.addEventListener("click", function (e) { openProfilePhoto(e.target); });
  }

  /* ---------- Judul dokumen ---------- */
  document.title = a.name + " — " + window.SITE_CONFIG.school.name + " Alumni";
})();
