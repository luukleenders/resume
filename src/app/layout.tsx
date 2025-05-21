import { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

// eslint-disable-next-line
export const metadata: Metadata = {
  title: 'Luuk Leenders',
  description: 'The resume of Luuk Leenders',
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
