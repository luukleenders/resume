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

import { Education, Experience as ExperienceType, Personal, Skill } from '../db/types';

async function getPersonalData() {
  const res = await fetch('/api/personal');
  if (!res.ok) throw new Error('Failed to fetch personal data');
  return res.json();
}

async function getSkillsData() {
  const res = await fetch('/api/skills');
  if (!res.ok) throw new Error('Failed to fetch skills data');
  return res.json();
}

async function getEducationData() {
  const res = await fetch('/api/education');
  if (!res.ok) throw new Error('Failed to fetch education data');
  return res.json();
}

async function getExperienceData() {
  const res = await fetch('/api/experience');
  if (!res.ok) throw new Error('Failed to fetch experience data');
  return res.json();
}

export default function Home() {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const [buttonX, setButtonX] = useState(296);
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    getPersonalData().then((data) => {
      setPersonal(data);
    });

    getSkillsData().then((data) => {
      setSkills(data);
    });

    getEducationData().then((data) => {
      setEducation(data);
    });

    getExperienceData().then((data) => {
      setExperiences(data);
    });
  }, []);

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
        setButtonX(windowSize.width - 56);
      } else {
        setButtonX(16);
      }
    } else if (windowSize.width <= 1024) {
      if (isOpen) {
        setButtonX(296);
      } else {
        setButtonX(8);
      }
    } else {
      if (isOpen) {
        setButtonX(296);
      } else {
        setButtonX(24);
      }
    }
  }, [windowSize.width, isOpen]);

  return (
    <div className='relative flex h-dvh w-screen flex-row bg-slate-100 py-0 lg:py-8'>
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
              {personal.map((item) => (
                <InfoListItem key={item.key} label={item.key} value={item.value} />
              ))}
            </InfoList>

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

        <motion.div
          initial={{ width: 'calc(100%)', x: 320 }}
          animate={{
            width: isOpen ? 'calc(100%)' : '100%',
            x: isOpen ? 320 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='relative flex h-full flex-col bg-white'
        >
          <div className='z-20 flex items-center justify-start bg-white/30 px-4 pt-16 pb-10 backdrop-blur-lg md:pt-18 md:pb-14 lg:px-8 lg:pt-20 lg:pb-16 xl:pt-22 xl:pb-16 2xl:py-22'>
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
        </motion.div>
      </div>
    </div>
  );
}
