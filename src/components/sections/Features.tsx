import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

const ICONS = ['📖', '👨‍🏫', '🏫', '🏆', '🌱', '👪'];

export default async function Features() {
  const t = await getTranslations('features');

  const items = [
    { icon: ICONS[0], title: t('1title'), desc: t('1desc') },
    { icon: ICONS[1], title: t('2title'), desc: t('2desc') },
    { icon: ICONS[2], title: t('3title'), desc: t('3desc') },
    { icon: ICONS[3], title: t('4title'), desc: t('4desc') },
    { icon: ICONS[4], title: t('5title'), desc: t('5desc') },
    { icon: ICONS[5], title: t('6title'), desc: t('6desc') },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-300 mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3">{t('eyebrow')}</Eyebrow>
          <h2
            className="font-heading font-semibold text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
          >
            {t('h2')}
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 min-[820px]:grid-cols-3 gap-px bg-border border border-border rounded-(--radius) overflow-hidden">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-6 hover:bg-primary-tint transition-colors"
            >
              <div
                className="w-10 h-10 border border-border rounded-(--radius) flex items-center justify-center text-xl mb-4"
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="font-heading font-semibold text-primary mb-2">{title}</h3>
              <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
