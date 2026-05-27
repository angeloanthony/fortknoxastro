# Fort Knox Self Storage — Astro

This is the Fort Knox Self Storage website migrated from a flat static HTML
site to the **Astro** framework (Astro v6, the current major version). The
migration is a faithful structural port: every page's design, content,
metadata, schema, and URL is preserved. No redesign was performed.

---

## Project structure

```
fortknox-astro/
├── astro.config.mjs        # Astro config (static output, .html URLs)
├── package.json
├── netlify.toml             # Netlify deploy config
├── vercel.json              # Vercel deploy config
├── public/                  # Served verbatim at the site root (/)
│   ├── styles.css           # The original global stylesheet (unchanged)
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   ├── favicon.ico
│   ├── _headers             # Cloudflare/Netlify caching headers
│   └── pictures/            # ← DROP YOUR IMAGE FILES HERE (see note below)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      # Universal <html>/<head>/<body> shell
│   ├── components/
│   │   ├── Header.astro          # Header + primary nav
│   │   ├── Footer.astro          # Footer with NAP + partner links
│   │   └── MobileMenuScript.astro# The original menu-toggle JS (unchanged)
│   └── pages/                    # One .astro file per original page
│       ├── index.astro           # → /  (was index.html)
│       ├── about.astro           # → /about.html
│       └── … (37 pages total)
└── docs/
    └── WEEK2_SITEMAP_AND_LINKING.html   # Original dev note (not a public page)
```

---

## ⚠️ Images

The image folder was intentionally **not** included in the migration. All
pages still reference images by their original relative paths (e.g.
`pictures/fortknoxlogo.webp`). To restore them:

1. Place every original image file into **`public/pictures/`** using the
   exact same filenames.
2. That's it — Astro serves `public/` at the site root, so
   `public/pictures/fortknoxlogo.webp` is served at `/pictures/fortknoxlogo.webp`
   and all existing references resolve. **No markup changes are needed.**

The 41 expected filenames are listed in `public/pictures/README.txt`.

---

## Commands

All commands run from the project root:

| Command           | Action                                            |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Start local dev server at `http://localhost:4321` |
| `npm run build`   | Build the production site to `./dist/`            |
| `npm run preview` | Preview the production build locally              |

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Then open http://localhost:4321/

### 3. Build for production
```bash
npm run build
```
Static output is written to `./dist/`.

### 4. Preview the production build
```bash
npm run preview
```

---

## Deployment

The site is 100% static (no server runtime), so it deploys to any static host.

### Cloudflare Pages
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22 (set `NODE_VERSION = 22` env var if needed)
The `public/_headers` file sets long-cache headers for hashed assets.

### Vercel
`vercel.json` is included. Vercel auto-detects Astro; output dir is `dist`.

### Netlify
`netlify.toml` is included (build = `npm run build`, publish = `dist`).

---

## What changed in the migration (and what didn't)

### Preserved exactly
- **All page content** — verified byte-for-byte on visible text across all 37 pages.
- **All URLs** — pages build with their original `.html` filenames
  (`build.format: "file"`), so `about.html` stays `about.html`, etc.
  `index.html` serves at `/`.
- **All SEO** — title, meta description, geo meta, Open Graph tags, canonical
  links, and JSON-LD schema are passed through verbatim per page.
- **All internal links** — 563 internal links validated, 0 broken.
- **The global stylesheet** (`styles.css`) and all page-specific inline styles.
- **The site JavaScript** — the mobile-menu / footer-year script is unchanged.
- **robots.txt, sitemap.xml, llms.txt** — copied as-is to the site root.

### Structural improvements
- **Reusable components.** The repeated header, navigation, and footer are now
  single components (`Header.astro`, `Footer.astro`) used by every page via
  `BaseLayout.astro`. Editing the nav once updates the whole site.
- **CSS bundling.** Astro automatically extracts each page's inline `<style>`
  into a minified, long-cacheable file under `/_astro/`. Faster, cached loads;
  no visual change.
- **Google Fonts link normalized.** 7 original pages were missing the font
  `<link>` (they only had a `preconnect`); the shared layout now includes the
  full font link everywhere, so typography is consistent site-wide.
- **Email normalized.** The saved `index.html` carried a Cloudflare
  email-obfuscation artifact (from being saved through the CDN). The footer now
  uses the same clean `mailto:james.richard500@gmail.com` link that the other
  36 pages already used.
- **Zero framework JavaScript shipped.** Pages contain only the original inline
  script and JSON-LD — no Astro/React runtime is sent to the browser.

### Notes
- `WEEK2_SITEMAP_AND_LINKING.html` was a developer working note (sitemap XML
  snippets), not a public page. It is kept in `docs/` and excluded from the build.
- The handful of pages that carried an extra contextual nav link (e.g.
  `storage-near-me.html` → "Storage Near Duchesne") preserve that link via the
  `extraNavLinks` prop on the header.

---

Built with [Astro](https://astro.build).

---

## Mobile polish (`public/mobile-polish.css`)

An **additive, fully reversible** mobile stylesheet is loaded after
`styles.css`. Every rule is wrapped in a `max-width` media query (390px and
360px), so **desktop and tablet are byte-for-byte unchanged**. To revert
completely, delete the one `<link rel="stylesheet" href="/mobile-polish.css">`
line in `src/layouts/BaseLayout.astro`.

What it fixes, phones only:
- **Hero "no fees" badge overflow** — the index hero used inline
  `position:absolute; left:-350px`, which pushed the image off-screen and could
  cause horizontal scroll / mobile-usability failures. It's hidden on phones
  (the safe in-flow copy on the no-hidden-fees page is untouched).
- **Oversized headings / spacing** — large fixed font sizes and desktop section
  padding are capped with `clamp()`-based sizes and tighter padding.
- **Button groups** — CTA clusters stack full-width with comfortable 48px tap
  targets and wrap long labels instead of overflowing.
- **Maps / video** — the Google Maps embeds (`.location-map`, fixed 450px tall)
  shrink to 260px (220px under 360px); the hero video already used a responsive
  16:9 wrapper and is left as-is.
- **Tables** — the existing `overflow-x: auto` scroll pattern is **preserved**
  (good for SEO and keeps table markup intact). A soft right-edge fade is added
  as a swipe affordance, with a "← swipe →" hint on the narrowest screens, plus
  slightly tighter font/padding so more columns fit before scrolling.

Intentionally **not** done (per discussion): no inline-style migration (large
refactor, little mobile payoff) and no card-collapse table rewrite (changes
markup/semantics). Both remain easy to add later.
