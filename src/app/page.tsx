'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { CircleArrowLeft } from 'lucide-react';

import { Experience, ExperienceItem } from '@components/Experience';
import { InfoList, InfoListItem } from '@components/InfoList';
import { ProfilePicture } from '@components/ProfilePicture';
import { Sidebar } from '@components/Sidebar';
import { Title } from '@components/Title';

import education from '@data/education.json';
import experience from '@data/experience.json';
import personal from '@data/personal.json';
import skills from '@data/skills.json';

export default function Home() {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const [buttonX, setButtonX] = useState(296);

  const iconClassName = classNames(
    'h-12 w-12 fill-slate-600 stroke-slate-200 transition-transform duration-300',
    {
      'rotate-0': isOpen,
      'rotate-180': !isOpen,
    }
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!windowSize.width) return;
    setIsOpen(windowSize.width >= 1024);
  }, [windowSize.width]);

  useEffect(() => {
    if (!windowSize.width) return;
    if (windowSize.width <= 320) {
      if (isOpen) {
        setButtonX(windowSize.width - 72);
      } else {
        setButtonX(312);
      }
    }

    if (isOpen) {
      setButtonX(296);
    } else {
      setButtonX(32);
    }
  }, [windowSize.width, isOpen]);

  return (
    <div className='relative flex h-screen w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative mx-auto flex w-full overflow-hidden lg:max-w-[1024px] xl:max-w-[1280px]'>
        <motion.button
          initial={{ x: 296 }}
          animate={{ x: buttonX }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='absolute top-4 z-30 cursor-pointer'
          onClick={handleToggle}
        >
          <CircleArrowLeft className={iconClassName} />
        </motion.button>

        <Sidebar isOpen={isOpen}>
          <div className='relative z-20 flex w-full items-center justify-center bg-slate-200/30 px-4 py-8 backdrop-blur-lg lg:px-8'>
            <ProfilePicture />
          </div>

          <div className='relative z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
            <InfoList title='Personal'>
              {Object.entries(personal).map(([key, value]) => (
                <InfoListItem key={key} label={key} value={value} />
              ))}
            </InfoList>

            <InfoList title='Skills'>
              {Object.entries(skills).map(([key, value]) => (
                <InfoListItem key={key} label={key} value={value} />
              ))}
            </InfoList>

            <InfoList title='Education'>
              {education.map((item) => (
                <InfoListItem
                  key={item.label}
                  label={item.label}
                  footnote={item.footnote}
                  meta={item.meta}
                />
              ))}
            </InfoList>

            <div className='min-h-12' />
          </div>
        </Sidebar>

        <motion.div
          initial={{ width: 'calc(100%)', x: 320 }}
          animate={{
            width: isOpen ? 'calc(100%)' : '100%',
            x: isOpen ? 320 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='relative flex h-full flex-col bg-white'
        >
          <div className='z-20 flex min-h-[165px] items-center justify-start bg-white/30 px-4 backdrop-blur-lg md:min-h-[180px] lg:min-h-[200px] lg:px-8 xl:min-h-[220px] 2xl:min-h-[264px]'>
            <Title />
          </div>

          <div className='z-10 -mt-[150px] flex flex-col overflow-y-auto px-4 pt-[150px] [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
            <Experience>
              {experience.map((item) => (
                <ExperienceItem key={item.company} {...item} />
              ))}

              <div className='min-h-12' />
            </Experience>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
