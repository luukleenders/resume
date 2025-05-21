import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CircleArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useWindowSize } from '@uidotdev/usehooks';

import { Experience, ExperienceItem } from './components/Experience';
import { InfoList, InfoListItem } from './components/InfoList';
import { ProfilePicture } from './components/ProfilePicture';
import { Sidebar } from './components/Sidebar';
import { Title } from './components/Title';

import education from './data/education.json';
import experience from './data/experience.json';
import personal from './data/personal.json';
import skills from './data/skills.json';

function App() {
  const windowSize = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const [buttonX, setButtonX] = useState(320);

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
    setIsOpen(windowSize.width >= 1280);
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
  }, [windowSize.width, isOpen]);

  return (
    <div className='flex h-screen w-screen flex-row bg-slate-100 py-0 lg:py-8'>
      <div className='relative container mx-auto flex overflow-hidden'>
        <Sidebar isOpen={isOpen}>
          <motion.button
            initial={{ x: 320 }}
            animate={{ x: buttonX }}
            className='absolute top-4 cursor-pointer'
            onClick={handleToggle}
          >
            <CircleArrowLeft className={iconClassName} />
          </motion.button>

          <div className='relative mx-auto py-8'>
            <ProfilePicture />
          </div>

          <div className='relative z-10 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
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
          </div>
        </Sidebar>

        <motion.div
          initial={{ width: 'calc(100%)', x: 320 }}
          animate={{ width: isOpen ? 'calc(100%)' : '100%', x: isOpen ? 320 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='flex h-full flex-col bg-white'
        >
          <div className='flex items-center justify-start px-4 pt-16 pb-8 lg:min-h-[264px] lg:px-8'>
            <Title />
          </div>

          <div className='flex flex-col overflow-y-auto px-4 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden'>
            <Experience>
              {experience.map((item) => (
                <ExperienceItem key={item.company} {...item} />
              ))}
            </Experience>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
