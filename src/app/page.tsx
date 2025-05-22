import { Experience, ExperienceItem } from '@components/Experience';
import { InfoList, InfoListItem } from '@components/InfoList';
import { PersonalInfo } from '@components/PersonalInfo';
import { ProfilePicture } from '@components/ProfilePicture';
import { Sidebar } from '@components/Sidebar';
import { Title } from '@components/Title';

import { Education, Experience as ExperienceType, Personal, Skill } from '../db/types';

import { ToggleButton } from '@components/ToggleButton';
import { MainContent } from '@components/MainContent';

async function getPersonalData() {
  const res = await fetch(`${process.env.BASE_URL}/api/personal`);
  if (!res.ok) throw new Error('Failed to fetch personal data');
  return res.json();
}

async function getSkillsData() {
  const res = await fetch(`${process.env.BASE_URL}/api/skills`);
  if (!res.ok) throw new Error('Failed to fetch skills data');
  return res.json();
}

async function getEducationData() {
  const res = await fetch(`${process.env.BASE_URL}/api/education`);
  if (!res.ok) throw new Error('Failed to fetch education data');
  return res.json();
}

async function getExperienceData() {
  const res = await fetch(`${process.env.BASE_URL}/api/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience data');
  return res.json();
}

export default async function Home() {
  const personal: Personal[] = await getPersonalData();
  const skills: Skill[] = await getSkillsData();
  const education: Education[] = await getEducationData();
  const experiences: ExperienceType[] = await getExperienceData();

  return (
    <div className='relative flex h-dvh w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative mx-auto flex w-full overflow-hidden lg:max-w-[1024px] xl:max-w-[1280px]'>
        <ToggleButton />

        <Sidebar>
          <div className='relative z-20 flex w-full items-center justify-center bg-slate-200/30 px-4 py-8 backdrop-blur-lg lg:px-8'>
            <ProfilePicture />
          </div>

          <div className='relative z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
            <PersonalInfo initialData={personal} />

            <InfoList title='Skills'>
              {skills.map((skill) => (
                <InfoListItem key={skill.category} label={skill.category} value={skill.items} />
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

          <div className='z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
            <Experience>
              {experiences.map((item) => (
                <ExperienceItem key={item.company} {...item} />
              ))}

              <div className='min-h-12' />
            </Experience>
          </div>
        </MainContent>
      </div>
    </div>
  );
}
