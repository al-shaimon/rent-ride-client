import { useEffect } from 'react';
import MainLayout from './layout/MainLayout';
import { useAppDispatch } from './redux/hooks';
import { setTheme } from './redux/features/themeSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Handle initial theme
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemTheme;
    
    dispatch(setTheme(initialTheme));

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        dispatch(setTheme(e.matches ? 'dark' : 'light'));
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [dispatch]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
