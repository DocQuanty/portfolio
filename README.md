# Layouts archive 2020–2021

Six adaptive pages hand-coded in HTML, CSS and vanilla JavaScript, published on GitHub Pages:
https://docquanty.github.io/portfolio/

Current portfolio: https://docquanty.github.io/My-site-portfolio/

## Structure

- `index.html` + `assets/archive.css|js` — the gallery page (EN/UA, motion, scroll-through previews).
- `assets/thumbs/` — previews, regenerated from the layouts themselves (desktop 1440 px, phone 390 px).
- `assets/polish.css|js` — shared motion layer for every layout: entrance and scroll reveal,
  hover depth, scroll progress bar and the “Archive” back button. Configured per page through
  `data-*` attributes on its `<script>` tag; respects `prefers-reduced-motion`.
- `<layout>/css/fixes.css` — 2026 bug fixes, loaded after the original (minified) stylesheet,
  so the 2020–2021 code stays as it was.

`assets/` is deliberately not `_assets/`: GitHub Pages (Jekyll) skips folders that start with `_`.
