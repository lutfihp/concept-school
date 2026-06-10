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
