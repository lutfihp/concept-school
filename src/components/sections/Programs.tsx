import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import Badge from '@/components/ui/Badge';

interface ProgramCardProps {
  variant: 'smp' | 'sma';
}

export async function ProgramCard({ variant }: ProgramCardProps) {
  const t = await getTranslations('programs');
  const isSmp = variant === 'smp';

  const title    = isSmp ? t('smpTitle')    : t('smaTitle');
  const grade    = isSmp ? t('smpGrade')    : t('smaGrade');
  const desc     = isSmp ? t('smpDesc')     : t('smaDesc');
  const features = isSmp
    ? [t('smpFeature1'), t('smpFeature2'), t('smpFeature3'), t('smpFeature4'), t('smpFeature5')]
    : [t('smaFeature1'), t('smaFeature2'), t('smaFeature3'), t('smaFeature4'), t('smaFeature5')];
  const href = isSmp ? '/program/smp' : '/program/sma';

  return (
    <div className="border border-border rounded-(--radius) shadow-(--shadow) bg-white flex flex-col h-full">
      <div className="p-6 pb-4 border-b border-border">
        <Badge variant="square" color="primary" className="mb-3">
          {isSmp ? 'SMP' : 'SMA'}
        </Badge>
        <h3 className="font-heading font-semibold text-primary text-xl mb-1">{title}</h3>
        <p className="text-accent text-sm font-medium">{grade}</p>
      </div>

      <div className="p-6 flex-1">
        <p className="text-ink-muted text-sm leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
              <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-border flex items-center justify-between">
        <Badge variant="pill" color="accent">{t('curriculumBadge')}</Badge>
        <Link
          href={href}
          className="text-primary text-sm font-semibold hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
        >
          {t('detail')}
        </Link>
      </div>
    </div>
  );
}

export default async function Programs() {
  const t = await getTranslations('programs');

  return (
    <section id="program" className="bg-surface-alt py-20">
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

        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-6 mb-8">
          <ProgramCard variant="smp" />
          <ProgramCard variant="sma" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <Badge variant="pill" color="default">{t('curriculumBadge')}</Badge>
          <Badge variant="pill" color="default">{t('integratedBadge')}</Badge>
        </div>
        <p className="text-center text-ink-muted text-sm max-w-xl mx-auto">{t('note')}</p>
      </div>
    </section>
  );
}
