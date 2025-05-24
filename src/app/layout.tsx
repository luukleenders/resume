import './globals.css';

import { cookies, headers } from 'next/headers';
import { userAgent } from 'next/server';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { getData } from '@db/getData';
import type { Education, Experience, Personal, Skill } from '@db/types';
import { AppStoreProvider } from '@provider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headerList = await headers();
  const ua = userAgent({ headers: headerList });
  const isMobile = /mobile/i.test(ua.ua);

  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  const [skills, education, experience, personal] = await Promise.all([
    getData<Skill[]>('skills', session?.value ? true : false),
    getData<Education[]>('education', session?.value ? true : false),
    getData<Experience[]>('experience', session?.value ? true : false),
    getData<Personal[]>('personal', session?.value ? true : false),
  ]);

  return (
    <html lang='en'>
      <body>
        <AppStoreProvider
          isMobile={isMobile}
          skills={skills}
          education={education}
          experience={experience}
          personal={personal}
          session={session}
        >
          {children}
        </AppStoreProvider>
      </body>
    </html>
  );
}
