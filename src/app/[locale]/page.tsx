import { setRequestLocale } from 'next-intl/server';
import LightboxProvider from '@/components/interactive/LightboxProvider';
import ScrollReveal from '@/components/interactive/ScrollReveal';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import StatBand from '@/components/sections/StatBand';
import Programs from '@/components/sections/Programs';
import Features from '@/components/sections/Features';
import Facilities from '@/components/sections/Facilities';
import News from '@/components/sections/News';
import Achievements from '@/components/sections/Achievements';
import Admissions from '@/components/sections/Admissions';
import Contact from '@/components/sections/Contact';

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
    <LightboxProvider>
      <Hero />
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><StatBand /></ScrollReveal>
      <ScrollReveal><Programs /></ScrollReveal>
      <ScrollReveal><Features /></ScrollReveal>
      <ScrollReveal><Facilities /></ScrollReveal>
      <ScrollReveal><News /></ScrollReveal>
      <ScrollReveal><Achievements /></ScrollReveal>
      <ScrollReveal><Admissions /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </LightboxProvider>
  );
}
