import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

const ABOUT_IMAGE =
  'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&dpr=1';
const PRINCIPAL_IMAGE =
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2';

export default async function About() {
  const t = await getTranslations('about');

  return (
    <section id="tentang" className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
            <h2
              className="font-heading font-semibold text-primary mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
            >
              {t('h2')}
            </h2>
            <p className="text-ink-muted leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-ink-muted leading-relaxed mb-8">{t('p2')}</p>

            <div className="flex items-center gap-4 pt-6 border-t border-border">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src={PRINCIPAL_IMAGE}
                  alt={t('principalName')}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">{t('principalName')}</p>
                <p className="text-ink-muted text-xs">{t('principalTitle')}</p>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative w-full aspect-[6/7] rounded-(--radius) overflow-hidden shadow-(--shadow-md)">
            <Image
              src={ABOUT_IMAGE}
              alt={t('eyebrow')}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="mt-16 pt-12 border-t border-border grid grid-cols-1 min-[860px]:grid-cols-2 gap-10">
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 text-lg">{t('visiLabel')}</h3>
            <p className="font-heading italic text-ink leading-relaxed text-[1.05rem]">
              &ldquo;{t('visiText')}&rdquo;
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-primary mb-4 text-lg">{t('misiLabel')}</h3>
            <ol className="space-y-3">
              {(['misi1', 'misi2', 'misi3', 'misi4', 'misi5'] as const).map((key, i) => (
                <li key={key} className="flex gap-3 text-ink-muted text-sm leading-relaxed">
                  <span className="font-semibold text-accent shrink-0 w-6 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(key)}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
