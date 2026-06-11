# Favicon Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the four BPU favicon/app-icon assets from `handoffs/` into the correct Next.js 15 App Router locations and wire them up in the root layout.

**Architecture:** Two primary icons (`icon.svg`, `apple-icon.png`) go into `src/app/` where Next.js auto-emits their `<link>` tags. The two PNG fallbacks go into `public/` and are referenced explicitly via the metadata `icons` field. `themeColor` is declared via the `viewport` export (Next.js 15 pattern).

**Tech Stack:** Next.js 15 App Router · TypeScript · static export (`output: 'export'`)

---

## File Map

| Action | Path |
|---|---|
| Create | `src/app/icon.svg` (copy from `handoffs/favicon.svg`) |
| Create | `src/app/apple-icon.png` (copy from `handoffs/apple-touch-icon.png`) |
| Create | `public/favicon-32.png` (copy from `handoffs/favicon-32.png`) |
| Create | `public/favicon-48.png` (copy from `handoffs/favicon-48.png`) |
| Modify | `src/app/layout.tsx` |

---

## Task 1: Copy favicon assets

**Files:**
- Create: `src/app/icon.svg`
- Create: `src/app/apple-icon.png`
- Create: `public/favicon-32.png`
- Create: `public/favicon-48.png`

No test suite exists in this project — build verification (`npm run build`) is the check.

- [ ] **Step 1: Copy SVG icon to App Router location**

Run from the project root:
```powershell
Copy-Item "handoffs\favicon.svg" "src\app\icon.svg"
```

- [ ] **Step 2: Copy Apple touch icon to App Router location**

```powershell
Copy-Item "handoffs\apple-touch-icon.png" "src\app\apple-icon.png"
```

- [ ] **Step 3: Copy PNG fallbacks to public/**

```powershell
Copy-Item "handoffs\favicon-32.png" "public\favicon-32.png"
Copy-Item "handoffs\favicon-48.png" "public\favicon-48.png"
```

- [ ] **Step 4: Verify files exist**

```powershell
Get-ChildItem src\app\icon.svg, src\app\apple-icon.png, public\favicon-32.png, public\favicon-48.png
```

Expected: all four files listed with non-zero sizes.

- [ ] **Step 5: Commit**

```bash
git add src/app/icon.svg src/app/apple-icon.png public/favicon-32.png public/favicon-48.png
git commit -m "feat: add favicon and app-icon assets from handoffs"
```

---

## Task 2: Wire favicons in root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx`**

Replace the entire file content with:

```typescript
import type { Metadata, Viewport } from 'next';
import '@/styles/app.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
```

Notes:
- `Viewport` is a named export from `next` (available since Next.js 14.0).
- `icon.svg` and `apple-icon.png` are **not** listed in `metadata.icons` — App Router convention auto-handles them from their file placement in `src/app/`.
- PNG entries use absolute paths from `public/` root (i.e. `/favicon-32.png`).

- [ ] **Step 2: Run the build to verify no regressions**

```bash
npm run build
```

Expected: build completes with 14/14 static pages generated, no TypeScript or ESLint errors. The `out/` directory should be produced.

- [ ] **Step 3: Spot-check generated HTML for favicon tags**

```powershell
Select-String -Path "out\id\index.html" -Pattern "icon|apple|theme-color"
```

Expected output (order may vary):
```
<link rel="icon" href="/_next/static/media/icon.*.svg" type="image/svg+xml" ...>
<link rel="apple-touch-icon" href="/apple-icon.png" ...>
<link rel="icon" sizes="32x32" type="image/png" href="/favicon-32.png">
<link rel="icon" sizes="48x48" type="image/png" href="/favicon-48.png">
<meta name="theme-color" content="#15294D">
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire favicon metadata and themeColor in root layout"
```
