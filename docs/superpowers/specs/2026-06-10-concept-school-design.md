# Concept School — Next.js 15 + Tailwind v4 Build Spec

**Date:** 2026-06-10
**Project:** `concept-school` — Sekolah Bina Pandu Utama portfolio piece by Codading
**Source:** `handoffs/Sekolah Bina Pandu Utama.html` + `handoffs/README-handoff.md`

---

## 0. Implementation Phases

The build is split into two independent phases. Each phase produces a deployable, self-contained increment.

### Phase 1 — Foundation & Shell
**Goal:** Deployable, navigable site with branding, layout, and stub pages.

| Area | Scope |
|---|---|
| Project init | Next.js 15 + Tailwind v4 + next-intl wiring, `next.config.ts` |
| Design tokens | `@theme` block in `src/styles/app.css` |
| i18n | `routing.ts`, `request.ts`, full `id.json` + `en.json` message files |
| UI primitives | `Button`, `Crest`, `Eyebrow`, `Badge` |
| Layout shell | `TopBar`, `Navbar` (scroll shadow), `MobileMenu` (drawer + focus trap), `Footer` |
| Routing | Root redirect (`/` → `/id`), `[locale]/layout.tsx`, all 4 stub pages |
| Images | Download all assets to `public/images/`, write `ATTRIBUTION.md` |

**Deliverable:** Every route resolves, all shell interactions work, ready to deploy.

### Phase 2 — Landing Page Sections & Interactions
**Goal:** Complete landing page with all content sections and interactive features.

| Area | Scope |
|---|---|
| Content sections | `Hero`, `About`, `StatBand`, `Programs`, `Features`, `Facilities`, `News`, `Achievements`, `Admissions`, `Contact` |
| Interactive components | `LightboxProvider`, `AchievementScroller`, `ScrollReveal`, `LangToggle` |
| Landing page | Full assembly in `[locale]/page.tsx` with `ScrollReveal` wrapping |

**Deliverable:** Complete, production-ready site.

---

## 1. Overview

Rebuild the existing HTML prototype as a fully static Next.js 15 site using the App Router and Tailwind CSS v4. The output is a static export (`output: 'export'`) deployable to any static host (GitHub Pages, Netlify, etc.). The site is bilingual (Bahasa Indonesia primary, English secondary) and consists of one full landing page plus four stub pages.

---

## 2. Architecture

### Runtime
- **Framework:** Next.js 15 App Router
- **Output:** `output: 'export'` (static HTML/CSS/JS, no server at runtime)
- **Styling:** Tailwind CSS v4 with CSS-based `@theme` config
- **i18n:** `next-intl` v3.x with `[locale]` App Router segment
- **Images:** `next/image` with `unoptimized: true` (required for static export); images stored in `public/images/`

### Routing

| Route | Output | Purpose |
|---|---|---|
| `/` | meta-refresh + JS redirect → `/id` | Root redirect (static-export safe: Next.js compiles `redirect('/id')` into an HTML page with `<meta http-equiv="refresh">` + `window.location.replace`) |
| `/[locale]/` | `id/index.html`, `en/index.html` | Full landing page |
| `/[locale]/program/smp` | stub | SMP program detail |
| `/[locale]/program/sma` | stub | SMA program detail |
| `/[locale]/berita` | stub | News index |
| `/[locale]/pengumuman` | stub | Announcements index |

`generateStaticParams` on every `page.tsx` returns `[{ locale: 'id' }, { locale: 'en' }]`.

---

## 3. Project Structure

```
concept-school/
├── public/
│   └── images/
│       ├── ATTRIBUTION.md        ← Pexels photo credits
│       └── [hero, about, facilities, news, principal].jpg
├── src/
│   ├── app/
│   │   ├── page.tsx              ← redirect → /id
│   │   └── [locale]/
│   │       ├── layout.tsx        ← NextIntlClientProvider, fonts, metadata
│   │       ├── page.tsx          ← landing page (assembles 14 sections)
│   │       ├── program/
│   │       │   ├── smp/page.tsx
│   │       │   └── sma/page.tsx
│   │       ├── berita/page.tsx
│   │       └── pengumuman/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx        ← server
│   │   │   ├── Navbar.tsx        ← client (scroll shadow, menu toggle)
│   │   │   ├── MobileMenu.tsx    ← client (drawer + backdrop)
│   │   │   └── Footer.tsx        ← server
│   │   ├── sections/             ← all server components
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── StatBand.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Facilities.tsx
│   │   │   ├── News.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Admissions.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/                   ← server
│   │   │   ├── Button.tsx
│   │   │   ├── Crest.tsx
│   │   │   ├── Eyebrow.tsx
│   │   │   └── Badge.tsx
│   │   └── interactive/          ← client components
│   │       ├── LightboxProvider.tsx
│   │       ├── AchievementScroller.tsx
│   │       ├── ScrollReveal.tsx
│   │       └── LangToggle.tsx
│   ├── messages/
│   │   ├── id.json
│   │   └── en.json
│   ├── i18n/
│   │   ├── routing.ts
│   │   └── request.ts
│   └── styles/
│       └── app.css               ← @theme block + base styles
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 4. Tailwind v4 Design Tokens

All tokens defined in `src/styles/app.css` as a `@theme` block:

```css
@import "tailwindcss";

