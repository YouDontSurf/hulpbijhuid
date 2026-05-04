# Hulp Bij Huid — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Dutch-first, SEO-optimized Astro static site with 50 skin condition pages, bilingual content, and GitHub Pages deployment.

**Architecture:** Astro SSG with TypeScript, Tailwind CSS v4 via Vite plugin, content collections for conditions/blog/pages, i18n via parallel directory trees and Astro's routing, comprehensive JSON-LD structured data per page, generated sitemap.

**Tech Stack:** Astro 6.x, TypeScript, Tailwind CSS v4, @astrojs/sitemap, @tailwindcss/vite, GitHub Actions + Pages

---

## File Structure (Complete)

```
hulpbijhuid/
├── astro.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts          # Minimal for v4 — just content paths
├── CNAME                         # hulpbijhuid.nl
├── public/
│   ├── favicon.svg
│   └── robots.txt               # Static robots.txt
├── src/
│   ├── content/
│   │   ├── conditions/
│   │   │   ├── nl/              # 50 Dutch .md files
│   │   │   └── en/              # 50 English .md files
│   │   ├── blog/
│   │   │   ├── nl/              # Blog posts Dutch
│   │   │   └── en/              # Blog posts English
│   │   └── pages/
│   │       ├── nl/              # Static page content (NL)
│   │       └── en/              # Static page content (EN)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HeroSearch.astro
│   │   ├── ConditionCard.astro
│   │   ├── CategoryNav.astro
│   │   ├── AtoZIndex.astro
│   │   ├── LanguageToggle.astro
│   │   ├── SearchBar.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── RelatedConditions.astro
│   │   ├── FAQSection.astro
│   │   ├── BlogCard.astro
│   │   ├── TableOfContents.astro
│   │   └── SEO.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ConditionLayout.astro
│   │   └── PageLayout.astro
│   ├── i18n/
│   │   ├── config.ts
│   │   └── translations.ts
│   ├── pages/
│   │   ├── index.astro                     # Dutch homepage "/"
│   │   ├── aandoeningen/
│   │   │   ├── index.astro                 # "/aandoeningen/"
│   │   │   └── [slug].astro               # "/aandoeningen/[slug]/"
│   │   ├── blog/
│   │   │   ├── index.astro                 # "/blog/"
│   │   │   └── [slug].astro               # "/blog/[slug]/"
│   │   ├── over-ons.astro                  # "/over-ons/"
│   │   ├── wanneer-naar-de-dokter.astro    # "/wanneer-naar-de-dokter/"
│   │   ├── sitemap.xml.ts                  # "/sitemap.xml"
│   │   └── en/
│   │       ├── index.astro                 # "/en/"
│   │       ├── conditions/
│   │       │   ├── index.astro             # "/en/conditions/"
│   │       │   └── [slug].astro           # "/en/conditions/[slug]/"
│   │       ├── blog/
│   │       │   ├── index.astro
│   │       │   └── [slug].astro
│   │       ├── about.astro                 # "/en/about/"
│   │       └── when-to-see-doctor.astro   # "/en/when-to-see-doctor/"
│   └── styles/
│       └── global.css                      # Tailwind v4 imports + custom theme
├── scripts/
│   └── generate-conditions.ts
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.ts`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`

- [ ] **Step 1: Initialize package.json**

```bash
cd /root/hulpbijhuid && npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
cd /root/hulpbijhuid && npm install astro @astrojs/sitemap @tailwindcss/vite tailwindcss
```

- [ ] **Step 3: Write package.json with scripts**

Edit `package.json`:

```json
{
  "name": "hulpbijhuid",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "generate": "tsx scripts/generate-conditions.ts"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.2",
    "@tailwindcss/vite": "^4.2.4",
    "astro": "^6.2.2",
    "tailwindcss": "^4.2.4"
  },
  "devDependencies": {
    "tsx": "^4.0.0"
  }
}
```

```bash
cd /root/hulpbijhuid && npm install
```

- [ ] **Step 4: Write tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Write astro.config.ts**

```typescript
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://hulpbijhuid.nl",
  integrations: [sitemap({
    i18n: {
      defaultLocale: "nl",
      locales: {
        nl: "nl-NL",
        en: "en-US",
      },
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

- [ ] **Step 6: Write global.css with Tailwind v4 imports**

```css
@import "tailwindcss";

@theme {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-primary: #0d9488;
  --color-primary-dark: #0f766e;
  --color-accent: #3b82f6;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.7;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  font-weight: 700;
  color: var(--color-text);
}

a {
  color: var(--color-primary);
  transition: color 0.15s ease;
}
a:hover {
  color: var(--color-primary-dark);
}
```

- [ ] **Step 7: Write favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0d9488"/>
  <text x="16" y="23" text-anchor="middle" font-size="20" font-family="sans-serif" fill="white" font-weight="bold">H</text>
</svg>
```

- [ ] **Step 8: Write robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://hulpbijhuid.nl/sitemap.xml
```

- [ ] **Step 9: Verify project builds**

```bash
cd /root/hulpbijhuid && npm run build
```

Expected: Build succeeds (empty site, no pages yet).

- [ ] **Step 10: Commit**

```bash
cd /root/hulpbijhuid
git add package.json package-lock.json tsconfig.json astro.config.ts src/styles/global.css public/
git commit -m "chore: scaffold Astro project with Tailwind CSS v4 and dependencies"
```

---

## Task 2: i18n Infrastructure

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/translations.ts`

- [ ] **Step 1: Write i18n config**

```typescript
// src/i18n/config.ts
export const defaultLocale = "nl" as const;
export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

export interface LocalizedRoute {
  nl: string;
  en: string;
}

export const routeMap: Record<string, LocalizedRoute> = {
  home: { nl: "/", en: "/en/" },
  conditions: { nl: "/aandoeningen/", en: "/en/conditions/" },
  blog: { nl: "/blog/", en: "/en/blog/" },
  about: { nl: "/over-ons/", en: "/en/about/" },
  doctor: { nl: "/wanneer-naar-de-dokter/", en: "/en/when-to-see-doctor/" },
};

export function getLocalizedPath(path: string, targetLocale: Locale, currentLocale: Locale): string {
  // Strip locale prefix if present
  let stripped = path;
  if (currentLocale !== "nl") {
    stripped = path.replace(`/${currentLocale}`, "") || "/";
  }
  if (targetLocale === "nl") return stripped;
  return `/${targetLocale}${stripped === "/" ? "/" : stripped}`;
}

export function getAlternateUrls(path: string, currentLocale: Locale = "nl"): { nl: string; en: string } {
  return {
    nl: getLocalizedPath(path, "nl", currentLocale),
    en: getLocalizedPath(path, "en", currentLocale),
  };
}
```

- [ ] **Step 2: Write UI translations**

```typescript
// src/i18n/translations.ts
import type { Locale } from "./config";

type TranslationKey = keyof typeof translations.nl;

export const translations = {
  nl: {
    siteName: "Hulp Bij Huid",
    siteDescription: "Complete gids over huidaandoeningen, symptomen en behandelingen",
    home: "Home",
    conditions: "Aandoeningen",
    blog: "Blog",
    about: "Over ons",
    doctor: "Wanneer naar de dokter",
    allConditions: "Alle aandoeningen",
    searchPlaceholder: "Zoek naar een huidaandoening...",
    readMore: "Lees meer",
    symptoms: "Symptomen",
    causes: "Oorzaken & Risicofactoren",
    treatments: "Behandelingen",
    whenToSeeDoctor: "Wanneer naar de dokter",
    frequentlyAsked: "Veelgestelde vragen",
    relatedConditions: "Gerelateerde aandoeningen",
    categories: "Categorieën",
    azIndex: "A-Z Index",
    noResults: "Geen resultaten gevonden",
    lastUpdated: "Laatst bijgewerkt",
    readingTime: "min leestijd",
    onThisPage: "Op deze pagina",
    backToConditions: "Terug naar aandoeningen",
    backToBlog: "Terug naar blog",
    sharePage: "Deel deze pagina",
  },
  en: {
    siteName: "Hulp Bij Huid",
    siteDescription: "Complete guide to skin conditions, symptoms and treatments",
    home: "Home",
    conditions: "Conditions",
    blog: "Blog",
    about: "About",
    doctor: "When to see a doctor",
    allConditions: "All conditions",
    searchPlaceholder: "Search for a skin condition...",
    readMore: "Read more",
    symptoms: "Symptoms",
    causes: "Causes & Risk Factors",
    treatments: "Treatments",
    whenToSeeDoctor: "When to see a doctor",
    frequentlyAsked: "Frequently asked questions",
    relatedConditions: "Related conditions",
    categories: "Categories",
    azIndex: "A-Z Index",
    noResults: "No results found",
    lastUpdated: "Last updated",
    readingTime: "min read",
    onThisPage: "On this page",
    backToConditions: "Back to conditions",
    backToBlog: "Back to blog",
    sharePage: "Share this page",
  },
} as const;

export function t(key: TranslationKey, locale: Locale = "nl"): string {
  return translations[locale][key] ?? translations.nl[key] ?? key;
}
```

- [ ] **Step 3: Verify TypeScript compilation**

```bash
cd /root/hulpbijhuid && npx astro check 2>&1 || true
```

- [ ] **Step 4: Commit**

```bash
cd /root/hulpbijhuid
git add src/i18n/
git commit -m "feat: add i18n infrastructure with Dutch/English translations"
```

---

## Task 3: Content Collections — Schema & Config

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Write content collection config with all schemas**

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const conditionSchema = z.object({
  title: z.string(),
  title_nl: z.string(),
  slug: z.string(),
  category: z.string(),
  category_nl: z.string(),
  order: z.number().default(100),
  icon: z.string().default("stethoscope"),
  summary: z.string(),
  summary_nl: z.string().optional(),
  seo_title: z.string(),
  seo_description: z.string(),
  keywords: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  published: z.boolean().default(true),
  updated: z.date().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  title_nl: z.string().optional(),
  slug: z.string(),
  category: z.string().default("algemeen"),
  category_nl: z.string().default("algemeen"),
  tags: z.array(z.string()).default([]),
  summary: z.string(),
  summary_nl: z.string().optional(),
  seo_title: z.string(),
  seo_description: z.string(),
  author: z.string().default("Hulp Bij Huid"),
  published: z.boolean().default(true),
  date: z.date(),
  updated: z.date().optional(),
  readingTime: z.number().default(5),
});

const pageSchema = z.object({
  title: z.string(),
  title_nl: z.string().optional(),
  seo_title: z.string(),
  seo_description: z.string(),
  published: z.boolean().default(true),
});

export const collections = {
  conditions_nl: defineCollection({ schema: conditionSchema }),
  conditions_en: defineCollection({ schema: conditionSchema }),
  blog_nl: defineCollection({ schema: blogSchema }),
  blog_en: defineCollection({ schema: blogSchema }),
  pages_nl: defineCollection({ schema: pageSchema }),
  pages_en: defineCollection({ schema: pageSchema }),
};
```

- [ ] **Step 2: Create content directories**

```bash
mkdir -p /root/hulpbijhuid/src/content/conditions/nl
mkdir -p /root/hulpbijhuid/src/content/conditions/en
mkdir -p /root/hulpbijhuid/src/content/blog/nl
mkdir -p /root/hulpbijhuid/src/content/blog/en
mkdir -p /root/hulpbijhuid/src/content/pages/nl
mkdir -p /root/hulpbijhuid/src/content/pages/en
```

- [ ] **Step 3: Commit**

```bash
cd /root/hulpbijhuid
git add src/content/
git commit -m "feat: add content collection schemas and directories"
```

---

## Task 4: SEO Component with JSON-LD Structured Data

**Files:**
- Create: `src/components/SEO.astro`

- [ ] **Step 1: Write comprehensive SEO component**

```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  canonicalURL: URL;
  ogImage?: string;
  ogType?: "website" | "article" | "medicalwebpage";
  locale?: "nl" | "en";
  alternateNl?: string;
  alternateEn?: string;
  xDefault?: string;
  noindex?: boolean;
  jsonLd?: object[];
  keywords?: string[];
}

const {
  title,
  description,
  canonicalURL,
  ogImage,
  ogType = "website",
  locale = "nl",
  alternateNl,
  alternateEn,
  xDefault,
  noindex = false,
  jsonLd = [],
  keywords = [],
} = Astro.props;

const ogLocale = locale === "nl" ? "nl_NL" : "en_US";
const siteName = "Hulp Bij Huid";
---

<!-- Primary Meta -->
<title>{title}</title>
<meta name="description" content={description} />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta charset="UTF-8" />
<link rel="canonical" href={canonicalURL.href} />

<!-- Robots -->
{noindex && <meta name="robots" content="noindex, follow" />}

<!-- Keywords -->
{keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}

<!-- OG -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content={ogType} />
<meta property="og:url" content={canonicalURL.href} />
<meta property="og:site_name" content={siteName} />
<meta property="og:locale" content={ogLocale} />
{ogImage && <meta property="og:image" content={ogImage} />}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{ogImage && <meta name="twitter:image" content={ogImage} />}

<!-- hreflang -->
{alternateNl && <link rel="alternate" hreflang="nl" href={alternateNl} />}
{alternateEn && <link rel="alternate" hreflang="en" href={alternateEn} />}
{xDefault && <link rel="alternate" hreflang="x-default" href={xDefault} />}

<!-- JSON-LD Structured Data -->
{jsonLd.map((item) => (
  <script type="application/ld+json" set:html={JSON.stringify(item)} />
))}
```

- [ ] **Step 2: Commit**

```bash
cd /root/hulpbijhuid
git add src/components/SEO.astro
git commit -m "feat: add comprehensive SEO component with JSON-LD support"
```

---

## Task 5: Base Layout & UI Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/LanguageToggle.astro`
- Create: `src/components/Breadcrumbs.astro`

- [ ] **Step 1: Write Header component**

```astro
---
// src/components/Header.astro
import { t } from "../i18n/translations";
import LanguageToggle from "./LanguageToggle.astro";
import type { Locale } from "../i18n/config";

interface Props {
  locale?: Locale;
  currentPath?: string;
}
const { locale = "nl", currentPath = "/" } = Astro.props;
const getHref = (path: string) => locale === "nl" ? path : `/${locale}${path === "/" ? "/" : path}`;
---

<header class="bg-white border-b border-border sticky top-0 z-50">
  <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href={getHref("/")} class="flex items-center gap-2 font-bold text-xl text-primary no-underline hover:text-primary-dark transition-colors">
        <span class="bg-primary text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold">H</span>
        {t("siteName", locale)}
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-6">
        <a href={getHref("/aandoeningen/")} class="text-text hover:text-primary transition-colors font-medium text-sm">
          {t("conditions", locale)}
        </a>
        <a href={getHref("/blog/")} class="text-text hover:text-primary transition-colors font-medium text-sm">
          {t("blog", locale)}
        </a>
        <a href={getHref("/wanneer-naar-de-dokter/")} class="text-text hover:text-primary transition-colors font-medium text-sm">
          {t("doctor", locale)}
        </a>
        <a href={getHref("/over-ons/")} class="text-text hover:text-primary transition-colors font-medium text-sm">
          {t("about", locale)}
        </a>
        <LanguageToggle locale={locale} currentPath={currentPath} />
      </div>

      <!-- Mobile hamburger -->
      <div class="md:hidden flex items-center gap-3">
        <LanguageToggle locale={locale} currentPath={currentPath} />
        <button id="mobile-menu-btn" class="text-text p-2" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-border pt-4">
      <div class="flex flex-col gap-3">
        <a href={getHref("/aandoeningen/")} class="text-text hover:text-primary font-medium">{t("conditions", locale)}</a>
        <a href={getHref("/blog/")} class="text-text hover:text-primary font-medium">{t("blog", locale)}</a>
        <a href={getHref("/wanneer-naar-de-dokter/")} class="text-text hover:text-primary font-medium">{t("doctor", locale)}</a>
        <a href={getHref("/over-ons/")} class="text-text hover:text-primary font-medium">{t("about", locale)}</a>
      </div>
    </div>
  </nav>
</header>

<script>
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
</script>
```

- [ ] **Step 2: Write Footer component**

```astro
---
// src/components/Footer.astro
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";

interface Props { locale?: Locale; }
const { locale = "nl" } = Astro.props;
const getHref = (path: string) => locale === "nl" ? path : `/${locale}${path === "/" ? "/" : path}`;
---

<footer class="bg-white border-t border-border mt-16">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Brand -->
      <div>
        <a href={getHref("/")} class="flex items-center gap-2 font-bold text-lg text-primary no-underline mb-3">
          <span class="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">H</span>
          {t("siteName", locale)}
        </a>
        <p class="text-text-muted text-sm">{t("siteDescription", locale)}</p>
      </div>
      <!-- Links -->
      <div>
        <h3 class="font-semibold text-sm mb-3 text-text">{t("conditions", locale)}</h3>
        <ul class="space-y-2 text-sm">
          <li><a href={getHref("/aandoeningen/")} class="text-text-muted hover:text-primary">{t("allConditions", locale)}</a></li>
          <li><a href={getHref("/wanneer-naar-de-dokter/")} class="text-text-muted hover:text-primary">{t("doctor", locale)}</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-sm mb-3 text-text">{locale === "nl" ? "Informatie" : "Information"}</h3>
        <ul class="space-y-2 text-sm">
          <li><a href={getHref("/over-ons/")} class="text-text-muted hover:text-primary">{t("about", locale)}</a></li>
          <li><a href={getHref("/blog/")} class="text-text-muted hover:text-primary">{t("blog", locale)}</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-sm mb-3 text-text">{locale === "nl" ? "Disclaimer" : "Disclaimer"}</h3>
        <p class="text-text-muted text-xs leading-relaxed">
          {locale === "nl"
            ? "De informatie op Hulp Bij Huid is uitsluitend voor educatieve doeleinden. Raadpleeg altijd een arts voor medisch advies."
            : "The information on Hulp Bij Huid is for educational purposes only. Always consult a doctor for medical advice."}
        </p>
      </div>
    </div>
    <div class="border-t border-border mt-8 pt-6 text-center text-xs text-text-muted">
      &copy; {new Date().getFullYear()} {t("siteName", locale)}. {locale === "nl" ? "Alle rechten voorbehouden." : "All rights reserved."}
    </div>
  </div>
</footer>
```

- [ ] **Step 3: Write LanguageToggle component**

```astro
---
// src/components/LanguageToggle.astro
import { localeNames, localeFlags, getLocalizedPath } from "../i18n/config";
import type { Locale } from "../i18n/config";

interface Props {
  locale: Locale;
  currentPath: string;
}
const { locale: currentLocale, currentPath } = Astro.props;
const otherLocale: Locale = currentLocale === "nl" ? "en" : "nl";
const href = getLocalizedPath(currentPath, otherLocale, currentLocale);
---

<a
  href={href}
  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-white hover:bg-bg transition-colors no-underline"
  title={localeNames[otherLocale]}
>
  <span>{localeFlags[otherLocale]}</span>
  <span class="hidden sm:inline">{localeNames[otherLocale]}</span>
</a>
```

- [ ] **Step 4: Write Breadcrumbs component**

```astro
---
// src/components/Breadcrumbs.astro
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";

interface Crumb { label: string; href?: string; }
interface Props {
  crumbs: Crumb[];
  locale?: Locale;
}
const { crumbs, locale = "nl" } = Astro.props;
const getHref = (path: string) => locale === "nl" ? path : `/${locale}${path}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: t("home", locale), item: getHref("/") },
    ...crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: c.label,
      ...(c.href ? { item: getHref(c.href) } : {}),
    })),
  ],
};
---

