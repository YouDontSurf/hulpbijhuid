# Hulp Bij Huid — Design Spec

> A comprehensive Dutch-first medical information website about skin conditions, built with Astro.

## Domain & Identity

- **Domain:** hulpbijhuid.nl
- **Brand name:** Hulp Bij Huid
- **Language:** Dutch-first UI and content hierarchy, with full English toggle
- **Content source:** Authored in English, translated to Dutch

## Tech Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Astro (static site generation)                     |
| Language   | TypeScript                                         |
| Styling    | Tailwind CSS v4                                    |
| Content    | Astro Content Collections (Markdown + frontmatter) |
| Icons      | Astro Icon / inline SVGs                           |
| Deployment | GitHub Pages via GitHub Actions                    |
| Domain     | Custom domain via CNAME record                     |

## i18n Strategy

- **Primary language:** Dutch (NL) — site root `/`, all URLs under Dutch paths
- **Secondary language:** English (EN) — all pages under `/en/` prefix
- **Content collections:** Parallel directory trees (`content/conditions/nl/`, `content/conditions/en/`)
- **Shared UI translations:** Single `i18n/translations.ts` file per locale
- **Routing:** Astro's built-in i18n routing with `Accept-Language` detection and persistent toggle
- **SEO:** `hreflang` tags on every page pointing to both language variants

## Site Structure

### Pages / Routes

| Dutch URL                  | English URL               | Content                                |
| -------------------------- | ------------------------- | -------------------------------------- |
| `/`                        | `/en/`                    | Homepage                               |
| `/aandoeningen/`           | `/en/conditions/`         | Conditions overview (A-Z + categories) |
| `/aandoeningen/[slug]/`    | `/en/conditions/[slug]/`  | Individual condition page              |
| `/blog/`                   | `/en/blog/`               | Blog overview                          |
| `/blog/[slug]/`            | `/en/blog/[slug]/`        | Blog article                           |
| `/over-ons/`               | `/en/about/`              | About page                             |
| `/wanneer-naar-de-dokter/` | `/en/when-to-see-doctor/` | "When to see a doctor" guide           |
| `/sitemap.xml`             | —                         | Sitemap (bilingual)                    |
| `/robots.txt`              | —                         | Robots directive                       |

### Source File Structure

```
src/
├── content/
│   ├── conditions/
│   │   ├── nl/                     # Dutch condition markdown files
│   │   └── en/                     # English condition markdown files
│   ├── blog/
│   │   ├── nl/
│   │   └── en/
│   └── pages/                      # Static pages (over-ons, wanneer-naar-de-dokter)
│       ├── nl/
│       └── en/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── HeroSearch.astro
│   ├── ConditionCard.astro
│   ├── CategoryNav.astro           # Category filter sidebar
│   ├── AtoZIndex.astro             # A-Z jump navigation
│   ├── LanguageToggle.astro
│   ├── SearchBar.astro
│   ├── Breadcrumbs.astro
│   ├── RelatedConditions.astro
│   ├── FAQSection.astro            # JSON-LD FAQ structured data
│   ├── BlogCard.astro
│   ├── TableOfContents.astro
│   └── SEO.astro                   # Head meta, OG, Twitter, JSON-LD
├── layouts/
│   ├── BaseLayout.astro            # HTML shell, fonts, global styles
│   ├── ConditionLayout.astro       # Condition detail layout
│   └── PageLayout.astro            # Generic content page layout
├── i18n/
│   ├── config.ts                   # Locale definitions, routes
│   └── translations.ts             # Key-value UI translations
├── pages/
│   ├── index.astro                 # Dutch homepage
│   ├── en/
│   │   └── index.astro             # English homepage
│   ├── aandoeningen.astro          # Conditions overview
│   ├── en/
│   │   └── conditions.astro
│   ├── aandoeningen/
│   │   └── [slug].astro            # Dynamic condition
│   ├── en/
│   │   └── conditions/
│   │       └── [slug].astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── en/
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── over-ons.astro
│   ├── wanneer-naar-de-dokter.astro
│   ├── en/
│   │   ├── about.astro
│   │   └── when-to-see-doctor.astro
│   ├── sitemap.xml.ts
│   └── robots.txt.ts
├── scripts/
│   └── generate-conditions.ts      # Scaffolding script for 50 conditions
└── styles/
    └── global.css                  # Tailwind directives
```

