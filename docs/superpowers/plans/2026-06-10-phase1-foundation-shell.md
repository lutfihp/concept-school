# Concept School Phase 1 — Foundation & Shell

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable, navigable Next.js 15 skeleton for Sekolah Bina Pandu Utama — every route resolves, the branded shell (TopBar, Navbar, MobileMenu, Footer) is fully interactive, and all four stub pages render correctly.

**Architecture:** Next.js 15 App Router with `output: 'export'` for fully static HTML/CSS/JS. A `[locale]` path segment serves Indonesian (`/id`) and English (`/en`) from pre-rendered static files — no middleware, no server runtime at deploy time. Root `/` redirects to `/id` via a static meta-refresh page.

**Tech Stack:** Next.js 15, React 19, TypeScript 5 (strict), Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-based `@theme` config), next-intl v3

---

## File Map

All files created in this phase:

| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript strict config |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `next.config.ts` | Static export + next-intl plugin |
| `src/styles/app.css` | `@theme` design tokens + base styles |
| `src/app/layout.tsx` | Root layout (html/body shell) |
| `src/app/page.tsx` | Root redirect → `/id` |
| `src/app/[locale]/layout.tsx` | Locale layout: fonts, NextIntlClientProvider, shell |
| `src/app/[locale]/program/smp/page.tsx` | Stub page |
| `src/app/[locale]/program/sma/page.tsx` | Stub page |
| `src/app/[locale]/berita/page.tsx` | Stub page |
| `src/app/[locale]/pengumuman/page.tsx` | Stub page |
| `src/i18n/routing.ts` | next-intl locale config |
| `src/i18n/request.ts` | next-intl server request config |
| `src/i18n/navigation.ts` | Locale-aware Link/useRouter exports |
| `src/messages/id.json` | Full Indonesian string table |
| `src/messages/en.json` | Full English string table |
| `src/components/ui/Button.tsx` | Button: 5 variants, renders as `<a>` or `<button>` |
| `src/components/ui/Crest.tsx` | Shield monogram (clip-path, CSS only) |
| `src/components/ui/Eyebrow.tsx` | Uppercase section label with gold tick |
| `src/components/ui/Badge.tsx` | Pill (curriculum) and square (news) variants |
| `src/components/layout/TopBar.tsx` | Accreditation strip, hidden ≤860 px (server) |
| `src/components/layout/Footer.tsx` | 3-col footer with disclaimer (server) |
| `src/components/layout/Navbar.tsx` | Sticky nav, scroll shadow, menu toggle (client) |
| `src/components/layout/MobileMenu.tsx` | Right-side drawer, focus trap (client) |
| `src/components/interactive/LangToggle.tsx` | ID/EN segmented control (client) |
| `public/images/ATTRIBUTION.md` | Pexels photo credits |
| `public/images/*.jpg` | 11 photos downloaded from Pexels |

**Note on LangToggle:** The spec lists `LangToggle` under Phase 2 interactive components, but it is required by `Navbar` and `MobileMenu` in Phase 1. It is implemented here in Phase 1; Phase 2 does not need to create it.

---

## Task 1: Project Init & Config

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `next.config.ts`

The project directory already contains `docs/` and `handoffs/`. Do not run `create-next-app` — it would conflict. Initialize manually.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "concept-school",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "next-intl": "^3.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 4: Create `next.config.ts`**

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

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: resolves without errors. `node_modules/` and `package-lock.json` created.

- [ ] **Step 6: Commit**

```bash
git init
git add package.json package-lock.json tsconfig.json postcss.config.mjs next.config.ts
git commit -m "chore: initialize Next.js 15 project with Tailwind v4 and next-intl"
```

---

## Task 2: Design Tokens & Root Layout

**Files:**
- Create: `src/styles/app.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/styles/app.css`**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary:        #15294D;
  --color-primary-dark:   #0E1C36;
  --color-primary-tint:   #EAEEF5;
  --color-accent:         #C2A14D;
  --color-accent-dark:    #A8883A;
  --color-surface-alt:    #F4F6F9;
  --color-ink:            #1C2430;
  --color-ink-muted:      #5B6573;
  --color-border:         #E2E6EC;
  --color-border-strong:  #C9D0DA;

  /* Typography */
  --font-heading: var(--font-lora), Georgia, serif;
  --font-body:    var(--font-source-sans), system-ui, sans-serif;

  /* Shape */
  --radius: 4px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgb(14 28 54 / 0.08);
  --shadow:    0 2px 4px rgb(14 28 54 / 0.10);
  --shadow-md: 0 4px 10px rgb(14 28 54 / 0.10);
}

/* Base */
body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.18;
}

/* Focus rings */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Create `src/app/layout.tsx`**

This is the root layout. It renders `<html>` and `<body>` and imports the global stylesheet. The `[locale]/layout.tsx` (Task 10) handles fonts, i18n, and the visual shell.

```tsx
import type { Metadata } from 'next';
import '@/styles/app.css';

export const metadata: Metadata = {
  title: 'Sekolah Bina Pandu Utama',
  description: 'SMP & SMA terintegrasi di Bandung, Jawa Barat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes (only `next-env.d.ts` may be missing until first `next dev` run — that is fine; `skipLibCheck: true` covers it).

- [ ] **Step 4: Commit**

```bash
git add src/styles/app.css src/app/layout.tsx
git commit -m "feat: add Tailwind v4 design tokens and root layout"
```

---

## Task 3: i18n Setup + Message Files

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/messages/id.json`
- Create: `src/messages/en.json`

The complete message files are written here — both phases — so Phase 2 only needs to consume keys, not add them.

