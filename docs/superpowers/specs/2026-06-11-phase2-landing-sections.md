# Phase 2 — Landing Page Sections & Interactions

**Date:** 2026-06-11
**Project:** `concept-school` — Sekolah Bina Pandu Utama
**Depends on:** Phase 1 foundation (committed, clean build)

> **For agentic workers:** Use superpowers:writing-plans to create the implementation plan from this spec.

**Goal:** Deliver the complete landing page with all 10 content sections, 3 new interactive components, and updated stub pages — producing a production-ready static site.

**Architecture:** 10 server-component sections in `src/components/sections/`, 3 client interactive components in `src/components/interactive/`, full replacement of `[locale]/page.tsx`, and targeted updates to stub pages and `next.config.ts`.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, next-intl v3, `next/image` with Pexels CDN URLs (external, `unoptimized: true`).

---

## 1. Changes to Existing Files

| File | Change |
|---|---|
| `next.config.ts` | Add `remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }]` inside `images` |
| `src/app/[locale]/page.tsx` | Replace placeholder with full `LightboxProvider` + section assembly |
| `src/app/[locale]/program/smp/page.tsx` | Add `<ProgramCard variant="smp" />` above coming-soon card |
| `src/app/[locale]/program/sma/page.tsx` | Add `<ProgramCard variant="sma" />` above coming-soon card |
| `public/images/ATTRIBUTION.md` | Fill in all 11 chosen Pexels photo IDs and credit lines |

---

## 2. New Files

```
src/components/sections/
  Hero.tsx
  About.tsx
  StatBand.tsx
  Programs.tsx          ← exports ProgramCard for stub page reuse
  Features.tsx
  Facilities.tsx        ← server; renders FacilitiesGrid
  News.tsx
  Achievements.tsx      ← server; renders AchievementScroller
  Admissions.tsx
  Contact.tsx

src/components/interactive/
  ScrollReveal.tsx      ← already listed; implement here
  LightboxProvider.tsx
  AchievementScroller.tsx
  FacilitiesGrid.tsx    ← client sub-component of Facilities
```

---

## 3. Image Strategy

All images use `next/image` with external Pexels CDN URLs — no files downloaded.

**URL format:**
```
https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={w}&h={h}&dpr=1
```

**Constant pattern** — each section stores its URL at the top of the file:
```ts
const HERO_IMAGE = 'https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1';
```

**Specific photo IDs** are chosen and documented in Task 1 of the implementation plan, then recorded in `public/images/ATTRIBUTION.md`.

**Photo selection criteria:** Formal, well-lit, Indonesian/Southeast-Asian school context where possible. No heavy filters, no Western office stock clichés.

| Slot | File constant | Dimensions |
|---|---|---|
| Hero background | `HERO_IMAGE` | 1440×900 |
| About section | `ABOUT_IMAGE` | 600×700 |
| Principal portrait | `PRINCIPAL_IMAGE` | 64×64 |
| Facility — Lab IPA | `FAC_IMAGES[0]` | 800×600 |
| Facility — Perpustakaan | `FAC_IMAGES[1]` | 800×600 |
| Facility — Lapangan | `FAC_IMAGES[2]` | 800×600 |
| Facility — Ruang Komputer | `FAC_IMAGES[3]` | 800×600 |
| Facility — Aula | `FAC_IMAGES[4]` | 800×600 |
| Facility — Ruang Kelas | `FAC_IMAGES[5]` | 800×600 |
| News thumb 1 | `NEWS_IMAGES[0]` | 400×250 |
| News thumb 2 | `NEWS_IMAGES[1]` | 400×250 |

`next/image` is used for all slots. The Hero uses `fill` + `object-cover`; all others use explicit `width`/`height`.

---

## 4. Content Sections

All are `async` server components in `src/components/sections/`. Each calls `await getTranslations(namespace)`. Translation data already exists in `src/messages/id.json` and `src/messages/en.json` from Phase 1.

### Hero

