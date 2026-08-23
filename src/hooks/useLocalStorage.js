import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in Browser LocalStorage
 * Demonstrates useState, useEffect, JSON parsing/stringify, and Browser Storage API.
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with stored value or default initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading LocalStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync state changes back to LocalStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing to LocalStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
