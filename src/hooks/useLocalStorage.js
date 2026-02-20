import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        try {
          // Try to read it as JSON
          return JSON.parse(saved);
        } catch {
          // If it's just a raw string (like "PHP" or "line"), return that directly
          return saved;
        }
      }
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}