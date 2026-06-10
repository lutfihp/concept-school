import { getTranslations } from 'next-intl/server';

export default async function StatBand() {
  const t = await getTranslations('stat');

  const stats = [
    { icon: '★', value: t('yearValue'),     label: t('yearLabel') },
    { icon: '✦', value: t('alumniValue'),   label: t('alumniLabel') },
    { icon: '✦', value: t('teachersValue'), label: t('teachersLabel') },
    { icon: '★', value: t('awardsValue'),   label: t('awardsLabel') },
  ];

  return (
    <section className="bg-primary-dark text-white py-14">
      <div className="max-w-300 mx-auto px-6">
        <div className="grid grid-cols-2 min-[680px]:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center py-6 px-4 ${
                i < stats.length - 1 ? 'min-[680px]:border-r border-white/20' : ''
              }`}
            >
              <span className="text-accent text-xl mb-2" aria-hidden="true">{stat.icon}</span>
              <span className="font-heading font-bold text-accent text-4xl leading-tight">
                {stat.value}
              </span>
              <span className="text-white/70 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
