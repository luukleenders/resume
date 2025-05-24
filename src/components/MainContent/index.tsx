'use client';

import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

import { useDataStore } from '@store';

export function MainContent({ children }: PropsWithChildren) {
  const { isOpen, isMobile } = useDataStore();

  return (
    <motion.div
      initial={{ maxWidth: `calc(100% - ${isMobile ? '0px' : '320px'})`, x: 320 }}
      animate={{
        maxWidth: isOpen ? `calc(100% - ${isMobile ? '0px' : '320px'})` : 'calc(100% - 0px)',
        x: isOpen ? 320 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='relative flex h-full grow flex-col overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    >
      {children}
    </motion.div>
  );
}
