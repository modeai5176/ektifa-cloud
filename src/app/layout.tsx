import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Reem_Kufi } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const arabic = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EKTIFA — Artisanal Chocolate & Honey',
  description:
    'EKTIFA — artisanal chocolate and honey crafted in the Emirates. QAND chocolate and AL FAYA honey, made with native ingredients.',
  keywords: [
    'EKTIFA',
    'QAND',
    'AL FAYA',
    'Emirati chocolate',
    'artisanal honey',
    'Sharjah',
    'UAE gifting',
  ],
  openGraph: {
    title: 'EKTIFA — Artisanal Chocolate & Honey',
    description: 'Chocolate and honey, crafted in the Emirates.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f3ec',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body className="bg-paper text-ink antialiased">
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
