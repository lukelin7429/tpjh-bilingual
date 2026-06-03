# photos/ — image assets for the Taibao Junior High bilingual page

Drop real images here and the pages will pick them up. Until then, the pages use
tasteful CSS-gradient placeholders, so nothing looks broken.

## Wanted

| File | Used on | Spec |
|---|---|---|
| `hero-school.jpg` | Home hero | School **gate / building / aerial** — **no people, no volatile numbers**. ≥ 1920×1080, landscape. Uncomment the `url()` line in `assets/css/main.css` `.title`. |
| `principal-portrait.jpg` | Home + `/principal/` | Principal portrait. ≥ 1200×1200, face centred near the top. |
| (optional) station photos | `/around-taibao/` | Real photos of the Palace Museum branch, the HSR station, the stadium, etc. — only with clear usage rights. |

## Rules (per project conventions)

- **Banner / hero images use buildings, gates, the school crest, or landscape — never student faces** (privacy + they don't go stale).
- **No student portraits without consent.** Do not scrape photos from Facebook.
- Use Pillow (not `sips`) if you need to fix orientation, so EXIF orientation flags don't rotate images in the browser.
