'use client';

import { type PropsWithChildren } from 'react';
import { motion } from 'motion/react';
import { useSwipeable } from 'react-swipeable';

import { useAppStore } from '@provider';

export function MainContent({ children }: PropsWithChildren) {
  const { isOpen, isMobile, setIsOpen, setHasInteracted } = useAppStore((state) => state);

  const handlers = useSwipeable({
    onSwiped: ({ dir }) => {
      if (dir === 'Left') {
        setIsOpen(false);
      } else if (dir === 'Right') {
        setIsOpen(true);
      }

      setHasInteracted(true);
    },
  });

  return (
    <motion.div
      initial={{ maxWidth: `calc(100% - ${isMobile ? '0px' : '320px'})`, x: isOpen ? 320 : 0 }}
      animate={{
        maxWidth: isOpen ? `calc(100% - ${isMobile ? '0px' : '320px'})` : 'calc(100% - 0px)',
        x: isOpen ? 320 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1.5 }}
      className='relative flex h-full grow flex-col overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
      {...handlers}
    >
      {children}
    </motion.div>
  );
}
