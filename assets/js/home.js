/* ==========================================================================
   home.js — Halaman Beranda
   ========================================================================== */

(function () {
  const all = alumniList();
  const CFG = window.SITE_CONFIG;
  const IG = CFG.instagram;

  /* ---------- Statistik hero ---------- */
  const statHost = document.getElementById("heroStats");
  if (statHost) {
    const angkatan = Array.from(new Set(all.map(function (a) { return a.angkatan; })));
    const lanjut = Array.from(new Set(all.map(function (a) { return a.sekolahLanjut; }).filter(Boolean)));
    const stats = [
      { value: all.length, label: CFG.ui.statLabels.alumni, icon: "users" },
      { value: angkatan.length, label: CFG.ui.statLabels.angkatan, icon: "graduation" },
      { value: lanjut.length, label: CFG.ui.statLabels.lanjutan, icon: "school" },
      { value: "@" + IG.username, label: CFG.ui.statLabels.ig, icon: "instagram" }
    ];
    statHost.innerHTML = stats.map(function (s) {
      return '<div class="stat-card">' +
        '<span class="stat-card__icon">' + icon(s.icon) + "</span>" +
        '<div class="stat-card__value" style="' + (s.value.length > 4 ? "font-size:1.25rem" : "") + '">' + esc(s.value) + "</div>" +
        '<div class="stat-card__label">' + esc(s.label) + "</div>" +
      "</div>";
    }).join("");
  }

  /* ---------- Spotlight alumni ---------- */
  const spotHost = document.getElementById("spotlight");
  if (spotHost) {
    const pilihan = all.slice(0, 8);
    spotHost.innerHTML = pilihan.map(function (a) {
      const st = STATUS_META[a.status] || { label: a.status, chip: "", icon: "users" };
      return (
        '<a class="card" href="profil.html?id=' + encodeURIComponent(a.id) + '">' +
          '<div class="card__media" style="background:' + avatarGradient(a.id) + '">' +
            '<span class="card__initials">' + esc(initials(a.name)) + "</span>" +
          "</div>" +
          '<div class="card__body">' +
            '<h3 class="card__name">' + esc(a.name) + "</h3>" +
            '<p class="card__role">Kelas ' + esc(a.kelas) + " · " + esc(a.minat || "") + "</p>" +
            '<div class="card__meta">' +
              '<span class="chip ' + st.chip + '">' + icon(st.icon) + esc(st.label) + "</span>" +
              '<span class="chip chip--blue">' + icon("school") + esc(a.sekolahLanjut || "-") + "</span>" +
            "</div>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ---------- Excerpt galeri IG ---------- */
  const galHost = document.getElementById("igPreview");
  if (galHost) {
    const cache = window.IG_CACHE;
    const list = (cache && cache.posts ? cache.posts : []).slice(0, 6);
    if (list.length) {
      galHost.innerHTML = list.map(function (p, i) {
        const src = p.src || p.thumbnail || p.media_url || "";
        const inner = src
          ? '<img class="gallery-item__img" src="' + esc(src) + '" alt="' + esc(p.caption || "") + '" loading="lazy" />'
          : '<div class="gallery-item__ph" style="background:linear-gradient(135deg,#d62976,#6228d7)">' + icon("image") + "</div>";
        return '<figure class="gallery-item" data-index="' + i + '">' + inner +
          '<figcaption class="gallery-item__cap">' + esc((p.caption || "Foto angkatan").slice(0, 48)) + "</figcaption></figure>";
      }).join("");

      const lb = initLightbox();
      galHost.addEventListener("click", function (e) {
        const fig = e.target.closest(".gallery-item");
        if (!fig) return;
        lb.openWith(list.map(function (p) {
          return { src: p.src || p.thumbnail || p.media_url || "", caption: p.caption || "" };
        }), Number(fig.getAttribute("data-index")) || 0);
      });
    } else {
      galHost.innerHTML =
        '<div class="ig-panel" style="grid-column:1/-1">' +
          '<div class="ig-panel__head">' +
            '<span class="ig-panel__avatar">' + icon("instagram") + "</span>" +
            "<div><p class='ig-panel__title'>@" + esc(IG.username) + "</p>" +
            "<p class='ig-panel__meta'>Galeri kelas angkatan — klik di bawah untuk membuka Instagram</p></div>" +
          "</div>" +
          '<div class="ig-panel__body" style="text-align:center;padding:34px">' +
            icon("image") +
            '<p class="muted" style="margin:12px 0 18px">Galeri belum tersinkron. Aktifkan sumber live lewat widget, API, atau jalankan tools/sync-ig.mjs.</p>' +
            '<a class="btn btn--primary" href="' + esc(IG.profileUrl) + '" target="_blank" rel="noopener">' + icon("instagram") + " Buka @" + esc(IG.username) + "</a>" +
          "</div>" +
        "</div>";
    }
  }

  /* ---------- Peta sekolah lanjutan (daftar teks) ---------- */
  const destHost = document.getElementById("destinasi");
  if (destHost) {
    const counts = {};
    all.forEach(function (a) {
      if (!a.sekolahLanjut) return;
      counts[a.sekolahLanjut] = (counts[a.sekolahLanjut] || 0) + 1;
    });
    const top = Object.keys(counts).sort(function (x, y) { return counts[y] - counts[x]; }).slice(0, 6);
    destHost.innerHTML = top.map(function (name, i) {
      return '<a class="chip" style="padding:9px 14px;font-size:.85rem" href="lanjutan.html#s' + i + '">' +
        esc(name) + " <b>" + counts[name] + "</b></a>";
    }).join("");
  }
})();
