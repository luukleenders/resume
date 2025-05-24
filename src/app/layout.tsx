import './globals.css';

import { cookies } from 'next/headers';
import type { Metadata as NextMetadata } from 'next';
import type { ReactNode } from 'react';

import { SessionManager } from '@components/SessionManager';
import { getData } from '@db/getData';
import type { Education, Experience, Metadata, Personal, Session, Skill } from '@db/types';
import { AppStoreProvider } from '@provider';

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
    getData<Personal[]>('personal', {
      email: session?.email ? true : false,
      phone: session?.fullAccess,
    }),
    getData<Skill[]>('skills'),
  ]);

  return (
    <html lang='en'>
      <body>
        <AppStoreProvider
          skills={skills}
          education={education}
          experience={experience}
          personal={personal}
        >
          {children}
          <SessionManager session={session} />
        </AppStoreProvider>
      </body>
    </html>
  );
}
