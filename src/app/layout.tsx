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
  title: 'EKTIFA — A Contemporary Emirati Maison of Chocolate & Honey',
  description:
    'EKTIFA is a contemporary Emirati maison of exceptional artisanal chocolate and honey. Crafted in the Emirates. A private world of material, craft and refined gifting.',
  keywords: [
    'EKTIFA',
    'Emirati chocolate',
    'luxury chocolate',
    'artisanal honey',
    'UAE maison',
    'bespoke gifting',
  ],
  openGraph: {
    title: 'EKTIFA — A Contemporary Emirati Maison',
    description: 'Crafted in the Emirates. Chocolate & honey as a private world.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0a09',
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
      <body className="bg-obsidian text-bone antialiased">
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