- Full-viewport (`min-h-[600px]`) with `next/image` fill background + `object-cover`
- Dark gradient overlay: `linear-gradient(to right, rgba(14,28,54,0.88) 40%, rgba(14,28,54,0.55) 100%)`
- Gold ribbon top-right: absolute-positioned, `bg-accent text-primary text-xs font-semibold px-4 py-1`
- Serif h1 with second line `text-accent`
- Subheadline, 3-item meta row (year · location · curriculum), two CTA buttons (`accent` + `outline-light`)
- Trust bar: `bg-primary-dark/80` strip at the bottom of the hero with 4 credential items

### About

- `id="tentang"`; `bg-white`; `py-20`
- 2-col grid at `≥860px`, stacks to 1 col below
- Left col: Eyebrow + h2 + body paragraphs + principal block (portrait circle + name + title + italic serif quote)
- Right col: `next/image` 600×700, `object-cover`
- Visi & Misi subsection: italic serif pull-quote for vision; numbered list (leading-zero counters `01–05`) for mission

### StatBand

- Full-width `bg-primary-dark text-white`; `py-14`
- 4 stats in a row, each: gold unicode icon + large number + label
- Vertical dividers `border-r border-white/20` between items (removed on last)
- `≤680px`: 2×2 grid

### Programs

- `id="program"`; `bg-surface-alt`; `py-20`
- Eyebrow + h2 + 2-col card grid (`≤820px` → stacked)
- **`ProgramCard` component** (exported): badge + grade range + description + 5 checkmark features + accreditation note + "Lihat Detail →" link
  - Props: `variant: 'smp' | 'sma'`, `t: Translations` (passed from parent)
  - SMP links to `/program/smp`; SMA links to `/program/sma` (locale-aware `Link`)
- Integrated-environment note below cards (italic, centered, `text-ink-muted`)

### Features

- `id="features"` (no Navbar anchor, internal use); `bg-white`; `py-20`
- Eyebrow + h2 + 3×2 hairline grid
- Each cell: `border border-border p-6 hover:bg-primary-tint transition-colors`
- Cell content: bordered icon chip (`w-10 h-10 border border-border rounded-(--radius) flex items-center justify-center text-xl`) + `<h3>` title + 2-line description
- `≤820px` → 2 cols; `≤520px` → 1 col

### Facilities

- `id="fasilitas"`; `bg-surface-alt`; `py-20`
- Eyebrow + h2 + renders `<FacilitiesGrid>` client component with image URLs + captions as props
- `FacilitiesGrid` (see §5): handles lightbox trigger, renders 3×2 grid of figure buttons

### News

- `id="berita"`; `bg-white`; `py-20`
- Eyebrow + h2 + 2/3 + 1/3 split (`≤920px` → single column)
- Left: 2 `NewsCard` sub-components — horizontal layout (thumb left + meta + title + excerpt + "Baca Selengkapnya →"), `≤540px` thumb stacks above
- Right: announcements board — `border border-border rounded-(--radius)`, navy header strip, 4 dated announcement items, "Lihat Semua Pengumuman →" footer link

### Achievements

- `id="prestasi"` (no Navbar anchor); `bg-surface-alt`; `py-20`
- Eyebrow + h2 + renders `<AchievementScroller>` client component with 6 card objects derived from translations

**Achievement card data shape:**
```ts
interface AchievementCard {
  year: string;
  level: 'kota' | 'provinsi' | 'nasional';
  title: string;
  result: string;
}
```
Data assembled server-side from `t('item1Year')`, `t('item1Level')` etc. and passed as props.

### Admissions

- `id="ppdb"`; `bg-white`; `py-20`
- Eyebrow + h2
- 4-step timeline: horizontal row of cards, each with gold top border (`border-t-2 border-accent`), numbered navy circle, step name, date range
- `≤920px` → 2×2; `≤620px` → vertical single column
- Info panel below timeline: 2-col — quota table (SMP 120 / SMA 144) + requirements checklist
- Two CTA buttons: `accent` ("Unduh Formulir Pendaftaran", `href="#"`) + `outline` ("Hubungi Panitia PPDB", `href="https://wa.me/6281234567890"`)

### Contact

