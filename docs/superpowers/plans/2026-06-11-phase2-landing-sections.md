# Phase 2 — Landing Page Sections & Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 10 landing page content sections, 3 interactive client components, and wire everything into a complete production-ready static site.

**Architecture:** Server components fetch translations and pass data to client sub-components where interactivity is needed. `LightboxProvider` wraps `[locale]/page.tsx` (not the layout). `ProgramCard` is a named export from `Programs.tsx` reused in stub pages. All images are Pexels CDN URLs embedded as constants in each component file.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, next-intl v3, `next/image` with `unoptimized: true` + Pexels CDN, React 19, TypeScript 5.

---

## File Map

| Action | Path |
|---|---|
| Modify | `next.config.ts` |
| Modify | `public/images/ATTRIBUTION.md` |
| Create | `src/components/sections/Hero.tsx` |
| Create | `src/components/sections/About.tsx` |
| Create | `src/components/sections/StatBand.tsx` |
| Create | `src/components/sections/Programs.tsx` |
| Create | `src/components/sections/Features.tsx` |
| Create | `src/components/interactive/FacilitiesGrid.tsx` |
| Create | `src/components/sections/Facilities.tsx` |
| Create | `src/components/sections/News.tsx` |
| Create | `src/components/sections/Achievements.tsx` |
| Create | `src/components/interactive/AchievementScroller.tsx` |
| Create | `src/components/sections/Admissions.tsx` |
| Create | `src/components/sections/Contact.tsx` |
| Create | `src/components/interactive/ScrollReveal.tsx` |
| Create | `src/components/interactive/LightboxProvider.tsx` |
| Replace | `src/app/[locale]/page.tsx` |
| Modify | `src/app/[locale]/program/smp/page.tsx` |
| Modify | `src/app/[locale]/program/sma/page.tsx` |

---

### Task 1: next.config.ts remotePatterns + ATTRIBUTION.md

**Files:**
- Modify: `next.config.ts`
- Modify: `public/images/ATTRIBUTION.md`

- [ ] **Step 1: Add remotePatterns to next.config.ts**

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Replace ATTRIBUTION.md with chosen Pexels photo IDs**

```markdown
# Image Attribution

All images sourced from [Pexels](https://www.pexels.com/) under the [Pexels License](https://www.pexels.com/license/).

| Slot | Photo ID | Pexels Page |
|---|---|---|
| Hero background | 256395 | https://www.pexels.com/photo/256395 |
| About section | 3769021 | https://www.pexels.com/photo/3769021 |
| Principal portrait | 2379004 | https://www.pexels.com/photo/2379004 |
| Facility — Lab IPA | 2280571 | https://www.pexels.com/photo/2280571 |
| Facility — Perpustakaan | 590493 | https://www.pexels.com/photo/590493 |
| Facility — Lapangan | 1634149 | https://www.pexels.com/photo/1634149 |
| Facility — Ruang Komputer | 1181244 | https://www.pexels.com/photo/1181244 |
| Facility — Aula | 257636 | https://www.pexels.com/photo/257636 |
| Facility — Ruang Kelas | 289737 | https://www.pexels.com/photo/289737 |
| News thumb 1 | 8613312 | https://www.pexels.com/photo/8613312 |
| News thumb 2 | 1184579 | https://www.pexels.com/photo/1184579 |

> If any image loads as "Photo not found", visit the Pexels page and pick a replacement — update the ID constant at the top of the relevant component file.
```

- [ ] **Step 3: Verify build still passes**

```
npm run build
```

Expected: `✓ Generating static pages (14/14)` with no errors.

- [ ] **Step 4: Commit**

```
git add next.config.ts public/images/ATTRIBUTION.md
git commit -m "feat: add Pexels remotePatterns and image attribution"
```

---

### Task 2: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Button from '@/components/ui/Button';

const HERO_IMAGE =
  'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1440&h=900&dpr=1';

