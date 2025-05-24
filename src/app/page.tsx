import { cookies } from 'next/headers';

import { InfoList, InfoListItem } from '@components/InfoList';
import { MainContent } from '@components/MainContent';
import { PersonalInfo } from '@components/PersonalInfo';
import { ProfilePicture } from '@components/ProfilePicture';
import { SessionProvider } from '@components/SessionProvider';
import { Sidebar } from '@components/Sidebar';
import { Title } from '@components/Title';
import { ToggleButton } from '@components/ToggleButton';
import { WorkExperience } from '@components/WorkExperience';
import { getData } from '@db/getData';
import type { Education, Experience as ExperienceType, Personal, Skill } from '@db/types';

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  const [skills, education, experience, personal] = await Promise.all([
    getData<Skill[]>('skills', session?.value ? true : false),
    getData<Education[]>('education', session?.value ? true : false),
    getData<ExperienceType[]>('experience', session?.value ? true : false),
    getData<Personal[]>('personal', session?.value ? true : false),
  ]);

  return (
    <div className='relative flex h-dvh w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative mx-auto flex w-full overflow-hidden lg:max-w-[1024px] xl:max-w-[1280px]'>
        <SessionProvider session={session} />
        <ToggleButton />

        <Sidebar className='z-10'>
          <ProfilePicture className='sticky top-0 z-20' />
          <PersonalInfo data={personal} />

          <InfoList title='Skills'>
            {skills.map((skill) => (
              <InfoListItem
                key={skill.category}
                label={skill.category}
                value={skill.items.join(', ')}
              />
            ))}
          </InfoList>

          <InfoList title='Education'>
            {education.map((item) => (
              <InfoListItem
                key={item.label}
                label={item.label}
                footnote={item.footnote}
                metaLabel={item.metaLabel}
                metaValue={item.metaValue}
              />
            ))}
          </InfoList>

          <div className='min-h-12' />
        </Sidebar>

        <MainContent>
          <Title className='sticky top-0 z-20' />
          <WorkExperience className='z-10' data={experience} />
        </MainContent>
      </div>
    </div>
  );
}