- `id="kontak"`; `bg-surface-alt`; `py-20`
- Eyebrow + h2
- 2-col at `≥860px`, stacks below
- Left: Google Maps `<iframe src="https://maps.google.com/maps?q=-6.9175,107.6191&z=15&output=embed">` — Bandung city center coordinates, `width="100%" height="400"`, `border-0`, `rounded-(--radius)`
- Right: address card + 2 stacked contact cards
  - Address card: school name, full address (Jl. Contoh No. 1, Bandung), accreditation badge
  - Contact card 1 (Tata Usaha): phone, email, hours
  - Contact card 2 (Panitia PPDB): phone, green WhatsApp `Button` (`href="https://wa.me/6281234567890"`)

---

## 5. Interactive Components

### `ScrollReveal.tsx`

Client component wrapping children in a `<div>`:
- Initial state: `opacity-0 translate-y-4`
- Revealed state: `opacity-100 translate-y-0 transition-[opacity,transform] duration-500`
- Uses `useRef` + `IntersectionObserver` (`threshold: 0.1`), disconnects after first trigger
- Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount — if true, renders children visible without observer

```ts
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}
```

### `LightboxProvider.tsx`

Context + overlay client component:

```ts
interface LightboxContextValue {
  openLightbox: (index: number, items: LightboxItem[]) => void;
  closeLightbox: () => void;
}

interface LightboxItem {
  src: string;
  caption: string;
}
```

- Overlay: `fixed inset-0 z-50 bg-black/85 flex items-center justify-center`
- Active image: `next/image` centered, `max-w-[90vw] max-h-[85vh] object-contain`
- Controls: `×` close (top-right), `‹` prev + `›` next (sides), hidden when single item
- Keyboard: `Escape` → close, `ArrowLeft`/`ArrowRight` → navigate
- Rendered as portal via `ReactDOM.createPortal` into `document.body`
- Exported: `LightboxProvider` component + `useLightbox` hook

### `FacilitiesGrid.tsx`

Client component receiving facility data from `Facilities` server component:

```ts
interface FacilityItem {
  src: string;
  caption: string;
  index: number;
}

interface FacilitiesGridProps {
  items: FacilityItem[];
}
```

- 3×2 grid: `grid grid-cols-3 gap-4` → `grid-cols-2` at `≤820px` → `grid-cols-1` at `≤520px`
- Each cell: `<button>` wrapping `<figure>` — `next/image` + `<figcaption>`
- `onClick` → `openLightbox(index, items)` from `useLightbox()`
- Caption: facility name left + index number right (`text-ink-muted text-sm`)

### `AchievementScroller.tsx`

Client component:

```ts
interface AchievementScrollerProps {
  cards: AchievementCard[];
  levelLabels: Record<'kota' | 'provinsi' | 'nasional', string>;
}
```

- Container: `relative`
- Scroll track: `flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2`
- Each card: `snap-start shrink-0 w-64 border border-border rounded-(--radius) p-5 shadow-(--shadow)`
  - Gold year badge (`bg-accent text-primary text-xs font-bold px-2 py-0.5`)
  - Level pill (`text-xs text-ink-muted uppercase tracking-wide`)
  - Competition title (`font-semibold text-ink mt-2`)
  - Result row: `border-t border-accent mt-3 pt-3 text-accent font-semibold text-sm`
- Prev/Next buttons: absolute left/right, hidden via `useState` when `scrollLeft === 0` / at end
- On mount + scroll: `useEffect` checks `scrollWidth <= clientWidth` → hide both buttons if all fit

---

## 6. Landing Page Assembly

`src/app/[locale]/page.tsx` — replaces the Phase 1 placeholder:

```tsx
import { setRequestLocale } from 'next-intl/server';
import LightboxProvider from '@/components/interactive/LightboxProvider';
import ScrollReveal from '@/components/interactive/ScrollReveal';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import StatBand from '@/components/sections/StatBand';
import Programs from '@/components/sections/Programs';
import Features from '@/components/sections/Features';
import Facilities from '@/components/sections/Facilities';
import News from '@/components/sections/News';
import Achievements from '@/components/sections/Achievements';
import Admissions from '@/components/sections/Admissions';
import Contact from '@/components/sections/Contact';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <LightboxProvider>
      <Hero />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><StatBand /></ScrollReveal>
      <ScrollReveal><Programs /></ScrollReveal>
      <ScrollReveal><Features /></ScrollReveal>
      <ScrollReveal><Facilities /></ScrollReveal>
      <ScrollReveal><News /></ScrollReveal>
      <ScrollReveal><Achievements /></ScrollReveal>
      <ScrollReveal><Admissions /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </LightboxProvider>
  );
}
```