export default async function Hero() {
  const t = await getTranslations('hero');
  const parts = t('h1').split(', ');
  const firstLine = parts[0];
  const secondLine = parts.slice(1).join(', ');

  return (
    <section className="relative overflow-hidden min-h-150 flex flex-col">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(14,28,54,0.88) 40%, rgba(14,28,54,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ribbon */}
      <div className="absolute top-6 right-0 z-10 bg-accent text-primary text-xs font-semibold px-5 py-1.5 shadow-(--shadow)">
        {t('ribbon')}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-300 mx-auto px-6 flex-1 flex flex-col justify-center py-24">
        <h1
          className="font-heading font-semibold text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
        >
          {firstLine},<br />
          <span className="text-accent">{secondLine}</span>
        </h1>
        <p className="text-white/80 max-w-xl mb-6 text-lg leading-relaxed">{t('sub')}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70 mb-8">
          <span>{t('meta1')}</span>
          <span className="text-white/30" aria-hidden="true">·</span>
          <span>{t('meta2')}</span>
          <span className="text-white/30" aria-hidden="true">·</span>
          <span>{t('meta3')}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" href="#ppdb">{t('cta1')}</Button>
          <Button variant="outline-light" href="#tentang">{t('cta2')}</Button>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 bg-primary-dark/80 border-t border-white/10">
        <div className="max-w-300 mx-auto px-6 py-4 grid grid-cols-2 min-[680px]:grid-cols-4 gap-4">
          {([t('trust1'), t('trust2'), t('trust3'), t('trust4')] as string[]).map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/90 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```
npm run build
```

Expected: clean build, `✓ Generating static pages (14/14)`.

- [ ] **Step 3: Commit**

```
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with background image, ribbon, and trust bar"
```

---

### Task 3: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

```tsx
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&dpr=1';
const PRINCIPAL_IMAGE =
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2';

export default async function About() {
  const t = await getTranslations('about');

  return (
    <section id="tentang" className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
            <h2
              className="font-heading font-semibold text-primary mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
            >
              {t('h2')}
            </h2>
            <p className="text-ink-muted leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-ink-muted leading-relaxed mb-8">{t('p2')}</p>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src={PRINCIPAL_IMAGE}
                  alt={t('principalName')}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">{t('principalName')}</p>
                <p className="text-ink-muted text-xs">{t('principalTitle')}</p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative w-full aspect-[6/7] rounded-(--radius) overflow-hidden shadow-(--shadow-md)">
            <Image
              src={ABOUT_IMAGE}
              alt={t('eyebrow')}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="mt-16 pt-12 border-t border-border grid grid-cols-1 min-[860px]:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 text-lg">{t('visiLabel')}</h3>
            <p className="font-heading italic text-ink leading-relaxed text-[1.05rem]">
              &ldquo;{t('visiText')}&rdquo;
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 text-lg">{t('misiLabel')}</h3>
            <ol className="space-y-3">
              {(['misi1', 'misi2', 'misi3', 'misi4', 'misi5'] as const).map((key, i) => (
                <li key={key} className="flex gap-3 text-ink-muted text-sm leading-relaxed">
                  <span className="font-semibold text-accent shrink-0 w-6 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(key)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```
git add src/components/sections/About.tsx
git commit -m "feat: add About section with principal block and Visi & Misi"
```

---

### Task 4: StatBand section

**Files:**
- Create: `src/components/sections/StatBand.tsx`

- [ ] **Step 1: Create StatBand.tsx**

```tsx
import { getTranslations } from 'next-intl/server';

export default async function StatBand() {
  const t = await getTranslations('stat');

  const stats = [
    { icon: '★', value: t('yearValue'), label: t('yearLabel') },
    { icon: '✦', value: t('alumniValue'), label: t('alumniLabel') },
    { icon: '✦', value: t('teachersValue'), label: t('teachersLabel') },
    { icon: '★', value: t('awardsValue'), label: t('awardsLabel') },
  ];

  return (
    <section className="bg-primary-dark text-white py-14">
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-2 min-[680px]:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center py-6 px-4 ${
                i < stats.length - 1 ? 'min-[680px]:border-r border-white/20' : ''
              }`}
            >
              <span className="text-accent text-xl mb-2" aria-hidden="true">{stat.icon}</span>
              <span className="font-heading font-bold text-accent text-4xl leading-tight">
                {stat.value}
              </span>
              <span className="text-white/70 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```
git add src/components/sections/StatBand.tsx
git commit -m "feat: add StatBand section with 4 stats"
```

---

### Task 5: Programs section + exported ProgramCard

**Files:**
- Create: `src/components/sections/Programs.tsx`

- [ ] **Step 1: Create Programs.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import Badge from '@/components/ui/Badge';

interface ProgramCardProps {
  variant: 'smp' | 'sma';
}

export async function ProgramCard({ variant }: ProgramCardProps) {
  const t = await getTranslations('programs');
  const isSmp = variant === 'smp';

  const title    = isSmp ? t('smpTitle')    : t('smaTitle');
  const grade    = isSmp ? t('smpGrade')    : t('smaGrade');
  const desc     = isSmp ? t('smpDesc')     : t('smaDesc');
  const features = isSmp
    ? [t('smpFeature1'), t('smpFeature2'), t('smpFeature3'), t('smpFeature4'), t('smpFeature5')]
    : [t('smaFeature1'), t('smaFeature2'), t('smaFeature3'), t('smaFeature4'), t('smaFeature5')];
  const href = isSmp ? '/program/smp' : '/program/sma';

  return (
    <div className="border border-border rounded-(--radius) shadow-(--shadow) bg-white flex flex-col h-full">
      <div className="p-6 pb-4 border-b border-border">
        <Badge variant="square" color="primary" className="mb-3">
          {isSmp ? 'SMP' : 'SMA'}
        </Badge>
        <h3 className="font-heading font-semibold text-primary text-xl mb-1">{title}</h3>
        <p className="text-accent text-sm font-medium">{grade}</p>
      </div>

      <div className="p-6 flex-1">
        <p className="text-ink-muted text-sm leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
              <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-border flex items-center justify-between">
        <Badge variant="pill" color="accent">{t('curriculumBadge')}</Badge>
        <Link
          href={href}
          className="text-primary text-sm font-semibold hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
        >
          {t('detail')}
        </Link>
      </div>
    </div>
  );
}

export default async function Programs() {
  const t = await getTranslations('programs');

  return (
    <section id="program" className="bg-surface-alt py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-6 mb-8">
          <ProgramCard variant="smp" />
          <ProgramCard variant="sma" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <Badge variant="pill" color="default">{t('curriculumBadge')}</Badge>
          <Badge variant="pill" color="default">{t('integratedBadge')}</Badge>
        </div>
        <p className="text-center text-ink-muted text-sm max-w-xl mx-auto">{t('note')}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```
git add src/components/sections/Programs.tsx
git commit -m "feat: add Programs section with exported ProgramCard"
```

---

### Task 6: Features section

**Files:**
- Create: `src/components/sections/Features.tsx`

- [ ] **Step 1: Create Features.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

const ICONS = ['📖', '👨‍🏫', '🏫', '🏆', '🌱', '👪'];

export default async function Features() {
  const t = await getTranslations('features');

  const items = [
    { icon: ICONS[0], title: t('1title'), desc: t('1desc') },
    { icon: ICONS[1], title: t('2title'), desc: t('2desc') },
    { icon: ICONS[2], title: t('3title'), desc: t('3desc') },
    { icon: ICONS[3], title: t('4title'), desc: t('4desc') },
    { icon: ICONS[4], title: t('5title'), desc: t('5desc') },
    { icon: ICONS[5], title: t('6title'), desc: t('6desc') },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3 gap-px bg-border border border-border rounded-(--radius) overflow-hidden">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 hover:bg-primary-tint transition-colors"
            >
              <div
                className="w-10 h-10 border border-border rounded-(--radius) flex items-center justify-center text-xl mb-4"
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">{title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```
git add src/components/sections/Features.tsx
git commit -m "feat: add Features section with hairline 3x2 grid"
```

---

### Task 7: FacilitiesGrid client component

**Files:**
- Create: `src/components/interactive/FacilitiesGrid.tsx`

- [ ] **Step 1: Create FacilitiesGrid.tsx**

```tsx
'use client';

import Image from 'next/image';
import { useLightbox } from '@/components/interactive/LightboxProvider';

export interface FacilityItem {
  src: string;
  caption: string;
}

export default function FacilitiesGrid({ items }: { items: FacilityItem[] }) {
  const { openLightbox } = useLightbox();

  const lightboxItems = items.map(({ src, caption }) => ({ src, caption }));

  return (
    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => openLightbox(index, lightboxItems)}
          className="group rounded-(--radius) overflow-hidden shadow-(--shadow) focus-visible:outline-2 focus-visible:outline-accent text-left border border-border"
          aria-label={`Lihat foto ${item.caption}`}
        >
          <figure className="m-0">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <figcaption className="flex items-center justify-between px-3 py-2 bg-white border-t border-border">
              <span className="text-sm font-medium text-ink">{item.caption}</span>
              <span className="text-xs text-ink-muted tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        </button>
      ))}
    </div>
  );
}
```

**Note:** `FacilitiesGrid` imports `useLightbox` from `LightboxProvider`, which does not exist yet. TypeScript will error until Task 14 creates `LightboxProvider.tsx`. The build will fail after this task until Task 14 is complete — that is expected. Do NOT verify build after this task; continue to Task 8.

- [ ] **Step 2: Commit**

```
git add src/components/interactive/FacilitiesGrid.tsx
git commit -m "feat: add FacilitiesGrid client component with lightbox trigger"
```

---

### Task 8: Facilities server component

**Files:**
- Create: `src/components/sections/Facilities.tsx`

- [ ] **Step 1: Create Facilities.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import FacilitiesGrid, { type FacilityItem } from '@/components/interactive/FacilitiesGrid';

const FAC_IMAGES = [
  'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/1634149/pexels-photo-1634149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
];

export default async function Facilities() {
  const t = await getTranslations('facilities');

  const items: FacilityItem[] = (
    [t('fac1'), t('fac2'), t('fac3'), t('fac4'), t('fac5'), t('fac6')] as string[]
  ).map((caption, i) => ({ src: FAC_IMAGES[i], caption }));

  return (
    <section id="fasilitas" className="bg-surface-alt py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>
        <FacilitiesGrid items={items} />
      </div>
    </section>
  );
}
```

**Note:** Build will still fail (missing LightboxProvider). Continue to Task 9.

- [ ] **Step 2: Commit**

```
git add src/components/sections/Facilities.tsx
git commit -m "feat: add Facilities server component passing image data to FacilitiesGrid"
```

---

### Task 9: News section

**Files:**
- Create: `src/components/sections/News.tsx`

- [ ] **Step 1: Create News.tsx**

```tsx
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import Badge from '@/components/ui/Badge';

const NEWS_IMAGES = [
  'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
  'https://images.pexels.com/photos/1184579/pexels-photo-1184579.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
];

export default async function News() {
  const t = await getTranslations('news');

  const articles = [
    {
      tagLabel: t('tagPrestasi'),
      tagColor: 'accent' as const,
      date: t('article1Date'),
      title: t('article1Title'),
      excerpt: t('article1Excerpt'),
      image: NEWS_IMAGES[0],
    },
    {
      tagLabel: t('tagKegiatan'),
      tagColor: 'default' as const,
      date: t('article2Date'),
      title: t('article2Title'),
      excerpt: t('article2Excerpt'),
      image: NEWS_IMAGES[1],
    },
  ];

  const announcements = [
    { date: t('ann1Date'), text: t('ann1Text') },
    { date: t('ann2Date'), text: t('ann2Text') },
    { date: t('ann3Date'), text: t('ann3Text') },
    { date: t('ann4Date'), text: t('ann4Text') },
  ];

  return (
    <section id="berita" className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[920px]:grid-cols-[2fr_1fr] gap-8">
          {/* News articles */}
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="flex flex-col min-[540px]:flex-row gap-0 border border-border rounded-(--radius) overflow-hidden shadow-(--shadow)"
              >
                <div className="relative w-full min-[540px]:w-40 shrink-0 aspect-[8/5] min-[540px]:aspect-auto">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="square" color={article.tagColor}>
                        {article.tagLabel}
                      </Badge>
                      <span className="text-xs text-ink-muted">{article.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-primary mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-ink-muted text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link
                    href="/berita"
                    className="text-primary text-sm font-semibold hover:text-accent transition-colors mt-3 inline-block focus-visible:outline-2 focus-visible:outline-accent rounded"
                  >
                    {t('readmore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Announcements */}
          <aside className="border border-border rounded-(--radius) overflow-hidden shadow-(--shadow) self-start">
            <div className="bg-primary px-4 py-3">
              <h3 className="font-heading font-semibold text-white">{t('announceTitle')}</h3>
            </div>
            <ul className="divide-y divide-border">
              {announcements.map((ann) => (
                <li key={ann.text} className="px-4 py-3">
                  <span className="text-xs text-accent font-medium block mb-0.5">{ann.date}</span>
                  <p className="text-sm text-ink leading-snug">{ann.text}</p>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 border-t border-border">
              <Link
                href="/pengumuman"
                className="text-primary text-sm font-semibold hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
              >
                {t('announceAll')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
```

**Note:** Build still fails (missing LightboxProvider). Continue to Task 10.

- [ ] **Step 2: Commit**

```
git add src/components/sections/News.tsx
git commit -m "feat: add News section with article cards and announcements board"
```

---

### Task 10: Achievements server wrapper

**Files:**
- Create: `src/components/sections/Achievements.tsx`

- [ ] **Step 1: Create Achievements.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import AchievementScroller, {
  type AchievementCard,
} from '@/components/interactive/AchievementScroller';

export default async function Achievements() {
  const t = await getTranslations('achievements');

  const cards: AchievementCard[] = [
    { year: t('item1Year'), level: t('item1Level') as AchievementCard['level'], title: t('item1Title'), result: t('item1Result') },
    { year: t('item2Year'), level: t('item2Level') as AchievementCard['level'], title: t('item2Title'), result: t('item2Result') },
    { year: t('item3Year'), level: t('item3Level') as AchievementCard['level'], title: t('item3Title'), result: t('item3Result') },
    { year: t('item4Year'), level: t('item4Level') as AchievementCard['level'], title: t('item4Title'), result: t('item4Result') },
    { year: t('item5Year'), level: t('item5Level') as AchievementCard['level'], title: t('item5Title'), result: t('item5Result') },
    { year: t('item6Year'), level: t('item6Level') as AchievementCard['level'], title: t('item6Title'), result: t('item6Result') },
  ];

  const levelLabels = {
    kota:     t('levelKota'),
    provinsi: t('levelProvinsi'),
    nasional: t('levelNasional'),
  };

  return (
    <section className="bg-surface-alt py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>
        <AchievementScroller cards={cards} levelLabels={levelLabels} />
      </div>
    </section>
  );
}
```

**Note:** Build still fails (missing `AchievementScroller` and `LightboxProvider`). Continue to Task 11.

- [ ] **Step 2: Commit**

```
git add src/components/sections/Achievements.tsx
git commit -m "feat: add Achievements server wrapper passing card data to scroller"
```

---

### Task 11: AchievementScroller client component

**Files:**
- Create: `src/components/interactive/AchievementScroller.tsx`

- [ ] **Step 1: Create AchievementScroller.tsx**

```tsx
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export interface AchievementCard {
  year: string;
  level: 'kota' | 'provinsi' | 'nasional';
  title: string;
  result: string;
}

interface AchievementScrollerProps {
  cards: AchievementCard[];
  levelLabels: Record<'kota' | 'provinsi' | 'nasional', string>;
}

const LEVEL_COLORS: Record<'kota' | 'provinsi' | 'nasional', string> = {
  kota:     'bg-primary-tint text-primary',
  provinsi: 'bg-accent/15 text-accent-dark',
  nasional: 'bg-primary text-white',
};

export default function AchievementScroller({ cards, levelLabels }: AchievementScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft,  setCanScrollLeft]  = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showButtons,    setShowButtons]    = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflows = el.scrollWidth > el.clientWidth + 1;
    setShowButtons(overflows);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);
    return () => window.removeEventListener('resize', updateButtons);
  }, [updateButtons]);

  const scroll = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? 280 : -280, behavior: 'smooth' });
    setTimeout(updateButtons, 350);
  };

  return (
    <div className="relative px-6">
      {showButtons && (
        <button
          onClick={() => scroll('prev')}
          disabled={!canScrollLeft}
          aria-label="Previous achievements"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-border rounded-full shadow-(--shadow) flex items-center justify-center hover:bg-primary-tint transition-colors disabled:opacity-30 text-lg leading-none"
        >
          ‹
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={updateButtons}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-64 border border-border rounded-(--radius) p-5 shadow-(--shadow) bg-white"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-accent text-primary text-xs font-bold px-2 py-0.5 rounded-(--radius)">
                {card.year}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${LEVEL_COLORS[card.level]}`}
              >
                {levelLabels[card.level]}
              </span>
            </div>
            <p className="font-semibold text-ink text-sm leading-snug mb-3">{card.title}</p>
            <div className="border-t border-accent pt-3">
              <span className="text-accent font-bold text-sm">{card.result}</span>
            </div>
          </div>
        ))}
      </div>

      {showButtons && (
        <button
          onClick={() => scroll('next')}
          disabled={!canScrollRight}
          aria-label="Next achievements"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-border rounded-full shadow-(--shadow) flex items-center justify-center hover:bg-primary-tint transition-colors disabled:opacity-30 text-lg leading-none"
        >
          ›
        </button>
      )}
    </div>
  );
}
```

**Note:** Build still fails (missing `LightboxProvider`). Continue to Task 12.

- [ ] **Step 2: Commit**

```
git add src/components/interactive/AchievementScroller.tsx
git commit -m "feat: add AchievementScroller client component with prev/next controls"
```

---

### Task 12: Admissions section

**Files:**
- Create: `src/components/sections/Admissions.tsx`

- [ ] **Step 1: Create Admissions.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

export default async function Admissions() {
  const t = await getTranslations('admissions');

  const steps = [
    { num: t('step1Num'), title: t('step1Title'), date: t('step1Date'), desc: t('step1Desc') },
    { num: t('step2Num'), title: t('step2Title'), date: t('step2Date'), desc: t('step2Desc') },
    { num: t('step3Num'), title: t('step3Title'), date: t('step3Date'), desc: t('step3Desc') },
    { num: t('step4Num'), title: t('step4Title'), date: t('step4Date'), desc: t('step4Desc') },
  ];

  const requirements = [
    t('req1'), t('req2'), t('req3'), t('req4'), t('req5'), t('req6'),
  ];

  return (
    <section id="ppdb" className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 min-[620px]:grid-cols-2 min-[920px]:grid-cols-4 gap-4 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="border-t-2 border-accent border border-border rounded-(--radius) shadow-(--shadow) pt-4 px-4 pb-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm mb-3 shrink-0">
                {step.num}
              </div>
              <h3 className="font-heading font-semibold text-primary mb-1">{step.title}</h3>
              <p className="text-accent text-xs font-semibold mb-2">{step.date}</p>
              <p className="text-ink-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-6 mb-10 border border-border rounded-(--radius) p-6 bg-primary-tint">
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {t('quotaSmp')}
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {t('quotaSma')}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-primary mb-3 text-sm">{t('reqTitle')}</h3>
            <ul className="space-y-2">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="accent" href="#">{t('cta1')}</Button>
          <Button variant="outline" href="https://wa.me/6281234567890">{t('cta2')}</Button>
        </div>
      </div>
    </section>
  );
}
```

**Note:** Build still fails. Continue to Task 13.

- [ ] **Step 2: Commit**

```
git add src/components/sections/Admissions.tsx
git commit -m "feat: add Admissions section with timeline, info panel, and CTAs"
```

---

### Task 13: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section id="kontak" className="bg-surface-alt py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-(--radius) overflow-hidden border border-border shadow-(--shadow)">
            <iframe
              src="https://maps.google.com/maps?q=-6.9175,107.6191&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School location map"
            />
          </div>

          {/* Contact cards */}
          <div className="space-y-4">
            {/* Address */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-heading font-semibold text-primary mb-2 text-sm">
                Sekolah Bina Pandu Utama
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">{t('address')}</p>
            </div>

            {/* Tata Usaha */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-semibold text-ink mb-3 text-sm">{t('tuTitle')}</h3>
              <p className="text-sm text-ink-muted mb-1">📞 {t('tuPhone')}</p>
              <p className="text-sm text-ink-muted">🕐 {t('tuHours')}</p>
            </div>

            {/* PPDB */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-semibold text-ink mb-3 text-sm">{t('ppdbTitle')}</h3>
              <p className="text-sm text-ink-muted mb-4">📞 {t('ppdbPhone')}</p>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold rounded-(--radius) transition-colors bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 focus-visible:outline-2 focus-visible:outline-accent"
              >
                💬 {t('ppdbWa')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Note:** Build still fails. Continue to Task 14.

- [ ] **Step 2: Commit**

```
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section with Google Maps embed and contact cards"
```

---

### Task 14: ScrollReveal + LightboxProvider + landing page assembly + stub updates + build

**Files:**
- Create: `src/components/interactive/ScrollReveal.tsx`
- Create: `src/components/interactive/LightboxProvider.tsx`
- Replace: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/program/smp/page.tsx`
- Modify: `src/app/[locale]/program/sma/page.tsx`

- [ ] **Step 1: Create ScrollReveal.tsx**

```tsx
'use client';

import { useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create LightboxProvider.tsx**

```tsx
'use client';

import {
  createContext, useContext, useState, useEffect,
  useCallback, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LightboxItem {
  src: string;
  caption: string;
}

interface LightboxContextValue {
  openLightbox:  (index: number, items: LightboxItem[]) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used inside LightboxProvider');
  return ctx;
}

export default function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [mounted,     setMounted]     = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [items,       setItems]       = useState<LightboxItem[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const openLightbox = useCallback((index: number, newItems: LightboxItem[]) => {
    setItems(newItems);
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i > 0 ? i - 1 : items.length - 1) : null)),
  [items.length]);

  const next = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i < items.length - 1 ? i + 1 : 0) : null)),
  [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeIndex, closeLightbox, prev, next]);

  const overlay =
    mounted && activeIndex !== null
      ? createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div
              className="relative flex flex-col items-center gap-3 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-[min(900px,88vw)] aspect-[4/3]">
                <Image
                  src={items[activeIndex].src}
                  alt={items[activeIndex].caption}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <p className="text-white/80 text-sm text-center">{items[activeIndex].caption}</p>
            </div>

            {/* Close */}
            <button
              ref={closeBtnRef}
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl leading-none focus-visible:outline-2 focus-visible:outline-accent"
            >
              ×
            </button>

            {/* Prev */}
            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl leading-none focus-visible:outline-2 focus-visible:outline-accent"
              >
                ‹
              </button>
            )}

            {/* Next */}
            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-5xl leading-none focus-visible:outline-2 focus-visible:outline-accent"
              >
                ›
              </button>
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {overlay}
    </LightboxContext.Provider>
  );
}
```

- [ ] **Step 3: Replace [locale]/page.tsx with full landing page**

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

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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

- [ ] **Step 4: Update smp/page.tsx to show ProgramCard**

Replace the full contents of `src/app/[locale]/program/smp/page.tsx`:

```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';
import { ProgramCard } from '@/components/sections/Programs';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function SmpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-300 mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/" className="hover:text-primary transition-colors">{tNav('program')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('smpTitle')}</span>
        </div>
      </div>

      <div className="max-w-300 mx-auto px-6 pt-20 pb-10">
        <Eyebrow className="mb-3">{tNav('program')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('smpTitle')}</h1>
      </div>

      <div className="max-w-300 mx-auto px-6 pb-10">
        <div className="max-w-xl">
          <ProgramCard variant="smp" />
        </div>
      </div>

      <div className="max-w-300 mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-(--radius) p-10 shadow-(--shadow)">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 5: Update sma/page.tsx to show ProgramCard**

