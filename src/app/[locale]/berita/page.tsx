import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Crest from '@/components/ui/Crest';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function BeritaPage() {
  const t    = await getTranslations('stub');
  const tNav = await getTranslations('nav');

  return (
    <>
      <div className="bg-primary-tint border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 h-11 flex items-center gap-2 text-sm text-ink-muted">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary font-medium">{t('beritaTitle')}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-16">
        <Eyebrow className="mb-3">{tNav('news')}</Eyebrow>
        <h1 className="font-heading font-semibold text-primary text-3xl">{t('beritaTitle')}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-24 flex justify-center">
        <div className="flex flex-col items-center gap-6 text-center max-w-md border border-border rounded-[var(--radius)] p-10 shadow-[var(--shadow)]">
          <Crest size="lg" />
          <p className="text-ink-muted leading-relaxed">{t('comingSoon')}</p>
          <Button variant="outline" href="/">{t('backHome')}</Button>
        </div>
      </div>
    </>
  );
}
