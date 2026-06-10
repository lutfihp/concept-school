import { getTranslations } from 'next-intl/server';

export default async function TopBar() {
  const t = await getTranslations('topbar');

  return (
    <div className="hidden min-[860px]:flex bg-primary-dark text-white text-xs">
      <div className="max-w-300 w-full mx-auto px-6 h-9.5 flex items-center justify-between">
        {/* Accreditation badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
          <span className="font-semibold tracking-wide">{t('accr')}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-5 text-white/80">
          <a
            href={`tel:${t('phone').replace(/\D/g, '')}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {t('phone')}
          </a>
          <a
            href={`mailto:${t('email')}`}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,12 2,6" />
            </svg>
            {t('email')}
          </a>
        </div>
      </div>
    </div>
  );
}
