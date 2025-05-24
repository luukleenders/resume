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

        <Sidebar>
          <div className='relative z-20 flex w-full items-center justify-center bg-slate-200/30 px-4 py-8 backdrop-blur-lg lg:px-8'>
            <ProfilePicture />
          </div>

          <div className='relative z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
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
          </div>
        </Sidebar>

        <MainContent>
          <div className='z-20 flex items-center justify-start bg-white/30 px-4 pt-16 pb-10 backdrop-blur-lg md:pt-16 md:pb-12 lg:px-8 2xl:py-15'>
            <Title />
          </div>

          <WorkExperience data={experience} />
        </MainContent>
      </div>
    </div>
  );
}
