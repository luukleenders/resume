import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luuk Leenders',
  description: 'Resume for Luuk Leenders.',
  openGraph: {
    url: 'https://luuk.leenders.li',
    type: 'website',
    title: 'Luuk Leenders',
    description: 'Resume for Luuk Leenders.',
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