---

## 7. Stub Page Updates

`ProgramCard` is a **named export** from `Programs.tsx` (the default export remains `Programs`). It accepts:
```ts
interface ProgramCardProps {
  variant: 'smp' | 'sma';
}
```
It calls `await getTranslations('programs')` internally (server component).

Both stub pages add:
```tsx
import ProgramCard from '@/components/sections/Programs';
// ...
<div className="max-w-300 mx-auto px-6 pb-10">
  <ProgramCard variant="smp" />   {/* or "sma" */}
</div>
```
Inserted between the page header and the coming-soon card.

---

## 8. Responsive Breakpoints Summary

Mirrors the handoff README breakpoints, mapped to Tailwind v4 syntax (`min-[860px]:`, `max-[820px]:` etc.):

| Width | Key layout changes |
|---|---|
| `≤820px` | Programs stack; Facilities + Features → 2 cols; Footer → single col |
| `≤860px` | About → 1 col; Contact → 1 col |
| `≤920px` | News → 1 col; Admissions → 2×2 |
| `≤680px` | StatBand → 2×2 |
| `≤620px` | Admissions timeline → vertical |
| `≤540px` | NewsCard thumb stacks above body |
| `≤520px` | Features + Facilities → 1 col |

---

## 9. Task Breakdown (14 tasks)

| # | Task | Files |
|---|---|---|
| 1 | `next.config.ts` remotePatterns + choose Pexels IDs + fill ATTRIBUTION.md | `next.config.ts`, `public/images/ATTRIBUTION.md` |
| 2 | `Hero` section | `src/components/sections/Hero.tsx` |
| 3 | `About` section | `src/components/sections/About.tsx` |
| 4 | `StatBand` section | `src/components/sections/StatBand.tsx` |
| 5 | `Programs` section + exported `ProgramCard` | `src/components/sections/Programs.tsx` |
| 6 | `Features` section | `src/components/sections/Features.tsx` |
| 7 | `FacilitiesGrid` client component | `src/components/interactive/FacilitiesGrid.tsx` |
| 8 | `Facilities` server component | `src/components/sections/Facilities.tsx` |
| 9 | `News` section | `src/components/sections/News.tsx` |
| 10 | `Achievements` server wrapper | `src/components/sections/Achievements.tsx` |
| 11 | `AchievementScroller` client component | `src/components/interactive/AchievementScroller.tsx` |
| 12 | `Admissions` section | `src/components/sections/Admissions.tsx` |
| 13 | `Contact` section | `src/components/sections/Contact.tsx` |
| 14 | `ScrollReveal` + `LightboxProvider` + landing page assembly + stub page updates + full build verification | `src/components/interactive/ScrollReveal.tsx`, `src/components/interactive/LightboxProvider.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/program/smp/page.tsx`, `src/app/[locale]/program/sma/page.tsx` |

---

## 10. Constraints

- All Phase 1 constraints carry forward (footer disclaimer, no analytics, no forms wired, a11y baseline)
- `output: 'export'` — `LightboxProvider` is `'use client'` but still pre-rendered to HTML during the static build. The portal (`ReactDOM.createPortal`) must use a `mounted` state pattern (`useState(false)` → `useEffect(() => setMounted(true), [])`) to avoid hydration mismatch — only render the portal when `mounted === true`
- `next/image` requires `alt` on every image — all section images must include descriptive alt text from translations
- Tailwind v4 canonical syntax throughout: `rounded-(--radius)`, `shadow-(--shadow)`, `max-w-300`, `shrink-0` etc.
- No new npm dependencies — ScrollReveal, Lightbox, and AchievementScroller are all hand-rolled