- [ ] **Step 1: Create `src/i18n/routing.ts`**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
});
```

- [ ] **Step 2: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create `src/i18n/navigation.ts`**

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

- [ ] **Step 4: Create `src/messages/id.json`**

```json
{
  "nav": {
    "about": "Tentang Kami",
    "program": "Program",
    "facilities": "Fasilitas",
    "news": "Berita",
    "admissions": "Penerimaan Siswa",
    "contact": "Kontak",
    "cta": "Daftar Sekarang"
  },
  "topbar": {
    "accr": "Terakreditasi A — BAN-S/M",
    "phone": "(022) 1234-5678",
    "email": "info@binapandututama.sch.id"
  },
  "brand": {
    "name": "Sekolah Bina Pandu Utama",
    "tagline": "SMP & SMA",
    "yayasan": "Yayasan Pendidikan Bina Pandu Utama",
    "accr": "Terakreditasi A"
  },
  "hero": {
    "ribbon": "Terakreditasi A",
    "h1": "Membentuk Karakter, Mengukir Prestasi",
    "sub": "Sekolah Bina Pandu Utama — SMP & SMA terintegrasi di bawah naungan Yayasan Pendidikan Bina Pandu Utama.",
    "meta1": "Berdiri sejak 1998",
    "meta2": "Bandung, Jawa Barat",
    "meta3": "Kurikulum Nasional",
    "cta1": "Penerimaan Siswa Baru 2025/2026",
    "cta2": "Pelajari Lebih Lanjut",
    "trust1": "26 Tahun Berpengalaman",
    "trust2": "3.200+ Alumni",
    "trust3": "84 Guru Bersertifikat",
    "trust4": "Akreditasi A BAN-S/M"
  },
  "about": {
    "eyebrow": "Selayang Pandang",
    "h2": "Lembaga yang Dibangun atas Kepercayaan dan Tradisi Keunggulan",
    "p1": "Berdiri sejak tahun 1998, Sekolah Bina Pandu Utama telah mendampingi ribuan siswa dalam perjalanan pendidikan mereka. Di bawah naungan Yayasan Pendidikan Bina Pandu Utama, kami berkomitmen menghadirkan pendidikan nasional berkualitas yang berpijak pada nilai keimanan, kedisiplinan, dan keunggulan akademik.",
    "p2": "Dengan kurikulum yang terus diperbarui, tenaga pendidik bersertifikat, dan fasilitas yang lengkap, kami hadir sebagai mitra terpercaya bagi keluarga yang mendambakan masa depan terbaik bagi putra-putri mereka.",
    "principalName": "Drs. H. Ahmad Fauzi, M.Pd.",
    "principalTitle": "Kepala Sekolah, SMP & SMA Bina Pandu Utama",
    "visiLabel": "Visi",
    "visiText": "Menjadi lembaga pendidikan nasional terkemuka yang melahirkan generasi beriman, berkarakter, dan berprestasi, serta siap menghadapi tantangan zaman.",
    "misiLabel": "Misi",
    "misi1": "Menyelenggarakan pendidikan nasional bermutu yang berpedoman pada nilai keimanan dan akhlak mulia.",
    "misi2": "Mengembangkan potensi akademik dan non-akademik peserta didik secara seimbang dan berkelanjutan.",
    "misi3": "Membentuk budaya belajar yang disiplin, tertib, dan berkarakter di seluruh lingkungan sekolah.",
    "misi4": "Memperkuat kemitraan antara sekolah, keluarga, dan masyarakat dalam mendidik peserta didik.",
    "misi5": "Menyiapkan lulusan yang berdaya saing pada jenjang perguruan tinggi dan dunia kerja."
  },
  "stat": {
    "yearLabel": "Tahun Berdiri",
    "yearValue": "1998",
    "alumniLabel": "Total Alumni",
    "alumniValue": "3.200+",
    "teachersLabel": "Jumlah Guru",
    "teachersValue": "84",
    "awardsLabel": "Prestasi Diraih",
    "awardsValue": "150+"
  },
  "programs": {
    "eyebrow": "Program Pendidikan",
    "h2": "Dua Jenjang, Satu Perjalanan Pendidikan yang Terpadu",
    "smpTitle": "Sekolah Menengah Pertama",
    "smpGrade": "Kelas 7 — 9",
    "smpDesc": "Program SMP kami dirancang untuk membangun fondasi akademik yang kuat sekaligus membentuk karakter siswa di masa-masa kritis perkembangan mereka.",
    "smpFeature1": "Kurikulum Merdeka + KTSP",
    "smpFeature2": "Lab IPA & Komputer",
    "smpFeature3": "Ekstrakurikuler 20+ jenis",
    "smpFeature4": "Bimbingan konseling aktif",
    "smpFeature5": "Program literasi & numerasi",
    "smaTitle": "Sekolah Menengah Atas",
    "smaGrade": "Kelas 10 — 12 · Jurusan IPA & IPS",
    "smaDesc": "Program SMA kami mempersiapkan siswa untuk memasuki perguruan tinggi dan dunia kerja dengan dua penjurusan: IPA dan IPS.",
    "smaFeature1": "Dua penjurusan: IPA & IPS",
    "smaFeature2": "Persiapan SNBT intensif",
    "smaFeature3": "Lab kimia, fisika, biologi",
    "smaFeature4": "Program kunjungan industri",
    "smaFeature5": "Bimbingan karier & beasiswa",
    "detail": "Lihat Detail →",
    "note": "Kedua jenjang berada dalam satu lingkungan sekolah yang terintegrasi, memastikan perjalanan pendidikan yang berkesinambungan dan terawasi dengan baik.",
    "curriculumBadge": "Kurikulum Merdeka",
    "integratedBadge": "Lingkungan Terintegrasi"
  },
  "features": {
    "eyebrow": "Keunggulan Kami",
    "h2": "Mengapa Memilih Sekolah Bina Pandu Utama?",
    "1title": "Kurikulum Nasional Terupdate",
    "1desc": "Kurikulum Merdeka dipadukan dengan pendekatan pembelajaran aktif dan kontekstual.",
    "2title": "Tenaga Pendidik Bersertifikat",
    "2desc": "84 guru dengan sertifikasi nasional, berpengalaman rata-rata 12 tahun di bidangnya.",
    "3title": "Fasilitas Modern & Lengkap",
    "3desc": "Lab IPA, perpustakaan, aula, dan ruang komputer dengan perangkat terkini.",
    "4title": "Rekam Jejak Prestasi",
    "4desc": "Lebih dari 150 penghargaan di tingkat kota, provinsi, dan nasional sejak 2005.",
    "5title": "Pembinaan Karakter & Akhlak",
    "5desc": "Program pembiasaan harian, pesantren kilat, dan kegiatan sosial terstruktur.",
    "6title": "Keterlibatan Orang Tua",
    "6desc": "Komite sekolah aktif, aplikasi monitoring nilai, dan pertemuan rutin wali murid."
  },
  "facilities": {
    "eyebrow": "Fasilitas Sekolah",
    "h2": "Fasilitas yang Menunjang Proses Pembelajaran",
    "fac1": "Laboratorium IPA",
    "fac2": "Perpustakaan",
    "fac3": "Lapangan Olahraga",
    "fac4": "Ruang Komputer",
    "fac5": "Aula Serbaguna",
    "fac6": "Ruang Kelas"
  },
  "news": {
    "eyebrow": "Berita & Pengumuman",
    "h2": "Kabar Terbaru dari Sekolah Kami",
    "tagPrestasi": "Prestasi",
    "tagKegiatan": "Kegiatan",
    "readmore": "Baca Selengkapnya →",
    "article1Tag": "prestasi",
    "article1Date": "15 Mei 2025",
    "article1Title": "Siswa SMA Bina Pandu Raih Juara 1 Olimpiade Kimia Tingkat Provinsi",
    "article1Excerpt": "Ahmad Rizky Pratama, siswa kelas XI IPA 2, berhasil meraih juara pertama dalam ajang Olimpiade Kimia Jawa Barat 2025 yang diikuti oleh 234 peserta dari 67 sekolah.",
    "article2Tag": "kegiatan",
    "article2Date": "8 Mei 2025",
    "article2Title": "Upacara Peringatan Hari Pendidikan Nasional 2025 Bersama Seluruh Warga Sekolah",
    "article2Excerpt": "Seluruh civitas akademika Sekolah Bina Pandu Utama mengikuti upacara bendera memperingati Hari Pendidikan Nasional yang ke-66 dengan khidmat dan penuh semangat.",
    "announceTitle": "Pengumuman Terbaru",
    "announceAll": "Lihat Semua Pengumuman →",
    "ann1Date": "20 Mei 2025",
    "ann1Text": "Jadwal Ujian Akhir Semester Genap 2024/2025",
    "ann2Date": "15 Mei 2025",
    "ann2Text": "Pengumuman Hasil Seleksi PPDB Gelombang 1 T.A. 2025/2026",
    "ann3Date": "10 Mei 2025",
    "ann3Text": "Libur Kenaikan Isa Al-Masih — 29 Mei 2025",
    "ann4Date": "5 Mei 2025",
    "ann4Text": "Rapat Wali Murid Kelas 9 & 12 — Persiapan Kelulusan"
  },
  "achievements": {
    "eyebrow": "Prestasi Kami",
    "h2": "Tradisi Prestasi yang Kami Banggakan",
    "levelKota": "Tingkat Kota",
    "levelProvinsi": "Tingkat Provinsi",
    "levelNasional": "Tingkat Nasional",
    "item1Year": "2025",
    "item1Level": "provinsi",
    "item1Title": "Olimpiade Kimia Jawa Barat",
    "item1Result": "Juara 1",
    "item2Year": "2025",
    "item2Level": "kota",
    "item2Title": "Lomba Karya Tulis Ilmiah Kota Bandung",
    "item2Result": "Juara 1",
    "item3Year": "2024",
    "item3Level": "nasional",
    "item3Title": "Kompetisi Robotika Nasional",
    "item3Result": "Juara 3",
    "item4Year": "2024",
    "item4Level": "provinsi",
    "item4Title": "Lomba Debat Bahasa Inggris Jabar",
    "item4Result": "Juara 2",
    "item5Year": "2024",
    "item5Level": "kota",
    "item5Title": "Turnamen Basket Antar SMA Bandung",
    "item5Result": "Juara 1",
    "item6Year": "2023",
    "item6Level": "nasional",
    "item6Title": "Olimpiade Matematika SMP Nasional",
    "item6Result": "Juara 2"
  },
  "admissions": {
    "eyebrow": "Penerimaan Peserta Didik Baru",
    "h2": "Penerimaan Peserta Didik Baru (PPDB) 2025/2026",
    "step1Num": "01",
    "step1Title": "Pendaftaran",
    "step1Date": "1 — 15 Juni 2025",
    "step1Desc": "Isi formulir online atau datang langsung ke sekretariat sekolah. Lampirkan dokumen persyaratan.",
    "step2Num": "02",
    "step2Title": "Tes Seleksi",
    "step2Date": "20 — 21 Juni 2025",
    "step2Desc": "Tes kemampuan akademik (Matematika & Bahasa Indonesia) dan wawancara motivasi.",
    "step3Num": "03",
    "step3Title": "Pengumuman",
    "step3Date": "25 Juni 2025",
    "step3Desc": "Hasil seleksi diumumkan melalui website sekolah dan papan pengumuman.",
    "step4Num": "04",
    "step4Title": "Daftar Ulang",
    "step4Date": "26 — 30 Juni 2025",
    "step4Desc": "Peserta yang diterima melakukan daftar ulang dengan melengkapi administrasi dan pembayaran.",
    "quotaSmp": "Kuota SMP: 120 Siswa (4 Rombel)",
    "quotaSma": "Kuota SMA: 144 Siswa (4 Rombel IPA + 2 Rombel IPS)",
    "reqTitle": "Persyaratan Pendaftaran",
    "req1": "Fotokopi Kartu Keluarga (KK)",
    "req2": "Fotokopi Akta Kelahiran",
    "req3": "Fotokopi Ijazah / SKL (bagi lulusan tahun berjalan)",
    "req4": "Fotokopi Rapor 2 semester terakhir",
    "req5": "Pas foto 3×4 (4 lembar, latar merah)",
    "req6": "Surat keterangan sehat dari dokter",
    "cta1": "Unduh Formulir Pendaftaran",
    "cta2": "Hubungi Panitia PPDB"
  },
  "contact": {
    "eyebrow": "Hubungi Kami",
    "h2": "Kami Siap Membantu Anda",
    "address": "Jl. Pandu Raya No. 123, Kel. Pandu, Kec. Cicendo, Bandung 40172, Jawa Barat",
    "tuTitle": "Tata Usaha",
    "tuPhone": "(022) 1234-5678",
    "tuHours": "Senin – Jumat, 07.30 – 15.30 WIB",
    "ppdbTitle": "Panitia PPDB",
    "ppdbPhone": "+62 812-3456-7890",
    "ppdbWa": "Chat via WhatsApp"
  },
  "footer": {
    "links": "Tautan Cepat",
    "follow": "Ikuti Kami",
    "rights": "Hak cipta dilindungi.",
    "disclaimer": "Ini adalah concept project oleh Codading untuk menampilkan kemampuan desain web."
  },
  "stub": {
    "comingSoon": "Halaman ini sedang dalam pengembangan. Kami akan segera menghadirkan informasi lengkap untuk Anda.",
    "backHome": "Kembali ke Beranda",
    "home": "Beranda",
    "smpTitle": "Program SMP",
    "smaBreadcrumb": "Program SMP",
    "smaTitle": "Program SMA",
    "smaBreadcrumbLabel": "Program SMA",
    "beritaTitle": "Berita",
    "pengumumanTitle": "Pengumuman"
  }
}
```

- [ ] **Step 5: Create `src/messages/en.json`**

```json
{
  "nav": {
    "about": "About Us",
    "program": "Programs",
    "facilities": "Facilities",
    "news": "News",
    "admissions": "Admissions",
    "contact": "Contact",
    "cta": "Enroll Now"
  },
  "topbar": {
    "accr": "Accredited \"A\" — BAN-S/M",
    "phone": "(022) 1234-5678",
    "email": "info@binapandututama.sch.id"
  },
  "brand": {
    "name": "Sekolah Bina Pandu Utama",
    "tagline": "SMP & SMA",
    "yayasan": "Bina Pandu Utama Education Foundation",
    "accr": "Accredited \"A\""
  },
  "hero": {
    "ribbon": "Accredited \"A\"",
    "h1": "Building Character, Shaping Achievement",
    "sub": "Sekolah Bina Pandu Utama — an integrated SMP & SMA under Yayasan Pendidikan Bina Pandu Utama.",
    "meta1": "Established 1998",
    "meta2": "Bandung, West Java",
    "meta3": "National Curriculum",
    "cta1": "New Student Admissions 2025/2026",
    "cta2": "Learn More",
    "trust1": "26 Years of Experience",
    "trust2": "3,200+ Alumni",
    "trust3": "84 Certified Teachers",
    "trust4": "Accreditation A BAN-S/M"
  },
  "about": {
    "eyebrow": "About Us",
    "h2": "An Institution Built on Trust and a Tradition of Excellence",
    "p1": "Founded in 1998, Sekolah Bina Pandu Utama has guided thousands of students through their educational journey. Under the Yayasan Pendidikan Bina Pandu Utama, we are committed to providing quality national education grounded in the values of faith, discipline, and academic excellence.",
    "p2": "With a continuously updated curriculum, certified teaching staff, and complete facilities, we stand as a trusted partner for families seeking the best future for their children.",
    "principalName": "Drs. H. Ahmad Fauzi, M.Pd.",
    "principalTitle": "Principal, SMP & SMA Bina Pandu Utama",
    "visiLabel": "Vision",
    "visiText": "To become a leading national educational institution that produces a generation of faith, character, and achievement, ready to face the challenges of the times.",
    "misiLabel": "Mission",
    "misi1": "Deliver quality national education guided by the values of faith and noble character.",
    "misi2": "Develop students' academic and non-academic potential in a balanced and sustained manner.",
    "misi3": "Build a disciplined, orderly, and characterful learning culture across the school environment.",
    "misi4": "Strengthen the partnership between school, family, and community in educating students.",
    "misi5": "Prepare graduates who are competitive at the higher-education level and in the world of work."
  },
  "stat": {
    "yearLabel": "Year Established",
    "yearValue": "1998",
    "alumniLabel": "Total Alumni",
    "alumniValue": "3,200+",
    "teachersLabel": "Teaching Staff",
    "teachersValue": "84",
    "awardsLabel": "Achievements Won",
    "awardsValue": "150+"
  },
  "programs": {
    "eyebrow": "Academic Programs",
    "h2": "Two Levels, One Integrated Educational Journey",
    "smpTitle": "Junior High School",
    "smpGrade": "Grades 7 — 9",
    "smpDesc": "Our junior high program is designed to build a strong academic foundation while shaping student character during their critical developmental years.",
    "smpFeature1": "Merdeka Curriculum + KTSP",
    "smpFeature2": "Science & Computer Labs",
    "smpFeature3": "20+ extracurricular activities",
    "smpFeature4": "Active counseling program",
    "smpFeature5": "Literacy & numeracy program",
    "smaTitle": "Senior High School",
    "smaGrade": "Grades 10 — 12 · Science & Social majors",
    "smaDesc": "Our senior high program prepares students for higher education and the workforce with two academic majors: Science (IPA) and Social Studies (IPS).",
    "smaFeature1": "Two majors: Science & Social",
    "smaFeature2": "Intensive SNBT preparation",
    "smaFeature3": "Chemistry, Physics, Biology labs",
    "smaFeature4": "Industry visit program",
    "smaFeature5": "Career & scholarship guidance",
    "detail": "View Details →",
    "note": "Both levels are located within one integrated school environment, ensuring a continuous and well-supervised educational journey.",
    "curriculumBadge": "Merdeka Curriculum",
    "integratedBadge": "Integrated Environment"
  },
  "features": {
    "eyebrow": "Why Choose Us",
    "h2": "Why Choose Sekolah Bina Pandu Utama?",
    "1title": "Up-to-date National Curriculum",
    "1desc": "Merdeka Curriculum combined with active and contextual learning approaches.",
    "2title": "Certified Teaching Staff",
    "2desc": "84 nationally certified teachers with an average of 12 years of experience in their fields.",
    "3title": "Modern & Complete Facilities",
    "3desc": "Science labs, library, hall, and computer lab with up-to-date equipment.",
    "4title": "Proven Track Record",
    "4desc": "Over 150 awards at city, provincial, and national level since 2005.",
    "5title": "Character & Moral Guidance",
    "5desc": "Daily habits program, Islamic boarding school activities, and structured community service.",
    "6title": "Parental Involvement",
    "6desc": "Active school committee, grade monitoring app, and regular parent-teacher meetings."
  },
  "facilities": {
    "eyebrow": "Facilities",
    "h2": "Facilities That Support the Learning Process",
    "fac1": "Science Laboratory",
    "fac2": "Library",
    "fac3": "Sports Field",
    "fac4": "Computer Lab",
    "fac5": "Multipurpose Hall",
    "fac6": "Classroom"
  },
  "news": {
    "eyebrow": "News & Announcements",
    "h2": "The Latest from Our School",
    "tagPrestasi": "Achievement",
    "tagKegiatan": "Activity",
    "readmore": "Read More →",
    "article1Tag": "achievement",
    "article1Date": "15 May 2025",
    "article1Title": "SMA Bina Pandu Student Wins 1st Place at Provincial Chemistry Olympiad",
    "article1Excerpt": "Ahmad Rizky Pratama, a Grade 11 Science student, won first place at the 2025 West Java Chemistry Olympiad, competing against 234 participants from 67 schools.",
    "article2Tag": "activity",
    "article2Date": "8 May 2025",
    "article2Title": "National Education Day 2025 Flag Ceremony Held with the Entire School Community",
    "article2Excerpt": "The entire Sekolah Bina Pandu Utama academic community participated in the flag ceremony commemorating the 66th National Education Day with reverence and enthusiasm.",
    "announceTitle": "Latest Announcements",
    "announceAll": "View All Announcements →",
    "ann1Date": "20 May 2025",
    "ann1Text": "Even Semester Final Exam Schedule 2024/2025",
    "ann2Date": "15 May 2025",
    "ann2Text": "Announcement of PPDB Wave 1 Selection Results A.Y. 2025/2026",
    "ann3Date": "10 May 2025",
    "ann3Text": "Ascension Day Holiday — 29 May 2025",
    "ann4Date": "5 May 2025",
    "ann4Text": "Parent-Teacher Meeting for Grades 9 & 12 — Graduation Preparation"
  },
  "achievements": {
    "eyebrow": "Achievements",
    "h2": "A Tradition of Achievement We Are Proud Of",
    "levelKota": "City Level",
    "levelProvinsi": "Provincial Level",
    "levelNasional": "National Level",
    "item1Year": "2025",
    "item1Level": "provinsi",
    "item1Title": "West Java Chemistry Olympiad",
    "item1Result": "1st Place",
    "item2Year": "2025",
    "item2Level": "kota",
    "item2Title": "Bandung City Scientific Writing Competition",
    "item2Result": "1st Place",
    "item3Year": "2024",
    "item3Level": "nasional",
    "item3Title": "National Robotics Competition",
    "item3Result": "3rd Place",
    "item4Year": "2024",
    "item4Level": "provinsi",
    "item4Title": "West Java English Debate Competition",
    "item4Result": "2nd Place",
    "item5Year": "2024",
    "item5Level": "kota",
    "item5Title": "Bandung Inter-High School Basketball Tournament",
    "item5Result": "1st Place",
    "item6Year": "2023",
    "item6Level": "nasional",
    "item6Title": "National Junior High Math Olympiad",
    "item6Result": "2nd Place"
  },
  "admissions": {
    "eyebrow": "New Student Admissions",
    "h2": "New Student Admissions (PPDB) 2025/2026",
    "step1Num": "01",
    "step1Title": "Registration",
    "step1Date": "1 — 15 June 2025",
    "step1Desc": "Complete the online form or visit the school secretariat in person. Attach the required documents.",
    "step2Num": "02",
    "step2Title": "Selection Test",
    "step2Date": "20 — 21 June 2025",
    "step2Desc": "Academic ability test (Mathematics & Bahasa Indonesia) and motivational interview.",
    "step3Num": "03",
    "step3Title": "Announcement",
    "step3Date": "25 June 2025",
    "step3Desc": "Selection results are announced via the school website and notice board.",
    "step4Num": "04",
    "step4Title": "Re-enrollment",
    "step4Date": "26 — 30 June 2025",
    "step4Desc": "Accepted students complete re-enrollment by submitting administration and payment.",
    "quotaSmp": "SMP Quota: 120 Students (4 Classes)",
    "quotaSma": "SMA Quota: 144 Students (4 Science + 2 Social classes)",
    "reqTitle": "Registration Requirements",
    "req1": "Copy of Family Card (KK)",
    "req2": "Copy of Birth Certificate",
    "req3": "Copy of Diploma / Graduation Certificate",
    "req4": "Copy of last 2 semesters' report cards",
    "req5": "3×4 photo (4 copies, red background)",
    "req6": "Doctor's health certificate",
    "cta1": "Download Registration Form",
    "cta2": "Contact the PPDB Committee"
  },
  "contact": {
    "eyebrow": "Contact",
    "h2": "We Are Ready to Assist You",
    "address": "Jl. Pandu Raya No. 123, Kel. Pandu, Kec. Cicendo, Bandung 40172, West Java",
    "tuTitle": "Administration Office",
    "tuPhone": "(022) 1234-5678",
    "tuHours": "Monday – Friday, 07:30 – 15:30 WIB",
    "ppdbTitle": "PPDB Committee",
    "ppdbPhone": "+62 812-3456-7890",
    "ppdbWa": "Chat via WhatsApp"
  },
  "footer": {
    "links": "Quick Links",
    "follow": "Follow Us",
    "rights": "All rights reserved.",
    "disclaimer": "This is a concept project by Codading to showcase web design capabilities."
  },
  "stub": {
    "comingSoon": "This page is currently under development. We will soon have complete information for you.",
    "backHome": "Back to Home",
    "home": "Home",
    "smpTitle": "SMP Program",
    "smaBreadcrumb": "SMP Program",
    "smaTitle": "SMA Program",
    "smaBreadcrumbLabel": "SMA Program",
    "beritaTitle": "News",
    "pengumumanTitle": "Announcements"
  }
}
```

- [ ] **Step 6: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes. The JSON files are imported dynamically at runtime — no TS errors expected from them directly.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ src/messages/
git commit -m "feat: add next-intl routing config and complete bilingual message files"
```

