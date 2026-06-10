# concept-school — Claude Code Context

## Project

**Sekolah Bina Pandu Utama** — static school website for a fictional integrated SMP & SMA in Bandung.
Stack: Next.js 15 App Router · `output: 'export'` (static HTML/CSS/JS) · Tailwind CSS v4 · next-intl v3 · TypeScript 5 · React 19.

## Commands

```bash
npm run dev    # dev server at localhost:3000
npm run build  # production static export → out/
npm run lint   # ESLint
```

No test suite configured. Build pass (14/14 static pages) is the verification step.

## Architecture

- `src/app/layout.tsx` — root layout (font loading, metadata)
- `src/app/[locale]/layout.tsx` — locale layout (TopBar, Navbar, Footer, `setRequestLocale`)
- `src/app/[locale]/page.tsx` — landing page: `LightboxProvider` wrapping all 10 sections in `ScrollReveal`
- `src/app/[locale]/program/smp/page.tsx` + `sma/page.tsx` — program stubs with `ProgramCard`
- `src/app/[locale]/berita/page.tsx`, `pengumuman/page.tsx` — stub pages

Locale routing: `/` → redirect to `/id`. Both `id` and `en` are generated via `generateStaticParams`.

## Tailwind CSS v4 Syntax

These are **not** typos — they are canonical v4 syntax:

```
rounded-(--radius)        shadow-(--shadow)        shadow-(--shadow-md)
max-w-300                 min-h-150                shrink-0
gap-px                    min-[860px]:grid-cols-2  min-[820px]:grid-cols-3
```

Design tokens live in `src/styles/app.css` under `@theme { ... }`:
- Colors: `primary`, `primary-dark`, `primary-tint`, `accent`, `accent-dark`, `surface-alt`, `ink`, `ink-muted`, `border`, `border-strong`
- Fonts: `font-heading` (Lora serif), `font-body` (Source Sans)
- `--radius: 4px`, `--shadow`, `--shadow-md`, `--shadow-sm`

## next-intl Pattern

Server components:
```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
const t = await getTranslations('namespace');
```

Message files: `src/messages/id.json` and `src/messages/en.json`
Namespaces: `nav`, `topbar`, `brand`, `hero`, `about`, `stat`, `programs`, `features`, `facilities`, `news`, `achievements`, `admissions`, `contact`, `footer`, `stub`

## Images

All images are Pexels CDN URLs embedded as constants inside each component file — **no files to download**.
Format: `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=...`
`next/image` is configured with `unoptimized: true` + `remotePatterns` for `images.pexels.com`.
Attribution: `public/images/ATTRIBUTION.md`

## Component Map

### Sections (server components)
| File | Section | Notes |
|---|---|---|
| `Hero.tsx` | Hero | `min-h-150`, gradient overlay, ribbon, trust bar |
| `About.tsx` | Tentang Kami | `id="tentang"`, principal portrait, visi/misi |
| `StatBand.tsx` | Stats | `bg-primary-dark`, 4 stats grid |
| `Programs.tsx` | Program | Default export `Programs` + **named export `ProgramCard`** |
| `Features.tsx` | Keunggulan | `gap-px bg-border` hairline grid, 3×2 |
| `Facilities.tsx` | Fasilitas | Server wrapper; passes items to `FacilitiesGrid` |
| `News.tsx` | Berita | `id="berita"`, 2 articles + announcements board |
| `Achievements.tsx` | Prestasi | Server wrapper; passes cards to `AchievementScroller` |
| `Admissions.tsx` | PPDB | `id="ppdb"`, 4-step timeline, requirements, CTAs |
| `Contact.tsx` | Kontak | `id="kontak"`, Google Maps iframe, 3 contact cards, WhatsApp CTA |

### Interactive (client components, `'use client'`)
| File | Purpose |
|---|---|
| `FacilitiesGrid.tsx` | 6-image grid; calls `useLightbox()` on click |
| `AchievementScroller.tsx` | Horizontal scroll with prev/next buttons + snap |
| `LightboxProvider.tsx` | Context provider + `createPortal` overlay; exports `useLightbox` |
| `ScrollReveal.tsx` | `IntersectionObserver` fade-in; no-op for `prefers-reduced-motion` |
| `LangToggle.tsx` | Language switcher (id/en) |
| `MobileMenu.tsx` | Hamburger drawer |

### UI Primitives
`Button`, `Crest`, `Eyebrow`, `Badge` — in `src/components/ui/`

## Key Patterns

**ProgramCard reuse:** Named export from `Programs.tsx`, imported by stub pages:
```tsx
import { ProgramCard } from '@/components/sections/Programs';
<ProgramCard variant="smp" />
```

**LightboxProvider:** Wraps `[locale]/page.tsx` only (not the layout). `mounted` state prevents SSR hydration mismatch in static export:
```tsx
useEffect(() => { setMounted(true); }, []);
// overlay = mounted && activeIndex !== null ? createPortal(...) : null
```

**ScrollReveal wraps entire sections** in the landing page — each section is independently animated.

**Hairline grid (Features):** `gap-px bg-border` on the grid container, `bg-white` on each cell.

## Phase Status

- **Phase 1** ✅ — Project scaffold, design tokens, routing, nav shell, UI primitives, bilingual messages, stub pages
- **Phase 2** ✅ — All 10 landing sections, 3 interactive components, landing page assembly, ProgramCard in stubs
- **Phase 3** — Not yet planned. Likely: real content pages (berita, pengumuman, full program pages), CMS integration or static MDX, contact form, SEO/meta, deployment config

## Docs
- Spec: `docs/superpowers/specs/2026-06-11-phase2-landing-sections.md`
- Plan: `docs/superpowers/plans/2026-06-11-phase2-landing-sections.md`
