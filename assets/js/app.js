/* ==========================================================================
   app.js — helper bersama untuk semua halaman
   ========================================================================== */

/* ---------- Ikon (garis, gaya Lucide) ---------- */
const ICONS = {
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  graduation: '<path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  school: '<path d="M14 22v-4a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v4"/><path d="M18 10a6 6 0 0 0-12 0"/><rect width="20" height="4" x="2" y="6" rx="2"/><path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  youtube: '<path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  twitter: '<path d="M4 4l7 8.5L4.5 20h1.9l5.3-6.1 4.8 6.1H20l-7.3-9L19.4 4h-1.9l-4.9 5.6L8.1 4z"/>',
  tiktok: '<path d="M16 3c.6 2.3 2 3.6 4.5 3.8v3.1c-1.6.1-3.1-.4-4.5-1.4v6.2a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.2a2.8 2.8 0 1 0 2.1 2.8V3z"/>',
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.3A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.9 9.2c.3 1.9 2 3.6 3.9 3.9l.9-1.3 1.9.9v1.6c-3.3.7-6.9-2.9-7.6-6z"/>',
  behance: '<path d="M3 6h5a2.5 2.5 0 0 1 0 5H3z"/><path d="M3 11h5.5a2.5 2.5 0 0 1 0 5H3z"/><path d="M14 13.5h7a3.5 3.5 0 0 0-7 0c0 2 1.7 3.5 3.5 3.5 1.2 0 2.2-.6 2.9-1.5"/><path d="M15 6.5h5"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"/>',
  camera: '<path d="M14.5 4h-5L8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  play: '<path d="m9 6 9 6-9 6z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
  sparkles: '<path d="m12 3 1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M18 15.5 19 18l2.5 1-2.5 1-1 2.5-1-2.5L14.5 19l2.5-1z"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.4 3-5.5A5.5 5.5 0 0 0 12 5.5 5.5 5.5 0 0 0 3 8.5c0 2.1 1.5 4 3 5.5l6 6z"/>',
  quote: '<path d="M9 11H5a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3"/><path d="M9 11v3a5 5 0 0 1-5 5"/><path d="M20 11h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3"/><path d="M20 11v3a5 5 0 0 1-5 5"/>',
  briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  users2: '<path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M4 22a8 8 0 0 1 16 0"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 7-4M8.6 13.5l7 4"/>'
};

