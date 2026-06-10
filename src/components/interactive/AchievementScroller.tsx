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
