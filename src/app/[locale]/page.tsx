import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="max-w-300 mx-auto px-6 py-24 text-center text-ink-muted">
      <p>Landing page — Phase 2</p>
    </div>
  );
}
