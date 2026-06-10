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

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          scrolled ? 'shadow-(--shadow-md)' : ''
        }`}
      >
        <div className="max-w-300 mx-auto px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-accent rounded"
          >
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
              className="p-2 -mr-1 text-ink hover:text-primary transition-colors rounded focus-visible:outline-2 focus-visible:outline-accent"
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
