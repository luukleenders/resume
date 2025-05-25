import './globals.css';

import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import type { Metadata as NextMetadata } from 'next';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { SessionManager } from '@components/SessionManager';
import { getData } from '@db/getData';
import type { Education, Experience, Metadata, Personal, Session, Skill } from '@db/types';
import { AppStoreProvider } from '@provider';

const proximaNova = localFont({
  src: [
    {
      path: '../../public/fonts/proximaNova-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/proximaNova-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/proximaNova-semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/proximaNova-extrabold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

export const generateMetadata = async (): Promise<NextMetadata> => {
  const metadata = await getData<Metadata[]>('metadata');

  return {
    title: metadata.find((item) => item.key === 'title')?.value,
    description: metadata.find((item) => item.key === 'description')?.value,
    openGraph: {
      url: 'https://luuk.leenders.li',
      type: 'website',
      title: metadata.find((item) => item.key === 'title')?.value,
      description: metadata.find((item) => item.key === 'description')?.value,
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();

  let session: Session = { email: '', fullAccess: false };

  try {
    session = JSON.parse(cookieStore.get('session')?.value || '{"email":"","fullAccess":false}');
  } catch {}

  const [education, experience, personal, skills] = await Promise.all([
    getData<Education[]>('education'),
    getData<Experience[]>('experience'),
    getData<Personal[]>('personal', session),
    getData<Skill[]>('skills'),
  ]);

  return (
    <html lang='en' className={proximaNova.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppStoreProvider
            skills={skills}
            education={education}
            experience={experience}
            personal={personal}
          >
            {children}
            <SessionManager session={session} />
          </AppStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