Replace the full contents of `src/app/[locale]/program/sma/page.tsx`:

```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';
import { ProgramCard } from '@/components/sections/Programs';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function SmaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-300 mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/" className="hover:text-primary transition-colors">{tNav('program')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('smaTitle')}</span>
        </div>
      </div>

      <div className="max-w-300 mx-auto px-6 pt-20 pb-10">
        <Eyebrow className="mb-3">{tNav('program')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('smaTitle')}</h1>
      </div>

      <div className="max-w-300 mx-auto px-6 pb-10">
        <div className="max-w-xl">
          <ProgramCard variant="sma" />
        </div>
      </div>

      <div className="max-w-300 mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-(--radius) p-10 shadow-(--shadow)">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 6: Run build — expect clean pass**

```
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Generating static pages (14/14)
```

If TypeScript errors appear in section files, check that:
- All `getTranslations` calls use the correct namespace matching `src/messages/id.json`
- All `next/image` components have an `alt` prop
- `LightboxProvider` default export and `useLightbox` named export are correct

- [ ] **Step 7: Smoke-test in browser**

```
npm run dev
```

Visit and verify:
- `http://localhost:3000` → redirects to `/id`
- `http://localhost:3000/id` → full landing page with Hero, all sections visible
- `http://localhost:3000/en` → English version
- Facilities grid → click any image → lightbox opens, `Escape` closes, arrows navigate
- Achievements row → arrows appear and scroll (if viewport is narrow enough to overflow)
- `http://localhost:3000/id/program/smp` → breadcrumb + ProgramCard + coming-soon card
- `http://localhost:3000/id/program/sma` → breadcrumb + ProgramCard + coming-soon card
- Language toggle in Navbar → switches between `/id/...` and `/en/...`
- Navbar hamburger (mobile viewport) → drawer opens, closes on ✕/backdrop/Escape

