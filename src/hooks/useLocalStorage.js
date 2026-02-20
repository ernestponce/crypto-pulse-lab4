import { useState, useEffect } from 'react';
<<<<<<< HEAD

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

=======
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
>>>>>>> b183b24f9c08c45a421d0020f4b5ff7f2eaad21a
  return [value, setValue];
}