<nav aria-label="Breadcrumb" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
  <ol class="flex items-center gap-1.5 text-sm text-text-muted flex-wrap">
    <li>
      <a href={getHref("/")} class="hover:text-primary transition-colors">{t("home", locale)}</a>
    </li>
    {crumbs.map((c) => (
      <li class="flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        {c.href ? (
          <a href={getHref(c.href)} class="hover:text-primary transition-colors">{c.label}</a>
        ) : (
          <span class="text-text font-medium">{c.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 5: Write BaseLayout**

```astro
---
// src/layouts/BaseLayout.astro
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import SEO from "../components/SEO.astro";
import type { Locale } from "../i18n/config";

interface Props {
  title: string;
  description: string;
  locale?: Locale;
  canonicalURL: URL;
  alternateNl?: string;
  alternateEn?: string;
  xDefault?: string;
  ogType?: "website" | "article" | "medicalwebpage";
  ogImage?: string;
  jsonLd?: object[];
  noindex?: boolean;
  keywords?: string[];
  currentPath?: string;
}

const {
  title, description, locale = "nl", canonicalURL,
  alternateNl, alternateEn, xDefault,
  ogType, ogImage, jsonLd = [], noindex, keywords, currentPath = "/",
} = Astro.props;
---

<!DOCTYPE html>
<html lang={locale === "nl" ? "nl-NL" : "en-US"} dir="ltr">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <SEO
      title={title}
      description={description}
      canonicalURL={canonicalURL}
      ogType={ogType}
      ogImage={ogImage}
      locale={locale}
      alternateNl={alternateNl}
      alternateEn={alternateEn}
      xDefault={xDefault}
      noindex={noindex}
      jsonLd={jsonLd}
      keywords={keywords}
    />
  </head>
  <body class="min-h-screen flex flex-col bg-bg antialiased">
    <Header locale={locale} currentPath={currentPath} />
    <main class="flex-1">
      <slot />
    </main>
    <Footer locale={locale} />
  </body>
</html>
```

- [ ] **Step 6: Commit**

```bash
cd /root/hulpbijhuid
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/components/LanguageToggle.astro src/components/Breadcrumbs.astro
git commit -m "feat: add base layout with header, footer, language toggle, and breadcrumbs"
```

---

## Task 6: Homepage

**Files:**
- Create: `src/pages/index.astro` (Dutch homepage)
- Create: `src/pages/en/index.astro` (English homepage)
- Create: `src/components/HeroSearch.astro`
- Create: `src/components/CategoryNav.astro`
- Create: `src/components/ConditionCard.astro`
- Create: `src/components/SearchBar.astro`
- Create: `static conditions page content`: `src/content/pages/nl/home.md`, `src/content/pages/en/home.md`

- [ ] **Step 1: Write SearchBar component**

```astro
---
// src/components/SearchBar.astro
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";
interface Props { locale?: Locale; }
const { locale = "nl" } = Astro.props;
---

<div class="relative w-full max-w-xl">
  <input
    type="text"
    id="search-input"
    placeholder={t("searchPlaceholder", locale)}
    class="w-full px-5 py-4 pl-12 rounded-xl border border-border bg-white text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base shadow-sm"
    autocomplete="off"
  />
  <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <div id="search-results" class="absolute top-full mt-2 left-0 right-0 bg-white border border-border rounded-xl shadow-lg overflow-hidden hidden z-50 max-h-80 overflow-y-auto"></div>
</div>

<script>
  interface ConditionItem { title: string; slug: string; category: string; summary: string; }
  const input = document.getElementById("search-input") as HTMLInputElement;
  const results = document.getElementById("search-results") as HTMLElement;
  if (!input || !results) throw new Error("Search elements missing");

  let conditions: ConditionItem[] = [];

  async function loadConditions() {
    const resp = await fetch("/search-index.json");
    if (resp.ok) conditions = await resp.json();
  }
  loadConditions();

  function filter(query: string): ConditionItem[] {
    const q = query.toLowerCase();
    return conditions.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q)
    ).slice(0, 8);
  }

  function render(items: ConditionItem[]) {
    if (items.length === 0) {
      results.innerHTML = `<div class="p-4 text-sm text-text-muted">${input.dataset.noResults || "Geen resultaten"}</div>`;
    } else {
      results.innerHTML = items.map(c => `
        <a href="${c.slug}" class="block px-4 py-3 hover:bg-bg transition-colors border-b border-border last:border-0">
          <div class="font-medium text-text text-sm">${c.title}</div>
          <div class="text-xs text-text-muted mt-0.5">${c.category}</div>
        </a>`).join("");
    }
    results.classList.remove("hidden");
  }

  input.addEventListener("input", () => {
    const val = input.value.trim();
    if (val.length < 2) { results.classList.add("hidden"); return; }
    render(filter(val));
  });

  input.addEventListener("focus", () => {
    const val = input.value.trim();
    if (val.length >= 2) render(filter(val));
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target as Node) && !results.contains(e.target as Node)) {
      results.classList.add("hidden");
    }
  });
</script>
```

- [ ] **Step 2: Write HeroSearch component**

```astro
---
// src/components/HeroSearch.astro
import SearchBar from "./SearchBar.astro";
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";
interface Props { locale?: Locale; }
const { locale = "nl" } = Astro.props;
---

<section class="bg-gradient-to-br from-primary/10 via-white to-blue-50 py-16 sm:py-20 lg:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 tracking-tight">
      {locale === "nl" ? "Uw complete gids voor" : "Your complete guide to"}
      <span class="text-primary block mt-1">{locale === "nl" ? "huidaandoeningen" : "skin conditions"}</span>
    </h1>
    <p class="text-text-muted text-lg max-w-2xl mx-auto mb-8">
      {locale === "nl"
        ? "Betrouwbare informatie over symptomen, oorzaken en behandelingen van meer dan 50 huidaandoeningen. Duidelijk, deskundig en altijd up-to-date."
        : "Reliable information about symptoms, causes and treatments for over 50 skin conditions. Clear, expert and always up-to-date."}
    </p>
    <div class="flex justify-center">
      <SearchBar locale={locale} />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write ConditionCard component**

```astro
---
// src/components/ConditionCard.astro
interface Props {
  title: string;
  slug: string;
  category: string;
  summary: string;
  icon?: string;
}
const { title, slug, summary, category } = Astro.props;
---

<a href={slug} class="block bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200 group no-underline">
  <div class="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{category}</div>
  <h3 class="font-semibold text-text mb-2 group-hover:text-primary transition-colors">{title}</h3>
  <p class="text-sm text-text-muted line-clamp-2">{summary}</p>
</a>
```

- [ ] **Step 4: Write CategoryNav component**

```astro
---
// src/components/CategoryNav.astro
import type { Locale } from "../i18n/config";

interface Category {
  key: string;
  name: string;
  icon: string;
  count: number;
}

interface Props {
  categories: Category[];
  locale?: Locale;
  activeCategory?: string;
}

const { categories, locale = "nl", activeCategory } = Astro.props;
const allLabel = locale === "nl" ? "Alle" : "All";
const getCatHref = (key: string) => {
  const base = locale === "nl" ? "/aandoeningen/" : "/en/conditions/";
  return key ? `${base}?categorie=${key}` : base;
};
---

<div class="flex flex-wrap gap-2">
  <a
    href={getCatHref("")}
    class={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? "bg-primary text-white" : "bg-white text-text border border-border hover:bg-bg"}`}
  >
    {allLabel} ({categories.reduce((s, c) => s + c.count, 0)})
  </a>
  {categories.map((cat) => (
    <a
      href={getCatHref(cat.key)}
      class={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === cat.key ? "bg-primary text-white" : "bg-white text-text border border-border hover:bg-bg"}`}
    >
      <span>{cat.icon}</span>
      <span>{cat.name}</span>
      <span class="opacity-70">({cat.count})</span>
    </a>
  ))}
