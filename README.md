# Ashby Super Market

Static site for **Ashby Super Market** — 2948 Martin Luther King Jr Way, Berkeley, CA 94703.

A family-run corner store across from Ashby BART. Boar's Head deli, organic milk, a wall of exotic sodas, and a boba stand.

## Deploy (GitHub Pages)

This is a plain static site — no build step.

1. Push these files to a repo (e.g. `ashbysupermarket/ashbysupermarket.github.io` or any repo).
2. In **Settings → Pages**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` · `/ (root)`
3. Wait ~1 minute. Your site will be live at the URL shown on that page.
4. Current Pages URL: `https://colinbrauns.github.io/ashbysupermarket/`. Do not add a `CNAME` until the custom domain is ready.

The `.nojekyll` file is included so GitHub Pages serves files starting with `_` correctly and skips Jekyll processing.

## Files

| File | What it is |
|------|------------|
| `index.html` | Page shell, fonts, design tokens, Babel loader |
| `data.jsx` | Store details, sandwich menu, aisle list, reviews |
| `components.jsx` | Marquee, nav, hero, feature strip |
| `sections.jsx` | Sandwiches, aisles, visit, reviews, family, footer |
| `app.jsx` | Root + Tweaks panel wiring |
| `tweaks-panel.jsx` | Floating tweaks controls (palette / font / sticker) |
| `robots.txt` / `sitemap.xml` | Search crawler hints |
| `favicon.svg` / `og-image.svg` | Browser icon and social preview artwork |
| `404.html` | Lightweight not-found page |

## Editing

Open `index.html` in any browser. Edit text directly in the source files — no build step required.

## License

Site code: do what you like. Brand and content belong to Ashby Super Market.
