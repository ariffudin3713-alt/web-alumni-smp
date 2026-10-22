/* ==========================================================================
   server.js — Server statis ringan + proxy Instagram
   --------------------------------------------------------------------------
   Fungsi:
     1) Menyajikan seluruh berkas situs (HTML/CSS/JS/gambar).
     2) Menyediakan /api/ig/posts yang menarik data langsung dari Instagram
        memakai access token, sehingga token TIDAK PERNAH terlihat di browser.

   Menjalankan:
     node server.js
     atau dengan token:
     set IG_ACCESS_TOKEN=xxxx  (Windows: $env:IG_ACCESS_TOKEN="xxxx")
     node server.js

   Variabel lingkungan:
     IG_ACCESS_TOKEN  : access token Instagram (Basic Display / Graph API)
     IG_USER_ID      : nomor IG untuk akun bisnis (opsional)
     PORT            : nomor port (bawaan 8080)
   ========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;
const TOKEN = process.env.IG_ACCESS_TOKEN || "";
const IG_USER_ID = process.env.IG_USER_ID || "";
const CACHE_TTL = 10 * 60 * 1000; /* 10 menit */

let cache = { at: 0, data: null };

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

/* ------------------------------------------------------------------ */
/* Pengambilan data Instagram                                          */
/* ------------------------------------------------------------------ */
function buildTargets() {
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const targets = [];

  if (IG_USER_ID) {
    targets.push(
      "https://graph.facebook.com/v21.0/" + encodeURIComponent(IG_USER_ID) +
      "/media?fields=" + fields + "&limit=24&access_token=" + encodeURIComponent(TOKEN)
    );
  }
  targets.push(
    "https://graph.instagram.com/me/media?fields=" + fields + "&limit=24&access_token=" + encodeURIComponent(TOKEN)
  );
  return targets;
}

function normalise(item) {
  return {
    id: item.id,
    caption: item.caption || "",
    src: item.media_type === "VIDEO" ? (item.thumbnail_url || "") : (item.media_url || ""),
    thumbnail: item.thumbnail_url || item.media_url || "",
    permalink: item.permalink || "",
    mediaType: item.media_type || "IMAGE",
    date: item.timestamp || ""
  };
}

async function fetchInstagramPosts() {
  const targets = buildTargets();
  let lastError = "tidak diketahui";

  for (const target of targets) {
    try {
      const response = await fetch(target, { headers: { Accept: "application/json" } });
      const text = await response.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        lastError = "balasan bukan JSON: " + text.slice(0, 200);
        continue;
      }
      if (!response.ok) {
        const detail = (json && json.error && json.error.message) || response.statusText;
        lastError = detail;
        continue;
      }
      const items = (json.data || []).map(normalise).filter(function (p) { return p.src || p.thumbnail; });
      return { posts: items, updatedAt: new Date().toISOString(), source: "live-instagram" };
    } catch (error) {
      lastError = error.message;
    }
  }
  throw new Error(lastError);
}

async function getPosts() {
  const now = Date.now();
  if (cache.data && now - cache.at < CACHE_TTL) return cache.data;

  const result = await fetchInstagramPosts();
  cache = { at: now, data: result };
  return result;
}

/* ------------------------------------------------------------------ */
/* Utilitas HTTP                                                       */
/* ------------------------------------------------------------------ */
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/" || rel === "") rel = "/index.html";

  const target = path.normalize(path.join(ROOT, rel));
  if (!target.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(target, function (error, stats) {
    if (error || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>404</h1><p>Halaman tidak ditemukan. <a href='/'>Kembali ke beranda</a></p>");
      return;
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600"
    });
    fs.createReadStream(target).pipe(res);
  });
}

/* ------------------------------------------------------------------ */
/* Server                                                              */
/* ------------------------------------------------------------------ */
const server = http.createServer(function (req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (pathname === "/api/ig/posts") {
    if (!TOKEN) {
      sendJson(res, 503, {
        error: "IG_ACCESS_TOKEN belum diatur",
        hint: "Setel environment IG_ACCESS_TOKEN lalu jalankan ulang: node server.js"
      });
      return;
    }
    getPosts()
      .then(function (data) { sendJson(res, 200, data); })
      .catch(function (error) {
        sendJson(res, 502, { error: "Gagal mengambil data Instagram: " + error.message });
      });
    return;
  }

  if (pathname === "/api/health") {
    sendJson(res, 200, { ok: true, token: Boolean(TOKEN), time: new Date().toISOString() });
    return;
  }

  serveStatic(req, res, pathname);
});

server.listen(PORT, function () {
  console.log("");
  console.log("  Website Alumni SMP Negeri 1 Rongkop");
  console.log("  Berjalan di  : http://localhost:" + PORT);
  console.log("  Token IG     : " + (TOKEN ? "terpasang" : "belum (galeri memakai mode manual)"));
  console.log("");
});
