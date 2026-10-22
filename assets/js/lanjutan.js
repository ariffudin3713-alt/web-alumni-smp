/* ==========================================================================
   lanjutan.js — Halaman Jejak Sekolah Lanjutan
   ========================================================================== */

(function () {
  const host = document.getElementById("schoolsRoot");
  if (!host) return;

  const all = alumniList();

  /* ---------- Kumpulkan sekolah lanjutan ---------- */
  const map = {};
  all.forEach(function (a) {
    const key = a.sekolahLanjut;
    if (!key) return;
    if (!map[key]) map[key] = { nama: key, tingkat: "", alumni: [], kota: "" };
    map[key].alumni.push(a);

    const pt = (a.pendidikan || []).filter(function (p) {
      return p.tingkat === "Perguruan Tinggi" && p.sekolah === key;
    })[0];
    if (pt) map[key].tingkat = "Perguruan Tinggi";
    else if ((a.pendidikan || []).some(function (p) { return p.sekolah === key && p.tingkat === "SMK"; })) map[key].tingkat = "SMK";
    else map[key].tingkat = "SMA/MAN";
  });

  const schools = Object.keys(map).map(function (k) { return map[k]; })
    .sort(function (x, y) { return y.alumni.length - x.alumni.length || x.nama.localeCompare(y.nama, "id"); });

  /* ---------- Ringkasan ---------- */
  const jumlahPT = all.filter(function (a) {
    return (a.pendidikan || []).some(function (p) { return p.tingkat === "Perguruan Tinggi"; });
  }).length;
  const jumlahSMA = all.filter(function (a) {
    return (a.pendidikan || []).some(function (p) { return p.tingkat === "SMA" || p.tingkat === "SMK"; });
  }).length;
  const jumlahKerja = all.filter(function (a) { return a.status === "pekerja" || a.status === "wirausaha"; }).length;
  const kota = Array.from(new Set(all.map(function (a) { return a.kota; }).filter(Boolean))).sort();

  /* ---------- Render statistik ---------- */
  const statHost = document.getElementById("lanjutStats");
  if (statHost) {
    const stats = [
      { value: schools.length, label: "Institusi Lanjutan", icon: "school", chip: "chip--blue" },
      { value: jumlahPT, label: "Lanjut ke Perguruan Tinggi", icon: "graduation", chip: "chip--teal" },
      { value: jumlahSMA, label: "Lanjut ke SMA/SMK/MAN", icon: "book", chip: "chip--gold" },
      { value: jumlahKerja, label: "Bekerja / Wirausaha", icon: "briefcase", chip: "" }
    ];
    statHost.innerHTML = stats.map(function (s) {
      return '<div class="card" style="padding:22px"><span class="chip ' + s.chip + '" style="margin-bottom:10px">' + icon(s.icon) + esc(s.label) + "</span>" +
        '<div style="font-size:2rem;font-weight:900;line-height:1;letter-spacing:-.03em">' + s.value + "</div></div>";
    }).join("");
  }

  /* ---------- Render kartu sekolah ---------- */
  const typeColor = {
    "Perguruan Tinggi": "chip--teal",
    "SMK": "chip--gold",
    "SMA/MAN": "chip--blue"
  };

  host.innerHTML = schools.map(function (s, i) {
    return (
      '<article class="school-card" id="s' + i + '">' +
        '<div class="school-card__top">' +
          "<div>" +
            '<div class="school-card__type">' + esc(s.tingkat) + "</div>" +
            '<h3 class="school-card__name">' + esc(s.nama) + "</h3>" +
          "</div>" +
          '<div class="school-card__count">' + s.alumni.length + "</div>" +
        "</div>" +
        '<span class="chip ' + (typeColor[s.tingkat] || "") + '">' + icon("users2") + " " + s.alumni.length + " alumni</span>" +
        '<div class="school-card__list">' +
          s.alumni.map(function (a) {
            return '<a href="profil.html?id=' + encodeURIComponent(a.id) + '" data-kota="' + esc(a.kota || "") + '"><span class="dot"></span>' +
              "<span>" + esc(a.name) + "</span></a>";
          }).join("") +
        "</div>" +
      "</article>"
    );
  }).join("");

  /* ---------- Filter kota ---------- */
  const elKota = document.getElementById("kotaFilter");
  if (elKota) {
    elKota.innerHTML = '<option value="">Semua kota</option>' +
      kota.map(function (k) { return '<option value="' + esc(k) + '">' + esc(k) + "</option>"; }).join("");

    elKota.addEventListener("change", function () {
      const chosen = elKota.value;
      let shown = 0;
      document.querySelectorAll(".school-card").forEach(function (card) {
        const visible = !chosen || Array.prototype.some.call(card.querySelectorAll(".school-card__list a"), function (a) {
          return a.getAttribute("data-kota") === chosen;
        });
        card.classList.toggle("hide", !visible);
        if (visible) shown++;
      });

      // Saring juga tabel rekap agar konsisten dengan kartu.
      let rows = 0;
      document.querySelectorAll("#kotaTable tbody tr").forEach(function (tr) {
        const show = !chosen || tr.getAttribute("data-kota") === chosen;
        tr.classList.toggle("hide", !show);
        if (show) rows++;
      });

      const note = document.getElementById("kotaNote");
      if (note) {
        note.textContent = chosen
          ? "Menampilkan " + shown + " institusi dan " + rows + " alumni di kota " + chosen + "."
          : "Setiap kartu menampilkan jumlah alumni yang melanjutkan ke institusi tersebut.";
      }
    });
  }

  /* ---------- Tabel alumni per kota ---------- */
  const tableHost = document.getElementById("kotaTable");
  if (tableHost) {
    tableHost.innerHTML =
      '<table style="width:100%;border-collapse:collapse;font-size:.9rem">' +
        "<thead><tr>" +
          '<th style="text-align:left;padding:10px;border-bottom:2px solid var(--c-line)">Alumni</th>' +
          '<th style="text-align:left;padding:10px;border-bottom:2px solid var(--c-line)">Sekolah Lanjutan</th>' +
          '<th style="text-align:left;padding:10px;border-bottom:2px solid var(--c-line)">Kota</th>' +
          '<th style="text-align:left;padding:10px;border-bottom:2px solid var(--c-line)">Status</th>' +
        "</tr></thead><tbody>" +
        all.map(function (a) {
          const st = STATUS_META[a.status] || { label: a.status, chip: "" };
          return "<tr data-kota='" + esc(a.kota || "") + "'>" +
            '<td style="padding:10px;border-bottom:1px solid var(--c-line)"><a href="profil.html?id=' + encodeURIComponent(a.id) + '" style="font-weight:700">' + esc(a.name) + "</a></td>" +
            '<td style="padding:10px;border-bottom:1px solid var(--c-line)">' + esc(a.sekolahLanjut || "-") + "</td>" +
            '<td style="padding:10px;border-bottom:1px solid var(--c-line)">' + esc(a.kota || "-") + "</td>" +
            '<td style="padding:10px;border-bottom:1px solid var(--c-line)"><span class="chip ' + st.chip + '">' + esc(st.label) + "</span></td>" +
          "</tr>";
        }).join("") +
        "</tbody></table>";
  }
})();
