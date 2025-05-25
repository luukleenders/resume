'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { useAppStore } from '@provider';

export function ToggleButton() {
  const windowSize = useWindowSize();
  const { hasInteracted, isOpen, setIsOpen, setIsMobile, setHasInteracted } = useAppStore(
    (state) => state
  );
  const [buttonX, setButtonX] = useState(296);
  const [initialDelay, setInitialDelay] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  const iconClassName = classNames(
    'h-12 w-12 stroke-slate-900 transition-transform duration-300 dark:stroke-slate-300',
    {
      'rotate-180': isOpen,
      'rotate-0': !isOpen,
    }
  );

  const shakeClassName = classNames(
    'translate-0 translate-z-0 backface-hidden perspective-distant',
    {
      'animate-shake': isShaking,
    }
  );

  const handleToggle = () => {
    setHasInteracted(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!hasInteracted) {
      let timeout: NodeJS.Timeout;
      let shakeInterval: NodeJS.Timeout;

      shakeInterval = setInterval(() => {
        setIsShaking(true);
        timeout = setTimeout(() => {
          setIsShaking(false);
        }, 1000);
      }, 7000);

      return () => {
        clearInterval(shakeInterval);
        clearTimeout(timeout);
      };
    } else {
      setIsShaking(false);
    }
  }, [hasInteracted, setIsShaking]);

  useEffect(() => {
    if (!windowSize.width) return;
    const delay = initialDelay ? 1000 : 0;

    const timeout = setTimeout(() => {
      if (windowSize.width) {
        setIsOpen(windowSize.width >= 1024);
        setInitialDelay(false);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [initialDelay, windowSize.width, setInitialDelay, setIsOpen]);

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
        setButtonX(16);
      }
    }
  }, [windowSize.width, isOpen, setIsOpen, setIsMobile]);

  return (
    <motion.button
      initial={{ x: isOpen ? 296 : 8 }}
      animate={{ x: buttonX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1.5 }}
      className='absolute top-4 z-30 cursor-pointer transform-3d'
      onClick={handleToggle}
      aria-label='Toggle sidebar'
      aria-expanded={isOpen}
      aria-controls='sidebar'
    >
      <div className={shakeClassName}>
        <ArrowRight className={iconClassName} />
      </div>
    </motion.button>
  );
}
