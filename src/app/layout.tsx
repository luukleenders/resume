import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Luuk Leenders | Senior Software Engineer',
  description:
    'Digital resume of Luuk Leenders, a Senior Software Engineer specialising in web development',
  openGraph: {
    url: 'https://luuk.leenders.li',
    type: 'website',
    title: 'Luuk Leenders | Senior Software Engineer',
    description:
      'Digital resume of Luuk Leenders, a Senior Software Engineer specialising in web development',
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
