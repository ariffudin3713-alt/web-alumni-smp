/* ==========================================================================
   tools/sync-ig.mjs
   Menarik foto dari Instagram lalu menulis assets/js/gallery-cache.js
   --------------------------------------------------------------------------
   Cara pakai:
     set IG_ACCESS_TOKEN=xxxx
     node tools/sync-ig.mjs

     atau:
     node tools/sync-ig.mjs --token=xxxx --limit=30

   Variabel lingkungan:
     IG_ACCESS_TOKEN : access token Instagram
     IG_USER_ID     : nomor akun Instagram (untuk akun bisnis di Graph API)
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "assets", "js", "gallery-cache.js");

/* ---------- Argumen ---------- */
const args = process.argv.slice(2);
function argValue(name) {
  const found = args.find(function (a) { return a.startsWith("--" + name + "="); });
  return found ? found.split("=").slice(1).join("=") : null;
}

const TOKEN = argValue("token") || process.env.IG_ACCESS_TOKEN || "";
const USER_ID = argValue("user") || process.env.IG_USER_ID || "";
const LIMIT = parseInt(argValue("limit") || "24", 10);
const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";

if (!TOKEN) {
  console.error("");
  console.error("  Access token Instagram belum ada.");
  console.error("  Jalankan dengan:");
  console.error("    set IG_ACCESS_TOKEN=xxxx && node tools/sync-ig.mjs");
  console.error("  atau:");
  console.error("    node tools/sync-ig.mjs --token=xxxx");
  console.error("");
  process.exit(1);
}

/* ---------- Ambil data ---------- */
function buildTargets() {
  const list = [];
  if (USER_ID) {
    list.push(
      "https://graph.facebook.com/v21.0/" + encodeURIComponent(USER_ID) +
      "/media?fields=" + FIELDS + "&limit=" + LIMIT + "&access_token=" + encodeURIComponent(TOKEN)
    );
  }
  list.push(
    "https://graph.instagram.com/me/media?fields=" + FIELDS +
    "&limit=" + LIMIT + "&access_token=" + encodeURIComponent(TOKEN)
  );
  return list;
}

async function fetchPosts() {
  const targets = buildTargets();
  let lastError = "";

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
        lastError = (json && json.error && json.error.message) || response.statusText;
        continue;
      }
      return json.data || [];
    } catch (error) {
      lastError = error.message;
    }
  }
  throw new Error(lastError || "permintaan gagal");
}

/* ---------- Ubah ke format galeri ---------- */
function toGallery(items) {
  return items.map(function (item) {
    const isVideo = item.media_type === "VIDEO";
    return {
      id: item.id,
      caption: (item.caption || "").split("\n")[0].slice(0, 160),
      angkatan: "",
      src: isVideo ? (item.thumbnail_url || "") : (item.media_url || ""),
      permalink: item.permalink || "",
      mediaType: item.media_type || "IMAGE",
      date: item.timestamp || ""
    };
  });
}

/* ---------- Tulis berkas ---------- */
function buildFile(posts, updatedAt) {
  const header =
    "/* ==========================================================================\n" +
    "   GALLERY CACHE - hasil sinkron otomatis dari Instagram\n" +
    "   Dibuat oleh: node tools/sync-ig.mjs\n" +
    "   Terakhir sinkron: " + updatedAt + "\n" +
    "   Jangan disunting manual, gunakan ulang skrip sinkron.\n" +
    "   ========================================================================== */\n\n" +
    "window.IG_CACHE = {\n" +
    "  updatedAt: \"" + updatedAt + "\",\n" +
    "  source: \"instagram-sync\",\n" +
    "  posts: [\n";

  const body = posts.map(function (p) {
    return "    {\n" +
      "      id: " + JSON.stringify(p.id) + ",\n" +
      "      caption: " + JSON.stringify(p.caption) + ",\n" +
      "      angkatan: " + JSON.stringify(p.angkatan) + ",\n" +
      "      src: " + JSON.stringify(p.src) + ",\n" +
      "      permalink: " + JSON.stringify(p.permalink) + ",\n" +
      "      mediaType: " + JSON.stringify(p.mediaType) + ",\n" +
      "      date: " + JSON.stringify(p.date) + "\n" +
      "    }";
  }).join(",\n");

  return header + body + "\n  ]\n};\n";
}

/* ---------- Jalankan ---------- */
fetchPosts()
  .then(function (items) {
    const posts = toGallery(items);
    const updatedAt = new Date().toISOString();
    fs.writeFileSync(OUT_FILE, buildFile(posts, updatedAt), "utf8");
    console.log("");
    console.log("  Berhasil menyimpan " + posts.length + " foto ke:");
    console.log("  " + path.relative(ROOT, OUT_FILE));
    console.log("");
  })
  .catch(function (error) {
    console.error("");
    console.error("  Gagal mengambil data Instagram:");
    console.error("  " + error.message);
    console.error("");
    process.exit(1);
  });
