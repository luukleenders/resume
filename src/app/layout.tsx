import './globals.css';

import { cookies } from 'next/headers';
import type { Metadata as NextMetadata } from 'next';
import type { ReactNode } from 'react';

import { getData } from '@db/getData';
import type { Education, Experience, Metadata, Personal, Skill } from '@db/types';
import { AppStoreProvider } from '@provider';

export const generateMetadata = async (): Promise<NextMetadata> => {
  const metadata = await getData<Metadata[]>('metadata', true);

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