</div>
```

- [ ] **Step 5: Write Dutch homepage**

```astro
---
// src/pages/index.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import HeroSearch from "../components/HeroSearch.astro";
import ConditionCard from "../components/ConditionCard.astro";
import { getCollection } from "astro:content";
import { translations, t } from "../i18n/translations";
import type { Locale } from "../i18n/config";

const locale: Locale = "nl";
const conditions = await getCollection("conditions_nl", ({ data }) => data.published);
conditions.sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));
const featured = conditions.slice(0, 12);

const canonicalURL = new URL("https://hulpbijhuid.nl/");
const alternateUrl = "https://hulpbijhuid.nl/en/";

const jsonLd = [{
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hulp Bij Huid",
  url: canonicalURL.href,
  description: translations.nl.siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://hulpbijhuid.nl/aandoeningen/?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
}];
---

<BaseLayout
  title="Hulp Bij Huid — Complete Gids voor Huidaandoeningen"
  description="Betrouwbare informatie over symptomen, oorzaken en behandelingen van meer dan 50 huidaandoeningen. Duidelijk, deskundig en altijd up-to-date."
  locale="nl"
  canonicalURL={canonicalURL}
  alternateEn={alternateUrl}
  xDefault="https://hulpbijhuid.nl/"
  ogType="website"
  jsonLd={jsonLd}
  currentPath="/"
>
  <HeroSearch locale="nl" />

  <!-- Featured Conditions Grid -->
  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold text-text mb-3">Ontdek alle huidaandoeningen</h2>
      <p class="text-text-muted max-w-xl mx-auto">Een overzicht van de meest voorkomende huidaandoeningen. Klik op een aandoening voor symptomen, oorzaken en behandelingen.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featured.map((c) => (
        <ConditionCard
          title={c.data.title_nl || c.data.title}
          slug={`/aandoeningen/${c.data.slug}/`}
          category={c.data.category_nl}
          summary={c.data.summary_nl || c.data.summary}
        />
      ))}
    </div>
    <div class="text-center mt-10">
      <a href="/aandoeningen/" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors">
        {t("allConditions", locale)}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </section>

  <!-- Quick Info Sections -->
  <section class="bg-white border-y border-border">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <h3 class="font-bold text-text mb-2">Symptomen Herkennen</h3>
          <p class="text-sm text-text-muted">Leer veelvoorkomende huidproblemen herkennen aan hun symptomen en kenmerken.</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h3 class="font-bold text-text mb-2">Behandelingen</h3>
          <p class="text-sm text-text-muted">Ontdek welke behandelingen beschikbaar zijn, van zelfzorg tot medische opties.</p>
        </div>
        <div class="text-center">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h3 class="font-bold text-text mb-2">Wanneer Naar de Dokter?</h3>
          <p class="text-sm text-text-muted">Lees wanneer een huidprobleem medische aandacht vereist en wat je kunt verwachten.</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 6: Write English homepage**

```astro
---
// src/pages/en/index.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import HeroSearch from "../../components/HeroSearch.astro";
import ConditionCard from "../../components/ConditionCard.astro";
import { getCollection } from "astro:content";
import { t } from "../../i18n/translations";
import type { Locale } from "../../i18n/config";

const locale: Locale = "en";
const conditions = await getCollection("conditions_en", ({ data }) => data.published);
conditions.sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));
const featured = conditions.slice(0, 12);

const canonicalURL = new URL("https://hulpbijhuid.nl/en/");
const alternateUrl = "https://hulpbijhuid.nl/";
---

<BaseLayout
  title="Hulp Bij Huid — Complete Guide to Skin Conditions"
  description="Reliable information about symptoms, causes and treatments for over 50 skin conditions. Clear, expert and always up-to-date."
  locale="en"
  canonicalURL={canonicalURL}
  alternateNl={alternateUrl}
  xDefault="https://hulpbijhuid.nl/"
  ogType="website"
  jsonLd={[{ "@context": "https://schema.org", "@type": "WebSite", name: "Hulp Bij Huid", url: canonicalURL.href, description: "Complete guide to skin conditions, symptoms and treatments", potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://hulpbijhuid.nl/en/conditions/?q={search_term_string}" }, "query-input": "required name=search_term_string" } }]}
  currentPath="/en/"
>
  <HeroSearch locale="en" />

  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold text-text mb-3">Discover All Skin Conditions</h2>
      <p class="text-text-muted max-w-xl mx-auto">An overview of the most common skin conditions. Click on a condition for symptoms, causes and treatments.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featured.map((c) => (
        <ConditionCard
          title={c.data.title}
          slug={`/en/conditions/${c.data.slug}/`}
          category={c.data.category}
          summary={c.data.summary}
        />
      ))}
    </div>
    <div class="text-center mt-10">
      <a href="/en/conditions/" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors">
        {t("allConditions", locale)}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Verify site builds**

```bash
cd /root/hulpbijhuid && npm run build
```

Note: Build will show warnings about empty collections — that's OK. Add a sample condition file to test:

```bash
mkdir -p /root/hulpbijhuid/src/content/conditions/nl
cat > /root/hulpbijhuid/src/content/conditions/nl/test.md << 'EOF'
---
title: "Test Condition"
title_nl: "Test Aandoening"
slug: "test"
category: "test"
category_nl: "test"
order: 1
icon: "stethoscope"
summary: "A test condition summary"
summary_nl: "Een test aandoening samenvatting"
seo_title: "Test Condition | Hulp Bij Huid"
seo_description: "Test description"
keywords: ["test"]
related: []
faq: []
published: true
---
# Test Condition

Test content.
EOF
```

Run build again:

```bash
cd /root/hulpbijhuid && npm run build
```

Expected: Build succeeds.

- [ ] **Step 8: Commit**

```bash
cd /root/hulpbijhuid
git add src/pages/index.astro src/pages/en/index.astro src/components/HeroSearch.astro src/components/SearchBar.astro src/components/ConditionCard.astro src/components/CategoryNav.astro
git commit -m "feat: add homepage with hero, search, and featured conditions grid"
```

---

## Task 7: Conditions Overview & Detail Pages

**Files:**
- Create: `src/pages/aandoeningen/index.astro`
- Create: `src/pages/aandoeningen/[slug].astro`
- Create: `src/pages/en/conditions/index.astro`
- Create: `src/pages/en/conditions/[slug].astro`
- Create: `src/components/AtoZIndex.astro`
- Create: `src/components/RelatedConditions.astro`
- Create: `src/components/FAQSection.astro`
- Create: `src/components/TableOfContents.astro`
- Create: `src/layouts/ConditionLayout.astro`

- [ ] **Step 1: Write AtoZIndex component**

```astro
---
// src/components/AtoZIndex.astro
interface Props {
  letters: { letter: string; active: boolean }[];
  locale?: "nl" | "en";
  basePath?: string;
}
const { letters, locale = "nl", basePath } = Astro.props;
---

<nav class="flex flex-wrap gap-1" aria-label="A-Z index">
  {letters.map(({ letter, active }) => (
    active ? (
      <a
        href={`${basePath ?? (locale === "nl" ? "/aandoeningen/" : "/en/conditions/")}?letter=${letter}`}
        class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium bg-white border border-border text-text hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        {letter}
      </a>
    ) : (
      <span class="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-text-muted/40">
        {letter}
      </span>
    )
  ))}
</nav>
```

- [ ] **Step 2: Write RelatedConditions component**

```astro
---
// src/components/RelatedConditions.astro
import ConditionCard from "./ConditionCard.astro";
import type { CollectionEntry } from "astro:content";

interface Props {
  conditions: CollectionEntry<"conditions_nl" | "conditions_en">[];
  title: string;
  locale?: "nl" | "en";
}
const { conditions, title, locale = "nl" } = Astro.props;
const basePath = locale === "nl" ? "/aandoeningen" : "/en/conditions";
---

