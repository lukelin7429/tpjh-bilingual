# Taibao Junior High School — Bilingual Page
# 嘉義縣立太保國民中學 · 雙語網頁

A small, static bilingual (English-primary, Chinese-supplementary) website for **Taibao Junior High School**, Taibao City, Chiayi County — built free of charge by **My Culture Connect 人師教育協會** as a gift from an alumnus to his old school.

> ⚠️ Demo / first draft. Real photos, the principal's actual words, and several details (English romanisation of the principal's name, programme specifics) are placeholders pending confirmation with the school. See the dossier in the Obsidian vault: `組織事務/人師教育協會/跨縣市學校服務/嘉義縣/太保國中/`.

## Pages

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, the town's name story, vision (熱誠・關懷・審美・健康) + 嘉教 5 讚 英語力, principal, "English at Taibao", visit/contact |
| `/around-taibao/` | **Around Taibao — Be the Guide** | ⭐ The local-flavour bilingual unit. 5 guide stops + read-aloud (🔊) + a self-check quiz |
| `/principal/` | Principal's Office | Principal 徐文成, three promises |

## Design

- **Palette:** garnet `#7A2A3A` (the cinnabar of an imperial seal — the town is named after the honorary title 太子太保) + bronze `#B07D3C` (heritage accent shared with the sister school, Taibao Elementary). Pure-white background throughout.
- **Distinct** from the sister school (ink-blue) and KangLang Elementary (coastal teal) so the schools don't look alike.
- **Type:** Playfair Display (English display) + Lato + PingFang TC. Chinese uses system fonts only.
- **Bilingual rule:** English is primary; Chinese is supplementary. Quiz options are English-only (Chinese appears only in the hint and the explanation).
- No login, no click-out, every page has a banner. Body text 20px (mobile) / 22px (desktop).

## Local content (verified)

The "Around Taibao" unit is built on real, town-specific material:
- **The name "Taibao"** — from admiral Wang De-lu's (王得祿) honorary title 太子太保. Likely the only town in Taiwan named after an official's title.
- **Southern Branch of the National Palace Museum (故宮南院)** — in Taibao, opened 2015.
- **THSR Chiayi Station (高鐵嘉義站)** — in Taibao, ~3 min from the school.
- **Chiayi County Baseball Stadium (嘉義縣立棒球場)** — in Taibao; ties to the school's sports classes.
- **County seat (嘉義縣治)** — the Chiayi County government is based in Taibao.

## To replace before launch

- `photos/hero-school.jpg` — school gate / building (no people, see `photos/README.md`)
- `photos/principal-portrait.jpg` — principal portrait
- Principal's real welcome message + confirmed English romanisation of name
- Confirm programme specifics (international-education details, English Day results) with the school

## Deploy

Static files — host on GitHub Pages (or any static host). No build step.

---

Bilingual page by [My Culture Connect 人師教育協會](https://www.mycultureconnect.org/) · provided free of charge.