## Visual Design

### Color Palette (Soft Clinical)

| Token                  | Value                 | Usage                |
| ---------------------- | --------------------- | -------------------- |
| `--color-bg`           | `#f8fafc` (slate-50)  | Page background      |
| `--color-surface`      | `#ffffff`             | Cards, containers    |
| `--color-primary`      | `#0d9488` (teal-600)  | Headers, links, CTAs |
| `--color-primary-dark` | `#0f766e` (teal-700)  | Hover states         |
| `--color-accent`       | `#3b82f6` (blue-500)  | Accent highlights    |
| `--color-text`         | `#1e293b` (slate-800) | Body text            |
| `--color-text-muted`   | `#64748b` (slate-500) | Secondary text       |
| `--color-border`       | `#e2e8f0` (slate-200) | Dividers, borders    |

### Typography

- **Font family:** Inter (headings + body)
- **Weights:** 400 (body), 600 (subheadings), 700 (headings)
- **Max content width:** 72rem (1152px)
- **Line height:** 1.7 (body), 1.3 (headings)

### Layout & Spacing

- **Hero section:** Full-width with gradient background, centered search
- **Category grid:** 3-column responsive → 2-col tablet → 1-col mobile
- **Condition detail:** 2-column layout (main content + sticky sidebar/ToC)
- **Spacing:** `gap-8` (2rem) between sections, `p-6` (1.5rem) card padding
- **Breakpoints:** Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## Content Model

### Condition frontmatter (YAML)

```yaml
---
title: "Eczema" # English title
title_nl: "Eczema" # Dutch title (or could be "Eczeem")
slug: "eczema"
category: "inflammatory" # Map to category key
category_nl: "ontstekingsziekten"
order: 1 # Display order in category
icon: "flame" # Icon identifier
summary: "A brief TL;DR for cards" # ~30 words
summary_nl: "Een korte samenvatting" # ~30 words Dutch
seo:
  title: "Eczema - Symptoms, Causes & Treatment | Hulp Bij Huid"
  description: "Comprehensive guide to eczema on Hulp Bij Huid..."
keywords: ["eczema", "atopic dermatitis", "skin inflammation"]
related: ["psoriasis", "contact-dermatitis"]
faq:
  - q: "Is eczema contagious?"
    a: "No, eczema is not contagious..."
published: true
---
```

### Condition content sections

Each markdown file contains:

1. **What is it?** — description
2. **Symptoms** — bullet list
3. **Causes & Risk Factors** — bullet list
4. **Treatment Options** — subsections for medical/home
5. **When to See a Doctor** — guidance
6. **FAQ** — structured from frontmatter

## SEO Strategy

### Per-page SEO (in `BaseLayout.astro`)

- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">`
- `<meta property="og:*">` (title, description, image, url, locale)
- `<meta name="twitter:*">` (card, title, description)
- `<link rel="alternate" hreflang="nl" href="...">`
- `<link rel="alternate" hreflang="en" href="...">`
- `<link rel="alternate" hreflang="x-default" href="...">`

### Structured Data (JSON-LD)

- `MedicalCondition` — per condition page
- `FAQPage` — per condition page (FAQ section)
- `BreadcrumbList` — every page
- `WebSite` — site-wide (search action)
- `MedicalWebPage` — per condition
- `Organization` — brand info
- `BlogPosting` — per blog article
- `Article` — per content page

### Technical SEO

