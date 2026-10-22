/* ==========================================================================
   alumni.js — Halaman Direktori Alumni
   ========================================================================== */

(function () {
  const grid = document.getElementById("alumniGrid");
  if (!grid) return;

  const elSearch = document.getElementById("filterSearch");
  const elAngkatan = document.getElementById("filterAngkatan");
  const elLanjut = document.getElementById("filterLanjut");
  const elStatus = document.getElementById("filterStatus");
  const elCount = document.getElementById("resultCount");
  const elEmpty = document.getElementById("emptyState");
  const elReset = document.getElementById("filterReset");
  const elShuffle = document.getElementById("shuffleBtn");

  const all = alumniList();

  /* ---------- Bangun pilihan filter ---------- */
  function uniqueSorted(values) {
    return Array.from(new Set(values)).sort(function (a, b) { return a.localeCompare(b, "id"); });
  }

  function fillSelect(select, values, allLabel) {
    if (!select) return;
    select.innerHTML =
      '<option value="">' + esc(allLabel) + "</option>" +
      values.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + "</option>"; }).join("");
  }

  fillSelect(elAngkatan, uniqueSorted(all.map(function (a) { return a.angkatan; })), "Semua angkatan");
  fillSelect(elLanjut, uniqueSorted(all.map(function (a) { return a.sekolahLanjut; })), "Semua sekolah lanjutan");
  fillSelect(elStatus, uniqueSorted(all.map(function (a) { return (STATUS_META[a.status] || {}).label || a.status; })), "Semua status");

  /* ---------- Render kartu ---------- */
  function cardTemplate(a) {
    const status = STATUS_META[a.status] || { label: a.status, chip: "", icon: "users" };
    const sekolah = a.sekolahLanjut || "-";
    return (
      '<a class="card" href="profil.html?id=' + encodeURIComponent(a.id) + '">' +
        '<div class="card__media" style="background:' + avatarGradient(a.id) + '">' +
          '<span class="card__initials">' + esc(initials(a.name)) + "</span>" +
        "</div>" +
        '<div class="card__body">' +
          '<h3 class="card__name">' + esc(a.name) + "</h3>" +
          '<p class="card__role">' + esc(a.nickname ? '"' + a.nickname + '"' : "") + " · Kelas " + esc(a.kelas) + " · " + esc(a.angkatan) + "</p>" +
          '<div class="card__meta">' +
            '<span class="chip ' + status.chip + '">' + icon(status.icon) + esc(status.label) + "</span>" +
            '<span class="chip chip--blue">' + icon("graduation") + esc(sekolah) + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  /* ---------- Filter & tampilkan ---------- */
  function currentFilters() {
    return {
      q: (elSearch && elSearch.value || "").trim().toLowerCase(),
      angkatan: elAngkatan ? elAngkatan.value : "",
      lanjut: elLanjut ? elLanjut.value : "",
      status: elStatus ? elStatus.value : ""
    };
  }

  function matches(a, f) {
    if (f.angkatan && a.angkatan !== f.angkatan) return false;
    if (f.lanjut && a.sekolahLanjut !== f.lanjut) return false;
    if (f.status) {
      const label = (STATUS_META[a.status] || {}).label || a.status;
      if (label !== f.status) return false;
    }
    if (f.q) {
      const haystack = [
        a.name, a.nickname, a.kelas, a.angkatan, a.minat, a.kota,
        a.sekolahLanjut, (a.skills || []).join(" "), (a.organisasi || []).join(" "),
        (a.pendidikan || []).map(function (p) { return p.sekolah + " " + (p.jurusan || ""); }).join(" ")
      ].join(" ").toLowerCase();
      if (haystack.indexOf(f.q) === -1) return false;
    }
    return true;
  }

  function render() {
    const f = currentFilters();
    const result = all.filter(function (a) { return matches(a, f); });

    grid.innerHTML = result.map(cardTemplate).join("");
    if (elEmpty) elEmpty.classList.toggle("hide", result.length > 0);
    if (elCount) {
      elCount.innerHTML = "Menampilkan <b>" + result.length + "</b> dari <b>" + all.length + "</b> alumni";
    }
    return result;
  }

  /* ---------- Event ---------- */
  let debounce;
  if (elSearch) {
    elSearch.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(render, 180);
    });
  }
  [elAngkatan, elLanjut, elStatus].forEach(function (sel) {
    if (sel) sel.addEventListener("change", render);
  });
  if (elReset) {
    elReset.addEventListener("click", function () {
      if (elSearch) elSearch.value = "";
      [elAngkatan, elLanjut, elStatus].forEach(function (sel) { if (sel) sel.value = ""; });
      render();
      toast("Filter direset", "refresh");
    });
  }
  if (elShuffle) {
    elShuffle.addEventListener("click", function () {
      const acak = all.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 6);
      grid.innerHTML = acak.map(cardTemplate).join("");
      if (elEmpty) elEmpty.classList.add("hide");
      if (elCount) elCount.innerHTML = "Menampilkan <b>" + acak.length + "</b> alumni acak";
      toast("6 profil acak ditampilkan", "sparkles");
      if (typeof grid.scrollIntoView === "function") {
        grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  render();
})();
