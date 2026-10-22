/* ==========================================================================
   api/ig/posts.js — Fungsi serverless Vercel
   Menyediakan data Instagram dalam format JSON agar halaman galeri
   dapat menampilkan feed secara langsung.

   Variabel lingkungan (atur di Project Settings > Environment Variables):
     IG_ACCESS_TOKEN : access token Instagram
     IG_USER_ID      : nomor akun (opsional, untuk akun bisnis)

   Contoh pemanggilan:
     GET /api/ig/posts?limit=24
   ========================================================================== */

const FIELDS = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
const CACHE_TTL = 10 * 60 * 1000; /* 10 menit */

let cache = { at: 0, data: null };

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

function buildTargets(limit) {
  const token = process.env.IG_ACCESS_TOKEN || "";
  const userId = process.env.IG_USER_ID || "";
  const list = [];

  if (userId) {
    list.push(
      "https://graph.facebook.com/v21.0/" + encodeURIComponent(userId) +
      "/media?fields=" + FIELDS + "&limit=" + limit + "&access_token=" + encodeURIComponent(token)
    );
  }
  list.push(
    "https://graph.instagram.com/me/media?fields=" + FIELDS +
    "&limit=" + limit + "&access_token=" + encodeURIComponent(token)
  );
  return list;
}

async function fetchPosts(limit) {
  const targets = buildTargets(limit);
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
        lastError = (json && json.error && json.error.message) || response.statusText;
        continue;
      }
      const items = (json.data || [])
        .map(normalise)
        .filter(function (p) { return p.src || p.thumbnail; });
      return { posts: items, updatedAt: new Date().toISOString(), source: "live-instagram" };
    } catch (error) {
      lastError = error.message;
    }
  }
  throw new Error(lastError);
}

module.exports = async function handler(req, res) {
  const token = process.env.IG_ACCESS_TOKEN || "";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (!token) {
    res.status(503).json({
      error: "IG_ACCESS_TOKEN belum diatur di Vercel",
      hint: "Tambahkan environment variable IG_ACCESS_TOKEN pada Project Settings, lalu deploy ulang."
    });
    return;
  }

  const requested = parseInt((req.query && req.query.limit) || "24", 10);
  const limit = Math.min(Math.max(requested || 24, 1), 50);

  try {
    const now = Date.now();
    if (cache.data && now - cache.at < CACHE_TTL) {
      res.status(200).json(cache.data);
      return;
    }
    const data = await fetchPosts(limit);
    cache = { at: now, data: data };
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ error: "Gagal mengambil data Instagram: " + error.message });
  }
};
