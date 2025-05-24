import { Education } from '@components/Education';
import { MainContent } from '@components/MainContent';
import { Personal } from '@components/Personal';
import { ProfilePicture } from '@components/ProfilePicture';
import { Sidebar } from '@components/Sidebar';
import { Skills } from '@components/Skills';
import { Title } from '@components/Title';
import { ToggleButton } from '@components/ToggleButton';
import { WorkExperience } from '@components/WorkExperience';

export default async function Home() {
  return (
    <div className='relative flex h-dvh w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative mx-auto flex w-full overflow-hidden lg:max-w-[1024px] xl:max-w-[1280px]'>
        <ToggleButton />

        <Sidebar className='z-10'>
          <ProfilePicture className='sticky top-0 z-20' />

          <div className='flex flex-col gap-4 px-4 lg:px-8'>
            <Personal />
            <Skills />
            <Education />
          </div>

          <div className='min-h-12' />
        </Sidebar>

        <MainContent>
          <Title className='sticky top-0 z-20' />
          <WorkExperience className='z-10' />
        </MainContent>
      </div>
    </div>
  );
}
