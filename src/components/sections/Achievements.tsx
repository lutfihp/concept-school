import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import AchievementScroller, {
  type AchievementCard,
} from '@/components/interactive/AchievementScroller';

export default async function Achievements() {
  const t = await getTranslations('achievements');

  const cards: AchievementCard[] = [
    { year: t('item1Year'), level: t('item1Level') as AchievementCard['level'], title: t('item1Title'), result: t('item1Result') },
    { year: t('item2Year'), level: t('item2Level') as AchievementCard['level'], title: t('item2Title'), result: t('item2Result') },
    { year: t('item3Year'), level: t('item3Level') as AchievementCard['level'], title: t('item3Title'), result: t('item3Result') },
    { year: t('item4Year'), level: t('item4Level') as AchievementCard['level'], title: t('item4Title'), result: t('item4Result') },
    { year: t('item5Year'), level: t('item5Level') as AchievementCard['level'], title: t('item5Title'), result: t('item5Result') },
    { year: t('item6Year'), level: t('item6Level') as AchievementCard['level'], title: t('item6Title'), result: t('item6Result') },
  ];

  const levelLabels = {
    kota:     t('levelKota'),
    provinsi: t('levelProvinsi'),
    nasional: t('levelNasional'),
  };

  return (
    <section className="bg-surface-alt py-20">
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
        <AchievementScroller cards={cards} levelLabels={levelLabels} />
      </div>
    </section>
  );
}
