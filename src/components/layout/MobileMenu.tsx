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
