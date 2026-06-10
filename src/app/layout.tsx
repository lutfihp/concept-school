import type { Metadata } from 'next';
import '@/styles/app.css';

export const metadata: Metadata = {
  title: 'Sekolah Bina Pandu Utama',
  description: 'SMP & SMA terintegrasi di Bandung, Jawa Barat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