/* ---------- Utilitas ---------- */
function icon(name, cls) {
  const path = ICONS[name] || ICONS.info;
  return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function initials(name) {
  const parts = String(name || "?").trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#0a2540,#1b6ca8)", "linear-gradient(135deg,#0d9488,#22c55e)",
  "linear-gradient(135deg,#f59e0b,#ef4444)", "linear-gradient(135deg,#7c3aed,#ec4899)",
  "linear-gradient(135deg,#1b6ca8,#0d9488)", "linear-gradient(135deg,#ef4444,#f59e0b)",
  "linear-gradient(135deg,#2563eb,#7c3aed)", "linear-gradient(135deg,#0f766e,#0891b2)"
];

function avatarGradient(seed) {
  let hash = 0;
  const s = String(seed || "");
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

const STATUS_META = {
  mahasiswa: { label: "Mahasiswa", chip: "chip--blue", icon: "graduation" },
  siswa: { label: "Siswa SMA/SMK", chip: "chip--teal", icon: "school" },
  pekerja: { label: "Bekerja", chip: "chip--gold", icon: "briefcase" },
  wirausaha: { label: "Wirausaha", chip: "chip--gold", icon: "sparkles" }
};

const SOCIAL_META = {
  ig: { label: "Instagram", icon: "instagram", cls: "sp-ig" },
  tiktok: { label: "TikTok", icon: "tiktok", cls: "sp-tiktok" },
  facebook: { label: "Facebook", icon: "facebook", cls: "sp-fb" },
  x: { label: "X", icon: "twitter", cls: "sp-x" },
  linkedin: { label: "LinkedIn", icon: "linkedin", cls: "sp-linkedin" },
  youtube: { label: "YouTube", icon: "youtube", cls: "sp-youtube" },
  github: { label: "GitHub", icon: "github", cls: "sp-github" },
  behance: { label: "Behance", icon: "behance", cls: "sp-behance" },
  website: { label: "Website", icon: "globe", cls: "sp-web" },
  whatsapp: { label: "WhatsApp", icon: "whatsapp", cls: "sp-wa" },
  email: { label: "Email", icon: "mail", cls: "sp-mail" }
};

function socialEntries(sosial) {
  const out = [];
  Object.keys(sosial || {}).forEach(function (key) {
    const raw = sosial[key];
    if (!raw) return;
    const meta = SOCIAL_META[key];
    if (!meta) return;
    let url = raw;
    if (key === "email") url = "mailto:" + raw;
    else if (key === "whatsapp") url = "https://wa.me/" + String(raw).replace(/[^0-9]/g, "");
    else if (!/^https?:/i.test(raw)) url = "https://" + raw;
    out.push({ key: key, label: meta.label, icon: meta.icon, cls: meta.cls, url: url, value: raw });
  });
  return out;
}

/* ---------- Data alumni (aman bila data.js belum dimuat) ---------- */
function alumniList() {
  return Array.isArray(window.ALUMNI_DATA) ? window.ALUMNI_DATA : [];
}
function findAlumni(id) {
  return alumniList().find(function (a) { return a.id === id; }) || null;
}

/* ---------- Header & footer ---------- */
const NAV_ITEMS = [
  { href: "index.html", label: "Beranda", key: "home" },
  { href: "alumni.html", label: "Direktori Alumni", key: "alumni" },
  { href: "lanjutan.html", label: "Sekolah Lanjutan", key: "lanjutan" },
  { href: "galeri.html", label: "Galeri Kelas", key: "galeri" },
  { href: "tentang.html", label: "Tentang", key: "tentang" }
];

function renderHeader(active) {
  const cfg = window.SITE_CONFIG;
  const host = document.getElementById("site-header");
  if (!host) return;
  const nav = NAV_ITEMS.map(function (item) {
    const mark = item.key === active ? ' class="is-active" aria-current="page"' : "";
    return '<a href="' + item.href + '"' + mark + ">" + esc(item.label) + "</a>";
  }).join("");

  host.innerHTML =
    '<header class="header" id="siteHeader">' +
      '<div class="header__inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand__mark">' + esc(cfg.school.mark || cfg.school.short) + "</span>" +
          '<span class="brand__text">' +
            '<span class="brand__name">' + esc(cfg.school.name) + "</span>" +
            '<span class="brand__sub">Alumni · ' + esc(cfg.school.tagline) + "</span>" +
          "</span>" +
        "</a>" +
        '<nav class="nav" id="mainNav" aria-label="Navigasi utama">' + nav + "</nav>" +
        '<div class="header__tools">' +
          '<a class="icon-btn" href="' + esc(cfg.instagram.profileUrl) + '" target="_blank" rel="noopener" title="Instagram angkatan" aria-label="Instagram angkatan">' + icon("instagram") + "</a>" +
          '<button class="icon-btn theme-toggle" id="themeToggle" type="button" title="Ganti tema" aria-label="Ganti tema">' +
            '<span class="sun">' + icon("sun") + "</span>" +
            '<span class="moon">' + icon("moon") + "</span>" +
          "</button>" +
          '<button class="icon-btn nav-toggle" id="navToggle" type="button" aria-label="Buka menu" aria-controls="mainNav" aria-expanded="false">' + icon("menu") + "</button>" +
        "</div>" +
      "</div>" +
    "</header>";
}

function renderFooter() {
  const cfg = window.SITE_CONFIG;
  const host = document.getElementById("site-footer");
  if (!host) return;
  const list = alumniList();
  const ig = cfg.instagram;

  host.innerHTML =
    '<footer class="footer">' +
      '<div class="container">' +
        '<div class="footer__grid">' +
          "<div>" +
            '<div class="footer__brand">' +
              '<span class="brand__mark">' + esc(cfg.school.mark || cfg.school.short) + "</span>" +
              "<div><strong style='color:#fff'>" + esc(cfg.school.name) + "</strong>" +
              "<div class='small' style='color:rgba(255,255,255,.6)'>" + esc(cfg.school.tagline) + "</div></div>" +
            "</div>" +
            "<p class='small'>" + esc(cfg.school.description) + "</p>" +
            '<div class="social-row">' +
              '<a class="social-btn" href="' + esc(ig.profileUrl) + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram") + "</a>" +
              '<a class="social-btn" href="' + esc(cfg.school.mapUrl) + '" target="_blank" rel="noopener" aria-label="Lokasi">' + icon("mapPin") + "</a>" +
              '<a class="social-btn" href="mailto:' + esc(cfg.school.email) + '" aria-label="Email">' + icon("mail") + "</a>" +
            "</div>" +
          "</div>" +
          "<div>" +
            "<h4>Jelajahi</h4>" +
            '<ul class="footer__list">' +
              NAV_ITEMS.map(function (i) { return '<li><a href="' + i.href + '">' + esc(i.label) + "</a></li>"; }).join("") +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Galeri IG</h4>" +
            '<ul class="footer__list">' +
              '<li><a href="' + esc(ig.profileUrl) + '" target="_blank" rel="noopener">@' + esc(ig.username) + "</a></li>" +
              ig.hashtags.slice(0, 4).map(function (t) {
                return '<li><a href="https://www.instagram.com/explore/tags/' + encodeURIComponent(t.replace(/^#/, "")) + '/" target="_blank" rel="noopener">' + esc(t) + "</a></li>";
              }).join("") +
            "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Kontak</h4>" +
            "<ul class='footer__list'>" +
              "<li>" + icon("mapPin") + " " + esc(cfg.school.address) + "</li>" +
              "<li>" + icon("mail") + " " + esc(cfg.school.email) + "</li>" +
              "<li>" + icon("phone") + " " + esc(cfg.school.phone) + "</li>" +
            "</ul>" +
            "<p class='small' style='margin-top:14px;color:rgba(255,255,255,.55)'>" + list.length + " alumni tercatat · Update rutin</p>" +
          "</div>" +
        "</div>" +
        '<div class="footer__bottom">' +
          "<span>&copy; " + new Date().getFullYear() + " " + esc(cfg.school.name) + ". Dibuat untuk ikhtisar alumni.</span>" +
          "<span>Dibangun dengan HTML, CSS &amp; JavaScript murni</span>" +
        "</div>" +
      "</div>" +
    "</footer>";
}

/* ---------- Toast ---------- */
function toast(message, iconName) {
  let el = document.getElementById("siteToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "siteToast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.innerHTML = icon(iconName || "check") + "<span>" + esc(message) + "</span>";
  requestAnimationFrame(function () { el.classList.add("is-visible"); });
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 2600);
}

/* ---------- Tema ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("alumni-theme", theme); } catch (e) { /* abaikan */ }
}
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("alumni-theme"); } catch (e) { /* abaikan */ }
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

/* ---------- Init global ---------- */
document.addEventListener("DOMContentLoaded", function () {
  initTheme();

  const page = document.body.getAttribute("data-page");
  renderHeader(page);
  renderFooter();

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const now = document.documentElement.getAttribute("data-theme");
      applyTheme(now === "dark" ? "light" : "dark");
    });
  }

  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (navToggle && nav) {
    function setNavOpen(open) {
      nav.classList.toggle("is-open", open);
      navToggle.innerHTML = icon(open ? "x" : "menu");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    }
    navToggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNavOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setNavOpen(false);
    });
  }

  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});

