import { useEffect, useState } from "react";

/**
 * useDebounce Hook
 * 
 * Delays updating the value until after a given delay (in ms).
 * 
 * @param value - The value to debounce (can be string, number, object, etc.)
 * @param delay - The delay time in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