@theme {
  --color-primary:       #15294D;
  --color-primary-dark:  #0E1C36;
  --color-primary-tint:  #EAEEF5;
  --color-accent:        #C2A14D;
  --color-accent-dark:   #A8883A;
  --color-surface-alt:   #F4F6F9;
  --color-ink:           #1C2430;
  --color-ink-muted:     #5B6573;
  --color-border:        #E2E6EC;
  --color-border-strong: #C9D0DA;

  --font-heading: var(--font-lora), Georgia, serif;
  --font-body:    var(--font-source-sans), system-ui, sans-serif;

  --radius: 4px;

  --shadow-sm: 0 1px 2px rgb(14 28 54 / 0.08);
  --shadow:    0 2px 4px rgb(14 28 54 / 0.10);
  --shadow-md: 0 4px 10px rgb(14 28 54 / 0.10);
}
```

Fonts loaded in `[locale]/layout.tsx` via `next/font/google`:
- **Lora** — weights 400/500/600/700 + italic 400 → CSS var `--font-lora`
- **Source Sans 3** — weights 400/500/600/700 → CSS var `--font-source-sans`

Spacing: Tailwind v4 default 4px-base scale matches the README token table exactly — no overrides needed.

---

## 5. i18n Setup

**Library:** `next-intl` v3.x

**`src/i18n/routing.ts`:**
```ts
import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id'
});
```

**`src/i18n/request.ts`:**
```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale;
  return { locale, messages: (await import(`../messages/${locale}.json`)).default };
});
```

**Message files:** `src/messages/id.json` and `src/messages/en.json` — derived from the §7 bilingual string table in `README-handoff.md`, namespaced by section: `nav`, `topbar`, `hero`, `about`, `stat`, `programs`, `features`, `facilities`, `news`, `achievements`, `admissions`, `contact`, `footer`.

**Language toggle:** `interactive/LangToggle.tsx` (client) uses `next-intl`'s `useRouter` + `usePathname` to switch locale while preserving the current path.

---

## 6. Components

### Server Components

Server components use `await getTranslations(namespace)` (async). Client components use `useTranslations(namespace)`. Both are provided by `next-intl`.

| Component | Key behavior |
|---|---|
| `TopBar` | Accreditation badge + phone/email; hidden ≤860px via Tailwind |
| `Hero` | `next/image` fill background, gradient overlay, gold ribbon, trust bar |
| `About` | 2-col grid (text + image), principal signature, Visi & Misi subsection |
| `StatBand` | Full-width primary-dark, 4 stats with vertical dividers |
| `Programs` | 2 cards (SMP/SMA), feature checklist, links to stub pages |
| `Features` | 3×2 hairline grid, hover tint |
| `Facilities` | 3×2 figure grid; each figure is a button triggering `LightboxProvider` |
| `News` | 2/3 + 1/3 split: news cards + announcements board |
| `Achievements` | Wrapper rendering `AchievementScroller` with card data |
| `Admissions` | 4-step timeline + quotas/requirements panel + CTAs |
| `Contact` | Google Maps iframe + 2 contact cards |
| `Button` | Variants: `accent`, `primary`, `outline`, `outline-light`, `link-arrow` |
| `Crest` | Pure CSS clip-path shield monogram, reused in Navbar + Footer |
| `Eyebrow` | Uppercase label with `::before` gold tick bar |
| `Badge` | `pill` (curriculum) and `square` (news category) variants |

### Client Components

| Component | Responsibility |
|---|---|
| `Navbar` | `useEffect` scroll listener → `shadow-md` at `scrollY > 8`; controls mobile menu open state |
| `MobileMenu` | Right-side drawer (max 360px); closes on backdrop, ✕, link click, or `Escape`; `aria-modal` + focus trap |
| `LightboxProvider` | Context + overlay for facilities; keyboard arrow navigation, `Escape` to close |
| `AchievementScroller` | Prev/next buttons calling `scrollBy` on the snap container; hides when all cards fit |
| `ScrollReveal` | `IntersectionObserver` wrapper: `opacity-0 translate-y-4` → `opacity-100 translate-y-0`; no-op when `prefers-reduced-motion: reduce` |
| `LangToggle` | ID/EN segmented control using next-intl router |

---

## 7. Pages

### Landing Page (`/[locale]/page.tsx`)

Assembles all sections in order, each wrapped in `ScrollReveal` (except Hero and TopBar):

```
TopBar → Navbar → Hero → About → StatBand → Programs →
Features → Facilities → News → Achievements → Admissions → Contact → Footer
```

### Stub Pages

All four stub pages share this structure:
1. **Breadcrumb bar** — `Home / [Section]`, primary-tint bg, hairline bottom border
2. **Page header** — eyebrow + h1 (serif), `pt-20 pb-16`
3. **Coming-soon card** — centered, Crest + bilingual message + "Back to Home" outline button

**Program stubs only:** the relevant `ProgramCard` (SMP or SMA) renders above the coming-soon card, reusing the component from `sections/Programs.tsx`.

---

## 8. Images

All images in `public/images/`. Attribution logged in `public/images/ATTRIBUTION.md`.

| Slot | File | Dimensions | Source |
|---|---|---|---|
| Hero background | `hero.jpg` | 1440×900 | Pexels — school building exterior |
| About | `about.jpg` | 600×700 | Pexels — students in uniform |
| Principal portrait | `principal.jpg` | 64×64 | Pexels — formal headshot |
| Facility: Lab IPA | `facility-lab.jpg` | 800×600 | Pexels — science lab |
| Facility: Perpustakaan | `facility-library.jpg` | 800×600 | Pexels — library |
| Facility: Lapangan | `facility-field.jpg` | 800×600 | Pexels — sports field |
| Facility: Ruang Komputer | `facility-computer.jpg` | 800×600 | Pexels — computer lab |
| Facility: Aula | `facility-hall.jpg` | 800×600 | Pexels — auditorium |
| Facility: Ruang Kelas | `facility-classroom.jpg` | 800×600 | Pexels — classroom |
| News thumb 1 | `news-1.jpg` | 400×250 | Pexels — student award |
| News thumb 2 | `news-2.jpg` | 400×250 | Pexels — flag ceremony |
| Contact map | _(iframe)_ | 600×400 | Google Maps embed |

`next.config.ts` sets `images: { unoptimized: true }` for static export compatibility.

---

## 9. Interactions

| Behavior | Component | Implementation |
|---|---|---|
| Navbar scroll shadow | `Navbar` | `useEffect` scroll listener, `shadow-md` class at `scrollY > 8` |
| Mobile drawer | `MobileMenu` | CSS translate + opacity transition, focus trap, `Escape` key handler |
| Facilities lightbox | `LightboxProvider` | Context with open index state, full-screen overlay, arrow + `Escape` navigation |
| Scroll reveal | `ScrollReveal` | `IntersectionObserver`, CSS transition, `prefers-reduced-motion` gate |
| Achievement arrows | `AchievementScroller` | `scrollBy` on snap container, hidden when container width ≥ scroll width |
| Language toggle | `LangToggle` | `next-intl` `useRouter().replace()` with current pathname |

---

## 10. next.config.ts

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
```

---

## 11. Constraints & Notes

- **Footer disclaimer** must remain visible in both locales: *"Ini adalah concept project oleh Codading untuk menampilkan kemampuan desain web."* / *"This is a concept project by Codading to showcase web design capabilities."*
- All placeholder data (alumni counts, staff numbers, achievement totals, dates) is realistic dummy content from the README — not to be treated as factual.
- No forms are wired (PPDB download, WhatsApp links use `href` with `#` or `https://wa.me/` placeholder numbers).
- No analytics, no cookies, no external scripts beyond Google Fonts (loaded via `next/font`, not a `<script>` tag).
- A11y baseline: correct heading order, `alt` on every image, 44px min tap targets, `:focus-visible` rings on all interactive elements.
