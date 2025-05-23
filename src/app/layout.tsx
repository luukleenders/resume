import { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

// eslint-disable-next-line
export const metadata: Metadata = {
  title: 'Curriculum Vitae',
  description: 'Resume for Luuk Leenders.',
  openGraph: {
    title: 'Curriculum Vitae',
    description: 'Resume for Luuk Leenders.',
    url: 'https://luuk.leenders.li',
    images: [
      {
        url: 'https://luuk.leenders.li/thumb.png',
        width: 1200,
        height: 630,
        alt: 'Curriculum Vitae',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
