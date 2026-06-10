import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import FacilitiesGrid, { type FacilityItem } from '@/components/interactive/FacilitiesGrid';

const FAC_IMAGES = [
  'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/1634149/pexels-photo-1634149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
];

export default async function Facilities() {
  const t = await getTranslations('facilities');

  const items: FacilityItem[] = (
    [t('fac1'), t('fac2'), t('fac3'), t('fac4'), t('fac5'), t('fac6')] as string[]
  ).map((caption, i) => ({ src: FAC_IMAGES[i], caption }));

  return (
    <section id="fasilitas" className="bg-surface-alt py-20">
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
        <FacilitiesGrid items={items} />
      </div>
    </section>
  );
}