- `sitemap.xml` — all pages with priority/canonical
- `robots.txt` — allow all crawl
- Semantic HTML5 (`<article>`, `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- `alt` text on all images
- Descriptive link text (no "click here")
- LCP-optimized (fast loading, preloaded fonts, optimized images)
- Google PageSpeed target: 95+ on all devices

## The 50 Skin Conditions

### Categories & Conditions

#### 🧬 Inflammatory & Auto-immune (8)

1. Eczema (Atopic Dermatitis)
2. Psoriasis
3. Rosacea
4. Seborrheic Dermatitis
5. Lichen Planus
6. Lupus Erythematosus (cutaneous)
7. Dermatomyositis
8. Pityriasis Rosea

#### 🦠 Infectious — Fungal (6)

9. Athlete's Foot (Tinea Pedis)
10. Ringworm (Tinea Corporis)
11. Candidiasis (Yeast Infection)
12. Jock Itch (Tinea Cruris)
13. Tinea Versicolor
14. Onychomycosis (Nail Fungus)

#### 🦠 Infectious — Bacterial (5)

15. Impetigo
16. Cellulitis
17. Folliculitis
18. Boils (Furuncles) & Carbuncles
19. Erysipelas

#### 🦠 Infectious — Viral (5)

20. Warts (Verruca)
21. Cold Sores (Herpes Simplex)
22. Shingles (Herpes Zoster)
23. Molluscum Contagiosum
24. Hand-Foot-and-Mouth Disease

#### 🎨 Pigmentary (4)

25. Vitiligo
26. Melasma
27. Post-inflammatory Hyperpigmentation
28. Albinism (Oculocutaneous)

#### 🔴 Acne & Related (5)

29. Acne Vulgaris
30. Hidradenitis Suppurativa
31. Perioral Dermatitis
32. Keratosis Pilaris
33. Milia

#### 🫘 Growths & Lesions (6)

34. Seborrheic Keratosis
35. Cherry Angioma
36. Dermatofibroma
37. Skin Tags (Acrochordons)
38. Lipoma
39. Actinic Keratosis

#### 🧴 Reactive & Allergic (5)

40. Contact Dermatitis
41. Urticaria (Hives)
42. Angioedema
43. Drug Eruptions
44. Erythema Multiforme

#### 💇 Hair & Nail (3)

45. Alopecia Areata
46. Ingrown Toenail (Onychocryptosis)
47. Dandruff (Pityriasis Capitis)

#### ☀️ Sun & Environment (3)

48. Sunburn
49. Polymorphous Light Eruption
50. Frostnip / Chilblains

### Content quality

- Each condition: 300-500 words of medically-informed content
- SEO-optimized per Google E-E-A-T guidelines
- No medical claims that overpromise — responsible health content
- Sources referenced where appropriate
- Internal links between related conditions (minimum 3 per page)

## Blog

- Blog posts linked from related conditions and homepage
- Categories: treatment, prevention, lifestyle, news, "when to see a doctor"
- Tag system for cross-referencing
- Authorship metadata
- Estimated reading time

## Performance Budget

| Metric                   | Target                |
| ------------------------ | --------------------- |
| Lighthouse Performance   | ≥ 95                  |
| First Contentful Paint   | ≤ 1.0s                |
| Largest Contentful Paint | ≤ 1.5s                |
| Total Bundle (JS)        | ≤ 50KB                |
| Total Bundle (CSS)       | ≤ 30KB                |
| Images                   | None (icon-only, SVG) |

## Deployment

- **Hosting:** GitHub Pages
- **Custom domain:** hulpbijhuid.nl (CNAME)
- **CI/CD:** GitHub Actions — build on push to `main`, deploy to `gh-pages` branch
- **SSL:** Auto via GitHub Pages + custom domain

## Future Considerations (Out of Scope v1)

- Search functionality (can use browser-native or lightweight Fuse.js)
- Print-friendly stylesheets
- Dark mode toggle
- Newsletter signup
- Doctor finder / locator
- User reviews / ratings
- Image galleries for conditions

---

_Spec approved 2026-05-04. Next step: implementation plan._