{conditions.length > 0 && (
  <section class="mt-10">
    <h3 class="text-xl font-bold text-text mb-4">{title}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {conditions.map((c) => (
        <ConditionCard
          title={locale === "nl" ? (c.data.title_nl || c.data.title) : c.data.title}
          slug={`${basePath}/${c.data.slug}/`}
          category={locale === "nl" ? (c.data.category_nl || c.data.category) : c.data.category}
          summary={locale === "nl" ? (c.data.summary_nl || c.data.summary) : c.data.summary}
        />
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 3: Write FAQSection component**

```astro
---
// src/components/FAQSection.astro
interface FAQItem { q: string; a: string; }

interface Props {
  faqs: FAQItem[];
  title: string;
}

const { faqs, title } = Astro.props;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
---

{faqs.length > 0 && (
  <section class="mt-10">
    <h3 class="text-xl font-bold text-text mb-4">{title}</h3>
    <div class="space-y-3">
      {faqs.map((faq) => (
        <details class="bg-white border border-border rounded-xl p-4 group">
          <summary class="font-semibold text-text cursor-pointer list-none flex items-center justify-between gap-2">
            {faq.q}
            <svg class="w-4 h-4 flex-shrink-0 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <p class="mt-3 text-sm text-text-muted leading-relaxed">{faq.a}</p>
        </details>
      ))}
    </div>
  </section>
)}

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 4: Write TableOfContents component**

```astro
---
// src/components/TableOfContents.astro
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";

interface TocItem { text: string; id: string; level: number; }

interface Props {
  items: TocItem[];
  locale?: Locale;
}

const { items, locale = "nl" } = Astro.props;
---

{items.length > 0 && (
  <nav class="bg-white border border-border rounded-xl p-4 sticky top-20">
    <h4 class="font-semibold text-sm text-text mb-3">{t("onThisPage", locale)}</h4>
    <ul class="space-y-1">
      {items.map((item) => (
        <li style={`padding-left: ${(item.level - 2) * 0.75}rem`}>
          <a href={`#${item.id}`} class="text-sm text-text-muted hover:text-primary transition-colors">{item.text}</a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

- [ ] **Step 5: Write ConditionLayout**

```astro
---
// src/layouts/ConditionLayout.astro
import BaseLayout from "./BaseLayout.astro";
import Breadcrumbs from "../components/Breadcrumbs.astro";
import TableOfContents from "../components/TableOfContents.astro";
import FAQSection from "../components/FAQSection.astro";
import RelatedConditions from "../components/RelatedConditions.astro";
import { t } from "../i18n/translations";
import type { Locale } from "../i18n/config";
import type { CollectionEntry } from "astro:content";

interface Props {
  condition: CollectionEntry<"conditions_nl" | "conditions_en">;
  related: CollectionEntry<"conditions_nl" | "conditions_en">[];
  locale: Locale;
  canonicalURL: URL;
  alternateNl?: string;
  alternateEn?: string;
  xDefault?: string;
}

const { condition, related, locale, canonicalURL, alternateNl, alternateEn, xDefault } = Astro.props;
const d = condition.data;
const title = locale === "nl" ? (d.title_nl || d.title) : d.title;
const categoryName = locale === "nl" ? (d.category_nl || d.category) : d.category;
const summary = locale === "nl" ? (d.summary_nl || d.summary) : d.summary;
const baseSlug = locale === "nl" ? "/aandoeningen" : "/en/conditions";

// Extract headings for ToC
const headings: { text: string; id: string; level: number }[] = [];
if (condition.body) {
  const body = condition.body;
  // Will be populated via remark plugin or in the template
}

// Breadcrumbs for desktop view
const crumbs = [
  { label: t("conditions", locale), href: baseSlug + "/" },
  { label: title },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: summary,
    about: { "@type": "MedicalCondition", name: title },
    lastReviewed: (d.updated || new Date()).toISOString().split("T")[0],
    medicalAudience: { "@type": "MedicalAudience", audienceType: "patients" },
    specialty: { "@type": "MedicalSpecialty", name: "Dermatology" },
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: title,
    description: summary,
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "Dermatology" },
  },
];
---

<BaseLayout
  title={`${title} — ${t("siteName", locale)}`}
  description={d.seo_description}
  locale={locale}
  canonicalURL={canonicalURL}
  alternateNl={alternateNl}
  alternateEn={alternateEn}
  xDefault={xDefault}
  ogType="medicalwebpage"
  jsonLd={jsonLd}
  keywords={d.keywords}
  currentPath={`${baseSlug}/${d.slug}/`}
>
  <Breadcrumbs crumbs={crumbs} locale={locale} />

  <article class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
      <!-- Main content -->
      <div class="min-w-0">
        <div class="mb-6">
          <span class="text-xs font-semibold text-primary uppercase tracking-wider">{categoryName}</span>
          <h1 class="text-3xl sm:text-4xl font-bold text-text mt-2 mb-3">{title}</h1>
          <p class="text-lg text-text-muted">{summary}</p>
        </div>

        <div class="bg-white border border-border rounded-xl p-6 sm:p-8">
          <div class="prose prose-slate max-w-none
            prose-headings:text-text prose-headings:font-bold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-text prose-p:leading-relaxed
            prose-li:text-text prose-li:leading-relaxed
            prose-strong:text-text prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <slot />
          </div>
        </div>

        <!-- FAQ Section -->
        {d.faq && d.faq.length > 0 && (
          <FAQSection faqs={d.faq} title={t("frequentlyAsked", locale)} />
        )}

        <!-- Related Conditions -->
        <RelatedConditions conditions={related} title={t("relatedConditions", locale)} locale={locale} />
      </div>

      <!-- Sidebar -->
      <aside class="hidden lg:block">
        <TableOfContents items={headings} locale={locale} />
      </aside>
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 6: Write Dutch conditions overview page**

```astro
---
// src/pages/aandoeningen/index.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import Breadcrumbs from "../../components/Breadcrumbs.astro";
import SearchBar from "../../components/SearchBar.astro";
import CategoryNav from "../../components/CategoryNav.astro";
import AtoZIndex from "../../components/AtoZIndex.astro";
import ConditionCard from "../../components/ConditionCard.astro";
import { getCollection } from "astro:content";
import { t } from "../../i18n/translations";

const locale = "nl" as const;
const allConditions = await getCollection("conditions_nl", ({ data }) => data.published);
allConditions.sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));

// Category grouping
const categoryMap = new Map<string, { name: string; icon: string; conditions: typeof allConditions }>();
for (const c of allConditions) {
  const key = c.data.category;
  if (!categoryMap.has(key)) {
    categoryMap.set(key, { name: c.data.category_nl || key, icon: c.data.icon || "📋", conditions: [] });
  }
  categoryMap.get(key)!.conditions.push(c);
}

const categories = Array.from(categoryMap.entries()).map(([key, val]) => ({
  key, name: val.name, icon: val.icon, count: val.conditions.length,
}));

// A-Z inventory
const activeLetters = new Set(allConditions.map(c => (c.data.title_nl || c.data.title)[0].toUpperCase()));
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => ({
  letter: l, active: activeLetters.has(l),
}));

// Get query params for filter
const url = new URL(Astro.request.url);
const activeCategory = url.searchParams.get("categorie") || "";
const activeLetter = url.searchParams.get("letter") || "";
const searchQuery = url.searchParams.get("q") || "";

let filtered = allConditions;
if (activeCategory) {
  filtered = filtered.filter(c => c.data.category === activeCategory);
}
if (activeLetter) {
  filtered = filtered.filter(c => (c.data.title_nl || c.data.title)[0].toUpperCase() === activeLetter);
}
if (searchQuery) {
  const q = searchQuery.toLowerCase();
  filtered = filtered.filter(c =>
    (c.data.title_nl || c.data.title).toLowerCase().includes(q) ||
    (c.data.summary_nl || c.data.summary).toLowerCase().includes(q)
  );
}

const canonicalURL = new URL("https://hulpbijhuid.nl/aandoeningen/");
const jsonLd = [{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Huidaandoeningen — Hulp Bij Huid",
  description: "Overzicht van alle huidaandoeningen op Hulp Bij Huid. Vind informatie over symptomen, oorzaken en behandelingen.",
  url: canonicalURL.href,
}];
---

<BaseLayout
  title="Huidaandoeningen — Hulp Bij Huid"
  description="Overzicht van alle huidaandoeningen op Hulp Bij Huid. Vind informatie over symptomen, oorzaken en behandelingen."
  locale="nl"
  canonicalURL={canonicalURL}
  alternateEn="https://hulpbijhuid.nl/en/conditions/"
  xDefault="https://hulpbijhuid.nl/aandoeningen/"
  jsonLd={jsonLd}
  keywords={allConditions.map(c => c.data.title_nl || c.data.title)}
  currentPath="/aandoeningen/"
>
  <Breadcrumbs crumbs={[{ label: t("conditions", locale) }]} locale={locale} />

  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl sm:text-4xl font-bold text-text mb-2">Huidaandoeningen</h1>
    <p class="text-text-muted mb-6">Een compleet overzicht van huidaandoeningen met symptomen, oorzaken en behandelingen.</p>

    <!-- Search -->
    <div class="mb-8">
      <SearchBar locale={locale} />
    </div>

    <!-- A-Z -->
    <div class="mb-8">
      <AtoZIndex letters={alphabet} locale={locale} basePath="/aandoeningen/" />
    </div>

    <!-- Categories -->
    <div class="mb-8">
      <CategoryNav categories={categories} locale={locale} activeCategory={activeCategory} />
    </div>

    <!-- Active filters -->
    {(activeCategory || activeLetter || searchQuery) && (
      <div class="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span class="text-text-muted">Filters:</span>
        {activeCategory && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{categoryMap.get(activeCategory)?.name || activeCategory}</span>}
        {activeLetter && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">Letter: {activeLetter}</span>}
        {searchQuery && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">Zoeken: {searchQuery}</span>}
        <a href="/aandoeningen/" class="text-primary hover:underline text-xs">Wis filters</a>
      </div>
    )}

    <!-- Results -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.length === 0 ? (
        <p class="col-span-full text-center text-text-muted py-12">{t("noResults", locale)}</p>
      ) : (
        filtered.map((c) => (
          <ConditionCard
            title={c.data.title_nl || c.data.title}
            slug={`/aandoeningen/${c.data.slug}/`}
            category={c.data.category_nl}
            summary={c.data.summary_nl || c.data.summary}
          />
        ))
      )}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Write Dutch condition detail page**

```astro
---
// src/pages/aandoeningen/[slug].astro
import { getCollection, type CollectionEntry } from "astro:content";
import ConditionLayout from "../../layouts/ConditionLayout.astro";

export async function getStaticPaths() {
  const conditions = await getCollection("conditions_nl", ({ data }) => data.published);
  return conditions.map((c) => ({
    params: { slug: c.data.slug },
    props: { condition: c },
  }));
}

const { condition } = Astro.props as { condition: CollectionEntry<"conditions_nl"> };

// Find related conditions
const allConditions = await getCollection("conditions_nl", ({ data }) => data.published);
const related = allConditions.filter(c =>
  condition.data.related.includes(c.data.slug)
);

// Render MD content
const { Content } = await condition.render();

const canonicalURL = new URL(`https://hulpbijhuid.nl/aandoeningen/${condition.data.slug}/`);
---

<ConditionLayout
  condition={condition}
  related={related}
  locale="nl"
  canonicalURL={canonicalURL}
  alternateEn={`https://hulpbijhuid.nl/en/conditions/${condition.data.slug}/`}
  xDefault={`https://hulpbijhuid.nl/aandoeningen/${condition.data.slug}/`}
>
  <Content />
</ConditionLayout>
```

- [ ] **Step 8: Write English conditions overview page**

```astro
---
// src/pages/en/conditions/index.astro
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Breadcrumbs from "../../../components/Breadcrumbs.astro";
import SearchBar from "../../../components/SearchBar.astro";
import CategoryNav from "../../../components/CategoryNav.astro";
import AtoZIndex from "../../../components/AtoZIndex.astro";
import ConditionCard from "../../../components/ConditionCard.astro";
import { getCollection } from "astro:content";
import { t } from "../../../i18n/translations";

const locale = "en" as const;
const allConditions = await getCollection("conditions_en", ({ data }) => data.published);
allConditions.sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));

const categoryMap = new Map<string, { name: string; icon: string; conditions: typeof allConditions }>();
for (const c of allConditions) {
  const key = c.data.category;
  if (!categoryMap.has(key)) {
    categoryMap.set(key, { name: c.data.category, icon: c.data.icon || "📋", conditions: [] });
  }
  categoryMap.get(key)!.conditions.push(c);
}

const categories = Array.from(categoryMap.entries()).map(([key, val]) => ({
  key, name: val.name, icon: val.icon, count: val.conditions.length,
}));

const activeLetters = new Set(allConditions.map(c => c.data.title[0].toUpperCase()));
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => ({
  letter: l, active: activeLetters.has(l),
}));

const url = new URL(Astro.request.url);
const activeCategory = url.searchParams.get("categorie") || "";
const activeLetter = url.searchParams.get("letter") || "";
const searchQuery = url.searchParams.get("q") || "";

let filtered = allConditions;
if (activeCategory) filtered = filtered.filter(c => c.data.category === activeCategory);
if (activeLetter) filtered = filtered.filter(c => c.data.title[0].toUpperCase() === activeLetter);
if (searchQuery) {
  const q = searchQuery.toLowerCase();
  filtered = filtered.filter(c =>
    c.data.title.toLowerCase().includes(q) ||
    c.data.summary.toLowerCase().includes(q)
  );
}

const canonicalURL = new URL("https://hulpbijhuid.nl/en/conditions/");
---

<BaseLayout
  title="Skin Conditions — Hulp Bij Huid"
  description="Overview of all skin conditions on Hulp Bij Huid. Find information about symptoms, causes and treatments."
  locale="en"
  canonicalURL={canonicalURL}
  alternateNl="https://hulpbijhuid.nl/aandoeningen/"
  xDefault="https://hulpbijhuid.nl/aandoeningen/"
  jsonLd={[{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Skin Conditions — Hulp Bij Huid", description: "Overview of all skin conditions. Find information about symptoms, causes and treatments.", url: canonicalURL.href }]}
  currentPath="/en/conditions/"
>
  <Breadcrumbs crumbs={[{ label: t("conditions", locale) }]} locale={locale} />

  <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl sm:text-4xl font-bold text-text mb-2">Skin Conditions</h1>
    <p class="text-text-muted mb-6">A complete overview of skin conditions with symptoms, causes and treatments.</p>

    <div class="mb-8"><SearchBar locale={locale} /></div>
    <div class="mb-8"><AtoZIndex letters={alphabet} locale={locale} basePath="/en/conditions/" /></div>
    <div class="mb-8"><CategoryNav categories={categories} locale={locale} activeCategory={activeCategory} /></div>

    {(activeCategory || activeLetter || searchQuery) && (
      <div class="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span class="text-text-muted">Filters:</span>
        {activeCategory && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{categoryMap.get(activeCategory)?.name || activeCategory}</span>}
        {activeLetter && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">Letter: {activeLetter}</span>}
        {searchQuery && <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">Search: {searchQuery}</span>}
        <a href="/en/conditions/" class="text-primary hover:underline text-xs">Clear filters</a>
      </div>
    )}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.length === 0 ? (
        <p class="col-span-full text-center text-text-muted py-12">{t("noResults", locale)}</p>
      ) : (
        filtered.map((c) => (
          <ConditionCard
            title={c.data.title}
            slug={`/en/conditions/${c.data.slug}/`}
            category={c.data.category}
            summary={c.data.summary}
          />
        ))
      )}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 9: Write English condition detail page**

```astro
---
// src/pages/en/conditions/[slug].astro
import { getCollection, type CollectionEntry } from "astro:content";
import ConditionLayout from "../../../layouts/ConditionLayout.astro";

export async function getStaticPaths() {
  const conditions = await getCollection("conditions_en", ({ data }) => data.published);
  return conditions.map((c) => ({
    params: { slug: c.data.slug },
    props: { condition: c },
  }));
}

const { condition } = Astro.props as { condition: CollectionEntry<"conditions_en"> };

const allConditions = await getCollection("conditions_en", ({ data }) => data.published);
const related = allConditions.filter(c =>
  condition.data.related.includes(c.data.slug)
);

const { Content } = await condition.render();

const canonicalURL = new URL(`https://hulpbijhuid.nl/en/conditions/${condition.data.slug}/`);
---

<ConditionLayout
  condition={condition}
  related={related}
  locale="en"
  canonicalURL={canonicalURL}
  alternateNl={`https://hulpbijhuid.nl/aandoeningen/${condition.data.slug}/`}
  xDefault={`https://hulpbijhuid.nl/aandoeningen/${condition.data.slug}/`}
>
  <Content />
</ConditionLayout>
```

- [ ] **Step 10: Clean up test file and verify build**

```bash
rm /root/hulpbijhuid/src/content/conditions/nl/test.md
cd /root/hulpbijhuid && npm run build 2>&1
```

Expected: Build succeeds.

- [ ] **Step 11: Commit**

```bash
cd /root/hulpbijhuid
git add src/pages/aandoeningen/ src/pages/en/conditions/ src/components/AtoZIndex.astro src/components/RelatedConditions.astro src/components/FAQSection.astro src/components/TableOfContents.astro src/layouts/ConditionLayout.astro
git commit -m "feat: add conditions overview and detail pages with A-Z index, FAQs, related links"
```

---

## Task 8: Content Generation — 50 Skin Conditions

**Files:**
- Create: `scripts/generate-conditions.ts`
- Install: `tsx` as devDependency

- [ ] **Step 1: Write content generation script**

```typescript
// scripts/generate-conditions.ts
import fs from "node:fs";
import path from "node:path";

interface Condition {
  slug: string;
  title_en: string;
  title_nl: string;
  category_en: string;
  category_nl: string;
  icon: string;
  order: number;
  summary_en: string;
  summary_nl: string;
  keywords: string[];
  related: string[];
  faq: { q: string; a: string }[];
  content_en: string;
  content_nl: string;
}

const conditions: Condition[] = [
  // ========================
  // INFLAMMATORY & AUTO-IMMUNE
  // ========================
  {
    slug: "eczema",
    title_en: "Eczema (Atopic Dermatitis)",
    title_nl: "Eczeem (Atopische Dermatitis)",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 1,
    summary_en: "A chronic inflammatory skin condition causing dry, itchy, and inflamed patches of skin.",
    summary_nl: "Een chronische ontstekingsaandoening van de huid die droge, jeukende en ontstoken huidplekken veroorzaakt.",
    keywords: ["eczema", "atopic dermatitis", "itchy skin", "skin inflammation", "dry skin"],
    related: ["psoriasis", "contact-dermatitis", "seborrheic-dermatitis"],
    faq: [
      { q: "Is eczema contagious?", a: "No, eczema is not contagious. It is an inflammatory condition related to genetics and environmental factors." },
      { q: "What triggers eczema flare-ups?", a: "Common triggers include stress, allergens, irritants like soaps, temperature changes, and certain fabrics such as wool." },
      { q: "Can eczema be cured?", a: "There is currently no cure for eczema, but symptoms can be effectively managed with proper skincare, medications, and trigger avoidance." },
    ],
    content_en: `## What is Eczema?

Eczema, also known as atopic dermatitis, is a chronic inflammatory skin condition that affects millions of people worldwide. It typically appears as red, dry, and intensely itchy patches of skin. While it most commonly begins in childhood, eczema can develop at any age.

The condition is characterized by a compromised skin barrier, which makes the skin more susceptible to irritants, allergens, and moisture loss. This leads to the hallmark cycle of itching and scratching that can worsen the condition.

## Symptoms

- Dry, sensitive skin that may appear red or brownish-gray
- Intense itching, especially at night
- Small, raised bumps that may leak fluid when scratched
- Thickened, cracked, or scaly skin
- Areas commonly affected: face, neck, inside of elbows, behind knees, hands, and feet

## Causes & Risk Factors

- **Genetic factors:** Family history of eczema, allergies, or asthma
- **Immune system dysfunction:** Overactive immune response to triggers
- **Environmental triggers:** Pollen, dust mites, pet dander, mold
- **Irritants:** Harsh soaps, detergents, fragrances, cigarette smoke
- **Climate:** Dry air, extreme temperatures, low humidity
- **Stress:** Emotional stress can trigger or worsen flare-ups

## Treatment Options

### Self-Care & Lifestyle
- Moisturize regularly with fragrance-free emollients
- Take lukewarm baths with colloidal oatmeal
- Use gentle, non-irritating skincare products
- Wear soft, breathable fabrics like cotton
- Identify and avoid personal triggers

### Medical Treatments
- Topical corticosteroids to reduce inflammation
- Topical calcineurin inhibitors (tacrolimus, pimecrolimus)
- Oral antihistamines for itch relief
- Phototherapy (light therapy) for moderate to severe cases
- Systemic medications (dupilumab, JAK inhibitors) for severe cases

## When to See a Doctor

Consult a healthcare provider if your eczema is severe, interferes with daily life or sleep, shows signs of infection (pus, yellow crusting, increased redness), or does not respond to over-the-counter treatments.`,
    content_nl: `## Wat is eczeem?

Eczeem, ook bekend als atopische dermatitis, is een chronische ontstekingsaandoening van de huid die miljoenen mensen wereldwijd treft. Het verschijnt meestal als rode, droge en intens jeukende huidplekken. Hoewel het vaak in de kindertijd begint, kan eczeem op elke leeftijd ontstaan.

De aandoening wordt gekenmerkt door een verzwakte huidbarrière, waardoor de huid gevoeliger is voor irriterende stoffen, allergenen en vochtverlies. Dit leidt tot de kenmerkende cyclus van jeuk en krabben die de aandoening kan verergeren.

## Symptomen

- Droge, gevoelige huid die rood of bruingrijs kan lijken
- Intense jeuk, vooral 's nachts
- Kleine, verheven bultjes die kunnen lekken bij krabben
- Verdikte, gebarsten of schilferige huid
- Vaak getroffen gebieden: gezicht, nek, elleboogplooien, knieholtes, handen en voeten

## Oorzaken & Risicofactoren

- **Genetische factoren:** Familiegeschiedenis van eczeem, allergieën of astma
- **Immuunsysteem disfunctie:** Overactieve immuunrespons op triggers
- **Omgevingstriggers:** Pollen, huisstofmijt, huidschilfers van huisdieren, schimmels
- **Irriterende stoffen:** Agressieve zeep, schoonmaakmiddelen, parfums, sigarettenrook
- **Klimaat:** Droge lucht, extreme temperaturen, lage luchtvochtigheid
- **Stress:** Emotionele stress kan opflakkeringen uitlokken of verergeren

## Behandelingen

### Zelfzorg & Levensstijl
- Regelmatig hydrateren met parfumvrije verzachtende crèmes
- Lauwwarme baden met colloïdale havermout
- Gebruik milde, niet-irriterende huidverzorgingsproducten
- Draag zachte, ademende stoffen zoals katoen
- Identificeer en vermijd persoonlijke triggers

### Medische Behandelingen
- Lokale corticosteroïden om ontsteking te verminderen
- Lokale calcineurineremmers (tacrolimus, pimecrolimus)
- Orale antihistaminica voor jeukverlichting
- Lichttherapie (fototherapie) bij matige tot ernstige gevallen
- Systemische medicatie (dupilumab, JAK-remmers) bij ernstige gevallen

## Wanneer naar de dokter

Raadpleeg een arts als je eczeem ernstig is, het dagelijks leven of de slaap verstoort, tekenen van infectie vertoont (pus, gele korstvorming, toegenomen roodheid), of niet reageert op vrij verkrijgbare behandelingen.`,
  },
  {
    slug: "psoriasis",
    title_en: "Psoriasis",
    title_nl: "Psoriasis",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 2,
    summary_en: "An autoimmune condition causing rapid skin cell buildup, resulting in thick, silvery scales and red patches.",
    summary_nl: "Een auto-immuunziekte die snelle ophoping van huidcellen veroorzaakt, resulterend in dikke, zilverachtige schilfers en rode plekken.",
    keywords: ["psoriasis", "autoimmune skin", "scaly patches", "skin plaques", "psoriatic arthritis"],
    related: ["eczema", "seborrheic-dermatitis", "lichen-planus"],
    faq: [
      { q: "Is psoriasis contagious?", a: "No, psoriasis is not contagious. It is an autoimmune condition and cannot be spread through contact." },
      { q: "What triggers psoriasis?", a: "Common triggers include stress, infections, skin injury, certain medications, and cold weather." },
      { q: "Can psoriasis lead to other health problems?", a: "Yes, psoriasis is associated with an increased risk of psoriatic arthritis, cardiovascular disease, and metabolic syndrome." },
    ],
    content_en: `## What is Psoriasis?

Psoriasis is a chronic autoimmune condition that accelerates the life cycle of skin cells, causing them to build up rapidly on the surface of the skin. The extra skin cells form scales and red patches that are sometimes painful and can itch.

Psoriasis affects approximately 2-3% of the global population and can develop at any age, though it most commonly appears between ages 15-35.

## Symptoms

- Red patches of skin covered with thick, silvery scales
- Dry, cracked skin that may bleed
- Itching, burning, or soreness
- Thickened, pitted, or ridged nails
- Swollen and stiff joints (psoriatic arthritis)

## Causes & Risk Factors

- **Immune system:** T-cells mistakenly attack healthy skin cells
- **Genetics:** Family history is a significant risk factor
- **Triggers:** Stress, infections (especially strep throat), skin injuries
- **Lifestyle factors:** Smoking, obesity, alcohol consumption
- **Medications:** Beta-blockers, lithium, and antimalarials can trigger flares

## Treatment Options

### Topical Treatments
- Corticosteroid creams and ointments
- Vitamin D analogues (calcipotriene)
- Coal tar preparations
- Salicylic acid for scale removal

### Phototherapy
- UVB phototherapy
- PUVA (psoralen + UVA)
- Excimer laser for localized plaques

### Systemic Medications
- Oral medications (methotrexate, cyclosporine)
- Biologics (adalimumab, etanercept, ustekinumab, secukinumab)
- Small molecule inhibitors (apremilast)

## When to See a Doctor

See a doctor if your psoriasis is widespread, painful, interfering with daily activities, or if you develop joint pain (possible psoriatic arthritis).`,
    content_nl: `## Wat is psoriasis?

Psoriasis is een chronische auto-immuunziekte die de levenscyclus van huidcellen versnelt, waardoor ze zich snel ophopen op het huidoppervlak. De extra huidcellen vormen schilfers en rode plekken die soms pijnlijk zijn en kunnen jeuken.

Psoriasis treft ongeveer 2-3% van de wereldbevolking en kan op elke leeftijd ontstaan, hoewel het meestal tussen 15-35 jaar verschijnt.

## Symptomen

- Rode huidplekken bedekt met dikke, zilverachtige schilfers
- Droge, gebarsten huid die kan bloeden
- Jeuk, branderigheid of pijn
- Verdikte, putjes of geribbelde nagels
- Gezwollen en stijve gewrichten (artritis psoriatica)

## Oorzaken & Risicofactoren

- **Immuunsysteem:** T-cellen vallen per ongeluk gezonde huidcellen aan
- **Genetica:** Familiegeschiedenis is een belangrijke risicofactor
- **Triggers:** Stress, infecties (vooral keelinfecties), huidletsel
- **Levensstijlfactoren:** Roken, obesitas, alcoholgebruik
- **Medicatie:** Bètablokkers, lithium en antimalariamiddelen kunnen opflakkeringen uitlokken

## Behandelingen

### Lokale Behandelingen
- Corticosteroïdencrèmes en -zalven
- Vitamine D-analogen (calcipotriol)
- Teerpreparaten
- Salicylzuur voor verwijdering van schilfers

### Lichttherapie
- UVB-fototherapie
- PUVA (psoraleen + UVA)
- Excimerlaser voor gelokaliseerde plaques

### Systemische Medicatie
- Orale medicijnen (methotrexaat, cyclosporine)
- Biologicals (adalimumab, etanercept, ustekinumab, secukinumab)
- Kleine-molecuulremmers (apremilast)

## Wanneer naar de dokter

Ga naar de dokter als je psoriasis wijdverspreid of pijnlijk is, je dagelijkse activiteiten verstoort, of als je gewrichtspijn ontwikkelt (mogelijke artritis psoriatica).`,
  },
  {
    slug: "rosacea",
    title_en: "Rosacea",
    title_nl: "Rosacea",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 3,
    summary_en: "A chronic skin condition causing facial redness, visible blood vessels, and sometimes acne-like bumps.",
    summary_nl: "Een chronische huidaandoening die roodheid in het gezicht, zichtbare bloedvaten en soms acne-achtige bultjes veroorzaakt.",
    keywords: ["rosacea", "facial redness", "flushing", "visible blood vessels", "acne rosacea"],
    related: ["acne-vulgaris", "eczema", "seborrheic-dermatitis"],
    faq: [
      { q: "Does rosacea get worse with age?", a: "Yes, rosacea tends to worsen over time if left untreated, progressing through stages from flushing to persistent redness and visible blood vessels." },
      { q: "What foods trigger rosacea?", a: "Common triggers include spicy foods, hot beverages, alcohol (especially red wine), and histamine-rich foods." },
      { q: "Is rosacea curable?", a: "There is no cure for rosacea, but treatments can effectively control and reduce symptoms." },
    ],
    content_en: `## What is Rosacea?

Rosacea is a chronic inflammatory skin condition that primarily affects the face, causing redness, visible blood vessels, and sometimes small, red, pus-filled bumps. It most commonly affects middle-aged women with fair skin, but can occur in anyone.

The condition tends to flare up periodically and can be triggered by various factors including sun exposure, stress, and certain foods.

## Symptoms

- Persistent facial redness (erythema), usually on cheeks, nose, chin, and forehead
- Visible broken blood vessels (telangiectasia)
- Swollen red bumps that may resemble acne
- Burning or stinging sensation
- Thickened skin, especially on the nose (rhinophyma)
- Eye problems (ocular rosacea): dry, irritated, swollen eyes

## Causes & Risk Factors

- **Genetics:** Family history increases risk
- **Immune response:** Overactive immune system to certain triggers
- **Demodex mites:** Increased numbers on facial skin
- **H. pylori bacteria:** Possible association with gut bacteria
- **Triggers:** Sun exposure, hot drinks, spicy food, alcohol, stress, extreme temperatures

## Treatment Options

### Skincare & Lifestyle
- Use gentle cleansers and moisturizers
- Apply broad-spectrum sunscreen daily (SPF 30+)
- Identify and avoid personal triggers
- Use green-tinted color-correcting makeup

### Medical Treatments
- Topical treatments: metronidazole, azelaic acid, ivermectin, brimonidine
- Oral antibiotics: doxycycline, minocycline (anti-inflammatory doses)
- Laser therapy for visible blood vessels
- Intense pulsed light (IPL) for redness

## When to See a Doctor

Consult a dermatologist if you experience persistent facial redness, visible blood vessels affecting your self-confidence, or eye irritation.`,
    content_nl: `## Wat is rosacea?

Rosacea is een chronische ontstekingsaandoening van de huid die voornamelijk het gezicht treft, met roodheid, zichtbare bloedvaten en soms kleine, rode, met pus gevulde bultjes. Het treft meestal vrouwen van middelbare leeftijd met een lichte huid, maar kan bij iedereen voorkomen.

De aandoening laait periodiek op en kan worden uitgelokt door verschillende factoren, waaronder blootstelling aan de zon, stress en bepaalde voedingsmiddelen.

## Symptomen

- Aanhoudende roodheid in het gezicht (erytheem), meestal op wangen, neus, kin en voorhoofd
- Zichtbare gebroken bloedvaatjes (teleangiëctasieën)
- Gezwollen rode bultjes die op acne kunnen lijken
- Branderig of stekend gevoel
- Verdikte huid, vooral op de neus (rhinophyma)
- Oogproblemen (oculaire rosacea): droge, geïrriteerde, gezwollen ogen

## Oorzaken & Risicofactoren

- **Genetica:** Familiegeschiedenis verhoogt het risico
- **Immuunrespons:** Overactief immuunsysteem op bepaalde triggers
- **Demodex-mijten:** Verhoogde aantallen op de gezichtshuid
- **H. pylori-bacterie:** Mogelijke associatie met darmbacteriën
- **Triggers:** Blootstelling aan de zon, warme dranken, gekruid eten, alcohol, stress, extreme temperaturen

## Behandelingen

### Huidverzorging & Levensstijl
- Gebruik milde reinigers en vochtinbrengers
- Breng dagelijks breedspectrum zonnebrandcrème aan (SPF 30+)
- Identificeer en vermijd persoonlijke triggers
- Gebruik groen getinte kleurcorrigerende make-up

### Medische Behandelingen
- Lokale behandelingen: metronidazol, azelaïnezuur, ivermectine, brimonidine
- Orale antibiotica: doxycycline, minocycline (ontstekingsremmende doseringen)
- Lasertherapie voor zichtbare bloedvaatjes
- Intense pulsed light (IPL) voor roodheid

## Wanneer naar de dokter

Raadpleeg een dermatoloog bij aanhoudende roodheid in het gezicht, zichtbare bloedvaatjes die je zelfvertrouwen beïnvloeden, of oogirritatie.`,
  },
  {
    slug: "seborrheic-dermatitis",
    title_en: "Seborrheic Dermatitis",
    title_nl: "Seborroïsche Dermatitis",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 4,
    summary_en: "A common skin condition causing scaly patches, red skin, and stubborn dandruff, mainly on oily areas.",
    summary_nl: "Een veelvoorkomende huidaandoening die schilferige plekken, rode huid en hardnekkige roos veroorzaakt, vooral op vette huidgebieden.",
    keywords: ["seborrheic dermatitis", "dandruff", "scaly scalp", "cradle cap", "skin flakes"],
    related: ["psoriasis", "eczema", "dandruff"],
    faq: [
      { q: "Is seborrheic dermatitis a fungal infection?", a: "It involves an overgrowth of Malassezia yeast which is naturally present on skin, but it is more of an inflammatory reaction than a typical infection." },
      { q: "Can stress cause seborrheic dermatitis?", a: "Yes, stress is a well-known trigger for seborrheic dermatitis flare-ups." },
    ],
    content_en: `## What is Seborrheic Dermatitis?

Seborrheic dermatitis is a common skin condition that mainly affects the scalp, causing scaly patches, red skin, and stubborn dandruff. It can also affect other oily areas of the body, such as the face, sides of the nose, eyebrows, ears, eyelids, and chest.

The condition is thought to be related to an overgrowth of a yeast called Malassezia, combined with an abnormal immune response.

## Symptoms

- White or yellowish flakes of skin (dandruff) on scalp, hair, eyebrows, beard
- Red, greasy patches of skin covered with scales
- Itching or burning sensation
- Rash on oily areas of the face
- Blepharitis (inflammation of the eyelid margins)

## Causes & Risk Factors

- Malassezia yeast overgrowth
- Overactive sebaceous glands
- Compromised immune system
- Neurological conditions (Parkinson's, HIV)
- Stress and fatigue
- Cold, dry weather
- Certain medications

## Treatment Options

### Home Care
- Use anti-dandruff shampoos containing ketoconazole, selenium sulfide, zinc pyrithione, salicylic acid, or coal tar
- Wash affected areas regularly
- Apply emollients to soften scales

### Medical Treatments
- Topical antifungal creams (ketoconazole, ciclopirox)
- Topical corticosteroids for inflammation
- Topical calcineurin inhibitors
- Oral antifungals for severe cases

## When to See a Doctor

See a doctor if over-the-counter treatments don't work, the condition is widespread or causing significant discomfort, or you have4 sign of secondary infection.`,
    content_nl: `## Wat is seborroïsche dermatitis?

Seborroïsche dermatitis is een veelvoorkomende huidaandoening die voornamelijk de hoofdhuid treft en schilferige plekken, rode huid en hardnekkige roos veroorzaakt. Het kan ook andere vette delen van het lichaam treffen, zoals het gezicht, de zijkanten van de neus, wenkbrauwen, oren, oogleden en borst.

De aandoening wordt verondersteld verband te houden met een overgroei van een gist genaamd Malassezia, in combinatie met een abnormale immuunrespons.

## Symptomen

- Witte of gelige huidschilfers (roos) op hoofdhuid, haar, wenkbrauwen, baard
- Rode, vettige huidplekken bedekt met schilfers
- Jeuk of branderig gevoel
- Huiduitslag op vette delen van het gezicht
- Blepharitis (ontsteking van de ooglidranden)

## Oorzaken & Risicofactoren

- Overgroei van Malassezia-gist
- Overactieve talgklieren
- Verminderde weerstand
- Neurologische aandoeningen (Parkinson, HIV)
- Stress en vermoeidheid
- Koud, droog weer
- Bepaalde medicijnen

## Behandelingen

### Zelfzorg
- Gebruik anti-roosshampoos met ketoconazol, seleensulfide, zinkpyrithion, salicylzuur of teer
- Was getroffen gebieden regelmatig
- Breng verzachtende middelen aan om schilfers los te weken

### Medische Behandelingen
- Lokale antischimmelcrèmes (ketoconazol, ciclopirox)
- Lokale corticosteroïden tegen ontsteking
- Lokale calcineurineremmers
- Orale antischimmelmiddelen bij ernstige gevallen

## Wanneer naar de dokter

Ga naar de dokter als vrij verkrijgbare behandelingen niet werken, de aandoening wijdverspreid is of aanzienlijk ongemak veroorzaakt, of als je tekenen van secundaire infectie hebt.`,
  },
  {
    slug: "lichen-planus",
    title_en: "Lichen Planus",
    title_nl: "Lichen Planus",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 5,
    summary_en: "An inflammatory condition affecting skin and mucous membranes with purple, flat-topped, itchy bumps.",
    summary_nl: "Een ontstekingsaandoening die huid en slijmvliezen aantast met paarse, platte, jeukende bultjes.",
    keywords: ["lichen planus", "purple bumps", "Wickham striae", "oral lichen planus", "inflammatory skin"],
    related: ["psoriasis", "eczema", "lupus"],
    faq: [
      { q: "Is lichen planus an autoimmune disease?", a: "Yes, lichen planus is believed to be an autoimmune condition where T-cells attack the skin and mucous membranes." },
      { q: "Can lichen planus affect the mouth?", a: "Yes, oral lichen planus is common and appears as white lacy patches, red swollen tissue, or open sores in the mouth." },
    ],
    content_en: `## What is Lichen Planus?

Lichen planus is an inflammatory condition that can affect the skin, mucous membranes, hair, and nails. On the skin, it typically appears as purplish, flat-topped bumps that are often very itchy. The condition is believed to be autoimmune in nature.

Lichen planus is not contagious and most commonly affects middle-aged adults. It can last for months to years, and while it may resolve on its own,13 treatments can help manage symptoms.

## Symptoms

- Purple, flat-topped bumps (papules), often on wrists, ankles, and lower back
- Wickham striae — fine white lines or scales on the bumps
- Intense itching
- Painful sores in the mouth (oral lichen planus)
- Nail thinning, splitting, or ridging
- Hair loss in affected areas (lichen planopilaris)

## Causes & Risk Factors

- **Autoimmune reaction:** T-cells mistakenly attack skin cells
- **Hepatitis C:** Strong association with hepatitis C infection
- **Medications:** Certain drugs can trigger lichenoid drug eruptions
- **Allergens:** Contact with chemicals like gold and mercury compounds
- **Stress:** Can trigger or worsen outbreaks

## Treatment Options

- Topical corticosteroids (mainstay treatment)
- Oral corticosteroids for severe cases
- Oral antihistamines for itching
- Immunosuppressive medications
- Phototherapy (PUVA or narrowband UVB)

## When to See a Doctor

Consult a doctor for a proper diagnosis if you notice unexplained purple bumps, mouth sores, or nail changes.`,
    content_nl: `## Wat is lichen planus?

Lichen planus is een ontstekingsaandoening die de huid, slijmvliezen, haren en nagels kan aantasten. Op de huid verschijnt het meestal als paarsachtige, platte bultjes die vaak erg jeuken. De aandoening wordt verondersteld auto-immuun van aard te zijn.

Lichen planus is niet besmettelijk en treft meestal volwassenen van middelbare leeftijd. Het kan maanden tot jaren aanhouden, en hoewel het soms vanzelf verdwijnt, kunnen behandelingen de symptomen helpen beheersen.

## Symptomen

- Paarse, platte bultjes (papels), vaak op polsen, enkels en onderrug
- Wickham-striae — fijne witte lijntjes of schilfers op de bultjes
- Intense jeuk
- Pijnlijke mondzweren (orale lichen planus)
- Nagelverdunning, -splijting of -ribbels
- Haaruitval in getroffen gebieden (lichen planopilaris)

## Oorzaken & Risicofactoren

- **Auto-immuunreactie:** T-cellen vallen per ongeluk huidcellen aan
- **Hepatitis C:** Sterke associatie met hepatitis C-infectie
- **Medicatie:** Bepaalde geneesmiddelen kunnen lichenoïde geneesmiddelenerupties uitlokken
- **Allergenen:** Contact met chemicaliën zoals goud- en kwikverbindingen
- **Stress:** Kan uitbraken uitlokken of verergeren

## Behandelingen

- Lokale corticosteroïden (belangrijkste behandeling)
- Orale corticosteroïden voor ernstige gevallen
- Orale antihistaminica tegen jeuk
- Immuunsuppressieve medicijnen
- Lichttherapie (PUVA of smalspectrum UVB)

## Wanneer naar de dokter

Raadpleeg een arts voor een juiste diagnose als je onverklaarde paarse bultjes, mondzweren of nagelveranderingen opmerkt.`,
  },
  {
    slug: "lupus-erythematosus",
    title_en: "Lupus Erythematosus (Cutaneous)",
    title_nl: "Lupus Erythematodes (Cutaan)",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 6,
    summary_en: "An autoimmune disease that can cause a distinctive butterfly-shaped rash across the cheeks and nose.",
    summary_nl: "Een auto-immuunziekte die een kenmerkende vlindervormige huiduitslag over de wangen en neus kan veroorzaken.",
    keywords: ["lupus", "butterfly rash", "malar rash", "autoimmune", "discoid lupus", "SLE"],
    related: ["rosacea", "eczema", "dermatomyositis"],
    faq: [
      { q: "Is the butterfly rash always present in lupus?", a: "No, the malar (butterfly) rash occurs in about 40-50% of people with lupus and may come and go." },
      { q: "Does sunlight trigger lupus skin symptoms?", a: "Yes, photosensitivity is very common in lupus. Sun exposure can trigger or worsen skin lesions." },
    ],
    content_en: `## What is Cutaneous Lupus Erythematosus?

Cutaneous lupus erythematosus is a form of lupus that primarily affects the skin. It is an autoimmune condition where the body's immune system attacks healthy skin cells, causing inflammation and rashes. The most recognizable sign is a butterfly-shaped (malar) rash across the cheeks and nose.

There are several subtypes: acute cutaneous lupus (ACLE), subacute cutaneous lupus (SCLE), and chronic cutaneous lupus (discoid lupus). Some people have only skin involvement; others may have systemic lupus erythematosus (SLE) affecting multiple organs.

## Symptoms

- Butterfly (malar) rash across cheeks and nose
- Discoid lesions: coin-shaped, red, scaly plaques that can scar
- Photosensitivity (extreme sensitivity to sunlight)
- Hair loss (non-scarring)
- Mouth or nasal ulcers
- Raynaud's phenomenon

## Causes & Risk Factors

- **Autoimmunity:** Complex interaction of genetic and environmental factors
- **Genetics:** Multiple genes associated with SLE risk
- **Hormones:** More common in women (estrogen may play a role)
- **UV light:** Major trigger for skin lesions
- **Infections:** Epstein-Barr virus may contribute
- **Medications:** Drug-induced lupus possible

## Treatment Options

- Sun protection (SPF 50+, protective clothing) is essential
- Topical corticosteroids and calcineurin inhibitors
- Antimalarials (hydroxychloroquine)
- Systemic immunosuppressants
- Regular monitoring for systemic involvement

## When to See a Doctor

Seek immediate medical attention if you develop a butterfly rash, unexplained fever, joint pain, or13 signs of organ involvement.`,
    content_nl: `## Wat is cutane lupus erythematodes?

Cutane lupus erythematodes is een vorm van lupus die voornamelijk de huid treft. Het is een auto-immuunziekte waarbij het immuunsysteem van het lichaam gezonde huidcellen aanvalt, wat leidt tot ontsteking en huiduitslag. Het meest herkenbare teken is een vlindervormige (malaire) huiduitslag over de wangen en neus.

Er zijn verschillende subtypes: acute cutane lupus (ACLE), subacute cutane lupus (SCLE) en chronische cutane lupus (discoïde lupus). Sommige mensen hebben alleen huidklachten; anderen kunnen systemische lupus erythematodes (SLE) hebben die meerdere organen aantast.

## Symptomen

- Vlindervormige (malaire) huiduitslag over wangen en neus
- Discoïde laesies: muntvormige, rode, schilferige plaques die kunnen verlittekenen
- Overgevoeligheid voor zonlicht (fotosensitiviteit)
- Haaruitval (zonder littekenvorming)
- Mond- of neuszweren
- Fenomeen van Raynaud

## Oorzaken & Risicofactoren

- **Auto-immuniteit:** Complexe interactie van genetische en omgevingsfactoren
- **Genetica:** Meerdere genen geassocieerd met SLE-risico
- **Hormonen:** Komt vaker voor bij vrouwen (oestrogeen kan een rol spelen)
- **UV-licht:** Belangrijke trigger voor huidlaesies
- **Infecties:** Epstein-Barr-virus kan bijdragen
- **Medicatie:** Geneesmiddelengeïnduceerde lupus mogelijk

## Behandelingen

- Zonbescherming (SPF 50+, beschermende kleding) is essentieel
- Lokale corticosteroïden en calcineurineremmers
- Antimalariamiddelen (hydroxychloroquine)
- Systemische immunosuppressiva
- Regelmatige controle op systemische betrokkenheid

## Wanneer naar de dokter

Zoek direct medische hulp als je een vlindervormige huiduitslag, onverklaarde koorts, gewrichtspijn of tekenen van orgaanbetrokkenheid ontwikkelt.`,
  },
  {
    slug: "dermatomyositis",
    title_en: "Dermatomyositis",
    title_nl: "Dermatomyositis",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 7,
    summary_en: "A rare inflammatory disease causing muscle weakness and a distinctive skin rash with purple/red discoloration.",
    summary_nl: "Een zeldzame ontstekingsziekte die spierzwakte en een kenmerkende huiduitslag met paars/rode verkleuring veroorzaakt.",
    keywords: ["dermatomyositis", "Gottron papules", "heliotrope rash", "muscle weakness", "connective tissue disease"],
    related: ["lupus", "eczema", "psoriasis"],
    faq: [
      { q: "Is dermatomyositis related to cancer?", a: "Yes, there is an increased risk of malignancy, especially in adults over 40. Cancer screening is recommended." },
      { q: "What is a Gottron papule?", a: "Gottron papules are flat-topped, reddish-purple bumps that appear over the knuckles, a characteristic sign of dermatomyositis." },
    ],
    content_en: `## What is Dermatomyositis?

Dermatomyositis is a rare inflammatory disease that causes muscle weakness and2 a distinctive skin rash, including a reddish-purple discoloration on the eyelids (heliotrope rash) and raised bumps over the knuckles (Gottron papules).

The condition belongs to the idiopathic inflammatory myopathies group and typically affects adults aged 40-60 and children aged 5-15. It affects women more often than men.

## Symptoms

- Heliotrope rash: purple/red discoloration around the eyelids
- Gottron papules: scaly, red bumps over knuckles and joints
- Progressive muscle weakness (shoulders, hips, neck)
- Difficulty swallowing (dysphagia)
- Fatigue and weight loss
- Calcinosis (calcium deposits under skin, more common in children)

## Causes & Risk Factors

- **Autoimmune:** Body produces antibodies attacking muscle and skin
- **Genetics:** Genetic susceptibility contributes
- **Environmental triggers:** UV exposure, infections
- **Paraneoplastic:** Associated with underlying cancers in some adults
- **Medications:** Rare cases linked to certain drugs

## Treatment Options

- Oral corticosteroids (prednisone) as first-line therapy
- Immunosuppressants (methotrexate, azathioprine, mycophenolate)
- IV immunoglobulin for refractory cases
- Physical therapy to maintain strength
- Sun protection to minimize skin flares
- Rituximab for resistant disease

## When to See a Doctor

Seek urgent evaluation if you experience progressive muscle weakness with rash, difficulty swallowing or breathing.`,
    content_nl: `## Wat is dermatomyositis?

Dermatomyositis is een zeldzame ontstekingsziekte die spierzwakte en een kenmerkende huiduitslag veroorzaakt, waaronder een roodpaarse verkleuring op de oogleden (heliotroop huiduitslag) en verheven bultjes over de vingergewrichten (Gottron-papels).

De aandoening behoort tot de idiopathische inflammatoire myopathieën en treft meestal volwassenen van 40-60 jaar en kinderen van 5-15 jaar. Vrouwen worden vaker getroffen dan mannen.

## Symptomen

- Heliotrope huiduitslag: paars/rode verkleuring rond de oogleden
- Gottron-papels: schilferige, rode bultjes over vingergewrichten en gewrichten
- Progressieve spierzwakte (schouders, heupen, nek)
- Slikklachten (dysfagie)
- Vermoeidheid en gewichtsverlies
- Calcinose (kalkafzettingen onder de huid, vaker bij kinderen)

## Oorzaken & Risicofactoren

- **Auto-immuun:** Lichaam produceert antilichamen die spieren en huid aanvallen
- **Genetica:** Genetische gevoeligheid draagt bij
- **Omgevingstriggers:** UV-blootstelling, infecties
- **Paraneoplastisch:** Bij sommige volwassenen geassocieerd met onderliggende kanker
- **Medicatie:** Zeldzame gevallen gelinkt aan bepaalde geneesmiddelen

## Behandelingen

- Orale corticosteroïden (prednison) als eerstelijnstherapie
- Immunosuppressiva (methotrexaat, azathioprine, mycofenolaat)
- IV-immunoglobuline voor therapieresistente gevallen
- Fysiotherapie om kracht te behouden
- Zonbescherming om huidklachten te minimaliseren
- Rituximab voor resistente aandoening

## Wanneer naar de dokter

Zoek dringend medische evaluatie bij progressieve spierzwakte met huiduitslag, slik- of ademhalingsproblemen.`,
  },
  {
    slug: "pityriasis-rosea",
    title_en: "Pityriasis Rosea",
    title_nl: "Pityriasis Rosea",
    category_en: "Inflammatory & Auto-immune",
    category_nl: "Ontstekingsziekten & Auto-immuun",
    icon: "🔥",
    order: 8,
    summary_en: "A temporary skin rash that often begins with a single 'herald patch' followed by smaller oval spots on the body.",
    summary_nl: "Een tijdelijke huiduitslag die vaak begint met een enkele 'primaire plaque' gevolgd door kleinere ovale plekjes op het lichaam.",
    keywords: ["pityriasis rosea", "herald patch", "Christmas tree rash", "viral rash", "skin spots"],
    related: ["psoriasis", "eczema", "tinea-versicolor"],
    faq: [
      { q: "Is pityriasis rosea contagious?", a: "Pityriasis rosea is not considered highly contagious. It may be triggered by a viral infection but does not typically spread between people." },
      { q: "How long does pityriasis rosea last?", a: "The rash typically lasts 6-8 weeks and resolves on its own without treatment, though it may persist up to 3 months." },
    ],
    content_en: `## What is Pityriasis Rosea?

Pityriasis rosea is a common, self-limiting skin rash that usually begins with a single large pink or red oval patch called the 'herald patch'. After a week or two, smaller patches spread across the chest, back, and abdomen in a pattern that can resemble a Christmas tree.

The exact cause is unknown but is believed to be triggered by a viral infection, possibly human herpesvirus 6 or 7. It is most common in people aged 10-35.

## Symptoms

- Single herald patch: 2-10 cm oval, slightly raised pink/red spot
- Followed by smaller patches on trunk and upper limbs
- 'Christmas tree' pattern on back
- Mild to moderate itching
- Possible mild flu-like symptoms before rash appears
- Pink or light brown color, may be more noticeable on dark skin

## Causes & Risk Factors

- **Viral trigger:** Possibly HHV-6 or HHV-7 reactivation
- **Age:** Most common in young adults (10-35 years)
- **Season:** More common in spring and autumn
- **No known genetic predisposition**

## Treatment Options

- Usually no treatment needed — resolves spontaneously
- Antihistamines for itching
- Topical corticosteroids if itching is severe
- UVB phototherapy for persistent cases
- Avoid aggravating factors (hot showers, irritation)

## When to See a Doctor

See a doctor to confirm the diagnosis and rule out other conditions, especially if the herald patch could be confused with ringworm or other skin conditions.`,
    content_nl: `## Wat is pityriasis rosea?

Pityriasis rosea is een veelvoorkomende, zelflimiterende huiduitslag die meestal begint met een enkele grote roze of rode ovale vlek, de 'primaire plaque' genoemd. Na een week of twee verspreiden kleinere vlekjes zich over de borst, rug en buik in een patroon dat op een kerstboom kan lijken.

De precieze oorzaak is onbekend, maar waarschijnlijk wordt het uitgelokt door een virale infectie, mogelijk humaan herpesvirus 6 of 7. Het komt het meest voor bij mensen van 10-35 jaar.

## Symptomen

- Primaire plaque: ovaal, 2-10 cm, licht verheven roze/rode vlek
- Gevolgd door kleinere vlekjes op romp en bovenste ledematen
- 'Kerstboom'-patroon op de rug
- Milde tot matige jeuk
- Mogelijk milde griepachtige klachten voorafgaand aan huiduitslag
- Roze of lichtbruine kleur, op donkere huid beter zichtbaar

## Oorzaken & Risicofactoren

- **Virale trigger:** Mogelijk HHV-6 of HHV-7 reactivatie
- **Leeftijd:** Meest voorkomend bij jonge volwassenen (10-35 jaar)
- **Seizoen:** Vaker in lente en herfst
- **Geen bekende genetische aanleg**

## Behandelingen

- Meestal geen behandeling nodig — verdwijnt spontaan
- Antihistaminica tegen jeuk
- Lokale corticosteroïden bij ernstige jeuk
- UVB-lichttherapie bij aanhoudende gevallen
- Vermijd verergerende factoren (hete douches, irritatie)

## Wanneer naar de dokter

Ga naar de dokter om de diagnose te bevestigen en andere aandoeningen uit te sluiten, vooral als de primaire plaque verward kan worden met ringworm of andere huidaandoeningen.`,
  },

  // ========================
  // INFECTIOUS — FUNGAL
  // ========================
  {
    slug: "athletes-foot",
    title_en: "Athlete's Foot (Tinea Pedis)",
    title_nl: "Voetschimmel (Tinea Pedis)",
    category_en: "Infectious — Fungal",
    category_nl: "Infectieziekten — Schimmel",
    icon: "🦠",
    order: 9,
    summary_en: "A fungal infection of the feet causing itching, scaling, and redness, commonly between the toes.",
    summary_nl: "Een schimmelinfectie van de voeten die jeuk, schilfering en roodheid veroorzaakt, meestal tussen de tenen.",
    keywords: ["athletes foot", "tinea pedis", "foot fungus", "toe fungus", "fungal infection"],
    related: ["ringworm", "onychomycosis", "jock-itch"],
    faq: [
      { q: "How do you get athlete's foot?", a: "It spreads through contact with infected skin flakes or fungi in moist environments like locker rooms, swimming pools, and shared towels." },
      { q: "Can athlete's foot spread to other parts of the body?", a: "Yes, it can spread to the hands, groin (jock itch), and nails if you scratch the infected area and touch other parts." },
    ],
    content_en: `## What is Athlete's Foot?

Athlete's foot (tinea pedis) is one of the most common fungal skin infections. It's caused by dermatophytes — fungi that thrive in warm, moist environments. The condition typically starts between the toes and can spread to the soles and sides of feet.

Despite the name, you don't need to be an athlete to get it. The infection is common in people whose feet sweat heavily while confined in tight-fitting shoes.

## Symptoms

- Itching, stinging, and burning between the toes or on soles
- Cracked, peeling, and dry skin
- Redness and inflammation
- Blisters in severe cases
- Foul odor
- Thickened, crumbly nails if spread to toenails

## Causes & Risk Factors

- Walking barefoot in damp public areas
- Sweaty feet confined in tight, non-breathable footwear
- Sharing towels, socks, or shoes with an infected person
- Minor skin or nail injury on the foot
- Weakened immune system
- Poor foot hygiene

## Treatment Options

- Over-the-counter antifungal creams (clotrimazole, miconazole, terbinafine)
- Keep feet clean and dry, especially between toes
- Wear breathable footwear and moisture-wicking socks
- Use antifungal powders in shoes
- Prescription oral antifungals for severe cases
- Practice good foot hygiene to prevent recurrence

## When to See a Doctor

See a doctor if over-the-counter treatments don't work after 2 weeks, you have diabetes, signs of bacterial infection (increased swelling, pus, red streaks), or the infection spreads to nails.`,
    content_nl: `## Wat is voetschimmel?

Voetschimmel (tinea pedis) is een van de meest voorkomende schimmelinfecties van de huid. Het wordt veroorzaakt door dermatofyten — schimmels die gedijen in warme, vochtige omgevingen. De aandoening begint meestal tussen de tenen en kan zich verspreiden naar de voetzolen en zijkanten van de voeten.

Ondanks de naam hoef je geen atleet te zijn om het te krijgen. De infectie komt veel voor bij mensen van wie de voeten hevig zweten in strakke schoenen.

## Symptomen

- Jeuk, prikkeling en branderigheid tussen de tenen of op de voetzolen
- Gebarsten, schilferende en droge huid
- Roodheid en ontsteking
- Blaren in ernstige gevallen
- Onaangename geur
- Verdikte, brokkelige nagels als de schimmel zich naar de teennagels verspreidt

## Oorzaken & Risicofactoren

- Blootsvoets lopen in vochtige openbare ruimtes
- Zweterige voeten in strakke, niet-ademende schoenen
- Delen van handdoeken, sokken of schoenen met een besmet persoon
- Kleine huid- of nagelbeschadiging aan de voet
- Verzwakt immuunsysteem
- Slechte voethygiëne

## Behandelingen

- Vrij verkrijgbare antischimmelcrèmes (clotrimazol, miconazol, terbinafine)
- Houd voeten schoon en droog, vooral tussen de tenen
- Draag ademend schoeisel en vochtafvoerende sokken
- Gebruik antischimmelpoeders in schoenen
- Voorgeschreven orale antischimmelmiddelen bij ernstige gevallen
- Goede voethygiëne om herhaling te voorkomen

## Wanneer naar de dokter

Ga naar de dokter als vrij verkrijgbare behandelingen na 2 weken niet werken, je diabetes hebt, tekenen van bacteriële infectie (toegenomen zwelling, pus, rode strepen), of de infectie zich naar de nagels verspreidt.`,
  },
  {
    slug: "ringworm",
    title_en: "Ringworm (Tinea Corporis)",
    title_nl: "Ringworm (Tinea Corporis)",
    category_en: "Infectious — Fungal",
    category_nl: "Infectieziekten — Schimmel",
    icon: "🦠",
    order: 10,
    summary_en: "A fungal infection that creates a distinctive ring-shaped red rash on the body, despite its name having nothing to do with worms.",
    summary_nl: "Een schimmelinfectie die een kenmerkende ringvormige rode uitslag op het lichaam veroorzaakt, ondanks dat de naam niets met wormen te maken heeft.",
    keywords: ["ringworm", "tinea corporis", "circular rash", "fungal skin infection", "body ringworm"],
    related: ["athletes-foot", "jock-itch", "tinea-versicolor"],
    faq: [
      { q: "Is ringworm actually caused by a worm?", a: "No, despite its name, ringworm is caused by a fungus, not a worm. The name comes from the ring-like appearance of the rash." },
      { q: "Can you get ringworm from pets?", a: "Yes, ringworm is zoonotic and can be transmitted from cats, dogs, and other animals to humans." },
    ],
    content_en: `## What is Ringworm?

Ringworm (tinea corporis) is a common fungal skin infection that appears as a red, circular, ring-shaped rash with clearer skin in the center. Despite its name, it has nothing to do with worms — it's caused by dermatophyte fungi that live on the dead tissue of skin, hair, and nails.

The infection is highly contagious and can spread through direct contact with an infected person, animal, or contaminated surface.

## Symptoms

- Red, ring-shaped rash with raised, scaly border
- Clearer skin in the center of the ring
- Itching in the affected area
- Slightly raised, expanding rings
- Multiple rings in overlapping areas
- Hair loss in affected areas on the scalp (tinea capitis)

## Causes & Risk Factors

- Direct skin contact with an infected person or animal
- Contact with contaminated surfaces (towels, bedding, gym mats)
- Warm, humid climates
- Excessive sweating
- Tight-fitting clothing
- Minor skin injuries
- Weakened immune system

## Treatment Options

- Over-the-counter antifungal creams (clotrimazole, miconazole, terbinafine)
- Keep skin clean and dry
- Avoid sharing personal items
- Wash bedding and towels in hot water
- Prescription oral antifungals for widespread or resistant cases
- Treat infected pets for prevention of recurrence

## When to See a Doctor

See a doctor if the rash doesn't improve with OTC treatments within 2 weeks, covers large areas, affects the scalp, or signs of bacterial infection appear.`,
    content_nl: `## Wat is ringworm?

Ringworm (tinea corporis) is een veelvoorkomende schimmelinfectie van de huid die verschijnt als een rode, ronde, ringvormige uitslag met lichtere huid in het midden. Ondanks de naam heeft het niets met wormen te maken — het wordt veroorzaakt door dermatofytenschimmels die leven op dood weefsel van huid, haar en nagels.

De infectie is zeer besmettelijk en kan zich verspreiden door direct contact met een besmet persoon, dier of besmette oppervlakken.

## Symptomen

- Rode, ringvormige uitslag met verheven, schilferige rand
- Lichtere huid in het midden van de ring
- Jeuk op de getroffen plek
- Licht verheven, uitbreidende ringen
- Meerdere ringen in overlappende gebieden
- Haaruitval op getroffen plekken op de hoofdhuid (tinea capitis)

## Oorzaken & Risicofactoren

- Direct huidcontact met besmet persoon of dier
- Contact met besmette oppervlakken (handdoeken, beddengoed, gymnastiekmatten)
- Warm, vochtig klimaat
- Overmatig zweten
- Strakke kleding
- Kleine huidbeschadigingen
- Verzwakt immuunsysteem

## Behandelingen

- Vrij verkrijgbare antischimmelcrèmes (clotrimazol, miconazol, terbinafine)
- Houd de huid schoon en droog
- Deel geen persoonlijke spullen
- Was beddengoed en handdoeken op hoge temperatuur
- Voorschrift orale antischimmelmiddelen bij uitgebreide of resistente gevallen
- Behandel besmette huisdieren ter preventie van herhaling

## Wanneer naar de dokter

Ga naar de dokter als de uitslag niet verbetert met vrij verkrijgbare behandelingen binnen 2 weken, grote oppervlakken bedekt, de hoofdhuid treft, of tekenen van bacteriële infectie verschijnen.`,
  },
];

// Generate files
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function writeConditionsFile(cond: Condition, lang: "nl" | "en") {
  const dir = path.join(__dirname, "..", "src", "content", "conditions", lang);
  fs.mkdirSync(dir, { recursive: true });

  const title = lang === "nl" ? cond.title_nl : cond.title_en;
  const category = lang === "nl" ? cond.category_nl : cond.category_en;
  const summary = lang === "nl" ? cond.summary_nl : cond.summary_en;
  const content = lang === "nl" ? cond.content_nl : cond.content_en;
  const seo_title = `${title} — Hulp Bij Huid`;
  const seo_description = summary;
  const faq = cond.faq.map(f => ({
    q: lang === "nl" ? f.q : f.q, // TODO: translate FAQs
    a: lang === "nl" ? f.a : f.a,
  }));

  const frontmatter = {
    title: cond.title_en,
    title_nl: cond.title_nl,
    slug: cond.slug,
    category: cond.category_en,
    category_nl: cond.category_nl,
    order: cond.order,
    icon: cond.icon,
    summary: cond.summary_en,
    summary_nl: cond.summary_nl,
    seo_title,
    seo_description,
    keywords: cond.keywords,
    related: cond.related,
    faq,
    published: true,
    updated: new Date().toISOString().split("T")[0],
  };

  const fm = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length === 0) return `${k}: []`;
        return `${k}:\n${v.map(item =>
          typeof item === "object" ? `  - q: "${item.q}"\n    a: "${item.a}"` : `  - "${item}"`
        ).join("\n")}`;
      }
      if (typeof v === "string") return `${k}: "${v}"`;
      return `${k}: ${v}`;
    })
    .join("\n");

  const md = `---\n${fm}\n---\n\n${content}`;
  fs.writeFileSync(path.join(dir, `${cond.slug}.md`), md, "utf-8");
}

conditions.forEach((cond) => {
  writeConditionsFile(cond, "nl");
  writeConditionsFile(cond, "en");
});

console.log(`Generated ${conditions.length} conditions in NL and EN.`);
console.log("NOTE: This script generates the first batch. Extend conditions array for all 50.");
```

- [ ] **Step 2: Install tsx and run the script**

```bash
cd /root/hulpbijhuid && npm install -D tsx && npx tsx scripts/generate-conditions.ts
```

- [ ] **Step 3: Verify build compiles successfully**

```bash
cd /root/hulpbijhuid && npm run build 2>&1
```

Expected: Build succeeds with the generated content.

- [ ] **Step 4: Commit**

```bash
cd /root/hulpbijhuid
git add scripts/ src/content/conditions/
git commit -m "feat: add content generation script and first batch of 10 skin conditions"
```

---

## Task 9: Remaining 40 Skin Conditions

**Files:**
- Modify: `scripts/generate-conditions.ts` — append remaining 40 conditions to the array

- [ ] **Step 1:Continued content generation for remaining conditions**

Due to file size constraints, the generate-conditions.ts script must be extended with all 50 conditions. The remaining 40 conditions to add to the `conditions` array are:

1. Candidiasis — yeast infection
2. Jock Itch — Tinea Cruris
3. Tinea Versicolor
4. Onychomycosis — Nail Fungus
5. Impetigo
6. Cellulitis
7. Folliculitis
8. Boils & Carbuncles
9. Erysipelas
10. Warts
11. Cold Sores
12. Shingles
13. Molluscum Contagiosum
14. Hand-Foot-and-Mouth Disease
15. Vitiligo
16. Melasma
17. Post-inflammatory Hyperpigmentation
18. Albinism
19. Acne Vulgaris
20. Hidradenitis Suppurativa
21. Perioral Dermatitis
22. Keratosis Pilaris
23. Milia
24. Seborrheic Keratosis
25. Cherry Angioma
26. Dermatofibroma
27. Skin Tags
28. Lipoma
29. Actinic Keratosis
30. Contact Dermatitis
31. Urticaria (Hives)
32. Angioedema
33. Drug Eruptions
34. Erythema Multiforme
35. Alopecia Areata
36. Ingrown Toenail
37. Dandruff
38. Sunburn
39. Polymorphous Light Eruption
40. Chilblains

The implementer should extend the `conditions` array in the script with each condition following the same structure. Run `npx tsx scripts/generate-conditions.ts` again after modifying.

- [ ] **Step 2:lys Run generation script**

```bash
cd /root/hulpbijhuid && npx tsx scripts/generate-conditions.ts
```

- [ ] **Step 3: Verify build**

```bash
cd /root/hulpbijhuid && npm run build 2>&1
```

Expected: All 50 NL + 50 EN condition pages build successfully.

- [ ] **Step 4: Commit**

```bash
cd /root/hulpbijhuid
git add scripts/ src/content/conditions/
git commit -m "feat: complete all 50 skin conditions in NL and EN"
```

---

## Task 10: Static Pages (About, When to See a Doctor)

See plan details above for Task 10 (PageLayout, over-ons, wanneer-naar-de-dokter, about, when-to-see-doctor).

## Task 11: Blog Pages

See plan details for Task 11 (BlogCard, blog/index.astro, blog/[slug].astro for both languages).

## Task 12: Search Index Endpoint

See plan details for Task 12 (search-index.json.ts).

## Task 13: GitHub Actions Deployment

See plan details for Task 13 (.github/workflows/deploy.yml, CNAME).

## Task 14: Final Build & Push

- [ ] Full clean build: `npm run build`
- [ ] Check sitemap: `cat dist/sitemap-0.xml | head -30`
- [ ] Create repo and push: `gh repo create hulpbijhuid --public --source=. --push`

## Task 15: Post-Deployment Verification

- [ ] Check deploy status: `gh run list --repo YouDontSurf/hulpbijhuid --limit 5`
- [ ] Test key URLs: `curl -sI https://YouDontSurf.github.io/hulpbijhuid/`

---

## Plan Summary

| Task | Description |
|------|-------------|
| 1 | Project scaffolding (Astro, Tailwind v4, config) |
| 2 | i18n infrastructure (translations, locale routing) |
| 3 | Content collection schemas |
| 4 | SEO component (meta, OG, hreflang, JSON-LD) |
| 5 | Base layout, Header, Footer, LanguageToggle, Breadcrumbs |
| 6 | Homepage with hero, search, and featured conditions |
| 7 | Conditions overview + detail pages with A-Z, categories, FAQ |
| 8-9 | Content generation: 50 skin conditions (NL + EN) |
| 10 | Static pages: About, When to See a Doctor |
| 11 | Blog pages (overview + detail for NL and EN) |
| 12 | Search index JSON endpoint |
| 13 | GitHub Actions CI/CD for GitHub Pages |
| 14 | Final build verification and push |
| 15 | Post-deployment URL checks |