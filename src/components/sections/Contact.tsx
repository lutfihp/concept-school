import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <section id="kontak" className="bg-surface-alt py-20">
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

        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-(--radius) overflow-hidden border border-border shadow-(--shadow)">
            <iframe
              src="https://maps.google.com/maps?q=-6.9175,107.6191&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School location map"
            />
          </div>

          {/* Contact cards */}
          <div className="space-y-4">
            {/* Address */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-heading font-semibold text-primary mb-2 text-sm">
                Sekolah Bina Pandu Utama
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">{t('address')}</p>
            </div>

            {/* Tata Usaha */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-semibold text-ink mb-3 text-sm">{t('tuTitle')}</h3>
              <p className="text-sm text-ink-muted mb-1">📞 {t('tuPhone')}</p>
              <p className="text-sm text-ink-muted">🕐 {t('tuHours')}</p>
            </div>

            {/* PPDB */}
            <div className="border border-border rounded-(--radius) p-5 bg-white shadow-(--shadow)">
              <h3 className="font-semibold text-ink mb-3 text-sm">{t('ppdbTitle')}</h3>
              <p className="text-sm text-ink-muted mb-4">📞 {t('ppdbPhone')}</p>
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold rounded-(--radius) transition-colors bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 focus-visible:outline-2 focus-visible:outline-accent"
              >
                💬 {t('ppdbWa')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
