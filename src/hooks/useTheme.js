import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for theme management (Dark Space vs Light Theme)
 * Demonstrates custom hook composition and DOM attribute manipulation.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('celestial_theme', 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
