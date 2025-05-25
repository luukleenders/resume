'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useAppStore } from '@provider';

export function Sidebar({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { isOpen, setIsOpen, setHasInteracted } = useAppStore((state) => state);

  const handlers = useSwipeable({
    onSwiping: ({ dir }) => {
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
      initial={{ x: isOpen ? 0 : -320 }}
      animate={{ x: isOpen ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1.5 }}
      className={classNames(
        'absolute flex h-full w-full max-w-[320px] flex-col overflow-y-auto bg-slate-200 text-slate-900 [scrollbar-width:none] dark:bg-slate-700 dark:text-slate-50 [&::-webkit-scrollbar]:hidden',
        className
      )}
      {...handlers}
    >
      {children}
    </motion.div>
  );
}
