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
