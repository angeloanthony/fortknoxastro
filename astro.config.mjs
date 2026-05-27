// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Public production URL. Used for sitemap generation and absolute-URL helpers.
  site: "https://vernalfortknoxselfstorage.com",

  // Fully static output — no server runtime. Ideal for Cloudflare Pages,
  // Vercel, or Netlify static hosting.
  output: "static",

  build: {
    // 'file' emits /about.html instead of /about/index.html. This preserves
    // the original .html URLs exactly AND keeps the original relative asset
    // paths (e.g. "pictures/logo.webp", "styles.css") valid, since every page
    // resolves at the site root rather than inside a per-page subdirectory.
    format: "file",
  },

  // Keep links exactly as authored — never auto-append or strip trailing
  // slashes, so internal .html links continue to match the emitted files.
  trailingSlash: "ignore",
});