---

## Task 4: UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Crest.tsx`
- Create: `src/components/ui/Eyebrow.tsx`
- Create: `src/components/ui/Badge.tsx`

All are server components (no `'use client'`).

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

Renders as `<a>` when `href` is provided, `<button>` otherwise.

```tsx
interface ButtonProps {
  variant?: 'accent' | 'primary' | 'outline' | 'outline-light' | 'link-arrow';
  size?: 'sm' | 'md';
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  accent:        'bg-accent text-primary hover:bg-accent-dark',
  primary:       'bg-primary text-white hover:bg-primary-dark',
  outline:       'border border-primary text-primary hover:bg-primary-tint',
  'outline-light': 'border border-white text-white hover:bg-white/10',
  'link-arrow':  'text-primary hover:text-primary-dark underline-offset-2 hover:underline',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius)] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
  const sizeClass = variant !== 'link-arrow' ? sizes[size] : '';
  const cls = `${base} ${variants[variant]} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Crest.tsx`**

Pure CSS shield using `clip-path`. The gold border effect is achieved with a `drop-shadow` filter.

```tsx
type CrestSize = 'sm' | 'md' | 'lg';

const SIZES: Record<CrestSize, { w: number; h: number; mono: string; sub: string }> = {
  sm: { w: 40, h: 46, mono: 'text-[10px]', sub: 'text-[6px]' },
  md: { w: 52, h: 60, mono: 'text-xs',     sub: 'text-[7px]' },
  lg: { w: 64, h: 74, mono: 'text-sm',     sub: 'text-[8px]' },
};

