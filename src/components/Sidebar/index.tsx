import type { PropsWithChildren } from 'react';
import { motion } from 'motion/react';

export function Sidebar({ children, isOpen }: PropsWithChildren<{ isOpen: boolean }>) {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: isOpen ? 0 : -320 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='absolute z-10 flex h-full max-w-[320px] flex-col bg-slate-200'
    >
      {children}
    </motion.div>
  );
}
