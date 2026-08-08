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
    // ── DO NOT change to 'directory'. This is load-bearing for two things. ──
    //
    // 'file' emits dist/about.html rather than dist/about/index.html. On
    // Cloudflare that *is* what produces our canonical URL architecture:
    // the asset named about.html is served at /about with a 200, and
    // Cloudflare's html_handling 308-redirects /about.html -> /about for us.
    // The .html suffix is a build-output detail crawlers never see.
    //
    // Switching to 'directory' would break both guarantees:
    //   1. No dist/about.html would exist, so the legacy /about.html URL
    //      (which Google has indexed and which external links point at)
    //      would stop redirecting and start 404ing.
    //   2. Pages would resolve at /about/index.html, so the 42 root-relative
    //      asset references in this codebase ("pictures/1.webp") would
    //      resolve to /about/pictures/1.webp and 404.
    //
    // Canonicalization is enforced by the site's *signals* — canonical tags,
    // internal links, og:url, JSON-LD, and sitemap all use extensionless
    // URLs — not by the build format.
    format: "file",
  },

  // Cloudflare already 308s /about/ -> /about; leave authored links untouched
  // so nothing competes with that rule.
  trailingSlash: "ignore",
});
