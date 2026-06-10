# Sekolah Bina Pandu Utama — Design Handoff

**Concept project by Codading.** A landing page for a private national school (yayasan) — integrated SMP & SMA. Target build: **Next.js 15 + Tailwind CSS**.

Prototype file: `Sekolah Bina Pandu Utama.html` (single file, embedded CSS, light vanilla JS for the ID/EN toggle, mobile menu, and scroll reveals).

> ⚠️ This is a concept project to showcase web-design capability. Keep the footer disclaimer visible: *"Ini adalah concept project oleh Codading untuk menampilkan kemampuan desain web."*

---

## 1. Brand Identity

**School:** Sekolah Bina Pandu Utama (SMP & SMA)
**Yayasan:** Yayasan Pendidikan Bina Pandu Utama
**Crest:** text-based monogram `BPU` + `EST. 1998` on a navy shield with a gold border (pentagon/shield clip-path — no SVG illustration).
**Founded:** 1998 · **Location:** Bandung, Jawa Barat · **Accreditation:** A (BAN-S/M)

### Why these choices
- **Deep navy + gold + white** is the classic visual language of established Indonesian institutions — it reads as trustworthy, authoritative, and serious. Gold is used sparingly as an accent (badges, rules, the crest border) so it signals prestige rather than decoration.
- **Lora (serif headings)** gives an institutional, document-like authority; **Source Sans 3 (body)** keeps long-form Bahasa Indonesia copy highly readable. Nothing rounded or geometric.
- **Content-dense, grid-heavy layout** with thin rules and structured shadows. Density signals thoroughness — parents reading this should feel the institution is well-run and substantial, not a sparse startup page.

---

## 2. Design Tokens

> All defined as CSS custom properties in the prototype. Tailwind mapping suggestions in the right column.

### Colors
| Token | Hex | Use | Tailwind suggestion |
|---|---|---|---|
| `--color-primary` | `#15294D` | Deep navy — headings, primary buttons, crest, section bands | `primary.DEFAULT` |
| `--color-primary-dark` | `#0E1C36` | Top bar, footer, hero base | `primary.dark` |
| `--color-primary-tint` | `#EAEEF5` | Light navy tint — icon chips, note boxes, image placeholders | `primary.tint` |
| `--color-accent` | `#C2A14D` | Muted gold — badges, ribbons, rules, CTA | `accent.DEFAULT` |
| `--color-accent-dark` | `#A8883A` | Gold hover / accent text on light | `accent.dark` |
| `--color-surface` | `#FFFFFF` | Default background | `white` |
| `--color-surface-alt` | `#F4F6F9` | Alternating section background | `surface.alt` |
| `--color-text` | `#1C2430` | Near-black body text | `ink.DEFAULT` |
| `--color-text-muted` | `#5B6573` | Captions, secondary info | `ink.muted` |
| `--color-border` | `#E2E6EC` | Hairline dividers, card borders | `border.DEFAULT` |
| `--color-border-strong` | `#C9D0DA` | Stronger borders, inputs | `border.strong` |

### Typography
| Token | Value |
|---|---|
| `--font-heading` | `'Lora', Georgia, serif` (Google Fonts: 400/500/600/700 + italic 400) |
| `--font-body` | `'Source Sans 3', system-ui, sans-serif` (Google Fonts: 400/500/600/700) |
| `--text-hero` | `clamp(2.2rem, 5vw, 3.6rem)` |
| `--text-h2` | `clamp(1.6rem, 3vw, 2.25rem)` |
| `--text-h3` | `clamp(1.15rem, 2vw, 1.4rem)` |
| `--text-body` | `1rem` (16px) |
| `--text-small` | `0.875rem` (14px) |
| `--text-label` | `0.75rem` (12px) — uppercase eyebrows/labels |

Headings: `font-weight: 600`, `line-height: 1.18`. Body: `line-height: 1.6`.

