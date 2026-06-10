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
