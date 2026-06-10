'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const LOCALES = ['id', 'en'] as const;

export default function LangToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = (next: (typeof LOCALES)[number]) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="inline-flex rounded-[var(--radius)] border border-border overflow-hidden text-xs font-semibold"
      role="group"
      aria-label="Language toggle"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => handleToggle(l)}
          aria-pressed={l === locale}
          className={`px-2.5 py-1 uppercase transition-colors min-w-[32px] ${
            l === locale
              ? 'bg-primary text-white'
              : 'bg-white text-ink-muted hover:bg-surface-alt'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
