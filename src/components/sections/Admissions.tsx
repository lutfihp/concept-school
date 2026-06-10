import { getTranslations } from 'next-intl/server';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';

export default async function Admissions() {
  const t = await getTranslations('admissions');

  const steps = [
    { num: t('step1Num'), title: t('step1Title'), date: t('step1Date'), desc: t('step1Desc') },
    { num: t('step2Num'), title: t('step2Title'), date: t('step2Date'), desc: t('step2Desc') },
    { num: t('step3Num'), title: t('step3Title'), date: t('step3Date'), desc: t('step3Desc') },
    { num: t('step4Num'), title: t('step4Title'), date: t('step4Date'), desc: t('step4Desc') },
  ];

  const requirements = [
    t('req1'), t('req2'), t('req3'), t('req4'), t('req5'), t('req6'),
  ];

  return (
    <section id="ppdb" className="bg-white py-20">
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

        {/* Timeline */}
        <div className="grid grid-cols-1 min-[620px]:grid-cols-2 min-[920px]:grid-cols-4 gap-4 mb-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="border-t-2 border-accent border border-border rounded-(--radius) shadow-(--shadow) pt-4 px-4 pb-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm mb-3 shrink-0">
                {step.num}
              </div>
              <h3 className="font-heading font-semibold text-primary mb-1">{step.title}</h3>
              <p className="text-accent text-xs font-semibold mb-2">{step.date}</p>
              <p className="text-ink-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-6 mb-10 border border-border rounded-(--radius) p-6 bg-primary-tint">
          <div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {t('quotaSmp')}
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-ink">
                <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {t('quotaSma')}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-primary mb-3 text-sm">{t('reqTitle')}</h3>
            <ul className="space-y-2">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="accent" href="#">{t('cta1')}</Button>
          <Button variant="outline" href="https://wa.me/6281234567890">{t('cta2')}</Button>
        </div>
      </div>
    </section>
  );
}
