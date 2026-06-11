# Favicon Setup — Sekolah Bina Pandu Utama

**Date:** 2026-06-11  
**Status:** Approved

## Goal

Wire the four favicon/app-icon assets from `handoffs/` into the Next.js 15 App Router project so all browsers, iOS home screens, and tab bars display the BPU crest mark.

## Assets (source: `handoffs/`)

| File | Size | Purpose |
|---|---|---|
| `favicon.svg` | vector | Primary icon — crisp at any DPI |
| `favicon-32.png` | 32×32 | PNG fallback for older browsers |
| `favicon-48.png` | 48×48 | PNG fallback for higher-DPI contexts |
| `apple-touch-icon.png` | 180×180 | iOS home-screen icon |

## Approach: App Router convention + explicit metadata

Follow the Next.js 15 App Router file convention for the two primary icons; reference PNG fallbacks explicitly in metadata.

### File placement

| Source | Destination | Why |
|---|---|---|
| `handoffs/favicon.svg` | `src/app/icon.svg` | App Router auto-emits `<link rel="icon" type="image/svg+xml">` |
| `handoffs/apple-touch-icon.png` | `src/app/apple-icon.png` | App Router auto-emits `<link rel="apple-touch-icon">` |
| `handoffs/favicon-32.png` | `public/favicon-32.png` | Served statically; referenced in metadata |
| `handoffs/favicon-48.png` | `public/favicon-48.png` | Served statically; referenced in metadata |

### `src/app/layout.tsx` changes

Add PNG fallbacks to `metadata.icons` and add a `viewport` export for `themeColor`:

```typescript
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Sekolah Bina Pandu Utama',
  description: 'SMP & SMA terintegrasi di Bandung, Jawa Barat.',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#15294D',
};
```

The SVG and Apple icons are auto-handled by the App Router convention files — no need to list them in metadata explicitly.

## Out of scope

- Converting SVG text nodes to outlined paths (noted in handoff README as a pre-launch polish item, not required now)
- Generating a `favicon.ico` (the SVG + PNG fallbacks cover all modern browsers)

## Verification

After implementation, `npm run build` should complete cleanly (14/14 pages) and the `out/` HTML should contain the correct `<link>` tags in `<head>`.