export default function Crest({ size = 'md' }: { size?: CrestSize }) {
  const { w, h, mono, sub } = SIZES[size];
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: w,
        height: h,
        filter: 'drop-shadow(0 0 1.5px var(--color-accent))',
      }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full bg-primary flex flex-col items-center justify-center gap-0.5 pt-1"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
      >
        <span className={`font-heading font-bold text-accent leading-none ${mono}`}>BPU</span>
        <span className={`font-body font-medium text-white/75 tracking-widest uppercase leading-none ${sub}`}>
          EST. 1998
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/Eyebrow.tsx`**

```tsx
export default function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-ink-muted text-xs font-semibold uppercase tracking-widest ${className}`}
    >
      <span className="inline-block w-6 h-0.5 bg-accent flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Badge.tsx`**

```tsx
type BadgeVariant = 'pill' | 'square';
type BadgeColor = 'accent' | 'primary' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

const colors: Record<BadgeColor, string> = {
  accent:  'bg-accent/15 text-accent-dark border border-accent/30',
  primary: 'bg-primary text-white',
  default: 'bg-primary-tint text-primary border border-border',
};

export default function Badge({
  variant = 'pill',
  color = 'default',
  children,
  className = '',
}: BadgeProps) {
  const shape = variant === 'pill' ? 'rounded-full px-3 py-0.5' : 'rounded-[var(--radius)] px-2 py-0.5';
  return (
    <span className={`inline-block text-xs font-semibold uppercase tracking-wide ${shape} ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add Button, Crest, Eyebrow, and Badge UI primitives"
