import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Lora, Source_Sans_3 } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Sekolah Bina Pandu Utama',
    description:
      locale === 'id'
        ? 'SMP & SMA terintegrasi di Bandung, Jawa Barat.'
        : 'Integrated Junior & Senior High School in Bandung, West Java.',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div className={`${lora.variable} ${sourceSans.variable}`} lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
