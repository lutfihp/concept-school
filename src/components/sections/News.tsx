import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import Badge from '@/components/ui/Badge';

const NEWS_IMAGES = [
  'https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
  'https://images.pexels.com/photos/1184579/pexels-photo-1184579.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
];

export default async function News() {
  const t = await getTranslations('news');

  const articles = [
    {
      tagLabel: t('tagPrestasi'),
      tagColor: 'accent' as const,
      date:     t('article1Date'),
      title:    t('article1Title'),
      excerpt:  t('article1Excerpt'),
      image:    NEWS_IMAGES[0],
    },
    {
      tagLabel: t('tagKegiatan'),
      tagColor: 'default' as const,
      date:     t('article2Date'),
      title:    t('article2Title'),
      excerpt:  t('article2Excerpt'),
      image:    NEWS_IMAGES[1],
    },
  ];

  const announcements = [
    { date: t('ann1Date'), text: t('ann1Text') },
    { date: t('ann2Date'), text: t('ann2Text') },
    { date: t('ann3Date'), text: t('ann3Text') },
    { date: t('ann4Date'), text: t('ann4Text') },
  ];

  return (
    <section id="berita" className="bg-white py-20">
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

        <div className="grid grid-cols-1 min-[920px]:grid-cols-[2fr_1fr] gap-8">
          {/* News articles */}
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="flex flex-col min-[540px]:flex-row border border-border rounded-(--radius) overflow-hidden shadow-(--shadow)"
              >
                <div className="relative w-full min-[540px]:w-40 shrink-0 aspect-[8/5] min-[540px]:aspect-auto">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="square" color={article.tagColor}>
                        {article.tagLabel}
                      </Badge>
                      <span className="text-xs text-ink-muted">{article.date}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-primary mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-ink-muted text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link
                    href="/berita"
                    className="text-primary text-sm font-semibold hover:text-accent transition-colors mt-3 inline-block focus-visible:outline-2 focus-visible:outline-accent rounded"
                  >
                    {t('readmore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Announcements board */}
          <aside className="border border-border rounded-(--radius) overflow-hidden shadow-(--shadow) self-start">
            <div className="bg-primary px-4 py-3">
              <h3 className="font-heading font-semibold text-white">{t('announceTitle')}</h3>
            </div>
            <ul className="divide-y divide-border">
              {announcements.map((ann) => (
                <li key={ann.text} className="px-4 py-3">
                  <span className="text-xs text-accent font-medium block mb-0.5">{ann.date}</span>
                  <p className="text-sm text-ink leading-snug">{ann.text}</p>
                </li>
              ))}
            </ul>
            <div className="px-4 py-3 border-t border-border">
              <Link
                href="/pengumuman"
                className="text-primary text-sm font-semibold hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
              >
                {t('announceAll')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
