import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((current: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((current: T) => T)) => {
      setStored((current) => {
        const next = typeof value === 'function' ? (value as (current: T) => T)(current) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore quota / private-mode failures; state still updates in memory.
        }
        return next;
      });
    },
    [key],
  );

  return [stored, setValue];
}
