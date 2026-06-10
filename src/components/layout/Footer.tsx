import { getTranslations } from 'next-intl/server';
import Crest from '@/components/ui/Crest';
import Badge from '@/components/ui/Badge';

const QUICK_LINKS = [
  { key: 'about',      href: '#tentang' },
  { key: 'program',    href: '#program' },
  { key: 'facilities', href: '#fasilitas' },
  { key: 'news',       href: '#berita' },
  { key: 'admissions', href: '#ppdb' },
  { key: 'contact',    href: '#kontak' },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z',
  },
] as const;

export default async function Footer() {
  const tFooter = await getTranslations('footer');
  const tNav    = await getTranslations('nav');
  const tBrand  = await getTranslations('brand');

  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white border-t-2 border-accent">
      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid gap-10 min-[820px]:grid-cols-3">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Crest size="md" />
            <div className="leading-tight">
              <div className="font-heading font-semibold text-white">{tBrand('name')}</div>
              <div className="text-white/60 text-xs">{tBrand('tagline')}</div>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{tBrand('yayasan')}</p>
          <Badge variant="pill" color="accent">{tBrand('accr')}</Badge>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wide">
            {tFooter('links')}
          </h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="text-white/70 text-sm hover:text-accent transition-colors"
                >
                  {tNav(key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Social */}
        <div>
          <h3 className="font-heading font-semibold text-white text-sm mb-4 uppercase tracking-wide">
            {tFooter('follow')}
          </h3>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, path }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded border border-white/20 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col min-[680px]:flex-row gap-2 min-[680px]:items-center min-[680px]:justify-between text-xs text-white/50">
          <span>© {year} {tBrand('name')}. {tFooter('rights')}</span>
          <span className="border-l-2 border-accent pl-3 italic text-white/40">
            {tFooter('disclaimer')}
          </span>
        </div>
      </div>
    </footer>
  );
}
