'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Sun } from 'lucide-react';
import { MoonStar } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const buttonClass = classNames('sticky top-8 z-50 w-fit cursor-pointer pl-4 lg:pl-8', className);
  const iconClass = 'stroke-slate-700 transition-transform duration-200 dark:stroke-slate-200';

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={buttonClass}
      onClick={handleThemeChange}
      aria-label='Toggle theme'
      aria-controls='theme'
    >
      {theme === 'dark' ? <MoonStar className={iconClass} /> : <Sun className={iconClass} />}
    </button>
  );
}