- [ ] **Step 8: Commit**

```
git add src/components/interactive/ScrollReveal.tsx \
        src/components/interactive/LightboxProvider.tsx \
        src/app/[locale]/page.tsx \
        src/app/[locale]/program/smp/page.tsx \
        src/app/[locale]/program/sma/page.tsx
git commit -m "feat: wire landing page with all sections, ScrollReveal, and LightboxProvider"
```

---

## Self-Review

**Spec coverage:**
- ✅ `next.config.ts` remotePatterns → Task 1
- ✅ ATTRIBUTION.md → Task 1
- ✅ Hero → Task 2
- ✅ About → Task 3
- ✅ StatBand → Task 4
- ✅ Programs + ProgramCard export → Task 5
- ✅ Features → Task 6
- ✅ FacilitiesGrid client → Task 7
- ✅ Facilities server → Task 8
- ✅ News → Task 9
- ✅ Achievements server → Task 10
- ✅ AchievementScroller → Task 11
- ✅ Admissions → Task 12
- ✅ Contact → Task 13
- ✅ ScrollReveal + LightboxProvider + landing assembly + stub updates → Task 14

**Placeholder scan:** No TBD, no TODO. All Pexels IDs are specific. Google Maps URL is specific. WhatsApp number is a realistic placeholder (`6281234567890`).

**Type consistency:** `AchievementCard` defined in `AchievementScroller.tsx` and imported by `Achievements.tsx`. `FacilityItem` defined in `FacilitiesGrid.tsx` and imported by `Facilities.tsx`. `useLightbox` exported from `LightboxProvider.tsx` and imported by `FacilitiesGrid.tsx`. All consistent.
