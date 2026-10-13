import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const DIR = join(process.cwd(), "dist");
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2",
};

http.createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = join(DIR, path === "/" ? "index.html" : path);
  try {
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    // Si no existe el archivo, devuelve index.html
    res.writeHead(200, { "Content-Type": TYPES[".html"] });
    res.end(await readFile(join(DIR, "index.html")));
  }
}).listen(PORT, () => console.log(`Sitio en http://localhost:${PORT}`));