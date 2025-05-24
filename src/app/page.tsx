// import { InfoList, InfoListItem } from '@components/InfoList';
import { MainContent } from '@components/MainContent';
import { PersonalInfo } from '@components/PersonalInfo';
import { ProfilePicture } from '@components/ProfilePicture';
import { Sidebar } from '@components/Sidebar';
import { Title } from '@components/Title';
import { ToggleButton } from '@components/ToggleButton';
// import { WorkExperience } from '@components/WorkExperience';

export default async function Home() {
  return (
    <div className='relative flex h-dvh w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative mx-auto flex w-full overflow-hidden lg:max-w-[1024px] xl:max-w-[1280px]'>
        <ToggleButton />

        <Sidebar className='z-10'>
          <ProfilePicture className='sticky top-0 z-20' />
          <PersonalInfo />

          {/* <InfoList title='Skills'>
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
          </InfoList> */}

          <div className='min-h-12' />
        </Sidebar>

        <MainContent>
          <Title className='sticky top-0 z-20' />
          {/* <WorkExperience className='z-10' data={experience} /> */}
        </MainContent>
      </div>
    </div>
  );
}
