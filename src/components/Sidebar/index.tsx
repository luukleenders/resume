'use client';

import classNames from 'classnames';
import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

import { useDataStore } from '@store';

export function Sidebar({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { isOpen } = useDataStore();

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isOpen ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={classNames(
        'absolute flex h-full w-full max-w-[320px] flex-col overflow-y-auto bg-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
