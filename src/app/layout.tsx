import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '나는 셀러 - 1인 온라인 셀러 커뮤니티',
  description: '1인 온라인 셀러들을 위한 익명 커뮤니티. 스트레스 해소, 팁 공유, 운영 고민 상담',
  keywords: ['셀러', '온라인 셀러', '커뮤니티', '쇼핑몰', '창업', '부업', '스마트스토어', '쿠팡'],
  authors: [{ name: '나는 셀러' }],
  creator: '나는 셀러',
  publisher: '나는 셀러',
  metadataBase: new URL('https://seller-green.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://seller-green.vercel.app',
    siteName: '나는 셀러',
    title: '나는 셀러 - 1인 온라인 셀러 커뮤니티',
    description: '1인 온라인 셀러들을 위한 익명 커뮤니티. 스트레스 해소, 팁 공유, 운영 고민 상담',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '나는 셀러 - 1인 온라인 셀러 커뮤니티',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '나는 셀러 - 1인 온라인 셀러 커뮤니티',
    description: '1인 온라인 셀러들을 위한 익명 커뮤니티. 스트레스 해소, 팁 공유, 운영 고민 상담',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
