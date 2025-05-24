'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { SquareArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

import { useDataStore } from '@store';

export function ToggleButton() {
  const windowSize = useWindowSize();
  const { isOpen, setIsOpen, setIsMobile } = useDataStore();
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
  }, [windowSize.width, setIsOpen]);

  useEffect(() => {
    if (!windowSize.width) return;
    if (windowSize.width <= 320) {
      setIsMobile(true);

      if (isOpen) {
        setButtonX(windowSize.width - 56);
      } else {
        setButtonX(16);
      }
    } else if (windowSize.width < 1024) {
      setIsMobile(true);

      if (isOpen) {
        setButtonX(296);
      } else {
        setButtonX(8);
      }
    } else {
      setIsMobile(false);

      if (isOpen) {
        setButtonX(296);
      } else {
        setButtonX(24);
      }
    }
  }, [windowSize.width, isOpen, setIsOpen, setIsMobile]);

  return (
    <motion.button
      initial={{ x: 296 }}
      animate={{ x: buttonX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='absolute top-4 z-30 cursor-pointer'
      onClick={handleToggle}
    >
      <SquareArrowLeft className={iconClassName} />
    </motion.button>
  );
}