### Spacing — 4px base scale
`--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 · `-6` 24 · `-8` 32 · `-10` 40 · `-12` 48 · `-16` 64 · `-20` 80 · `-24` 96 (px)

Section vertical rhythm: `padding: var(--space-20) 0` (80px). Container max-width **1200px**, side padding 24px.

### Radius & Shadow
| Token | Value |
|---|---|
| `--radius` | `4px` (max — keep corners structured) |
| `--shadow-sm` | `0 1px 2px rgba(14,28,54,.08)` |
| `--shadow` | `0 2px 4px rgba(14,28,54,.10)` |
| `--shadow-md` | `0 4px 10px rgba(14,28,54,.10)` |

Shadows are tight and structured — never soft/diffused.

---

## 3. Responsive Breakpoints

| Width | Behavior |
|---|---|
| `≤ 1080px` | Desktop nav links + nav CTA hide → hamburger menu appears |
| `≤ 920px` | News grid & PPDB info → single column; PPDB timeline → 2-up |
| `≤ 860px` | Top bar hides; About grid → single column; contact → single column |
| `≤ 820px` | Program cards stack; facilities & features → 2 columns; footer → single column |
| `≤ 680px` | Stat band → 2×2 |
| `≤ 620px` | PPDB timeline → vertical (1 col) |
| `≤ 540px` | News card image stacks above body |
| `≤ 520px` | Features & facilities → 1 column |
| `≤ 430px` | Crest subtitle (yayasan line) hides; brand title shrinks |

Mobile-first; layout uses CSS Grid + Flexbox only.

---

## 4. Section-by-Section Notes

1. **Top Bar** — navy-dark strip, 38px. Left: accreditation w/ gold dot. Right: phone + email. Hidden `≤860px`.
2. **Navbar** — sticky, white, hairline bottom border; gains `--shadow-md` on scroll (`.scrolled` class toggled by JS at `scrollY>8`). Crest + 2-line name, 6 nav links, ID/EN toggle, gold "Daftar Sekarang" CTA, hamburger.
3. **Mobile Menu** — right-side drawer (`max 360px`), navy header, link list, CTA + language toggle in footer. Opens via `.open` class; closes on backdrop click, ✕, or link click.
4. **Hero** — full-bleed image placeholder + 60%+ navy gradient overlay (left-weighted for text legibility). Gold "Terakreditasi A" ribbon top-right. Serif headline (2nd line gold), subhead, meta row, two CTAs. A **trust bar** strip sits at the bottom of the hero with 4 quick credentials.
5. **Tentang / Selayang Pandang** — 2-col (text left, 600×700 image right) + principal signature block. **Visi & Misi** subsection below: vision as an italic serif pull-quote, mission as a numbered list with leading-zero counters.
6. **Stat Band** — full-width navy, 4 stats, gold unicode icons, vertical dividers. → 2×2 on small.
7. **Program Pendidikan** — 2 cards (SMP / SMA): badge, grade range, description, 5 checkmark features, footer with accreditation + "Lihat Detail". Curriculum badge row + integrated-environment note below.
8. **Keunggulan** — 6 features in a 3×2 hairline grid (1px gap reveals borders). Each: bordered unicode icon chip, title, 1–2 line description. Hover tints the cell.
9. **Fasilitas** — 3×2 figure grid, each 800×600 image placeholder + caption (name + index number). FE: **implement lightbox on click**.
10. **Berita & Pengumuman** — 2/3 + 1/3 split. Left: 2 horizontal news cards (thumb + meta + title + excerpt + link). Right: bordered "Pengumuman Terbaru" board, navy header, 4 dated items, "Lihat Semua" footer.
11. **Prestasi** — horizontal scroll-snap row of achievement cards: gold year badge, level label, title, gold-bordered result row. `overflow-x:auto`; FE may add prev/next arrows.
12. **PPDB** — 4-step timeline (gold top-border cards, numbered navy circles, dates). Info panel: quotas (SMP 120 / SMA 144) + requirements checklist. Two CTAs. → vertical on mobile.
13. **Kontak** — map placeholder (600×400) + address card on the left; two stacked contact cards (Tata Usaha, Panitia PPDB w/ green WhatsApp button) on the right.
14. **Footer** — navy-dark, gold top border. 3 cols: brand+yayasan+accreditation badge / quick links / social. Bottom bar: copyright + italic concept disclaimer (gold left rule).

---

## 5. Component List (with behavior)

| Component | Notes |
|---|---|
| `Button` variants | `accent` (gold), `primary` (navy), `outline`, `outline-light` (on dark), `link-arrow`. 4px radius, 0.18s transitions. |
| `Crest` | Pure CSS monogram on shield (`clip-path` pentagon). Reused in navbar + footer. |
| `LangToggle` | ID/EN segmented control. See §7 for the i18n mechanism. |
| `MobileMenu` | Drawer with backdrop. |
| `Eyebrow` | Uppercase label with a leading gold tick (`::before` 24×2px bar). |
| `StatBand` | Navy metric strip. |
| `ProgramCard` / `FacilityFigure` / `NewsCard` / `AnnounceItem` / `AchievementCard` / `TimelineStep` / `ContactCard` | See §4. |
| `Badge` / `Tag` | Pill badge (curriculum) and square category tag (news). |
| `ImagePlaceholder` (`.ph`) | Striped box w/ monospace label — replace with `next/image`. |
| Scroll reveal | `.reveal` → `.in` via IntersectionObserver. Respects `prefers-reduced-motion`. In Next, prefer a small client component or Framer Motion `whileInView`. |

---

## 6. Image Placeholder Specs + Suggested Pexels Photos

Replace every `.ph` box with `next/image`. Each placeholder in the HTML carries a monospace label and an `<!-- IMAGE: ... -->` comment. Suggested Pexels search/photo links below — swap in final URLs and **list the ones you use** for attribution.

| # | Location | Dimensions | Aspect | Shot guidance | Pexels suggestion |
|---|---|---|---|---|---|
| 1 | Hero background | 1440×900 | 16:10 | School building exterior, daytime, neutral sky | https://www.pexels.com/search/school%20building/ |
| 2 | About | 600×700 | ~6:7 | Formal school moment — ceremony, students in uniform, or interior corridor | https://www.pexels.com/search/students%20uniform%20indonesia/ |
| 3 | Principal portrait | 64×64 (circle) | 1:1 | Formal headshot, neutral background | https://www.pexels.com/search/principal%20portrait/ |
| 4 | Facility — Lab IPA | 800×600 | 4:3 | Science lab with equipment | https://www.pexels.com/search/science%20laboratory/ |
| 5 | Facility — Perpustakaan | 800×600 | 4:3 | Library shelves / reading room | https://www.pexels.com/search/library/ |
| 6 | Facility — Lapangan | 800×600 | 4:3 | Outdoor sports field / court | https://www.pexels.com/search/school%20sports%20field/ |
| 7 | Facility — Ruang Komputer | 800×600 | 4:3 | Computer lab rows | https://www.pexels.com/search/computer%20lab/ |
| 8 | Facility — Aula | 800×600 | 4:3 | Auditorium / multipurpose hall | https://www.pexels.com/search/auditorium/ |
| 9 | Facility — Ruang Kelas | 800×600 | 4:3 | Classroom with desks | https://www.pexels.com/search/classroom/ |
| 10 | News thumb 1 | 400×250 | 8:5 | Students with medals / academic event | https://www.pexels.com/search/student%20award/ |
| 11 | News thumb 2 | 400×250 | 8:5 | Flag ceremony / formal school event | https://www.pexels.com/search/flag%20ceremony%20school/ |
| 12 | Contact map | 600×400 | 3:2 | Embed Google Maps iframe (not a photo) | — |

**Tone for all photography:** formal, warm, real students in uniform where possible, well-lit, no heavy filters. Avoid stock-cliché "Western office" imagery — prefer Indonesian/Southeast-Asian school contexts.

---

## 7. Bilingualism (ID primary, EN secondary)

**Mechanism in the prototype:** every translatable node renders Bahasa Indonesia by default and carries a `data-en="..."` attribute with the English string. The toggle stashes the ID copy into `data-id` once, then swaps `innerHTML`. Choice persists in `localStorage` (`bpu-lang`).

**Recommended for Next.js 15:** this is a good fit for the App Router with `next-intl` or a simple `[locale]` segment + dictionary JSON. Use the string table below as the source of truth; default locale `id`, secondary `en`. Render server-side per locale rather than client-swapping.

### 7.1 Bilingual String Reference (ID → EN)

| Key | Bahasa Indonesia | English |
|---|---|---|
| nav.about | Tentang Kami | About Us |
| nav.program | Program | Programs |
| nav.facilities | Fasilitas | Facilities |
| nav.news | Berita | News |
| nav.admissions | Penerimaan Siswa | Admissions |
| nav.contact | Kontak | Contact |
| nav.cta | Daftar Sekarang | Enroll Now |
| topbar.accr | Terakreditasi A — BAN-S/M | Accredited "A" — BAN-S/M |
| brand.yayasan | Yayasan Pendidikan Bina Pandu Utama | Bina Pandu Utama Education Foundation |
| hero.ribbon | Terakreditasi A | Accredited "A" |
| hero.h1 | Membentuk Karakter, Mengukir Prestasi | Building Character, Shaping Achievement |
| hero.sub | Sekolah Bina Pandu Utama — SMP & SMA terintegrasi di bawah naungan Yayasan Pendidikan Bina Pandu Utama. | Sekolah Bina Pandu Utama — an integrated SMP & SMA under Yayasan Pendidikan Bina Pandu Utama. |
| hero.meta1 | Berdiri sejak 1998 | Established 1998 |
| hero.meta2 | Bandung, Jawa Barat | Bandung, West Java |
| hero.meta3 | Kurikulum Nasional | National Curriculum |
| hero.cta1 | Penerimaan Siswa Baru 2025/2026 | New Student Admissions 2025/2026 |
| hero.cta2 | Pelajari Lebih Lanjut | Learn More |
| about.eyebrow | Selayang Pandang | About Us |
| about.h2 | Lembaga yang Dibangun atas Kepercayaan dan Tradisi Keunggulan | An Institution Built on Trust and a Tradition of Excellence |
| visi.label | Visi | Vision |
| visi.text | Menjadi lembaga pendidikan nasional terkemuka yang melahirkan generasi beriman, berkarakter, dan berprestasi, serta siap menghadapi tantangan zaman. | To become a leading national educational institution that produces a generation of faith, character, and achievement, ready to face the challenges of the times. |
| misi.label | Misi | Mission |
| misi.1 | Menyelenggarakan pendidikan nasional bermutu yang berpedoman pada nilai keimanan dan akhlak mulia. | Deliver quality national education guided by the values of faith and noble character. |
| misi.2 | Mengembangkan potensi akademik dan non-akademik peserta didik secara seimbang dan berkelanjutan. | Develop students' academic and non-academic potential in a balanced and sustained manner. |
| misi.3 | Membentuk budaya belajar yang disiplin, tertib, dan berkarakter di seluruh lingkungan sekolah. | Build a disciplined, orderly, and characterful learning culture across the school environment. |
| misi.4 | Memperkuat kemitraan antara sekolah, keluarga, dan masyarakat dalam mendidik peserta didik. | Strengthen the partnership between school, family, and community in educating students. |
| misi.5 | Menyiapkan lulusan yang berdaya saing pada jenjang perguruan tinggi dan dunia kerja. | Prepare graduates who are competitive at the higher-education level and in the world of work. |
| stat.year | Tahun Berdiri | Year Established |
| stat.alumni | Total Alumni | Total Alumni |
| stat.teachers | Jumlah Guru | Teaching Staff |
| stat.awards | Prestasi Diraih | Achievements Won |
| program.eyebrow | Program Pendidikan | Academic Programs |
| program.h2 | Dua Jenjang, Satu Perjalanan Pendidikan yang Terpadu | Two Levels, One Integrated Educational Journey |
| program.smp.title | Sekolah Menengah Pertama | Junior High School |
| program.smp.grade | Kelas 7 — 9 | Grades 7 — 9 |
| program.sma.title | Sekolah Menengah Atas | Senior High School |
| program.sma.grade | Kelas 10 — 12 · Jurusan IPA & IPS | Grades 10 — 12 · Science & Social majors |
| program.detail | Lihat Detail → | View Details → |
| program.note | Kedua jenjang berada dalam satu lingkungan sekolah yang terintegrasi, memastikan perjalanan pendidikan yang berkesinambungan dan terawasi dengan baik. | Both levels are located within one integrated school environment, ensuring a continuous and well-supervised educational journey. |
| keunggulan.eyebrow | Keunggulan Kami | Why Choose Us |
| keunggulan.h2 | Mengapa Memilih Sekolah Bina Pandu Utama? | Why Choose Sekolah Bina Pandu Utama? |
| feat.1.t | Kurikulum Nasional Terupdate | Up-to-date National Curriculum |
| feat.2.t | Tenaga Pendidik Bersertifikat | Certified Teaching Staff |
| feat.3.t | Fasilitas Modern & Lengkap | Modern & Complete Facilities |
| feat.4.t | Rekam Jejak Prestasi | Proven Track Record |
| feat.5.t | Pembinaan Karakter & Akhlak | Character & Moral Guidance |
| feat.6.t | Keterlibatan Orang Tua | Parental Involvement |
| fasilitas.eyebrow | Fasilitas Sekolah | Facilities |
| fasilitas.h2 | Fasilitas yang Menunjang Proses Pembelajaran | Facilities That Support the Learning Process |
| fac.1 | Laboratorium IPA | Science Laboratory |
| fac.2 | Perpustakaan | Library |
| fac.3 | Lapangan Olahraga | Sports Field |
| fac.4 | Ruang Komputer | Computer Lab |
| fac.5 | Aula Serbaguna | Multipurpose Hall |
| fac.6 | Ruang Kelas | Classroom |
| berita.eyebrow | Berita & Pengumuman | News & Announcements |
| berita.h2 | Kabar Terbaru dari Sekolah Kami | The Latest from Our School |
| berita.tag.prestasi | Prestasi | Achievement |
| berita.tag.kegiatan | Kegiatan | Activity |
| berita.readmore | Baca Selengkapnya → | Read More → |
| announce.title | Pengumuman Terbaru | Latest Announcements |
| announce.all | Lihat Semua Pengumuman → | View All Announcements → |
| prestasi.eyebrow | Prestasi Kami | Achievements |
| prestasi.h2 | Tradisi Prestasi yang Kami Banggakan | A Tradition of Achievement We Are Proud Of |
| level.kota | Tingkat Kota | City Level |
| level.provinsi | Tingkat Provinsi | Provincial Level |
| level.nasional | Tingkat Nasional | National Level |
| result.1 | Juara 1 | 1st Place |
| result.2 | Juara 2 | 2nd Place |
| result.3 | Juara 3 | 3rd Place |
| ppdb.eyebrow | Penerimaan Peserta Didik Baru | New Student Admissions |
| ppdb.h2 | Penerimaan Peserta Didik Baru (PPDB) 2025/2026 | New Student Admissions (PPDB) 2025/2026 |
| ppdb.step1 | Pendaftaran | Registration |
| ppdb.step2 | Tes Seleksi | Selection Test |
| ppdb.step3 | Pengumuman | Announcement |
| ppdb.step4 | Daftar Ulang | Re-enrollment |
| ppdb.req | Persyaratan Pendaftaran | Registration Requirements |
| ppdb.cta1 | Unduh Formulir Pendaftaran | Download Registration Form |
| ppdb.cta2 | Hubungi Panitia PPDB | Contact the PPDB Committee |
| kontak.eyebrow | Hubungi Kami | Contact |
| kontak.h2 | Kami Siap Membantu Anda | We Are Ready to Assist You |
| kontak.tu | Tata Usaha | Administration Office |
| kontak.ppdb | Panitia PPDB | PPDB Committee |
| kontak.phone | Telepon | Phone |
| kontak.hours | Jam Layanan | Hours |
| kontak.wa | Chat via WhatsApp | Chat via WhatsApp |
| footer.links | Tautan Cepat | Quick Links |
| footer.follow | Ikuti Kami | Follow Us |
| footer.rights | Hak cipta dilindungi. | All rights reserved. |
| footer.disclaimer | Ini adalah concept project oleh Codading untuk menampilkan kemampuan desain web. | This is a concept project by Codading to showcase web design capabilities. |

> All placeholder facts (1998, 3.200+ alumni, 84 guru, 150+ prestasi, quotas, dates, news titles) are realistic dummy content — swap for real data before launch.

---

## 8. Next.js 15 + Tailwind Build Notes

- **Tokens → `tailwind.config.ts`:** map the color/spacing/radius/shadow tables above into `theme.extend`. Load Lora + Source Sans 3 via `next/font/google`, expose as `--font-heading` / `--font-body` CSS variables.
- **i18n:** use `next-intl` (or App-Router `[locale]`) with the §7 dictionary; default `id`. Render per-locale on the server — don't ship the client innerHTML swap.
- **Images:** `next/image` for all `.ph` boxes; keep the documented dimensions/aspect ratios to avoid CLS.
- **Interactions to build:** sticky-nav shadow on scroll, mobile drawer, facilities **lightbox**, achievements horizontal scroller (optional arrows), smooth in-page anchor scroll, scroll-reveal (Framer Motion `whileInView` or a small IO hook — gate on `prefers-reduced-motion`).
- **Forms/links:** "Unduh Formulir", WhatsApp, social, and map are placeholders — wire to real endpoints. WhatsApp → `https://wa.me/<number>`.
- **A11y:** maintain heading order, `alt` text on every image, 44px min tap targets (already met), and visible focus states (add `:focus-visible` rings in the build).