```

---

## Task 5: Layout — TopBar

**Files:**
- Create: `src/components/layout/TopBar.tsx`

Server component. Rendered above the Navbar in `[locale]/layout.tsx`. Hidden below 860 px via `hidden min-[860px]:flex`.

- [ ] **Step 1: Create `src/components/layout/TopBar.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';

export default async function TopBar() {
  const t = await getTranslations('topbar');

  return (
    <div className="hidden min-[860px]:flex bg-primary-dark text-white text-xs">
      <div className="max-w-[1200px] w-full mx-auto px-6 h-[38px] flex items-center justify-between">
        {/* Accreditation badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
          <span className="font-semibold tracking-wide">{t('accr')}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-5 text-white/80">
          <a
            href={`tel:${t('phone').replace(/\D/g, '')}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {t('phone')}
          </a>
          <a
            href={`mailto:${t('email')}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,12 2,6" />
            </svg>
            {t('email')}
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/TopBar.tsx
git commit -m "feat: add TopBar server component with accreditation and contact info"
```

---

## Task 6: Layout — Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

Server component. 3-column grid, gold top border, disclaimer in bottom bar.

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
import Crest from '@/components/ui/Crest';
import Badge from '@/components/ui/Badge';

const QUICK_LINKS = [
  { key: 'about',      href: '#tentang' },
  { key: 'program',    href: '#program' },
  { key: 'facilities', href: '#fasilitas' },
  { key: 'news',       href: '#berita' },
  { key: 'admissions', href: '#ppdb' },
  { key: 'contact',    href: '#kontak' },
] as const;

const SOCIAL_LINKS = [
  { label: 'Facebook',  href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Instagram', href: '#', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z' },
  { label: 'YouTube',   href: '#', icon: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
] as const;

export default async function Footer() {
  const tFooter = await getTranslations('footer');
  const tNav    = await getTranslations('nav');
  const tBrand  = await getTranslations('brand');

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white border-t-2 border-accent">
      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid gap-10 min-[820px]:grid-cols-3">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Crest size="md" />
            <div className="leading-tight">
              <div className="font-heading font-semibold text-white">{tBrand('name')}</div>
              <div className="text-white/60 text-xs">{tBrand('tagline')}</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{tBrand('yayasan')}</p>
          <Badge variant="pill" color="accent">{tBrand('accr')}</Badge>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wide">
            {tFooter('links')}
          </h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="text-white/70 text-sm hover:text-accent transition-colors"
                >
                  {tNav(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Social */}
        <div>
          <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wide">
            {tFooter('follow')}
          </h3>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded border border-white/20 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d={icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col min-[680px]:flex-row gap-2 min-[680px]:items-center min-[680px]:justify-between text-xs text-white/50">
          <span>© {year} {tBrand('name')}. {tFooter('rights')}</span>
          <span className="border-l-2 border-accent pl-3 italic text-white/40">
            {tFooter('disclaimer')}
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer server component with brand, links, social, and disclaimer"
```

---

## Task 7: Interactive — LangToggle

**Files:**
- Create: `src/components/interactive/LangToggle.tsx`

Client component. Uses locale-aware router from `@/i18n/navigation` to swap locale while staying on the current path.

- [ ] **Step 1: Create `src/components/interactive/LangToggle.tsx`**

```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = ['id', 'en'] as const;

export default function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = (next: (typeof LOCALES)[number]) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="inline-flex rounded-[var(--radius)] border border-border overflow-hidden text-xs font-semibold"
      role="group"
      aria-label="Language toggle"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => handleToggle(l)}
          aria-pressed={l === locale}
          className={`px-2.5 py-1 uppercase transition-colors min-w-[32px] ${
            l === locale
              ? 'bg-primary text-white'
              : 'bg-white text-ink-muted hover:bg-surface-alt'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/interactive/LangToggle.tsx
git commit -m "feat: add LangToggle client component for locale switching"
```

---

## Task 8: Layout — MobileMenu

**Files:**
- Create: `src/components/layout/MobileMenu.tsx`

Client component. Right-side drawer with focus trap, backdrop, and keyboard (`Escape`, `Tab`) handling. Receives nav links from Navbar via props to avoid re-fetching translations.

- [ ] **Step 1: Create `src/components/layout/MobileMenu.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import LangToggle from '@/components/interactive/LangToggle';
import Crest from '@/components/ui/Crest';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  ctaLabel: string;
}

export default function MobileMenu({ id, open, onClose, navLinks, ctaLabel }: MobileMenuProps) {
  const tBrand = useTranslations('brand');
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 h-full w-[min(360px,100vw)] bg-white z-50 flex flex-col shadow-[var(--shadow-md)] transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-primary flex items-center justify-between px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Crest size="sm" />
            <span className="font-heading font-semibold text-white text-sm leading-tight">
              {tBrand('name')}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 -mr-1 text-white/70 hover:text-white transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center px-6 py-3.5 text-ink hover:bg-primary-tint hover:text-primary border-b border-border transition-colors text-sm font-medium"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Footer: CTA + lang toggle */}
        <div className="flex-shrink-0 border-t border-border px-4 py-4 flex flex-col gap-3">
          <Button
            variant="accent"
            href="#ppdb"
            className="w-full justify-center"
            onClick={onClose}
          >
            {ctaLabel}
          </Button>
          <div className="flex justify-center">
            <LangToggle />
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/MobileMenu.tsx
git commit -m "feat: add MobileMenu client component with focus trap and keyboard handling"
```

---

## Task 9: Layout — Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

Client component. Sticky header, scroll shadow at `scrollY > 8`, mobile menu state. Renders `MobileMenu` as a sibling (outside the `<header>` element to avoid nesting issues with `aria-modal`).

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Crest from '@/components/ui/Crest';
import Button from '@/components/ui/Button';
import LangToggle from '@/components/interactive/LangToggle';
import MobileMenu, { type NavLink } from '@/components/layout/MobileMenu';
import { Link } from '@/i18n/navigation';

const NAV_KEYS = ['about', 'program', 'facilities', 'news', 'admissions', 'contact'] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  about:      '#tentang',
  program:    '#program',
  facilities: '#fasilitas',
  news:       '#berita',
  admissions: '#ppdb',
  contact:    '#kontak',
};

export default function Navbar() {
  const t      = useTranslations('nav');
  const tBrand = useTranslations('brand');

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks: NavLink[] = NAV_KEYS.map((key) => ({
    label: t(key),
    href:  NAV_HREFS[key],
  }));

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white border-b border-border transition-shadow duration-150 ${
          scrolled ? 'shadow-[var(--shadow-md)]' : ''
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded">
            <Crest size="sm" />
            <div className="leading-tight">
              <div className="font-heading font-semibold text-primary text-sm min-[430px]:text-[15px] leading-tight">
                {tBrand('name')}
              </div>
              <div className="text-ink-muted text-xs">{tBrand('tagline')}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden min-[1080px]:flex items-center gap-5"
            aria-label="Main navigation"
          >
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={NAV_HREFS[key]}
                className="text-sm text-ink-muted hover:text-primary transition-colors font-medium py-1"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden min-[1080px]:flex items-center gap-3">
            <LangToggle />
            <Button variant="accent" size="sm" href="#ppdb">
              {t('cta')}
            </Button>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex min-[1080px]:hidden items-center gap-2">
            <LangToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-2 -mr-1 text-ink hover:text-primary transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
        ctaLabel={t('cta')}
      />
    </>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add Navbar client component with scroll shadow and mobile menu integration"
```

---

## Task 10: Routing — Root Redirect & Locale Layout

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create `src/app/page.tsx`**

In `output: 'export'` mode, Next.js compiles `redirect('/id')` into a static HTML page with `<meta http-equiv="refresh" content="0;url=/id">` and a `window.location.replace` script.

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/id');
}
```

- [ ] **Step 2: Create `src/app/[locale]/layout.tsx`**

Loads Google Fonts, injects CSS variables, wraps children with `NextIntlClientProvider`, and assembles the page shell (TopBar, Navbar, Footer).

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Lora, Source_Sans_3 } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Sekolah Bina Pandu Utama',
    description:
      locale === 'id'
        ? 'SMP & SMA terintegrasi di Bandung, Jawa Barat.'
        : 'Integrated Junior & Senior High School in Bandung, West Java.',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div
      className={`${lora.variable} ${sourceSans.variable}`}
      lang={locale}
    >
      <NextIntlClientProvider messages={messages}>
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
```

- [ ] **Step 3: Run type check**

```bash
npx tsc --noEmit
```

Expected: passes. If `next-env.d.ts` is missing, run `npm run dev` briefly, then Ctrl+C, then recheck.

- [ ] **Step 4: Start dev server and verify routes**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `/id`.
Visit `http://localhost:3000/id` — page renders with TopBar, Navbar, and Footer visible. No console errors.
Visit `http://localhost:3000/en` — same layout in English (check `topbar.accr` and `nav.cta` strings).
Toggle language (ID/EN buttons in Navbar) — URL changes between `/id` and `/en`. Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/[locale]/layout.tsx
git commit -m "feat: add root redirect and locale layout with font loading and shell assembly"
```

---

## Task 11: Stub Pages

**Files:**
- Create: `src/app/[locale]/program/smp/page.tsx`
- Create: `src/app/[locale]/program/sma/page.tsx`
- Create: `src/app/[locale]/berita/page.tsx`
- Create: `src/app/[locale]/pengumuman/page.tsx`

All stub pages share the same three-section structure: breadcrumb bar, page header, coming-soon card. Write a shared `StubPage` component inline in each file (it's small; extracting it would add a shared file that Phase 2 will remove).

- [ ] **Step 1: Create `src/app/[locale]/program/smp/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function SmpPage() {
  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/" className="hover:text-primary transition-colors">{tNav('program')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('smpTitle')}</span>
        </div>
      </div>

      {/* Page header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Eyebrow className="mb-3">{tNav('program')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('smpTitle')}</h1>
      </div>

      {/* Coming-soon card */}
      <div className="max-w-[1200px] mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-[var(--radius)] p-10 shadow-[var(--shadow)]">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/program/sma/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function SmaPage() {
  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/" className="hover:text-primary transition-colors">{tNav('program')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('smaTitle')}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Eyebrow className="mb-3">{tNav('program')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('smaTitle')}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-[var(--radius)] p-10 shadow-[var(--shadow)]">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Create `src/app/[locale]/berita/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function BeritaPage() {
  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('beritaTitle')}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Eyebrow className="mb-3">{tNav('news')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('beritaTitle')}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-[var(--radius)] p-10 shadow-[var(--shadow)]">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Create `src/app/[locale]/pengumuman/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function PengumumanPage() {
  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('pengumumanTitle')}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Eyebrow className="mb-3">{tNav('admissions')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('pengumumanTitle')}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-[var(--radius)] p-10 shadow-[var(--shadow)]">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 5: Add landing page placeholder so `[locale]/` resolves**

The locale layout requires a page at `[locale]/page.tsx` or it 404s in dev. Add a minimal placeholder — Phase 2 replaces this entirely.

```tsx
// src/app/[locale]/page.tsx
export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default function LandingPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24 text-center text-ink-muted">
      <p>Landing page — Phase 2</p>
    </div>
  );
}
```

- [ ] **Step 6: Start dev server and verify all routes**

```bash
npm run dev
```

Verify each URL loads without errors (check browser console):
- `http://localhost:3000/id` — landing placeholder visible, Navbar + Footer present
- `http://localhost:3000/en` — same in English
- `http://localhost:3000/id/program/smp` — breadcrumb shows "Beranda / Program / Program SMP", coming-soon card renders
- `http://localhost:3000/en/program/smp` — same in English
- `http://localhost:3000/id/program/sma` — renders correctly
- `http://localhost:3000/id/berita` — renders correctly
- `http://localhost:3000/id/pengumuman` — renders correctly
- MobileMenu: resize browser < 1080 px, open hamburger, verify drawer slides in, Escape closes it, Tab cycles focus within drawer, backdrop click closes it.

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/
git commit -m "feat: add landing placeholder and all four stub pages with breadcrumb and coming-soon card"
```

---

## Task 12: Image Assets

**Files:**
- Create: `public/images/ATTRIBUTION.md`
- Download: 11 images to `public/images/`

All images are sourced from Pexels (free license, attribution required). Download each from the suggested search, rename as shown. Choose photos that match the tone guidance: formal, warm, Indonesian/Southeast-Asian school context where possible, no heavy filters.

- [ ] **Step 1: Download images and save to `public/images/`**

Use the Pexels search links below. For each, find a suitable photo, download it, and save with the exact filename shown.

| Filename | Dimensions | Pexels search |
|---|---|---|
| `hero.jpg` | 1440×900 | https://www.pexels.com/search/school%20building%20exterior/ |
| `about.jpg` | 600×700 | https://www.pexels.com/search/students%20uniform/ |
| `principal.jpg` | 64×64 (crop to face) | https://www.pexels.com/search/principal%20portrait%20formal/ |
| `facility-lab.jpg` | 800×600 | https://www.pexels.com/search/science%20laboratory/ |
| `facility-library.jpg` | 800×600 | https://www.pexels.com/search/library%20shelves/ |
| `facility-field.jpg` | 800×600 | https://www.pexels.com/search/school%20sports%20field/ |
| `facility-computer.jpg` | 800×600 | https://www.pexels.com/search/computer%20lab/ |
| `facility-hall.jpg` | 800×600 | https://www.pexels.com/search/auditorium%20hall/ |
| `facility-classroom.jpg` | 800×600 | https://www.pexels.com/search/classroom/ |
| `news-1.jpg` | 400×250 | https://www.pexels.com/search/student%20award%20ceremony/ |
| `news-2.jpg` | 400×250 | https://www.pexels.com/search/flag%20ceremony/ |

Exact pixel dimensions are not mandatory — match the aspect ratios where possible to avoid layout shift.

- [ ] **Step 2: Create `public/images/ATTRIBUTION.md`**

List every photo you downloaded. Fill in `[Photo title]`, `[Photographer name]`, and `[Pexels URL]` for each:

```markdown
# Image Attribution

All photos sourced from [Pexels](https://www.pexels.com/) under the [Pexels License](https://www.pexels.com/license/).

| File | Title | Photographer | URL |
|---|---|---|---|
| hero.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| about.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| principal.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-lab.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-library.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-field.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-computer.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-hall.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| facility-classroom.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| news-1.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
| news-2.jpg | [Photo title] | [Photographer name] | [Pexels URL] |
```

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "assets: add Pexels photos and attribution file"
```

---

## Task 13: Full Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected output:
```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...      ...
├ ● /[locale]                           ...      ...
├ ● /[locale]/berita                    ...      ...
├ ● /[locale]/pengumuman                ...      ...
├ ● /[locale]/program/sma               ...      ...
└ ● /[locale]/program/smp               ...      ...
```

`○` = static, `●` = static with params. No build errors. `out/` directory created.

- [ ] **Step 2: Verify static output structure**

```bash
ls out/
```

Expected directories: `id/`, `en/`, `_next/`

```bash
ls out/id/
```

Expected files: `index.html`, `program/`, `berita/`, `pengumuman/`

- [ ] **Step 3: Smoke test static output in a local server**

```bash
npx serve out
```

Visit `http://localhost:3000`. Expected: redirects to `/id`. Visit `/id/program/smp` — stub page renders with Navbar and Footer. Visit `/en/program/smp` — English strings. Stop server.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Phase 1 complete — verified static build and all routes"
```

---

## Phase 1 Complete

**Deliverables:**
- Static `out/` directory deployable to any static host (Netlify, GitHub Pages, etc.)
- All routes resolve with branded shell: TopBar, Navbar (sticky + scroll shadow + mobile drawer + language toggle), Footer (3-col + disclaimer)
- 4 stub pages: SMP, SMA, Berita, Pengumuman — each with breadcrumb, heading, coming-soon card
- Complete bilingual message files — Phase 2 consumes without modification
- 11 Pexels images with attribution

**Next step:** Phase 2 — Landing Page Sections & Interactions (`2026-06-10-phase2-landing-sections.md`)
