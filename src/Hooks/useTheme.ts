import { useEffect } from 'react';

export const useTheme = () => {
  useEffect(() => {
    const html = document.querySelector('html');
    const storedTheme = localStorage.getItem('hs_theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      html!.classList.add(storedTheme);
    } else if (prefersDarkScheme) {
      html!.classList.add('dark');
      localStorage.setItem('hs_theme', 'dark');
    } else {
      html!.classList.add('light');
      localStorage.setItem('hs_theme', 'light');
    }
  }, []);
};
