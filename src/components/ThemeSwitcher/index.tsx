'use client';

import { useEffect } from 'react';
import classNames from 'classnames';
import { Sun } from 'lucide-react';
import { MoonStar } from 'lucide-react';

import { useAppStore } from '@provider';

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useAppStore((state) => state);

  const buttonClass = classNames('sticky top-4 z-50 cursor-pointer pl-4 lg:pl-8', className);
  const iconClass = 'stroke-slate-700 transition-transform duration-200 dark:stroke-slate-200';

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark', theme === 'dark');
  };

  useEffect(() => {
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
      document.body.classList.toggle('dark', theme === 'dark');
      return;
    }

    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    setTheme(preferredTheme);
  }, [theme, setTheme]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as 'light' | 'dark' | 'system');
      document.body.classList.toggle('dark', localTheme === 'dark');
    }
  }, [setTheme]);

  return (
    <button className={buttonClass} onClick={handleThemeChange}>
      {theme === 'dark' ? <MoonStar className={iconClass} /> : <Sun className={iconClass} />}
    </button>
  );
}
