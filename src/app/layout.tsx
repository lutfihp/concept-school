import type { Metadata, Viewport } from 'next';
import '@/styles/app.css';

export const metadata: Metadata = {
  title: 'Sekolah Bina Pandu Utama',
  description: 'SMP & SMA terintegrasi di Bandung, Jawa Barat.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#15294D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
