'use client';

import {useState, useEffect} from 'react';

// A custom hook for persisting state to local storage.
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value.
  // Pass an initial state function to `useState` so logic is only executed once on the client.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // The custom setter function that updates both the state and local storage.
  const setValue = (value: T | ((val: T) => T)) => {
    // We use the functional update form of `useState`'s setter to avoid stale state issues.
    setStoredValue(currentValue => {
      try {
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      } catch (error) {
        console.error(error);
        return currentValue; // Return previous state in case of an error
      }
    });
  };

  // This effect listens for changes to the `key` (e.g., user logs in/out)
  // and re-initializes the state from local storage.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Update state with the value from the new key, or the initial value if none exists.
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error(error);
      setStoredValue(initialValue);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}
