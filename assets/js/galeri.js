/* ==========================================================================
   galeri.js — Galeri Kelas yang tersambung dengan Instagram angkatan
   --------------------------------------------------------------------------
   Tiga sumber data, dipilih otomatis berurutan:
     1) LIVE API   : /api/ig/posts  (backend server.js + IG_ACCESS_TOKEN)
     2) WIDGET     : LightWidget / SnapWidget (cukup ID widget, tanpa API key)
     3) MANUAL     : assets/js/gallery-cache.js (hasil sinkron tools/sync-ig.mjs)
   ========================================================================== */

(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const CFG = window.SITE_CONFIG;
  const IG = CFG.instagram;

  const elStatus = document.getElementById("igStatus");
  const elStatusIcon = document.getElementById("igStatusIcon");
  const elStatusText = document.getElementById("igStatusText");
  const elStatusWrap = document.getElementById("igStatusWrap");
  const elWidget = document.getElementById("igWidget");
  const elUpdated = document.getElementById("igUpdated");
  const elSearch = document.getElementById("galeriSearch");
  const elFilter = document.getElementById("galeriFilter");
  const elCount = document.getElementById("galeriCount");
  const elEmpty = document.getElementById("galeriEmpty");
  const elManual = document.getElementById("manualGallery");
  const elSetup = document.getElementById("setupGuide");

  let posts = [];
  let source = "manual";
  let updatedAt = "";
  let lightboxItems = [];

  /* ---------- Utilitas ---------- */
  function timeAgo(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return "baru saja";
    if (diff < 3600) return Math.floor(diff / 60) + " menit lalu";
    if (diff < 86400) return Math.floor(diff / 3600) + " jam lalu";
    if (diff < 2592000) return Math.floor(diff / 86400) + " hari lalu";
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }

  function setStatus(kind, text) {
    if (!elStatusWrap) return;
    elStatusWrap.className = "status-note";
    if (kind === "live") {
      elStatusWrap.style.background = "var(--c-teal-soft)";
      elStatusIcon.style.color = "var(--c-teal)";
      elStatusIcon.innerHTML = icon("check");
    } else if (kind === "widget") {
      elStatusWrap.style.background = "var(--c-blue-soft)";
      elStatusIcon.style.color = "var(--c-blue)";
      elStatusIcon.innerHTML = icon("refresh");
    } else {
      elStatusWrap.style.background = "var(--c-gold-soft)";
      elStatusIcon.style.color = "#b45309";
      elStatusIcon.innerHTML = icon("info");
    }
    elStatusText.innerHTML = text;
  }

  /* ---------- Muat data ---------- */
  function loadFromApi() {
    if (!IG.api || !IG.api.enabled || !IG.api.proxyPath) return Promise.resolve(null);
    if (typeof window.fetch !== "function") return Promise.resolve(null);
    return fetch(IG.api.proxyPath + "?limit=24", { headers: { Accept: "application/json" } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (data && data.posts && data.posts.length) return data;
        return null;
      })
      .catch(function () { return null; });
  }

  function loadFromCache() {
    const cache = window.IG_CACHE;
    if (cache && cache.posts && cache.posts.length) return cache;
    return null;
  }

  function widgetUrl() {
    const w = IG.widget || {};
    if (!w.id || !w.provider) return null;
    if (w.provider === "lightwidget") {
      return "https://www.lightwidget.com/widget/lightwidget?widget_id=" + encodeURIComponent(w.id) + "&theme=default&lang=en";
    }
    if (w.provider === "snapwidget") {
      return "https://cdn.snapwidget.com/widget/" + encodeURIComponent(w.id) + "/embed?theme=default&limit=12";
    }
    return null;
  }

  /* ---------- Render ---------- */
  function postCard(p, i) {
    const src = p.src || p.thumbnail || p.media_url || "";
    const caption = p.caption || "Foto angkatan";
    const permalink = p.permalink || p.link || IG.profileUrl;
    const warna = p.warna || "#1b6ca8";
    const media = src
      ? '<img class="gallery-item__img" src="' + esc(src) + '" alt="' + esc(caption) + '" loading="lazy" decoding="async" />'
      : '<span class="gallery-item__ph" style="background:linear-gradient(135deg,' + esc(warna) + ',#0a2540)">' + icon("image") + "</span>";
    return (
      '<figure class="gallery-item" data-index="' + i + '">' +
        '<button class="gallery-item__open" type="button" aria-label="Perbesar foto: ' + esc(caption) + '">' +
          media +
          '<span class="gallery-item__cap">' + esc(caption.length > 60 ? caption.slice(0, 60) + "..." : caption) + "</span>" +
        "</button>" +
        '<a class="gallery-item__ig" href="' + esc(permalink) + '" target="_blank" rel="noopener" title="Lihat di Instagram" aria-label="Buka di Instagram">' + icon("instagram") + "</a>" +
      "</figure>"
    );
  }

  function applyFilter() {
    const q = (elSearch && elSearch.value || "").trim().toLowerCase();
    const f = elFilter ? elFilter.value : "";
    let list = posts.slice();

    if (f) {
      list = list.filter(function (p) { return (p.angkatan || p.kelas || "") === f; });
    }
    if (q) {
      list = list.filter(function (p) {
        return String(p.caption || "").toLowerCase().indexOf(q) !== -1;
      });
    }

    grid.innerHTML = list.map(postCard).join("");
    lightboxItems = list.map(function (p) {
      return {
        src: p.src || p.thumbnail || p.media_url || "",
        caption: p.caption || "",
        warna: p.warna || "#1b6ca8"
      };
    });

    if (elCount) elCount.innerHTML = "Menampilkan <b>" + list.length + "</b> dari <b>" + posts.length + "</b> foto";
    if (elEmpty) elEmpty.classList.toggle("hide", list.length > 0);
    return list;
  }

  /* ---------- Galeri manual per alumni (kenangan) ---------- */
  function renderManualGallery() {
    if (!elManual) return;
    const alumni = alumniList();
    const items = [];
    alumni.forEach(function (a) {
      (a.galeri || []).forEach(function (g) {
        items.push({
          src: g.src || "",
          warna: g.warna || "#1b6ca8",
          caption: a.name + " — " + (g.caption || ""),
          alumni: a.id,
          angkatan: a.angkatan
        });
      });
    });
    elManual.innerHTML = items.map(function (it, i) {
      const inner = it.src
        ? '<img class="gallery-item__img" src="' + esc(it.src) + '" alt="' + esc(it.caption) + '" loading="lazy" decoding="async" />'
        : '<span class="gallery-item__ph" style="background:linear-gradient(135deg,' + esc(it.warna) + ",#0a2540)\">" + icon("image") + "</span>";
      return '<figure class="gallery-item" data-index="' + i + '">' +
        '<button class="gallery-item__open" type="button" aria-label="Perbesar foto: ' + esc(it.caption) + '">' +
          inner +
          '<span class="gallery-item__cap">' + esc(it.caption) + "</span>" +
        "</button></figure>";
    }).join("");

    const lb = initLightbox();
    function openManual(target) {
      const btn = target.closest(".gallery-item__open");
      if (!btn) return;
      const fig = btn.closest(".gallery-item");
      if (!fig) return;
      lb.openWith(items.map(function (it) { return { src: it.src, caption: it.caption, warna: it.warna }; }), Number(fig.getAttribute("data-index")) || 0);
    }
    elManual.addEventListener("click", function (e) { openManual(e.target); });
  }

  /* ---------- Filter angkatan/kelas ---------- */
  function buildFilters(list) {
    if (!elFilter) return;
    const values = Array.from(new Set(
      list.map(function (p) { return p.angkatan || p.kelas; }).filter(Boolean)
    )).sort();
    elFilter.innerHTML = '<option value="">Semua angkatan</option>' +
      values.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; }).join("");
  }

  /* ---------- Tombol ---------- */
  if (elSearch) {
    let t;
    elSearch.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(applyFilter, 180);
    });
  }
  if (elFilter) elFilter.addEventListener("change", applyFilter);

  /* ---------- Buka lightbox dari grid ---------- */
  function openFromGrid(target) {
    const btn = target.closest(".gallery-item__open");
    if (!btn) return;
    const fig = btn.closest(".gallery-item");
    if (!fig) return;
    initLightbox().openWith(lightboxItems, Number(fig.getAttribute("data-index")) || 0);
  }
  grid.addEventListener("click", function (e) { openFromGrid(e.target); });

  /* ---------- Jalankan ---------- */
  loadFromApi()
    .then(function (data) {
      if (data) {
        source = "api";
        posts = data.posts;
        updatedAt = data.updatedAt || "";
        setStatus("live",
          "<b>Live</b> — galeri ditarik langsung dari Instagram <b>@" + esc(IG.username) +
          "</b> melalui API. Terakhir diperbarui " + (updatedAt ? esc(timeAgo(updatedAt)) : "baru saja") + ".");
        buildFilters(posts);
        applyFilter();
        return;
      }

      const wUrl = widgetUrl();
      if (wUrl) {
        source = "widget";
        setStatus("widget",
          "<b>Terhubung via widget</b> — feed Instagram <b>@" + esc(IG.username) +
          "</b> dimuat lewat " + esc(IG.widget.provider) + ". Widget diperbarui otomatis oleh penyedia widget.");
        elWidget.innerHTML = '<iframe class="ig-embed" src="' + esc(wUrl) + '" title="Instagram ' + esc(IG.username) + '" loading="lazy" allowtransparency="true"></iframe>';
        elWidget.classList.remove("hide");
        grid.innerHTML = "";
        elCount.innerHTML = "Feed langsung dari Instagram";
        return;
      }

      const cache = loadFromCache();
      if (cache) {
        source = "cache";
        posts = cache.posts;
        updatedAt = cache.updatedAt || "";
        setStatus("manual",
          "<b>Mode manual</b> — galeri memakai data tersinkron dari <code>assets/js/gallery-cache.js</code>. " +
          "Jalankan <code>node tools/sync-ig.mjs</code> untuk memperbarui, atau isi widget.id pada <code>assets/js/config.js</code> untuk tampilan live.");
      } else {
        source = "empty";
        setStatus("manual",
          "<b>Belum ada sumber galeri aktif</b> — isi <code>instagram.widget.id</code> di <code>assets/js/config.js</code> " +
          "untuk widget, atau jalankan <code>node tools/sync-ig.mjs</code> dengan access token Instagram.");
      }

      buildFilters(posts);
      applyFilter();
    })
    .catch(function () {
      setStatus("manual", "Gagal memuat galeri otomatis. Menampilkan galeri kenangan manual di bawah.");
      buildFilters(posts);
      applyFilter();
    });

  renderManualGallery();

  if (elUpdated) {
    elUpdated.textContent = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------- Tampilkan panduan setup ---------- */
  if (elSetup) {
    elSetup.innerHTML =
      '<ol style="padding-left:20px;margin:0;color:var(--c-text-2);font-size:.92rem;line-height:1.9">' +
        "<li><b>Cara paling cepat (widget)</b> — daftar di <a href='https://www.lightwidget.com/' target='_blank' rel='noopener'>lightwidget.com</a> atau " +
          "<a href='https://www.snapwidget.com/' target='_blank' rel='noopener'>snapwidget.com</a>, pilih sumber <b>@" + esc(IG.username) + "</b> atau hashtag, " +
          "lalu salin ID widget ke <code>assets/js/config.js</code> pada <code>instagram.widget.id</code>.</li>" +
        "<li><b>Cara live penuh (API)</b> — buat access token Instagram di Meta Developer, lalu jalankan " +
          "<code>node server.js</code> dengan environment <code>IG_ACCESS_TOKEN=...</code>. Backend akan melayani " +
          "<code>" + esc(IG.api.proxyPath) + "</code> sehingga token tidak pernah terlihat di browser.</li>" +
        "<li><b>Tanpa server (sinkron manual)</b> — jalankan <code>node tools/sync-ig.mjs</code>. Script menulis " +
          "<code>assets/js/gallery-cache.js</code> yang otomatis dipakai halaman galeri.</li>" +
      "</ol>";
  }
})();
