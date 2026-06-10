export function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}

export default function LandingPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24 text-center text-ink-muted">
      <p>Landing page — Phase 2</p>
    </div>
  );
}