/* ---------- Lightbox (dipakai bersama) ---------- */
let __lightbox = null;

function initLightbox() {
  if (__lightbox) return __lightbox;

  let items = [];
  let index = 0;
  let lastFocus = null;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Pratinjau foto");
  box.setAttribute("aria-hidden", "true");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Tutup pratinjau">' + icon("x") + "</button>" +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Foto sebelumnya">' + icon("chevronLeft") + "</button>" +
    '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Foto berikutnya">' + icon("chevronRight") + "</button>" +
    '<div class="lightbox__figure">' +
      '<img class="lightbox__img" alt="" />' +
      '<div class="lightbox__ph" hidden>' +
        '<span class="lightbox__ph-icon">' + icon("image") + "</span>" +
        '<span class="lightbox__ph-text"></span>' +
      "</div>" +
      '<p class="lightbox__cap" aria-live="polite"></p>' +
    "</div>";
  document.body.appendChild(box);
  // Saat tertutup, seluruh isi lightbox dikeluarkan dari urutan fokus & aksesibilitas.
  box.inert = true;

  const img = box.querySelector(".lightbox__img");
  const ph = box.querySelector(".lightbox__ph");
  const phText = box.querySelector(".lightbox__ph-text");
  const cap = box.querySelector(".lightbox__cap");
  const btnClose = box.querySelector(".lightbox__close");
  const btnPrev = box.querySelector(".lightbox__nav--prev");
  const btnNext = box.querySelector(".lightbox__nav--next");

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    const it = items[index];
    const caption = it.caption || "";

    if (it.src) {
      img.src = it.src;
      img.alt = caption || "Foto angkatan";
      img.hidden = false;
      ph.hidden = true;
    } else {
      img.removeAttribute("src");
      img.alt = "";
      img.hidden = true;
      ph.hidden = false;
      ph.style.background =
        "linear-gradient(135deg," + (it.warna || "#d62976") + ",#0a2540)";
      phText.textContent = caption || "Foto angkatan";
    }

    cap.textContent = caption + (items.length > 1 ? "  (" + (index + 1) + "/" + items.length + ")" : "");
    const many = items.length > 1;
    btnPrev.hidden = !many;
    btnNext.hidden = !many;
  }

  function open(i) {
    if (!items.length) return;
    lastFocus = document.activeElement;
    box.inert = false;
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    show(i);
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function close() {
    if (!box.classList.contains("is-open")) return;
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    box.inert = true;
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    lastFocus = null;
  }

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", function () { show(index - 1); });
  btnNext.addEventListener("click", function () { show(index + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key === "ArrowLeft") { show(index - 1); return; }
    if (e.key === "ArrowRight") { show(index + 1); return; }
    if (e.key !== "Tab") return;
    // Tahan fokus di dalam lightbox.
    const focusables = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.hidden; });
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  __lightbox = {
    open: open,
    close: close,
    setItems: function (list) { items = list || []; },
    openWith: function (list, i) { items = list || []; open(i || 0); }
  };
  return __lightbox;
}
